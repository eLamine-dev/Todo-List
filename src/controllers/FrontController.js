import pubsub from '../utils/PubSub';
import createElement from '../utils/ElementBuilder';
import TaskController from './TaskController';
import ProjectController from './ProjectController';
import CategoryController from './CategoryController';
import sideBarComponent from '../views/components/SideBar';
import AddTaskForm from '../views/components/AddTaskForm';

class FrontController {
   constructor(taskController, projectController, categoryController, appPage) {
      this.taskController = taskController;
      this.projectController = projectController;
      this.categoryController = categoryController;
      this.view = appPage;

      this.initializeListeners();
   }

   start() {
      this.setupFirstLoad();
      document.getElementById('body').appendChild(this.view);
   }

   setupFirstLoad() {
      const categories = this.categoryController.model.getAllItems();
      const tasks = this.taskController.model.getAllItems();
      const projects = this.projectController.model.getAllItems();

      this.taskController.view.setState(tasks);
      const addTaskForm = new AddTaskForm();
      this.taskController.view.prepend(addTaskForm);

      categories.forEach((category) => {
         this.projectController.createProjectsList(category);
         const categoryProjects =
            this.projectController.getCategoryProjects(category);
         addTaskForm.setupSelectList(category, categoryProjects);
      });

      const sideBar = createElement('side-bar').appendChildren(
         this.projectController.view
      );

      this.view.appendChildren([sideBar, this.taskController.view]);
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
