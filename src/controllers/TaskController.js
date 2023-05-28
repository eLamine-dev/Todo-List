import pubSub from '../utils/PubSub';
import TaskModel from '../models/TaskModel';
import TaskList from '../views/components/TaskList';

class TaskController {
   constructor() {
      this.model = new TaskModel();
      this.view = new TaskList();

      pubSub.subscribe('task:add', this.handleAddTask.bind(this));
      // pubSub.subscribe('task:remove', this.handleRemoveTask.bind(this));
      // pubSub.subscribe('task:update', this.handleRemoveTask.bind(this));
   }

   handleAddTask(data) {
      const newTask = TaskList.createItem(data);
      this.model.addItem(newTask);
      this.view.addTask(newTask);
   }

   handleRemoveTask(taskId) {}

   handleUpdateTask(taskId) {}
}

export default TaskController;
