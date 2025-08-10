import React, { useReducer } from 'react';
import './App.css'; 

const initialState = {
  theme: 'light',
};


const reducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light',
      };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const appStyle = {
    height: '100vh',
    padding: '20px',
    backgroundColor: state.theme === 'light' ? '#ffffff' : '#1e1e1e',
    color: state.theme === 'light' ? '#000000' : '#ffffff',
    transition: 'all 0.3s ease',
  };

  return (
    <div style={appStyle}>
      <h1>Theme Toggle with useReducer</h1>
      <p>Current Theme: <strong>{state.theme}</strong></p>
      <button
        onClick={() => dispatch({ type: 'TOGGLE_THEME' })}
        style={{
          padding: '10px 20px',
          cursor: 'pointer',
          borderRadius: '5px',
          backgroundColor: state.theme === 'light' ? '#000' : '#fff',
          color: state.theme === 'light' ? '#fff' : '#000',
        }}
      >
        Toggle Theme
      </button>
    </div>
  );
};

export default App;
