import pubsub from '../../utils/PubSub';
import createElement from '../../utils/ElementBuilder';
import TaskDetails from '../components/TaskDetails';

class AppPage extends HTMLElement {
   connectedCallback() {
      this.render();
      pubsub.subscribe('task:select', this.openTaskDetails.bind(this));
   }

   render() {
      this.setAttribute('id', 'app');
   }

   openTaskDetails(task) {
      if (document.getElementById('task-details')) this.lastChild.remove();
      const taskDetails = createElement('task-details').setState(task).build();
      this.appendChild(taskDetails);
   }
}

customElements.define('app-page', AppPage);

export default AppPage;
