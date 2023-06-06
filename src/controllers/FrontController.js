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

      // const sideBarState = this.projectController.model.getProjectsByCategory(
      //    this.categoryController.model.getAllItems()
      // );

      this.view = new AppPage(
         this.categoryController.view,
         this.taskController.view
      );

      this.initializeListeners();
   }

   setupSideBar() {
      const categories = this.categoryController.model.getAllItems();
      const projects = this.projectController.model.getAllItems();
   }

   initializeListeners() {
      pubsub.subscribe('filter:change', this.handleFilterChange.bind(this));
      pubsub.subscribe('task:select', this.handleTaskSelect.bind(this));
   }

   handleFilterChange(filter) {
      this.view.updateFilter(filter);
   }

   handleTaskSelect(taskId) {
      this.view.openTaskDetails(taskId);
   }
}

export default FrontController;
