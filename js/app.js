/*
 * Create a list that holds all of your cards
 */
const cardDeck = document.querySelector('.deck');
let allCards = cardDeck.querySelectorAll('li');
allCards.forEach(function(card){card.className = 'card'});

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

const shuffleCards = function(){
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
};

// A timer function that counts time by seconds when a game started, or refreshed.
let startTime = 'inActive';
let timeSec = document.querySelector('#clock');
let timer = function(){
    let now = new Date().getTime();
    let sec = Math.floor((now  - startTime)/1000);
    if (startTime !== 'inActive') {
        timeSec.textContent = 'Timer: ' + sec + ' sec';
    }
};

// A function funcRefresh, restart a game when useser clicked refresh button.
const refresh = document.querySelector('.restart');
let moves = document.querySelector('.moves');
const funcRefresh = function(event){
    shuffleCards();
// this is to reset all the indices to the start.
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



// Creat a variable, firstChoice, will be an asigned to the first chosen card when comparing.
// Creat a variable, firstChoiceContent takes record the classList of the first chose card in comparing
let firstChoice = '';
let firstChoiceContent = 'start';
// lastRoundOne will be asigned to the first chosen card in last round comparing. This is used to clear the CSS animation of last round cards.
// lastRoundTwo will be asigned to the second chosen card in last round comparing. This is used to clear the CSS animation of last round cards.
let lastRoundOne = document.createElement('div');
let lastRoundTwo = document.createElement('div');
// trial is to take record of the times of comparing. stars is the number of stars should be shown. successPair is the number of finished pairs.
let trial = 0;
let stars = 3;
let successPair = 0;

const starOne = document.querySelector('#star1');
const starTwo = document.querySelector('#star2');
const starThree = document.querySelector('#star3');

const toggleCard = function (event) {event.target.classList.add('open', 'show')};
const compare = function(event){
// the very first card been chosen
  if (firstChoiceContent === "start") {
    startTime = new Date().getTime();
    countTime = setInterval(timer, 1000);
    firstChoiceContent = event.target.firstElementChild.className;
    firstChoice = event.target;
    event.target.style.cssText = 'animation-name: flip; animation-duration: 1.5s;';
  } else if (firstChoiceContent === "nothing") {
// the first card in new pair flipped. Clear last pair's css animation effect, take record of the flipped card.
    lastRoundOne.style.cssText = '';
    lastRoundTwo.style.cssText = '';
    firstChoiceContent = event.target.firstElementChild.className;
    firstChoice = event.target;
    event.target.style.cssText = 'animation-name: flip; animation-duration: 1.5s;';
  } else if (firstChoiceContent === event.target.firstElementChild.className ) {
// matched pair. do css animation, take record of this pairs, and reset firstChoiceContent, and then modify their CSS class.
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
    trial = trial + 1;
  } else {
// unmatch pair. Do CSS animation, reset this class list, take record of this pairs.
    firstChoiceContent = "nothing";
    firstChoice.classList.remove('open','show');
    event.target.classList.remove('open', 'show');
    event.target.style.cssText = 'animation-name: shake; animation-duration: 1.5s;';
    firstChoice.style.cssText = 'animation-name: shake; animation-duration: 1.5s;';
    lastRoundOne = event.target;
    lastRoundTwo = firstChoice;
    trial = trial + 1;
  };
  moves.textContent = trial;
  if ( trial >= 16 &&  trial < 21){
    starThree.classList.value = 'fa fa-star-o';
    stars = 2 ;
  } else if ( trial >= 21 &&  trial < 24 ) {
    starTwo.classList.value = 'fa fa-star-o';
    stars = 1;
  } else if ( trial >= 24 ) {
    starOne.classList.value = 'fa fa-star-o';
    stars = 0;
  };
// when the game is success; stop the timer. and then show the winning page.
  if (successPair === 8) {
    clearInterval(countTime);
      congrats.style.cssText = 'transition-property: transform; transition-delay: 1.5s; transform: translate(0px, 0px)';   /*delay 1.5s to let the last round animation finish*/
      if (stars > 1) {
      resultMessage.textContent = 'With ' + trial + ' Moves and ' + stars + ' stars.';
    } else{
      resultMessage.textContent = 'With ' + trial + ' Moves and ' + stars + ' star.';
    };
  };
};

// when userer clicked a card not open or matched, first toggleCard, then compare it.
cardDeck.addEventListener('click', function(event){
  if (event.target.className == 'card') {
    toggleCard(event);
    compare(event);
  }
});

// when user clicked refresh button, restart a game.
refresh.addEventListener ('click', funcRefresh);

// winning page. if user clicked play again button, move away winning page and restart the game.
const congrats = document.querySelector('#winningPage');
const btn = document.querySelector('#newGame');
const resultMessage = document.querySelector('#result');
btn.addEventListener('click', function(event){
  congrats.style.cssText = 'transform: translate(-9999px, -9999px)';
  funcRefresh(event);
});


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
