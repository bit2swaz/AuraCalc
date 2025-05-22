let currentDisplayValue = '0';
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

const mainDisplay = document.querySelector('.main-display');
const historyDisplay = document.querySelector('.history-display');
const buttons = document.querySelectorAll('.button');

function updateDisplay() {
    mainDisplay.textContent = currentDisplayValue;
}

updateDisplay();
historyDisplay.textContent = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonText = button.textContent;
        console.log(`Button clicked: ${buttonText}`);

        if (button.classList.contains('digit') || button.classList.contains('decimal')) {
            handleDigitClick(buttonText);
        }
        else if (button.classList.contains('operator')) {
            console.log(`Operator clicked: ${buttonText}`);
        } else if (button.classList.contains('equals')) {
            console.log(`Equals clicked`);
        } else if (button.classList.contains('clear')) {
            console.log(`Clear clicked`);
        } else if (button.classList.contains('backspace')) {
            console.log(`Backspace clicked`);
        }
        updateDisplay();
    });
});

function handleDigitClick(digit) {
    if (waitingForSecondOperand) {
        currentDisplayValue = digit;
        waitingForSecondOperand = false;
    } else {
        if (currentDisplayValue === 0 && digit !== '.') {
            currentDisplayValue = digit;
        } else if (digit === '.') {
            if (!currentDisplayValue.includes('.')) {
                currentDisplayValue += digit;
            }
        } else {
            currentDisplayValue += digit;
        }
    }
}

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => {
    if (b === 0) return "ERROR: Div/0!";
    return a / b;
};

const operate = (op, num1, num2) => {
    num1 = Number(num1);
    num2 = Number(num2);

    switch (op) {
        case '+': return add(num1, num2);
        case '-': return subtract(num1, num2);
        case '*': return multiply(num1, num2);
        case '/': return divide(num1, num2);
        default: return null;
    }
};