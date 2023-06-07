import pubsub from '../utils/PubSub';
import createElement from '../utils/ElementBuilder';
import TaskController from './TaskController';
import ProjectController from './ProjectController';
import CategoryController from './CategoryController';
import sideBar from '../views/components/SideBar';

class FrontController {
   constructor() {
      this.taskController = new TaskController();
      this.projectController = new ProjectController();
      this.categoryController = new CategoryController();

      this.sideBar = this.createSideBar();

      this.view = createElement('app-page')
         .setAttributes({ id: 'app' })
         .appendChildren([this.sideBar, this.taskController.view]);
      this.initializeListeners();
   }

   createSideBar() {
      this.projectController.createListForCategories(
         this.categoryController.model.getAllItems()
      );

      const categoryList = Array.from(this.categoryController.view.children);

      console.log(this.categoryController.view);

      const sideBarElm = createElement('side-bar').appendChildren([
         ...this.projectController.view.values(),
      ]);

      return sideBarElm;
   }

   // setupProjectLists() {
   //    const categories = this.categoryController.model.getAllItems();
   //    categories.forEach((category) => {
   //       this.projectController.createListForCategories(category);
   //    });
   // }

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
