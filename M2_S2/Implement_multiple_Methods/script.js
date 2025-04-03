function filterEvenNumber(arr){
    return arr.filter(ele=>ele%2==0)
}

function sumofarray(arr){
    return arr.reduce((acc,curr)=>acc += curr)
}

function sortAndconcate(arr, arr2){
    const sortedarr = [...arr].sort((a,b)=>a-b);
    const sortedarr2 = [...arr2].sort((a,b)=>a-b);
    return sortedarr.concat(sortedarr2);
}

let arr = [1,2,5,4,3,6];
let arr2 = [7,8,9,10,11,12];
console.log(filterEvenNumber(arr));
console.log(sumofarray(arr));
console.log(sortAndconcate(arr,arr2));