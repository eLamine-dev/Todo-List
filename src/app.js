import './assets/css/reset.css';
import './assets/css/style.css';

import createElement from './utils/ElementBuilder';
import pubsub from './utils/PubSub';

import AddTaskForm from './views/components/AddTaskForm';
import TaskDetails from './views/components/TaskDetails';
import AppPage from './views/pages/AppPage';

document.addEventListener('DOMContentLoaded', () => {
   const appPage = new AppPage();

   document.getElementById('app-container').appendChild(appPage);
});

// document.addEventListener('DOMContentLoaded', () => {
//    let addTaskForm = new AddTaskForm();

//    document.getElementById('task-list').appendChild(addTaskForm);
//    const taskController = new TaskController();
// });

// pubsub.subscribe('task:select', openTaskDetails);

// function openTaskDetails(state) {
//    const taskDetails = createElement('task-details').setState(state).build();
//    const editBar = document.getElementById('edit-side-bar');
//    editBar.innerHTML = '';
//    editBar.appendChild(taskDetails);
// }
