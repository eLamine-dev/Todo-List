import createElement from '../../utils/ElementBuilder';
import pubsub from '../../utils/PubSub';

class TaskCard extends HTMLElement {
   constructor() {
      super();
      // this.data = null;
      // this.attachShadow({ mode: 'open' });
   }

   // setData(data) {
   //    this.data = data;
   // }

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
      // const card = createElement('div')
      //    .appendChildren([title, date, deleteBtn])
      //    .build();

      [title, date, deleteBtn].forEach((child) => {
         this.appendChild(child);
      });
      // this.appendChild(card);
      return this;
   }

   addEventListeners() {
      this.addEventListener('click', (ev) => {
         ev.preventDefault();
         if (ev.target.classList.contains('delete')) {
            this.remove();
            console.log(this.getAttribute('task-id'));
            pubsub.publish('task:remove', this.getAttribute('task-id'));
         }
      });
   }

   updateCard(data) {}
}

customElements.define('task-card', TaskCard);

export { TaskCard };
