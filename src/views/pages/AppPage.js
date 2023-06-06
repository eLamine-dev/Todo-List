import pubsub from '../../utils/PubSub';
import createElement from '../../utils/ElementBuilder';
import TaskDetails from '../components/TaskDetails';
import sideBar from '../components/SideBar';

class AppPage extends HTMLElement {
   constructor(categoriesList, taskList) {
      super();
      this.render(categoriesList, taskList);
      pubsub.subscribe('task:select', this.openTaskDetails.bind(this));
   }

   render(categoriesList, taskList) {
      this.id = 'app';

      const sideBar = createElement('side-bar');
      sideBar.appendChildren(categoriesList);

      this.appendChild(sideBar);
      this.appendChild(taskList);
   }

   openTaskDetails(task) {
      if (document.getElementById('task-details')) this.lastChild.remove();
      const taskDetails = createElement('task-details').setState(task).build();
      this.appendChild(taskDetails);
   }
}

customElements.define('app-page', AppPage);

export default AppPage;
