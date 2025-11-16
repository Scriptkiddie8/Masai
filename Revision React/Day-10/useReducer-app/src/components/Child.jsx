import React from "react";

const Child = React.memo(({ count }) => {
  console.log("Child Re-rendered");
  return (
    <>
      <div>Count: {count}</div>
    </>
  );
});

export default Child;
