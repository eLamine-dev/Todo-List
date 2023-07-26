import TaskCard from './TaskCard';
import createElement from '../../utils/ElementBuilder';
import AddTaskForm from './AddTaskForm';
import pubsub from '../../utils/PubSub';

class TaskList extends HTMLElement {
   connectedCallback() {
      this.render();
      this.addEventListeners();
   }

   render() {
      const addTaskForm = new AddTaskForm({
         projects: this.state.projects,
         categories: this.state.categories,
         currentFilter: this.state.currentFilter,
      });
      this.prepend(addTaskForm);

      const sortingSection = createElement('div')
         .setAttributes({ class: 'sorting-section' })
         .setContent('Sort by:')
         .appendTo(this);
      this.addSortingOptions(sortingSection);

      this.state.tasks.forEach((task) => {
         const taskCard = this.makeTaskCard(task);
         if (!taskCard) {
            return;
         }
         this.appendChild(taskCard);
      });

      const currentFilter =
         document.querySelector('[current-filter]').textContent;

      const header = createElement('header')
         .setContent(`#${currentFilter}`)
         .setAttributes({ class: 'header' })
         .prependTo(this);
   }

   addEventListeners() {
      const sortingOptions = this.querySelectorAll(
         'input[name=sorting-option]'
      );
      sortingOptions.forEach((option) => {
         option.addEventListener('change', (event) => {
            if (event.target.checked) {
               pubsub.publish('sorting-changed', event.target.value);
            }
         });
      });
   }

   updateCard(task) {
      const updatedCard = this.makeTaskCard(task);
      const existingCard = this.querySelector(`task-card[task-id=${task.id}]`);

      this.replaceChild(updatedCard, existingCard);
   }

   makeTaskCard(task) {
      const taskProject = this.state.projects.find(
         (project) => project.id === task.projectId
      );
      if (taskProject) {
         const projectCategory = this.state.categories.find(
            (category) => category.id === taskProject.categoryId
         );

         Object.assign(task, {
            taskProject: taskProject.title,
            projectCategory: projectCategory.title,
         });
      } else {
         Object.assign(task, {
            taskProject: '',
            projectCategory: '',
         });
      }
      const newCard = createElement('task-card').setState(task);

      return newCard;
   }

   deleteCard(taskId) {
      const card = this.querySelector(`task-card[task-id=${taskId}]`);
      this.removeChild(card);
   }

   addSortingOptions(sortingSection) {
      const sortingOptions = ['priority', 'date'];
      sortingOptions.forEach((option) => {
         const container = createElement('div').setAttributes({
            class: 'sorting-option',
         });

         const choiceInput = createElement('input')
            .setAttributes({
               type: 'radio',
               id: option,
               name: 'sorting-option',
               value: option,
            })
            .appendTo(container);

         if (choiceInput.value === this.state.currentSort) {
            choiceInput.checked = true;
         }

         createElement('label')
            .setAttributes({ for: option })
            .setContent(option)
            .capitalFirstLetter()
            .appendTo(container);

         sortingSection.appendChild(container);
      });
   }
}
customElements.define('task-list', TaskList);

export default TaskList;
