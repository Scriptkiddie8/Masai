const mongoose = require("mongoose");

const ConnectToDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/restaurant");
    console.log("Connected to DB");
  } catch (error) {
    console.log("Error in connecting DB", error);
  }
};

module.exports = ConnectToDB;
