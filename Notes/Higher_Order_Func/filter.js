//filter: when we want some elements to be filetered out

let arr = [2,3,4,5,6,7,8];

let data = arr.filter((ele, i)=>{
    if(ele%2==0){
        return ele;
    }
})

console.log(data);
console.log(arr);
// if we have tried this with 'map' then we would get 'undefined' in the places where it is not returning anything

