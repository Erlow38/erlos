import React from 'react';
import OS from './components/OS/OS.tsx';

function App() {

  
  // Increase visits counter
  if (localStorage.getItem('visits')) {
    const visits = parseInt(localStorage.getItem('visits') as string);
    localStorage.setItem('visits', (visits + 1).toString());
  } else {
    localStorage.setItem('visits', '1');
  }

  // Get visits counter in number
  const visits = localStorage.getItem('visits');

  return (
    <div className="App">
      <header className="App-header">
        <OS visits={visits} />
      </header>
    </div>
  );
}

export default App;
