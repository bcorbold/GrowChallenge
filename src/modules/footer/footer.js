require('./footer.scss');

import $ from 'jquery';

const footerTemplate = '<div class="mobile-footer"></div>';

export function createFooter() {
  $('body').append(footerTemplate);
}

// todo: this wont "update" right now, only add the initial value, should be able to update
export function updateTotalBounce(accountList) {
  let totalBalance = 0;
  accountList.forEach(account => totalBalance += account.balance);
  // todo: remove inline styles
  $('.mobile-footer').append(`<p>Total Balance:</p><p style="color: #009688; margin-left: 2px;"><i> $${totalBalance.toFixed(2)}</i></p>`);
}