import React, { useRef, useState } from 'react';
import './App.css'

function App() {
  const inputRef = useRef(null);
  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    inputRef.current.focus();
    inputRef.current.style.backgroundColor = '#e0f7fa'; 
    setFocused(true); 
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>Focus Input with useRef</h2>
      
      <input
        ref={inputRef}
        type="text"
        placeholder="Click the button to focus me"
        style={{ padding: '8px', fontSize: '16px' }}
      />

      <br /><br />

      <button onClick={handleFocus} style={{ padding: '8px 12px' }}>
        Focus Input
      </button>

      {focused && <p style={{ color: 'green' }}>Focused!</p>}
    </div>
  );
}

export default App
