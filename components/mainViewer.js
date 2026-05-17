const dailyData = 'salesHistory';

// SAMPLE DATA (replace this with your localStorage data)
if (!localStorage.getItem(dailyData)) {
  const sample = [
    { value: 100, time: '2026-05-09T10:00:00' },
    { value: 200, time: '2026-05-09T12:00:00' },
    { value: 150, time: '2026-05-08T09:00:00' },
    { value: 300, time: '2026-05-08T14:00:00' },
  ];

  localStorage.setItem(dailyData, JSON.stringify(sample));
}

// LOAD DATA
let data = JSON.parse(localStorage.getItem(dailyData)) || [];

const dailyList = document.getElementById('dailyList');
const transactionList = document.getElementById('transactionList');

// GROUP BY DATE
function groupByDate() {
  const grouped = {};

  data.forEach((item) => {
    const date = new Date(item.time).toLocaleDateString('en-CA');

    if (!grouped[date]) {
      grouped[date] = [];
    }

    grouped[date].push(item);
  });

  return grouped;
}

// RENDER DAILY SUMMARY
function renderDaily() {
  const grouped = groupByDate();

  dailyList.innerHTML = '';

  Object.keys(grouped)
    .sort((a, b) => new Date(b) - new Date(a))
    .forEach((date) => {
      const total = grouped[date].reduce(
        (sum, item) => sum + Number(item.value),
        0,
      );

      const div = document.createElement('div');
      div.className = 'day-item';

      div.innerHTML = `
        <div class="transDate">${formatDate(date)}</div>
        <div class="amountTotal">PHP ${total.toFixed(2)}</div>
      `;

      // CLICK TO SHOW DETAILS
      div.addEventListener('click', () => {
        showTransactions(date, grouped[date]);
      });

      dailyList.appendChild(div);
    });
}

// SHOW TRANSACTIONS PER DAY
function showTransactions(date, transactions) {
  transactionList.classList.remove('hidden');

  transactionList.innerHTML = `
    <h4>${formatDate(date)}</h4>
    ${transactions
      .map(
        (t) => `
        <div class="transaction">
          PHP ${Number(t.value).toFixed(2)} - ${new Date(
            t.time,
          ).toLocaleTimeString()}
        </div>
      `,
      )
      .join('')}
  `;
}

// FORMAT DATE
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

// INIT
renderDaily();
