import './css/reset.css';
import './css/style.css';

import pubsub from './js_modules/pubSub';

import taskForm from './js_modules/dom/taskForm';

import { todoList } from './js_modules/logic/todoList';

pubsub.subscribe('stateUpdate', newState);

function newState(state) {
   console.log(state);
}
