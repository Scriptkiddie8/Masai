const os = require("os");

function getSystemInfo() {
  console.log("System Information:");
  console.log("-------------------");
  console.log(`Architecture: ${os.arch()}`);
  console.log(`CPU Cores: ${os.cpus().length}`);
  console.log(`CPU Model: ${os.cpus()[0].model}`);
  console.log(`CPU Speed: ${os.cpus()[0].speed} MHz`);
  console.log(`Total Memory: ${(os.totalmem() / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`Free Memory: ${(os.freemem() / (1024 * 1024)).toFixed(2)} MB`);
  console.log(
    `Heap Memory Usage: ${(
      process.memoryUsage().heapUsed /
      (1024 * 1024)
    ).toFixed(2)} MB`
  );
  console.log(`OS Type: ${os.type()}`);
  console.log(`Hostname: ${os.hostname()}`);
}

module.exports = getSystemInfo;
