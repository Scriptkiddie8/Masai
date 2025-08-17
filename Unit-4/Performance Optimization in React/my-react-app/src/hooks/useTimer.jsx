import { useState, useEffect, useRef } from "react";

export function useTimer() {
  const [timer, setTimer] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimer((t) => t + 1);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  return timer;
}
