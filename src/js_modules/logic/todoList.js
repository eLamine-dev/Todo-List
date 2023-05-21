import pubsub from '../pubSub';
import { TaskBuilder } from './task';

const state = [];

const todoList = {
   addTask: (formData) => {
      const newTask = TaskBuilder({}, formData);
      state.push(newTask);
      pubsub.publish('stateUpdate', state);
   },

   editTask: (id, formData) => {
      const taskToEdit = state.find((task) => task.id === id);
      const editedTask = TaskBuilder(taskToEdit, formData);

      pubsub.publish('stateUpdate', state);
   },
};

pubsub.subscribe('taskSubmitted', todoList.addTask);

export { todoList };
