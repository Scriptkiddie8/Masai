import React from "react";

function UserCard(props) {
  return (
    <div className="user-card">
      <img src={props.img} alt={props.name} className="profile-pic" />
      <h2>Name: {props.name}</h2>
      <h3>Age: {props.age}</h3>
      <h3>Location: {props.location}</h3>
    </div>
  );
}

export default UserCard;
