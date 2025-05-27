function add(num1, num2) {
    return num1 + num2
}

function subtract(num1, num2) {
    return num1 - num2
}

function multiply(num1, num2) {
    return num1*num2
}

function divide(num1, num2) {
    return num2 === 0 ? "Nuh uh" : num1/num2
}

function operate(num1, num2, operator) {
    switch (operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
        default:
            return num2;
  }

}

let currentInput = "";
let previousValue = null;
let currentOperator = null;
let resultDisplayed = false;

const display = document.getElementById("display");

function updateDisplay(value) {
  display.textContent = value.toString().length > 12
    ? Number(value).toExponential(3)
    : value;
}

document.querySelectorAll(".digit").forEach(button => {
  button.addEventListener("click", () => {
    if (resultDisplayed) {
      currentInput = button.textContent;
      resultDisplayed = false;
    } else {
      currentInput += button.textContent;
    }
    updateDisplay(currentInput);
  });
});

document.querySelectorAll(".operator").forEach(button => {
  button.addEventListener("click", () => {
    if (currentInput === "") return;

    if (previousValue !== null && currentOperator !== null) {
      const result = operate(Number(previousValue), Number(currentInput), currentOperator);
      if (result === "Nuh uh") {
        updateDisplay(result);
        resetState();
        return;
      }
      previousValue = result;
    } else {
      previousValue = Number(currentInput);
    }

    currentOperator = button.textContent;
    currentInput = "";
    updateDisplay(previousValue);
  });
});

document.getElementById("equals").addEventListener("click", () => {
  if (previousValue !== null && currentInput !== "" && currentOperator !== null) {
    const result = operate(Number(previousValue), Number(currentInput), currentOperator);
    if (result === "Nuh uh") {
      updateDisplay(result);
    } else {
      updateDisplay(Math.round(result * 1000) / 1000);
    }
    resultDisplayed = true;
    resetState();
  }
});

document.getElementById("clear").addEventListener("click", () => {
  resetState();
  updateDisplay(0);
});

function resetState() {
  currentInput = "";
  previousValue = null;
  currentOperator = null;
}