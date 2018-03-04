require('./style.scss');
require('./theme.scss');

import $ from 'jquery';
import { renderFooter } from './modules/footer/footer';
import { renderHeader } from './modules/header/header';
import { renderSideNav } from './modules/side-nav/side-nav';
import { renderTransactionList } from './modules/transaction-list/transaction-list'

const transactionUrl = 'https://demo7235469.mockable.io/transactions';

$(document).ready(() => {
  fetchTransactions();
  renderHeader();
  renderSideNav();
  renderTransactionList();
  renderFooter();
});

function fetchTransactions() {
  fetch(transactionUrl)
      .then(response => response.json())
      .then(data => {

        // // footer set up
        // renderTotalBounce(data.accounts);
        //
        // // side nav set up
        // setAccounts(data.accounts);
        // setTransactionCategories(data.categories);
        // setDateInputs(data.transactionData.earliestTransactionDate, data.transactionData.latestTransactionDate);
        // $('#resetFiltersButton').click(() => { // todo: is this the correct place to put this?
        //   setDateInputs(data.transactionData.earliestTransactionDate, data.transactionData.latestTransactionDate);
        // });
        //
        // // todo: this should be fixable with flex layout
        // // transactionList set up
        // const transactionListContainer = $('#transactionsContainer');
        // const headerHeight = $('.mobile-header').outerHeight();
        // transactionListContainer.css('height', `calc(100vh - ${headerHeight}px - ${$('.mobile-footer').outerHeight()}px`);
        // transactionListContainer.css('margin-top', `${headerHeight}px;`);
        //
        // initTransactionList(data.transactionData.transactions, data.accounts);
      })
      .catch(error => console.error(error));
}
