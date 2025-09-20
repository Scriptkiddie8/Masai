const express = require("express");

const bcrypt = require("bcrypt");
const UserModel = require("../models/user.model");
const saltRounds = 10;
const myPlaintextPassword = "s0//P4$$w0rD";
const someOtherPlaintextPassword = "not_bacon";
const passport = require("passport");
const GitHubStrategy = require("passport-github2");
var jwt = require("jsonwebtoken");

require("dotenv").config();
const UserRouter = express.Router();

UserRouter.post("/signup", async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    //hash the raw password
    bcrypt.hash(password, saltRounds, async function (err, hash) {
      // Store hash in your password DB.
      if (err) {
        res.status(500).json({ msg: "Something went wrong..." });
      } else {
        //hash genereated
        // console.log(`Rawpass: ${password} ; Hashedpass: ${hash}`);

        await UserModel.create({ username, email, password: hash, role });

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
          var accessToken = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET_KEY,
            { expiresIn: 30 }
          );
          var refreshToken = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET_KEY,
            { expiresIn: 60 }
          );
          //   console.log(token);
          res
            .status(200)
            .json({ msg: "Login Success", accessToken, refreshToken });
        } else {
          res.status(403).json({ msg: "Wrong Password" });
        }
      });
    }
  } catch (error) {
    res.status(401).json({ msg: "Something went wrong" });
  }
});

//Github OAuth
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, done) {
      console.log("Profile from GitHub", profile);
      return done(null, profile);
    }
  )
);

//Calls Github Login or Authorization Page
UserRouter.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

//Login route in case of login success/ failure
UserRouter.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    session: false,
    failureRedirect: "/login",
  }),
  async function (req, res) {
    const gitHubUserId = req.user.id;
    const user = await UserModel.find({ profileId: gitHubUserId });
    if (!user.length) {
      //store user in DB and generate token
      let newUser = await UserModel.create({ profileId: gitHubUserId });

      var token = jwt.sign(
        { userId: newUser._id, role: newUser.role },
        process.env.JWT_SECRET_KEY
      );

      res.json({ msg: "New User Login Success", token });
    } else {
      //user found so directly send a token
      var token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET_KEY
      );
      //   console.log(token);
      res.status(200).json({ msg: "Existing User Login Success", token });
    }

    // res.json({ msg: "Login Success", token });
  }
);
module.exports = UserRouter;
