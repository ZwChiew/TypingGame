wordlist = [
  "archaeology",
  "archer",
  "architect",
  "architecture",
  "archives",
  "area",
  "arena",
  "argument",
  "arithmetic",
  "ark",
  "arm",
  "arm-rest",
  "armadillo",
  "armament",
  "armchair",
  "armoire",
  "armor",
  "armour",
  "armpit",
  "armrest",
  "army",
  "arrangement",
  "array",
  "arrest",
  "arrival",
  "arrogance",
  "arrow",
  "survivor",
  "sushi",
  "suspect",
  "suspenders",
  "suspension",
  "sustainment",
  "sustenance",
  "swallow",
];

//element to be used
let current_score = document.querySelector(".current-score");
let current_time = document.querySelector(".current-time");
let current_text = document.querySelector("h1");
const startButton = document.querySelector(".hover");
let score = 0;
let gameStarted = false;
let currentWord = ""; //localized current_text
let index = 0; //which char user is typing
var bg_music = new Audio("shadow.mp3");
bg_music.volume = 0.5;

startButton.addEventListener("click", function () {
  //disbaling start button
  if (!gameStarted) {
    //grey out button
    startButton.classList.add("disable");
    //change word of H1
    current_text.innerHTML = generateWord();
    bg_music.play();
    countDown();
    gameStarted = true;
  }
});

//detect what user taips
document.addEventListener("keydown", function (e) {
  checkAnswer(e.key);
});

const end = () => {
  //time runs outs
  bg_music.pause();
  current_text.innerHTML = "Click Start When ☝️ You Are Ready";
  current_score.innerHTML = 0;
  window.alert("Game Over, Your score is " + score);
  gameStarted = false;
  index = 0;
  startButton.classList.remove("disable");
};

const checkAnswer = (input) => {
  //check whether user taiped char is same as the current char to be taiped
  input = input.toLowerCase();
  //index is current char we are on, char needed to taip
  if (input == currentWord[index] && currentWord.length - 1 == index) {
    //fist case, completed taiping the word
    score++;
    current_score.innerHTML = score;
    var success = new Audio("win.mp3");
    success.play();
    //generate new code to be taiped
    current_text.innerHTML = generateWord();
    //set index = 0, since start from 1st char again
    index = 0;
  } else if (input == currentWord[index]) {
    //select the char using the span tag created earlier
    // +2 because start from third position with 2 span tag on top
    let currentChar = document.querySelectorAll("span")[index + 2];
    currentChar.classList.add("highlight");
    //highlight cuurent char and move on to next
    index++;
  }
};

const generateWord = () => {
  //randomly get the words
  currentWord = wordlist[Math.floor(Math.random() * wordlist.length)];
  let wordArray = currentWord.split("");
  //add span tag to identify each char for highlight later
  const html = document.createElement("div");
  wordArray.forEach((c) => {
    let temp = document.createElement("span"); //axe
    temp.innerText = c; // <span>a</span> <span>x</span> <span>e</span>
    html.append(temp);
  });
  return html.innerHTML;
};

//Count down loop
const countDown = () => {
  let timeRemain = 20;
  //id to stop interval loop when time remaining is 0
  const id = setInterval(() => {
    if (timeRemain == 0) {
      clearInterval(id);
      end();
    }
    //update time from 20 t0 0
    current_time.innerHTML = timeRemain;
    timeRemain--;
  }, 1000); //every 1 sec
};
