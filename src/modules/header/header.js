import { createSideNav } from '../side-nav/side-nav';

require('./header.scss');

import $ from 'jquery';

// todo: add button that switched sorting from (new -> old)/(old -> new)
const headerTemplate =
    `<div class="mobile-header">
      <button class="mdl-button mdl-js-button mdl-button--icon" id="openNav">
        <i class="material-icons">menu</i>
      </button>
      <span class="header-title">Transactions</span>
    </div>`;


export function createHeader() {
  $('body').append(headerTemplate);
  createSideNav();
}
