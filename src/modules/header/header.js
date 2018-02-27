require('./header.scss');

import $ from 'jquery';

const headerTemplate =
    `<div class="mobile-header">
      <button class="mdl-button mdl-js-button mdl-button--icon">
        <i class="material-icons">menu</i>
      </button>
      <span class="header-title">Transactions</span>
    </div>`;


export function createHeader() {
  $('body').append(headerTemplate);
}
