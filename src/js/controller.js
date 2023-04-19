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
    this.clear();
  }

  displayView(num) {
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
    this.previousNum = +display.value;
    this.operator = op;

    //
    display.value = "";
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

  clear() {
    display.value = "";
    this.currentNum = "";
    this.previousNum = "";
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
}

//
const calc = new Calculator();

// PERCENT
actionBtn.forEach((el) => {
  el.addEventListener("click", function () {
    if (el.classList.contains("clear")) {
      calc.clear();
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
  el.addEventListener("click", function () {
    calc.displayView(el.textContent);
  });
});

// OPERATORS
operatorBtn.forEach((el) => {
  el.addEventListener("click", function () {
    if (el.textContent !== "=") {
      calc.operation(el.textContent.trim());
    }

    if (el.textContent === "=") {
      //
      calc.calcResult();
    }
  });
});
