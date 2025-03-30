//Array Methods

let arr = ["one", "two", "three", "four"]

//includes()  :: search for the keyword and return true or false
console.log(arr.includes("five"))  //return false


//slice()   :: does not update in original array 
let narr = arr.slice(1,3) 
console.log(narr) // ["two", "three"]
console.log(arr)   // ["one", "two", "three", "four"]


//splice()  :: updates the original array
let arr2 = ["kartik", "Paras", "Kittu", "Muttu"]
arr2.splice(1, 2, "Hello", "World")  // (starting index , ending index, values to be replaced)
console.log(arr2)  // ["Kartik", "Hello", "World", "Muttu"]
