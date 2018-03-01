require('./style.scss');

import $ from 'jquery';

import { createFooter, updateTotalBounce } from './modules/footer/footer';
import { createHeader } from './modules/header/header';
import { getFilteredAccountNames, getFilteredCategories, setAccounts, setTransactionCategories } from './modules/side-nav/side-nav';
import { createTransactionList, renderTransactionList, reverseOrder } from './modules/transaction-list/transaction-list'

// todo: anyway to avoid this?
let fetchedData;

$(document).ready(() => {
  createHeader();
  createTransactionList();
  createFooter();
  fetchTransactions();
});

function fetchTransactions() {
  const transactionUrl = 'https://demo7235469.mockable.io/transactions';
  fetch(transactionUrl).then(response => response.json())
      .then(data => {
        fetchedData = data;
        updateTotalBounce(fetchedData.accounts);
        setAccounts(fetchedData.accounts);
        setTransactionCategories(fetchedData.categories);

        const headerHeight = $('.mobile-header').outerHeight();
        const footerHeight = $('.mobile-footer').outerHeight();
        $('#transactionsContainer').css('height', `calc(100% - ${headerHeight}px - ${footerHeight}px`);

        renderTransactionList(fetchedData.transactionData.transactions, fetchedData.accounts);

        // todo: could we add everything to the dom, and then show/hide elements based on filters?
        // todo: move filtering code into transaction-list module since transaction/account list are now stored there
        document.getElementById('submitFiltersButton').addEventListener('click', () => {
          let filteredAccountNames = getFilteredAccountNames();
          let filteredCategories = getFilteredCategories();

          if (filteredAccountNames.length === 0 && filteredCategories.length === 0) {
            console.log('No filters! Render full list');
            // todo: shouldn't do this if the full list is already rendered
            renderTransactionList(fetchedData.transactionData.transactions, fetchedData.accounts);
          } else {
            let filteredTransactionList = fetchedData.transactionData.transactions.slice();
            if (filteredAccountNames.length !== 0) {
              // todo: filter by accounts
              console.log('Filtering by accounts:');
              console.log(filteredAccountNames);
              const filteredAccountList = fetchedData.accounts.filter(account => filteredAccountNames.includes(account.accountName));
              filteredTransactionList = filteredTransactionList.filter(transaction => {
                return filteredAccountList.find(account => account.accountId === transaction.accountId);
              });
            }

            if (filteredCategories.length !== 0) {
             // todo: filter by categories
              console.log('Filtering by categories:');
              console.log(filteredCategories);
              filteredTransactionList = filteredTransactionList.filter(transaction => filteredCategories.includes(transaction.category));
              console.log('Filtered transactions length: ' + filteredTransactionList.length);
            }

            renderTransactionList(filteredTransactionList, fetchedData.accounts);
          }
        });
        document.getElementById('resetFiltersButton').addEventListener('click', () => renderTransactionList(fetchedData.transactionData.transactions, fetchedData.accounts));
        document.getElementById('dateSortButton').addEventListener('click', () => reverseOrder());
      })
      .catch(error => console.error(error));
}
