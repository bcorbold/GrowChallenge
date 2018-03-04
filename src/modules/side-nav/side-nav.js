import { copyJsonData } from '../helpers';

require('./_side-nav.theme.scss');
require('./side-nav.scss');

import $ from 'jquery';
import _ from 'lodash';
import { renderAutoCompleteInput, initAutoComplete } from '../auto-complete/auto-complete';
import { renderDateInput } from '../date-input/date-input';

let filteredAccounts = [];
let accounts;
let filteredCategories = [];
let categories;
let earliestDate;
let latestDate;


const accountFilterContainerId = 'accountAutoComplete';
const categoryFilterContainerId = 'categoryAutoComplete';
const fromDateContainerId = 'fromDate';
const toDateContainerId = 'toDate';

const accountAutoCompleteId = `${accountFilterContainerId}Input`;
const categoryAutoCompleteId = `${categoryFilterContainerId}Input`;
const fromDateInput = `${fromDateContainerId}Input`;
const toDateInput = `${toDateContainerId}Input`;

const sideNaveTemplate = `<div id="filterSideNav" class="side-nav closed-nav">
                            <button class="mdl-button mdl-js-button mdl-button--icon" id="closeNav">
                              <i class="material-icons">close</i>
                            </button>
                            <div id="${accountFilterContainerId}" class="auto-complete-container"></div>
                            <div id="${categoryFilterContainerId}" class="auto-complete-container"></div>
                            <div id="${fromDateContainerId}" class="date-input-container"></div>
                            <div id="${toDateContainerId}" class="date-input-container"></div>

                            
                            <div id="selected-accounts" class="selected-accounts-list"></div>
                            <div id="selected-categories" class="categories-accounts-list"></div>
                            
                            <div id="filterButtons" class="filter-buttons">
                              <button id="resetFiltersButton" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
                                Reset
                              </button>
                              <button id="submitFiltersButton" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored">
                                Apply
                              </button>
                            </div>
                          </div>`;

export function renderSideNav() {
  $('body').append(sideNaveTemplate);

  renderAutoCompleteInput(accountFilterContainerId, accountAutoCompleteId, 'Accounts');
  renderAutoCompleteInput(categoryFilterContainerId, categoryAutoCompleteId, 'Categories');
  renderDateInput(fromDateContainerId, fromDateInput, 'From...');
  renderDateInput(toDateContainerId, toDateInput, 'To...');
}

export function initSideNav(accountList, categoryList, fromDate, toDate) {
  // populating data where needed
  accounts = accountList; // todo: check for aliasing
  const accountNames = [];
  accounts.forEach(account => {
    accountNames.push(account.accountName);
  });
  initAutoComplete(accountAutoCompleteId, accountNames);

  categories = categoryList; // todo: check for aliasing
  initAutoComplete(categoryAutoCompleteId, categories);

  earliestDate = fromDate;
  latestDate = toDate;
  $(`#${fromDateInput}`).val(earliestDate);
  $(`#${toDateInput}`).val(latestDate);

  // setting up event handlers
  const sideNav = $('#filterSideNav');
  sideNav.click((event) => event.stopPropagation());
  sideNav.on('touchstart', (event) => event.stopPropagation());

  const jDoc = $(document);
  jDoc.click(() => closeNav());
  jDoc.on('selectOption', (event, value, id) => {
    if (id === accountAutoCompleteId) {
      renderAccountFilterChip(value);
      $(`#${accountAutoCompleteId}Form`).children().removeClass('is-dirty');
    } else if (id === categoryAutoCompleteId) {
      renderCategoryFilterChip(value);
      $(`#${categoryAutoCompleteId}Form`).children().removeClass('is-dirty');
    }
  });
  jDoc.on('touchstart', () => closeNav());

  $('#openNav').click((event) => {
    openNav();
    event.stopPropagation();
  });
  $('#closeNav').click(() => closeNav());
  $('#submitFiltersButton').click(() => {
    closeNav();
    $('#sortArrow').text('arrow_downward');
  });
  $('#resetFiltersButton').click(() => {
    filteredAccounts = [];
    filteredCategories = [];
    $('#selected-accounts').empty();
    $('#selected-categories').empty();
    $('#sortArrow').text('arrow_downward');
    $(`#${fromDateInput}`).val(earliestDate);
    $(`#${toDateInput}`).val(latestDate);
  });
}

export function getFilteredAccountNames() { return filteredAccounts; }

export function getFilteredCategories() { return filteredCategories; }

export function getFromDate() { return $(`#${fromDateInput}`).val(); }

export function getToDate() { return $(`#${toDateInput}`).val(); }

function openNav() {
  const filterNav = $('#filterSideNav');
  filterNav.removeClass('closed-nav');
  filterNav.addClass('open-nav');
}

function closeNav() {
  const filterNav = $('#filterSideNav');
  filterNav.removeClass('open-nav');
  filterNav.addClass('closed-nav');
}

function renderAccountFilterChip(accountName) {
  if (accountName !== null && accountName !== undefined && accountName !== '' && !filteredAccounts.includes(accountName)) {
    filteredAccounts.push(accountName);
    const chip = buildChip(accountName);

    chip.click((event) => {
      const clickedChip = $(event.currentTarget);
      _.pull(filteredAccounts, clickedChip.children('.filter-chip-text').text());
      clickedChip.remove();
    });

    $('#selected-accounts').append(chip);
    $(`#${accountAutoCompleteId}`).val('');
  }
}

function renderCategoryFilterChip(category) {
  if (category !== null && category !== undefined && category !== '' && !filteredCategories.includes(category)) {
    filteredCategories.push(category);
    const chip = buildChip(category);

    chip.click((event) => {
      const clickedChip = $(event.currentTarget);
      _.pull(filteredCategories, clickedChip.children('.filter-chip-text').text());
      clickedChip.remove();
    });

    $('#selected-categories').append(chip);
    $(`#${categoryAutoCompleteId}`).val('');
  }
}

function buildChip(text) {
  return $(`<span class="mdl-chip mdl-chip--deletable">
                <span class="mdl-chip__text filter-chip-text">${text}</span>
                <button type="button" class="mdl-chip__action"><i class="material-icons">cancel</i></button>
            </span>`);
}
