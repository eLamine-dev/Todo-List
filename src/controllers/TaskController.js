import { compareAsc, format } from 'date-fns';
import pubsub from '../utils/PubSub';
import TaskCard from '../views/components/TaskCard';

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
            title: 'dayhsdafja',
            date: '2023-07-03',
            projectId: '001',
            categoryId: '01',
            priority: '1',
            description:
               'Lorem Applies a hue rotation on the image. The value defines the number of degrees around the color circle the image samples will be adjusted. 0deg is default, and represents the original image.',
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
            completed: true,
         },
         {
            dataType: 'task',

            title: 'asddfvmnbggf',
            date: '2023-06-01',
            projectId: '002',
            completed: false,
            priority: '2',
         },
         {
            dataType: 'task',
            title: 'asdj;l;f',
            date: '2023-06-01',
            projectId: '003',
            completed: false,
            priority: '3',
         },

         {
            dataType: 'task',
            title: 'asdj;xcvbvbl;f',
            date: '2023-06-01',
            projectId: '003',
            completed: false,
            priority: '4',
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

   handleUpdateTask(newTaskData) {
      this.model.updateItem(newTaskData.id, newTaskData);
      const editedTask = this.model.getItemById(newTaskData.id);
      this.view.updateCard(editedTask);
   }

   buildViewState(externalData) {
      const internalData = {
         tasks: this.getCurrentFilterTasks(),
      };
      Object.assign(this.viewState, internalData, externalData);
      this.view.setState(this.viewState);
      this.clearDeletedProjectsTasks(this.viewState);
   }

   clearDeletedProjectsTasks() {
      this.model.getAllItems().forEach((task) => {
         const taskProject = this.viewState.projects.find(
            (project) => project.id === task.projectId
         );

         if (!taskProject) {
            this.handleDeleteTask(task.id);
         }
      });
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
}

export default TaskController;
