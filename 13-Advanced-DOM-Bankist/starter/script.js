'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////
///////////// TESTS ///////////////
///////////////////////////////////

/// SELECTING ELEMENTS ///

//Selecting the document (entire HTML)
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

//Query selectors
const header = document.querySelector('.header');
//Gives a nodelist of all the selected nodes
//If something gets live deleted from nodelist it still exists in the nodelist
const allSections = document.querySelectorAll('.section');
console.log(allSections);

//Getelement by ID or Class
document.getElementById('section--1');
//getElementsByTagName Gives a live HTML collection is different from node list
//Which means if i delete something from the HTML the collection is also updated
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);
//By classname
console.log(document.getElementsByClassName('btn'));

/// CREATING AND INSERTING ELEMENTS ///

// .insertAdjacentHTML (in bankist app to create movements) quick and easy
//Creating a div and storing it in the const but not yet in de actual DOM visible
const message = document.createElement('div');
message.classList.add('cookie-message');
//message.textContent = 'We use cookies for improved functionality and analytics.';
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button> ';
//Insert in DOM header (as first child)
//header.prepend(message);

//add as last child (message can only be added once because its a live element in the DOM) so last thing applies -> appends
header.append(message);

//making a copy with cloneNode so we will have multiple possible messages (and true for all the children)
//header.append(message.cloneNode(true));

//before header element as sibling
//header.before(message);
//after header as sibling
//header.after(message);

/// DELETING ELEMENTS ///

document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });
