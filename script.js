let currentDisplayValue = '0';
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;
let lastSecondOperand = null;
let lastOperatorUsed = null;
const mainDisplay = document.querySelector('.main-display');
const historyDisplay = document.querySelector('.history-display');
const buttons = document.querySelectorAll('.button');
const operatorButtons = document.querySelectorAll('.button.operator');
const decimalButton = document.querySelector('.button.decimal');

function updateDisplay() {
    if (currentDisplayValue.length > 12 && currentDisplayValue !== 'ERROR: Div/0!') {
        if (currentDisplayValue.includes('.')) {
            currentDisplayValue = parseFloat(currentDisplayValue).toFixed(8).toString();
            if (currentDisplayValue.length > 12) {
                currentDisplayValue = parseFloat(currentDisplayValue).toPrecision(5).toString();
            }
        } else {
            currentDisplayValue = parseFloat(currentDisplayValue).toPrecision(5).toString();
        }
    }
    mainDisplay.textContent = currentDisplayValue;

    if (currentDisplayValue.includes('.')) {
        decimalButton.disabled = true;
    } else {
        decimalButton.disabled = false;
    }
}

function removeOperatorActiveClass() {
    operatorButtons.forEach(btn => {
        btn.classList.remove('active');
    });
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
            handleOperatorClick(buttonText);
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
        else if (button.classList.contains('sign-change')) {
            handleSignChangeClick();
        }
        else if (button.classList.contains('percent')) {
            handlePercentClick();
        }

        updateDisplay();
    });
});

window.addEventListener('keydown', handleKeyboardInput);

function handleDigitClick(digit) {
    if (waitingForSecondOperand) {
        currentDisplayValue = digit;
        waitingForSecondOperand = false;
        historyDisplay.textContent = '';
        decimalButton.disabled = false;
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
    if (waitingForSecondOperand && firstOperand !== null && operator === null) {
        operator = nextOperator;
        historyDisplay.textContent = `${firstOperand} ${operator}`;
        removeOperatorActiveClass();
        buttons.forEach(button => {
            if (button.classList.contains('operator') && button.textContent === nextOperator) {
                button.classList.add('active');
            }
        });
        return;
    }

    if (firstOperand === null) {
        firstOperand = inputValue;
    } else if (operator) {
        const result = operate(operator, firstOperand, inputValue);

        if (result === "ERROR: Div/0!") {
            currentDisplayValue = result;
            firstOperand = null;
            operator = null;
            waitingForSecondOperand = false;
            historyDisplay.textContent = '';
            removeOperatorActiveClass();
            updateDisplay();
            return;
        }

        currentDisplayValue = String(result);
        firstOperand = result;
    }

    operator = nextOperator;
    lastOperatorUsed = nextOperator;
    waitingForSecondOperand = true;
    historyDisplay.textContent = `${firstOperand} ${operator}`;

    removeOperatorActiveClass();
    buttons.forEach(button => {
        if (button.classList.contains('operator') && button.textContent === nextOperator) {
            button.classList.add('active');
        }
    });
}


function handleEqualsClick() {
    if (firstOperand === null) {
        return;
    }

    let currentSecondOperand = Number(currentDisplayValue);
    let opToUse = operator;
    let operandToUse = currentSecondOperand;

    if (operator === null && waitingForSecondOperand) {
        if (lastOperatorUsed !== null && lastSecondOperand !== null) {
            opToUse = lastOperatorUsed;
            operandToUse = lastSecondOperand;
        } else {
            return;
        }
    }
    else if (waitingForSecondOperand) {
        operandToUse = firstOperand;
    }

    const result = operate(opToUse, firstOperand, operandToUse);

    if (result === "ERROR: Div/0!") {
        currentDisplayValue = result;
        firstOperand = null;
        operator = null;
        waitingForSecondOperand = false;
        lastOperatorUsed = null;
        lastSecondOperand = null;
        historyDisplay.textContent = '';
        removeOperatorActiveClass();
        updateDisplay();
        return;
    }

    currentDisplayValue = String(result);
    historyDisplay.textContent = `${firstOperand} ${opToUse} ${operandToUse} =`;

    firstOperand = result;
    lastSecondOperand = operandToUse;
    lastOperatorUsed = opToUse;
    operator = null;
    waitingForSecondOperand = true;

    removeOperatorActiveClass();
}

function handleClearClick() {
    currentDisplayValue = '0';
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
    lastSecondOperand = null;
    lastOperatorUsed = null;
    historyDisplay.textContent = '';
    removeOperatorActiveClass();
    decimalButton.disabled = false;
}

function handleBackspaceClick() {
    if (waitingForSecondOperand || currentDisplayValue === 'ERROR: Div/0!') {
        return;
    }

    if (currentDisplayValue.slice(-1) === '.') {
        decimalButton.disabled = false;
    }

    if (currentDisplayValue.length > 1) {
        currentDisplayValue = currentDisplayValue.slice(0, -1);
    } else {
        currentDisplayValue = '0';
        decimalButton.disabled = false;
    }
}

function handlePercentClick() {
    let num = Number(currentDisplayValue);

    if (firstOperand !== null && operator !== null) {
        let calculatedValue;
        let displayOperand;

        if (operator === '+' || operator === '-') {
            calculatedValue = firstOperand * (num / 100);
            displayOperand = calculatedValue;
        } else if (operator === '*' || operator === '/') {
            calculatedValue = num / 100;
            displayOperand = calculatedValue;
        } else {
            currentDisplayValue = String(num / 100);
            historyDisplay.textContent = `${num}% =`;
            firstOperand = Number(currentDisplayValue);
            operator = null;
            lastOperatorUsed = null;
            lastSecondOperand = null;
            waitingForSecondOperand = true;
            removeOperatorActiveClass();
            return;
        }

        const result = operate(operator, firstOperand, displayOperand);
        currentDisplayValue = String(result);
        historyDisplay.textContent = `${firstOperand} ${operator} ${num}% =`;
        firstOperand = result;
        lastSecondOperand = displayOperand;
        lastOperatorUsed = operator;
        operator = null;
    } else {
        currentDisplayValue = String(num / 100);
        historyDisplay.textContent = `${num}% =`;
        firstOperand = Number(currentDisplayValue);
        lastSecondOperand = null;
        lastOperatorUsed = null;
        operator = null;
    }
    waitingForSecondOperand = true;
    removeOperatorActiveClass();
}

function handleSignChangeClick() {
    if (currentDisplayValue === 'ERROR: Div/0!') {
        return;
    }
    currentDisplayValue = String(Number(currentDisplayValue) * -1);
}

function handleKeyboardInput(e) {
    if (e.key >= '0' && e.key <= '9') {
        handleDigitClick(e.key);
    }
    else if (e.key === '.') {
        handleDigitClick(e.key);
    }
    else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        handleOperatorClick(e.key);
    }
    else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        handleEqualsClick();
    }
    else if (e.key === 'Backspace') {
        handleBackspaceClick();
    }
    else if (e.key === 'Escape') {
        handleClearClick();
    }
    else if (e.key === '%') {
        handlePercentClick();
    }
    else if (e.key === '_') {
        handleSignChangeClick();
    }
    updateDisplay();
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

    if (Math.abs(roundedResult) > 999999999999 || (Math.abs(roundedResult) < 0.000000001 && roundedResult !== 0)) {
        return roundedResult.toExponential(5);
    }

    return roundedResult;
};