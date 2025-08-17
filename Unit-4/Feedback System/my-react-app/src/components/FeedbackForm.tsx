import React, { useState } from "react";
import type { FeedbackData } from "../types/Feedback";

const initialState: FeedbackData = {
  name: "",
  email: "",
  rating: 0,
  feedback: "",
};

const FeedbackForm: React.FC = () => {
  const [formData, setFormData] = useState<FeedbackData>(initialState);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rating" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    const { name, email, rating, feedback } = formData;
    if (!name || !email || !feedback || rating <= 0) {
      alert("Please fill in all fields properly.");
      return;
    }

    setSubmitted(true);
    setFormData(initialState); // Reset form
  };

  return (
    <div>
      <h2>Customer Feedback Form</h2>
      {submitted && (
        <p style={{ color: "green" }}>Thank you for your feedback!</p>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        <br />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <br />

        <input
          type="number"
          name="rating"
          placeholder="Rating (1-5)"
          value={formData.rating || ""}
          onChange={handleChange}
          min={1}
          max={5}
        />
        <br />

        <textarea
          name="feedback"
          placeholder="Your feedback"
          value={formData.feedback}
          onChange={handleChange}
        />
        <br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FeedbackForm;
