import './assets/css/reset.css';
import './assets/css/style.css';

import pubsub from './utils/PubSub';

import { newTasForm } from './views/components/NewTaskForm';
import TaskController from './controllers/TaskController';

const taskController = new TaskController();

// function newState(data) {
//    taskModel.addItem(data);
//    console.log(taskModel.getAllItems());
// }
