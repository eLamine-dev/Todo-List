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
         this.renderTask(task);
      });
   }

   renderTask(task) {
      const taskProject = this.state.projects.find(
         (project) => project.id === task.projectId
      );
      const projectCategory = this.state.categories.find(
         (category) => category.id === taskProject.categoryId
      );
      Object.assign(task, {
         taskProject: taskProject.title,
         projectCategory: projectCategory.title,
      });
      const newCard = createElement('task-card').setState(task);
      this.appendChild(newCard);
   }
}

customElements.define('task-list', TaskList);

export default TaskList;
