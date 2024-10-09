import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';  // Ensure this imports the updated CSS

function App() {
  const [company, setCompany] = useState('');  // Default to an empty string (select)
  const [esgData, setEsgData] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [newsData, setNewsData] = useState(''); // Optional news data field for FinancAI

  const fetchEsgData = async () => {
    if (!company) {
      setError('Please select a company.');
      return;
    }
  
    setLoading(true);
    setError('');
    try {
      let response;
      const formattedStartDate = startDate.toISOString().split('T')[0];
      const formattedEndDate = endDate.toISOString().split('T')[0];
  
      let url = ''; // Initialize an empty URL
  
      // Switch to set the appropriate URL based on the company
      switch (company) {
        case 'gaialens':
          url = `http://localhost:3000/api/esg/gaialens`;
          response = await axios.get(url, {
            params: { company, date: formattedStartDate }
          });
          break;
        case 'stock-pluse':
          url = `http://localhost:3000/api/esg/stock-pluse`;
          response = await axios.get(url, {
            params: { company, startDate: formattedStartDate, endDate: formattedEndDate }
          });
          break;
        case 'stock-swift':
          url = `http://localhost:3000/api/esg/stock-swift`;
          response = await axios.get(url, {
            params: { company, startDate: formattedStartDate, endDate: formattedEndDate }
          });
          break;
        case 'financai':
          url = `http://localhost:3000/api/esg/words-analysis`;
          response = await axios.post(url, {
            company,
            startDate: formattedStartDate,
            endDate: formattedEndDate,
            news: newsData // Only relevant for FinancAI
          });
          break;
        default:
          setError('Invalid company selection');
          return;
      }
  
      setEsgData(response.data);
    } catch (error) {
      setError('Error fetching ESG data. Please try again.');
      console.error('Error fetching ESG data', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="container">
      <h1>ESG Dashboard</h1>

      {/* Dropdown to select company with label */}
      <div className="company-select-wrapper">
        <label htmlFor="company-select">Company:</label>
        <select
          id="company-select"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="company-select"
        >
          <option value="">Select</option>  {/* Default value as 'Select' */}
          <option value="gaialens">GaiaLens</option>
          <option value="financai">FinancAI</option>
          <option value="stock-pluse">Stock Pluse</option>
          <option value="stock-swift">Stock Swift</option>
        </select>
      </div>

      {/* Conditional input for news data if FinancAI is selected */}
      {company === 'financai' && (
        <div className="news-input-wrapper">
          <label htmlFor="news-input">News Data (for FinancAI):</label>
          <textarea
            id="news-input"
            value={newsData}
            onChange={(e) => setNewsData(e.target.value)}
            rows="4"
            placeholder="Enter news data for ESG analysis"
          />
        </div>
      )}

      {/* Date picker inputs */}
      <div className="date-pickers">
        <div>
          <label>Start Date:</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="dd/MM/yyyy"
          />
        </div>
        <div>
          <label>End Date:</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="dd/MM/yyyy"
          />
        </div>
      </div>

      {/* Button to fetch ESG data */}
      <button onClick={fetchEsgData} className="fetch-btn" disabled={loading}>
        {loading ? 'Loading...' : 'Get ESG Data'}
      </button>

      {/* Error message */}
      {error && <p className="error-message">{error}</p>}

      {/* ESG data display */}
      {esgData && (
        <div className="esg-data-display">
          {Array.isArray(esgData) && esgData.length > 0 ? (
            esgData.map((item, index) => (
              <div key={item.uuid || index} className="esg-item">
                <h3>{item.title || 'No Title Available'}</h3>
                <p><strong>Publisher:</strong> {item.publisher || 'Unknown'}</p>
                <p><strong>Published:</strong> {item.providerPublishTime
                  ? new Date(item.providerPublishTime * 1000).toLocaleString()
                  : 'N/A'}
                </p>
                <p><strong>Type:</strong> {item.type || 'N/A'}</p>

                {/* Check if thumbnail and resolutions exist */}
                {item.thumbnail && item.thumbnail.resolutions && item.thumbnail.resolutions.length > 0 && (
                  <img src={item.thumbnail.resolutions[0].url} alt="thumbnail" className="esg-thumbnail" />
                )}

                {/* Check if relatedTickers exists before using .join() */}
                <p><strong>Related Tickers:</strong> 
                  {item.relatedTickers && item.relatedTickers.length > 0
                    ? item.relatedTickers.join(', ')
                    : 'No related tickers available'}
                </p>

                <a href={item.link} target="_blank" rel="noopener noreferrer">Read More</a>
              </div>
            ))
          ) : (
            <p>No data available for the selected criteria.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
