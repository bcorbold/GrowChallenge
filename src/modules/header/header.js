require('./header.scss');

import $ from 'jquery';

import { createSideNav } from '../side-nav/side-nav';

// todo: add button that switched sorting from (new -> old)/(old -> new)
const headerTemplate =
    `<div class="mobile-header">
      <button class="mdl-button mdl-js-button mdl-button--icon" id="openNav">
        <i class="material-icons">menu</i>
      </button>
    </div>`;


export function createHeader() {
  $('body').append(headerTemplate);
  createSideNav();
}
