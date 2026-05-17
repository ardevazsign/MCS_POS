const list = document.getElementById('historyList');
const totalAmount = document.getElementById('totalAmount');

// LOAD TODAY ONLY
function renderList() {
  const history = JSON.parse(localStorage.getItem('salesHistory')) || [];

  const today = new Date().toLocaleDateString('en-CA');

  // FILTER TODAY ONLY
  const todayData = history.filter((item) => {
    const itemDate = new Date(item.time).toLocaleDateString('en-CA');

    return itemDate === today;
  });

  // IF EMPTY
  if (todayData.length === 0) {
    list.innerHTML = `
            <div class="empty">
                No transaction today <br>
                <small>Business is starting a new day</small>
            </div>
        `;

    totalAmount.textContent = 'PHP 0.00';

    return;
  }

  let total = 0;

  list.innerHTML = todayData
    .map((item, idx) => {
      const amount = parseFloat(item.value) || 0;
      total += amount;

      return `
            <div class="itemHolder">

                <div class="value">
                    PHP ${parseFloat(item.value).toFixed(2)}
                </div>

                <div class="timeHistory">
                    ${item.time}
                </div>

                <button class="deleteBtn" onclick="deleteItem(${idx})">
                    Delete
                </button>

            </div>
        `;
    })
    .join('');

  totalAmount.textContent = `PHP ${total.toLocaleString('en-PH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

// DELETE ITEM
function deleteItem(index) {
  const history = JSON.parse(localStorage.getItem('salesHistory')) || [];

  const today = new Date().toLocaleDateString('en-CA');

  const todayData = history.filter((item) => {
    const itemDate = new Date(item.time).toLocaleDateString('en-CA');

    return itemDate === today;
  });

  const itemToDelete = todayData[index];

  const updated = history.filter((item) => item !== itemToDelete);

  localStorage.setItem('salesHistory', JSON.stringify(updated));

  renderList();
}

// AUTO LOAD
renderList();
