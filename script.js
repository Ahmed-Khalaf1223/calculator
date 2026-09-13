// Light/Dark Theme

const toggleElement = document.querySelector(".themes__toggle");

const toggleDarkTheme = () => {
  toggleElement.classList.toggle("themes__toggle--isActive");
};

const toggleDarkThemeWithEnter = (el) => {
  if (el.key === "Enter") {
    toggleDarkTheme();
  }
};

toggleElement.addEventListener("click", toggleDarkTheme);

toggleElement.addEventListener("keydown", toggleDarkThemeWithEnter);

// Calculator Logic

let storedNumber = "";
let currentNumber = "";
let operation = "";

const resultElement = document.querySelector(".calc__result");
const keyElements = document.querySelectorAll("[data-type]");

const updateScreen = (value) => {
  resultElement.innerText = !value ? "0" : value;
};

const numberButtonHandler = (value) => {
  if (value === "." && currentNumber.includes(".")) return;

  if (value === "0" && !currentNumber) return;

  currentNumber += value;

  updateScreen(currentNumber);
};

const resetButtonHandler = () => {
  storedNumber = "";
  currentNumber = "";
  operation = "";

  updateScreen(currentNumber);
};

const deleteButtonHandler = () => {
  if (currentNumber === "0" || !currentNumber) return;

  if (currentNumber.length === 1) {
    currentNumber = "";
  } else {
    currentNumber = currentNumber.substring(0, currentNumber.length - 1);
  }

  updateScreen(currentNumber);
};

keyElements.forEach((el) => {
  el.addEventListener("click", () => {
    const type = el.dataset.type;
    const value = el.dataset.value;

    if (type === "number") {
      numberButtonHandler(value);
    } else if (type === "operation") {
      switch (value) {
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
