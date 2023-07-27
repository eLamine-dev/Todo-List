import { compareAsc, format } from 'date-fns';
import pubsub from '../utils/PubSub';
import TaskCard from '../views/components/TaskCard';

class TaskController {
   constructor(taskModel, taskView, filter, sorter) {
      this.sorter = sorter;
      this.filter = filter;
      this.model = taskModel;
      this.view = taskView;
      this.currentSort = '';
      this.currentFilter = {
         type: 'all',
         title: 'all',
         value: null,
      };

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
      pubsub.subscribe('sorting:changed', this.handleSortingChanged.bind(this));
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

      Object.assign(this.viewState, externalData);

      this.view.setState(this.viewState);
   }

   handleProjectDeleted(projectId) {
      this.model.deleteItemsByProperty('projectId', projectId);
      const projects = this.viewState.projects.filter(
         (project) => project.id !== projectId
      );
      const tasks = this.getCurrentFilterTasks();
      Object.assign(this.viewState, { projects, tasks });
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
      this.currentSort = '';
      this.currentFilter = filterData;
      const tasks = this.getCurrentFilterTasks();
      Object.assign(this.viewState, {
         currentSort: this.currentSort,
         currentFilter: this.currentFilter,
         tasks,
      });
      this.view.setState(this.viewState);
   }

   handleSortingChanged(sortingType) {
      this.currentSort = sortingType;
      const tasks = this.getCurrentFilterTasks();
      const sortedTasks = this.sorter.sortBy(sortingType, tasks);
      Object.assign(this.viewState, {
         currentSort: this.currentSort,
         tasks: sortedTasks,
      });
      this.view.setState(this.viewState);
   }
}

export default TaskController;
