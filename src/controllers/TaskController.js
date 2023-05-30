import pubsub from '../utils/PubSub';
import TaskModel from '../models/TaskModel';
import TaskList from '../views/components/TaskList';
import TaskDetails from '../views/components/TaskDetails';
import createElement from '../utils/ElementBuilder';

class TaskController {
   constructor() {
      this.model = new TaskModel();
      this.view = createElement('task-list')
         .setState(this.model.getAllItems())
         .build();

      pubsub.subscribe('task:add', this.handleAddTask.bind(this));
      pubsub.subscribe('task:remove', this.handleRemoveTask.bind(this));
      pubsub.subscribe('task:update', this.handleRemoveTask.bind(this));
   }

   handleAddTask(data) {
      const newTask = TaskModel.createItem(data);
      this.model.addItem(newTask);
      this.view.addTask(newTask);
   }

   handleRemoveTask(taskId) {
      this.model.deleteItem(taskId);
      // this.view.addTask(newTask);
   }

   handleUpdateTask(taskId, newDta) {
      this.model.updateItem(taskId, newDta);
   }
}

export default TaskController;
