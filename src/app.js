import './assets/css/reset.css';
import './assets/css/style.css';

import TaskController from './controllers/TaskController';
import pubsub from './utils/PubSub';

import AddTaskForm from './views/components/AddTaskForm';

document.addEventListener('DOMContentLoaded', () => {
   let addTaskForm = new AddTaskForm();

   document.getElementById('task-list').appendChild(addTaskForm);
   const taskController = new TaskController();
});
