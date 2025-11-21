// --- Variabel State ---
let expression = ''; 
let memory = 0;
let historyLog = [];
let shouldResetScreen = false; // Penanda jika user baru saja menekan tombol =

// --- Elemen DOM ---
const currentOperandTextElement = document.getElementById('current-operand');
const previousOperandTextElement = document.getElementById('previous-operand');
const historyListElement = document.getElementById('history-list');

// --- Helper: Cek apakah karakter adalah operator ---
const isOperator = (char) => ['+', '-', '×', '÷'].includes(char);

// --- Fungsi Logika Utama ---

function appendNumber(number) {
    // Jika baru selesai hitung (=), angka baru akan mereset layar
    if (shouldResetScreen) {
        expression = '';
        shouldResetScreen = false;
    }

    // Mencegah 0 di awal ganda (Contoh: input 0, lalu 0 lagi -> tetap 0)
    // Kita ambil angka terakhir dari ekspresi
    const tokens = expression.split(/[\+\-\×\÷]/); 
    const currentNum = tokens[tokens.length - 1];

    if (number === '0' && currentNum === '0') return; // Cegah "00"
    if (number === '.' && currentNum.includes('.')) return; // Cegah ".."

    // Jika angka saat ini hanya "0" dan user ketik angka lain (misal 5), ganti 0 jadi 5
    if (currentNum === '0' && number !== '.') {
        expression = expression.slice(0, -1) + number;
    } else {
        expression += number;
    }
    
    updateDisplay();
}

function chooseOperation(op) {
    shouldResetScreen = false; // Jangan reset jika user lanjut menghitung hasil sebelumnya
    if (expression === '') return;

    const lastChar = expression.slice(-1);
    
    // Jika karakter terakhir adalah operator, ganti dengan yang baru
    if (isOperator(lastChar)) {
        expression = expression.slice(0, -1) + op;
    } else {
        expression += op;
    }
    updateDisplay();
}

function compute() {
    if (expression === '' || isOperator(expression.slice(-1))) return;

    // Cek pembagian nol
    if (expression.includes('÷0')) {
        alert("Tidak bisa membagi dengan nol!");
        expression = '';
        updateDisplay();
        return;
    }

    try {
        const jsExpression = expression.replace(/×/g, '*').replace(/÷/g, '/');
        // Evaluasi matematika
        const result = new Function('return ' + jsExpression)();
        
        // Pembulatan desimal maks 8 digit agar rapi
        const formattedResult = Math.round(result * 100000000) / 100000000;

        addToHistory(expression, formattedResult);
        
        expression = formattedResult.toString();
        shouldResetScreen = true; // Set flag agar input angka berikutnya mereset layar
        updateDisplay();
        previousOperandTextElement.innerText = '';
    } catch (error) {
        expression = 'Error';
    }
}

function updateDisplay() {
    currentOperandTextElement.innerText = expression || '0';
}

// --- Fungsi Clear ---

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

// --- Fungsi Memory (Fixed) ---

function memoryPlus() {
    // Hitung nilai di layar saat ini dulu sebelum dimasukkan ke memori
    try {
        const tempExp = expression.replace(/×/g, '*').replace(/÷/g, '/');
        const val = new Function('return ' + tempExp)();
        if (!isNaN(val)) {
            memory += val;
            shouldResetScreen = true; // Agar user bisa langsung input angka baru
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
    // Logika Pintar: 
    // 1. Jika layar kosong, masukkan memory.
    // 2. Jika karakter terakhir adalah operator (+, -, x), masukkan memory.
    // 3. Jika karakter terakhir adalah angka, hapus angka itu (replace) atau abaikan?
    //    Solusi User: User ingin MR menampilkan angka memory murni.
    
    const lastChar = expression.slice(-1);
    if (expression === '' || isOperator(lastChar)) {
        expression += memory.toString();
    } else if (shouldResetScreen) {
        expression = memory.toString();
        shouldResetScreen = false;
    } else {
        // Jika user menekan MR saat ada angka (misal "70"), kita asumsikan dikali? 
        // Atau untuk keamanan, kita replace angka terakhir dengan nilai memory
        // Agar tidak terjadi "700" (70+0)
        
        // Cari batas angka terakhir
        const tokens = expression.split(/[\+\-\×\÷]/);
        const currentNumLen = tokens[tokens.length - 1].length;
        
        // Hapus angka yang sedang diketik, ganti dengan memory
        expression = expression.slice(0, -currentNumLen) + memory.toString();
    }
    updateDisplay();
}

function memoryClear() {
    memory = 0;
    alert("Memory Direset (0)");
}

// --- History ---

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

// --- Keyboard ---
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