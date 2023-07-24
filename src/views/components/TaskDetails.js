import { he } from 'date-fns/locale';
import createElement from '../../utils/ElementBuilder';
import pubsub from '../../utils/PubSub';
import ExpandableList from './ExpandableList';

class TaskDetails extends HTMLElement {
   connectedCallback() {
      this.render();
      this.addEventListeners();
   }

   render() {
      this.id = 'task-details';

      const icon = createElement('div')
         .appendIcon('fa-solid fa-file-pen')
         .setAttributes({ class: 'icon' })
         .appendTo(this);

      const form = createElement('form')
         .setAttributes({ id: 'edit-task-form' })
         .appendTo(this);

      const title = createElement('input')
         .setAttributes({
            type: 'text',
            name: 'title-input',
            value:
               this.state.task.title.charAt(0).toUpperCase() +
               this.state.task.title.slice(1),
            maxlength: '0',
            minlength: '5',
            required: '',
         })
         .appendTo(form);

      const description = createElement('textarea')
         .setAttributes({
            name: 'description-input',
            Placeholder: 'add task description...',
            maxlength: '300',
            rows: '3',
         })
         .setContent(this.state.task.description)
         .capitalFirstLetter()
         .appendTo(form);

      const date = createElement('input')
         .setAttributes({
            type: 'date',
            name: 'date-input',
            value: `${this.state.task.date}`,
         })
         .appendTo(form);

      this.setupSelectProjectList(form);
      this.setUpPriorities(form);
      this.setupChecklist(form);

      const submitBtn = createElement('button')
         .setAttributes({
            type: 'submit',
            name: 'save-task',
         })
         .setContent('Save')
         .prependIcon('fa-solid fa-floppy-disk')
         .appendTo(form);

      const header = createElement('header')
         .setContent('#Task-details')
         .setAttributes({ class: 'header' })
         .prependTo(this);

      const closeBtn = createElement('button')
         .setAttributes({
            class: 'close',
            type: 'button',
            name: 'cancel',
         })
         .appendIcon('fa-solid fa-circle-xmark')
         .appendTo(header);

      this.setAttribute('active', '');
   }

   addEventListeners() {
      this.querySelector('form').addEventListener('submit', (ev) => {
         ev.preventDefault();
         if (this.querySelector('[active]')) return;

         this.passData();
         this.remove();
      });

      this.addEventListener('click', (ev) => {
         if (this.querySelector('[active]')) return;
         if (
            ev.target.closest('[data-type="checklist-item"]') &&
            !ev.target.closest('.item-buttons')
         ) {
            const item = ev.target.closest('[data-type="checklist-item"]');
            item.toggleAttribute('checked');
         }

         if (ev.target.closest('.close')) {
            document
               .querySelector('task-card[editing]')
               .removeAttribute('editing');
            this.remove();
         }
      });
   }

   passData() {
      const form = this.querySelector('form');
      const selectProject = form.elements['select-project'];
      const selectPriority = form.elements['select-priority'];
      const checklistItems = form.querySelectorAll(
         '[data-type="checklist-item"]'
      );

      const formData = {
         id: this.state.task.id,
         title: form.elements['title-input'].value,
         description: form.elements['description-input'].value,
         date: form.elements['date-input'].value,
         projectId: selectProject.options[selectProject.selectedIndex].id,
         priority: selectPriority.options[selectPriority.selectedIndex].id,
         categoryId:
            selectProject.options[selectProject.selectedIndex].parentElement
               .id || null,
         checklist: [],
      };

      checklistItems.forEach((item) => {
         const itemData = {
            dataType: 'checklist-item',
            title: item.textContent,
            checked: item.hasAttribute('checked'),
         };
         formData.checklist.push(itemData);
      });

      pubsub.publish('task:update', formData);
   }

   setupSelectProjectList(form) {
      const selectProject = createElement('select')
         .setAttributes({
            class: 'select-project',
            name: 'select-project',
         })
         .appendTo(form);

      const noProjectOption = createElement('option')
         .setAttributes({
            value: '',
            selected: '',
         })
         .setContent('Select a project')
         .prependTo(selectProject);

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
               .setContent(project.title)
               .appendTo(optGrp);

            if (project.id === this.state.task.projectId) {
               option.setAttribute('selected', true);
               noProjectOption.removeAttribute('selected');
            }
         });

         selectProject.appendChild(optGrp);
      });
   }

   setUpPriorities(form) {
      const selectPriority = createElement('select')
         .setAttributes({
            class: 'select-priority',
            name: 'select-priority',
         })
         .appendTo(form);
      const priorities = ['1', '2', '3', '4'];
      priorities.forEach((priority) => {
         const option = createElement('option')
            .setAttributes({
               id: priority,
            })
            .setContent(`Priority ${priority}`)
            .appendTo(selectPriority);

         if (priority === this.state.task.priority) {
            option.setAttribute('selected', true);
         }
      });
   }

   setupChecklist(form) {
      const checklist = createElement('exp-list')
         .setAttributes({
            class: 'checklist',
         })
         .setState({
            header: { dataType: 'checklist', title: 'Task checklist' },
            items: { type: 'checklist-item', list: this.state.task.checklist },
         })
         .appendTo(form);

      const checklistItems = checklist.querySelectorAll(
         '[data-type=checklist-item]'
      );

      checklistItems.forEach((item) => {
         if (item.getState().checked) item.setAttribute('checked', '');
      });
   }
}

customElements.define('task-details', TaskDetails);
export default TaskDetails;
