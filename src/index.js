import Task from './taskModal';

import pubsub from './pubSub';

import taskForm from './views/taskForm';

taskForm.listen();

pubsub.subscribe('taskSubmitted', createNewTask);

function createNewTask(formData) {
   console.log(formData);
}
