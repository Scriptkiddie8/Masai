const mongoose = require("mongoose");

const ConnectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB");
  } catch (error) {
    console.log("Failed to connect DB", error);
  }
};

module.exports = ConnectToDb;
