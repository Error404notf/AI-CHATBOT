import index from '../lib/pineconeClient.js'; // Adjust path as needed
 // Ensure this file uses ES module syntax

async function upsertData() {
  try {
    await index.namespace('ns1').upsert([
      {
        id: 'vec1',
        values: [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1],
        metadata: { genre: 'drama' }
      },
      {
        id: 'vec2',
        values: [0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2],
        metadata: { genre: 'action' }
      },
      {
        id: 'vec3',
        values: [0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3],
        metadata: { genre: 'drama' }
      },
      {
        id: 'vec4',
        values: [0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4],
        metadata: { genre: 'action' }
      }
    ]);
    console.log('Data upserted successfully.');
  } catch (error) {
    console.error('Error upserting data:', error);
  }
}

upsertData();
