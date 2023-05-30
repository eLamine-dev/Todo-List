import pubSub from '../utils/PubSub';
import TaskModel from '../models/TaskModel';
import TaskList from '../views/components/TaskList';
import EditTaskForm from '../views/components/TaskDetails';

class TaskController {
   constructor() {
      this.model = new TaskModel();
      this.view = new TaskList();

      pubSub.subscribe('task:add', this.handleAddTask.bind(this));
      pubSub.subscribe('task:remove', this.handleRemoveTask.bind(this));
      pubSub.subscribe('task:update', this.handleRemoveTask.bind(this));
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
