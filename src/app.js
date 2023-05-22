import './css/reset.css';
import './css/style.css';

import pubsub from './utils/pubSub';

import taskForm from './js_modules/views/taskForm';

import { todoList } from './models/todoList';

pubsub.subscribe('stateUpdate', newState);

function newState(state) {
   console.log(state);
}
