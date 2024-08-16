import { Pinecone } from '@pinecone-database/pinecone';
import dotenv from 'dotenv';

dotenv.config();

console.log('PINECONE_API_KEY:', process.env.PINECONE_API_KEY);

const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

async function createIndex() {
  try {
    await pc.createIndex({
      name: 'quickstart',
      dimension: 8,
      metric: 'euclidean',
      spec: { 
        serverless: { 
          cloud: 'aws', 
          region: 'us-east-1' 
        }
      } 
    });
    console.log('Index created successfully.');
  } catch (error) {
    console.error('Error creating index:', error);
  }
}

createIndex();
