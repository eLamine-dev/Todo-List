import pubsub from '../../utils/PubSub';
import createElement from '../../utils/ElementBuilder';
import TaskDetails from '../components/TaskDetails';

class AppPage extends HTMLElement {
   openTaskDetails(taskEditState) {
      if (document.getElementById('task-details')) {
         document.getElementById('task-details').setState(taskEditState);
         return;
      }
      const taskDetails = createElement('task-details')
         .setState(taskEditState)
         .appendTo(this);
   }

   toggleSideBar() {
      this.toggleAttribute('sidebar-open');
   }
}

customElements.define('app-page', AppPage);

export default AppPage;
