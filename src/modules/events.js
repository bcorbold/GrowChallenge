export function createSelectOptionEvent(value, autoCompleteId) {
  const eventDetails = {
    detail: {
      autoCompleteId: autoCompleteId,
      value: value
    },
    bubbles: true,
    cancelable: true
  };
  return new CustomEvent('selectOption', eventDetails);
}