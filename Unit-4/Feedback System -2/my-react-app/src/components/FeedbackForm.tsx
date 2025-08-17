import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FeedbackContext } from "../context/FeedbackContext";

const FeedbackForm: React.FC = () => {
  const { data, setData } = useContext(FeedbackContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: name === "rating" ? Number(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, rating, feedback } = data;

    if (!name || !email || !feedback || rating <= 0) {
      setError("Please fill all fields correctly.");
      return;
    }

    setError("");
    navigate("/summary");
  };

  return (
    <div>
      <h2>Feedback Form</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={data.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <br />
        <input
          name="email"
          value={data.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <br />
        <input
          name="rating"
          type="number"
          value={data.rating}
          onChange={handleChange}
          placeholder="Rating (1-5)"
        />
        <br />
        <textarea
          name="feedback"
          value={data.feedback}
          onChange={handleChange}
          placeholder="Feedback"
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FeedbackForm;
