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
            name: 'description-input',
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

      this.setupSelectProjectList(form);
      this.setUpPriorities(form);
      this.setupChecklist(form);

      const submitBtn = createElement('button')
         .setAttributes({
            type: 'submit',
            name: 'save-task',
         })
         .setContent('Save')
         .appendTo(form);

      const closeBtn = createElement('button')
         .setAttributes({
            class: 'close',
            type: 'button',
            name: 'cancel',
         })
         .setContent('X')
         .appendTo(form);

      const header = createElement('header')
         .setContent('ToDo')
         .setAttributes({ class: 'header' })
         .prependTo(this);
   }

   addEventListeners() {
      this.querySelector('form').addEventListener('submit', (ev) => {
         if (this.querySelector('[edit="true"]')) return;
         ev.preventDefault();
         this.passData();
         this.remove();
         document
            .querySelector('task-card[active=true]')
            .setAttribute('active', false);
      });

      this.addEventListener('click', (ev) => {
         if (this.querySelector('[edit="true"]')) return;
         if (
            ev.target.closest('[data-type=checklist-item]') &&
            !ev.target.closest('.item-buttons')
         ) {
            const item = ev.target.closest('[data-type=checklist-item]');
            item.toggleAttribute('checked');
         }

         if (ev.target.closest('.close')) {
            document
               .querySelector('task-card[active=true]')
               .setAttribute('active', false);
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

      console.log(checklistItems);

      const formData = {
         id: this.state.task.id,
         title: form.elements['title-input'].value,
         description: form.elements['description-input'].value,
         date: form.elements['date-input'].value,
         projectId: selectProject.options[selectProject.selectedIndex].id,
         priority: selectPriority.options[selectPriority.selectedIndex].id,
         categoryId:
            selectProject.options[selectProject.selectedIndex].parentElement.id,
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
      console.log(formData.checklist);

      pubsub.publish('task:update', formData);
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
