import pubsub from '../utils/PubSub';
import TaskModel from '../models/TaskModel';
import TaskList from '../views/components/TaskList';
import createElement from '../utils/ElementBuilder';

class TaskController {
   constructor() {
      this.model = new TaskModel();
      this.view = createElement('task-list')
         .setState(this.model.getAllItems())
         .build();

      [
         { id: '1685636158744', title: 'afgjsdf', date: '2023-06-01' },
         { id: '1685636158744', title: 'asddfggf', date: '2023-06-01' },
         { id: '1685636158744', title: 'asdj;l;f', date: '2023-06-01' },
      ].forEach((task) => {
         this.model.addItem(task);
      });

      pubsub.subscribe('task:add', this.handleAddTask.bind(this));
      pubsub.subscribe('task:remove', this.handleRemoveTask.bind(this));
      pubsub.subscribe('task:update', this.handleRemoveTask.bind(this));
   }

   handleAddTask(data) {
      const newTask = TaskModel.createItem(data);
      this.model.addItem(newTask);
      this.view.renderTask(newTask);
   }

   handleRemoveTask(taskId) {
      this.model.deleteItem(taskId);
      // this.view.addTask(newTask);
   }

   handleUpdateTask(taskId, newDta) {
      this.model.updateItem(taskId, newDta);
   }

   handleSelectTask(taskId) {
      const taskDetails = createElement('task-details')
         .setState(this.model.getItemById(taskId))
         .build();
      // to be continued
   }
}

export default TaskController;
