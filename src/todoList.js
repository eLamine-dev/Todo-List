import pubsub from './pubSub';
import { Task } from './task';

const state = [];
const todoList = {
   createTask: () => {
      pubsub.subscribe('taskSubmitted', todoList.add);
   },

   add: (formData) => {
      const newTask = Task(formData);
      state.push(newTask);
      pubsub.publish('stateUpdate', state);
   },
};

pubsub.subscribe('taskSubmitted', todoList.add);

export { todoList };
