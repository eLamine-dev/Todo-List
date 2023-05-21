function TaskBuilder(task, data = {}) {
   const newTask = Object.assign(task, data);

   return newTask;
}

export { TaskBuilder };
