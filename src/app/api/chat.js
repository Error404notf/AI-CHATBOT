import axios from 'axios';
import pineconeClient from '../../lib/pineconeClient';

export async function POST(req) {
  const { prompt, task } = await req.json();

  try {
    // Query Pinecone for relevant context
    const index = pineconeClient.Index('quickstart');
    const queryResult = await index.query({
      vector: prompt, // Assume `prompt` is already a vector or transform it accordingly
      topK: 5,
    });

    // Handle different tasks
    let response;
    switch (task) {
      case 'conversation':
        response = await axios.post('https://api.openrouter.ai/v1/generate', {
          prompt: prompt,
          model: 'gpt-3.5-turbo',
          max_tokens: 150,
        }, {
          headers: {
            'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
            'Content-Type': 'application/json',
          }
        });
        break;

      case 'summarization':
        response = await axios.post('https://api.openrouter.ai/v1/generate', {
          prompt: `Summarize the following:\n\n${prompt}`,
          model: 'gpt-3.5-turbo',
          max_tokens: 100,
        }, {
          headers: {
            'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
            'Content-Type': 'application/json',
          }
        });
        break;

      default:
        response = { data: { choices: [{ text: "Task not recognized." }] } };
    }

    return new Response(JSON.stringify({ response: response.data.choices[0].text.trim() }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch response' }), { status: 500 });
  }
}
