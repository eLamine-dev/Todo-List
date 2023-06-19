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
      this.view = appPage;

      this.initializeListeners();
   }

   start() {
      this.view.appendChildren([this.BuildSideBar(), this.taskController.view]);
      document.getElementById('body').appendChild(this.view);
   }

   setupFirstLoad() {
      const categories = this.categoryController.getAllItems();

      categories.forEach((category) => {
         const categoryProjects =
            this.projectController.createProjectsList(category);
      });

      const sideBar = createElement('side-bar').appendChildren(
         this.projectController.view
      );

      this.view.appendChildren([sideBar, this.taskController.view]);
   }

   initializeListeners() {
      pubsub.subscribe('filter:change', this.handleFilterChange.bind(this));
      pubsub.subscribe('task:select', this.handleTaskSelect.bind(this));
      pubsub.subscribe('category:load', this.LoadCategoryProjects.bind(this));
   }

   LoadCategoryProjects(categoryElement) {
      this.projectController.createListForCategory(categoryElement.getState());
      const categoryProjectsList = this.projectController.view.get(
         categoryElement.getState().id
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
