//first initialized values
//DOM selectors
const operatorButtons = document.querySelector('operator-btn');
const numberButtons = document.querySelector('number-btn');
const pointButton = document.querySelector('point-btn');
const equalsButton = document.getElementById('equalsButton');
const display = document.getElementById("display");
const displayLast = document.getElementById("displayLast");


function clearAll() {
    displayLast.textContent = '0';
        displayLast.style.color = 'rgba(197, 197, 197, 0.0)';
    display.textContent = '0';
    firstOperand = 0;
    secondOperand = '';
    currentOperator = '';
    equation = '';
    calcResult = '';
    operatorCount = 0;
    isOperatorPressed = false;
    isEqualsPressed = false;
    isOperationTrue = false;
    shouldResetDisplay = false;
    resetDisplayStyle();

    if (isNaN(firstOperand)) {
        firstOperand = 0;
    }
    
    console.log("firstOperand is " + firstOperand + ";",
            "secondOperand is " + 'null' + ";",
            "isOperatorPressed is " + isOperatorPressed + ";",
            "operatorCount is " + operatorCount);
}
function appendToDisplay(input) {
    if (display.textContent === '0' || shouldResetDisplay) {
        display.textContent = '';
        shouldResetDisplay = false;
        firstOperand = 0;
    }
    
    if (input === '-' && isOperatorPressed && !secondOperand) {
        secondOperand += input;
        display.textContent += input;
        console.log("secondOperand is " + secondOperand);
        return;
    }

    display.textContent += input;

    if (isOperatorPressed) {
        secondOperand += input;
        if (isNaN(firstOperand)) {
            firstOperand = 0;
        }
    } else {
        firstOperand = parseFloat(display.textContent);
        if (isNaN(firstOperand)) {
            firstOperand = 0;
        }
    }

    console.log("firstOperand is " + firstOperand);
    if (secondOperand !== '') {
        console.log("secondOperand is " + parseFloat(secondOperand));
    } else {
        console.log("secondOperand is null");
    }
}

function setOperator(operator) {
    if (operatorCount == 1) {
        if (operator == '-') {

        }
    }

    if ((firstOperand !== '' && currentOperator !== '' && secondOperand !== '' && display.textContent !== "")) {
        calculateRollingOperation();
        currentOperator = operator;
        isOperatorPressed = true;
        console.log(operatorCount);
        console.log("operator is " + operator);
        console.log("Is operator pressed?: " + isOperatorPressed)
        return;
    } else {
        if (firstOperand !== 0 || display.textContent !== '0') {
        isOperatorPressed = true;
        operatorCount++;
        currentOperator = operator;
        firstOperand = parseFloat(display.textContent);
        console.log("operator is " + operator);
        console.log("Is operator pressed?: " + isOperatorPressed)
        } else {
        isOperatorPressed = true;
        firstOperand = 0;
        operatorCount++;
        currentOperator = operator;
        console.log('no firstOperand input, default to 0.');
        console.log("operator is " + operator);
        console.log("Is operator pressed?: " + isOperatorPressed)
        } console.log('operatorCount is ' + operatorCount);
    }
};

//function to add equation to upper display after calculate() is activated
function appendToDisplayLast() {
    displayLast.textContent = (firstOperand + "" + operator + "" + secondOperand);
}

//function to backspace entry
function clearEntry() {
    display.textContent = display.textContent
        .slice(0, -1);
    if (display.textContent === '') {
        display.textContent = '0'
    }
};




function calculate() {
    if (!isOperatorPressed) {
        displayLast.textContent = `${firstOperand} =`
        displayLast.style.color = '';
    } else {
    displayLast.textContent = `${firstOperand} ${currentOperator} ${parseFloat(secondOperand)} =`
        displayLast.style.color = '';
    };

    if ((firstOperand == 0 || secondOperand == 0) && (currentOperator == '÷' || currentOperator == '/')) {
        display.textContent = 'Cannot divide by zero.';
        display.style.fontSize = '2.8em';
        display.style.color = 'rgba(197, 197, 197, 0.7)';
        
        return;
    }
    
    if (firstOperand !== '' && currentOperator !== '' && secondOperand !== '' && display.textContent !== "") {
        let result = '';
        const num1 = parseFloat(firstOperand);
        const num2 = parseFloat(secondOperand);
        
        switch (currentOperator) {
            case "+":
                result = add(num1, num2);
                break;
            case "-":
                result = subtract(num1, num2);
                break;
            case "*":
            case "x":
                result = multiply(num1, num2);
                break;
            case "÷":
            case "/":
                result = divide(num1, num2);
                break;
            default:
                return;
        }
        roundedResult = roundResult(result);
        display.textContent = roundedResult;
        firstOperand = roundedResult;
        secondOperand = '';
        isOperatorPressed = false;
        operatorCount = 0;
        console.log('first Operand is now ' + firstOperand + '; ' + 
            'secondOperand is reset/null; ' +
            'isOperatorPressed is ' + isOperatorPressed + '; ' +
            'operatorCount is ' + operatorCount);
            
    } if ((isNaN(display.textContent))) {
        display.textContent = 'Invalid operation.';
        display.style.fontSize = '3em';
        display.style.color = 'rgba(197, 197, 197, 0.7)';
        return;
    }
}

//function to continously update firstOperand for every operator click
function calculateRollingOperation() {

    displayLast.textContent = `${firstOperand} ${currentOperator} ${parseFloat(secondOperand)} =`

    if ((firstOperand == 0 || secondOperand == 0) && (currentOperator == '÷' || currentOperator == '/')) {
        display.textContent = 'Cannot divide by zero.';
        display.style.fontSize = '2.8em';
        display.style.color = 'rgba(197, 197, 197, 0.7)';
        return;
    }
    
    if (firstOperand !== '' && currentOperator !== '' && secondOperand !== '' && display.textContent !== "") {
        let result = '';
        const num1 = parseFloat(firstOperand);
        const num2 = parseFloat(secondOperand);
        
        switch (currentOperator) {
            case "+":
                result = add(num1, num2);
                break;
            case "-":
                result = subtract(num1, num2);
                break;
            case "*":
            case "x":
                result = multiply(num1, num2);
                break;
            case "÷":
            case "/":
                result = divide(num1, num2);
                break;
            default:
                return;
        };
        roundedResult = roundResult(result)
        firstOperand = roundedResult;
        console.log(firstOperand);
        operatorCount++;
        secondOperand = '';
        isOperatorPressed = true;
            console.log('first Operand is now ' + firstOperand + '; ' + 
                        'secondOperand is reset/null; ' +
                        'isOperatorPressed is ' + isOperatorPressed + '; ' +
                        'operatorCount is ' + operatorCount);
    } if ((isNaN(firstOperand))) {
        display.textContent = 'Invalid operation.';
        display.style.fontSize = '3em';
        display.style.color = 'rgba(197, 197, 197, 0.7)';
        return;
    }
}

function handleDivisionByZero() {
    if ((firstOperand == 0 || parseFloat(secondOperand) == 0) && (currentOperator == '÷' || currentOperator == '/')) {
        display.textContent = 'Cannot divide by zero.';
    }
}


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

function resetDisplayStyle() {
    display.style.fontSize = '';
    display.style.color = '';
}

function roundResult(number) {
    return Math.round(number * 100000) / 100000
  }


clearAll();
