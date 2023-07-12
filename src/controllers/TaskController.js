import { compareAsc, format } from 'date-fns';
import pubsub from '../utils/PubSub';

class TaskController {
   constructor(taskModel, taskView, filter) {
      this.filter = filter;
      this.model = taskModel;
      this.view = taskView;
      this.viewState = {};
      this.currentFilter = {
         type: 'all',
         value: null,
      };

      [
         {
            dataType: 'task',
            id: '1685636158744',
            title: 'dayhsdafja',
            date: '2023-07-03',
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
      pubsub.subscribe('task:add', this.handleAddTask.bind(this));
      pubsub.subscribe('task:update', this.handleUpdateTask.bind(this));
      pubsub.subscribe('task:delete', this.handleDeleteTask.bind(this));
      pubsub.subscribe('projects:update', this.setUpViewState.bind(this));
      pubsub.subscribe('categories:update', this.setUpViewState.bind(this));
      pubsub.subscribe('filter:changed', this.handleFilterChange.bind(this));
   }

   handleAddTask(data) {
      this.model.addItem(data);
      this.view.setState({
         tasks: this.getCurrentFilterTasks(),
      });
   }

   handleDeleteTask(taskId) {
      this.model.deleteItem(taskId);
   }

   handleUpdateTask(taskId, newDta) {
      this.model.updateItem(taskId, newDta);
   }

   setUpViewState(externalData) {
      const internalData = {
         tasks: this.getCurrentFilterTasks(this.currentFilter),
      };
      Object.assign(this.viewState, internalData, externalData);
      this.view.setState(this.viewState);
   }

   getCurrentFilterTasks() {
      return this.filter.filterBy(
         this.currentFilter.type,
         this.model.getAllItems(),
         this.currentFilter.value
      );
   }

   handleFilterChange(filterData) {
      this.currentFilter = filterData;

      const tasks = this.getCurrentFilterTasks();
      this.view.setState({ tasks });
   }

   handleSelectTask(taskId) {
      const taskDetails = createElement('task-details').setState(
         this.model.getItemById(taskId)
      );
   }
}

export default TaskController;
