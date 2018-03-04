require('./_auto-complete.theme.scss');
require('./auto-complete.scss');

import $ from 'jquery';
import { copyJsonData } from '../helpers';

const keyDown = 40;
const keyUp = 38;
const keyEnter = 13;

export function renderAutoCompleteInput(parentId, inputId, label) {
  const template = `
    <form autocomplete="off" class="auto-complete-form" id="${inputId}Form">
      <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <input class="mdl-textfield__input" type="text" id="${inputId}">
        <label class="mdl-textfield__label" for="${inputId}">${label}</label>
      </div>
    </form>
`;

  $(`#${parentId}`).append(template);
}

export function populateAutoComplete(inputId, filterList) {
  autocomplete($(`#${inputId}`), copyJsonData(filterList));
}

// todo: will highlight index that is hovered + selected by key stroke, should only have 1 highlighted at a time
// todo: should show potential options if input is empty
// auto complete functionality was modified based on https://www.w3schools.com/howto/howto_js_autocomplete.asp
function autocomplete(inputElement, options) {
  let currentFocus = -1;

  // filter on input
  inputElement.on('input', () => {
    const inputValue = inputElement.val();
    const inputId = inputElement.attr('id');
    closeAllLists();

    if (!inputValue) { return false;}

    inputElement.parent().append(`<div id="${inputId}autocomplete-list" class="autocomplete-items"></div>`);

    for (let i = 0; i < options.length; i++) {
      const matchedIndex = options[i].toUpperCase().indexOf(inputValue.toUpperCase());
      if (matchedIndex !== -1) {
        const selectOptionContainer = createAutoCompleteOptionTemplate(matchedIndex, options[i], inputValue);

        selectOptionContainer.click(function() {
          $(this).trigger('selectOption', [$(this).children('input').val(), inputId]);
          inputElement.val('');
          closeAllLists();
        });

        selectOptionContainer.on('mouseover', () => {
          let x = $(`#${inputId}autocomplete-list`);
          if (x) x = x.children('div');
          removeActive(x);
        });

        $(`#${inputId}autocomplete-list`).append(selectOptionContainer);
      }
    }
  });

  // highlight selections based on key presses
  inputElement.on('keydown', function(event) {
    let x = $(`#${this.id}autocomplete-list`);
    if (x.children('div').length !== 0) {
      x = x.children('div');
    }
    if (event.keyCode === keyDown) {
      currentFocus++;
      addActive(x);
    } else if (event.keyCode === keyUp) {
      currentFocus--;
      addActive(x);
    } else if (event.keyCode === keyEnter) {
      event.preventDefault(); // stops from submitting the form
      if (currentFocus > -1) {
        if (x) x[currentFocus].click(); // simulate click on item
      }
    }
  });

  // active being the element that is highlighted
  function addActive(elementToCheck) {
    if (!elementToCheck) return false;
    removeActive(elementToCheck);
    if (currentFocus >= elementToCheck.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (elementToCheck.length - 1);
    if (elementToCheck[currentFocus])
      elementToCheck[currentFocus].classList.add('autocomplete-active');
  }

  function removeActive(elements) {
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.remove('autocomplete-active');
    }
  }

  function closeAllLists(selectedElement) {
    const autoCompleteItems = $('.autocomplete-items');
    for (let i = 0; i < autoCompleteItems.children().length; i++) {
      if (selectedElement !== autoCompleteItems[i] && selectedElement !== inputElement) {
        autoCompleteItems[i].parentNode.removeChild(autoCompleteItems[i]);
      }
    }
  }

  function createAutoCompleteOptionTemplate(matchedIndex, option, inputValue) {
    if (matchedIndex === 0) {
       return $(`<div><strong>${option.substr(0, inputValue.length)}</strong>${option.substr(inputValue.length)}<input type="hidden" value="${option}"></div>`);
    }
    return $(`<div>${option.substr(0, matchedIndex)}<strong>${option.substr(matchedIndex, inputValue.length)}</strong>${option.substr(matchedIndex + inputValue.length)}<input type="hidden" value="${option}"></div>`);
  }

  $('body').click(() => closeAllLists());
  $('#filterSideNav').click(() => closeAllLists());
}