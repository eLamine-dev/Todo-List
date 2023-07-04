import createElement from '../../utils/ElementBuilder';
import pubsub from '../../utils/PubSub';

class TaskCard extends HTMLElement {
   connectedCallback() {
      this.render();
      this.addEventListeners();
   }

   render() {
      this.setAttribute('task-id', `${this.state.id}`);
      const taskCheckbox = createElement('input').setAttributes({
         class: 'done',
         type: 'checkbox',
      });

      const title = createElement('h3').setContent(this.state.title);
      const date = createElement('div').setContent(this.state.date);
      const project = createElement('div').setContent(
         `${this.state.projectCategory} \\ ${this.state.taskProject}`
      );

      const deleteBtn = createElement('button')
         .setContent('delete')
         .setAttributes({ class: 'delete' });

      const editBtn = createElement('button')
         .setContent('edit')
         .setAttributes({ class: 'edit' });

      [taskCheckbox, title, date, deleteBtn, project].forEach((child) => {
         this.appendChild(child);
      });
   }

   addEventListeners() {
      this.addEventListener('click', (ev) => {
         if (ev.target.classList.contains('delete')) {
            this.remove();
            pubsub.publish('task:delete', this.state.id);
         }
         if (ev.target.classList.contains('done')) {
            pubsub.publish('task:update', this.state.id);
         }
         if (ev.target.classList.contains('edit')) {
            pubsub.publish('task:edit', this.state.id);
         }
      });
   }
}

customElements.define('task-card', TaskCard);

export default TaskCard;
