'use client';

import { useState } from 'react';

export default function HomePage() {
  const [results, setResults] = useState(null);

  const handleQuery = async () => {
    const response = await fetch('/api/query');
    const data = await response.json();
    setResults(data);
  };

  return (
    <div>
      <h1>Query Pinecone</h1>
      <button onClick={handleQuery}>Run Query</button>
      <pre>{JSON.stringify(results, null, 2)}</pre>
    </div>
  );
}
