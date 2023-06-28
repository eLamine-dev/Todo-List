import pubsub from '../utils/PubSub';
import createElement from '../utils/ElementBuilder';
import TaskController from './TaskController';
import ProjectController from './ProjectController';
import CategoryController from './CategoryController';
import sideBarComponent from '../views/components/SideBar';
import AddTaskForm from '../views/components/AddTaskForm';
import Filter from '../strategies/Filter';

class FrontController {
   constructor(taskController, projectController, categoryController, appPage) {
      this.taskController = taskController;
      this.projectController = projectController;
      this.categoryController = categoryController;
      this.view = appPage;
      this.filter = new Filter();

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

      this.model.setGlobalState(categories, projects, tasks);

      const categorizedProjects = [];

      categories.forEach((category) => {
         this.projectController.createProjectsList(category);
         const categoryProjects =
            this.projectController.getCategoryProjects(category);
         categorizedProjects.push({ category, categoryProjects });
      });

      this.projectController.view.setState(categorizedProjects);

      this.taskController.view.setState({
         tasks,
         projects,
         categorizedProjects,
      });

      const sideBar = createElement('side-bar').appendChildren(
         this.projectController.view
      );

      this.view.appendChildren([sideBar, this.taskController.view]);
   }

   initializeListeners() {
      pubsub.subscribe('task:select', this.handleTaskSelect.bind(this));
      pubsub.subscribe('filter:changed', this.handleFilterChange.bind(this));
   }

   handleTaskSelect(taskId) {
      this.view.openTaskDetails(taskId);
   }

   handleFilterChange(data) {
      const newList = this.filter.filterBy(
         data.type,
         this.taskController.model.tasks,
         data.value
      );
      this.taskController.view
         .clear()
         .setState({
            tasks: newList,
            projects: this.projectController.model.projects,
         })
         .render();
   }
}

export default FrontController;
