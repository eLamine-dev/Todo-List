import pubsub from '../../utils/PubSub';
import createElement from '../../utils/ElementBuilder';

class AddTaskForm extends HTMLFormElement {
   connectedCallback() {
      this.render();
      this.addEventListeners();
   }

   render() {
      const titleInput = createElement('input').setAttributes({
         type: 'text',
         name: 'title-input',
      });
      const dateInput = createElement('input').setAttributes({
         type: 'date',
         name: 'date-input',
         // min: '',
      });
      dateInput.valueAsDate = new Date();

      const submitBtn = createElement('button')
         .setAttributes({
            type: 'submit',
            name: 'save-task',
         })
         .setContent('save');
      this.id = 'new-task-form';
      [titleInput, dateInput, submitBtn].forEach((child) => {
         this.appendChild(child);
      });
   }

   addEventListeners() {
      this.addEventListener('submit', (ev) => {
         ev.preventDefault();
         this.passData();
      });
   }

   passData() {
      const formData = {
         dataType: 'task',
         title: this.elements['title-input'].value,
         date: this.elements['date-input'].value,
      };
      pubsub.publish('task:add', formData);
   }
}
customElements.define('add-task-form', AddTaskForm, { extends: 'form' });
export default AddTaskForm;
