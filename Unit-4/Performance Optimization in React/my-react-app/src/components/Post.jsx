import React, { useState, useCallback, useMemo } from "react";

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

function Post({ post, toggleVerify }) {
  // useMemo to memoize the background color
  const bgColor = useMemo(() => getRandomColor(), []);

  return (
    <div
      style={{
        backgroundColor: bgColor,
        padding: "1rem",
        marginBottom: "1rem",
      }}
    >
      <h4>{post.title}</h4>
      <p>{post.body}</p>
      <p>Verified: {post.verified ? "Yes" : "No"}</p>
      <button onClick={() => toggleVerify(post.id)}>Verify</button>
    </div>
  );
}

export default React.memo(Post);
