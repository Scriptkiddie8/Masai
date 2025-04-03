function multi(a,b){
    return a*b;
}

console.log(multi.apply(null, [5,4]));