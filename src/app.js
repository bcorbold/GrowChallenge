require('./style.scss');

import $ from 'jquery';

import { createFooter, updateTotalBounce } from './modules/footer/footer';
import { createHeader } from './modules/header/header';
import { createTransactionList, renderTransactionList } from './modules/transaction-list/transaction-list'

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

        const headerHeight = $('.mobile-header').outerHeight();
        const footerHeight = $('.mobile-footer').outerHeight();
        $('.transactions-container').css('height', `calc(100% - ${headerHeight}px - ${footerHeight}px`);

        renderTransactionList(fetchedData.transactionData.transactions, fetchedData.accounts);
      })
      .catch(error => console.error(error));
}
