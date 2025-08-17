import React from "react";
import useFetchData from "../hooks/useFetchData";

const DataFetcher = () => {
  const { data, loading, error } = useFetchData(
    "https://jsonplaceholder.typicode.com/posts"
  );

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Posts</h2>
      <ul>
        {data.slice(0, 5).map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default DataFetcher;
