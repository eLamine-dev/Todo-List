import pubsub from '../utils/PubSub';
import createElement from '../utils/ElementBuilder';
import sideBarComponent from '../views/components/SideBar';
import Filter from '../strategies/Filter';

class AppController {
   constructor(taskController, projectController, categoryController, appPage) {
      this.taskController = taskController;
      this.projectController = projectController;
      this.categoryController = categoryController;
      this.view = appPage;
      this.initializeListeners();
   }

   launch() {
      this.setupFirstLoad();
      document.getElementById('body').appendChild(this.view);
   }

   setupFirstLoad() {
      const categories = this.categoryController.model.getAllItems();
      const projects = this.projectController.model.getAllItems();

      this.taskController.buildViewState({ projects, categories });
      this.projectController.buildViewState({ categories });

      const sideBar = createElement('side-bar').appendChildren(
         this.projectController.view
      );

      this.view.appendChildren([sideBar, this.taskController.view]);
   }

   initializeListeners() {
      pubsub.subscribe('task:edit', this.openTaskEdit.bind(this));
   }

   openTaskEdit(taskId) {
      const categories = this.categoryController.model.getAllItems();
      const projects = this.projectController.model.getAllItems();
      const task = this.taskController.model.getItemById(taskId);

      this.view.openTaskDetails({ task, categories, projects });
   }
}

export default AppController;
