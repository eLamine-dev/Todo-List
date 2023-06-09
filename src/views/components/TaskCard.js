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

   addEventListeners() {
      this.addEventListener('click', (ev) => {
         if (document.querySelector('task-card[edit=true]')) return;
         if (ev.target.classList.contains('delete')) {
            this.remove();
            pubsub.publish('task:delete', this.state.id);
         }
         if (ev.target.classList.contains('done')) {
            pubsub.publish('task:update', this.state.id);
         }
         if (ev.target.classList.contains('edit')) {
            this.setAttributes({ edit: true });
            pubsub.publish('task:edit', this.getAttribute('task-id'));
         }
      });
   }
}

customElements.define('task-card', TaskCard);

export default TaskCard;
