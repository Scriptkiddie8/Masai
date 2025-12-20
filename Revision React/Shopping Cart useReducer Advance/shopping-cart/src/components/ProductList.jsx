import React from "react";
import { useNavigate } from "react-router-dom";
const products = [
  { id: "1", name: "Iphone", price: "66000" },
  { id: "2", name: "Headphone", price: "13000" },
  { id: "3", name: "Powerbank", price: "1900" },
];

function ProductList({ dispatch }) {
  const navigate = useNavigate();

  function handleCart() {
    navigate("/cart");
  }

  function handleAddtoCart(item) {
    dispatch({ type: "ADD_ITEM", payload: item });
    navigate("/cart");
  }

  return (
    <>
      <h1>This is items Section</h1>
      <button onClick={handleCart}>View Cart</button>
      <ul>
        {products.map((item) => (
          <li
            style={{ border: "2px solid black", padding: "10px" }}
            key={item.id}
          >
            <span>
              {item.name}-{item.price}
            </span>
            <button
              style={{ marginLeft: "15px", padding: "5px" }}
              onClick={() => handleAddtoCart(item)}
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ProductList;
