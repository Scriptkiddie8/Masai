import React, { useContext } from "react";
import { FeedbackContext } from "../context/FeedbackContext";

const FeedbackSummary: React.FC = () => {
  const { data } = useContext(FeedbackContext);

  return (
    <div>
      <h2>Feedback Summary</h2>
      <p>
        <strong>Name:</strong> {data.name}
      </p>
      <p>
        <strong>Email:</strong> {data.email}
      </p>
      <p>
        <strong>Rating:</strong> {data.rating}
      </p>
      <p>
        <strong>Feedback:</strong> {data.feedback}
      </p>
    </div>
  );
};

export default FeedbackSummary;
