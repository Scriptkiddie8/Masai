let calci = {
  a: 10,
  b: 20,
  add: function () {
    console.log(this.a + this.b);
  },
  sub: () => {
    console.log(this.b - this.a);
  },
};

calci.add(); // this will add
calci.sub(); //but this will not sub because arrow function don't have its own 'this' keyword

//2. case where arrow fn can access 'this' keyword
let calci2 = {
  a: 10,
  b: 20,
  add: function () {
    console.log(this.a + this.b);
    sub: () => {
      console.log(this.b - this.a);
    };
  },
};

calci2.add();
calci2.add().sub(); // but in this case can sub because it is taking 'this' from normal function as arrow fn is defined inside normal function
