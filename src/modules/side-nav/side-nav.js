require('./side-nav.scss');

import $ from 'jquery';
import _ from 'lodash';

import { createAutoCompleteInput, populateAutoComplete } from '../auto-complete/auto-complete';

const filteredAccounts = [];
let accounts;

const filteredCategories = [];
let categories;

const accountAutoCompleteId = 'accountAutoCompleteInput';
const accountFilterContainerId = 'accountAutoComplete';

const categoryAutoCompleteId = 'categoryAutoCompleteInput';
const categoryFilterContainerId = 'categoryAutoComplete';

// todo: should make filter inputs (account + categories) autocomplete
const sideNaveTemplate = `<div id="mySidenav" class="sidenav">
                            <i class="closebtn material-icons" id="closeNav">clear</i>
                            
                            <div id="${accountFilterContainerId}" class="accounts-select"></div>
                            <div id="selected-accounts" class="selected-accounts-list"></div>
                            
                            <div id="${categoryFilterContainerId}" class="category-select"></div>
                            <div id="selected-categories" class="categories-accounts-list"></div>

                          </div>`;

export function createSideNav() {
  $('body').append(sideNaveTemplate);

  createAutoCompleteInput(accountFilterContainerId, accountAutoCompleteId, 'Accounts');
  document.getElementById(`${accountAutoCompleteId}Form`).style.width = 'calc(100% - 32px)';

  createAutoCompleteInput(categoryFilterContainerId, categoryAutoCompleteId, 'Categories');
  document.getElementById(`${categoryAutoCompleteId}Form`).style.width = 'calc(100% - 32px)';

  document.getElementById('openNav').addEventListener('click', () => openNav());
  document.getElementById('closeNav').addEventListener('click', () => closeNav());
  document.getElementById(`${accountAutoCompleteId}Button`).addEventListener('click', () => addAccountFilterChip());
  document.getElementById(`${categoryAutoCompleteId}Button`).addEventListener('click', () => addCategoryFilterChip());
}

export function openNav() {
  document.getElementById('mySidenav').style.width = 'calc(100vw - 56px)';
}

export function closeNav() {
  document.getElementById('mySidenav').style.width = '0';
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