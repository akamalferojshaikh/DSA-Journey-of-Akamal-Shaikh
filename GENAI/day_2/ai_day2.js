import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({apiKey:""});

async function main(){
    const response = await ai.models.generateContent({
    model:"gemini-2.5-flash",
    contents:[
        {role:'user',
         parts: [{ text: "what is my name" }],
        },
        {role:'model',
         parts: [{ text: "As an AI, I don't have access to any personal information about you," }],
        },
        {role:'user',
         parts: [{ text: "My name is Akamal Shaikh" }],
        },
        {role:'model',
         parts: [{ text: "Thank you for telling me, Akamal Shaikh!" }],
        },
        {role:'user',
         parts: [{ text: "what is my name" }],
        },
    ]
});
console.log("the answer recieved from gemini below\n",response.text)
}

main();
