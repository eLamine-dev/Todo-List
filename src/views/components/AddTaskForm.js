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

      const selectProject = createElement('select').setAttributes({
         class: 'select-project',
      });

      this.id = 'new-task-form';
      [titleInput, dateInput, submitBtn, selectProject].forEach((child) => {
         this.appendChild(child);
      });
   }

   setupSelectList(category, categoryProjects) {
      const optGrp = createElement('optgroup').setAttributes({
         label: category.title,
      });
      categoryProjects.forEach((project) => {
         const option = createElement('option').setAttributes({
            value: project.title,
         });
         optGrp.appendChild(option);
      });
      // selectProject.appendChild(optGrp);
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
