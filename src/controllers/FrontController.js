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

      this.taskController.setUpViewState({ projects, categories });
      this.projectController.setUpViewState({ categories });

      const sideBar = createElement('side-bar').appendChildren(
         this.projectController.view
      );

      this.view.appendChildren([sideBar, this.taskController.view]);
   }

   initializeListeners() {
      pubsub.subscribe('item:add', this.delegateAddItem.bind(this));
      pubsub.subscribe('item:update', this.delegateUpdateItem.bind(this));
      pubsub.subscribe('item:delete', this.delegateDeleteItem.bind(this));
      pubsub.subscribe('task:select', this.handleTaskSelect.bind(this));
      pubsub.subscribe('filter:changed', this.handleFilterChange.bind(this));
   }

   delegateAddItem(data) {
      this[`${data.dataType}Controller`].handleAddItem(data);
      pubsub.publish(
         `${data.dataType}s:update`,
         this[`${data.dataType}Controller`].model.getAllItems()
      );
   }

   delegateUpdateItem(data) {
      this[`${data.dataType}Controller`].handleUpdateItem(data);
      pubsub.publish(
         `${data.dataType}s:update`,
         this[`${data.dataType}Controller`].model.getAllItems()
      );
   }

   delegateDeleteItem(data) {
      this[`${data.dataType}Controller`].handleDeleteItem(data);
      pubsub.publish(
         `${data.dataType}s:update`,
         this[`${data.dataType}Controller`].model.getAllItems()
      );
   }

   handleTaskSelect(taskId) {
      this.view.openTaskDetails(taskId);
   }
}

export default FrontController;
