// function to generate random rgb values
const generateRandomColors = (num) => {
  let colorArray = [];

  for (let i = 0; i < num; i++) {
    let r = Math.floor(Math.random() * 256 + 0); // red
    let g = Math.floor(Math.random() * 256 + 0); // blue
    let b = Math.floor(Math.random() * 256 + 0); // green

    let rgb = "rgb(" + r + ", " + g + ", " + b + ")";
    colorArray.push(rgb);
  }
  return colorArray;
};

// function to pick random color
const pickColor = (colorArray) => {
  let randomColor = Math.floor(Math.random() * colorArray.length);
  return colorArray[randomColor];
};

// function for changes if answer is CORRECT!
const onCorrectAnswer = (color, panels, message, reset) => {
  for (let i = 0; i < numPanels; i++) {
    panels[i].style.background = color;
  }
  message.textContent = "Correct!";
  reset.textContent = "Play Again?";
};

// function for changes if answer is WRONG!
const onWrongAnswer = (panel, message) => {
  panel.style.background = "#232323";
  message.textContent = "Try Again!";
};

// -----BUTTONS CONFIGURATIONS----------------------------

// configuring reset button
let resetBtn = document.querySelector("#resetBtn");

resetBtn.addEventListener("click", function () {
  colors = generateRandomColors(numPanels);

  for (let i = 0; i < numPanels; i++) {
    panels[i].style.background = colors[i];
  }

  pickedColor = pickColor(colors);
  rgbDisplay.textContent = pickedColor;
});

// configuring easy button
let easyBtn = document.querySelector("#easyBtn");

easyBtn.addEventListener("click", function () {
  numPanels = 3;
  colors = generateRandomColors(numPanels);

  for (let i = 0; i < panels.length; i++) {
    if (colors[i]) {
      panels[i].style.background = colors[i];
    } else {
      panels[i].style.display = "none";
    }
  }

  pickedColor = pickColor(colors);
  rgbDisplay.textContent = pickedColor;
});

// configuring hard button
let hardBtn = document.querySelector("#hardBtn");

hardBtn.addEventListener("click", function () {
  numPanels = 6;
  colors = generateRandomColors(numPanels);

  for (let i = 0; i < panels.length; i++) {
    panels[i].style.background = colors[i];
    panels[i].style.display = "block";
  }

  pickedColor = pickColor(colors);
  rgbDisplay.textContent = pickedColor;
});

// ----------MAIN PROGRAM--------------------------------

// On Start
let panels = document.querySelectorAll(".panels");
let numPanels = panels.length;

colors = generateRandomColors(numPanels);

for (let i = 0; i < numPanels; i++) {
  panels[i].style.background = colors[i];
}

let pickedColor = pickColor(colors);

let rgbDisplay = document.querySelector("#rgbDisplay");
rgbDisplay.textContent = pickedColor;

// ---------PANELS CONFIGURATION--------------------------
let message = document.querySelector("#message");

for (let i = 0; i < numPanels; i++) {
  panels[i].addEventListener("click", function () {
    let panel = this;
    let panelColor = panel.style.background;

    if (panelColor == pickedColor) {
      onCorrectAnswer(panelColor, panels, message, resetBtn);
    } else {
      onWrongAnswer(panel, message);
    }
  });
}
