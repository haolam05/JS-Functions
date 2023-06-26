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
  alert(
    `${passenger.passport === 12345678 ? 'Checked in' : 'Wrong passport!'}`
  );
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
