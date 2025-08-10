import React, { useReducer } from 'react';
import './App.css';
const initialState = { count: 0 };


const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div style={{ padding: '30px', textAlign: 'center' }}>
      <h2>Counter App with useReducer</h2>

      {}
      <h1>{state.count}</h1>

      {}
      <button
        onClick={() => dispatch({ type: 'INCREMENT' })}
        style={{ padding: '10px 20px', marginRight: '10px' }}
      >
        Increment
      </button>

      <button
        onClick={() => dispatch({ type: 'DECREMENT' })}
        style={{ padding: '10px 20px' }}
      >
        Decrement
      </button>
    </div>
  );
};

export default App;
