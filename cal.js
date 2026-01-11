// ============================================
// CONSTRUCTOR FUNCTION - BROKEN DOWN STEP BY STEP
// ============================================

/* 
🎯 ANALOGY: Think of Constructor Function like Mold for Making Keys

Imagine say you dey produce car keys for factory:
- The MOLD = Constructor Function (the template)
- Each KEY wey you produce = Object (the actual calculator)
- The process of making key = "new" keyword

You fit use one mold produce 1000 different keys!
Same way, you fit use one Constructor produce many calculators!
*/

// ============================================
// STEP 1: DEFINING THE CONSTRUCTOR FUNCTION
// ============================================

class Calculator {
    // This "constructor" na like the instruction manual
    // E dey tell JavaScript: "Anytime person wan create new calculator, 
    // do these things first!"
    
    constructor(previousOperandTextElement, currentOperandTextElement) {
      // WHAT JAVASCRIPT DEY HEAR IN PIDGIN:
      // "Oya, person don tell me say make I create new calculator.
      // Dem give me two things: where to show previous number 
      // and where to show current number. Make I arrange am."
      
      // "this" = THIS PARTICULAR CALCULATOR wey we dey create now
      // E be like say you dey point finger talk "THIS one, no be that one"
      
      this.previousOperandTextElement = previousOperandTextElement;
      // MEANING: For THIS calculator, store the previous display element
      
      this.currentOperandTextElement = currentOperandTextElement;
      // MEANING: For THIS calculator, store the current display element
      
      this.clear();
      // MEANING: For THIS calculator, reset everything to zero
    }
  
    // ============================================
    // STEP 2: METHODS (Functions inside the class)
    // ============================================
    
    clear() {
      // "this" here means "THIS PARTICULAR CALCULATOR"
      // So if you get 5 calculators, each one go get im own values!
      
      this.currentOperand = "0";  // Set THIS calculator's current number to "0"
      this.previousOperand = "";  // Clear THIS calculator's previous number
      this.operation = undefined; // THIS calculator no dey do any operation yet
      this.resetScreen = false;   // THIS calculator no need reset
      
      // PIDGIN: "Make I clean THIS calculator screen, put zero for am"
    }
  
    appendNumber(number) {
      // WHY WE USE "this":
      // Because this function need to know "which calculator button dem press?"
      // "this" dey tell am say "na THIS calculator o, no be another one"
      
      if (number === "." && this.currentOperand.includes(".")) return;
      // PIDGIN: "If dem don put dot before, no add another dot for THIS calculator"
      
      if (this.resetScreen) {
        this.currentOperand = "";
        this.resetScreen = false;
      }
      // PIDGIN: "If THIS calculator need reset, clear am first"
    //   Question: in which case will this run?
      
      if (this.currentOperand === "0" && number !== ".") {
        this.currentOperand = number.toString();
      } else {
        this.currentOperand = this.currentOperand.toString() + number.toString();
      }
      // PIDGIN: "Add the number to THIS calculator screen"
    }
  
    chooseOperation(operation) {
      if (this.currentOperand === "") return;
      // PIDGIN: "If THIS calculator screen empty, no do anything"
      
      if (this.previousOperand !== "") {
        this.compute(); // Calculate first before new operation
      }
      // PIDGIN: "If THIS calculator don get number for top, calculate am first"
      
      this.operation = operation;           // Store the operation (+, -, ×, ÷)
      this.previousOperand = this.currentOperand; // Move current to previous
      this.currentOperand = "";             // Clear current for new number
      
      // EXAMPLE:
      // You press: 5 + 
      // Result: previousOperand = "5", operation = "+", currentOperand = ""
    }
  
    compute() {
      let computation;
      const prev = parseFloat(this.previousOperand);  // Convert "5" to 5
      const current = parseFloat(this.currentOperand); // Convert "3" to 3
      
      if (isNaN(prev) || isNaN(current)) return;
      // PIDGIN: "If THIS calculator numbers no correct, no calculate"
  
      switch (this.operation) {
        case "+":
          computation = prev + current;  // 5 + 3 = 8
          break;
        case "-":
          computation = prev - current;  // 5 - 3 = 2
          break;
        case "×":
          computation = prev * current;  // 5 × 3 = 15
          break;
        case "÷":
          computation = prev / current;  // 6 ÷ 3 = 2
          break;
        default:
          return;
      }
  
      this.currentOperand = computation.toString(); // Put answer for screen
      this.operation = undefined;  // Clear operation
      this.previousOperand = "";   // Clear previous
      this.resetScreen = true;     // Mark say screen need reset
      
      // EXAMPLE:
      // Before: prev=5, current=3, operation="+"
      // After: currentOperand="8", operation=undefined, previousOperand=""
    }
  
    updateDisplay() {
      // Show the current number on screen
      this.currentOperandTextElement.innerText = this.currentOperand;
      
      // If operation dey exist, show previous number and operation
      if (this.operation != null) {
        this.previousOperandTextElement.innerText = 
          `${this.previousOperand} ${this.operation}`;
        // EXAMPLE OUTPUT: "5 +"
      } else {
        this.previousOperandTextElement.innerText = "";
        // EXAMPLE OUTPUT: (empty)
      }
    }
  }
  
  // ============================================
  // STEP 3: CREATING THE CALCULATOR (Using "new")
  // ============================================
  
  // Get the HTML elements where numbers will display
  const previousOperandTextElement = document.getElementById("previous-operand");
  const currentOperandTextElement = document.getElementById("current-operand");
  
  // THE MAGIC MOMENT! Creating a new calculator
  const calculator = new Calculator(
    previousOperandTextElement,
    currentOperandTextElement
  );
  
  /* 
  WHAT "new" KEYWORD DEY DO:
  ==========================
  
  PIDGIN EXPLANATION:
  "new" na like you dey tell JavaScript say:
  "Oya, use that Calculator blueprint wey I give you,
  make I produce fresh new calculator now now!"
  
  STEP-BY-STEP WETIN DEY HAPPEN:
  1. JavaScript create empty object {}
  2. E set "this" = that empty object
  3. E run the constructor function (arrange the object)
  4. E return the complete object
  
  RESULT:
  calculator = {
    previousOperandTextElement: <div id="previous-operand">,
    currentOperandTextElement: <div id="current-operand">,
    currentOperand: "0",
    previousOperand: "",
    operation: undefined,
    resetScreen: false,
    
    // Plus all the methods (functions):
    clear: function() {...},
    appendNumber: function(number) {...},
    chooseOperation: function(operation) {...},
    compute: function() {...},
    updateDisplay: function() {...}
  }
  */
  
  // ============================================
  // STEP 4: USING THE CALCULATOR
  // ============================================
  
  // When person press number button
  document.querySelectorAll("[data-number]").forEach((button) => {
    button.addEventListener("click", () => {
      // Call the appendNumber method on OUR calculator
      calculator.appendNumber(button.innerText);
      // PIDGIN: "calculator, add this number to your screen"
      
      calculator.updateDisplay();
      // PIDGIN: "calculator, show the new number for screen"
    });
  });
  
  /* 
  COMPLETE EXAMPLE - PERSON PRESS: 5 + 3 =
  ==========================================
  
  STEP 1: Press "5"
  - calculator.appendNumber("5") is called
  - Inside appendNumber, "this.currentOperand" becomes "5"
  - calculator.updateDisplay() shows "5" on screen
  
  STEP 2: Press "+"
  - calculator.chooseOperation("+") is called
  - Inside chooseOperation:
    * this.previousOperand = "5"
    * this.operation = "+"
    * this.currentOperand = ""
  - calculator.updateDisplay() shows "5 +" at top, "" at bottom
  
  STEP 3: Press "3"
  - calculator.appendNumber("3") is called
  - this.currentOperand becomes "3"
  - calculator.updateDisplay() shows "5 +" at top, "3" at bottom
  
  STEP 4: Press "="
  - calculator.compute() is called
  - Inside compute:
    * prev = 5, current = 3
    * computation = 5 + 3 = 8
    * this.currentOperand = "8"
  - calculator.updateDisplay() shows "8" on screen
  */
  
  // ============================================
  // WHY USE CONSTRUCTOR FUNCTION?
  // ============================================
  
  /* 
  ADVANTAGE 1: You fit create plenty calculators!
  
  const calc1 = new Calculator(display1, display2);
  const calc2 = new Calculator(display3, display4);
  const calc3 = new Calculator(display5, display6);
  
  Each one get im own:
  - Own numbers (calc1 get im own, calc2 get im own)
  - Own operations
  - Own screen
  
  If you press 5 for calc1, e no go show for calc2!
  */
  
  /* 
  ADVANTAGE 2: Organization (Everything dey one place)
  
  Instead of:
  - 10 separate functions
  - 10 separate variables scattered everywhere
  
  You get:
  - One Calculator "template"
  - Everything organized together
  - Easy to understand say "all these things na for calculator"
  */
  
  /* 
  ADVANTAGE 3: Reusability
  
  You write the Calculator code ONCE
  You fit use am create 100 different calculators
  Each calculator independent, dem no dey interfere
  */