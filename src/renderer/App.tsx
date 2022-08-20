import React from 'react';
const OpenFile = React.lazy(() => import('./components/OpenFile'));

export default function App() {
  return (
    <div id="App">
      <OpenFile />
    </div>
  );
}
