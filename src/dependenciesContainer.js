import TaskController from './controllers/TaskController';
import ProjectController from './controllers/ProjectController';
import CategoryController from './controllers/CategoryController';
import TaskModel from './models/TaskModel';
import ProjectModel from './models/ProjectModel';
import CategoryModel from './models/CategoryModel';
import TaskList from './views/components/TaskList';
import CategoryList from './views/components/CategoryList';
import ProjectList from './views/components/ProjectList';
import createElement from './utils/ElementBuilder';
import FrontController from './controllers/FrontController';

export default function initializeApp() {
   const taskModel = new TaskModel();
   const taskView = createElement('task-list').setState(
      taskModel.getAllItems()
   );
   const taskController = new TaskController(taskModel, taskView);

   const projectModel = new ProjectModel();
   const projectController = new ProjectController(projectModel);

   const categoryModel = new CategoryModel();
   const categoryView = createElement('category-list').setState(
      categoryModel.getAllItems()
   );
   const categoryController = new CategoryController(
      categoryModel,
      categoryView
   );

   const frontController = new FrontController(
      taskController,
      projectController,
      categoryController
   );

   return frontController;
}
