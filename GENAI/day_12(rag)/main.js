// Load environment variables from .env
import dotenv from "dotenv";
dotenv.config();

// Phase 2: Query Resolving phase
import readlineSync from "readline-sync";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { Pinecone } from "@pinecone-database/pinecone";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";

async function main() {
  while (true) {
    const userProblem = readlineSync.question("Ask me anything--> ");
    if (!userProblem) continue;
    if (userProblem.toLowerCase() === "exit") {
      console.log("Exiting.");
      break;
    }

    try {
      // Step 1: Convert the user query into embedding(vector)
      const embeddings = new GoogleGenerativeAIEmbeddings({
        apiKey: process.env.GOOGLE_API_KEY,
        model: "text-embedding-004",
      });
      const queryVector = await embeddings.embedQuery(userProblem);

      // Step 2: Search Relevant document into vector DB
      const pinecone = new Pinecone();
      const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX_NAME);
      const searchResults = await pineconeIndex.query({
        topK: 10,
        vector: queryVector,
        includeMetadata: true,
      });

      const context = (searchResults.matches || [])
        .map((match) => match.metadata?.text)
        .filter(Boolean)
        .join("\n\n---\n\n");

      // Step 3: Query + Context to LLM
      const model = new ChatGoogleGenerativeAI({
        apiKey: process.env.GOOGLE_API_KEY,
        model: "gemini-2.5-flash",
        temperature: 0.3,
      });

      // Step 4: Create a prompt template
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

      // Step 5: Create a chain (prompt → model → parser)
      const chain = RunnableSequence.from([promptTemplate, model, new StringOutputParser()]);

      // Step 6: Invoke the chain and get the answer
      const answer = await chain.invoke({ context: context, question: userProblem });

      console.log("Answer:", answer);
    } catch (err) {
      console.error("Error while processing request:", err);
    }
  }
}

main();
