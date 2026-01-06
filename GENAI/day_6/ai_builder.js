import { GoogleGenAI, Type } from "@google/genai";
import fs from "fs";
import path from "path";
import "dotenv/config";
import readlineSync from "readline-sync";

// Configure the client
const ai = new GoogleGenAI({});

// File System Operations
async function createFolder({ folderPath }) {
  try {
    fs.mkdirSync(folderPath, { recursive: true });
    return `Success: Folder "${folderPath}" created successfully`;
  } catch (err) {
    return `Error: ${err.message}`;
  }
}

async function createFile({ filePath, content = "" }) {
  try {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, content);
    return `Success: File "${filePath}" created successfully`;
  } catch (err) {
    return `Error: ${err.message}`;
  }
}

async function writeFile({ filePath, content }) {
  try {
    fs.writeFileSync(filePath, content);
    return `Success: Content written to "${filePath}" successfully`;
  } catch (err) {
    return `Error: ${err.message}`;
  }
}

async function readFile({ filePath }) {
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    return `Success: File content:\n${content}`;
  } catch (err) {
    return `Error: ${err.message}`;
  }
}

async function deleteFile({ filePath }) {
  try {
    fs.unlinkSync(filePath);
    return `Success: File "${filePath}" deleted successfully`;
  } catch (err) {
    return `Error: ${err.message}`;
  }
}

async function deleteFolder({ folderPath }) {
  try {
    fs.rmSync(folderPath, { recursive: true, force: true });
    return `Success: Folder "${folderPath}" deleted successfully`;
  } catch (err) {
    return `Error: ${err.message}`;
  }
}

// Tool Definitions
const createFolderTool = {
  name: "createFolder",
  description: "Creates a new folder/directory at the specified path",
  parameters: {
    type: Type.OBJECT,
    properties: {
      folderPath: {
        type: Type.STRING,
        description: "The path where the folder should be created. Ex: calculator, src/components",
      },
    },
    required: ["folderPath"],
  },
};

const createFileTool = {
  name: "createFile",
  description: "Creates a new file at the specified path with optional initial content",
  parameters: {
    type: Type.OBJECT,
    properties: {
      filePath: {
        type: Type.STRING,
        description: "The path where the file should be created. Ex: calculator/index.html",
      },
      content: {
        type: Type.STRING,
        description: "The initial content to write to the file (optional)",
      },
    },
    required: ["filePath"],
  },
};

const writeFileTool = {
  name: "writeFile",
  description: "Writes content to an existing file, replacing its current content",
  parameters: {
    type: Type.OBJECT,
    properties: {
      filePath: {
        type: Type.STRING,
        description: "The path of the file to write to",
      },
      content: {
        type: Type.STRING,
        description: "The content to write to the file",
      },
    },
    required: ["filePath", "content"],
  },
};

const readFileTool = {
  name: "readFile",
  description: "Reads and returns the content of a file",
  parameters: {
    type: Type.OBJECT,
    properties: {
      filePath: {
        type: Type.STRING,
        description: "The path of the file to read",
      },
    },
    required: ["filePath"],
  },
};

const deleteFileTool = {
  name: "deleteFile",
  description: "Deletes a file at the specified path",
  parameters: {
    type: Type.OBJECT,
    properties: {
      filePath: {
        type: Type.STRING,
        description: "The path of the file to delete",
      },
    },
    required: ["filePath"],
  },
};

const deleteFolderTool = {
  name: "deleteFolder",
  description: "Deletes a folder and all its contents at the specified path",
  parameters: {
    type: Type.OBJECT,
    properties: {
      folderPath: {
        type: Type.STRING,
        description: "The path of the folder to delete",
      },
    },
    required: ["folderPath"],
  },
};

// Function map for tool execution
const toolFunctions = {
  createFolder,
  createFile,
  writeFile,
  readFile,
  deleteFile,
  deleteFolder,
};

const History = [];

async function buildWebsite() {
  while (true) {
      const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: History,
      config: {
        systemInstruction: `
            You are a website Builder that creates frontend websites using file system operations.
            You have access to tools for creating folders, creating files, writing content, reading files, and deleting files/folders.

            Your Job:
            1. Analyze the user query
            2. Take necessary actions using the available file system tools

            Step By Step Guide:

            1. First create the folder for the website using createFolder tool
               Example: createFolder({ folderPath: "calculator" })
            
            2. Create the HTML file using createFile tool with full HTML content
               Example: createFile({ filePath: "calculator/index.html", content: "<!DOCTYPE html>..." })
            
            3. Create the CSS file using createFile tool with full CSS content
               Example: createFile({ filePath: "calculator/style.css", content: "body { ... }" })
            
            4. Create the JavaScript file using createFile tool with full JS content
               Example: createFile({ filePath: "calculator/script.js", content: "// JS code..." })
            
            5. If you need to update a file, use writeFile tool
            
            6. If you need to read a file to check its content, use readFile tool
            
            7. If you need to delete something, use deleteFile or deleteFolder tools

            Important:
            - When creating files with content, include the COMPLETE file content in a single call
            - Write clean, well-formatted code
            - Use proper indentation in HTML, CSS, and JavaScript
            - Create functional and visually appealing websites
            `,
        tools: [
          {
            functionDeclarations: [
              createFolderTool,
              createFileTool,
              writeFileTool,
              readFileTool,
              deleteFileTool,
              deleteFolderTool,
            ],
          },
        ],
    }
    })

    if(result.functionCalls && result.functionCalls.length > 0){
        const functionCall = result.functionCalls[0];

        console.log(`Tool called: ${functionCall.name}`);
        const { name, args } = functionCall;
        
        // Execute the appropriate tool function
        const toolFunction = toolFunctions[name];
        const toolResponse = toolFunction ? await toolFunction(args) : `Error: Unknown tool "${name}"`;
        
        console.log(toolResponse);

        const functionResponsePart = {
            name: functionCall.name,
            response: {
                result: toolResponse,
            }
        }
        History.push({
            role: 'model',
            parts: [{
                functionCall: functionCall
            }]
        });

        History.push({
            role: 'user',
            parts: [{ functionResponse: functionResponsePart }]
        });
    }

    else{
        console.log(result.text);
        History.push({
            role:'model',
            parts:
            [{text:result.text}],
            
        })
        break;
    }

  }
}

while(true){
    const question = readlineSync.question("Ask me anything-->  ")

    if(question=='exit'){
        break;
    }

    History.push({
        role:'user',
        parts:[{text:question}]

    })
    await buildWebsite();
}


