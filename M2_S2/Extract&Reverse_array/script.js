function extractAndReverse(arr){
    let newarr = arr.slice(2,4); 
    let reversearr = [];
    for(let i=newarr.length-1; i>=0; i--){
        reversearr.push(newarr[i]);
    }
    return reversearr;
}


console.log(extractAndReverse([15, 30, 45, 60, 75, 90]));