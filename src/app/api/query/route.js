import index from '@/lib/pineconeClient';

export async function GET() {
  console.log('GET request received'); // Debugging

  try {
    const queryVector = [0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3];
    const results = await index.namespace('ns1').query({
      topK: 2,
      vector: queryVector,
      includeValues: true,
      includeMetadata: true,
      filter: { genre: { '$eq': 'action' }}
    });

    console.log('Pinecone Query Results:', results);

    return new Response(JSON.stringify(results), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error querying Pinecone:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
