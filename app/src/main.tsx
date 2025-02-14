import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';

import './style.css';

import App from './App';
import React from 'react';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}