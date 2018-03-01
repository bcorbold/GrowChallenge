require('./footer.scss');

import $ from 'jquery';

import { formatDollarAmount } from '../helpers';

const footerTemplate = '<div class="mobile-footer"><p>Total Balance:</p></div>';

export function createFooter() {
  $('body').append(footerTemplate);
}

// todo: this wont "update" right now, only add the initial value, should be able to update
export function updateTotalBounce(accountList) {
  let totalBalance = 0;
  accountList.forEach(account => totalBalance += account.balance);
  $('.mobile-footer').append(`<p class="total-account-balance"><i>${formatDollarAmount(totalBalance)}</i></p>`);
}
