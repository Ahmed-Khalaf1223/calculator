// Light/Dark Theme

let toggleElement = document.querySelector(".themes__toggle");

let toggleDarkTheme = () => {
  toggleElement.classList.toggle("themes__toggle--isActive");
};
let toggleDarkThemeWithEnter = (el) => {
  el.key === "Enter" && toggleDarkTheme();
};

toggleElement.addEventListener("click", toggleDarkTheme);
toggleElement.addEventListener("keydown", toggleDarkThemeWithEnter);

// Logic for calculator

let storedNumber = "";
let currentNumber = "";
let operation = "";

let resultElement = document.querySelector(".calc__result");
let keyElements = document.querySelectorAll("[data-type]");

let updateScreen = (value) => {
  resultElement.innerText = !value ? "0" : value;
};

let numberButtonHandler = (value) => {
  if (value === "." && currentNumber.includes(".")) return;
  if (value === "0" && !currentNumber) return;
  currentNumber += value;
  updateScreen(currentNumber);
};

let resetButtonHandler = () => {
  storedNumber = "";
  currentNumber = "";
  operation = "";
  updateScreen(currentNumber);
};

let deleteButtonHandler = () => {
  if (currentNumber === "0" || !currentNumber) return;
  if (currentNumber === "1") {
    currentNumber = "";
  } else {
    currentNumber = currentNumber.substring(0, currentNumber.length - 1);
  }
  updateScreen(currentNumber);
};
keyElements.forEach((el) => {
  el.addEventListener("click", () => {
    let type = el.dataset.type;
    if (type === "number") {
      numberButtonHandler(el.dataset.value);
    } else if (type === "operation") {
      switch (el.dataset.value) {
        case "Delete":
          resetButtonHandler();
          break;
        case "Backspace":
          deleteButtonHandler();
          break;
      }
    }
  });
});
