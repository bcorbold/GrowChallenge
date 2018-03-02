require('./auto-complete.scss');

import $ from 'jquery';

const keyDown = 40;
const keyUp = 38;
const keyEnter = 13;

export function createAutoCompleteInput(parentId, inputId, label) {
  const template = `
    <form autocomplete="off" class="auto-complete-form" id="${inputId}Form">
      <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <input class="mdl-textfield__input" type="text" id="${inputId}">
        <label class="mdl-textfield__label" for="${inputId}">${label}</label>
      </div>
    </form>
    <i class="material-icons auto-complete-filter-add" id="${inputId}Button">add</i>
`;

  $(`#${parentId}`).append(template);
}

export function populateAutoComplete(inputId, filterList) {
  autocomplete(document.getElementById(inputId), filterList);
}

// todo: should show potential options if input is empty
// todo: add to selection on click of option/enter stroke if input is valid
// todo: show error colour if invalid input
// todo: go through all of this and clean up
// todo: match based on contents of string instead of just matching the start

// auto complete functionality was modified based on https://www.w3schools.com/howto/howto_js_autocomplete.asp
function autocomplete(inputElement, options) {

  // filter on input
  inputElement.addEventListener('input', (event) => {
    let inputValue = inputElement.value;
    closeAllLists();

    if (!inputValue) { return false;}
    let currentFocus = -1;

    // todo: can do this in a better way?
    // build div that will contain all the potential values
    const optionsContainer = document.createElement('DIV');
    optionsContainer.setAttribute('id',`${inputElement.id}autocomplete-list`);
    optionsContainer.setAttribute('class', 'autocomplete-items');
    inputElement.parentNode.appendChild(optionsContainer);

    for (let i = 0; i < options.length; i++) {
      // todo: right now just compares the start, switch to regex for contents of string
      if (options[i].substr(0, inputValue.length).toUpperCase() === inputValue.toUpperCase()) {
        // build up option div
        const selectOptionContainer = document.createElement('DIV');
        selectOptionContainer.innerHTML = `<strong>${options[i].substr(0, inputValue.length)}</strong>${options[i].substr(inputValue.length)}
                       <input type="hidden" value="${options[i]}">`;

        // handle option being clicked
        selectOptionContainer.addEventListener('click', function(e) {
          inputElement.value = this.getElementsByTagName('input')[0].value;
          closeAllLists();
        });

        optionsContainer.appendChild(selectOptionContainer);
      }
    }
  });

  // highlight selections based on key presses
  inputElement.addEventListener('keydown', function(e) {
    let x = document.getElementById(this.id + 'autocomplete-list');
    if (x) x = x.getElementsByTagName('div');
    if (e.keyCode === keyDown) {
      currentFocus++;
      addActive(x);
    } else if (e.keyCode === keyUp) {
      currentFocus--;
      addActive(x);
    } else if (e.keyCode === keyEnter) { // todo: add the input to the selected list if valid
      e.preventDefault(); // stops from submitting the form
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
    elementToCheck[currentFocus].classList.add('autocomplete-active');
  }

  function removeActive(elements) {
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.remove('autocomplete-active');
    }
  }

  function closeAllLists(selectedElement) {
    let autoCompleteItems = document.getElementsByClassName('autocomplete-items');
    for (let i = 0; i < autoCompleteItems.length; i++) {
      if (selectedElement !== autoCompleteItems[i] && selectedElement !== inputElement) {
        autoCompleteItems[i].parentNode.removeChild(autoCompleteItems[i]);
      }
    }
  }

  // todo: this gets blocked because the nav stops click event from bubbling up
  document.addEventListener("click", event => closeAllLists(event.target));
  document.getElementById('filterSideNav').addEventListener('click', (event) => closeAllLists(event.target));
}