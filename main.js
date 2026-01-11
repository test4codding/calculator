let hasNewInput = true;
let num1 = null;
let num2 = null;
let currentOperator = null;

const add = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;
const multiply = (num1, num2) => num1 * num2;
const divide = (num1, num2) => num1 / num2;
const modulo = (num1, num2) => num1 % num2;
const root = (num1, num2) => Math.sqrt(num1, num2);

const operations = {
  "+": add,
  "-": subtract,
  "*": multiply,
  "/": divide,
  "%": modulo,
  "√": root,
};

function operate(operator, num1, num2) {
  return operations[operator](num1, num2);
}

function handleOperators(btn, key) {
  if (num1 === null) {
    num1 = Number(display.textContent);
  } else if (hasNewInput && currentOperator != null) {
    num2 = Number(display.textContent);
    num1 = operate(currentOperator, num1, num2);
    display.textContent = parseFloat(num1.toFixed(10));
  }
  currentOperator = btn != null ? btn.textContent : key;
  hasNewInput = false;
}

function calculateResult() {
  if (hasNewInput && currentOperator !== null && num1 !== null) {
    num2 = Number(display.textContent);
    num1 = Number(operate(currentOperator, num1, num2));
    display.textContent = num1;
    hasNewInput = false;
  }
}

const display = document.querySelector(".display");
const digitButtons = document.querySelectorAll(".digits");
const equalsButton = document.querySelector(".equals");
const operateButtons = document.querySelectorAll(".operator");
const deleteButton = document.querySelector(".delete");
const allClearButton = document.querySelector(".all-clear");
const dotButton = document.querySelector(".dot");

for (let btn of operateButtons) {
  btn.addEventListener("click", () => handleOperators(btn));
}

equalsButton.addEventListener("click", () => calculateResult());
deleteButton.addEventListener(
  "click",
  () => (display.textContent = display.textContent.slice(0, -1))
);

dotButton.addEventListener("click", () => {
  if (!display.textContent.includes(".")) {
    if (display.textContent.length === 0) {
      display.textContent += "0.";
    } else {
      display.textContent += ".";
    }
  }
});

allClearButton.addEventListener("click", () => {
  num1 = null;
  num2 = null;
  currentOperator = null;
  display.textContent = "";
  hasNewInput = true;
});

for (let digit of digitButtons) {
  digit.addEventListener("click", () => {
    if (display.textContent == "0") {
      return;
    }
    if (!hasNewInput) {
      display.textContent = "";
    }
    hasNewInput = true;
    display.textContent += digit.textContent;
  });
}

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "+":
    case "-":
    case "*":
    case "/":
    case "%":
    case "√":
      handleOperators(null, e.key);
      break;

    case "Enter":
      calculateResult();
      break;

    case "Backspace":
      display.textContent = display.textContent.slice(0, -1);
      break;

    case ".":
      if (!display.textContent.includes(".")) {
        display.textContent += ".";
      }
      break;

    default:
      if (!isNaN(e.key) && e.key !== " ") {
        if (!hasNewInput) display.textContent = "";
        hasNewInput = true;
        display.textContent += e.key;
      }
      break;
  }
});
