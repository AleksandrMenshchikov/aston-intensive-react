import { createRoot } from 'react-dom/client';
import React, { StrictMode } from 'react';
import './index.css';
import { App } from './components/App';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';

const root = document.getElementById('root')!;

createRoot(root).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
