import React from 'react';
import RecentFiles from './components/RecentFiles';
import OpenFile from './components/OpenFile';

export default function App() {
  return (
    <div id="App">
      <RecentFiles />
      <OpenFile />
    </div>
  );
}
