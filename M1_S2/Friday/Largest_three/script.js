function findmax(a,b,c){

   return (a>b && a>c) ? (a) : 
    ((b>a && b>c) ? (b) : 
    ((c>a && c>b) ? (c) : (-1)))


}


console.log(findmax(45,78,33)); 
console.log(findmax(2,-1,5)); 