require('./header.scss');
require('./_header.theme.scss');

import $ from 'jquery';
import { createSideNav } from '../side-nav/side-nav';

const downArrow = 'arrow_downward';
const upArrow = 'arrow_upward';
const headerTemplate =
    `<div class="mobile-header">
      <button class="mdl-button mdl-js-button mdl-button--icon" id="openNav">
        <i class="material-icons">menu</i>
      </button>
      <button class="mdl-button mdl-js-button date-sort-button" id="dateSortButton">
        <i id="sortArrow" class="material-icons">${downArrow}</i>
        <span>Date</span>
      </button>
    </div>`;

export function createHeader() {
  $('body').append(headerTemplate);
  $('#dateSortButton').click(() => {
    const sortArrow = $('#sortArrow');
    sortArrow.text(sortArrow.text() === downArrow ? upArrow : downArrow);
  });
}
