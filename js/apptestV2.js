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


// below is second version to use shuffle


let startTime = 'inActive';
let timeSec = document.querySelector('#clock');
const timer = setInterval(function(){
  let now = new Date().getTime();
  let sec = Math.floor((now  - startTime)/1000);
  if (startTime !== 'inActive') {
    timeSec.textContent = 'Timer: ' + sec + ' sec';
  }
},1000);

const refresh = document.querySelector('.restart');
let allCards = document.querySelectorAll('.card');

let moves = document.querySelector('.moves');
// this is the function to restart a game.
const funcRefresh = function(event){
  let array = [];
  for (let i = 0; i < 16; i = i + 1) {
    array[i] = allCards[i].innerHTML;
  };
  shuffle(array);
  for (let i = 0; i < 16; i = i + 1) {
      allCards[i].innerHTML = array[i];
      allCards[i].className = 'card';
      allCards[i].style.cssText = '';
  };
  moves.textContent = 0;
  timeSec.textContent = 'Timer: 0 sec';
  startTime = 'inActive';
  starOne.classList.value = 'fa fa-star';
  starTwo.classList.value = 'fa fa-star';
  starThree.classList.value = 'fa fa-star';
  firstChoiceContent = 'start';
  firstChoice = '';
  lastRoundOne = document.createElement('div');
  lastRoundTwo = document.createElement('div');
  trial = 0;
  stars = 3;
  successPair = 0;
};

refresh.addEventListener ('click', funcRefresh);



let firstChoiceContent = 'start';
let firstChoice = '';
let lastRoundOne = document.createElement('div');
let lastRoundTwo = document.createElement('div');
let trial = 0;
let stars = 3;
let successPair = 0;

const starOne = document.querySelector('#star1');
const starTwo = document.querySelector('#star2');
const starThree = document.querySelector('#star3');

const test = document.querySelector('.deck');
const toggleCard = function (event) {event.target.classList.add('open', 'show')};
const compare = function(event){
  if (firstChoiceContent === "start") {
    startTime = new Date().getTime();
    timer;
    firstChoiceContent = event.target.firstElementChild.className;
    firstChoice = event.target;
    event.target.style.cssText = 'animation-name: flip; animation-duration: 1.5s;';
    console.log('start');
  } else if (firstChoiceContent === "nothing") {
    lastRoundOne.style.cssText = '';
    lastRoundTwo.style.cssText = '';
    firstChoiceContent = event.target.firstElementChild.className;
    firstChoice = event.target;
    event.target.style.cssText = 'animation-name: flip; animation-duration: 1.5s;';
    console.log('new click');
  } else if /* if match*/(firstChoiceContent === event.target.firstElementChild.className ) {
    event.target.style.cssText = 'animation-name: bubble; animation-duration: 1s; animation-timing-function: ease';
    firstChoice.style.cssText = 'animation-name: bubble; animation-duration: 1s; animation-timing-function: ease';
    lastRoundOne = event.target;
    lastRoundTwo = firstChoice;
    firstChoiceContent = "nothing";
    firstChoice.classList.remove('open','show');
    event.target.classList.remove('open', 'show');
    firstChoice.classList.add('match');
    event.target.classList.add('match');
    successPair++;
    console.log ('good');
    trial = trial + 1;
  } else  /* unmatch*/ {
    firstChoiceContent = "nothing";
    firstChoice.classList.remove('open','show');
    event.target.classList.remove('open', 'show');
    event.target.style.cssText = 'animation-name: shake; animation-duration: 1.5s;';
    firstChoice.style.cssText = 'animation-name: shake; animation-duration: 1.5s;';
    lastRoundOne = event.target;
    lastRoundTwo = firstChoice;
    console.log ('bad guess');
    trial = trial + 1;
  };
  moves.textContent = trial;
  if ( trial >= 16 &&  trial < 24){
    starThree.classList.value = 'fa fa-star-o';
    stars -- ;
  } else if ( trial > 24 ) {
    starTwo.classList.value = 'fa fa-star-o';
    stars --;
  } else if ( trial > 30 ) {
    starOne.classList.value = 'fa fa-star-o';
    stars --;
  };
  // when the game is success; show the winning page.
  if (successPair === 8) {
    clearInterval(timer);
      congrats.style.cssText = 'transition-property: transform; transition-delay: 1.5s; transform: translate(0px, 0px)';   /*delay 1.5s to let the animation finish*/
      if (stars > 1) {
      resultMessage.textContent = 'With ' + trial + ' Moves and ' + stars + ' stars.';
    } else{
      resultMessage.textContent = 'With ' + trial + ' Moves and ' + stars + ' star.';
    };
  };
};

test.addEventListener('click', function(event){
  if (event.target.className == 'card') {
    toggleCard(event);
    compare(event);
  } else {
    console.log('wrong');
  };
});


const congrats = document.querySelector('#winningPage');
const btn = document.querySelector('#newGame');
const resultMessage = document.querySelector('#result');
btn.addEventListener('click', function(event){
  congrats.style.cssText = 'transform: translate(-9999px, -9999px)';
  funcRefresh(event);
});

// const clear = function(event) {
    // event.target.style.cssText = '';
// };

// test.addEventListener('click', toggleCard);
// test.addEventListener('click', compare);



// test.addEventListener('click',function(event){event.target.classList.toggle('open');});

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
