console.log("entered the file");

test1();

function test1() {
  console.log("entered the test1 function");
  console.log(this);
  console.log("ended up with test1 function");
}

var test2 = function() {
  console.log("entered the test2 function");
};

function test3() {
  console.log("entered test3 function");
  function innerTest() {
    console.log("entered inerTest function");
    console.log(this);
    console.log("ended innerTest");
  }
  console.log(this);
  innerTest();
  console.log("ended test3");
}

test3();

var obj = {
  a: 3,
  b: 4,
  sums: test1
};

obj.sums();

document.querySelector("button.click").addEventListener("click", function() {
  alert("clicked on the button");
  console.log(this);
});

// Function constructors

function Person(name, birthDate, job) {
  this.name = name;
  this.birthDate = birthDate;
  this.job = job;
  var sample = "this is a sample one";

  var getSample = function() {
    console.log(sample);
  };
}

Person.prototype.calcAge = function() {
  return 2019 - this.birthDate;
};

Person.prototype.print = function(func) {
  console.log("Output: " + this.calcAge());
};

var a = new Person("Rammanoj", 1999, "Software Developer");
a.getSample();
