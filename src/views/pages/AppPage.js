import pubsub from '../../utils/PubSub';
import createElement from '../../utils/ElementBuilder';
import TaskController from '../../controllers/TaskController';
import ProjectController from '../../controllers/ProjectController';
import TaskDetails from '../components/TaskDetails';
import CategoryController from '../../controllers/CategoryController';
import sideBar from '../components/SideBar';

class AppPage extends HTMLElement {
   connectedCallback() {
      this.render();
      pubsub.subscribe('task:select', this.openTaskDetails.bind(this));
   }

   render() {
      this.id = 'app';
      const taskController = new TaskController();
      const projectController = new ProjectController();
      const categoryController = new CategoryController();
      const sideBarState = projectController.model.getProjectsByCategory(
         categoryController.model.getAllItems()
      );
      const sideBar = createElement('side-bar').setState(sideBarState).build();
      this.appendChild(sideBar);
      this.appendChild(taskController.view);
   }

   showTaskDetails(task) {
      if (document.getElementById('task-details')) this.lastChild.remove();
      const taskDetails = createElement('task-details').setState(task).build();
      this.appendChild(taskDetails);
   }
}

customElements.define('app-page', AppPage);

export default AppPage;
