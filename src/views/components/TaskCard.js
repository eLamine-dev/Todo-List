import createElement from '../../utils/ElementBuilder';

class TaskCard extends HTMLElement {
   constructor(data) {
      super();
      this.createCard(data);
   }

   createCard(data) {
      const card = createElement('div').build();
      const title = createElement('h3').setContent(data.title).build();
      const date = createElement('h3').setContent(data.date).build();
      card.appendChild(title);
      card.appendChild(date);
      this.appendChild(card);
      return this;
   }

   // updateCard(data) {}
}

customElements.define('task-card', TaskCard);

export { TaskCard };
