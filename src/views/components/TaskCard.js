import BaseComponent from './BaseComponent';

class TaskCard extends BaseComponent {
   constructor() {
      super();
   }

   createCard(data) {
      const card = document.createElement('div');
      const title = document.createElement('h3');
      title.innerText = data.title;
      card.appendChild(title);
      return card;
   }

   //    updateCard(data) {}
}

customElements.define('task-card', TaskCard);

export { TaskCard };
