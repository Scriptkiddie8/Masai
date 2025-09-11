const User = require("../models/User");

// Route 1
exports.addUser = async (req, res) => {
  // Create user with validations
};

// Route 2
exports.addProfile = async (req, res) => {
  // Add profile to a specific user
};

// Route 3
exports.getUsers = async (req, res) => {
  // Return all users and their profiles
  // Optional filter: ?gender=male
};

// Route 4
exports.searchProfiles = async (req, res) => {
  // Search profiles by name or profileName (regex)
};

// Route 5
exports.updateProfile = async (req, res) => {
  // Update specific profile by profileName
};

// Route 6
exports.deleteProfile = async (req, res) => {
  // Remove specific profile by profileName
};
