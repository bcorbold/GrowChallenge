// these are needed so webpack can bundle in styles
require('./style.scss');
require('./theme.scss');

import $ from 'jquery';
import { initFooter, renderFooter } from './modules/footer/footer';
import { initHeader, renderHeader } from './modules/header/header';
import { initSideNav, renderSideNav } from './modules/side-nav/side-nav';
import { initTransactionList, renderTransactionListContainer } from './modules/transaction-list/transaction-list'

const transactionUrl = 'https://demo7235469.mockable.io/transactions';

$(document).ready(() => {
  // start adding main components to the DOM then fetch the transaction data
  renderHeader();
  renderSideNav();
  renderTransactionListContainer();
  renderFooter();
  fetchTransactions();
});

function fetchTransactions() {
  fetch(transactionUrl)
      .then(response => response.json())
      .then(data => {
        // now that we have the data can initialize data/add event listeners (since we know everything has been rendered)
        initHeader();
        initSideNav(data.accounts, data.categories, data.transactionData.earliestTransactionDate, new Date().toISOString().split('T')[0]);
        initTransactionList(data.transactionData.transactions, data.accounts);
        initFooter(data.accounts);
      })
      .catch(error => console.error(error));
}
