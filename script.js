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
const high5 = () => console.log('👋');
document.body.addEventListener('click', high5);
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
const getAgeCat2 = getAge.bind(cat, 'Cat')
getAgeCat2(); // 21
getAge.bind(cat, 'Cat')(); // 21
