require('./_date-input.scss');
require('./date-input.scss');

import $ from 'jquery';

export function createDateInput(containerId, inputId, label, initDate) {
  const template = `<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label date-input">
                              <input class="mdl-textfield__input" type="date" id="${inputId}">
                              <label class="mdl-textfield__label floating-label" for="${inputId}">${label}</label>
                            </div>`;

  $(`#${containerId}`).append(template);
  if (initDate) $(`#${inputId}`).val(initDate);
}