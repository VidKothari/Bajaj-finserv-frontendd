import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import './App.css'; // Ensure you have this CSS file for styles

const App = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'numbers', label: 'Numbers' },
    { value: 'highest_lowercase_alphabet', label: 'Highest lowercase alphabet' }
  ];

  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(jsonInput);

      const response = await axios.post('https://bajaj-finserv-api-f834fac9efe2.herokuapp.com/bfhl', parsedData);
      setResponseData(response.data);
      setError('');
    } catch (e) {
      setError('Invalid JSON input or server error.');
      setResponseData(null);
    }
  };

  const handleSelectChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };

  const renderResponse = () => {
    if (!responseData) return null;

    const { numbers, alphabets, highest_lowercase_alphabet } = responseData;
    const filteredData = selectedOptions.reduce((acc, option) => {
      acc[option.value] = responseData[option.value];
      return acc;
    }, {});

    return (
      <div className="response-card">
        <h2>Response</h2>
        <pre>{JSON.stringify(filteredData, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div className="app-container">
      <h1 className="app-title">21BCE3610</h1>
      <div className="input-card">
        <h2>JSON Input</h2>
        <textarea
          placeholder='Enter JSON e.g. {"data": ["A","C","z"]}'
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          className="json-input"
        />
        {error && <p className="error-message">{error}</p>}
        <button onClick={handleSubmit} className="submit-button">Submit</button>
      </div>

      {responseData && (
        <div className="filter-section">
          <h2>Select Data to Display</h2>
          <Select
            isMulti
            options={options}
            onChange={handleSelectChange}
            className="multi-select"
          />
          {renderResponse()}
        </div>
      )}
    </div>
  );
};

export default App;
