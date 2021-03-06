require('./_footer.theme.scss');
require('./footer.scss');

import $ from 'jquery';
import { formatDollarAmount } from '../helpers';

const footerTemplate = '<div class="mobile-footer"><p>Total Balance:</p></div>';

export function renderFooter() { $('body').append(footerTemplate); }

export function initFooter(accountList) {
  let totalBalance = 0;
  accountList.forEach(account => totalBalance += account.balance);
  $('.mobile-footer').append(`<p class="total-account-balance"><i>${formatDollarAmount(totalBalance)}</i></p>`);
}
