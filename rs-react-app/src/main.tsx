import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './style/style.css';
import App from './App.tsx';
import ErrorBoundary from './features/components/errorHandling/ErrorBoundary.tsx';
import Fallback from './features/components/errorHandling/Fallback.tsx';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary fallback={<Fallback />}>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
