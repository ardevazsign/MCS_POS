const dailyData = 'salesHistory';

function renderDailyTotals() {
  const dailyList = document.getElementById('dailyList');
  const grandTotalE1 = document.getElementById('grandTotal');
  const data = JSON.parse(localStorage.getItem(dailyData)) || [];

  if (data.length === 0) {
    dailyList.innerHTML =
      '<div style = "color:#666; text-align:center;">No Daily Sales Data</div>';
    grandTotalE1.textContent = 'PHP 0.00';
    return;
  }

  const dailyTotals = {};

  data.forEach((item) => {
    // const dateOnly = new Date(item.time).toLocaleString('en-US');
    const dateOnly = new Date(item.time).toLocaleDateString('en-CA');
    const amount = parseFloat(item.value) || 0;

    if (!dailyTotals[dateOnly]) {
      dailyTotals[dateOnly] = { total: 0, count: 0 };
    }

    dailyTotals[dateOnly].total += amount;
    dailyTotals[dateOnly].count += 1;
  });

  const sortedDates = Object.keys(dailyTotals).sort(
    (a, b) => new Date(b) - new Date(a),
  );

  let grandTotal = 0;

  dailyList.innerHTML = sortedDates
    .map((date) => {
      const dayData = dailyTotals[date];
      grandTotal += dayData.total;

      return `
            <div class="day-item">
               <div class="dayItemHolder">
                  <div class="date" >${formatDate(date)}</div>
                  <div class="count" > ${dayData.count} transaction${dayData.count !== 1 ? 's' : ''}</div>
               </div>
                  <div class="amount">PHP ${dayData.total.toLocaleString('en-PH', { minimumFractionDigits: 2 })} </div>
            </div>
        `;
    })
    .join('');

  grandTotalE1.textContent = `PHP ${grandTotal.toLocaleString('en-PH', { minimumFractionDigits: 2 })}`;
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  const options = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  return date.toLocaleDateString('en-US', options);
}

renderDailyTotals();

window.addEventListener('storage', (e) => {
  if (e.key === dailyData) renderDailyTotals();
});
