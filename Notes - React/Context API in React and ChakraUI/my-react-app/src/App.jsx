import { useState } from "react";
import "./App.css";
import { createContext, useContext } from "react";

//Step:1 - Create Context
const UserContext = createContext();

function App() {
  const [user, setUser] = useState("Kittu");

  //Step:2 - Provide Context
  return (
    <UserContext.Provider value={user}>
      <Parent />
    </UserContext.Provider>
  );
}

function Parent() {
  return <Child />;
}

function Child() {
  return <GrandChild />;
}

function GrandChild() {
  //Step:3 - use Context (Final step)
  const user = useContext(UserContext);
  return <h1>Hello, {user}</h1>;
}

export default App;
