
// Closure is important for encapsulation a code.

function counter(){
    let count =0;
    function childCounter(){
        count++;
        console.log(count);
    }
    return childCounter;
}

let counting = counter();

console.log(counting());
console.log(counting());
console.log(counting());
console.log(counting());
console.log(counting());