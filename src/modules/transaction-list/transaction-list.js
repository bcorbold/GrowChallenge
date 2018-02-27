require('./transaction-list.scss');

import $ from 'jquery';

const emptyTemplate = '<ul class="transactions-container"></ul>';

export function createTransactionList() {
  $('body').append(emptyTemplate);
}