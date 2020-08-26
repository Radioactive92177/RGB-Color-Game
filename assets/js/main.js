// Game Logic class
class GameLogic {
  constructor() {}

  // Generates random color for the gameLogic
  generateRandomColors(num) {
    let colorArray = [];

    for (let i = 0; i < num; i++) {
      let r = Math.floor(Math.random() * 256 + 0); // red
      let g = Math.floor(Math.random() * 256 + 0); // blue
      let b = Math.floor(Math.random() * 256 + 0); // green
      let rgb = `rgb(${r}, ${g}, ${b})`;
      colorArray.push(rgb);
    }
    return colorArray;
  }

  // Picks random color out the generated random colors
  pickColor(colorArray) {
    let randomColor = Math.floor(Math.random() * colorArray.length);
    return colorArray[randomColor];
  }
}

// Game UI class
class GameUI {
  constructor() {
    this.resetBtn = document.querySelector("#resetBtn");
    this.easyBtn = document.querySelector("#hardBtn");
    this.hardBtn = document.querySelector("#easyBtn");
  }
  loadEventListeners() {
    const gameLogic = new GameLogic();

    resetBtn.addEventListener("click", function () {
      colors = gameLogic.generateRandomColors(numPanels);
      message.textContent = "";
      resetBtn.textContent = "NEW COLORS";

      h1.style.background = "#232323";

      for (let i = 0; i < numPanels; i++) {
        panels[i].style.background = colors[i];
      }

      pickedColor = gameLogic.pickColor(colors);
      rgbDisplay.textContent = pickedColor;
    });

    easyBtn.addEventListener("click", function () {
      hardBtn.classList.remove("selected");
      this.classList.add("selected");

      h1.style.background = "#232323";

      message.textContent = "";
      resetBtn.textContent = "NEW COLORS";

      numPanels = 3;
      colors = gameLogic.generateRandomColors(numPanels);

      for (let i = 0; i < panels.length; i++) {
        if (colors[i]) {
          panels[i].style.background = colors[i];
        } else {
          panels[i].style.display = "none";
        }
      }

      pickedColor = gameLogic.pickColor(colors);
      rgbDisplay.textContent = pickedColor;
    });

    hardBtn.addEventListener("click", function () {
      easyBtn.classList.remove("selected");
      this.classList.add("selected");

      h1.style.background = "#232323";

      message.textContent = "";
      resetBtn.textContent = "NEW COLORS";

      numPanels = 6;
      colors = gameLogic.generateRandomColors(numPanels);

      for (let i = 0; i < panels.length; i++) {
        panels[i].style.background = colors[i];
        panels[i].style.display = "block";
      }

      pickedColor = gameLogic.pickColor(colors);
      rgbDisplay.textContent = pickedColor;
    });
  }
  // Method for changes if answer is CORRECT!
  onCorrectAnswer(color, panels, message, reset) {
    for (let i = 0; i < numPanels; i++) {
      panels[i].style.background = color;
    }
    message.textContent = "Correct!";
    reset.textContent = "PLAY AGAIN?";
    h1.style.background = color;
  }
  // Method for changes if answer is WRONG!
  onWrongAnswer(panel, message) {
    panel.style.background = "#232323";
    message.textContent = "Try Again!";
  }
}

// Instantiating Game objects
const gameLogic = new GameLogic();
const gameUI = new GameUI();

// ----------MAIN PROGRAM--------------------------------

// On Start
gameUI.loadEventListeners()

let panels = document.querySelectorAll(".panels");
let numPanels = panels.length;

colors = gameLogic.generateRandomColors(numPanels);

for (let i = 0; i < numPanels; i++) {
  panels[i].style.background = colors[i];
}

let pickedColor = gameLogic.pickColor(colors);

let rgbDisplay = document.querySelector("#rgbDisplay");
rgbDisplay.textContent = pickedColor;

// ---------PANELS CONFIGURATION--------------------------
let message = document.querySelector("#message");
let h1 = document.querySelector("h1");

for (let i = 0; i < numPanels; i++) {
  panels[i].addEventListener("click", function () {
    let panel = this;
    let panelColor = panel.style.background;

    if (panelColor == pickedColor) {
      gameUI.onCorrectAnswer(panelColor, panels, message, resetBtn);
    } else {
      gameUI.onWrongAnswer(panel, message);
    }
  });
}
