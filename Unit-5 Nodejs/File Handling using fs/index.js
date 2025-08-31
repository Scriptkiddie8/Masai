const { readFileData, appendFileData } = require("./fileOperation");

async function main() {
  await readFileData();
  await appendFileData();
  console.log("\nUpdate File Content");
  await readFileData();
}

main();
