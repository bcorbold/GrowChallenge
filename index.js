import $ from 'jquery';

let fetchedData;

function init() {
  const headerHeight = $('.mobile-header').outerHeight();
  $('.transactions-container').css('height', `calc(100% - ${headerHeight}px`);
  fetchTransactions();
}

function fetchTransactions() {
  console.log('Fetch transactions');
  const transactionUrl = 'http://demo7235469.mockable.io/transactions';
  fetch(transactionUrl).then(response => response.json())
      .then(data => {
        fetchedData = data;
        renderTransactionList(data.transactionData.transactions);
      })
      .catch(error => console.error(error));
}

function renderTransactionList(transactionList) {
  const transactionListContainer = $('.transactions-container');

  transactionList.forEach((t, i) => {
    if (i === 0 || t.transactionDate !== transactionList[i-1].transactionDate) {
      transactionListContainer.append(createDateHeader(t.transactionDate))
    }
    const card = createTransactionRowTemplate(t);
    transactionListContainer.append(card);
  });
}

function createDateHeader(date) {
  return `<div style="width: 100%; padding: 4px 16px; background-color: #F5F5F5; margin-top: 4px;">
            <p style="margin: 0;">${date}</p>
          </div>`;
}

function createTransactionRowTemplate(transaction) {
  const accountName = fetchedData.accounts.filter(a => a.accountId === transaction.accountId)[0].accountName;
  const card = `<div style="width: 100%; margin-bottom: 2px; padding: 8px 16px; background-color: white; display: flex; flex-direction: row">
                    <div style="flex-grow: 1; margin-right: 16px;">
                      <p style="margin: 0; font-weight: 600;">${accountName}</p>
                      <i style="margin: 0;">${transaction.description}</i>
                    </div>
                    <div style="text-align: right;">
                      <p style="margin: 0; font-size: 20px;">$${transaction.amount.toFixed(2)}</p>
                      <p style="margin: 0; font-size: 12px; font-weight: 300; color: #00695C">$${transaction.runningBalance.toFixed(2)}</p>
                    </div>
                </div>`;

  return card;
}

// todo: could initially create templates for all transaction cards and then add/remove templates as needed
// todo: can this be done lazily? Only rendering down the list as they come into view?

init();
