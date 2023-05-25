import './assets/css/reset.css';
import './assets/css/style.css';

import TaskController from './controllers/TaskController';
import pubsub from './utils/PubSub';

import AddTaskForm from './views/components/AddTaskForm';

let addTaskForm = new AddTaskForm();

document.getElementById('task-list').appendChild(addTaskForm);

const taskController = new TaskController();

// function newState(data) {
//    taskModel.addItem(data);
//    console.log(taskModel.getAllItems());
// }
