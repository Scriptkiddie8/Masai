const express = require("express");

const bcrypt = require("bcrypt");
const UserModel = require("../models/user.model");
const saltRounds = 10;
const myPlaintextPassword = "s0//P4$$w0rD";
const someOtherPlaintextPassword = "not_bacon";

var jwt = require("jsonwebtoken");

const UserRouter = express.Router();

UserRouter.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //hash the raw password
    bcrypt.hash(password, saltRounds, async function (err, hash) {
      // Store hash in your password DB.
      if (err) {
        res.status(500).json({ msg: "Something went wrong..." });
      } else {
        //hash genereated
        // console.log(`Rawpass: ${password} ; Hashedpass: ${hash}`);

        await UserModel.create({ username, email, password: hash });

        res.status(201).json({ msg: "Signup Success" });
      }
    });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong..." });
  }
});

UserRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await UserModel.findOne({ email });

    if (!user) {
      res.status(404).json({ msg: "User Not Found, Please Signup" });
    } else {
      let hash = user.password; //hashed stored password in DB

      bcrypt.compare(password, hash).then(function (result) {
        // result == true
        console.log(result);
        if (result) {
          //generate JWT and send along with the response
          var token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET_KEY
          );
          //   console.log(token);
          res.status(200).json({ msg: "Login Success", token });
        } else {
          res.status(403).json({ msg: "Wrong Password" });
        }
      });
    }
  } catch (error) {}
});

module.exports = UserRouter;
