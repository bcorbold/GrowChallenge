require('./transaction-list.scss');

import $ from 'jquery';

const emptyTemplate = '<ul id="transactionsContainer" class="transactions-container"></ul>';
let storedTransactionList = []; // todo: can store it here for re-ordering
let storedAccountList = [];

export function createTransactionList() {
  $('body').append(emptyTemplate);
}

export function renderTransactionList(transactionList, accountList) {
  const transactionListContainer = $('#transactionsContainer');
  storedTransactionList = transactionList;
  storedAccountList = accountList;

  if (transactionListContainer.children().length !== 0) {
    transactionListContainer.empty();
  }

  transactionList.forEach((transaction, i) => {
    if (i === 0 || transaction.transactionDate !== transactionList[i-1].transactionDate) {
      transactionListContainer.append(createDateHeader(transaction.transactionDate))
    }
    const accountName = accountList.filter(account => account.accountId === transaction.accountId)[0];
    transactionListContainer.append(createTransactionRowTemplate(transaction, accountName));
  });
}

export function reverseOrder() {
  storedTransactionList = storedTransactionList.reverse();
  renderTransactionList(storedTransactionList, storedAccountList);
}

function createDateHeader(date) {
  return `<div class="date-header"><p>${date}</p></div>`;
}

// todo: for negative transactions "-" should come before "$", need a better number formatter
function createTransactionRowTemplate(transaction, account) {
  return `<div class="transaction-card">
              <div class="transaction-info">
                <p class="account-name">${account.accountName}</p>
                <i>${transaction.description}</i>
              </div>
              <div class="transaction-values">
                <p class="transaction-amount">$${transaction.amount.toFixed(2)}</p>
                <p class="account-running-balance">$${transaction.runningBalance.toFixed(2)}</p>
              </div>
          </div>`;
}

