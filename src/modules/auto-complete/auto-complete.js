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

export function initAutoComplete(inputId, filterList) {
  autocomplete($(`#${inputId}`), copyJsonData(filterList));
}

// todo: will highlight index that is hovered + selected by key stroke, should only have 1 highlighted at a time
// auto complete functionality was modified based on https://www.w3schools.com/howto/howto_js_autocomplete.asp
function autocomplete(inputElement, options) {
  let currentFocus = -1;

  // filter on input
  inputElement.on('input', () => showOptions());
  inputElement.focus(() => showOptions());

  // highlight selections based on key presses
  inputElement.on('keydown', function(event) {
    let x = $(`#${this.id}AutoCompleteList`);
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

  function showOptions() {
    const inputValue = inputElement.val();
    const inputId = inputElement.attr('id');
    closeAllLists();

    inputElement.parent().append(`<div id="${inputId}AutoCompleteList" class="auto-complete-items"></div>`);

    options.forEach(option => {
      let selectOptionContainer;

      // checking to see which options to render
      if (!inputValue) {
        selectOptionContainer = createAutoCompleteOptionTemplate(option, inputValue);
      } else {
        const matchedIndex = option.toUpperCase().indexOf(inputValue.toUpperCase());
        if (matchedIndex !== -1) {
          selectOptionContainer = createAutoCompleteOptionTemplate(option, inputValue, matchedIndex);
        }
      }

      // add listeners to options
      if (selectOptionContainer) {
        selectOptionContainer.click(function() {
          $(this).trigger('selectOption', [$(this).children('input').val(), inputId]);
          inputElement.val('');
          closeAllLists();
        });

        selectOptionContainer.on('mouseover', () => {
          let x = $(`#${inputId}AutoCompleteList`);
          if (x) x = x.children('div');
          removeActive(x);
          selectOptionContainer.addClass('auto-complete-active');
          for (let i = 0; i < x.length; i++) {
            if (selectOptionContainer[0] === x[i]) {
              currentFocus = i;
            }
          }
        });

        selectOptionContainer.on('mouseleave', () => {
          selectOptionContainer.removeClass('auto-complete-active');
        });

        $(`#${inputId}AutoCompleteList`).append(selectOptionContainer);
      }
    });
  }

  function addActive(elementToCheck) {
    if (!elementToCheck) return false;
    removeActive(elementToCheck);
    if (currentFocus >= elementToCheck.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (elementToCheck.length - 1);
    if (elementToCheck[currentFocus])
      elementToCheck[currentFocus].classList.add('auto-complete-active');
  }

  function removeActive(elements) {
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.remove('auto-complete-active');
    }
  }

  function closeAllLists(selectedElement) {
    const autoCompleteItems = $('.auto-complete-items');

    autoCompleteItems.children().each((i) => {
      if (selectedElement !== autoCompleteItems[i] && selectedElement !== inputElement) {
        autoCompleteItems[i].remove();
      }
    });
  }

  function createAutoCompleteOptionTemplate(option, inputValue, matchedIndex) {
    if (matchedIndex === undefined) {
      return $(`<div>${option}<input type="hidden" value="${option}"></div>`);
    } else if (matchedIndex === 0) {
       return $(`<div><strong>${option.substr(0, inputValue.length)}</strong>${option.substr(inputValue.length)}<input type="hidden" value="${option}"></div>`);
    }
    return $(`<div>${option.substr(0, matchedIndex)}<strong>${option.substr(matchedIndex, inputValue.length)}</strong>${option.substr(matchedIndex + inputValue.length)}<input type="hidden" value="${option}"></div>`);
  }

  $('body').click(() => closeAllLists());
  $('#filterSideNav').click((event) => {
    if (event.target.value) {
      closeAllLists();
    }
  });

}
