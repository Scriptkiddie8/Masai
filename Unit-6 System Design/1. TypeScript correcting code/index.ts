// TS with types
function add(a: number, b: number): number {
  return a + b;
}

let result = add(10, 5);
console.log(result);

let invalidResult = add(10, "5");
