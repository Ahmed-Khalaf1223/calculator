// Light/Dark Theme
console.log("JavaScript is working!");
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
    currentNumber = currentNumber.slice(0, -1);
  }
  updateScreen(currentNumber);
};

const executeOperation = () => {
  if (!storedNumber || !currentNumber || !operation) return;

  const num1 = parseFloat(storedNumber);
  const num2 = parseFloat(currentNumber);
  let result = 0;

  switch (operation) {
    case "+":
      result = num1 + num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    case "*":
      result = num1 * num2;
      break;
    case "/":
      result = num2 !== 0 ? num1 / num2 : "Error";
      break;
  }

  currentNumber = result.toString();
  storedNumber = "";
  operation = "";
  updateScreen(currentNumber);
};

const operationButtonHandler = (value) => {
  if (value === "Delete") {
    resetButtonHandler();
  } else if (value === "Backspace") {
    deleteButtonHandler();
  } else if (value === "Enter" || value === "=") {
    executeOperation();
  } else if (["+", "-", "*", "/"].includes(value)) {
    if (currentNumber === "" && storedNumber !== "") {
      operation = value;
      return;
    }
    if (storedNumber && currentNumber) {
      executeOperation();
    }
    operation = value;
    storedNumber = currentNumber || "0";
    currentNumber = "";
  }
};

// 1. Click Support
keyElements.forEach((el) => {
  el.addEventListener("click", () => {
    const type = el.dataset.type;
    const value = el.dataset.value;

    if (type === "number") {
      numberButtonHandler(value);
    } else if (type === "operation") {
      operationButtonHandler(value);
    }
  });
});

// 2. Keyboard Support
window.addEventListener("keydown", (e) => {
  const key = e.key;

  if ((key >= "0" && key <= "9") || key === ".") {
    numberButtonHandler(key);
  } else if (["+", "-", "*", "/"].includes(key)) {
    operationButtonHandler(key);
  } else if (key === "Enter" || key === "=") {
    e.preventDefault();
    operationButtonHandler("Enter");
  } else if (key === "Backspace") {
    operationButtonHandler("Backspace");
  } else if (key === "Escape" || key === "Delete") {
    operationButtonHandler("Delete");
  }
});
