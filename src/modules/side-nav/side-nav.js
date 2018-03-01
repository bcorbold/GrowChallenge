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
                            <!--<i class="closebtn material-icons" id="closeNav">clear</i>-->
                            
                            <div id="${accountFilterContainerId}" class="accounts-select"></div>
                            <div id="selected-accounts" class="selected-accounts-list"></div>
                            
                            <div id="${categoryFilterContainerId}" class="category-select"></div>
                            <div id="selected-categories" class="categories-accounts-list"></div>
                            
                            <div id="filterButtons" class="filter-buttons" style="margin: 0 16px;">
                              <button id="submitFiltersButton" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored">
                                Submit
                              </button>
                              <button id="resetFiltersButton" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
                                Reset
                              </button>
                            </div>

                          </div>`;

// todo: fix button's wrapping around when opening/closing the side nav
// todo: only display categories that transactions have?
export function createSideNav() {
  $('body').append(sideNaveTemplate);

  createAutoCompleteInput(accountFilterContainerId, accountAutoCompleteId, 'Accounts');
  document.getElementById(`${accountAutoCompleteId}Form`).style.width = 'calc(100% - 32px)';

  createAutoCompleteInput(categoryFilterContainerId, categoryAutoCompleteId, 'Categories');
  document.getElementById(`${categoryAutoCompleteId}Form`).style.width = 'calc(100% - 32px)';

  document.getElementById('openNav').addEventListener('click', (event) => {
    openNav();
    event.stopPropagation();
  });
  document.getElementById(`${accountAutoCompleteId}Button`).addEventListener('click', () => addAccountFilterChip());
  document.getElementById(`${categoryAutoCompleteId}Button`).addEventListener('click', () => addCategoryFilterChip());

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
    // todo: reset transaction list
    closeNav();
  });

  document.getElementById('filterSideNav').addEventListener('click', (event) => event.stopPropagation());
  document.addEventListener("click", ()  => closeNav());

}

function openNav() {
  document.getElementById('filterSideNav').style.width = 'calc(100vw - 56px)';
}

function closeNav() {
  document.getElementById('filterSideNav').style.width = '0';
}

function addAccountFilterChip() {
  const accountName = document.getElementById(`${accountAutoCompleteId}`).value;

  // todo: add verification so that user can only add filters that are actual accounts
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

function addCategoryFilterChip() {
  const category = document.getElementById(`${categoryAutoCompleteId}`).value;

  // todo: add verification so that user can only add filters that are actual accounts
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