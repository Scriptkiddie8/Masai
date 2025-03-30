
// Closure is important for encapsulation a code.
// What is lexical scoping ? : 
// A child function can access the variable from parent function without passing into it: is lexical scoping!


function counter(){
    let count =0;
    function childCounter(){
        count++;
        console.log(count);
    }
    return childCounter;
}

let counting = counter();

console.log(counting());
console.log(counting());
console.log(counting());
console.log(counting());
console.log(counting());


//2. Another problem

// function multiplier(factor) {
//     return function (number) {
//       return number * factor;
//     };
//   }
//   const double = multiplier(2);
//   console.log(double(5));
  

//3. Another Problem
// function bankAccount(initialBalance) {
//     let balance = initialBalance;
//     return {
//       deposit: function (amount) {
//         balance += amount;
//         console.log("Balance:", balance);
//       },
//       withdraw: function (amount) {
//         balance -= amount;
//         console.log("Balance:", balance);
//       },
//     };
//   }
//   const myAccount = bankAccount(100);
//   myAccount.deposit(50);
//   myAccount.withdraw(30);
  