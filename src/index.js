import { Task } from './task';

import pubsub from './pubSub';

import taskForm from './views/taskForm';

import { todoList } from './todoList';

pubsub.subscribe('stateUpdate', newState);

function newState(state) {
   console.log(state);
}
