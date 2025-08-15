// src/App.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem } from "./redux/cartSlice";

const Products = [
  { id: 1, name: "Laptop", price: 1000 },
  { id: 2, name: "Phone", price: 500 },
  { id: 3, name: "Headphones", price: 100 },
];

function App() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const total = useSelector((state) => state.cart.total);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Shopping Cart</h1>

      <h2>Products</h2>
      {Products.map((product) => (
        <div key={product.id}>
          {product.name} - ${product.price}
          <button onClick={() => dispatch(addItem(product))}>
            Add to Cart
          </button>
        </div>
      ))}

      <h2>Cart</h2>
      {items.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        items.map((item) => (
          <div key={item.id}>
            {item.name} - ${item.price}
            <button onClick={() => dispatch(removeItem(item.id))}>
              Remove
            </button>
          </div>
        ))
      )}

      <h2>Total: ${total}</h2>
    </div>
  );
}

export default App;
