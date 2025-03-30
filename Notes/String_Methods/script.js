// search() method   :: returns the index at which the value is present and if not then by default returns -1
let str = "masaischool"

function greet (element){
        let value = str.search(element)
        return value == -1 ? "Not Found" : value

                        //if value passed for search is not present then it by default returns -1 
}

console.log(greet("sch")) // '5' as sch start from 5th index


//charAt() method  :: finds the char present at that index
console.log(str.charAt(7)) // 'h' this will give the character present in that index

//trim()  :: removes white spaces
let str2 = "   Kartik Garg  "

str2 = str2.trim();

console.log(str2) // 'Kartik Garg' removes white spaces from starting and end but not from between

//split()  :: convert string into an array
let str3 = "The quick brown frog jumps over the lazy dog"

let arr = str3.split(" ")

console.log(arr) //this will give array which has all the strings which are present in str3 as spliting it by
                // space


//join()     :: opposite of split as it converts array into string
