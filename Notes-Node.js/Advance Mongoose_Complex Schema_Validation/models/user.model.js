const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderName: { type: String, required: true },
  orderAmount: { type: String, required: true },
  deliveryStatus: { type: Boolean, default: false },
  modeOfPayment: {
    type: String,
    enum: ["COD", "UPI", "NetBanking", "DebitCard", "CreditCard", "GiftCard"],
  },
});
//orderSchema created separately so we can make a code look better, we'll use it inside userSchema

const addressSchema = new mongoose.Schema({
  houseNo: { type: String, required: true },
  area: { type: String, required: true },
  landmark: String,
  tehsil: { type: String, required: true },
  district: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: Number, required: true },
  mobileNumber: { type: Number, required: true },
});
// We can call them a subdocument

const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, // name is required
  email: { type: String, required: true, unique: true }, // no duplicate email
  password: { type: String, default: "pass@123" }, // default will set the password if user dosen't enter any
  age: { type: Number, min: 20, max: 100 }, //data validation in Schema
  gender: { type: String, enum: ["male", "female"] }, //it will take only these syntax as gender not even "Male"
  order: [orderSchema], //This is called 'Embidded Document'
  address: [addressSchema],
});

const UserModel = mongoose.model("User", userSchema);
//'user' is a collection which will follow the 'userSchema' structure

module.exports = UserModel;
