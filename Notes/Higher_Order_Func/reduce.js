let arr = [2,3,4,4,23,13,6,9,2];

let data = arr.reduce((acc, curr)=>{
    return acc = acc + curr;
}, 10)
//acc ->  accumulator
//curr -> current
// here we have passed 10 as 'acc' but if would have not passed that, by default it points to '0'th index


console.log(data);



