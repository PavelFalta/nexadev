import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Initialize AOS
AOS.init({
  duration: 1000, // Animation duration
  once: true,      // Whether animation should happen only once
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
