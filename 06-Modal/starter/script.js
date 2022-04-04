'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
//Select all the buttons that have this class
const btnsOpenModal = document.querySelectorAll('.show-modal');

for (let i = 0; i < btnsOpenModal.length; i++) {
  //Show the buttons as HTML elements
  console.log(btnsOpenModal[i]);
  //Show the text content of each button
  console.log(btnsOpenModal[i].textContent);
}
