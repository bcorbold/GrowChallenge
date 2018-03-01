require('./auto-complete.scss');

import $ from 'jquery';

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
function autocomplete(inputElement, options) { // inp = input element, arr = possible list
  let currentFocus;

  // filter on input
  inputElement.addEventListener("input", (e) => {
    let a, b, i, val = inputElement.value;
    closeAllLists();

    if (!val) { return false;}
    currentFocus = -1;

    // todo: can do this in a better way?
    // build div that will contain all the potential values
    a = document.createElement('DIV');
    a.setAttribute('id', inputElement.id + 'autocomplete-list');
    a.setAttribute('class', 'autocomplete-items');
    inputElement.parentNode.appendChild(a);

    for (i = 0; i < options.length; i++) {

      // todo: right now just compares the start, switch to regex for contents of string
      if (options[i].substr(0, val.length).toUpperCase() === val.toUpperCase()) {

        // build up option div
        b = document.createElement("DIV");
        b.innerHTML = `<strong>${options[i].substr(0, val.length)}</strong>${options[i].substr(val.length)}
                       <input type="hidden" value="${options[i]}">`;

        b.addEventListener("click", function(e) {
          /*insert the value for the autocomplete text field:*/
          inputElement.value = this.getElementsByTagName("input")[0].value;
          /*close the list of autocompleted values,
          (or any other open lists of autocompleted values:*/
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });

  /*execute a function presses a key on the keyboard:*/
  inputElement.addEventListener("keydown", function(e) {
    let x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
      increase the currentFocus variable:*/
      currentFocus++;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 38) { //up
      /*If the arrow UP key is pressed,
      decrease the currentFocus variable:*/
      currentFocus--;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      e.preventDefault();
      if (currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (x) x[currentFocus].click();
      }
    }
  });

  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }

  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (let i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }

  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    let x = document.getElementsByClassName("autocomplete-items");
    for (let i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inputElement) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }

  // todo: this gets blocked because the nav stops click event from bubbling up
  document.addEventListener("click", event => closeAllLists(event.target));
}