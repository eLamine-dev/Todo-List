import TaskCard from './TaskCard';
import createElement from '../../utils/ElementBuilder';
import AddTaskForm from './AddTaskForm';

class TaskList extends HTMLElement {
   connectedCallback() {
      this.render();
   }

   render() {
      this.state.forEach((task) => {
         this.renderTask(task);
      });
   }

   renderTask(task) {
      const newCard = createElement('task-card').setState(task);
      this.appendChild(newCard);
   }

   deleteTask(taskId) {}

   MarkAsDone(taskId) {}

   updateTask(taskId) {}
}

customElements.define('task-list', TaskList);

export default TaskList;
