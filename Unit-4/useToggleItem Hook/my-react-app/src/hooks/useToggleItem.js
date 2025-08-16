import { useState } from "react";

function useToggleItems(initialValue, initialPosition = 0) {
  const [currentIndex, setCurrentIndex] = useState(initialPosition);

  const toggleState = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === initialValue.length - 1 ? 0 : prevIndex + 1
    );
  };

  return [initialValue[currentIndex], toggleState];
}

export default useToggleItems;
