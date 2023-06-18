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

   BuildSideBar() {
      const sideBarElm = createElement('side-bar');
      const projectsSection = createElement('ul').appendTo(sideBarElm);
      // .appendChildren(
      //    this.categoryController.view,
      //    this.categoryController.view
      // );

      const categories = this.categoryController.model.getAllItems();

      categories.forEach((category) => {
         this.categoryController.view[category.id] = createElement(
            'h4'
         ).setContent(category.title);
         this.projectController.createListForCategory(category);
         this.projectController.view
            .get(category.id)
            .appendChild(this.categoryController.view[category.id]);
         projectsSection.appendChild(
            this.projectController.view.get(category.id)
         );
      });

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
