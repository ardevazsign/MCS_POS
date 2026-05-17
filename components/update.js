let sales = JSON.parse(localStorage.getItem('sales')) || [];

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

let funds = JSON.parse(localStorage.getItem('funds')) || [];

// SAVE DATA
function saveData() {
  localStorage.setItem('sales', JSON.stringify(sales));

  localStorage.setItem('expenses', JSON.stringify(expenses));

  localStorage.setItem('funds', JSON.stringify(funds));
}

// FORMAT MONEY
function formatMoney(amount) {
  return `₱${Number(amount).toLocaleString('en-PH', {
    minimumFractionDigits: 2,
  })}`;
}

// UPDATE SUMMARY
function updateSummary() {
  const totalSales = sales.reduce((sum, item) => sum + item.amount, 0);

  const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);

  const totalFunds = funds.reduce((sum, item) => sum + item.amount, 0);

  const availableCash = totalSales + totalFunds - totalExpenses;

  document.getElementById('salesDisplay').textContent = formatMoney(totalSales);

  document.getElementById('expenseDisplay').textContent =
    formatMoney(totalExpenses);

  document.getElementById('fundDisplay').textContent = formatMoney(totalFunds);

  document.getElementById('cashDisplay').textContent =
    formatMoney(availableCash);
}

// ADD SALES
function addSales() {
  const description = document.getElementById('salesDescription').value;

  const amount = parseFloat(document.getElementById('salesAmount').value);

  if (!description || !amount) {
    alert('Please complete sales fields');
    return;
  }

  sales.push({
    description,
    amount,
    date: new Date().toLocaleString(),
  });

  saveData();
  updateSummary();
  renderSales();

  document.getElementById('salesDescription').value = '';
  document.getElementById('salesAmount').value = '';
}

// ADD EXPENSE
function addExpense() {
  const reason = document.getElementById('expenseReason').value;

  const amount = parseFloat(document.getElementById('expenseAmount').value);

  if (!reason || !amount) {
    alert('Please complete expense fields');
    return;
  }

  expenses.push({
    reason,
    amount,
    date: new Date().toLocaleString(),
  });

  saveData();
  updateSummary();
  renderExpenses();

  document.getElementById('expenseReason').value = '';
  document.getElementById('expenseAmount').value = '';
}

// ADD FUND
function addFund() {
  const source = document.getElementById('fundSource').value;

  const amount = parseFloat(document.getElementById('fundAmount').value);

  if (!source || !amount) {
    alert('Please complete fund fields');
    return;
  }

  funds.push({
    source,
    amount,
    date: new Date().toLocaleString(),
  });

  saveData();
  updateSummary();
  renderFunds();

  document.getElementById('fundSource').value = '';
  document.getElementById('fundAmount').value = '';
}

// DELETE SALES
function deleteSale(index) {
  sales.splice(index, 1);

  saveData();
  updateSummary();
  renderSales();
}

// DELETE EXPENSE
function deleteExpense(index) {
  expenses.splice(index, 1);

  saveData();
  updateSummary();
  renderExpenses();
}

// DELETE FUND
function deleteFund(index) {
  funds.splice(index, 1);

  saveData();
  updateSummary();
  renderFunds();
}

// RENDER SALES
function renderSales() {
  const salesList = document.getElementById('salesList');

  salesList.innerHTML = '';

  const reverseSales = [...sales].reverse();

  reverseSales.forEach((item, index) => {
    const originalIndex = sales.length - 1 - index;

    salesList.innerHTML += `
      <div class="record">

        <h3 class="salesText">
          Sales Added
        </h3>

        <p>
          <strong>Description:</strong>
          ${item.description}
        </p>

        <p>
          <strong>Amount:</strong>
          ${formatMoney(item.amount)}
        </p>

        <p>
          <strong>Date:</strong>
          ${item.date}
        </p>

        <button onclick="deleteSale(${originalIndex})">
          Delete
        </button>

      </div>
    `;
  });
}

// RENDER EXPENSES
function renderExpenses() {
  const expenseList = document.getElementById('expenseList');

  expenseList.innerHTML = '';

  const reverseExpenses = [...expenses].reverse();

  reverseExpenses.forEach((item, index) => {
    const originalIndex = expenses.length - 1 - index;

    expenseList.innerHTML += `
      <div class="record">

        <h3 class="expenseText">
          Expense Deducted
        </h3>

        <p>
          <strong>Reason:</strong>
          ${item.reason}
        </p>

        <p>
          <strong>Amount:</strong>
          ${formatMoney(item.amount)}
        </p>

        <p>
          <strong>Date:</strong>
          ${item.date}
        </p>

        <button onclick="deleteExpense(${originalIndex})">
          Delete
        </button>

      </div>
    `;
  });
}

// RENDER FUNDS
function renderFunds() {
  const fundList = document.getElementById('fundList');

  fundList.innerHTML = '';

  const reverseFunds = [...funds].reverse();

  reverseFunds.forEach((item, index) => {
    const originalIndex = funds.length - 1 - index;

    fundList.innerHTML += `
      <div class="record">

        <h3 class="fundText">
          Additional Fund Added
        </h3>

        <p>
          <strong>Source:</strong>
          ${item.source}
        </p>

        <p>
          <strong>Amount:</strong>
          ${formatMoney(item.amount)}
        </p>

        <p>
          <strong>Date:</strong>
          ${item.date}
        </p>

        <button class="button2" onclick="deleteFund(${originalIndex})">
          Delete
        </button>

      </div>
    `;
  });
}

// INITIAL LOAD
updateSummary();
renderSales();
renderExpenses();
renderFunds();
