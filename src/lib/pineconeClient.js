import { Pinecone } from '@pinecone-database/pinecone';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env

const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY, // Make sure to add this to your .env file
});

const index = pc.index('quickstart');

export default index;
