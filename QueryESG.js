// QueryESG.js
import React, { useState } from 'react';
import axios from 'axios';

function QueryESG() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');

  const handleQuery = async () => {
    try {
      const res = await axios.post('/api/nlp-query', { query });
      setResponse(res.data);
    } catch (error) {
      console.error('Error querying ESG data', error);
    }
  };

  return (
    <div>
      <h2>Query ESG Data</h2>
      <input
        type="text"
        placeholder="Ask a question"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleQuery}>Submit Query</button>
      {response && <p>Response: {response}</p>}
    </div>
  );
}

export default QueryESG;
