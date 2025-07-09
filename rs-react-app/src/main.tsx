import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './style/style.css';
import App from './App.tsx';
import ErrorBoundary from './features/ErrorBoundary.tsx';
import GlobalFallback from './features/GlobalFallback.tsx';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary fallback={<GlobalFallback />}>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
