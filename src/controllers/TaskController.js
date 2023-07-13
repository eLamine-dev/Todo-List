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
            categoryId: '01',
            checklist: [
               {
                  title: 'do something',
                  checked: false,
                  dataType: 'checklist-item',
               },
               {
                  title: 'do something2',
                  checked: true,
                  dataType: 'checklist-item',
               },
            ],
         },
         {
            dataType: 'task',
            id: '1685v63cxv6158744',
            title: 'asddfggf',
            date: '2023-06-01',
            projectId: '002',
         },
         {
            dataType: 'task',
            id: '1685636cxv158744',
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
      pubsub.subscribe('projects:updated', this.buildViewState.bind(this));
      pubsub.subscribe('categories:updated', this.buildViewState.bind(this));
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

   buildViewState(externalData) {
      const internalData = {
         tasks: this.getCurrentFilterTasks(),
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

   // handleProjectsUpdates(projects) {
   //    this.view.setState({ projects });
   // }

   // handleCategoriesUpdates(categories) {
   //    this.view.setState({ categories });
   // }
}

export default TaskController;
