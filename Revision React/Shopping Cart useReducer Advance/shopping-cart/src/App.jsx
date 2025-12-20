import "./App.css";
import ProductList from "./components/ProductList";
import { Routes, Route } from "react-router-dom";
import Cart from "./components/Cart";
import { useReducer } from "react";

const initialstate = {
  past: [],
  present: [],
  future: [],
};

// ADD_ITEM
// REMOVE_ITEM
// INCREMENT
// DECREMENT
// CLEAR_CART
// UNDO
// REDO

function reducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const product = action.payload;

      const existingItem = state.present.find((item) => item.id == product.id);
      let updateCart;

      if (existingItem) {
        updateCart = state.present.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updateCart = [...state.present, { ...product, quantity: 1 }];
      }
      return {
        past: [...state.past, state.present],
        present: updateCart,
        future: [],
      };
    }
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialstate);
  return (
    <>
      <Routes>
        <Route path="/" element={<ProductList dispatch={dispatch} />}></Route>
        <Route
          path="/cart"
          element={<Cart state={state} dispatch={dispatch} />}
        ></Route>
      </Routes>
    </>
  );
}

export default App;
