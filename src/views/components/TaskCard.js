import createElement from '../../utils/ElementBuilder';

class TaskCard extends HTMLElement {
   constructor() {
      super();
      this.data = null;
      this.attachShadow({ mode: 'open' });
   }

   setData(data) {
      this.data = data;
   }

   connectedCallback() {
      this.createCard();
   }

   createCard() {
      this.setAttribute('data-id', `${this.data.id}`);
      const card = createElement('div').build();
      const title = createElement('h3').setContent(this.data.title).build();
      const date = createElement('h3').setContent(this.data.date).build();
      this.shadowRoot.appendChild(title);
      this.shadowRoot.appendChild(date);
      this.shadowRoot.appendChild(card);
      return this;
   }

   updateCard(data) {}
}

customElements.define('task-card', TaskCard);

export { TaskCard };
