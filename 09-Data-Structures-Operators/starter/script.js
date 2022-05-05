'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const hours = {
  [weekdays[2]]: {
    open: 11,
    close: 20,
  },
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  [weekdays[5]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  //Lesson 112 ES6 enhanced object literals
  //1 include an object into another object
  hours,
  //2 methods without ": function"
  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
  //Passing in one argument (an object) and splitting the properties of the object up in their seperate property value pairs
  orderDelivery({ starterIndex = 1, mainIndex = 0, time = '20:00', address }) {
    console.log(
      `Order received ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },

  orderPasta(ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}`
    );
  },

  orderPizza(mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};

//Lesson 123 Working with strings

//Split splits everything up by a character and puts them in seperate indexes in an array
console.log('a+very+nice+string'.split('+'));
console.log('Theron Garay'.split(' '));
const [firstName, lastName] = 'Theron Garay'.split(' ');
console.log(firstName, lastName);

//Join, joining seperate values into one string (join them with spaces in between)
const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
console.log(newName);

//Function to capitalize every first letter in a name
const capitalizeName1 = function (name) {
  const names = name.split(' ');
  const namesUpper = [];

  for (const n of names) {
    namesUpper.push(n[0].toUpperCase() + n.slice(1));
  }
  console.log(namesUpper.join(' '));
};
capitalizeName1('Jessica ann smith davis');
capitalizeName1('theron garay');

//Another example function to capitalize every first letter in a name
const capitalizeName2 = function (name) {
  const names = name.split(' ');
  const namesUpper = [];

  for (const n of names) {
    namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
  }
  console.log(namesUpper.join(' '));
};
capitalizeName2('Jessica ann smith davis');
capitalizeName2('theron garay');

//Padding a string to achieve a certain amount of characters in a string
const message = 'Go to gate 23!';
console.log(message.padStart(20, '+').padEnd(30, '+'));
console.log('Theron'.padStart(20, '+').padEnd(30, '+'));

//More real world example of padding (credit card for example)
const maskedCreditCard = function (number) {
  //convert number to string, this happens when one of the operants is a '' string it converts everything to a string
  const str = number + '';
  const last = str.slice(-4);
  return last.padStart(str.length, '*');
};
console.log(maskedCreditCard(5124223346));
console.log(maskedCreditCard(5124234332345436));
console.log(maskedCreditCard('5124905509345486'));

//Repeat, longer string with repetitions of the same string
const message2 = 'Bad weather... All Departures Delayed...';
console.log(message2.repeat(4));

const planesInLine = function (n) {
  console.log(`There are ${n} planes in line ${'✈️'.repeat(n)} `);
};
planesInLine(9);
planesInLine(5);
planesInLine(11);

/// CODING CHALLENGE 4 ///

//CHALLENGE DESCRIPTION
/* 
Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

Afterwards, test with your own test data!

GOOD LUCK 😀
*/

//SOLUTION
/* 
document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

document.querySelector('button').addEventListener('click', function () {
  const text = document.querySelector('textarea').value;
  const lower = text.toLowerCase();
  const rows = lower.split('\n');

  //With entries make it an array with indexes you can use for the repeat
  for (const [i, row] of rows.entries()) {
    const [first, second] = row.toLowerCase().trim().split('_');
    const output = `${first}${second.replace(
      second[0],
      second[0].toUpperCase()
    )}`;
    console.log(`${output.padEnd(20, ' ')}${'✅'.repeat(i + 1)}`);
  }
});
*/

/* 
//Lesson 122 Working with strings
const airline = 'TAP Air Portugal';

console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

//Fix capitalisation in name
const passenger = 'tHeRon';
const passengerLower = passenger.toLowerCase();
const passengerCorrect = passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect);

//Check E-mail (E-mails should still be valid with capitalisation differences)
const email = 'hello@gmail.com';
const loginEmail = ' Hello@Gmail.Com \n';
const lowerEmail = loginEmail.toLowerCase();
const trimmedEmail = lowerEmail.trim();
console.log(trimmedEmail);

//All in one go
const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(normalizedEmail);
console.log(email === normalizedEmail);

//Replacing
const priceGB = '288,97£';
const priceUS = priceGB.replace('£', '$').replace(',', '.');
console.log(priceUS);
const announcement = 'All passengers come to boarding 23. boarding 23!';
console.log(announcement.replace('boarding', 'gate'));
//regular expression (in the future solvable with replaceAll)
console.log(announcement.replace(/boarding/g, 'gate'));

//Three methods that return booleans (inclued startsWith endsWith)
const plane = 'A320neo';
console.log(plane.includes('A32'));
console.log(plane.includes('Boeing'));
console.log(plane.startsWith('A32'));
console.log(plane.startsWith('32'));
console.log(plane.endsWith('Boeing'));
console.log(plane.endsWith('neo'));

const newPlane = 'Airbus A320neo';
if (newPlane.startsWith('Airbus') && newPlane.endsWith('neo')) {
  console.log(
    'Correct start and end for the plane name, part of the new Airbus family'
  );
}

//Practices example
const checkBaggage = function (items) {
  //First make everything lowercase to check it to make it more fault tolerant
  const baggage = items.toLowerCase();
  console.log(baggage);

  //check if it contains certain words
  if (baggage.includes('gun') || baggage.includes('knife')) {
    console.log('You are not allowed to bring that aboard the plane');
  } else {
    console.log('You are allowed to bring your luggage on the plane');
  }
};

checkBaggage('I have a laptop, some Food, and a pocket Knife');
checkBaggage('I some snacks and a camera and socks');
checkBaggage('I have a gun for protection and some snacks');
*/

/* 
//Lesson 121 Working with strings
const airline = 'TAP Air Portugal';
const plane = 'A320';

console.log(plane[0]);
console.log(plane[1]);
console.log(plane[2]);
console.log('B737'[0]);
console.log(airline.length);
console.log('B737'.length);

//strings also have methods
//first occurence of this index
console.log(airline.indexOf('r'));
//last occurence
console.log(airline.lastIndexOf('r'));
//Entire words
console.log(airline.indexOf('Air'));
//Slice from this position onwards
console.log(airline.slice(4));
console.log(airline.slice(4, 10));
//finding the ending by looking for the indexOf a character
console.log(airline.slice(0, airline.indexOf(' ')));
//slicing the last word +1 for the space
console.log(airline.slice(airline.lastIndexOf(' ') + 1));
//more options, negative starts from the end (extracting from the end)
console.log(airline.slice(-2));
//start at one and cut off the last character as end parameter
console.log(airline.slice(1, -1));

const checkMiddleSeat = function (seat) {
  //B and E are the middle seats
  //take the final character
  const s = seat.slice(-1);
  if (s === 'B' || s === 'E') {
    console.log('You are in a middle seat');
  } else {
    console.log('You are in a window seat');
  }
};

checkMiddleSeat('11B');
checkMiddleSeat('22A');
checkMiddleSeat('05E');
checkMiddleSeat('23C');

//String are primitives but they have methods
console.log(new String('Theron'));
//This is what happens behind the scenes so methods work on the string its being built into an object temporarily
console.log(typeof new String('Theron'));
//Another example of what happens behind the scenes (the object resolved results again in a string)
console.log(typeof new String('Theron').slice(1));
*/

/*
/// CODING CHALLENGE 3 ///

const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);


//1
//Create an array 'events' of the different game events no duplicates (set?)
//Set
const events = [...new Set([...gameEvents.values()])];

//2
//Remove the yellow card
gameEvents.delete(64);

//3
const time = [...gameEvents.keys()].pop();
console.log(
  `An event happened, on average, every ${time / gameEvents.size} minutes`
);

//4
for (const [time, event] of gameEvents) {
  time < 45
    ? console.log(`[FIRST HALF] ${time}: ${event}`)
    : console.log(`[SECOND HALF] ${time}: ${event}`);
}
*/

/* 
//Lesson 118 Maps iteration (Array of arrays)
const question = new Map([
  ['question', 'what is the best programming language in the world'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct'],
  [false, 'Try again!'],
]);
console.log(question);

//Similar structure as Object.entries() also array of arrays
//Convert object to map
console.log(Object.entries(hours));
//converted the object to an iterable map
const hoursMap = new Map(Object.entries(hours));
console.log(hoursMap);

//Quiz app
console.log(question.get('question'));
//Iterating on a map
for (const [key, value] of question) {
  if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
}

//const answer = Number(prompt('Your answer'));
const answer = 3;
console.log(answer);

if (answer === 3) {
  console.log(`Nice JavaScript is the best coding language you are right`);
} else {
  console.log(
    `You have to be kidding right? That is not the best coding language`
  );
}

//Another way to do the above with the map
console.log(question.get(question.get('correct') === answer));

//Converting a map back to an array (again array of arrays)
console.log([...question]);
//console.log(question.entries());
console.log(...question.keys());
console.log(...question.values());
*/

/* 
//Lesson 117 Maps
const rest = new Map();
//To fill map use set
rest.set('name', 'Classico Italiano');
rest.set(1, 'Firenze, Italy');
rest.set(2, 'Eindhoven, Netherlands');
rest.set(3, 'Lisbon, Portugal');
console.log(rest.set(3, 'Lisbon, Portugal'));

//Allows to chain (.set again) and different data types
rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('closed', 23)
  .set(true, 'We are open :D')
  .set(false, 'We are closed :(');
console.log(rest);

//to get data from the map use get
console.log(rest.get('name'));
console.log(rest.get(true));
console.log(rest.get(1));

//Create something fun with the map
//const currentTime = 8;
const currentTime = 21;
console.log(
  //Returns the we are open string because we input a true or false based on the check and *get* it from the map
  //The power of booleans as map keys
  rest.get(currentTime > rest.get('open') && currentTime < rest.get('closed'))
);

//has keys
console.log(rest.has('categories'));
//delete
rest.delete(2);
console.log(rest);
//size
console.log(rest.size);
//clear
//console.log(rest.clear);

//Using arrays or objects as map keys
rest.set([1, 2], 'Test');
console.log(rest);
console.log(rest.size);
//Now to get the data based on the above array (cant do it because the two arrays are different objects)
console.log(rest.get([1, 2]));

//To make the above work we have to actually make the array and then use that array
//Create the array first
const arr = [1, 2];
//Using arrays or objects as map keys
rest.set(arr, 'Test');
console.log(rest);
console.log(rest.size);
//Now to get the data based on the above array and show the string Test
console.log(rest.get(arr));
//This works because they reference to the same array in the memory

//Can also be useful with dom elements which are just a special kind of object
rest.set(document.querySelector('h1'), 'Heading');
console.log(rest);
console.log(rest.size);
console.log(rest.get(arr));
*/

/*
//Lesson 116 Sets

//Iterable (duplicates removed)
const orderSet = new Set(['Pasta', 'Pizza', 'Pizza', 'Risotto', 'Pasta']);
console.log(orderSet);

//String is also iterable so string set possible
console.log(new Set('Theron'));

//How to work with sets (get the size) unique values that will be cooked
console.log(orderSet.size);
//Check if a value is present in the set
console.log(orderSet.has('Pizza'));
console.log(orderSet.has('Bread'));
//adding new elements to the set
orderSet.add('Bread');
orderSet.add('Garlic Bread');
orderSet.add('Bread');
orderSet.delete('Garlic Bread');
//orderSet.clear();
console.log(orderSet.has('Bread'), orderSet);

//Retreive values out of a set (we can not use an index like with an array [1]) but you can loop a set
for (const order of orderSet) console.log(order);

//Big use case for sets (mainly to remove duplicates from arrays), Example
const staff = [
  'Waiter',
  'Chef',
  'Manager',
  'Waiter',
  'Chef',
  'Waiter',
  'Reception',
];
//Find out which different positions there are int his array (so no duplicates)
const staffUnique = [...new Set(staff)];
console.log(staffUnique);
console.log(
  new Set([
    'Waiter',
    'Chef',
    'Manager',
    'Waiter',
    'Chef',
    'Waiter',
    'Reception',
  ]).size
);

console.log(new Set('TheronGaray').size);
*/

/* 
/// CODING CHALLENGE 2 ///

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

//1 Log players and their goals
for (const [i, player] of game.scored.entries()) {
  console.log(`Goal ${i + 1}: ${player} `);
}

//2 Average of odds
const odds = Object.values(game.odds);
let average = 0;
for (const odd of odds) average += odd;
average /= odds.length;
console.log(average);

//3 Use loop to pass the game odds object into the loop, destructure the object in the team properties and corresponding values
for (const [team, odd] of Object.entries(game.odds)) {
  //Use terniary operator to check if its a draw then use string draw otherwise Victory and match the team1 or team2 odds property to the value of team1 or team2
  const teamString = team === 'x' ? 'draw' : `Victory ${game[team]}`;
  //Log each result from the game.odds object
  console.log(`Odd of victory ${teamString}: ${odd}`);
}
*/

/* 
//Lesson 114 looping objects (indirectly)

//Property NAMES
const properties = Object.keys(hours);
console.log(properties);

let openStr = `We are open ${properties.length} days: `;

for (const day of properties) {
  openStr += `${day}, `;
}
console.log(openStr);

//Property VALUES
const values = Object.values(hours);
console.log(values);

//Entire object
const entries = Object.entries(hours);
console.log(entries);
//Destructuring the entries and destructuring the values by their property names right away
for (const [key, { open, close }] of entries) {
  //log each key and value
  console.log(key, open, close);
  //log keys and values
  console.log(`On ${key} we open at ${open} and close at ${close}.`);
}
*/

/* 
//Lesson 113 optional chaining (?.)
//This can get really messy especially if you have a lot of conditionals
if (restaurant.hours && restaurant.hours.mon)
  console.log(restaurant.hours.mon.open);

//Without optional chaining
//console.log(restaurant.hours.mon.open.open);
//With optional chaining
//Only if the object in front of the questionmark is available then the open property will be read
console.log(restaurant.hours.mon?.open);
//same as example above but with chaining
console.log(restaurant.hours?.mon?.open);
//Easier way of checking if something is available

//Example
const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
//for-of-loop to go through array
for (const day of days) {
  console.log(day);
  //const open = restaurant.hours[day]?.open || 'closed';
  // || does not work with falsy / 0 so better to use ??
  const open = restaurant.hours[day]?.open ?? 'closed';
  const close = restaurant.hours[day]?.close;
  console.log(`On ${day}, we open at ${open} and close at ${close}`);
}

//conditional chaining also works for methods
//Does exist
console.log(restaurant.order?.(0, 1) ?? 'Method does not exist');
//Does not exist
console.log(restaurant.orderRisotto?.(0, 1) ?? 'Method does not exist');

//conditional chaining also works for arrays
const users = [{ firstName: 'Theron', email: 'therongaray@gmail.com' }];
console.log(users[0]?.firstName ?? 'No first name');
console.log(users[0]?.lastName ?? 'No last name');

//Without optional chaining we would have to write something like this:
if(users.length > 0) console.log(users[0].firstName); else console.log('No first name');
 */

/* 
//Lesson 111 Looping arrays the for-of loop
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

//for-of-loop you dont need the elaborate setup (start,stop,step)
//the item (you can name it whatever) is the element/value in the current iteration of the loop from the array
for (const item of menu) console.log(item);

//to get the current index from a for-of-loop
for (const [item, element] of menu.entries()) {
  //Old way of destructuring the array
  //  console.log(`${item[0] + 1}: ${item[1]}`);
  //New way
  console.log(`${item + 1}: ${element}`);
}
console.log([...menu.entries()]);
*/

/* 
/// CODING CHALLENGE 1 ///
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

//1 Two arrays with both teams
const [players1, players2] = game.players;
console.log(players1);
console.log(players2);

//2 One array for the goalkeeper and one for the rest of the fieldplayers
const [gk, ...fieldPlayers] = players1;
console.log(gk, fieldPlayers);

//3 One array for all the players of both teams
const allPlayers = [...players1, ...players2];
console.log(allPlayers);

//4 One array with players plus three new players
const players1Final = [...players1, 'Jimmyboy', 'Jimbo', 'Jimmy'];
console.log(players1Final);

//5 create three variables based on the team1/x/team2 values in the object. Destructuring by assigning the entire 1.object and 2. selecting the right property 3. and destructuring to seperate variables
const {
  odds: { team1, x, team2 },
} = game;
console.log(team1, x, team2);

//6 print seperate players names (Not from an array) to the console
const printGoal = function (...playerNames) {
  for (let i = 0; i < playerNames.length; i++) {
    console.log(playerNames[i]);
  }
};
printGoal('Jimmyboy', 'Jimbo', 'Jimmy', game.score, game.scored);
printGoal('Jimmyboy', game.score, ...game.scored);

//7 Console.log team with lower odd is more likely to win (without if/else or ternary operator)
//Explained: we want the console.log to be put out if the first comparison is true

//Writes to the console (NOT SHORT CIRCUITED BECAUSE ITS TRUE)
team1 < team2 && console.log('Team 1 is  likely to win');
//Does not write to the console (BECAUSE ITS FALSE)
team2 < team1 && console.log('Team 1 is  likely to win');
team1 > team2 && console.log('Team 2 is  likely to win');
*/

/* 
// 109 Logical assignment operator
const rest1 = {
  name: 'Capri',
  numGuests: 20,
};

const rest2 = {
  name: 'La Piazza',
  owner: 'Giovanni Rossi',
};

//Not short circuited
//rest1.numGuests = rest2.numGuests || 10;
//Did short circuit because, no numGuests
//rest2.numGuests = rest1.numGuests || 10;

//Same thing but now with logical assignment operator
// rest1.numGuests ||= 10;
// rest2.numGuests ||= 10;

//Nullish assignment operator (assign a value if the value null or  undefined)
rest1.numGuests ??= 10;
rest2.numGuests ??= 10;

//Logical and operator (rest2.owner is truthy in and it goes for falsy)
// rest1.owner = rest1.owner && '<ANONYMOUS>';
// rest2.owner = rest2.owner && '<ANONYMOUS>';

//Shorter way of writing the above
rest1.owner &&= '<ANONYMOUS>';
rest2.owner &&= '<ANONYMOUS>';

console.log(rest1);
console.log(rest2);
*/

/* 
//Lesson 108 Nullish Coalescing Operator

restaurant.numGuests = 0;
const guests2 = restaurant.numGuests || 10;
console.log(guests2);

//Nullish: null and undefined (not 0 or '')
//0 and '' are in thise case truthy values
const guestCorrect = restaurant.numGuests ?? 10;
console.log(guestCorrect);
 */

/* 
//Lesson 107 Short circuiting && and ||

//Logical operators can use any datatype and can return any datatype, and they do a short circuit evaluation
//If the first value is a truthy value it will return that
console.log(3 || 'Theron');
console.log('' || 'Theron');
console.log(true || 0);
console.log(undefined || null);
console.log(undefined || 0 || '' || 'Hello' || 23 || null);

//more practicle example
const guest1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guest1);

//restaurant.numGuests = 23;
const guests2 = restaurant.numGuests || 10;
console.log(guests2);

//Short circuiting AND operator (with a truthy the last value is logged)
console.log('--- AND ---');
console.log(0 && 'Theron');
console.log(7 && 'Theron');
console.log('Hello' && 23 && null && 'Theron');
if (restaurant.orderPizza) {
  restaurant.orderPizza('Mushrooms', 'Spinach');
}
restaurant.orderPizza && restaurant.orderPizza('Mushrooms', 'Spinach');

 */
/* 
//Lesson 106 Rest operator

//1) Destructuring

//SPREAD because ... of the right side of assignment = operator
const arr = [1, 2, ...[3, 4]];
console.log(arr);

//REST because on the left side of the assignment = operator
//CALLED Rest of the elements not used in the restructuring assignment
const [a, b, ...others] = [1, 2, 3, 4, 5];
console.log(a, b, others);

//The rest has to be the last element (otherwise unclear until when it will have to work), only one per restructuring possible
const [pizza, , risotto, ...otherfood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, risotto, otherfood);

//Opening hours
const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays);

//2) Functions res pattern adds the rest
const add = function (...numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  console.log(sum);
};
add(2, 4);
add(1, 3, 5, 6);
add(5, 3, 2, 34, 1, 102);
const x = [23, 5, 7];
//packing the values into an array that we pass on to the function
add(...x);

//Function with parameters with resting as much parameters as we want to
restaurant.orderPizza(
  'Mushrooms',
  'Tomato sauce',
  'Garlic',
  'Union',
  'Cheese',
  'Flower',
  'Dough'
);
//Only one parameter, this one will not pass on the rest parameter because there are no other parameters
restaurant.orderPizza('Mushrooms');
*/

/* 
//Lesson 105 The spread operator

//Usually to add to an array
const arr = [7, 8, 9];
const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
console.log(badNewArr);

//Adding with a spread array is much easier (since ES6), basically taking out all the elements in the array and adding them without having to handwrite them all
const goodNewArr = [1, 2, ...arr];
console.log(goodNewArr);

//also able to pass as arguments for example:
//This is good if we need the elements of an array individually
console.log(...goodNewArr);

//More useful example, add a food item to the mainmenu of the restaurant object, this will be a completely new array
const newMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(newMenu);

//Use case shallow copies
const mainMenuCopy = [...restaurant.mainMenu];
console.log(mainMenuCopy);

//Mergue two arrays together
const fullMenu = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(fullMenu);

//Actually spread operators work in iterables (arrays, strings, maps, sets but not objects)
const string = 'Theron';
const letters = [...string, ' ', 'G.'];
console.log(letters);
console.log(...string);

//An example of passing a spread in a function as parameters
const ingredients = ['Basilicum', 'Balsamico', 'Tomato sauce'];
restaurant.orderPasta(...ingredients);

//Escaping the apostrof with \ so it does not become the end of the string (prettier makes the single into a double quote so the single quote is escaped)
const ingredientsCustomer = [
  prompt("Let's make pasta! Ingredient 1?"),
  prompt('Ingredient 2?'),
  prompt('Ingredient 3?'),
];
console.log(ingredientsCustomer);
restaurant.orderPasta(...ingredientsCustomer);

//Now also works with objects since ES2018 even though objects are not iterables
//Real world example
const newRestaurant = { foundedIn: 1990, ...restaurant, founder: 'Guiseppe' };
console.log(newRestaurant);

//Shallow copy of an object
const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Ristorante Roma';
console.log(restaurantCopy.name);
console.log(restaurant.name);
*/

/* 
//Lesson 104 Destructuring Objects

//Calling a function and passing in an object with options so we can destructure with the arguments in the function right away. look at orderDelivery function.
restaurant.orderDelivery({
  time: '22:30',
  address: 'Via Del Sole, 21',
  mainIndex: 2,
  starterIndex: 2,
});
//Take the default values already filled in behind the arguments if they are not present in the function call
restaurant.orderDelivery({
  address: 'Via Del Sole, 21',
  starterIndex: 2,
});

//create three brand new values based on the restaurant object
const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

//Changing the variable names, especially useful when dealing with third party data
const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantName, openingHours, tags);

//Default values
//example of setting a default value in this case an empty array, useful when you dont know what the data looks like
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

//Mutating variables
let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };
//for an object a destructuring assignment to mutate variables has to be wrapped in ()
({ a, b } = obj);
console.log(a, b);

//Now mutating for nested objects
const {
  fri: { open, close },
} = openingHours;
console.log(open, close);

//Reassigning values
const {
  sat: { open: o, close: c },
} = openingHours;
console.log(o, c);

 */
//Lesson 103 Destructuring Arrays
/* 
const arr = [2, 3, 4];
const a = arr[0];
const b = arr[1];
const c = arr[2];
console.log(a, b, c);

//destructuring an array
const [x, y, z] = arr;
console.log(x, y, z);
//the originla array is not affected we are just destructuring
console.log(arr);
 */

/* 
//destructuring array from restaurant data, and skip one element
let [main, , secondary] = restaurant.categories;
console.log(main, secondary);

//sometimes you want to change the data like this:
//store the main in the temp var
const temp = main;
//then overwrite main with the secondary value
main = secondary;
//and then store the main in the secondary value to swap the values
secondary = temp;
//the values are swapped
console.log(main, secondary);
 */
/* 
//Switching variables
let [main, , secondary] = restaurant.categories;
console.log(main, secondary);
//array destructuring way of swapping values like above
[main, secondary] = [secondary, main];
console.log(main, secondary);

//call the order function to order something from the startermenu and mainmenu
console.log(restaurant.order(2, 0));
//destructuring the starter and main from the menu
//This is how we retreive two return values from a function
//Creating two variables out of one function call
const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse);

//How to destructure the case of a nested array
const nested = [2, 4, [5, 6]];
//Grab the number 2 and the 5&6 array within the array
const [i, , j] = nested;
console.log(i, j);
//destructing the nested arrays as to get only the values except the 4 value
const [value1, , [value3, value4]] = nested;
console.log(value1, value3, value4);

//Destructuring with default values in the case of a shorter array
const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r);
 */
