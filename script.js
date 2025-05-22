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

        if (button.classList.contains('digit') || button.classList.contains('decimal')) {
            handleDigitClick(buttonText);
        }
        else if (button.classList.contains('operator')) {
            let opSymbol = buttonText;
            if (button.classList.contains('percent')) {
                 opSymbol = '%';
            }
            handleOperatorClick(opSymbol);
        }
        else if (button.classList.contains('equals')) {
            handleEqualsClick();
        }
        else if (button.classList.contains('clear')) {
            handleClearClick();
        }
        else if (button.classList.contains('backspace')) {
            handleBackspaceClick();
        }

        updateDisplay();
    });
});

function handleDigitClick(digit) {
    if (waitingForSecondOperand) {
        currentDisplayValue = digit;
        waitingForSecondOperand = false;
        historyDisplay.textContent = '';
    } else {
        if (currentDisplayValue === '0' && digit !== '.') {
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

function handleOperatorClick(nextOperator) {
    const inputValue = Number(currentDisplayValue);

    if (firstOperand === null) {
        firstOperand = inputValue;
    }
    else if (waitingForSecondOperand) {
        operator = nextOperator;
        historyDisplay.textContent = `${firstOperand} ${operator}`;
        updateDisplay();
        return;
    }
    else if (operator) {
        const result = operate(operator, firstOperand, inputValue);

        if (result === "ERROR: Div/0!") {
            currentDisplayValue = result;
            firstOperand = null;
            operator = null;
            waitingForSecondOperand = false;
            historyDisplay.textContent = '';
            updateDisplay();
            return;
        }

        currentDisplayValue = String(result);
        firstOperand = result;
    }

    operator = nextOperator;
    waitingForSecondOperand = true;
    historyDisplay.textContent = `${firstOperand} ${operator}`;
    updateDisplay();
}

function handleEqualsClick() {
    if (firstOperand === null || operator === null || waitingForSecondOperand) {
        console.log("Cannot evaluate: Incomplete expression or waiting for second operand.");
        return;
    }

    const secondOperand = Number(currentDisplayValue);
    const result = operate(operator, firstOperand, secondOperand);

    if (result === "ERROR: Div/0!") {
        currentDisplayValue = result;
        firstOperand = null;
        operator = null;
        waitingForSecondOperand = false;
        historyDisplay.textContent = '';
        updateDisplay();
        return;
    }

    currentDisplayValue = String(result);
    historyDisplay.textContent = `${firstOperand} ${operator} ${secondOperand} =`;

    firstOperand = result;
    operator = null;
    waitingForSecondOperand = true;
}

function handleClearClick() {
    currentDisplayValue = '0';
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
    historyDisplay.textContent = '';
}

function handleBackspaceClick() {
    if (waitingForSecondOperand || currentDisplayValue === 'ERROR: Div/0!') {
        return;
    }
    if (currentDisplayValue.length > 1) {
        currentDisplayValue = currentDisplayValue.slice(0, -1);
    } else {
        currentDisplayValue = '0';
    }
}

function handleKeyboardInput(e) {
    if (e.key >= '0' && e.key <= '9') {
        handleDigitClick(e.key);
    }
    else if (e.key === '.') {
        handleDigitClick(e.key);
    } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        handleOperatorClick(e.key);
    } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault(); 
        handleEqualsClick();
    } else if (e.key === 'Backspace') {
        handleBackspaceClick();
    } else if (e.key === 'Escape') {
        handleClearClick();
    } else if (e.key === '%') {
        handleOperatorClick(e.key);
    }
    updateDisplay();
}
window.addEventListener('keydown', handleKeyboardInput);

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

    const result = (function() {
        switch (op) {
            case '+': return add(num1, num2);
            case '-': return subtract(num1, num2);
            case '*': return multiply(num1, num2);
            case '/': return divide(num1, num2);
            default: return null;
        }
    })();

    if (result === "ERROR: Div/0!") {
        return result;
    }

    const roundedResult = parseFloat(result.toFixed(8));

    return roundedResult;
};