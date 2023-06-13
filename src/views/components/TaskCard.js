import createElement from '../../utils/ElementBuilder';
import pubsub from '../../utils/PubSub';

class TaskCard extends HTMLElement {
   connectedCallback() {
      this.render();
      this.addEventListeners();
   }

   render() {
      this.setAttribute('task-id', `${this.state.id}`);
      const title = createElement('h3').setContent(this.state.title);
      const date = createElement('h3').setContent(this.state.date);
      const deleteBtn = createElement('button')
         .setContent('delete')
         .setAttributes({ class: 'delete' });
      const completedButton = createElement('button')
         .setContent('done!')
         .setAttributes({ class: 'completed' });
      [title, date, deleteBtn, completedButton].forEach((child) => {
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
            pubsub.publish('task:select', this.getState());
         }
      });
   }

   updateCard(data) {}
}

customElements.define('task-card', TaskCard);

export default TaskCard;
