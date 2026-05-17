// Down Here for 2nd function of the js
const mainDisplay = document.getElementById('mainDisplay');
const savedDisplay = document.getElementById('savedDisplay');
let savedValues = JSON.parse(localStorage.getItem('salesHistory')) || [];
let inputHistory = [];
const totalDisplay = document.getElementById('totalDisplay');
const totalHistory = 'salesHistory';

//Up Here for 2nd function of script.js

function appendToMain(value) {
  // display.value += value;
  mainDisplay.value += value;
}

function clearMain() {
  // display.value = '';
  mainDisplay.value = '';
}

function deleteLast() {
  // display.value = display.value.slice(0, -1);
  // for 2nd function
  mainDisplay.value = mainDisplay.value.slice(0, -1);
}

function addNumber(num) {
  let currentValue = parseInt(mainDisplay.value) || 0;
  inputHistory.push(num);
  //   mainDisplay.value = currentValue + num;
  let newValue = currentValue + num;
  mainDisplay.value = newValue.toFixed(2);
}

function clearDisplay() {
  mainDisplay.value = (0).toFixed(2);
}

function subtractLast() {
  let currentValue = parseInt(mainDisplay.value) || '';
  if (currentValue > 0) {
    mainDisplay.value = currentValue - 1;
  }
}

function removeLast() {
  if (inputHistory.length === 0) return;

  let lastAdded = inputHistory.pop();
  let currentValue = parseFloat(mainDisplay.value) || '';
  let newValue = currentValue - lastAdded;
  mainDisplay.value = newValue.toFixed(2);
}

function calculate() {
  if (mainDisplay.value === '') return;

  try {
    let expression = mainDisplay.value.replace(/x/g, '*').replace(/÷/g, '/');
    mainDisplay.value = eval(expression);
  } catch (error) {
    mainDisplay.value = 'error';
  }
}
function formatDisplay(num) {
  return (
    'PHP ' +
    num.toLocaleString('en-PH', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}
// ------- --------  Display -----------
function updateTotal() {
  // Get Data
  const totalData = JSON.parse(localStorage.getItem(totalHistory)) || [];
  // Get Total
  let total = 0;

  totalData.forEach((item) => {
    total += parseFloat(item.value) || 0;
  });

  totalDisplay.textContent = `PHP ${total.toLocaleString('en-PH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

updateTotal();
// For 2nd function bellow here

function formatTime(date) {
  // Format: MM/DD/YYYY HH:MM:SS AM/PM
  return date.toLocaleString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });
}

function saveValue() {
  if (mainDisplay.value === '' || mainDisplay.value === 'Error') return;
  // For Timestamp
  const now = new Date();
  const timestamp = formatTime(now);

  // 1. Save at the Array
  savedValues.push({ value: mainDisplay.value, time: timestamp });

  localStorage.setItem('salesHistory', JSON.stringify(savedValues));

  // Render sa savedDisplay
  renderSavedList();

  updateTotal();

  //2. display save value one line every saved.
  // savedDisplay.value = savedValues.join('\n');

  // 3. Auto scroll going down
  savedDisplay.scrollTop = savedDisplay.scrollHeight;
  // 4. Clear main after save
  mainDisplay.value = '';
}

function renderSavedList() {
  savedDisplay.innerHTML = savedValues
    .map(
      (item) => `
        <div class="save-holder">
        <span class="saved-value">${item.value}</span>
        <span class="saved-time">${item.time}</span>
        </div>
        
        `,
    )
    .join('');
}
//  add this in darasa
window.addEventListener('DOMContentLoaded', () => {
  renderSavedList();
});

function clearSaved() {
  savedValues = [];
  localStorage.removeItem('salesHistory');
  savedDisplay.innerHTML = '';
  // savedDisplay.value = '';
  updateTotal();
}

savedDisplay.addEventListener('click', function (e) {
  if (e.target.closest('.saved-holder')) {
    const index = Array.from(savedDisplay.children).indexOf(
      e.target.closest('.saved-holder'),
    );
    mainDisplay.value = savedValues[index].value;
  }
});

// ----- Time and Date --------
function updateClock() {
  const now = new Date();

  // time with AM/PM
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours ? hours : 12; // 0 =12
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  const timeString = hours + ':' + minutes + ':' + seconds + ':' + ampm;
  document.getElementById('time').textContent = timeString;

  // Date MM/DD/YYYY format

  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const year = now.getFullYear();

  const dateString = month + '/' + day + '/' + year;
  document.getElementById('date').textContent = dateString;
}

updateClock();
setInterval(updateClock, 1000);
