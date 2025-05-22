let currentDisplayValue = '0';
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

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

    if (firstOperand === null) {
        firstOperand = inputValue;
    }
    else if (waitingForSecondOperand) {
        operator = nextOperator;
        historyDisplay.textContent = `${firstOperand} ${operator}`;
        updateDisplay();
        removeOperatorActiveClass();
        buttons.forEach(button => {
            if (button.classList.contains('operator') && button.textContent === nextOperator) {
                button.classList.add('active');
            }
        });
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
            removeOperatorActiveClass();
            return;
        }

        currentDisplayValue = String(result);
        firstOperand = result;
    }

    operator = nextOperator;
    waitingForSecondOperand = true;
    historyDisplay.textContent = `${firstOperand} ${operator}`;
    updateDisplay();

    removeOperatorActiveClass();
    buttons.forEach(button => {
        if (button.classList.contains('operator') && button.textContent === nextOperator) {
            button.classList.add('active');
        }
    });
}

function handleEqualsClick() {
    if (firstOperand === null || operator === null || waitingForSecondOperand) {
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
        removeOperatorActiveClass();
        return;
    }

    currentDisplayValue = String(result);
    historyDisplay.textContent = `${firstOperand} ${operator} ${secondOperand} =`;

    firstOperand = result;
    operator = null;
    waitingForSecondOperand = true;

    removeOperatorActiveClass();
}

function handleClearClick() {
    currentDisplayValue = '0';
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
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

    if (firstOperand !== null && operator !== null && !waitingForSecondOperand) {
        let percentageValue = firstOperand * (num / 100);
        if (operator === '+' || operator === '-') {
            currentDisplayValue = String(percentageValue);
        } else if (operator === '*' || operator === '/') {
            currentDisplayValue = String(num / 100);
        }
    } else {
        currentDisplayValue = String(num / 100);
    }
    waitingForSecondOperand = true;
    historyDisplay.textContent = '';
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