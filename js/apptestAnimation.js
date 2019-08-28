/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}



const refresh = document.querySelector('.restart');
refresh.addEventListener ('click',function(event){
  let list = document.querySelectorAll('.card');
  let array = Array.from(list);
  shuffle(array);
  let test = [];
  for (let i = 0; i < 16; i = i + 1) {
      test[i] = array[i].innerHTML;
      list[i].className = 'card';
  };
  for (let i = 0; i < 16; i = i + 1) {
      list[i].innerHTML = test[i];
  };
});

// below is second version to use shuffle

const refresh = document.querySelector('.restart');
refresh.addEventListener ('click',function(event){
  let array = [];
  let list = document.querySelectorAll('.card');
  for (let i = 0; i < 16; i = i + 1) {
    array[i] = list[i].innerHTML;
  }
  shuffle(array);
  for (let i = 0; i < 16; i = i + 1) {
      list[i].innerHTML = array[i];
      list[i].className = 'card';
  };
});


let lastChoiceContent = "nothing";
let lastChoice = "";
let trial = 0;

const test = document.querySelector('.deck');
const toggleCard = function (event) {event.target.classList.add('open', 'show')};
const compare = function(event){
  if (lastChoiceContent === "nothing") {
    lastChoiceContent = event.target.firstElementChild.className;
    lastChoice = event.target;
    event.target.style.cssText = 'animation-name: flip; animation-duration: 1.5s;';
    console.log('new click');
  } else if /* if match*/(lastChoiceContent === event.target.firstElementChild.className ) {
    event.target.style.cssText = 'animation-name: flip; animation-duration: 1.5s;';
    lastChoice.style.cssText = 'animation-name: flip; animation-duration: 1.5s;';
    lastChoiceContent = "nothing";
    lastChoice.classList.remove('open','show');
    event.target.classList.remove('open', 'show');
    lastChoice.classList.add('match');
    event.target.classList.add('match');
    lastChoice = "";
    console.log ('good');
    trial = trial + 1;
  } else  /* unmatch*/ {
    lastChoiceContent = "nothing";
    lastChoice.classList.remove('open','show');
    event.target.classList.remove('open', 'show');
    // shake(lastChoice.classList);
    // shake(event.target.classList);
    event.target.style.cssText = 'animation-name: shake; animation-duration: 1.5s;';
    lastChoice.style.cssText = 'animation-name: shake; animation-duration: 1.5s;';
    console.log ('bad guess');
    lastChoice = "";
    trial = trial + 1;
  };
  document.querySelector('.moves').textContent = trial;
};

// test.addEventListener('click', toggleCard);
// test.addEventListener('click', compare);

test.addEventListener('click', function(event){
  if (event.target.className == 'card') {
    toggleCard(event);
    compare(event);
  } else {
    console.log('wrong');
  };
});


// let shake = function (x) {
  // x.toggle('unmatch');
// }
//
// x.style.animationName: shake;
// x.style.animationDuration: 1.5s;


// element.addEventListener("click", function(){ myFunction(p1, p2); });



// test.addEventListener('click',toggleCard);

// test.firstElementChild

// const compare  = function (x,y) {
        // if (x == y) { console.log('match');
// } else {console.log ('unmatch')}
// };

// click once, if target card but not show not match not open; then flick
// click twice, ...
// if content.
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
