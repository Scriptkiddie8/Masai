import React from "react";

const UserList = ({ user }) => {
  return (
    <li>
      {user.name} --- {user.email}
    </li>
  );
};

export default UserList;
