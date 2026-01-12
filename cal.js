
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-action]");
const equalsButton = document.querySelector('[data-action="equals"]');
const deleteButton = document.querySelector('[data-action="backspace"]');
const clearButton = document.querySelector('[data-action="clear"]');
const previousOperandTextElement = document.getElementById("previousOperand");
const currentOperandTextElement = document.getElementById("currentOperand");



// This will perform the calculations for the simple arithmetic operations such as - + / e.t.c
function calculate() {
  let computation;
  const prev = parseFloat(this.previousOperand);
  const current = parseFloat(this.currentOperand);
  if (isNaN(prev) || isNaN(current)) return;

  switch (this.operation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "×":
      computation = prev * current;
      break;
    case "÷":
      computation = prev / current;
      break;
    case "x^y":
      computation = Math.pow(prev, current); //This is a JavaScript expression using the Math.pow() method, which calculates exponentiation (raising a base number to a power)
      break;
    default:
      return;
  }

  this.currentOperand = computation.toString();
  this.operation = undefined;
  this.previousOperand = "";
  this.resetScreen = true;
}


updateDisplay() {
  this.currentOperandTextElement.innerText = this.currentOperand;
  if (this.operation != null) {
    this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`;
  } else {
    this.previousOperandTextElement.innerText = "";
  }
}

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    
    calculate();
    updateDisplay();
  });
});