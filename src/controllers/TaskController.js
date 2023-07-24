import { compareAsc, format } from 'date-fns';
import pubsub from '../utils/PubSub';
import TaskCard from '../views/components/TaskCard';

class TaskController {
   constructor(taskModel, taskView, filter) {
      this.filter = filter;
      this.model = taskModel;
      this.view = taskView;
      this.currentFilter = {
         type: 'all',
         value: null,
      };

      // [
      //    {
      //       dataType: 'task',
      //       title: 'dayhsdafja',
      //       date: '2023-07-03',
      //       projectId: 'p001',
      //       categoryId: 'c01',
      //       priority: '1',
      //       description:
      //          'Lorem Applies a hue rotation on the image. The value defines the number of degrees around the color circle the image samples will be adjusted. 0deg is default, and represents the original image.',
      //       checklist: [
      //          {
      //             title: 'do something',
      //             checked: false,
      //             dataType: 'checklist-item',
      //          },
      //          {
      //             title: 'do something2',
      //             checked: true,
      //             dataType: 'checklist-item',
      //          },
      //       ],
      //       completed: true,
      //    },
      //    {
      //       dataType: 'task',

      //       title: 'asddfvmnbggf',
      //       date: '2023-06-01',
      //       projectId: 'p002',
      //       completed: false,
      //       priority: '2',
      //    },
      //    {
      //       dataType: 'task',
      //       title: 'asdj;l;f',
      //       date: '2023-06-01',
      //       projectId: 'p003',
      //       completed: false,
      //       priority: '3',
      //    },

      //    {
      //       dataType: 'task',
      //       title: 'asdj;xcvbvbl;f',
      //       date: '2023-06-01',
      //       projectId: 'p003',
      //       completed: false,
      //       priority: '4',
      //    },
      // ].forEach((task) => {
      //    this.model.addItem(task);
      // });

      this.initializeListeners();
   }

   initializeListeners() {
      pubsub.subscribe('task:add', this.handleAddTask.bind(this));
      pubsub.subscribe('task:update', this.handleUpdateTask.bind(this));
      pubsub.subscribe('task:delete', this.handleDeleteTask.bind(this));
      pubsub.subscribe('project:deleted', this.handleProjectDeleted.bind(this));
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
      this.view.deleteCard(taskId);
   }

   handleUpdateTask(newTaskData) {
      this.model.updateItem(newTaskData.id, newTaskData);
      const editedTask = this.model.getItemById(newTaskData.id);

      this.view.updateCard(editedTask);
   }

   buildViewState(externalData) {
      this.viewState = {
         currentFilter: this.currentFilter,
         tasks: this.getCurrentFilterTasks(),
      };
      console.log(this.viewState);

      Object.assign(this.viewState, externalData);

      this.view.setState(this.viewState);
   }

   handleProjectDeleted(projectId) {
      this.viewState.projects = this.viewState.projects.filter(
         (project) => project.id !== projectId
      );
      this.model.getAllItems().forEach((task) => {
         if (task.projectId === projectId) this.handleDeleteTask(task.id);
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
      Object.assign(this.viewState, {
         currentFilter: this.currentFilter,
         tasks,
      });
      this.view.setState(this.viewState);
   }
}

export default TaskController;
