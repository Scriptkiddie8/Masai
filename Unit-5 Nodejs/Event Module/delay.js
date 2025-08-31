function delayResponse(message, delayMs) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(message);
    }, delayMs);
  });
}

module.exports = delayResponse;
