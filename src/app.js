import './assets/css/reset.css';
import './assets/css/style.css';

import pubsub from './utils/pubSub';

import { newTasForm } from './views/components/NewTaskForm';

import TaskModel from './models/TaskModel';

pubsub.subscribe('taskSubmitted', newState);

function newState(data) {
   const taskModel = new TaskModel();
   taskModel.addItem(data);
   console.log(taskModel.getAllItems());
}
