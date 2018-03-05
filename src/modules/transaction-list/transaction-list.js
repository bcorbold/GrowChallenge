require('./_transaction-list.theme.scss');
require('./transaction-list.scss');

import $ from 'jquery';
import { copyJsonData, formatDollarAmount } from '../helpers';
import { getFilteredAccountNames, getFilteredCategories, getFromDate, getToDate } from '../side-nav/side-nav';

const transactionContainerTemplate = '<ul id="transactionsContainer" class="transactions-container"></ul>';
let fullTransactionList = [];
let fullAccountList = [];
let renderedTransactionList = [];

export function renderTransactionListContainer() { $('body').append(transactionContainerTemplate); }

export function initTransactionList(transactions, accounts) {
  setTransactionList(transactions);
  setAccountList(accounts);
  populateTransactionList(fullTransactionList);

  $('#submitFiltersButton').click(() => {
    let filteredAccountNames = getFilteredAccountNames();
    let filteredCategories = getFilteredCategories();
    let filteredTransactionList = copyJsonData(fullTransactionList);

    const fromDate = Date.parse(getFromDate());
    const toDate = Date.parse(getToDate());

    filteredTransactionList = filteredTransactionList.filter(transaction => {
      const transactionDate = Date.parse(transaction.transactionDate);
      return transactionDate >= fromDate && transactionDate <= toDate;
    });

    if (filteredAccountNames.length === 0 && filteredCategories.length === 0) {
      populateTransactionList(filteredTransactionList);
    } else {
      if (filteredAccountNames.length !== 0) {
        const filteredAccountList = fullAccountList.filter(account => filteredAccountNames.includes(account.accountName));
        filteredTransactionList = filteredTransactionList.filter(transaction => filteredAccountList.find(account => account.accountId === transaction.accountId));
      }

      if (filteredCategories.length !== 0) {
        filteredTransactionList = filteredTransactionList.filter(transaction => filteredCategories.includes(transaction.category));
      }

      populateTransactionList(filteredTransactionList);
    }
  });
  $('#resetFiltersButton').click(() => populateTransactionList(fullTransactionList));
  $('#dateSortButton').click(() => reverseOrder());
}

export function populateTransactionList(transactions) {
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
      transactionListContainer.append(buildTransactionRowTemplate(transaction, accountName));
    });
  } else {
    transactionListContainer.append('<p class="no-transactions"><i>No transactions available that match the specified filters.</i></p>')
  }

  renderedTransactionList = copyJsonData(transactions);
}

function setTransactionList(transactions) { fullTransactionList = copyJsonData(transactions); }

function setAccountList(accounts) { fullAccountList = copyJsonData(accounts); }

function createDateHeader(date) { return `<div class="date-header"><p>${date}</p></div>`; }

function reverseOrder() {
  renderedTransactionList = renderedTransactionList.reverse();
  populateTransactionList(renderedTransactionList);
}

function buildTransactionRowTemplate(transaction, account) {
  return `<div class="transaction-card">
              <div class="transaction-info">
                <p class="account-name">${account.accountName}</p>
                <p class="transaction-description"><i>${transaction.description}</i></p>
              </div>
              <div class="transaction-values">
                <p class="transaction-amount">${formatDollarAmount(transaction.amount)}</p>
                <p class="account-running-balance">${formatDollarAmount(transaction.runningBalance)}</p>
              </div>
          </div>`;
}
