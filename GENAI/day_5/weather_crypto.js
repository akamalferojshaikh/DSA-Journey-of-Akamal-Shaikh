import { GoogleGenAI, Type } from "@google/genai";
import readlineSync from "readline-sync";
import "dotenv/config";

const ai = new GoogleGenAI({});
//GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

async function cryptocurrencyfnc({ coin }) {
  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&ids=${coin}`
  );
  const data = await response.json();
  // console.log(data);
  return data;
}

async function weatherfnc({ city }) {
  const response = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=3671aa8031ba4249ac5162921252912&q=${city}&aqi=no`
  );
  const data = await response.json();
  return data;
}

const cryptoInfo = {
  name: "cryptocurrencyfnc",
  description:
    "Gets the current prices of cryptocurrencies like bitcoin,etherum etc.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      coin: {
        type: Type.STRING,
        description: "User will give any crypto coin name like bitcoin etherum",
      },
    },
    required: ["coin"],
  },
};

const weatherInfo = {
  name: "weatherfnc",
  description: "Gets the current  weather details of cities like london.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      city: {
        type: Type.STRING,
        description: "User will give city name like london,etc",
      },
    },
    required: ["city"],
  },
};

const toolFunctions = {
  cryptocurrencyfnc: cryptocurrencyfnc,
  weatherfnc: weatherfnc,
};
const tools = [
  {
    functionDeclarations: [cryptoInfo, weatherInfo],
  },
];

const History = [];

async function runAgent() {
  while (true) {
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: History,
      config: { tools },
    });

    if (result.functionCalls && result.functionCalls.length > 0) {
      console.log("LLM called the function to get the data!");
      const functionCall = result.functionCalls[0];
      const { name, args } = functionCall;

      const response = await toolFunctions[name](args);

      const functionResponsePart = {
        name: functionCall.name,
        response: {
          result: response,
        },
      };
      History.push({
        role: "model",
        parts: [{ functionCall: functionCall }],
      });
      History.push({
        role: "user",
        parts: [{ functionResponse: functionResponsePart }],
      });
    } else {
      // No more function calls, break the loop.
      History.push({
        role: "model",
        parts: [{ text: result.text }],
      });
      console.log(result.text);
      break;
    }
  }
}

while (true) {
  const question = readlineSync.question("Ask me a anything! \n");

  if (question == "exit") {
    break;
  }
  History.push({
    role: "user",
    parts: [{ text: question }],
  });

  await runAgent();
}
