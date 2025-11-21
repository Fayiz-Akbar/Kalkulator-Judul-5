// --- Variabel State ---
let currentOperand = '0';
let previousOperand = '';
let operation = undefined;
let memory = 0;
let historyLog = [];

// --- Elemen DOM ---
const currentOperandTextElement = document.getElementById('current-operand');
const previousOperandTextElement = document.getElementById('previous-operand');
const historyListElement = document.getElementById('history-list');

// --- Fungsi Logika Utama ---

// Menambahkan angka ke layar
function appendNumber(number) {
    if (number === '.' && currentOperand.includes('.')) return;
    if (currentOperand === '0' && number !== '.') {
        currentOperand = number.toString();
    } else {
        currentOperand = currentOperand.toString() + number.toString();
    }
    updateDisplay();
}

// Memilih operator (+, -, x, /)
function chooseOperation(op) {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        compute();
    }
    operation = op;
    previousOperand = currentOperand;
    currentOperand = '';
    updateDisplay();
}

// Melakukan Perhitungan
function compute() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '×':
            computation = prev * current;
            break;
        case '÷':
            if (current === 0) {
                alert("Error: Tidak bisa membagi dengan nol!");
                clearAll();
                return;
            }
            computation = prev / current;
            break;
        default:
            return;
    }

    // Simpan ke History sebelum reset state
    addToHistory(`${prev} ${operation} ${current}`, computation);

    currentOperand = computation;
    operation = undefined;
    previousOperand = '';
    updateDisplay();
}

// Update tampilan layar
function updateDisplay() {
    currentOperandTextElement.innerText = getDisplayNumber(currentOperand);
    if (operation != null) {
        previousOperandTextElement.innerText = 
            `${getDisplayNumber(previousOperand)} ${operation}`;
    } else {
        previousOperandTextElement.innerText = '';
    }
}

// Format angka (memberikan koma untuk ribuan)
function getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;
    
    if (isNaN(integerDigits)) {
        integerDisplay = '';
    } else {
        integerDisplay = integerDigits.toLocaleString('id-ID', { maximumFractionDigits: 0 });
    }
    
    if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`;
    } else {
        return integerDisplay;
    }
}

// --- Fungsi Clear & Delete ---

function clearAll() {
    currentOperand = '0';
    previousOperand = '';
    operation = undefined;
    updateDisplay();
}

function clearEntry() {
    currentOperand = '0';
    updateDisplay();
}

// --- Fungsi Memory (Advanced) ---

function memoryPlus() {
    memory += parseFloat(currentOperand) || 0;
    alert(`Memory: ${memory} (Added)`);
}

function memoryMinus() {
    memory -= parseFloat(currentOperand) || 0;
    alert(`Memory: ${memory} (Subtracted)`);
}

function memoryRecall() {
    currentOperand = memory.toString();
    updateDisplay();
}

function memoryClear() {
    memory = 0;
    alert("Memory Cleared");
}

// --- Fungsi History (Advanced) ---

function addToHistory(expression, result) {
    const historyItem = { expression, result };
    historyLog.unshift(historyItem); // Tambah ke awal array
    
    if (historyLog.length > 5) {
        historyLog.pop(); // Hapus item terlama jika lebih dari 5
    }
    renderHistory();
}

function renderHistory() {
    historyListElement.innerHTML = '';
    historyLog.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `${item.expression} = <span>${getDisplayNumber(item.result)}</span>`;
        historyListElement.appendChild(li);
    });
}

function clearHistory() {
    historyLog = [];
    renderHistory();
}

// --- Keyboard Support ---

document.addEventListener('keydown', (event) => {
    if ((event.key >= 0 && event.key <= 9) || event.key === '.') {
        appendNumber(event.key);
    }
    if (event.key === 'Enter' || event.key === '=') {
        event.preventDefault(); // Mencegah submit form jika ada
        compute();
    }
    if (event.key === 'Backspace') {
        // Simulasi delete karakter terakhir (opsional, saat ini CE membersihkan entry)
        currentOperand = currentOperand.toString().slice(0, -1);
        if(currentOperand === '') currentOperand = '0';
        updateDisplay();
    }
    if (event.key === 'Escape') {
        clearAll();
    }
    if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
        let keyOp = event.key;
        if (keyOp === '/') keyOp = '÷';
        if (keyOp === '*') keyOp = '×';
        chooseOperation(keyOp);
    }
});