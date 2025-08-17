import { createContext, useState } from "react";
import type { ReactNode } from "react";
import type { FeedbackData } from "../types/Feedback";

interface FeedbackContextType {
  data: FeedbackData;
  setData: (data: FeedbackData) => void;
}

const defaultData: FeedbackData = {
  name: "",
  email: "",
  rating: 0,
  feedback: "",
};

export const FeedbackContext = createContext<FeedbackContextType>({
  data: defaultData,
  setData: () => {},
});

export const FeedbackProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<FeedbackData>(defaultData);

  return (
    <FeedbackContext.Provider value={{ data, setData }}>
      {children}
    </FeedbackContext.Provider>
  );
};
