const mongoose = require("mongoose");

const ConnectToDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/mydatabase");
    console.log("Connected To DB!");
  } catch (error) {
    console.log("Error in connecting to DB", error);
  }
};

module.exports = ConnectToDB;
