require('./_transaction-list.theme.scss');
require('./transaction-list.scss');

import $ from 'jquery';
import { copyJsonData, formatDollarAmount } from '../helpers';
import { getFilteredAccountNames, getFilteredCategories, getFromDate, getToDate } from '../side-nav/side-nav';

const transactionContainerTemplate = '<ul id="transactionsContainer" class="transactions-container"></ul>';

let fullTransactionList = []; // store this here so it can easily be reset
let fullAccountList = [];
let renderedTransactionList = []; // transactions is current being displayed, used for sorting dates

export function renderTransactionListContainer() { $('body').append(transactionContainerTemplate); }

export function initTransactionList(transactions, accounts) {
  // deep clone passed in data
  fullTransactionList = copyJsonData(transactions);
  fullAccountList = copyJsonData(accounts);

  // add the full list initially
  populateTransactionList(fullTransactionList);

  $('#submitFiltersButton').click(() => {
    // fetch filter data
    let filteredAccountNames = getFilteredAccountNames();
    let filteredCategories = getFilteredCategories();
    let filteredTransactionList = copyJsonData(fullTransactionList); // deep copy so that we can modify this freely
    const fromDate = Date.parse(getFromDate());
    const toDate = Date.parse(getToDate());

    // first filter out dates that are not within range
    filteredTransactionList = filteredTransactionList.filter(transaction => {
      const transactionDate = Date.parse(transaction.transactionDate);
      return transactionDate >= fromDate && transactionDate <= toDate;
    });

    if (filteredAccountNames.length === 0 && filteredCategories.length === 0) {
      // no accounts/categories to filter so go ahead a render
      populateTransactionList(filteredTransactionList);
    } else {
      if (filteredAccountNames.length !== 0) {
        // since accountIds are stored on transaction, and accountNames are used for filtering need to match these up
        const filteredAccountList = fullAccountList.filter(account => filteredAccountNames.includes(account.accountName));
        filteredTransactionList = filteredTransactionList.filter(transaction => filteredAccountList.find(account => account.accountId === transaction.accountId));
      }

      if (filteredCategories.length !== 0) {
        filteredTransactionList = filteredTransactionList.filter(transaction => filteredCategories.includes(transaction.category));
      }

      // render fully filtered list
      populateTransactionList(filteredTransactionList);
    }
  });
  $('#resetFiltersButton').click(() => populateTransactionList(fullTransactionList));
  $('#dateSortButton').click(() => reverseOrder());
}

export function populateTransactionList(transactions) {
  const transactionListContainer = $('#transactionsContainer');

  // removes current list, would be nicer to add/remove those that are not displayed for boost in performance
  if (transactionListContainer.children().length !== 0) {
    transactionListContainer.empty();
  }

  if (transactions.length !== 0) {
    transactions.forEach((transaction, i) => {
      // add in date header if the first element or change in date
      if (i === 0 || transaction.transactionDate !== transactions[i-1].transactionDate) {
        transactionListContainer.append(createDateHeader(transaction.transactionDate))
      }
      const accountName = fullAccountList.filter(account => account.accountId === transaction.accountId)[0];
      transactionListContainer.append(buildTransactionRowTemplate(transaction, accountName)); // create transaction card
    });
  } else {
    // let the user know there is nothing to be displayed based on filters (assumes that there will always be at least 1 transaction on start up)
    transactionListContainer.append('<p class="no-transactions"><i>No transactions available that match the specified filters.</i></p>')
  }

  // keep track of transactions that are rendered so swapping the order doesn't require re-filtering
  renderedTransactionList = copyJsonData(transactions);
}

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
