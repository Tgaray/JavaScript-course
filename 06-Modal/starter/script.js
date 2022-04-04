'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
//Select all the buttons that have this class
const btnsOpenModal = document.querySelectorAll('.show-modal');

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++) {
  btnsOpenModal[i].addEventListener('click', openModal);
}

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

//Pass the keydown event into the function as the "e"vent and read it
document.addEventListener('keydown', function (e) {
  console.log(e, e.key);
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    //If the esc key is pressed and If the model does not contain the hidden class then close the modal
    closeModal();
  }
});

/* 
for (let i = 0; i < btnsOpenModal.length; i++) {
  //Click event for each button to see which button was pressed
  console.log(
    btnsOpenModal[i].addEventListener('click', function () {
      console.log(`button ${Number([i]) + 1} clicked`);
      modal.classList.remove('hidden');
      overlay.classList.remove('hidden');
    })
  );
} 
*/
