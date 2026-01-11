// A constructor function is a special type of function designed to create and initialize objects when called with the new keyword

class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
    
    
  }

  // This will reset everything to default
  clear() {
    this.currentOperand = "0";
    this.previousOperand = "";
    this.operation = undefined;
    this.resetScreen = false;
  }

  // This is for the backspace functionality
  delete() {
    // This is to check if the values length of this.currentOperand (a string) is exactly single-digit numbers like "5" or "0".
    if (
      this.currentOperand.length === 1 ||
      (this.currentOperand.length === 2 && this.currentOperand.startsWith("-"))
    ) {
      this.currentOperand = "0";
    } else {
      this.currentOperand = this.currentOperand.toString().slice(0, -1);
      // Removes the last character from the string. For example: "123" becomes "12". and "-123" becomes "-12".
    }
  }

  // This is to get hold of the Number inputed by the user
  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return; //This is to  prevents multiple decimals in a single number, like "12.34." becoming invalid.
    if (this.resetScreen) {
      this.currentOperand = "";
      this.resetScreen = false;
    }
    if (this.currentOperand === "0" && number !== ".") {
      this.currentOperand = number.toString(); // This is to Replaces "0" with the new number (e.g., "0" + "5" becomes "5", not "05").
    } else {
      this.currentOperand = this.currentOperand.toString() + number. toString(); // This is to Concatenates the new number to the end of this.currentOperand. Ensures both are strings (e.g., "12" + "3" = "123", or "45" + "." = "45.").


    }
  }

  // This is to decide what to do with the operator chosen by the user
  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.calculate();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  // This will perform the calculations for the simple arithmetic operations such as - + / e.t.c
  calculate() {
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

  // This is for the scientific calculations
  scientificFunction(func) {
    const current = parseFloat(this.currentOperand);
    if (isNaN(current)) return;

    switch (func) {
      case "sqrt":
        this.currentOperand = Math.sqrt(current).toString();
        break;
      case "square":
        this.currentOperand = Math.pow(current, 2).toString();
        break;
      // case "cube":
      //   this.currentOperand = Math.pow(current, 3).toString();
      //   break;
      case "sin":
        this.currentOperand = Math.sin((current * Math.PI) / 180).toString();
        break;
      case "cos":
        this.currentOperand = Math.cos((current * Math.PI) / 180).toString();
        break;
      case "tan":
        this.currentOperand = Math.tan((current * Math.PI) / 180).toString();
        break;
      case "log":
        this.currentOperand = Math.log10(current).toString();
        break;
      // case "ln":
      //   this.currentOperand = Math.log(current).toString();
      //   break;
      // case "pi":
      //   this.currentOperand = Math.PI.toString();
      //   break;
      case "factorial":
        this.currentOperand = this.factorial(current).toString();
        break;
      // case "reciprocal":
      //   this.currentOperand = (1 / current).toString();
      //   break;
      // case "exp":
      //   this.currentOperand = Math.exp(current).toString();
      //   break;
      // case "ten-power":
      //   this.currentOperand = Math.pow(10, current).toString();
      //   break;
      // case "percentage":
      //   this.currentOperand = (current / 100).toString();
      //   break;
      // case "plus-minus":
      //   this.currentOperand = (current * -1).toString();
      //   break;
      default:
        return;
    }
    this.resetScreen = true;
  }

  factorial(n) {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.currentOperand;
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = "";
    }
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-action]");
const equalsButton = document.querySelector('[data-action="equals"]');
const deleteButton = document.querySelector('[data-action="backspace"]');
const clearButton = document.querySelector('[data-action="clear"]');
const previousOperandTextElement = document.getElementById("previousOperand");
const currentOperandTextElement = document.getElementById("currentOperand");

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    
    calculator.calculate();
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const action = button.getAttribute("data-action");
    if (["+", "-", "×", "÷", "x^y"].includes(action)) {
      calculator.chooseOperation(action);
    } else {
      calculator.scientificFunction(action);
    }
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", () => {
  calculator.calculate();
  calculator.updateDisplay();
});

clearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});

// Keyboard support
document.addEventListener("keydown", (e) => {
  if (e.key >= 0 && e.key <= 9) {
    calculator.appendNumber(e.key);
    calculator.updateDisplay();
  } else if (e.key === ".") {
    calculator.appendNumber(".");
    calculator.updateDisplay();
  } else if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
    const operation = e.key === "*" ? "×" : e.key === "/" ? "÷" : e.key;
    calculator.chooseOperation(operation);
    calculator.updateDisplay();
  } else if (e.key === "Enter" || e.key === "=") {
    calculator.calculate();
    calculator.updateDisplay();
  } else if (e.key === "Backspace") {
    calculator.delete();
    calculator.updateDisplay();
  } else if (e.key === "Escape") {
    calculator.clear();
    calculator.updateDisplay();
  } else if (e.key === "%") {
    calculator.scientificFunction("percentage");
    calculator.updateDisplay();
  }
});
