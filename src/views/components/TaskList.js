import TaskCard from './TaskCard';
import createElement from '../../utils/ElementBuilder';
import AddTaskForm from './AddTaskForm';

class TaskList extends HTMLElement {
   connectedCallback() {
      this.render();
   }

   render() {
      const addTaskForm = new AddTaskForm({
         projects: this.state.projects,
         categories: this.state.categories,
         currentFilter: this.state.currentFilter,
      });
      this.prepend(addTaskForm);
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
}

customElements.define('task-list', TaskList);

export default TaskList;
