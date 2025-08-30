const isPrime = require("./isPrime");

const number = [2, 10, 17, 21, 29];

number.forEach((n) => {
  console.log(`${n} is ${isPrime(n) ? "a prime" : "not a prime"} number.`);
});
