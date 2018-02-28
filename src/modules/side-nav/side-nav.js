require('./side-nav.scss');

import $ from 'jquery';
import _ from 'lodash';

const filteredAccounts = [];

const sideNaveTemplate = `<div id="mySidenav" class="sidenav">
                            <i class="closebtn material-icons" id="closeNav">clear</i>
                            <div class="accounts-select">
                              <i class="material-icons account-filter-button">add</i>
                              <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                <input class="mdl-textfield__input" type="text" id="accountFilter">
                                <label class="mdl-textfield__label" for="sample3">Accounts</label>
                              </div>
                            </div>
                            
                            <div id="selected-accounts" class="selected-accounts-list"></div>
                          </div>`;

export function createSideNav() {
  $('body').append(sideNaveTemplate);

  document.getElementById('openNav').addEventListener('click', () => openNav());
  document.getElementById('closeNav').addEventListener('click', () => closeNav());
  document.getElementsByClassName('account-filter-button')[0].addEventListener('click', () => addAccountFilterChip());
}

export function openNav() {
  document.getElementById('mySidenav').style.width = 'calc(100vw - 56px)';
}

export function closeNav() {
  document.getElementById('mySidenav').style.width = '0';
}

function addAccountFilterChip() {
  const accountName = $('#accountFilter').val();

  if (!filteredAccounts.includes(accountName)) {
    filteredAccounts.push(accountName);
    $('#selected-accounts').append(createChip(accountName));
  }
}

function createChip(text) {
  const chipTemplate = $(`<span class="mdl-chip mdl-chip--deletable">
                            <span class="mdl-chip__text account-filter">${text}</span>
                            <button type="button" class="mdl-chip__action"><i class="material-icons">cancel</i></button>
                        </span>`);
  chipTemplate.on('click', function(event) {
    _.pull(filteredAccounts, event.currentTarget.children[0].childNodes[0].data); // if the template changes so will this
    event.currentTarget.remove();
  });
  return chipTemplate;
}