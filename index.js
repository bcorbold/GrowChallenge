import $ from 'jquery';

let fetchedData;

function createTransactionRowTemplate(transaction) {
  return `<p style="width: 100%; min-height: 1em;">${transaction.transactionId}</p>`
}

function renderTransactionList(transaction) {
  const transactionListContainer = $('.transactions-container');
  transaction.forEach(t => {
    transactionListContainer.append(createTransactionRowTemplate(t));
  });
}

function fetchTransactions() {
  console.log('Fetch transactions');
  const transactionUrl = 'http://demo7235469.mockable.io/transactions';
  fetch(transactionUrl).then(response => response.json())
      .then(data => {
        fetchedData = data;
        renderTransactionList(data.transactionData.transactions);
        console.log(fetchedData);
      })
      .catch(error => console.error(error));
}

function init() {
  const headerHeight = $('.mobile-header').outerHeight();
  $('.transactions-container').css('height', `calc(100% - ${headerHeight}px`);
  fetchTransactions();
}

init();