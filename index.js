//first initialized values
clearAll();


function clearAll() {
    let initializeOperand = document.getElementById('display').value = '0';
    let firstOperand = initializeOperand;
    let secondOperand = "";
    let operator = "";
    let calcResult = "";
    let isOperatorPressed = false;
    let isOperationTrue = false;
    let shouldResetDisplay = false;
}

//DOM selectors
const operatorButtons = document.querySelector('operator-btn');
const numberButtons = document.querySelector('number-btn');
const pointButton = document.querySelector('point-btn');
const equalsButton = document.getElementById('equalsButton');

const display = document.getElementById("display");
const displayLast = document.getElementById("displayLast");



function appendToDisplay(input) {
    if (display.value === '0' || shouldResetDisplay) {
        display.value = '';
        shouldResetDisplay = false;
    }
    display.value += input;
}

function appendToDisplayLast() {
    displayLast.value = (firstOperand + "" + operator + "" + secondOperand);
}

function clearEntry() {
    display.value = display.value
        .slice(0, -1)
};

function setOperator(op) {

    operator = op;
    setOperator = true;
}

function calculate() {
    if (firstOperand !== "" && operator !== "" && display.value !== "") {
        secondOperand = display.value;
        let result;
        const num1 = parseFloat(firstOperand);
        const num2 = parseFloat(secondOperand);
        switch (operator) {
            case "+":
                result = add(num1, num2);
                break;
            case "-":
                result = subtract(num1, num2);
                break;
            case "*":
                result = multiply(num1, num2);
                break;
            case "/":
                if (num2 === 0) {
                    alert("Cannot divide by zero");
                    return;
                }
                result = divide(num1, num2);
                break;
            default:
                return;
        }
    } 
    display.value = result;
};


//calculator functions
const add = function (firstOperand, secondOperand) {
    return (firstOperand + secondOperand)
};

const subtract = function(firstOperand, secondOperand) {
    return (firstOperand - secondOperand)
};

const multiply = function(firstOperand, secondOperand) {
    return (firstOperand * secondOperand)
};

const divide = function(firstOperand, secondOperand) {
    return (firstOperand / secondOperand)
};

