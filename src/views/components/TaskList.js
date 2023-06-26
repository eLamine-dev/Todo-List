import TaskCard from './TaskCard';
import createElement from '../../utils/ElementBuilder';
import AddTaskForm from './AddTaskForm';

class TaskList extends HTMLElement {
   connectedCallback() {
      this.render();
   }

   render() {
      this.state.tasks.forEach((task) => {
         this.renderTask(task);
      });
   }

   renderTask(task) {
      const taskProject = this.state.projects.find(
         (project) => project.id === task.projectId
      );
      task.projectTitle = taskProject.title;
      const newCard = createElement('task-card').setState(task);
      this.appendChild(newCard);
      console.log(taskProject);
   }

   deleteTask(taskId) {}

   MarkAsDone(taskId) {}

   updateTask(taskId) {}
}

customElements.define('task-list', TaskList);

export default TaskList;
