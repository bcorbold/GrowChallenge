require('./style.scss');
require('./theme.scss');

import $ from 'jquery';
import { initFooter, renderFooter } from './modules/footer/footer';
import { initHeader, renderHeader } from './modules/header/header';
import { initSideNav, renderSideNav } from './modules/side-nav/side-nav';
import { initTransactionList, renderTransactionListContainer } from './modules/transaction-list/transaction-list'

const transactionUrl = 'https://demo7235469.mockable.io/transactions';

$(document).ready(() => {
  fetchTransactions();
  renderHeader();
  renderSideNav();
  renderTransactionListContainer();
  renderFooter();
});

function fetchTransactions() {
  fetch(transactionUrl)
      .then(response => response.json())
      .then(data => {
        initHeader();
        initSideNav(data.accounts, data.categories, data.transactionData.earliestTransactionDate, new Date().toISOString().split('T')[0]);
        initTransactionList(data.transactionData.transactions, data.accounts);
        initFooter(data.accounts);
      })
      .catch(error => console.error(error));
}
