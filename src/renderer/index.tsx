import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
const App = React.lazy(() => import('./App'));

const root = ReactDOM.createRoot(document.getElementById('root') as Element);

root.render(
  <React.StrictMode>
    <React.Suspense fallback={<p>Loading..</p>}>
      <App />
    </React.Suspense>
  </React.StrictMode>
);
