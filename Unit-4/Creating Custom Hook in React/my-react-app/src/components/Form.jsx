import React from "react";
import useFormInput from "../hooks/useFormInput";

const Form = () => {
  const name = useFormInput("");
  const email = useFormInput("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Name: ${name.value}, Email: ${email.value}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" {...name} />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" {...email} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
