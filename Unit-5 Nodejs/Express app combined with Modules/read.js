const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "Data.txt");

function readFileContent() {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) reject("Error reading file.");
      else resolve(data);
    });
  });
}

module.exports = readFileContent;
