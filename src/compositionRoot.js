import TaskController from './controllers/TaskController';
import ProjectController from './controllers/ProjectController';
import CategoryController from './controllers/CategoryController';
import TaskModel from './models/TaskModel';
import ProjectModel from './models/ProjectModel';
import CategoryModel from './models/CategoryModel';
import TaskList from './views/components/TaskList';
import ProjectList from './views/components/ProjectList';
import AppPage from './views/pages/AppPage';
import createElement from './utils/ElementBuilder';
import AppController from './controllers/AppController';
import Filter from './strategies/Filter';

export default function initializeApp() {
   const taskModel = new TaskModel();
   const projectModel = new ProjectModel();
   const categoryModel = new CategoryModel();
   const filter = new Filter();

   const taskList = createElement('task-list');
   const projectList = createElement('project-list');
   const appPage = createElement('app-page');

   const taskController = new TaskController(taskModel, taskList, filter);
   const projectController = new ProjectController(projectModel, projectList);
   const categoryController = new CategoryController(categoryModel);

   const appController = new AppController(
      taskController,
      projectController,
      categoryController,
      appPage
   );

   return appController;
}
