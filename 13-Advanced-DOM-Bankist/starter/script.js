'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');

///////////////////////////////////////
// Modal window

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

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  //the Y element of the button boundingbox changes as we scroll in the viewport
  console.log(e.target.getBoundingClientRect());
  //currentscroll position
  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);
  //height and width of viewport
  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  //Scrolling (relative to viewport or document? think about because sizes change make relative to make work, so add the currentscrollposition to make it relative)
  //This is to make it scroll to the right place
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  //to make the above smooth
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  //new way of doing this
  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////
// Page navigation (Event delegation)

//Below not the cleanest solution if you had 10.000 buttons because the event function would be created for each element this is where you want to use event delegation
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

//Delegate the event from the overlaying container (nav__links that is where the one event is generated and it bubbles up to the selected targt)
//1. Add event listener to common parent element
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  //2 Determine what element originated the event
  //Matching the right target element strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//Lesson 194 - building a Tabbed component
tabsContainer.addEventListener('click', function (e) {
  //get the closest complete tab (so not <span>) to the target that is clicked
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);

  //ignore clicks with null so not on one of the tabs but that do trigger the event (the container for example does not have a tab as a parent for closest to work) by using a 'Guard clause':
  if (!clicked) return; //finish function early

  //Active tab
  //before we add the active class remove it everywhere

  //Remove active classes everywhere so we can assign it to the clicked element
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  //Activate content area
  clicked.classList.add('operations__tab--active');
  console.log(clicked.dataset.tab);
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//Lesson 195 Passing Arguments to Event Handlers
//Menu fade animation (this works on the entire nav because events bubble up)
const handleHover = function (e, opacity) {
  console.log(this, e.currentTarget);
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = opacity;
    });
    logo.style.opacity = opacity;
  }
};

//To callback a function with arguments you have to create a function that calls another function pass in the event and the extra arguments needed
// nav.addEventListener('mouseover', function (e) {
//   handleHover(e, 0.5);
// });
// nav.addEventListener('mouseout', function (e) {
//   handleHover(e, 1);
// });

//The above is better done with binding the function (The bind() method creates a new function that, when called, has its this keyword set to the provided value, with a given sequence of arguments)
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

///////////////////////////////////
///////////// TESTS ///////////////
///////////////////////////////////

/*
//Lesson 186 Dom selecting, creating, deleting
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
    //before .remove was a thing you had to remove children like this
    //message.parentElement.removeChild(message);
  });
*/

/*
//Lesson 187 Styles, Attributes, Classes

/// STYLES ///
message.style.backgroundColor = '#37383d';
message.style.width = '120%';
message.style.padding = '10px 0';
//using style property only works for setting inline styles not reading whats defined in the stylesheet
console.log(message.style.height);
//So it works for an inline style like:
console.log(message.style.backgroundColor);
//But we can also get styles from the sylesheet using computed
console.log(getComputedStyle(message));
//You get a large list of properties on this element and you can select which you need:
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);
//ParseFloat to get the number out of the string to adjust it
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';
//CSS custom properties defined in the :root (document element)
//with name of property, and value
document.documentElement.style.setProperty('--color-primary', 'orangered');

/// ATTRIBUTES ///
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);

//Setting attributes
logo.alt = 'Beautiful minimalist logo';

//Non standard attributes
console.log(logo.designer); // undefined because this is not a standard property
console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'Bankist');

//For the relative URL other than src for absolute url for example, use get attribute
console.log(logo.getAttribute('src'));
//same for hrefs on links
const link = document.querySelector('.nav__link--btn');
console.log(link.href); //absolute
console.log(link.getAttribute('href')); //relative

//Data attributes (stored in datasets)
console.log(logo.dataset.versionNumber);

/// CLASSES ///
//adding and removing does not interfere with already existing classes
logo.classList.add('c');
logo.classList.remove('c');
logo.classList.toggle('c');
logo.classList.contains('c'); // not includes like in arrays

//Don't use this only allows for 1 class and overwrites all other classes
logo.className = 'jonas';
*/

/*
//Lesson 188 Smooth scrolling
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  //the Y element of the button boundingbox changes as we scroll in the viewport
  console.log(e.target.getBoundingClientRect());
  //currentscroll position
  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);
  //height and width of viewport
  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  //Scrolling (relative to viewport or document? think about because sizes change make relative to make work, so add the currentscrollposition to make it relative)
  //This is to make it scroll to the right place
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  //to make the above smooth
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  //new way of doing this
  section1.scrollIntoView({ behavior: 'smooth' });
});
*/

/*
//Lesson 189 types of events and event handlers

//An event is basically a signal that something happened triggered by a DOM node. Anything of importance on a webpage triggers an event. We can listen to when these events happen and execute some code.

const h1 = document.querySelector('h1');

const alertH1 = function (e) {
  alert('addEventListener: Great! You are reading the heading :D');

  //after event we can remove eventlistener, if you only want to listen to the event once
  //h1.removeEventListener('mouseenter', alertH1);
};

h1.addEventListener('mouseenter', alertH1);

//or after three seconds have passed remove the eventlistener
setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

//For each event there is an ON.. variant
//However this is dated/old school
// h1.onmouseenter = function (e) {
//   alert('addEventListener: Great! You are reading the heading :D');
// };

//eventlistener is better for two reasons
//1 add multiple event listeners to the same event
//2 can actually remove an eventlistener if we dont need it anymore (we need name function)
*/

/*
//Lesson 190 + 191 Event Propagation: Bubbling and Capturing / Event propagation in practice

// rgb(255, 255, 255)
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
console.log(randomColor(0, 255));

//Clicking on this child of nav__links changes both colors
document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget); // shows what the clickable event target is
  console.log(this, 'LINK');
  console.log(this === e.currentTarget);

  //stopping the propagation
  //e.stopPropagation();
});

//Then clicking on the part of the nav__links that is not nav__link only changes the bg in this parent element
document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('CONTAINER', e.target, e.currentTarget); // shows what the clickable event target is
  console.log(this, 'CONTAINER');
  console.log(this === e.currentTarget);
});

document.querySelector('.nav').addEventListener(
  'click',
  function (e) {
    this.style.backgroundColor = randomColor();
    console.log('NAV', e.target, e.currentTarget); // shows what the clickable event target is
    console.log(this, 'NAV');
    console.log(this === e.currentTarget);
  },
  true //listening to capturing events so this nav will be first to show up
);

//The target is the same and bubbles up. there is only one target. e.target but when you see the currentTarget (same as This) it shows.
*/

/*
//193 - DOM traversing
const h1 = document.querySelector('h1');

//Going downwards: children
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes); //all child nodes
console.log(h1.children); //direct children
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

//Upwards: parents
console.log(h1.parentNode);
console.log(h1.parentElement);
2;

//Not direct parent or far away in DOM tree (often used)
h1.closest('.header').style.background = 'var(--gradient-secondary)';

//closest is the opposite of querySelector (upwards to parents)
h1.closest('h1').style.background = 'var(--gradient-primary)';

//Going sideways: siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);
console.log(h1.previousSibling);
console.log(h1.nextSibling);

//Up and down (in this case HTML collection)
console.log(h1.parentElement.children);
//Looping over the collection/array
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});
*/
