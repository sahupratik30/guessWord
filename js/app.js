//Globals
let gameActive; //Variable to check if game is active or not
let time = 60;
let score = 0;
//DOM Elements
const timer = document.getElementById("time");
const scoreDisplay = document.getElementById("score");
const word = document.getElementById("scrambled_word");
const inputWord = document.getElementById("input");
const status = document.getElementById("status");
const button = document.getElementById("button");

//Creating a Words array
const words = [
  "random",
  "playground",
  "cricket",
  "psychology",
  "physics",
  "science",
  "beautiful",
  "football",
  "basketball",
  "tennis",
  "unknown",
  "cheers",
  "scissors",
  "knife",
  "kitchen",
  "address",
  "mouse",
  "keyboard",
  "smartphone",
  "bluetooth",
  "camera",
  "sunglasses",
  "speaker",
  "elephant",
  "zebra",
  "dragonfly",
  "window",
  "motorcycle",
  "railway",
  "aeroplane",
];
//Function to scramble a word
function scrambleWord(word) {
  let randomWord = word.split("");
  for (let i = randomWord.length - 1; i > 0; i--) {
    //Generate a random index between 0 to (word_length - 1)
    let j = Math.floor(Math.random() * i);
    let temp = randomWord[j];
    randomWord[j] = randomWord[i];
    randomWord[i] = temp;
  }
  let scrambledWord = randomWord.join("");
  return scrambledWord;
}
//Function to generate a random index
function randomIndex() {
  let randIndex = Math.floor(Math.random() * 31);
  return randIndex;
}
//Function to load the scrambled word into the DOM
function loadWord(scrambledWord) {
  //Set the word
  word.innerHTML = scrambledWord;
}
//Function to check wheather the typed word is a correct guess
function checkWord(event) {
  const originalWord = event.currentTarget.myParam;
  let typedWord = event.target.value;
  if (typedWord.trim() === originalWord) {
    status.innerHTML = "Correct!!";
    status.style.color = "#03db15";
    //Set input field to empty
    inputWord.value = "";
    //Increase the score
    score++;
    scoreDisplay.innerHTML = score;
    let randIndex = randomIndex();
    let scrambledWord = scrambleWord(words[randIndex]);
    loadWord(scrambledWord);
    inputWord.addEventListener("input", checkWord);
    inputWord.myParam = words[randIndex];
  } else {
    status.innerHTML = "";
  }
}
//Funtion for countdown timer
function countDown() {
  //Check if time is not run out
  if (time > 0 && gameActive) {
    time--;
  } else if (time === 0) {
    gameActive = false;
  }
  if (gameActive) {
    timer.innerHTML = time;
  } else {
    timer.innerHTML = 0;
  }
}
//Function to check game status
function checkStatus() {
  if (!gameActive && time === 0) {
    status.innerHTML = "Game Over!!";
    status.style.color = "rgb(180, 0, 0)";
  }
}
//Init function
function init() {
  button.disabled = true;
  gameActive = true;
  //Focus on input field
  inputWord.focus();
  //Function to start countdown timer
  setInterval(countDown, 1000);
  //Function to check game status
  setInterval(checkStatus, 50);
  //Call a function to generate a random index to pick a word from the words array
  let randIndex = randomIndex();
  //Call a function to scramble the random word
  let scrambledWord = scrambleWord(words[randIndex]);
  //Call a function to load the scrambled word into the DOM
  loadWord(scrambledWord);
  //Call a function to validate input word
  inputWord.addEventListener("input", checkWord);
  inputWord.myParam = words[randIndex];
}

//Adding event listener to submit button
button.addEventListener("click", init);
