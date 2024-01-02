"use-strict";

//querySelect the binary display elements, buttons elements, and decimal display elements
const digits = document.querySelectorAll(".display");
const buttons = document.querySelectorAll(".switch");
const outputs = document.querySelectorAll(".output");

//Create an output array to replace the decimal display outputs
let output = [0, 0, 0, 0, 0, 0, 0, 0];

//Create an onclick for each button to run toggle() for that buttons data-value
buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    toggle(e.target.dataset.value);
  });
});

//toggle() takes a button data-value and matches it to a binary display element
//If the data-value of a button is 7, it will match to the 7th binary display element
//The text content of that element will either return 1 or 0 depending on it's previous state
//The data-value corresponds with the digit being evaluated
//For instance, if the data-value = 0 then the decimal value of the 0th binary digit is 2^0
const toggle = (selector) => {
  let digit = selector;
  let value = Math.pow(2, selector);
  digit = digits[digit].dataset.value;
  if (digits[digit].textContent === "0") {
    digits[digit].textContent = 1;
    buttons[digit].textContent = "-";
    output[digit] = value;
  } else {
    digits[digit].textContent = 0;
    buttons[digit].textContent = "+";
    output[digit] = 0;
  }
  calculate(output);
};

//calculate() takes the updated output array from toggle and determines its sum
//An outputArray is created from sum in order to update the global output array
//If the sum is 21, the output array will look like [2, 1]
//The outputArray is then appended 0's with unshift() to match the global output array length
const calculate = (array) => {
  let input = array;
  let sum = 0;
  let outputArray = [];
  input.forEach((index) => {
    sum += index;
  });
  outputArray = Array.from(String(sum), Number);
  let length = 8 - outputArray.length;

  for (let i = 0; i < length; i++) {
    outputArray.unshift(0);
  }
  for (let i = 0; i < outputs.length; i++) {
    outputs[i].textContent = outputArray[i];
  }
};

// reset() simply reverts each element and output array to their initial values
const reset = document.getElementById("reset");
reset.addEventListener("click", (e) => {
  output = [0, 0, 0, 0, 0, 0, 0, 0];
  calculate(output);
  buttons.forEach((value) => {
    value.textContent = "+";
  });
  digits.forEach((value) => {
    value.textContent = "0";
  });
});
