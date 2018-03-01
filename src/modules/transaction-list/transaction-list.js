require('./transaction-list.scss');

import $ from 'jquery';

const emptyTemplate = '<ul id="transactionsContainer" class="transactions-container"></ul>';
let storedTransactionList = []; // todo: can store it here for re-ordering
let storedAccountList = [];

export function createTransactionList() {
  $('body').append(emptyTemplate);
}

// todo: this only creates, doesn't update
export function renderTransactionList(transactionList, accountList) {
  const transactionListContainer = $('#transactionsContainer');
  storedTransactionList = transactionList;
  storedAccountList = accountList;

  if (transactionListContainer.children().length !== 0) {
    // todo: remove child elements, redraw
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
  // todo: remove inline styles
  return `<div style="width: 100%; padding: 4px 16px; background-color: #F5F5F5; margin-top: 4px;">
            <p style="margin: 0;">${date}</p>
          </div>`;
}

// todo: for negative transactions "-" should come before "$", need a better number formatter
// todo: remove inline styles
function createTransactionRowTemplate(transaction, account) {
  return `<div style="width: 100%; margin-bottom: 2px; padding: 8px 16px; background-color: white; display: flex; flex-direction: row">
              <div style="flex-grow: 1; margin-right: 16px;">
                <p style="margin: 0; font-weight: 600;">${account.accountName}</p>
                <i style="margin: 0;">${transaction.description}</i>
              </div>
              <div style="text-align: right;">
                <p style="margin: 0; font-size: 20px;">$${transaction.amount.toFixed(2)}</p>
                <p style="margin: 0; font-size: 12px; font-weight: 300; color: #00695C">$${transaction.runningBalance.toFixed(2)}</p>
              </div>
          </div>`;
}

