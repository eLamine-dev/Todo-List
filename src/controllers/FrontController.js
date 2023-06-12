import pubsub from '../utils/PubSub';
import createElement from '../utils/ElementBuilder';
import TaskController from './TaskController';
import ProjectController from './ProjectController';
import CategoryController from './CategoryController';
import sideBar from '../views/components/SideBar';

class FrontController {
   constructor(taskController, projectController, categoryController, appPage) {
      this.taskController = taskController;
      this.projectController = projectController;
      this.categoryController = categoryController;

      this.view = appPage.appendChildren([
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
