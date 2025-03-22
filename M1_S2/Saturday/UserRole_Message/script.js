function checkuser(user) {
  return user.role == "admin"
    ? user.active
      ? "Admin Access Granted!"
      : "Admin Access Revoked"
    : user.role == "user"
    ? user.active
      ? "User Access Granted!"
      : "User Access Revoked"
    : "Access Denied";
}

let user1 = { name: "Alice", role: "admin", active: false };
let user2 = { name: "Bob", role: "user", active: true };

console.log(checkuser(user1));
console.log(checkuser(user2));
