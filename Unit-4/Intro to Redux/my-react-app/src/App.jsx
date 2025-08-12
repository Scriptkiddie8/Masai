import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './redux/actions';

function App() {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.count);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Redux Counter</h1>
      <h2>Count: {count}</h2>
      <h3>JSON: {JSON.stringify({ count })}</h3>

      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  );
}

export default App;
