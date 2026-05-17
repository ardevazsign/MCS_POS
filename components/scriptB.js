// ---- Switch Function ----
let activeInput = 'monitorInput';

const monitorInput = document.getElementById('monitorInput');
const calculatorInput = document.getElementById('calculatorInput');
const switchBtn = document.getElementById('switchBtn');

updateActiveStyle();

function switchInput() {
    if (activeInput === 'monitorInput') {
        activeInput = 'calculatorInput';
        switchBtn.textContent = 'Mon';
  } else {
    activeInput = 'monitorInput'
    switchBtn.textContent = 'Cal';
  }
  updateActiveStyle();
}

function updateActiveStyle() {
    monitorInput.classList.remove('active');
    calculatorInput.classList.remove('active');
    document.getElementById(activeInput).classList.add('active');
}

function typeNumber(num) {
    document.getElementById(activeInput).value += num;
}

function clearActive() {
    document.getElementById(activeInput).value ="";
}

function deleteToLeft() {
    const current = document.getElementById(activeInput);
    current.value = current.value.slice(0, -1);
}

function calculateCalculator() {
     const current = document.getElementById(activeInput);
    if(current.value === '') return;
    
    try{
        let expression = current.value.replace(/x/g, '*').replace(/÷/g, '/');
      current.value = eval(expression);
    } catch (error) {
        current.value = 'error';
    }
}

//  to click on the input to switch

monitorInput.addEventListener('click',  () => {
    activeInput = 'monitorInput';
    switchBtn.textContent = 'Cal';
    updateActiveStyle();
});

calculatorInput.addEventListener('click', () => {
    activeInput = 'calculatorInput';
    switchBtn.textContent = 'Mon';
    updateActiveStyle();
});







