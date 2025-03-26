
//1. Arrow funcion

let add = (a,b) => {
    return a+b;
}

let sum = (a,b)=>a+b;  // default return the value(same as add function no difference)

console.log(add(a,b));
console.log(sum(a,b));

//2.  arrow function inside object can't access 'this' keyword e.g. this.name 
