let currentDisplayValue = '0';
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

const mainDisplay = document.querySelector('.main-display');
const historyDisplay = document.querySelector('.history-display');
const buttons = document.querySelector('.button');

mainDisplay.textContent = currentDisplayValue;
historyDisplay.textContent = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        console.log(`Button clicked: ${button.textContent}`);
    });
});
