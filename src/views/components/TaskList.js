import { TaskCard } from './TaskCard';
import BaseComponent from './BaseComponent';

class TaskList extends BaseComponent {
   constructor() {
      super();
      document.getElementById('task-list').appendChild(this);
   }

   render() {
      //   list.forEach((task) => {
      //      console.log(task);
      //      this.addTask(task);
      //   });
   }

   addTask(task) {
      const newCard = document.createElement('task-card');
      newCard.innerText = task.title;
      this.appendChild(newCard);
   }

   deleteTask(taskId) {}

   MarkAsDone(taskId) {}

   EditTask(taskId) {}
}

customElements.define('task-list', TaskList);

export default TaskList;
