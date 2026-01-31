function Dashboard({ islogout }) {
  const data = localStorage.getItem("user");

  const handleLogout = () => {
    localStorage.removeItem("user");
    islogout();
  };

  return (
    <>
      <h2>This is Dashboard...</h2>
      <h3>Welcome, {data}</h3>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}

export default Dashboard;
