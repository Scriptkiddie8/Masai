
//JSON: JavaScript Object Notation is a text based format not a programming language

//JSON syntax : keys should be in string format and there should not be any traling commas
let jsonarr = [
    {
        "name" : "Kartik",
        "age" : 24,
        "profession" : "Developer"
    }
]


//JS Syntax this is normal syntax that we use to define it in js for object
let arr = [
    {
        name: "Kartik",
        age: 24,
        profession: "Developer",
    },
    {
        name: "king",
        age: 55,
        profession: "rule"
    },
]

// JSON.Stringify -> JSON format
// JSON.parse -> JSON format to JS format

let config = JSON.stringify(arr); // converting normal array into json format
console.log(config);

let jconfig = JSON.parse(config);
console.log(jconfig);


