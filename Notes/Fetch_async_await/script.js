// fetch(url) : fetch is a function in which we pass a url to collect the data from that url and fetch return that data in form of promise so we access it by using .then()

//await : await is a keyword which will be used to handle the promise, but it enables only when we use async keyword written in function

//async function also return in promise

//try catch are similar like we hae if else conditions

// Approach : 1
let myfetch = fetch("https://fakestoreapi.com/products");

myfetch
  .then((res) => {
    return res.json();
  }) //.json will also being a promise so we will be using another .then to access
  .then((res) => {
    console.log(res);
  })
  .catch((err) => console.log(err));


// Approach : 2 (both approach are doing same thing)
async function getData() {
  try {
    let data = await fetch("https://fakestoreapi.com/products");
    let check = await data.json();
    console.log(check);
  } catch (err) {
    console.log(err);
  }
}

getData();
