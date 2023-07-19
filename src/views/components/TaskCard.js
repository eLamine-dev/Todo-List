import createElement from '../../utils/ElementBuilder';
import pubsub from '../../utils/PubSub';

class TaskCard extends HTMLElement {
   connectedCallback() {
      this.render();
      this.addEventListeners();
   }

   render() {
      this.setAttribute('task-id', `${this.state.id}`);

      const tags = createElement('div')
         .setAttributes({ class: 'tags' })
         .appendTo(this);

      const category = createElement('div')
         .setContent(this.state.projectCategory)
         .capitalFirstLetter()
         .setAttributes({ class: 'tag' })
         .appendTo(tags);

      const project = createElement('span')
         .setContent(this.state.taskProject)
         .capitalFirstLetter()
         .setAttributes({ class: 'tag' })
         .appendTo(tags);

      const date = createElement('div')
         .setContent(this.state.date)
         .setAttributes({ class: 'tag' })
         .appendTo(tags);

      const priority = createElement('div')
         .setContent(`Priority ${this.state.priority}`)
         .prependIcon('fa-regular fa-flag')
         .setAttributes({ class: 'tag', priority: this.state.priority })
         .appendTo(tags);

      const titleLine = createElement('div')
         .setAttributes({ class: 'title-line' })
         .appendTo(this);

      const title = createElement('h3')
         .setContent(this.state.title)
         .capitalFirstLetter()
         .setAttributes({ class: 'title' })
         .appendTo(titleLine);

      const statusDiv = createElement('div')
         .setAttributes({ class: 'status' })
         .appendTo(titleLine);

      const description = createElement('p')
         .setContent(this.state.description)
         .capitalFirstLetter()
         .setAttributes({ class: 'description' })
         .appendTo(this);

      const buttons = createElement('div')
         .setAttributes({ class: 'buttons' })
         .appendTo(this);

      const checkboxContainer = createElement('label')
         .setAttributes({
            class: 'checkbox-label',
            completed: this.state.completed,
         })
         .appendTo(buttons);

      this.setStatus(statusDiv, checkboxContainer);

      const checkbox = createElement('input')
         .setAttributes({
            class: 'completed-checkbox',
            type: 'checkbox',
         })
         .prependTo(checkboxContainer);

      const checkmark = createElement('div')
         .setAttributes({ class: 'checkmark' })
         .appendTo(checkboxContainer);

      checkbox.checked = this.state.completed;

      const editBtn = createElement('button')
         .appendIcon('fa-solid fa-pen-to-square')
         .setAttributes({ class: 'edit-btn' })
         .appendTo(buttons);

      const deleteBtn = createElement('button')
         .setAttributes({ class: 'delete', type: 'button' })
         .prependIcon('fa-regular fa-calendar-xmark')
         .appendTo(buttons);
   }

   setStatus(statusDiv, checkboxLabel) {
      const today = new Date().setHours(0, 0, 0);
      const taskDate = new Date(this.state.date).setHours(0, 0, 1);

      if (this.state.completed) {
         statusDiv.setContent('Completed');
         statusDiv.setAttribute('status', 'completed');
         checkboxLabel.setAttribute('completed', true);
      } else if (!this.state.completed && taskDate < today) {
         statusDiv.setContent('Overdue');
         statusDiv.setAttribute('status', 'overdue');
         checkboxLabel.setAttribute('completed', false);
      } else {
         statusDiv.setContent('Pending');
         statusDiv.setAttribute('status', 'pending');
      }
   }

   addEventListeners() {
      this.addEventListener('click', (ev) => {
         if (
            ev.target.classList.contains('delete') &&
            !this.getAttribute('active')
         ) {
            this.remove();
            pubsub.publish('task:delete', this.state.id);
         } else if (ev.target.classList.contains('completed-checkbox')) {
            this.state.completed = this.querySelector(
               '.completed-checkbox'
            ).checked;

            pubsub.publish('task:update', this.state);
         } else if (
            ev.target.classList.contains('edit-btn') &&
            !document.querySelector('task-details')
         ) {
            this.setAttribute('active', true);
            pubsub.publish('task:edit', this.getAttribute('task-id'));
         }
      });
   }
}

customElements.define('task-card', TaskCard);

export default TaskCard;
