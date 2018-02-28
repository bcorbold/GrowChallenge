require('./side-nav.scss');

import $ from 'jquery';

const sideNaveTemplate = `
<div id="mySidenav" class="sidenav">
  <i class="closebtn material-icons" id="closeNav">clear</i>
  <div class="accounts-select">
    <i class="material-icons account-filter-button">add</i>
    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
      <input class="mdl-textfield__input" type="text" id="sample3">
      <label class="mdl-textfield__label" for="sample3">Accounts</label>
    </div>
  </div>
  
  <div id="selected-accounts" class="selected-accounts-list"></div>
</div>
`;

export function createSideNav() {
  $('body').append(sideNaveTemplate);

  document.getElementById('openNav').addEventListener('click', () => openNav());
  document.getElementById('closeNav').addEventListener('click', () => closeNav());
  document.getElementsByClassName('account-filter-button')[0].addEventListener('click', () => renderChip());
}

export function openNav() {
  document.getElementById('mySidenav').style.width = 'calc(100vw - 56px)';
}

export function closeNav() {
  document.getElementById('mySidenav').style.width = '0';
}

function renderChip() {
  $('#selected-accounts').append(createChip('test'));
}

function createChip(text) {
  const chipTemplate = $(`<span class="mdl-chip mdl-chip--deletable">
                            <span class="mdl-chip__text account-filter">${text}</span>
                            <button type="button" class="mdl-chip__action"><i class="material-icons">cancel</i></button>
                        </span>`);
  chipTemplate.on('click', function(event) {
    event.currentTarget.remove();
  });
  return chipTemplate;
}