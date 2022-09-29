class GuessingApp {
  #numberRange = 20;
  #randomNumber;
  #numberOfTries;
  #formGuessNumber = document.querySelector(".form-guess-number");
  #guessNumberInput = document.querySelector("#guess");
  #message = document.querySelector(".msg");
  #guessBtn = document.getElementById("guess-btn");
  #startGameBtn = document.getElementById("start-game-btn");
  #tryAgainBtn = document.getElementById("again-game-btn");
  #numberContainer = document.querySelector(".number-container");
  constructor() {
    this.#formGuessNumber.addEventListener("submit", this.getUserGuess);
    this.#startGameBtn.addEventListener("click", this.startGame);
    this.#tryAgainBtn.addEventListener("click", this.restartHandler);
  }
  getUserGuess = (e) => {
    e.preventDefault();
    const num = +this.#guessNumberInput.value;
    this.checkUserGuess(num);
  };

  startGame = () => {
    this.#guessBtn.classList.remove("display-none");
    this.#guessNumberInput.classList.remove("display-none");
    this.#startGameBtn.classList.add("display-none");
    this.#randomNumber = Math.ceil(Math.random() * this.#numberRange);
    this.#numberOfTries = 5;
  };

  checkUserGuess = (num) => {
    if (isNaN(num)) {
      this.#message.textContent = "Please enter a number!";
      this.#message.classList.remove("display-none");
      setTimeout(() => {
        this.#message.classList.remove("display-none");
        this.#message.textContent = "";
      }, 2000);
      this.#guessNumberInput.value = "";
    } else if (num > this.#numberRange || num === 0) {
      this.#message.textContent = `Please enter a number in range from 1 to ${
        this.#numberRange
      }`;
      this.#message.classList.remove("display-none");
      setTimeout(() => {
        this.#message.classList.remove("display-none");
        this.#message.textContent = "";
      }, 2000);
      this.#guessNumberInput.value = "";
    } else {
      this.#guessNumberInput.value = "";
      this.renderMessage(num);
    }
  };

  renderMessage = (num) => {
    this.#numberOfTries--;
    if (this.#numberOfTries === 0 && num !== this.#randomNumber) {
      this.loseHandler(num);
      return;
    }
    if (num < this.#randomNumber) {
      this.#message.textContent = `The ${num} is less than ? number, you have ${
        this.#numberOfTries
      } more attempt/s`;
    } else if (num > this.#randomNumber) {
      this.#message.textContent = `The ${num} is greater than ? number, you have ${
        this.#numberOfTries
      } more attempt/s`;
    } else {
      this.#message.textContent =
        "You WON! Press Try Again button to go again.";
      this.winHandler(num);
    }
  };

  winHandler = () => {
    this.#guessBtn.classList.add("display-none");
    this.#guessNumberInput.classList.add("display-none");
    this.#numberContainer.style.backgroundColor = "green";
    this.#numberContainer.textContent = "";
    this.#numberContainer.textContent = this.#randomNumber;
    this.#tryAgainBtn.classList.remove("display-none");
  };
  loseHandler = () => {
    this.#guessBtn.classList.add("display-none");
    this.#guessNumberInput.classList.add("display-none");
    this.#numberContainer.textContent = "";
    this.#numberContainer.textContent = this.#randomNumber;
    this.#message.textContent = "";
    this.#message.textContent = "You lost, want to try again?";
    this.#tryAgainBtn.classList.remove("display-none");
    this.#numberContainer.style.backgroundColor = "red";
  };
  restartHandler = () => {
    this.#guessBtn.classList.add("display-none");
    this.#guessNumberInput.classList.add("display-none");
    this.#guessNumberInput.value = "";
    this.#startGameBtn.classList.remove("display-none");
    this.#tryAgainBtn.classList.add("display-none");
    this.#numberContainer.style.backgroundColor = "#163489";
    this.#randomNumber = null;
    this.#numberOfTries = null;
    this.#message.innerHTML = "";
    this.#numberContainer.textContent = "?";
  };
}

const guess = new GuessingApp();
