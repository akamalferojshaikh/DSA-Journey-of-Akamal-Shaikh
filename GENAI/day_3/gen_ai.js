import { GoogleGenAI } from "@google/genai";
import 'dotenv/config';

// FIX: Wrap the API key in an object
const ai = new GoogleGenAI({ apiKey: "" }); 

async function main(){
    const response = await ai.models.generateContent({
        // NOTE: You don't need to pass apiKey again here inside generateContent
        model: "gemini-2.0-flash", 
        systemInstruction: `You are a coding ai agent.
        - don't answer to other things related questions 
        - answer only coding related questions 
        - if anyone asks anything else, refuse to answer`,
        contents: [{ role: "user", parts: [{ text: "what is array" }] }],
    });

    console.log("Ai--->", response.text);
}

main();