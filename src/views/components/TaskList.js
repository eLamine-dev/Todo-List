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
      });
      this.prepend(addTaskForm);
      this.state.tasks.forEach((task) => {
         const taskCard = this.makeTaskCard(task);
         this.appendChild(taskCard);
      });

      const header = createElement('header')
         .setContent('ToDo')
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

      if (!taskProject) {
         return;
      }

      const projectCategory = this.state.categories.find(
         (category) => category.id === taskProject.categoryId
      );

      if (!projectCategory) {
         return;
      }

      Object.assign(task, {
         taskProject: taskProject.title,
         projectCategory: projectCategory.title,
      });
      const newCard = createElement('task-card').setState(task);

      return newCard;
   }
}

customElements.define('task-list', TaskList);

export default TaskList;
