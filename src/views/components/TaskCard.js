import createElement from '../../utils/ElementBuilder';
import pubsub from '../../utils/PubSub';

class TaskCard extends HTMLElement {
   connectedCallback() {
      this.render();
      this.addEventListeners();
   }

   render() {
      this.setAttribute('task-id', `${this.state.id}`);

      const statusDiv = createElement('div')
         .setAttributes({ class: 'status' })
         .appendTo(this);

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

      const checkboxLabel = createElement('label')
         .setAttributes({
            class: 'checkbox-label',
            completed: this.state.completed,
         })
         .appendTo(this);

      this.setStatus(statusDiv, checkboxLabel);

      const checkbox = createElement('input')
         .setAttributes({
            class: 'completed-checkbox',
            type: 'checkbox',
         })
         .prependTo(checkboxLabel);

      const checkmark = createElement('div')
         .setAttributes({ class: 'checkmark' })
         .appendTo(checkboxLabel);

      checkbox.checked = this.state.completed;

      const editBtn = createElement('button')
         .appendIcon('fa-solid fa-pen-to-square')
         .setAttributes({ class: 'edit-btn' })
         .appendTo(this);

      const deleteBtn = createElement('button')
         .setAttributes({ class: 'delete', type: 'button' })
         .prependIcon('fa-regular fa-calendar-xmark')
         .appendTo(this);
   }

   setStatus(statusDiv, checkboxLabel) {
      const today = new Date().setHours(0, 0, 0);
      const taskDate = new Date(this.state.date).setHours(0, 0, 1);

      if (this.state.completed) {
         statusDiv.setContent('Completed');
         checkboxLabel.setAttribute('completed', true);
      } else if (!this.state.completed && taskDate < today) {
         statusDiv.setContent('Overdue');
      } else {
         statusDiv.setContent('Planned');
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
         } else if (ev.target.classList.contains('completed-checkbox')) {
            this.state.completed = this.querySelector(
               '.completed-checkbox'
            ).checked;

            pubsub.publish('task:update', this.state);
         } else if (
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
