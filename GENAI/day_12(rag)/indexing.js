import * as dotenv from 'dotenv';
dotenv.config();

import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';

const PDF_PATH = './notes.pdf';
const pdfLoader = new PDFLoader(PDF_PATH);
const rawDocs = await pdfLoader.load();


import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';

const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });
const chunkedDocs = await textSplitter.splitDocuments(rawDocs);



import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';

const embeddings = new GoogleGenerativeAIEmbeddings({
    apiKey: process.env.GOOGLE_API_KEY,
    model: 'text-embedding-004',
  });

// Debug: Test embedding before processing
console.log("Testing embedding generation...");
try {
  const testEmbed = await embeddings.embedQuery("test");
  console.log("✓ Embedding test passed. Dimension:", testEmbed.length);
  if (testEmbed.length === 0) {
    console.error("ERROR: Embedding returned zero dimensions!");
    process.exit(1);
  }
} catch (err) {
  console.error("ERROR: Failed to generate test embedding:", err.message);
  process.exit(1);
}

import { Pinecone } from '@pinecone-database/pinecone';

const pinecone = new Pinecone();
const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX_NAME);


import { PineconeStore } from '@langchain/pinecone';

await PineconeStore.fromDocuments(chunkedDocs, embeddings, {
    pineconeIndex,
    maxConcurrency: 5,
  });