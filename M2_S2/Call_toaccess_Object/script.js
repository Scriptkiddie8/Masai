function personInfo(){
    console.log(`My name is ${this.name} and my age is ${this.age}`);
}

let obj = {
    name : "Kartik",
    age : 24,
}

personInfo.call(obj);