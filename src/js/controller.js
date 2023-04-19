const btn = document.querySelector(".calc-btns");
const display = document.querySelector(".display-bt");
const clearBtn = document.querySelector(".clear");
const numberBtn = document.querySelectorAll(".btn-number");
const actionBtn = document.querySelectorAll(".btn-action");
const operatorBtn = document.querySelectorAll(".btn-operator");
const pointBtn = document.querySelector(".btn-point");

// let currNum;
// let prevNum;
// let operator;

// NUMBERS
// numberBtn.forEach((el) => {
//   el.addEventListener("click", function () {
//     if (el.textContent === "0" && display.value === "") return;

//     if (currNum === "") {
//       currNum = currNum + el.textContent;
//       return (display.value = currNum);
//     }

//     currNum = display.value + el.textContent;
//     display.value = currNum;
//   });
// });

// // POINT
// btnPoint.addEventListener("click", function () {
//   //
//   currNum = "0.";
//   display.value = currNum;
// });

// // ACTION
// actionBtn.forEach((el) => {
//   el.addEventListener("click", function () {
//     // CLEAR
//     if (el.classList.contains("clear")) {
//       currNum = 0;
//       prevNum = 0;
//       return (display.value = "");
//     }

//     // NEGATIVE
//     if (el.classList.contains("negative")) {
//       if (display.value === 0 || display.value === "") {
//         return (display.value = "");
//       }

//       currNum = display.value.startsWith("-")
//         ? display.value.slice(1)
//         : "-" + display.value;

//       return (display.value = currNum);
//     }

//     // PERCENT
//     if (el.classList.contains("percent")) {
//       currNum = display.value / 100;
//       return (display.value = currNum);
//     }
//   });
// });

// const ggg = (op) => {
//   operator = op;
//   prevNum = currNum;
//   currNum = "";
//   display.value = currNum;
// };

// const kkk = () => {
//   if (operator === "/") {
//     const result = +prevNum / +currNum;
//     prevNum = result.toString();
//     display.value = result;
//     currNum = "";

//     return console.log(result);
//   }

//   if (operator === "*") {
//     const result = +prevNum * +currNum;
//     prevNum = result.toString();
//     display.value = result;
//     currNum = "";

//     return console.log(result);
//   }

//   if (operator === "-") {
//     const result = +prevNum - +currNum;
//     prevNum = result.toString();
//     display.value = result;
//     currNum = "";

//     return console.log(result);
//   }

//   if (operator === "+") {
//     const result = +prevNum + +currNum;
//     prevNum = result.toString();
//     display.value = result;
//     currNum = "";
//     return console.log(result);
//   }
// };

// // OPERATORS
// btnOperator.forEach((el) => {
//   el.addEventListener("click", function () {
//     // DIVIDE
//     if (el.classList.contains("divide")) {
//       ggg("/");
//     }

//     // MULTIPLY
//     if (el.classList.contains("multiply")) {
//       ggg("*");
//     }

//     // SUBTRACT
//     if (el.classList.contains("subtract")) {
//       ggg("-");
//     }

//     // ADD
//     if (el.classList.contains("add")) {
//       ggg("+");
//     }

//     // EQUAL
//     if (el.classList.contains("equal")) {
//       kkk();
//     }
//   });
// });

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
    if (this.operator === "/") {
      this.currentNum = +display.value;

      this.result = this.previousNum / this.currentNum;
      display.value = this.result;
    }

    if (this.operator === "*") {
      this.currentNum = display.value;

      this.result = this.previousNum * this.currentNum;
      display.value = this.result;
    }

    if (this.operator === "-") {
      this.currentNum = display.value;

      this.result = this.previousNum - this.currentNum;
      display.value = this.result;
    }

    if (this.operator === "+") {
      this.currentNum = display.value;

      this.result = this.previousNum + this.currentNum;
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
    if (el.textContent !== "=") calc.operation(el.textContent);

    if (el.textContent === "=") {
      //
      calc.calcResult();
    }
  });
});
