import createElement from '../../utils/ElementBuilder';
import pubsub from '../../utils/PubSub';

class TaskCard extends HTMLElement {
   constructor() {
      super();
   }

   connectedCallback() {
      this.createCard();
      this.addEventListeners();
   }

   createCard() {
      this.setAttribute('task-id', `${this.state.id}`);
      const title = createElement('h3').setContent(this.state.title).build();
      const date = createElement('h3').setContent(this.state.date).build();
      const deleteBtn = createElement('button')
         .setContent('delete')
         .setAttributes({ class: 'delete' })
         .build();

      [title, date, deleteBtn].forEach((child) => {
         this.appendChild(child);
      });
   }

   addEventListeners() {
      this.addEventListener('click', (ev) => {
         ev.preventDefault();
         if (ev.target.classList.contains('delete')) {
            this.remove();
            pubsub.publish('task:remove', this.state.id);
         } else {
            pubsub.publish('task:select', this.state);
         }
      });
   }

   updateCard(data) {}
}

customElements.define('task-card', TaskCard);

export default TaskCard;
