import pubsub from '../../utils/PubSub';
import createElement from '../../utils/ElementBuilder';

class AddTaskForm extends HTMLFormElement {
   connectedCallback() {
      this.render();
      this.addEventListeners();
   }

   render() {
      const titleInput = createElement('input')
         .setAttributes({
            type: 'text',
            name: 'title-input',
         })
         .build();

      const dateInput = createElement('input')
         .setAttributes({
            type: 'date',
            name: 'date-input',
         })
         .build();

      const submitBtn = createElement('button')
         .setAttributes({
            type: 'submit',
         })
         .setContent('save')
         .build();

      this.id = 'new-task-form';
      this.appendChild(titleInput);
      this.appendChild(dateInput);
      this.appendChild(submitBtn);
   }

   addEventListeners() {
      this.addEventListener('submit', (ev) => {
         ev.preventDefault();
         this.passData();
      });
   }

   passData() {
      const formData = {
         title: this.elements['title-input'].value,
         date: this.elements['date-input'].value,
      };
      pubsub.publish('task:add', formData);
   }
}
customElements.define('add-task-form', AddTaskForm, { extends: 'form' });
export default AddTaskForm;
