//1: Double each value of the array

let arr = [1,2,3,4,5,6,7,8];

let data = arr.map((ele, i)=>{
    ele = ele*2;
    return ele;
})

console.log(data)