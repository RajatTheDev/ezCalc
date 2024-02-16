const display = document.querySelector(".display");
const buttons = document.querySelectorAll('button');
display.textContent = '';

let previousValue = 0;
let currentValue = 0;
let operator = '';
let result = 0;
let currentNumber;

buttons.forEach((button) => {
    if (button.classList.contains('number-btn')) {
        button.addEventListener('click', () => {
            if (display.textContent !== 'NaN') {
                numberButton(button);
            } else {
                display.textContent = '';
                numberButton(button);
            }
        });
    } else{
        button.addEventListener('click', () => {
            operatorButton(button);
        })
    }
});

function checkLength() {
    if (display.textContent.length > 14) {
        display.textContent = "Size exceeded!";
    }
};

function numberButton(button) {
    if (button.textContent === '%') {
        currentNumber = parseFloat(display.textContent);
        if (!isNaN(currentNumber)) {
            display.textContent = (currentNumber / 100).toFixed(4);
        }
    } else if (button.textContent === '.') {
        if (!display.textContent.includes('.')){
            display.textContent += button.textContent;
        }
    } else if (display.textContent === 'Size exceeded!') {
        display.textContent = '';
            display.textContent += button.textContent;
    } else if (display.textContent === '0') {
        display.textContent = parseFloat(display.textContent) + button.textContent;
    } else {
        display.textContent += button.textContent;
    }
    checkLength();
};

function operatorButton(button) {
    if (display.textContent.length > 0) {
        if (button.textContent === "AC") {
            display.textContent = '';
        } else if (button.textContent === 'DE') {
            display.textContent = display.textContent.slice(0, -1);
        } else if (button.textContent === 'x²') {
            display.textContent = parseFloat(display.textContent)**2;
            checkLength();
        } else if (button.textContent === '=') {
            currentValue = display.textContent;
            currentValue = parseFloat(currentValue);
            calculate(previousValue, currentValue, operator);
        } else {
            if (display.textContent !== '') {
                previousValue = display.textContent;
                previousValue = parseFloat(previousValue);
                display.textContent = '';
                operator = button.textContent;
            }
        }
    }
}

function calculate(previousValue, currentNumber, operator) {
    switch (operator) {
        case '+':
            result = previousValue + currentValue;
            break;
        case '-':
            result = previousValue - currentValue;
            break;
        case '×':
            result = previousValue * currentValue;
            break;
        case '÷':
            if (parseFloat(currentValue) === 0) {
                alert("Chill bro!");
            } else {
                result = (previousValue / currentValue).toFixed(4);
            }
            break;
    }
    display.textContent = result;
    operator = '';
    result = 0;
}