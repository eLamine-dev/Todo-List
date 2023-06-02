import pubsub from '../utils/PubSub';
import createElement from '../utils/ElementBuilder';
import TaskController from './TaskController';
import ProjectController from './ProjectController';
import CategoryController from './CategoryController';
import AppPage from '../views/pages/AppPage';

class FrontController {
   constructor() {
      this.taskController = new TaskController();
      this.projectController = new ProjectController();
      this.categoryController = new CategoryController();
      this.appPage = new AppPage(this.taskController, this.projectController);

      this.initializeListeners();
   }

   initializeListeners() {
      // Subscribe to pubsub events related to the overall page
      pubsub.subscribe('filter:change', this.handleFilterChange.bind(this));
      pubsub.subscribe('task:select', this.handleTaskSelect.bind(this));
      // Add more event subscriptions as needed
   }

   handleFilterChange(filter) {
      // Update the AppPage based on the filter change
      this.appPage.updateFilter(filter);
   }

   handleTaskSelect(taskId) {
      // Update the AppPage to show the details of the selected task
      this.appPage.showTaskDetails(taskId);
   }
}

export default FrontController;
