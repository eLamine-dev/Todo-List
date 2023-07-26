import pubsub from '../../utils/PubSub';
import createElement from '../../utils/ElementBuilder';
import TaskDetails from '../components/TaskDetails';

class AppPage extends HTMLElement {
   connectedCallback() {
      this.addEventListeners();
   }

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

   addEventListeners() {
      window.addEventListener('resize', () => {
         if (this.offsetWidth >= 700 && this.hasAttribute('sidebar-open')) {
            this.removeAttribute('sidebar-open');
         }
      });
   }
}

customElements.define('app-page', AppPage);

export default AppPage;
