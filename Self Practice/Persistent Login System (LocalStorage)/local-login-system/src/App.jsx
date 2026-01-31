import { useEffect, useState } from "react";
import "./App.css";
import Dashboard from "./components/Dasboard";
import Login from "./components/Login";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) {
      setIsLogin(true);
    }
  }, []);

  return (
    <>
      {isLogin ? (
        <Dashboard islogout={() => setIsLogin(false)} />
      ) : (
        <Login islogin={() => setIsLogin(true)} />
      )}
    </>
  );
}

export default App;
