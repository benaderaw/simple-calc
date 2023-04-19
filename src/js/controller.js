const btn = document.querySelector(".calc-btns");
const display = document.querySelector(".display-bt");
const clearBtn = document.querySelector(".clear");
const numberBtn = document.querySelectorAll(".btn-number");
const actionBtn = document.querySelectorAll(".btn-action");
const operatorBtn = document.querySelectorAll(".btn-operator");
const pointBtn = document.querySelector(".btn-point");

class Calculator {
  constructor(currentNum, previousNum, operator, result) {
    this.currentNum = currentNum;
    this.previousNum = previousNum;
    this.operator = operator;
    this.result = result;

    // this.clear();
  }

  displayView(num) {
    clearBtn.textContent = "C";

    if (this.currentNum === "") {
      display.value = "";
      if (num === "." && display.value === "") {
        display.value = "0.";

        return (this.currentNum = display.value);
      }

      if (num === "0") return;

      display.value = display.value + num;
      return (this.currentNum = display.value);
    }

    if (num === "." && display.value.includes(".")) return;

    display.value = display.value + num;
  }

  operation(op) {
    this.operator = op;
    if (display.value === "") return;

    this.previousNum = +display.value;

    //
    display.value = "";
    display.setAttribute("placeholder", this.previousNum);
  }

  calcResult() {
    this.currentNum = +display.value;

    if (this.operator === "÷") {
      this.result = this.previousNum / this.currentNum;
      display.value = this.result;
    }

    if (this.operator === "close") {
      this.result = this.previousNum * this.currentNum;
      display.value = this.result;
    }

    if (this.operator === "-") {
      this.result = this.previousNum - this.currentNum;
      display.value = this.result;
    }

    if (this.operator === "+") {
      this.result = +this.previousNum + this.currentNum;
      display.value = this.result;
    }

    this.currentNum = "";
  }

  negativeNum() {
    if (display.value === "" || display.value === "0") return;

    display.value = display.value.startsWith("-")
      ? display.value.slice(1)
      : "-" + display.value;
  }

  percentNum() {
    display.value = display.value / 100;
  }

  clear() {
    clearBtn.textContent = "AC";

    if (this.operator === undefined) {
      display.style.fontSize = 4 + "rem";
      return (display.value = "");
    }

    if (this.operator !== undefined) {
      display.style.fontSize = 4 + "rem";
      return (this.operator = undefined);
    }
  }

  allClear() {
    display.value = "";
    this.currentNum = "";
    this.previousNum = "";
    display.style.fontSize = 4 + "rem";
    display.setAttribute("placeholder", "0");
  }
}

//
const calc = new Calculator();

// CLEAR / NEGATIVE / PERCENT
actionBtn.forEach((el) => {
  el.addEventListener("click", function() {
    if (el.classList.contains("clear")) {
      if (el.textContent === "C") return calc.clear();
      if (el.textContent === "AC") return calc.allClear();
    }

    if (el.classList.contains("negative")) {
      calc.negativeNum();
    }

    if (el.classList.contains("percent")) {
      calc.percentNum();
    }
  });
});

// NUMBERS
numberBtn.forEach((el) => {
  el.addEventListener("click", function() {
    let currentFontSize = 4;

    if (display.scrollWidth > display.clientWidth) {
      while (display.scrollWidth > display.clientWidth) {
        currentFontSize = currentFontSize - 0.1;
        display.style.fontSize = currentFontSize + "rem";
      }
    } else {
      display.style.fontSize = 4 + "rem";
    }

    calc.displayView(el.textContent);
  });
});

// OPERATORS
operatorBtn.forEach((el) => {
  el.addEventListener("click", function() {
    if (el.textContent !== "=") {
      calc.operation(el.textContent.trim());
    }

    if (el.textContent === "=") {
      //
      calc.calcResult();
    }
  });
});
