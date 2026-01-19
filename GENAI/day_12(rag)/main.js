import readlineSync from 'readline-sync';
import { GoogleGenerativeAIEmbeddings,ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { Pinecone } from '@pinecone-database/pinecone';
import * as dotenv from 'dotenv';
dotenv.config();
import { PromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { RunnableSequence } from '@langchain/core/runnables';
// configuration
const embeddings = new GoogleGenerativeAIEmbeddings({
    apiKey: process.env.GOOGLE_API_KEY,
    model: 'text-embedding-004',
});


const History = [];


const model = new ChatGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_API_KEY,
    model: 'gemini-2.5-flash',  
    temperature: 0.3, 
});

const outputParser = new StringOutputParser();

// configure Pinecone
const pinecone = new Pinecone();
const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX_NAME);



async function checkAndReformulate(question, History){
    // If no history, return original question
    if (History.length === 0) {
        return question;
    }
    
    // Use the existing model, create a simple prompt
    const intentPrompt = `
Given the conversation history and a new question, determine if the question references previous context.
If it does, rewrite it as a standalone question. If not, return the original question.

Conversation History:
${History.slice(-6).map(h => `${h.role}: ${h.parts[0].text}`).join('\n')}

New Question: ${question}

Return ONLY the reformulated question (or original if no reformulation needed). No explanations.
    `;
    
    // Create a chain with the parser to get string output
    const intentChain = RunnableSequence.from([model, outputParser]);
    const reformulated = await intentChain.invoke(intentPrompt);
    
    console.log(`\n[Intent Detection] Original: "${question}"`);
    console.log(`[Intent Detection] Reformulated: "${reformulated}"\n`);
    
    return reformulated.trim();
}



async function chatting(question) {
    
    const reformulatedQuestion = await checkAndReformulate(question, History);
    //  introduce intent model ko : Homework
    /* When a question arrived, we took it and checked if it was linked to any previous question. If it was, we created and provided a good prompt; if not, we let the LLM do its job.*/

    // question ki embedding create karna hai
    const queryVector = await embeddings.embedQuery(reformulatedQuestion);  
    // const queryVector = await embeddings.embedQuery(question);  

    // embeddig aagyi, uske baad usko vectorDB ke andar search karna, top10
    const searchResults = await pineconeIndex.query({
    topK: 10,
    vector: queryVector,
    includeMetadata: true,
    });


    const context = searchResults.matches
                   .map(match => match.metadata.text)
                   .join("\n\n---\n\n");


    // console.log(searchResults);


    // top10+question isko mein llm ko de dunga

    const promptTemplate = PromptTemplate.fromTemplate(`
You are a helpful assistant answering questions based on the provided documentation.

Context from the documentation:
{context}

Question: {question}

Instructions:
- Answer the question using ONLY the information from the context above
- If the answer is not in the context, say "I don't have enough information to answer that question."
- Be concise and clear
- Use code examples from the context if relevant

Answer:
        `);


        const chain = RunnableSequence.from([
            promptTemplate,
            model,
            new StringOutputParser(),
        ]);

        // Step 6: Invoke the chain and get the answer
        const answer = await chain.invoke({
            context: context,
            question: reformulatedQuestion,
        }); 
       


        console.log(answer);

        History.push({
    role:'model',
    parts:[{text: answer}]  // answer is already a string
})

    // Output create kar dunga
}


async function main(){
   while(true) {
       const userProblem = readlineSync.question("Ask me anything--> ");
       
       // Allow user to exit
       if(userProblem.toLowerCase() === 'exit' || userProblem.toLowerCase() === 'quit') {
           console.log("Goodbye!");
           break;
       }
       
       History.push({
           role:'user',
           parts:[{text:userProblem}]
       })
       
       await chatting(userProblem);
   }
}


main();
