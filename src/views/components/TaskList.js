import { TaskCard } from './TaskCard';
import createElement from '../../utils/ElementBuilder';

class TaskList extends HTMLElement {
   constructor() {
      super();
      document.getElementById('task-list').appendChild(this);
   }

   connectedCallback() {
      this.render();
   }

   render() {
      //   list.forEach((task) => {
      //      console.log(task);
      //      this.addTask(task);
      //   });
   }

   addTask(task) {
      const newCard = createElement('task-card').build();
      newCard.setData(task);

      this.appendChild(newCard);
   }

   deleteTask(taskId) {}

   MarkAsDone(taskId) {}

   updateTask(taskId) {}
}

customElements.define('task-list', TaskList);

export default TaskList;
