require('./_side-nav.theme.scss');
require('./side-nav.scss');

import $ from 'jquery';
import _ from 'lodash';
import { createAutoCompleteInput, populateAutoComplete } from '../auto-complete/auto-complete';

let filteredAccounts = [];
let accounts;

let filteredCategories = [];
let categories;

const accountAutoCompleteId = 'accountAutoCompleteInput';
const accountFilterContainerId = 'accountAutoComplete';
const categoryAutoCompleteId = 'categoryAutoCompleteInput';
const categoryFilterContainerId = 'categoryAutoComplete';

// todo: add close button back
const sideNaveTemplate = `<div id="filterSideNav" class="side-nav closed-nav">
                            <button class="mdl-button mdl-js-button mdl-button--icon" id="closeNav">
                              <i class="material-icons">close</i>
                            </button>
                            <div id="${accountFilterContainerId}" class="accounts-select"></div>
                            <div id="${categoryFilterContainerId}" class="category-select"></div>
                            
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

export function createSideNav() {
  $('body').append(sideNaveTemplate);

  // todo: change these width style changes to classes so they can be changed using @media
  createAutoCompleteInput(accountFilterContainerId, accountAutoCompleteId, 'Accounts');
  createAutoCompleteInput(categoryFilterContainerId, categoryAutoCompleteId, 'Categories');

  // todo: safari on iOs doesn't emit any of these
  const sideNav = $('#filterSideNav');
  sideNav.click((event) => event.stopPropagation());
  sideNav.on('touchstart', (event) => event.stopPropagation());

  const jDoc = $(document);
  jDoc.click(() => closeNav());
  jDoc.on('selectOption', (event, value, id) => {
    if (id === accountAutoCompleteId) {
      addAccountFilterChip(value);
      $(`#${accountAutoCompleteId}Form`).children().removeClass('is-dirty');
    } else if (id === categoryAutoCompleteId) {
      addCategoryFilterChip(value);
      $(`#${categoryAutoCompleteId}Form`).children().removeClass('is-dirty');
    }
  });
  jDoc.on('touchstart', () => closeNav());

  $('#openNav').click((event) => {
    openNav();
    event.stopPropagation();
  });
  $('#closeNav').click(() => closeNav());
  $('#submitFiltersButton').click(() => closeNav());
  $('#resetFiltersButton').click(() => {
    filteredAccounts = [];
    filteredCategories = [];
    $('#selected-accounts').empty();
    $('#selected-categories').empty();
    $('#sortArrow').text('arrow_downward');
  });
}

// todo: these are getting called twice, look into better event subscriptions
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

function addAccountFilterChip(accountName) {
  if (accountName !== null && accountName !== undefined && accountName !== '' && !filteredAccounts.includes(accountName)) {
    filteredAccounts.push(accountName);
    const chip = createChip(accountName);

    chip.click((event) => {
      const clickedChip = $(event.currentTarget);
      _.pull(filteredAccounts, clickedChip.children('.filter-chip-text').text());
      clickedChip.remove();
    });

    $('#selected-accounts').append(chip);
    $(`#${accountAutoCompleteId}`).val('');
  }
}

function addCategoryFilterChip(category) {
  if (category !== null && category !== undefined && category !== '' && !filteredCategories.includes(category)) {
    filteredCategories.push(category);
    const chip = createChip(category);

    chip.click((event) => {
      const clickedChip = $(event.currentTarget);
      _.pull(filteredCategories, clickedChip.children('.filter-chip-text').text());
      clickedChip.remove();
    });

    $('#selected-categories').append(chip);
    $(`#${categoryAutoCompleteId}`).val('');
  }
}

function createChip(text) {
  return $(`<span class="mdl-chip mdl-chip--deletable">
                <span class="mdl-chip__text filter-chip-text">${text}</span>
                <button type="button" class="mdl-chip__action"><i class="material-icons">cancel</i></button>
            </span>`);
}

export function setAccounts(accountList) {
  accounts = accountList;
  const accountNames = [];
  accounts.forEach(account => {
    accountNames.push(account.accountName);
  });
  populateAutoComplete(accountAutoCompleteId, accountNames);
}

export function setTransactionCategories(categoryList) {
  categories = categoryList;
  populateAutoComplete(categoryAutoCompleteId, categories);
}

export function getFilteredAccountNames() { return filteredAccounts; }

export function getFilteredCategories() { return filteredCategories; }
