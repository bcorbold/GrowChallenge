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

const sideNaveTemplate = `<div id="filterSideNav" class="side-nav">
                            <div id="${accountFilterContainerId}" class="accounts-select"></div>
                            <div id="selected-accounts" class="selected-accounts-list"></div>
                            
                            <div id="${categoryFilterContainerId}" class="category-select"></div>
                            <div id="selected-categories" class="categories-accounts-list"></div>
                            
                            <div id="filterButtons" class="filter-buttons">
                              <button id="submitFiltersButton" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored">
                                Submit
                              </button>
                              <button id="resetFiltersButton" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
                                Reset
                              </button>
                            </div>
                          </div>`;

export function createSideNav() {
  $('body').append(sideNaveTemplate);

  // todo: change these width style changes to classes so they can be changed using @media
  createAutoCompleteInput(accountFilterContainerId, accountAutoCompleteId, 'Accounts');
  createAutoCompleteInput(categoryFilterContainerId, categoryAutoCompleteId, 'Categories');

  document.addEventListener('selectOption', (event) => {
    if (event.detail.autoCompleteId === accountAutoCompleteId) {
      addAccountFilterChip(event.detail.value);
    } else if (event.detail.autoCompleteId === categoryAutoCompleteId) {
      addCategoryFilterChip(event.detail.value);
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
  document.getElementById('filterSideNav').addEventListener('click', (event) => event.stopPropagation());
  document.addEventListener('click', ()  => closeNav());
}

function openNav() {
  document.getElementById('filterSideNav').style.width = 'calc(100vw - 56px)';
}

function closeNav() {
  document.getElementById('filterSideNav').style.width = '0';
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