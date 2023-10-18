import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { ContextProvider } from './context/Context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router> 
      <ContextProvider>{/* Wrap your entire app with a single Router */}
      <App />
      </ContextProvider>
    </Router>
  </React.StrictMode>
);

