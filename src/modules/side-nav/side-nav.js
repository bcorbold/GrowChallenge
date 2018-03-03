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

  $(document).on('selectOption', (event, value, id) => {
    if (id === accountAutoCompleteId) {
      addAccountFilterChip(value);
      $(`#${accountAutoCompleteId}Form`).children().removeClass('is-dirty');
    } else if (id === categoryAutoCompleteId) {
      addCategoryFilterChip(value);
      $(`#${categoryAutoCompleteId}Form`).children().removeClass('is-dirty');
    }
  });


  document.getElementById('openNav').addEventListener('click', (event) => {
    openNav();
    event.stopPropagation();
  });
  document.getElementById('submitFiltersButton').addEventListener('click', () => closeNav());
  document.getElementById('resetFiltersButton').addEventListener('click', () => {
    filteredAccounts = [];
    filteredCategories = [];
    const accountsChipList = document.getElementById('selected-accounts');
    while (accountsChipList.firstChild) {
      accountsChipList.removeChild(accountsChipList.firstChild);
    }
    const categoriesChipList = document.getElementById('selected-categories');
    while (categoriesChipList.firstChild) {
      categoriesChipList.removeChild(categoriesChipList.firstChild);
    }
    closeNav();
  });
  // todo: safari on iOs doesn't emit any of these
  document.getElementById('filterSideNav').addEventListener('click', (event) => event.stopPropagation());
  document.getElementById('filterSideNav').addEventListener('touchstart', (event) => event.stopPropagation());
  document.addEventListener('click', ()  => closeNav());
  document.addEventListener('touchstart', () => closeNav());
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
    chip.on('click', function(event) {
      _.pull(filteredAccounts, event.currentTarget.children[0].childNodes[0].data); // if the template changes so will this
      event.currentTarget.remove();
    });

    $('#selected-accounts').append(chip);
    document.getElementById(`${accountAutoCompleteId}`).value = '';
  }
}

function addCategoryFilterChip(category) {
  if (category !== null && category !== undefined && category !== '' && !filteredCategories.includes(category)) {
    filteredCategories.push(category);
    const chip = createChip(category);
    chip.on('click', function(event) {
      _.pull(filteredCategories, event.currentTarget.children[0].childNodes[0].data); // if the template changes so will this
      event.currentTarget.remove();
    });

    $('#selected-categories').append(chip);
    document.getElementById(`${categoryAutoCompleteId}`).value = '';
  }
}

function createChip(text) {
  return $(`<span class="mdl-chip mdl-chip--deletable">
                <span class="mdl-chip__text account-filter">${text}</span>
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
