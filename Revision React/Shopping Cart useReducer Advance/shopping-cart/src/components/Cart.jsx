import React, { useReducer } from "react";
import { useNavigate } from "react-router-dom";
function Cart({ state, dispatch }) {
  const navigate = useNavigate();
  function handleItem() {
    navigate("/");
  }
  return (
    <>
      <h3>
        Go to previous/items section: <button onClick={handleItem}>Prev</button>
      </h3>
      <h3>
        <button>Undo</button> This is Cart section <button>Redo</button>
      </h3>
    </>
  );
}

export default Cart;
