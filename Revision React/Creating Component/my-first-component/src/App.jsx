import "./App.css";
import UserCard from "./components/UserCard";

function App() {
  const users = [
    {
      id: 1,
      name: "Kartik",
      age: 25,
      location: "Bengaluru",
      img: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 2,
      name: "Ananya",
      age: 23,
      location: "Delhi",
      img: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 3,
      name: "Rahul",
      age: 27,
      location: "Mumbai",
      img: "https://randomuser.me/api/portraits/men/18.jpg",
    },
  ];

  return (
    <>
      <h1>User List</h1>
      <div className="user-list">
        {users.map((user) => (
          <UserCard
            key={user.id}
            name={user.name}
            age={user.age}
            location={user.location}
            img={user.img}
          />
        ))}
      </div>
    </>
  );
}

export default App;
