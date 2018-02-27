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
  transactionList.forEach(t => {
    transactionListContainer.append(createTransactionRowTemplate(t));
  });
}

function createTransactionRowTemplate(transaction) {
  const accountName = fetchedData.accounts.filter(a => a.accountId === transaction.accountId)[0].accountName;
  const card = `<div style="width: 100%; margin-bottom: 2px; padding: 8px; background-color: white;">
                    <p style="margin: 0;">${accountName}</p>
                </div>`;

  return card;
}

init();
