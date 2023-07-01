import pubsub from '../utils/PubSub';
import createElement from '../utils/ElementBuilder';
import sideBarComponent from '../views/components/SideBar';

import Filter from '../strategies/Filter';

class FrontController {
   constructor(
      taskController,
      projectController,
      categoryController,
      appPage,
      appState
   ) {
      this.taskController = taskController;
      this.projectController = projectController;
      this.categoryController = categoryController;
      this.view = appPage;
      this.model = appState;
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

      this.taskController.getExternalData({ projects, categories });
      this.projectController.passData({ categories });

      // this.model.setGlobalState(tasks, projects, categories);
      // this.projectController.view.setState(this.model.getGlobalState());
      // this.taskController.view.setState(this.model.getGlobalState());

      const sideBar = createElement('side-bar').appendChildren(
         this.projectController.view
      );

      this.view.appendChildren([sideBar, this.taskController.view]);
   }

   initializeListeners() {
      pubsub.subscribe('item:add', this.handleAddItem.bind(this));
      pubsub.subscribe('item:update', this.handleAddItem.bind(this));
      pubsub.subscribe('item:delete', this.handleAddItem.bind(this));

      pubsub.subscribe('task:select', this.handleTaskSelect.bind(this));
      pubsub.subscribe('filter:changed', this.handleFilterChange.bind(this));
   }

   handleAddItem(data) {
      this[`${data.dataType}Controller`].handleAddItem(data);
   }

   handleTaskSelect(taskId) {
      this.view.openTaskDetails(taskId);
   }

   handleFilterChange(data) {
      const categories = this.categoryController.model.getAllItems();
      const tasks = this.filter.filterBy(
         data.type,
         this.taskController.model.tasks,
         data.value
      );
      const projects = this.projectController.model.getAllItems();

      this.model.setGlobalState(tasks, projects, categories);
      this.taskController.view
         .clear()
         .setState(this.model.getGlobalState())
         .render();
   }
}

export default FrontController;
