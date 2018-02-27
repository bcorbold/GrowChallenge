const currentDocument = document.currentScript.ownerDocument;

class TransactionCard extends HTMLElement {

  constructor() {
    super();

    this.addEventListener('click', e => {
      this.toggleCard();
    });
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({mode: 'open'});


    const template = currentDocument.querySelector('#transaction-card-template');
    const instance = template.content.cloneNode(true);
    shadowRoot.appendChild(instance);


    // todo: use this to get "inputs" from the template
    // const transactionInput = this.getAttribute('transaction-info');

    this.render();
  }

  render() {
    this.shadowRoot.querySelector('.transaction-card-row').innerHTML = '<p>This is a transaction row!</p>';
  }

  toggleCard() {
    console.log('Element was clicked!');
  }
}

customElements.define('transaction-card', TransactionCard);
