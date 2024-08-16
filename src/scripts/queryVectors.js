import index from '../lib/pineconeClient.js';

async function queryData() {
  try {
    const results = await index.namespace('ns1').query({
      topK: 2,
      vector: [0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3],
      includeValues: true,
      includeMetadata: true,
      filter: { genre: { '$eq': 'action' }}
    });

    console.log('Query Results:', results);
  } catch (error) {
    console.error('Error querying data:', error);
  }
}

queryData();
