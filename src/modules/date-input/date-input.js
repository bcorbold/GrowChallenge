require('./_date-input.scss');
require('./date-input.scss');

import $ from 'jquery';

export function createDateInput(containerId, inputId, label) {
  const template = `<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                              <input class="mdl-textfield__input" type="date" id="${inputId}">
                              <label class="mdl-textfield__label floating-label" for="fromDateInput">${label}</label>
                              <span class="mdl-textfield__error">That's not a date!</span>
                            </div>`;
  $(`#${containerId}`).append(template);
}