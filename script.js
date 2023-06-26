'use strict';

// Default parameters
const createBooking = function (flightNum, numPassengers = 1, price = 199) {
  const bookings = [];
  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};
createBooking('LH123');
createBooking('LH123', 2, 800);
createBooking('A120', undefined, 10);

// Pass by values and pass by references
const checkIn = function (flightNum, passenger) {
  flightNum = 'L345'; // primitive(string) -> pass by value (create a copy) -> original str is NOT affected
  passenger.name = `Mr. ${passenger.name}`; // references (object) -> pass by reference => original object is being changed
  // alert(
  //   `${passenger.passport === 12345678 ? 'Checked in' : 'Wrong passport!'}`
  // );
};
const flight = 'L234';
const hao = { name: 'Hao', passport: 12345678 };
checkIn(flight, hao);
console.log(flight);
console.log(hao);
const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 10 ** 8);
};
newPassport(hao);
checkIn(flight, hao);

// Higher order function
// 1. function that receives another function
const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};
const transformer = function (str, fn) {
  console.log(`Tranformed string: ${fn(str)} by ${fn.name} function`);
};
transformer('Javascript is the best!', oneWord);
// const high5 = () => console.log('👋');
// document.body.addEventListener('click', high5);
// 2. function that returns new function
const greet = greeting => name => console.log(`${greeting} ${name}`);
const greetHey = greet('Hey');
greetHey('Hao');
greet('Hey')('Hao');

// Call method
console.log('Call method');
const hao2 = {
  age: 22,
  getAge(name) {
    console.log(`${name} is ${this.age}.`);
  },
};
hao2.getAge('Hao'); // 22
const cat = { age: 21 };
const getAge = hao2.getAge;
// getAge('Cat'); // this === undefined because it's a regular function call (no owner)
getAge.call(cat, 'Cat'); // 21
// Apply method
console.log('Apply method');
getAge.apply(cat, ['Cat']); // 21
/// Bind method
const getAgeCat1 = getAge.bind(cat);
console.log('Bind method');
getAgeCat1('Cat'); // 21
getAge.bind(cat)('Cat');
const getAgeCat2 = getAge.bind(cat, 'Cat');
getAgeCat2(); // 21
getAge.bind(cat, 'Cat')(); // 21
// bind with eventListner
hao.planes = 10;
hao.buyPlane = function () {
  this.planes++;
  console.log(this.planes);
};
// document.querySelector('.buy').addEventListener('click', hao.buyPlane); // NaN
document
  .querySelector('.buy')
  .addEventListener('click', hao.buyPlane.bind(hao)); // 11

// Partial Application (not interested in this keyword, but interested in preset parameters)
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));
const addVAT = addTax.bind(null, 0.23);
console.log(addVAT(100));
console.log(addVAT(23));
const addTax2 = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};
const addVAT2 = addTax2(0.23);
console.log(addVAT2(100));
console.log(addVAT2(23));

// Coding Challenge #1
const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    const idx = Number(
      prompt(
        `${this.question}\n${this.options.join('\n')}\n(Write option number)`
      )
    );
    typeof idx === 'number' &&
      idx >= 0 &&
      idx < this.answers.length &&
      this.answers[idx]++;
    this.displayResults('string');
  },
  displayResults(type = 'array') {
    if (type === 'array') {
      console.log(this.answers);
    } else if (type === 'string') {
      console.log(`Poll results are ${this.answers.join(', ')}`);
    }
  },
};
document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));
const data1 = [5, 2, 3];
const data2 = [1, 5, 3, 9, 6, 1];
const displayPoll = poll.displayResults;
displayPoll.call({ answers: data1 });
displayPoll.call({ answers: data1 }, 'string');
displayPoll.call({ answers: data2 });
displayPoll.call({ answers: data2 }, 'string');
