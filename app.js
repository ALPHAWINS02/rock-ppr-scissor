// Prevent animation on load
setTimeout(() => {
  document.body.classList.remove("preload");
}, 5);

// DOM
const btnRules = document.querySelector(".rules-btn");
const btnClose = document.querySelector(".close-btn");
const modalRules = document.querySelector(".modal");
const nextBtn = document.querySelector(".nxt-btn");

const CHOICES = [
  {
    name: "paper",
    beats: "rock",
  },
  {
    name: "scissors",
    beats: "paper",
  },
  {
    name: "rock",
    beats: "scissors",
  },
];
const choiceButtons = document.querySelectorAll(".choice-btn");
const gameDiv = document.querySelector(".game");
const resultsDiv = document.querySelector(".results ");
const resultDivs = document.querySelectorAll(".results__result");

const resultWinner = document.querySelector(".results__winner");
const resultText = document.querySelector(".results__text");

const playAgainBtn = document.querySelector(".play-again");
const playAgainBtn1 = document.querySelector(".play-again1");

const scoreNumber = document.querySelector(".score__number");
const scoreAiNumber = document.querySelector(".score__ainumber");
// Initialize scores from local storage or default to 0
let score = parseInt(localStorage.getItem('userScore')) || 0;
let aiScore = parseInt(localStorage.getItem('aiScore')) || 0;

// Update score display
scoreNumber.innerText = score;
scoreAiNumber.innerText = aiScore;

// Game Logic
choiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const choiceName = button.dataset.choice;
    const choice = CHOICES.find((choice) => choice.name === choiceName);
    choose(choice);
  });
});

function choose(choice) {
  const aichoice = aiChoose();
  displayResults([choice, aichoice]);
  displayWinner([choice, aichoice]);
}

function aiChoose() {
  const rand = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[rand];
}

function displayResults(results) {
  resultDivs.forEach((resultDiv, idx) => {
    setTimeout(() => {
      resultDiv.innerHTML = `
        <div class="choice ${results[idx].name}">
          <img src="images/icon-${results[idx].name}.svg" alt="${results[idx].name}" />
        </div>
      `;
    }, idx * 100);
  });

  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");
}

function displayWinner(results) {
  setTimeout(() => {
    const userWins = isWinner(results);
    const aiWins = isWinner(results.reverse());

    if (userWins) {
      resultText.innerText = "you win";
      resultDivs[0].classList.toggle("winner");
      keepScore(1);
      nextBtn.style.display = "block";

    } else if (aiWins) {
      resultText.innerText = "you lose";
      resultDivs[1].classList.toggle("winner");
      keepAiScore(1);
      nextBtn.style.display = "none";

    } else {
      resultText.innerText = "draw";
      nextBtn.style.display = "none";

    }
    resultWinner.classList.toggle("hidden");
    resultsDiv.classList.toggle("show-winner");
  }, 10);
}

function isWinner(results) {
  return results[0].beats === results[1].name;
}

// Function to update score and store in local storage
function keepScore(point) {
  score += point;
  scoreNumber.innerText = score;
  localStorage.setItem('userScore', score);
}

function keepAiScore(point) {
  aiScore += point;
  scoreAiNumber.innerText = aiScore;
  localStorage.setItem('aiScore', aiScore);
}



// Play Again
playAgainBtn.addEventListener("click", () => {
  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");

  resultDivs.forEach((resultDiv) => {
    resultDiv.innerHTML = "";
    resultDiv.classList.remove("winner");
  });

  resultText.innerText = "";
  resultWinner.classList.toggle("hidden");
  resultsDiv.classList.toggle("show-winner");

});

// Show/Hide Rules
btnRules.addEventListener("click", () => {
  modalRules.classList.toggle("show-modal");
});
btnClose.addEventListener("click", () => {
  modalRules.classList.toggle("show-modal");
});

const mainScreen = document.querySelector(".container");
const winnerScreen = document.querySelector(".winner-screen");

const nextPageHandler = () => {
  // make winner screen visible
  mainScreen.style.display = "none";
  winnerScreen.style.display = "flex";
  nextBtn.style.display = "none";
};

const nextPageHandler1 = () => {
  // make winner screen visible
  mainScreen.style.display = "grid";
  winnerScreen.style.display = "none";
  nextBtn.style.display = "none";
};



// Attach event listener to the "Next" button
nextBtn.addEventListener("click", nextPageHandler);
playAgainBtn1.addEventListener("click", nextPageHandler1);