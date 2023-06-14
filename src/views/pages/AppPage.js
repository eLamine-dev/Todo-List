import pubsub from '../../utils/PubSub';
import createElement from '../../utils/ElementBuilder';
import TaskDetails from '../components/TaskDetails';

class AppPage extends HTMLElement {
   connectedCallback() {
      pubsub.subscribe('task:select', this.openTaskDetails.bind(this));
   }

   openTaskDetails(task) {
      if (document.getElementById('task-details')) this.lastChild.remove();
      const taskDetails = createElement('task-details').setState(task);
      this.appendChild(taskDetails);
   }
}

customElements.define('app-page', AppPage);

export default AppPage;
