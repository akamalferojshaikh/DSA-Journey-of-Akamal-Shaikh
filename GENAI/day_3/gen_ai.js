import { GoogleGenAI } from "@google/genai";
import 'dotenv/config';
import readlineSync from 'readline-sync';


const ai = new GoogleGenAI({ apiKey: "" });

async function main(){
    const chat = await ai.chats.create({
        model: "gemini-2.5-flash", 
        history:[]
    
    });

    while(true){
        const question = readlineSync.question("ask me a question:  ");

        if (question == "exit"){
            break;
        }

        const response = await chat.sendMessage({
            message:question,
        })
        console.log("Ai--->", response.text);
    }

}

await main();


