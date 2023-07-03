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

   start() {
      this.setupFirstLoad();
      document.getElementById('body').appendChild(this.view);
   }

   setupFirstLoad() {
      const categories = this.categoryController.model.getAllItems();
      const projects = this.projectController.model.getAllItems();

      this.taskController.setUpViewState({ projects, categories });
      this.projectController.setUpViewState({ categories });

      const sideBar = createElement('side-bar').appendChildren(
         this.projectController.view
      );

      this.view.appendChildren([sideBar, this.taskController.view]);
   }

   initializeListeners() {
      pubsub.subscribe('task:select', this.handleTaskSelect.bind(this));
   }

   handleTaskSelect(taskId) {
      this.view.openTaskDetails(taskId);
   }
}

export default AppController;
