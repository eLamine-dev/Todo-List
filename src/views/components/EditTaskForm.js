import pubsub from '../../utils/PubSub';
import createElement from '../../utils/ElementBuilder';

class EditTaskForm extends HTMLFormElement {
   connectedCallback() {
      this.render();
      this.addEventListeners();
   }

   render() {
      const titleInput = createElement('input')
         .setAttributes({
            type: 'text',
            name: 'title-input',
            value: `${this.state.title}`,
         })
         .build();

      const dateInput = createElement('input')
         .setAttributes({
            type: 'date',
            name: 'date-input',
            value: `${this.state.date}`,
            // min: '',
         })
         .build();

      const submitBtn = createElement('button')
         .setAttributes({
            type: 'submit',
         })
         .setContent('save')
         .build();

      this.id = 'edit-task-form';
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
         title: this.elements['title-input'].value,
         date: this.elements['date-input'].value,
      };
      pubsub.publish('task:add', formData);
   }
}
customElements.define('Edit-task-form', EditTaskForm, { extends: 'form' });
export default EditTaskForm;
