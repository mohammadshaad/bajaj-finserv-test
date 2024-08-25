import { useState } from 'react';
import './App.css';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResponse(null);
  
    try {
      const data = JSON.parse(jsonInput);
      const res = await fetch('https://shaad-bajaj-finserv-backend.vercel.app/bfhl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data), // Directly send the JSON object
      });
  
      if (!res.ok) {
        throw new Error(`Network response was not ok: ${res.statusText}`);
      }
  
      const result = await res.json();
      console.log('API Response:', result);
      setResponse(result);
    } catch (err) {
      setError(`Error: ${err.message}`);
      console.error('Error:', err);
    }
  };  

  const handleOptionChange = (e) => {
    const value = e.target.value;
    setSelectedOptions(prevOptions =>
      prevOptions.includes(value)
        ? prevOptions.filter(option => option !== value)
        : [...prevOptions, value]
    );
  };

  const renderResponse = () => {
    if (!response) return null;

    const { numbers, alphabets, highest_lowercase_alphabet } = response;

    return (
      <div>
        {selectedOptions.includes('Numbers') && numbers.length > 0 && (
          <div>
            <h3>Numbers</h3>
            <pre>{JSON.stringify(numbers, null, 2)}</pre>
          </div>
        )}
        {selectedOptions.includes('Alphabets') && alphabets.length > 0 && (
          <div>
            <h3>Alphabets</h3>
            <pre>{JSON.stringify(alphabets, null, 2)}</pre>
          </div>
        )}
        {selectedOptions.includes('Highest lowercase alphabet') && highest_lowercase_alphabet.length > 0 && (
          <div>
            <h3>Highest Lowercase Alphabet</h3>
            <pre>{JSON.stringify(highest_lowercase_alphabet, null, 2)}</pre>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>BFHL Frontend</h1>
      <h2>Made with ❤️ by
        {" "}
        <a href="https://github.com/mohammadshaad" target="_blank" rel="noreferrer">
          <strong>Shaad</strong>
        </a>
      </h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder='["A","C","Z","c","i"]' // Remove the outer JSON object
          rows="10"
          cols="50"
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p>{error}</p>}
      {response && (
        <div>
          <select multiple={true} value={selectedOptions} onChange={handleOptionChange}>
            <option value="Alphabets">Alphabets</option>
            <option value="Numbers">Numbers</option>
            <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
          </select>
          {renderResponse()}
        </div>
      )}
    </div>
  );
}

export default App;
