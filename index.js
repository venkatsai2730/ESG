import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Optional, for global styles
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')  // This matches the <div id="root"></div> in your public/index.html
);
