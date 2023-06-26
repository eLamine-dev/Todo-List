import pubsub from '../../utils/PubSub';
import createElement from '../../utils/ElementBuilder';

class AddTaskForm extends HTMLFormElement {
   constructor(categorizedProjects) {
      super();
      this.categorizedProjects = categorizedProjects;
   }

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
         .appendTo(this);
      const dateInput = createElement('input')
         .setAttributes({
            type: 'date',
            name: 'date-input',
            // min: '',
         })
         .appendTo(this);
      dateInput.valueAsDate = new Date();

      const submitBtn = createElement('button')
         .setAttributes({
            type: 'submit',
            name: 'save-task',
         })
         .setContent('save')
         .appendTo(this);

      this.setupSelectProjectList();

      this.setUpPriorities();

      this.id = 'new-task-form';
   }

   setupSelectProjectList() {
      const selectProject = createElement('select')
         .setAttributes({
            class: 'select-project',
            name: 'select-project',
         })
         .appendTo(this);
      this.categorizedProjects.forEach((category) => {
         const optGrp = createElement('optgroup').setAttributes({
            label: category.category.title,
         });
         category.categoryProjects.forEach((project) => {
            const option = createElement('option')
               .setAttributes({
                  id: project.id,
               })
               .setContent(project.title);
            optGrp.appendChild(option);
         });
         selectProject.appendChild(optGrp);
      });
   }

   setUpPriorities() {
      const selectPriority = createElement('select')
         .setAttributes({
            class: 'select-priority',
            name: 'select-priority',
         })
         .appendTo(this);
      const priorities = [1, 2, 3, 4];
      priorities.forEach((priority) => {
         const option = createElement('option')
            .setAttributes({
               id: `${priority}`,
            })
            .setContent(`Priority ${priority}`);
         selectPriority.appendChild(option);
      });
   }

   addEventListeners() {
      this.addEventListener('submit', (ev) => {
         ev.preventDefault();
         this.passData();
      });
   }

   passData() {
      const selectProject = this.elements['select-project'];
      const selectPriority = this.elements['select-priority'];
      const formData = {
         dataType: 'task',
         title: this.elements['title-input'].value,
         date: this.elements['date-input'].value,
         projectId: selectProject.options[selectProject.selectedIndex].id,
         priority: selectPriority.options[selectPriority.selectedIndex].id,
      };
      pubsub.publish('task:add', formData);
      console.log(formData);
   }
}
customElements.define('add-task-form', AddTaskForm, { extends: 'form' });
export default AddTaskForm;
