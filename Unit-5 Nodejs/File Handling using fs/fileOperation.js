const fs = require("fs").promises;
const path = require("path");

const filePath = path.join(__dirname, "data.txt");

async function readFileData() {
  try {
    const data = await fs.readFile(filePath, "utf8");
    console.log("Initial File Content:\n", data);
  } catch (error) {
    console.log("Error reading file:", error.message);
  }
}

async function appendFileData() {
  const newContent = "\nThis is appended data";
  try {
    await fs.appendFile(filePath, newContent);
    console.log("Appending data...");
  } catch (error) {
    console.log("Error appending data", error.message);
  }
}

module.exports = {
  readFileData,
  appendFileData,
};
