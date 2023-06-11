import pubsub from '../utils/PubSub';
import createElement from '../utils/ElementBuilder';
import TaskController from './TaskController';
import ProjectController from './ProjectController';
import CategoryController from './CategoryController';
import sideBar from '../views/components/SideBar';
import AppPage from '../views/pages/AppPage';

class FrontController {
   constructor() {
      this.taskController = new TaskController();
      this.projectController = new ProjectController();
      this.categoryController = new CategoryController();

      this.view = createElement('app-page').appendChildren([
         this.createSideBar(),
         this.taskController.view,
      ]);
      this.initializeListeners();
   }

   start() {
      document.getElementById('body').appendChild(this.view);
   }

   createSideBar() {
      const sideBarElm = createElement('side-bar').appendChildren([
         this.categoryController.view,
      ]);

      return sideBarElm;
   }

   initializeListeners() {
      pubsub.subscribe('filter:change', this.handleFilterChange.bind(this));
      pubsub.subscribe('task:select', this.handleTaskSelect.bind(this));
      pubsub.subscribe('category:load', this.LoadCategoryProjects.bind(this));
   }

   LoadCategoryProjects(categoryElement) {
      this.projectController.createListForCategory(categoryElement.getState());
      const categoryProjectsList = this.projectController.view.get(
         categoryElement.getState().title
      );
      categoryElement.appendChildren(categoryProjectsList);
   }

   handleFilterChange(filter) {
      this.view.updateFilter(filter);
   }

   handleTaskSelect(taskId) {
      this.view.openTaskDetails(taskId);
   }
}

export default FrontController;
