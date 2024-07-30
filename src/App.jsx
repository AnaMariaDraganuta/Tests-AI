import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateOffer = () => {
    setLoading(true);
    setError('');
    setResult('');

    axios.post('http://localhost:5000/generate-offer', { prompt })
      .then(response => {
        setResult(response.data.generated_text);
      })
      .catch(err => {
        setError('A apărut o eroare: ' + (err.response ? err.response.data.error : err.message));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="app">
      <h1>Generare Ofertă pentru Aplicație</h1>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Introduceti cerința clientului aici..."
      />

      <button className='button' onClick={handleGenerateOffer} disabled={loading}>
        {loading ? 'Generare...' : 'Generați Oferta'}
      </button>

      <div className="result">
        {error && <p className="error">{error}</p>}
        {result && <pre>{result}</pre>}
      </div>
      
    </div>
  );
}

export default App;

