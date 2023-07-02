import pubsub from '../utils/PubSub';
import Filter from '../strategies/Filter';

class TaskController {
   constructor(taskModel, taskView) {
      this.filter = new Filter();
      this.model = taskModel;
      this.view = taskView;
      this.viewState = {};
      this.currentFilter = 'today';

      [
         {
            dataType: 'task',
            id: '1685636158744',
            title: 'afgjsdf',
            date: '2023-06-01',
            projectId: '001',
         },
         {
            dataType: 'task',
            id: '1685636158744',
            title: 'asddfggf',
            date: '2023-06-01',
            projectId: '002',
         },
         {
            dataType: 'task',
            id: '1685636158744',
            title: 'asdj;l;f',
            date: '2023-06-01',
            projectId: '003',
         },
      ].forEach((task) => {
         this.model.addItem(task);
      });

      this.initializeListeners();
   }

   initializeListeners() {
      pubsub.subscribe('projects:update', this.setUpViewState.bind(this));
      pubsub.subscribe('categories:update', this.setUpViewState.bind(this));
   }

   setUpViewState(externalData) {
      const internalData = { tasks: this.model.getAllItems() };
      Object.assign(this.viewState, internalData, externalData);
      this.view.setState(this.viewState);
   }

   handleFilterChange(data) {
      const tasks = this.filter.filterBy(
         data.type,
         this.taskController.model.tasks,
         data.value
      );

      this.taskController.setUpViewState({ projects });
   }

   handleAddItem(data) {
      // const newTask = this.model.createItem(data);
      this.model.addItem(data);

      this.view.setState({
         tasks: this.model.getAllItems(),
         projects: {},
         categories: {},
      });

      this.view.render();
   }

   handleDeleteItem(taskId) {
      this.model.deleteItem(taskId);
      // this.view.addTask(newTask);
   }

   handleUpdateItem(taskId, newDta) {
      this.model.updateItem(taskId, newDta);
   }

   handleSelectTask(taskId) {
      const taskDetails = createElement('task-details')
         .setState(this.model.getItemById(taskId))
         .build();
      // to be continued
   }
}

export default TaskController;
