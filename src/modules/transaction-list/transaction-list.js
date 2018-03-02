require('./_transaction-list.theme.scss');
require('./transaction-list.scss');

import $ from 'jquery';
import { copyJsonData, formatDollarAmount } from '../helpers';
import { getFilteredAccountNames, getFilteredCategories } from '../side-nav/side-nav';

const emptyTemplate = '<ul id="transactionsContainer" class="transactions-container"></ul>';
let fullTransactionList = [];
let fullAccountList = [];
let renderedTransactionList = [];

function setTransactionList(transactions) { fullTransactionList = copyJsonData(transactions); }

function setAccountList(accounts) { fullAccountList = copyJsonData(accounts); }

function createDateHeader(date) { return `<div class="date-header"><p>${date}</p></div>`; }

function reverseOrder() {
  renderedTransactionList = renderedTransactionList.reverse();
  renderTransactionList(renderedTransactionList);
}

function createTransactionRowTemplate(transaction, account) {
  return `<div class="transaction-card">
              <div class="transaction-info">
                <p class="account-name">${account.accountName}</p>
                <i>${transaction.description}</i>
              </div>
              <div class="transaction-values">
                <p class="transaction-amount">${formatDollarAmount(transaction.amount)}</p>
                <p class="account-running-balance">${formatDollarAmount(transaction.runningBalance)}</p>
              </div>
          </div>`;
}

export function createTransactionList() { $('body').append(emptyTemplate); }

export function initTransactionList(transactions, accounts) {
  setTransactionList(transactions);
  setAccountList(accounts);
  renderTransactionList(fullTransactionList);

  // todo: could we add everything to the dom, and then show/hide elements based on filters?
  document.getElementById('submitFiltersButton').addEventListener('click', () => {
    let filteredAccountNames = getFilteredAccountNames();
    let filteredCategories = getFilteredCategories();

    if (filteredAccountNames.length === 0 && filteredCategories.length === 0) {
      renderTransactionList(fullTransactionList);
    } else {
      let filteredTransactionList = copyJsonData(fullTransactionList);
      if (filteredAccountNames.length !== 0) {
        const filteredAccountList = fullAccountList.filter(account => filteredAccountNames.includes(account.accountName));
        filteredTransactionList = filteredTransactionList.filter(transaction => {
          return filteredAccountList.find(account => account.accountId === transaction.accountId);
        });
      }

      if (filteredCategories.length !== 0) {
        filteredTransactionList = filteredTransactionList.filter(transaction => filteredCategories.includes(transaction.category));
      }

      renderTransactionList(filteredTransactionList);
    }
  });
  document.getElementById('resetFiltersButton').addEventListener('click', () => renderTransactionList(fullTransactionList));
  document.getElementById('dateSortButton').addEventListener('click', () => reverseOrder());
}

export function renderTransactionList(transactions) {
  const transactionListContainer = $('#transactionsContainer');

  if (transactionListContainer.children().length !== 0) {
    transactionListContainer.empty();
  }

  if (transactions.length !== 0) {
    transactions.forEach((transaction, i) => {
      if (i === 0 || transaction.transactionDate !== transactions[i-1].transactionDate) {
        transactionListContainer.append(createDateHeader(transaction.transactionDate))
      }
      const accountName = fullAccountList.filter(account => account.accountId === transaction.accountId)[0];
      transactionListContainer.append(createTransactionRowTemplate(transaction, accountName));
    });
  } else {
    transactionListContainer.append('<p class="no-transactions"><i>No transactions available that match the specified filters.</i></p>')
  }

  renderedTransactionList = copyJsonData(transactions);
}

