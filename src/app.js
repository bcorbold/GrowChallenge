require('./style.scss');
require('./theme.scss');

import $ from 'jquery';
import { createFooter, renderTotalBounce } from './modules/footer/footer';
import { createHeader } from './modules/header/header';
import { setAccounts, setTransactionCategories } from './modules/side-nav/side-nav';
import { createTransactionList, initTransactionList } from './modules/transaction-list/transaction-list'

const transactionUrl = 'https://demo7235469.mockable.io/transactions';

$(document).ready(() => {
  fetchTransactions();
  createHeader();
  createFooter();
});

function fetchTransactions() {
  fetch(transactionUrl)
      .then(response => response.json())
      .then(data => {
        // footer set up
        renderTotalBounce(data.accounts);

        // side nav set up
        setAccounts(data.accounts);
        setTransactionCategories(data.categories);

        // transactionList set up
        createTransactionList();
        const headerHeight = $('.mobile-header').outerHeight();
        const footerHeight = $('.mobile-footer').outerHeight();
        $('#transactionsContainer').css('height', `calc(100vh - ${headerHeight}px - ${footerHeight}px`);

        initTransactionList(data.transactionData.transactions, data.accounts);
      })
      .catch(error => console.error(error));
}
