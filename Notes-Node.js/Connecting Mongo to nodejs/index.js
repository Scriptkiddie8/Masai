const mongoose = require("mongoose"); // imported

//establise a connection with DB
const ConnectToDb = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/backendtest"); //backendtest is database we named
    console.log("connected to DB");
  } catch (error) {
    console.log("Error in connecting DB");
    console.log(error);
  }
};

ConnectToDb();

//create a Schema
//Schema is a structure/blue print how a typical document should look like

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  location: String,
  isMarried: Boolean,
});

//Schema will directly interact with Mongo??
//Model is responsible to interact with DB
//Model is constructor which connects Collection and Schema

const UserModel = mongoose.model("User", userSchema); //User is collection name

// UserModel.create({
//   name: "Alice",
//   age: 34,
//   location: "Delhi",
//   isMarried: false,
// }).then(() => {
//   console.log("Data Added in backendtest Database");
// });

// let newUser = new UserModel({
//   name: "Charlie",
//   age: 37,
//   location: "Banglore",
//   isMarried: true,
// });

// newUser
//   .save()
//   .then(() => {
//     console.log(
//       "Data Added in Database under Collection User in Database backendtest"
//     );
//   })
//   .catch((err) => {
//     console.log("Error in inserting the data", err);
//   });

let users = UserModel.find();

users
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log("Error in finding the user", err);
  });

let updatedUser = UserModel.findByIdAndUpdate("68c14e8c3b257d50116064a5", {
  name: "Alice Chako",
});

updatedUser
  .then(() => {
    console.log("User Updated");
  })
  .catch((err) => {
    console.log("Error in updating");
  });
