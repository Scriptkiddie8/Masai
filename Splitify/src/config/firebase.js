// src/config/firebase.js
const admin = require("firebase-admin");
const path = require("path");

let serviceAccount;

if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
  // Production / deployment: read from env var (Vercel, Render, etc.)
  try {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
  } catch (err) {
    console.error("Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY:", err);
    throw err;
  }
} else {
  // Local development: read from local file (ignored by git)
  serviceAccount = require(path.join(
    __dirname,
    "../../serviceAccountKey.json"
  ));
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
