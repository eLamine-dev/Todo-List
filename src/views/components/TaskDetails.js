import createElement from '../../utils/ElementBuilder';
import ExpandableList from './ExpandableList';

class TaskDetails extends HTMLElement {
   connectedCallback() {
      this.render();
      this.addEventListeners();
   }

   render() {
      this.id = 'task-details';

      const form = createElement('form')
         .setAttributes({ id: 'edit-task-form' })
         .appendTo(this);

      const title = createElement('input')
         .setAttributes({
            type: 'text',
            name: 'title-input',
            contenteditable: true,
            value: this.state.task.title,
         })
         .appendTo(form);

      const description = createElement('textarea')
         .setAttributes({
            name: 'description',
            Placeholder: 'add task description...',
         })
         .setContent(this.state.task.description)
         .appendTo(form);

      const date = createElement('input')
         .setAttributes({
            type: 'date',
            name: 'date-input',
            value: `${this.state.task.date}`,
            min: new Date().toISOString().split('T')[0],
         })
         .appendTo(form);

      const submitBtn = createElement('button')
         .setAttributes({
            type: 'submit',
            name: 'save-task',
         })
         .setContent('Save')
         .appendTo(form);

      const cancelBtn = createElement('button')
         .setAttributes({
            type: '',
            name: 'cancel',
         })
         .setContent('X')
         .appendTo(form);

      this.setupSelectProjectList(form);
      this.setUpPriorities(form);
      this.setupChecklist(form);
   }

   addEventListeners() {
      this.addEventListener('submit', (ev) => {
         ev.preventDefault();
         this.passData();
      });

      this.addEventListener('click', (ev) => {
         if (
            ev.target.closest('[data-type=checklist-item]') &&
            !ev.target.closest('.item-buttons')
         ) {
            const item = ev.target.closest('[data-type=checklist-item]');

            item.toggleAttribute('checked');
         }
      });
   }

   passData() {
      const formData = {
         title: this.elements['title-input'].value,
         date: this.elements['date-input'].value,
      };
   }

   setupSelectProjectList(form) {
      const selectProject = createElement('select')
         .setAttributes({
            class: 'select-project',
            name: 'select-project',
         })
         .appendTo(form);

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
            header: { dataType: 'checklist', title: 'Checklist' },
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
