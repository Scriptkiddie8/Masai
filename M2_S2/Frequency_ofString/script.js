let str = "masai";
let obj = {};

for(let char of str){
    obj[char] = (obj[char] || 0)+1;
}

console.log(obj)