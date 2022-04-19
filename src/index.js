import { ColorModeScript } from '@chakra-ui/react';
import { createRoot } from 'react-dom/client';
import React, { StrictMode } from 'react';
import App from './App';

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <ColorModeScript />
    <App />
  </StrictMode>
);
