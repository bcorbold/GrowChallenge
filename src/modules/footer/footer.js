require('./footer.scss');

import $ from 'jquery';

const footerTemplate = '<div class="mobile-footer"></div>';

export function createFooter() {
  $('body').append(footerTemplate);
}
