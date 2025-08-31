const EventEmitter = require("events");

const eventEmitter = new EventEmitter();

eventEmitter.on("log", (message) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] Event Logged: ${message}`);
});

module.exports = eventEmitter;
