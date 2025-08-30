const factorial = require("./factorial");

const number = [5, 7, 10];

number.forEach((n) => {
  console.log(`Factorial of ${n} is: ${factorial(n)}`);
});
