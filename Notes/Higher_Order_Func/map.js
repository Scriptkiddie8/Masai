// map :

let arr = [
    {
        product: "Watch",
        price: 1500,
        category: "Accessories"
    },
    {
        product: "Mobile",
        price: 2000,
        category: "Electronics"
    },
    {
        product: "TV",
        price: 5000,
        category: "Electronics"
    },
    {
        product: "Frige",
        price: 3000,
        category: "Electronics"
    }
]

//uswecase: lets say we have to apply discount on Diwali as 10%

let mydata = arr.map((ele, i)=>{
    ele.price = ele.price - (ele.price/10);
    return ele.price;
})

console.log(mydata);

//arr is same as original 
console.log(arr);



