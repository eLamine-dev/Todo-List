import createElement from '../../utils/ElementBuilder';
import pubsub from '../../utils/PubSub';

class TaskCard extends HTMLElement {
   connectedCallback() {
      this.render();
      this.addEventListeners();
   }

   render() {
      this.setAttribute('task-id', `${this.state.id}`);

      const statusLabel = createElement('label')
         .setAttributes({ class: 'status' })
         .appendTo(this);

      this.setStatus(statusLabel);

      const taskCheckbox = createElement('input')
         .setAttributes({
            class: 'completed',
            type: 'checkbox',
         })
         .prependTo(statusLabel);

      taskCheckbox.checked = this.state.completed;

      const title = createElement('h3')
         .setContent(this.state.title)
         .appendTo(this);
      const date = createElement('div')
         .setContent(this.state.date)
         .appendTo(this);
      const project = createElement('div')
         .setContent(
            `${this.state.projectCategory} \\ ${this.state.taskProject}`
         )
         .appendTo(this);

      const deleteBtn = createElement('button')
         .setContent('delete')
         .setAttributes({ class: 'delete' })
         .appendTo(this);

      const editBtn = createElement('button')
         .setContent('edit')
         .setAttributes({ class: 'edit' })
         .appendTo(this);
   }

   setStatus(statusLabel) {
      const today = new Date().setHours(0, 0, 0);
      const taskDate = new Date(this.state.date).setHours(0, 0, 1);

      if (this.state.completed) {
         statusLabel.setContent('Completed');
      } else if (!this.state.completed && taskDate < today) {
         statusLabel.setContent('Overdue');
      } else {
         statusLabel.setContent('Planned');
      }
   }

   addEventListeners() {
      this.addEventListener('click', (ev) => {
         if (
            ev.target.classList.contains('delete') &&
            !this.getAttribute('edit')
         ) {
            this.remove();
            pubsub.publish('task:delete', this.state.id);
         }
         if (ev.target.classList.contains('completed')) {
            this.state.completed = this.querySelector('.completed').checked;
            pubsub.publish('task:update', this.state);
         }
         if (
            ev.target.classList.contains('edit') &&
            !document.querySelector('task-details')
         ) {
            this.setAttribute('edit', true);
            pubsub.publish('task:edit', this.getAttribute('task-id'));
         }
      });
   }
}

customElements.define('task-card', TaskCard);

export default TaskCard;
