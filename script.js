let expression = ''; 
let memory = 0;
let historyLog = [];
let shouldResetScreen = false;

const currentOperandTextElement = document.getElementById('current-operand');
const previousOperandTextElement = document.getElementById('previous-operand');
const historyListElement = document.getElementById('history-list');

const isOperator = (char) => ['+', '-', '×', '÷'].includes(char);

function appendNumber(number) {
    if (shouldResetScreen) {
        expression = '';
        shouldResetScreen = false;
    }

    const tokens = expression.split(/[\+\-\×\÷]/); 
    const currentNum = tokens[tokens.length - 1];

    if (number === '0' && currentNum === '0') return;
    if (number === '.' && currentNum.includes('.')) return;

    if (currentNum === '0' && number !== '.') {
        expression = expression.slice(0, -1) + number;
    } else {
        expression += number;
    }
    
    updateDisplay();
}

function chooseOperation(op) {
    shouldResetScreen = false;
    if (expression === '') return;

    const lastChar = expression.slice(-1);
    
    if (isOperator(lastChar)) {
        expression = expression.slice(0, -1) + op;
    } else {
        expression += op;
    }
    updateDisplay();
}

function compute() {
    if (expression === '' || isOperator(expression.slice(-1))) return;

    if (expression.includes('÷0')) {
        alert("Tidak bisa membagi dengan nol!");
        expression = '';
        updateDisplay();
        return;
    }

    try {
        const jsExpression = expression.replace(/×/g, '*').replace(/÷/g, '/');
        const result = new Function('return ' + jsExpression)();
        
        const formattedResult = Math.round(result * 100000000) / 100000000;

        addToHistory(expression, formattedResult);
        
        expression = formattedResult.toString();
        shouldResetScreen = true;
        updateDisplay();
        previousOperandTextElement.innerText = '';
    } catch (error) {
        expression = 'Error';
    }
}

function updateDisplay() {
    currentOperandTextElement.innerText = expression || '0';
}

function clearAll() {
    expression = '';
    shouldResetScreen = false;
    updateDisplay();
}

function clearEntry() {
    if (shouldResetScreen) {
        clearAll();
        return;
    }
    expression = expression.toString().slice(0, -1);
    updateDisplay();
}

function memoryPlus() {
    try {
        const tempExp = expression.replace(/×/g, '*').replace(/÷/g, '/');
        const val = new Function('return ' + tempExp)();
        if (!isNaN(val)) {
            memory += val;
            shouldResetScreen = true;
            alert(`Memory Ditambah. Total Memory: ${memory}`);
        }
    } catch(e) {}
}

function memoryMinus() {
    try {
        const tempExp = expression.replace(/×/g, '*').replace(/÷/g, '/');
        const val = new Function('return ' + tempExp)();
        if (!isNaN(val)) {
            memory -= val;
            shouldResetScreen = true;
            alert(`Memory Dikurang. Total Memory: ${memory}`);
        }
    } catch(e) {}
}

function memoryRecall() {
    const lastChar = expression.slice(-1);
    if (expression === '' || isOperator(lastChar)) {
        expression += memory.toString();
    } else if (shouldResetScreen) {
        expression = memory.toString();
        shouldResetScreen = false;
    } else {
        const tokens = expression.split(/[\+\-\×\÷]/);
        const currentNumLen = tokens[tokens.length - 1].length;
        
        expression = expression.slice(0, -currentNumLen) + memory.toString();
    }
    updateDisplay();
}

function memoryClear() {
    memory = 0;
    alert("Memory Direset (0)");
}

function addToHistory(exp, res) {
    historyLog.unshift({ expression: exp, result: res });
    if (historyLog.length > 5) historyLog.pop();
    renderHistory();
}

function renderHistory() {
    historyListElement.innerHTML = '';
    historyLog.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `${item.expression} = <span>${item.result}</span>`;
        historyListElement.appendChild(li);
    });
}

function clearHistory() {
    historyLog = [];
    renderHistory();
}

document.addEventListener('keydown', (event) => {
    const key = event.key;
    if ((key >= 0 && key <= 9) || key === '.') appendNumber(key);
    if (key === 'Enter' || key === '=') { event.preventDefault(); compute(); }
    if (key === 'Backspace') clearEntry();
    if (key === 'Escape') clearAll();
    if (['+', '-', '*', '/'].includes(key)) {
        let op = key === '/' ? '÷' : (key === '*' ? '×' : key);
        chooseOperation(op);
    }
});