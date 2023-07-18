import pubsub from '../../utils/PubSub';
import createElement from '../../utils/ElementBuilder';
import { th } from 'date-fns/locale';

class AddTaskForm extends HTMLFormElement {
   constructor(state) {
      super();
      this.state = state;
   }

   connectedCallback() {
      this.render();
      this.addEventListeners();
   }

   render() {
      this.id = 'new-task-form';

      const closeFormBtn = createElement('button')
         .setAttributes({
            type: 'button',
            class: 'close-form',
            name: 'close-form',
         })
         .appendIcon('fa-sharp fa-solid fa-xmark')
         .appendTo(this);

      const titleInput = createElement('input')
         .setAttributes({
            type: 'text',
            name: 'title-input',
            placeholder: 'Create a task',
            maxlength: '50',
            minlength: '5',
         })
         .appendTo(this);

      const openFormBtn = createElement('button')
         .setAttributes({
            type: 'button',
            class: 'open-form',
            name: 'open-form',
         })

         .setContent(' Add Task')
         .prependIcon('fa-regular fa-calendar-plus')
         .appendTo(this);

      const hiddenInputs = createElement('fieldset')
         .setAttributes({ class: 'hidden-inputs' })
         .appendTo(this);

      const descriptionInput = createElement('textarea')
         .setAttributes({
            type: 'text',
            name: 'description-input',
            placeholder: 'Enter a description',
            maxlength: '300',
            rows: '3',
         })
         .appendTo(hiddenInputs);

      const selectionInputs = createElement('div')
         .setAttributes({
            class: 'selection-inputs',
         })
         .appendTo(hiddenInputs);

      const dateInput = createElement('input')
         .setAttributes({
            type: 'date',
            name: 'date-input',
            min: new Date().toISOString().split('T')[0],
            value: new Date().toISOString().split('T')[0],
         })
         .appendTo(selectionInputs);

      const selectProject = createElement('select')
         .setAttributes({
            class: 'select-project',
            name: 'select-project',
         })
         .appendTo(selectionInputs);

      const selectPriority = createElement('select')
         .setAttributes({
            class: 'select-priority',
            name: 'select-priority',
         })
         .appendTo(selectionInputs);

      const submitBtn = createElement('button')
         .setAttributes({
            type: 'submit',
            name: 'save-task',
         })
         .setContent('Save')
         .prependIcon('fa-regular fa-calendar-check')
         .appendTo(hiddenInputs);

      this.setupSelectProjectList(selectProject);
      this.setUpPriorities(selectPriority);
      this.setAttribute('expanded', false);
   }

   expand() {
      this.setAttribute('expanded', true);
      this.querySelector('input[name=title-input]').setAttribute(
         'placeholder',
         'Title'
      );
   }

   contract() {
      this.setAttribute('expanded', false);
      this.reset();
      this.querySelector('input[name=title-input]').setAttribute(
         'placeholder',
         'Create a task'
      );
   }

   setupSelectProjectList(selectProject) {
      this.state.categories.forEach((category) => {
         const optGrp = createElement('optgroup').setAttributes({
            label: category.title,
            id: category.id,
         });

         const categoryProjects = this.state.projects.filter(
            (project) => project.categoryId === category.id
         );
         categoryProjects.forEach((project) => {
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

   setUpPriorities(selectPriority) {
      const priorities = ['1', '2', '3', '4'];
      priorities.forEach((priority) => {
         const option = createElement('option')
            .setAttributes({
               class: 'priority',
               id: priority,
            })
            .prependIcon('fa-solid fa-flag')
            .setContent(`Priority ${priority}`)
            .appendTo(selectPriority);
      });
   }

   addEventListeners() {
      this.addEventListener('submit', (ev) => {
         ev.preventDefault();
         this.passData();
         this.contract();
      });

      this.querySelector('input[name=title-input]').addEventListener(
         'focus',
         () => {
            this.expand();
         }
      );

      this.addEventListener('click', (ev) => {
         if (ev.target.name === 'open-form') {
            this.expand();
         } else if (ev.target.classList.contains('close-form')) {
            this.contract();
         }
      });
   }

   passData() {
      const selectProject = this.elements['select-project'];
      const selectPriority = this.elements['select-priority'];

      const formData = {
         dataType: 'task',
         completed: false,
         title: this.elements['title-input'].value,
         description: this.elements['description-input'].value,
         date: this.elements['date-input'].value,
         projectId: selectProject.options[selectProject.selectedIndex].id,
         priority: selectPriority.options[selectPriority.selectedIndex].id,
         categoryId:
            selectProject.options[selectProject.selectedIndex].parentElement.id,
      };

      pubsub.publish('task:add', formData);
   }
}
customElements.define('add-task-form', AddTaskForm, { extends: 'form' });
export default AddTaskForm;
