import pubsub from './pubSub';
import { Task } from './task';

const todoList = {
   state: [],

   createTask: () => {
      pubsub.subscribe('taskSubmitted', todoList.add);
   },

   add: (formData) => {
      const newTask = Task(formData);
      todoList.state.push(newTask);
      pubsub.publish('stateUpdate', todoList.state);
   },
};

pubsub.subscribe('taskSubmitted', todoList.add);

export { todoList };
