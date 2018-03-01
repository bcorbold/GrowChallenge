require('./footer.scss');

import $ from 'jquery';

import { formatDollarAmount } from '../helpers';

const footerTemplate = '<div class="mobile-footer"><p>Total Balance:</p></div>';

export function createFooter() {
  $('body').append(footerTemplate);
}

export function renderTotalBounce(accountList) {
  let totalBalance = 0;
  accountList.forEach(account => totalBalance += account.balance);
  $('.mobile-footer').append(`<p class="total-account-balance"><i>${formatDollarAmount(totalBalance)}</i></p>`);
}
