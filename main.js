/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/compositionRoot.js":
/*!********************************!*\
  !*** ./src/compositionRoot.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ initializeApp)
/* harmony export */ });
/* harmony import */ var _controllers_TaskController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controllers/TaskController */ "./src/controllers/TaskController.js");
/* harmony import */ var _controllers_ProjectController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./controllers/ProjectController */ "./src/controllers/ProjectController.js");
/* harmony import */ var _controllers_CategoryController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./controllers/CategoryController */ "./src/controllers/CategoryController.js");
/* harmony import */ var _models_TaskModel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./models/TaskModel */ "./src/models/TaskModel.js");
/* harmony import */ var _models_ProjectModel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./models/ProjectModel */ "./src/models/ProjectModel.js");
/* harmony import */ var _models_CategoryModel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./models/CategoryModel */ "./src/models/CategoryModel.js");
/* harmony import */ var _views_components_TaskList__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./views/components/TaskList */ "./src/views/components/TaskList.js");
/* harmony import */ var _views_components_ProjectList__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./views/components/ProjectList */ "./src/views/components/ProjectList.js");
/* harmony import */ var _views_pages_AppPage__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./views/pages/AppPage */ "./src/views/pages/AppPage.js");
/* harmony import */ var _utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./utils/ElementBuilder */ "./src/utils/ElementBuilder.js");
/* harmony import */ var _controllers_AppController__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./controllers/AppController */ "./src/controllers/AppController.js");
/* harmony import */ var _strategies_Filter__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./strategies/Filter */ "./src/strategies/Filter.js");
/* harmony import */ var _strategies_Sorter__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./strategies/Sorter */ "./src/strategies/Sorter.js");













function initializeApp() {
  const categoryModel = new _models_CategoryModel__WEBPACK_IMPORTED_MODULE_5__["default"]();
  const projectModel = new _models_ProjectModel__WEBPACK_IMPORTED_MODULE_4__["default"]();
  const taskModel = new _models_TaskModel__WEBPACK_IMPORTED_MODULE_3__["default"]();
  const filter = new _strategies_Filter__WEBPACK_IMPORTED_MODULE_11__["default"]();
  const sorter = new _strategies_Sorter__WEBPACK_IMPORTED_MODULE_12__["default"]();
  const taskList = (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_9__["default"])('task-list');
  const projectList = (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_9__["default"])('project-list');
  const appPage = (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_9__["default"])('app-page');
  const taskController = new _controllers_TaskController__WEBPACK_IMPORTED_MODULE_0__["default"](taskModel, taskList, filter, sorter);
  const projectController = new _controllers_ProjectController__WEBPACK_IMPORTED_MODULE_1__["default"](projectModel, projectList);
  const categoryController = new _controllers_CategoryController__WEBPACK_IMPORTED_MODULE_2__["default"](categoryModel);
  const appController = new _controllers_AppController__WEBPACK_IMPORTED_MODULE_10__["default"](taskController, projectController, categoryController, appPage);
  return appController;
}

/***/ }),

/***/ "./src/controllers/AppController.js":
/*!******************************************!*\
  !*** ./src/controllers/AppController.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_PubSub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/PubSub */ "./src/utils/PubSub.js");
/* harmony import */ var _utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/ElementBuilder */ "./src/utils/ElementBuilder.js");
/* harmony import */ var _views_components_SideBar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../views/components/SideBar */ "./src/views/components/SideBar.js");
/* harmony import */ var _strategies_Filter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../strategies/Filter */ "./src/strategies/Filter.js");




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
    this.taskController.buildViewState({
      projects,
      categories
    });
    this.projectController.buildViewState({
      categories
    });
    const sideBar = (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_1__["default"])('side-bar').appendChildren(this.projectController.view);
    this.view.appendChildren([sideBar, this.taskController.view]);
  }
  initializeListeners() {
    _utils_PubSub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe('task:edit', this.openTaskEdit.bind(this));
    _utils_PubSub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe('side-bar:toggle', this.toggleSideBar.bind(this));
  }
  openTaskEdit(taskId) {
    const categories = this.categoryController.model.getAllItems();
    const projects = this.projectController.model.getAllItems();
    const task = this.taskController.model.getItemById(taskId);
    this.view.openTaskDetails({
      task,
      categories,
      projects
    });
  }
  toggleSideBar() {
    this.view.toggleSideBar();
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AppController);

/***/ }),

/***/ "./src/controllers/CategoryController.js":
/*!***********************************************!*\
  !*** ./src/controllers/CategoryController.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_PubSub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/PubSub */ "./src/utils/PubSub.js");

class CategoryController {
  constructor(categoryModel) {
    this.model = categoryModel;
    this.initializeListeners();
  }
  initializeListeners() {
    _utils_PubSub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe('category:add', this.handleAddCategory.bind(this));
    _utils_PubSub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe('category:update', this.handleUpdateCategory.bind(this));
    _utils_PubSub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe('category:delete', this.handleDeleteCategory.bind(this));
  }
  handleAddCategory(newCategoryLi) {
    this.model.addItem(newCategoryLi.getState());
    const newCategory = this.model.getLastAddedItem();
    newCategoryLi.parentElement.setState({
      header: newCategory,
      items: {
        type: 'project',
        list: null
      }
    });
    _utils_PubSub__WEBPACK_IMPORTED_MODULE_0__["default"].publish('categories:updated', {
      categories: this.model.getAllItems()
    });
  }
  handleUpdateCategory(categoryLi) {
    this.model.updateItem(categoryLi.getAttribute('id'), categoryLi.getState());
    const editedCategory = this.model.getItemById(categoryLi.getAttribute('id'));
    categoryLi.parentElement.setState({
      header: editedCategory
    });
    _utils_PubSub__WEBPACK_IMPORTED_MODULE_0__["default"].publish('categories:updated', {
      categories: this.model.getAllItems()
    });
  }
  handleDeleteCategory(categoryLi) {
    this.model.deleteItem(categoryLi.getAttribute('id'));
    categoryLi.parentElement.remove();
    _utils_PubSub__WEBPACK_IMPORTED_MODULE_0__["default"].publish('category:deleted', categoryLi.getAttribute('id'));
    document.querySelector(`.default-filter[id=all]`).click();
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CategoryController);

/***/ }),

/***/ "./src/controllers/ProjectController.js":
/*!**********************************************!*\
  !*** ./src/controllers/ProjectController.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_PubSub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/PubSub */ "./src/utils/PubSub.js");

class ProjectController {
  constructor(projectModel, projectList) {
    this.model = projectModel;
    this.view = projectList;
    this.viewState = {};
    this.initializeListeners();
  }
  initializeListeners() {
    _utils_PubSub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe('project:add', this.handleAddProject.bind(this));
    _utils_PubSub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe('project:update', this.handleUpdateProject.bind(this));
    _utils_PubSub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe('project:delete', this.handleDeleteProject.bind(this));
    _utils_PubSub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe('category:deleted', this.handleCategoryDelete.bind(this));
  }
  handleAddProject(newProjectLi) {
    const data = newProjectLi.getState();
    Object.assign(data, {
      categoryId: newProjectLi.getAttribute('parent-list')
    });
    this.model.addItem(data);
    const newProject = this.model.getLastAddedItem();
    newProjectLi.setState(newProject);
    _utils_PubSub__WEBPACK_IMPORTED_MODULE_0__["default"].publish('projects:updated', {
      projects: this.model.getAllItems()
    });
  }
  handleDeleteProject(projectLi) {
    const projectCategoryLi = projectLi.closest('exp-list').firstChild;
    if (projectLi.hasAttribute('current-filter')) {
      const newFilterData = {
        title: projectCategoryLi.getAttribute('data-title'),
        id: projectCategoryLi.getAttribute('id'),
        type: projectCategoryLi.getAttribute('data-type'),
        value: projectCategoryLi.getAttribute('id')
      };
      _utils_PubSub__WEBPACK_IMPORTED_MODULE_0__["default"].publish('filter:changed', newFilterData);
      this.view.highlightCurrentFilter(newFilterData);
    }
    this.model.deleteItem(projectLi.getAttribute('id'));
    _utils_PubSub__WEBPACK_IMPORTED_MODULE_0__["default"].publish('project:deleted', projectLi.getAttribute('id'));
  }
  handleUpdateProject(projectLi) {
    this.model.updateItem(projectLi.getAttribute('id'), projectLi.getState());
    const editedProject = this.model.getItemById(projectLi.getAttribute('id'));
    projectLi.setState(editedProject);
    _utils_PubSub__WEBPACK_IMPORTED_MODULE_0__["default"].publish('projects:updated', {
      projects: this.model.getAllItems()
    });
  }
  handleCategoryDelete(categoryId) {
    this.model.getAllItems().forEach(project => {
      if (project.categoryId === categoryId) {
        this.model.deleteItem(project.id);
        _utils_PubSub__WEBPACK_IMPORTED_MODULE_0__["default"].publish('project:deleted', project.id);
      }
    });
    this.clearNonCategorizedProjects();
  }
  buildViewState(externalData) {
    this.viewState = {
      projects: this.model.getAllItems()
    };
    Object.assign(this.viewState, externalData);
    this.view.setState(this.viewState);
  }
  clearNonCategorizedProjects() {
    this.model.getAllItems().forEach(project => {
      const projectCategory = this.viewState.categories.find(category => project.categoryId === category.id);
      if (!projectCategory) {
        this.model.deleteItem(project.id);
        _utils_PubSub__WEBPACK_IMPORTED_MODULE_0__["default"].publish('projects:updated', {
          projects: this.model.getAllItems()
        });
      }
    });
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProjectController);

/***/ }),

/***/ "./src/controllers/TaskController.js":
/*!*******************************************!*\
  !*** ./src/controllers/TaskController.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_PubSub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/PubSub */ "./src/utils/PubSub.js");

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
      value: null
    };
    this.initializeListeners();
  }
  initializeListeners() {
    _utils_PubSub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe('task:add', this.handleAddTask.bind(this));
    _utils_PubSub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe('task:update', this.handleUpdateTask.bind(this));
    _utils_PubSub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe('task:delete', this.handleDeleteTask.bind(this));
    _utils_PubSub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe('project:deleted', this.handleProjectDeleted.bind(this));
    _utils_PubSub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe('projects:updated', this.buildViewState.bind(this));
    _utils_PubSub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe('categories:updated', this.buildViewState.bind(this));
    _utils_PubSub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe('filter:changed', this.handleFilterChange.bind(this));
    _utils_PubSub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe('sorting:changed', this.handleSortingChanged.bind(this));
  }
  handleAddTask(data) {
    this.model.addItem(data);
    this.view.setState({
      tasks: this.getCurrentFilterTasks()
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
      tasks: this.getCurrentFilterTasks()
    };
    Object.assign(this.viewState, externalData);
    this.view.setState(this.viewState);
  }
  handleProjectDeleted(projectId) {
    this.model.deleteItemsByProperty('projectId', projectId);
    const projects = this.viewState.projects.filter(project => project.id !== projectId);
    const tasks = this.getCurrentFilterTasks();
    Object.assign(this.viewState, {
      projects,
      tasks
    });
    this.view.setState(this.viewState);
  }
  getCurrentFilterTasks() {
    return this.filter.filterBy(this.currentFilter.type, this.model.getAllItems(), this.currentFilter.value);
  }
  handleFilterChange(filterData) {
    this.currentSort = '';
    this.currentFilter = filterData;
    const tasks = this.getCurrentFilterTasks();
    Object.assign(this.viewState, {
      currentSort: this.currentSort,
      currentFilter: this.currentFilter,
      tasks
    });
    this.view.setState(this.viewState);
  }
  handleSortingChanged(sortingType) {
    this.currentSort = sortingType;
    const tasks = this.getCurrentFilterTasks();
    const sortedTasks = this.sorter.sortBy(sortingType, tasks);
    Object.assign(this.viewState, {
      currentSort: this.currentSort,
      tasks: sortedTasks
    });
    this.view.setState(this.viewState);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TaskController);

/***/ }),

/***/ "./src/models/BaseModel.js":
/*!*********************************!*\
  !*** ./src/models/BaseModel.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_ObjectBuilder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/ObjectBuilder */ "./src/utils/ObjectBuilder.js");
/* harmony import */ var _utils_DummyContent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/DummyContent */ "./src/utils/DummyContent.js");


class BaseModel {
  constructor(collectionName) {
    this.collectionName = collectionName;
    this[collectionName] = [];
    this.setDummyContent();
    this.retrieveFromLocalStorage();
  }
  retrieveFromLocalStorage() {
    const itemsData = Array.from(JSON.parse(localStorage.getItem(this.collectionName)));
    itemsData.forEach(item => {
      const object = new _utils_ObjectBuilder__WEBPACK_IMPORTED_MODULE_0__["default"](item);
      this[this.collectionName].push(object);
    });
  }
  saveToLocalStorage() {
    localStorage.setItem(this.collectionName, JSON.stringify(this[this.collectionName]));
  }
  addItem(data) {
    const newItem = new _utils_ObjectBuilder__WEBPACK_IMPORTED_MODULE_0__["default"](data);
    this[this.collectionName].push(newItem);
    this.saveToLocalStorage();
  }
  getAllItems() {
    return this[this.collectionName];
  }
  getLastAddedItem() {
    return this[this.collectionName].slice(-1)[0];
  }
  getItemById(id) {
    return this[this.collectionName].find(item => item.id === id);
  }
  updateItem(id, data) {
    const itemToEdit = this[this.collectionName].find(item => item.id === id);
    itemToEdit.updateProperties(data);
    this.saveToLocalStorage();
  }
  deleteItem(id) {
    const index = this[this.collectionName].findIndex(item => item.id === id);
    if (index !== -1) {
      this[this.collectionName].splice(index, 1);
    }
    this.saveToLocalStorage();
  }
  deleteItemsByProperty(property, value) {
    this[this.collectionName] = this[this.collectionName].filter(item => item[property] !== value);
    this.saveToLocalStorage();
  }
  setDummyContent() {
    if (JSON.parse(localStorage.getItem(`${this.collectionName}-dummy-content`)) === null) {
      localStorage.setItem(this.collectionName, JSON.stringify(_utils_DummyContent__WEBPACK_IMPORTED_MODULE_1__["default"][this.collectionName]));
      localStorage.setItem(`${this.collectionName}-dummy-content`, JSON.stringify(true));
    }
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BaseModel);

/***/ }),

/***/ "./src/models/CategoryModel.js":
/*!*************************************!*\
  !*** ./src/models/CategoryModel.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BaseModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseModel */ "./src/models/BaseModel.js");

class CategoryModel extends _BaseModel__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super('categories');
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CategoryModel);

/***/ }),

/***/ "./src/models/ProjectModel.js":
/*!************************************!*\
  !*** ./src/models/ProjectModel.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BaseModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseModel */ "./src/models/BaseModel.js");
/* harmony import */ var _CategoryModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CategoryModel */ "./src/models/CategoryModel.js");


class ProjectModel extends _BaseModel__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super('projects');
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProjectModel);

/***/ }),

/***/ "./src/models/TaskModel.js":
/*!*********************************!*\
  !*** ./src/models/TaskModel.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BaseModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseModel */ "./src/models/BaseModel.js");

class TaskModel extends _BaseModel__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super('tasks');
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TaskModel);

/***/ }),

/***/ "./src/strategies/Filter.js":
/*!**********************************!*\
  !*** ./src/strategies/Filter.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/isSameDay/index.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/isWithinInterval/index.js");

const filteringStrategies = [{
  type: 'all',
  filter: function filter(tasks) {
    return tasks;
  }
}, {
  type: 'date',
  filter: function filter(tasks, date) {
    return tasks.filter(task => (0,date_fns__WEBPACK_IMPORTED_MODULE_0__["default"])(new Date(task.date), date));
  }
}, {
  type: 'date-range',
  filter: function filter(tasks, dateRange) {
    return tasks.filter(task => (0,date_fns__WEBPACK_IMPORTED_MODULE_1__["default"])(new Date(task.date), dateRange));
  }
}, {
  type: 'project',
  filter: function filter(tasks, projectId) {
    return tasks.filter(task => task.projectId === projectId);
  }
}, {
  type: 'category',
  filter: function filter(tasks, categoryId) {
    return tasks.filter(task => task.categoryId === categoryId);
  }
}];
class Filter {
  constructor() {
    this.strategies = new Map();
    this.addStrategies(filteringStrategies);
  }
  addStrategies(strategies) {
    strategies.forEach(strategy => {
      this.strategies.set(strategy.type, strategy.filter);
    });
  }
  filterBy(type, tasks, filterValue) {
    const filter = this.strategies.get(type);
    if (filter) {
      return filter(tasks, filterValue);
    }
    return tasks;
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Filter);

/***/ }),

/***/ "./src/strategies/Sorter.js":
/*!**********************************!*\
  !*** ./src/strategies/Sorter.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const sortingStrategies = [{
  type: 'priority',
  sort: tasks => [...tasks].sort((a, b) => Number(a.priority) - Number(b.priority))
}, {
  type: 'due date',
  sort: tasks => [...tasks].sort((a, b) => new Date(a.date) - new Date(b.date))
}];
class Sorter {
  constructor() {
    this.strategies = new Map();
    this.addStrategies(sortingStrategies);
  }
  addStrategies(strategies) {
    strategies.forEach(strategy => {
      this.strategies.set(strategy.type, strategy.sort);
    });
  }
  sortBy(type, tasks) {
    const sort = this.strategies.get(type);
    if (sort) {
      return sort(tasks);
    }
    return tasks;
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Sorter);

/***/ }),

/***/ "./src/utils/DummyContent.js":
/*!***********************************!*\
  !*** ./src/utils/DummyContent.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const dummyData = {
  categories: [{
    id: 'category-176fce0b-00cd-45f0-8f2c-e08f6016665e',
    dataType: 'category',
    title: 'Personal'
  }, {
    id: 'category-e99a4e45-a4ed-48f2-9329-6046497f04ed',
    dataType: 'category',
    title: 'Work'
  }, {
    id: 'category-0706088e-328c-49cf-9f02-0afa007f127e',
    dataType: 'category',
    title: 'Education'
  }],
  projects: [{
    id: 'project-faa384ac-85c8-408f-be37-1c9cf1c30506',
    dataType: 'project',
    title: 'Summer vacation',
    categoryId: 'category-176fce0b-00cd-45f0-8f2c-e08f6016665e'
  }, {
    id: 'project-e54bea0c-a5c6-4e7b-8b09-f0a88267f6e3',
    dataType: 'project',
    title: 'e-commerce project ',
    categoryId: 'category-e99a4e45-a4ed-48f2-9329-6046497f04ed'
  }, {
    id: 'project-d6f0c5f2-1a5e-4cef-9370-d69365c0a8a9',
    dataType: 'project',
    title: 'TOP Todo list',
    categoryId: 'category-0706088e-328c-49cf-9f02-0afa007f127e'
  }],
  tasks: [{
    id: 'task-d0b45d0e-c0fb-49e1-b238-196bca740948',
    dataType: 'task',
    completed: false,
    title: 'Check car maintenance',
    description: '',
    date: '2023-08-01',
    projectId: 'project-faa384ac-85c8-408f-be37-1c9cf1c30506',
    priority: '2',
    categoryId: 'category-176fce0b-00cd-45f0-8f2c-e08f6016665e',
    taskProject: 'Summer vacation',
    projectCategory: 'Personal',
    checklist: [{
      dataType: 'checklist-item',
      title: 'Check engin oil',
      checked: false
    }, {
      dataType: 'checklist-item',
      title: 'Check The Engine Coolant',
      checked: false
    }, {
      dataType: 'checklist-item',
      title: 'Test  Brakes',
      checked: false
    }]
  }, {
    id: 'task-153587f8-6792-4620-8568-88183e2b3e02',
    dataType: 'task',
    completed: false,
    title: 'Make hotel reservations',
    description: '',
    date: '2023-07-26',
    projectId: 'project-faa384ac-85c8-408f-be37-1c9cf1c30506',
    priority: '2',
    categoryId: 'category-176fce0b-00cd-45f0-8f2c-e08f6016665e',
    taskProject: 'Summer vacation',
    projectCategory: 'Personal',
    checklist: []
  }, {
    id: 'task-abe3371d-5648-4aa3-b0c8-606a1a3e7d39',
    dataType: 'task',
    completed: false,
    title: 'Go on vacation',
    description: '',
    date: '2023-08-05',
    projectId: 'project-faa384ac-85c8-408f-be37-1c9cf1c30506',
    priority: '1',
    categoryId: 'category-176fce0b-00cd-45f0-8f2c-e08f6016665e',
    taskProject: 'Summer vacation',
    projectCategory: 'Personal',
    checklist: []
  }, {
    id: 'task-ccf60179-dca1-472a-9fa4-75a41076f49e',
    dataType: 'task',
    completed: false,
    title: 'Kick off meeting',
    description: '',
    date: '2023-07-31',
    projectId: 'project-e54bea0c-a5c6-4e7b-8b09-f0a88267f6e3',
    priority: '1',
    categoryId: 'category-e99a4e45-a4ed-48f2-9329-6046497f04ed',
    taskProject: 'e-commerce project ',
    projectCategory: 'Work',
    checklist: [{
      dataType: 'checklist-item',
      title: 'Take client specifications',
      checked: false
    }, {
      dataType: 'checklist-item',
      title: 'Discus reasonable deadline',
      checked: false
    }]
  }, {
    id: 'task-9ccd1b42-aa7a-4788-bab3-863b7bf039bc',
    dataType: 'task',
    completed: true,
    title: 'Finishing last touches',
    description: '',
    date: '2023-07-27',
    projectId: 'project-d6f0c5f2-1a5e-4cef-9370-d69365c0a8a9',
    priority: '1',
    categoryId: 'category-0706088e-328c-49cf-9f02-0afa007f127e',
    taskProject: 'TOP Todo list',
    projectCategory: 'Education',
    checklist: [{
      dataType: 'checklist-item',
      title: 'Try to add some animations',
      checked: true
    }, {
      dataType: 'checklist-item',
      title: 'Make website mockup images',
      checked: false
    }, {
      dataType: 'checklist-item',
      title: 'Publish on discord server',
      checked: true
    }]
  }]
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dummyData);

/***/ }),

/***/ "./src/utils/ElementBuilder.js":
/*!*************************************!*\
  !*** ./src/utils/ElementBuilder.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function createElement(tag) {
  const element = document.createElement(tag);
  Object.assign(element, elementMixin);
  return element;
}
const elementMixin = {
  setAttributes(attributes) {
    Object.entries(attributes).forEach(_ref => {
      let [key, value] = _ref;
      if (Array.isArray(value)) {
        this.setAttribute(key, value.join(' '));
      } else {
        this.setAttribute(key, value);
      }
    });
    return this;
  },
  setState(state) {
    if (this.isConnected) {
      Object.assign(this.state, state);
      this.clear();
      this.render();
    } else {
      this.state = state;
    }
    return this;
  },
  // updateState(state) {
  //    Object.assign(this.state, state);
  //    this.clear();
  //    this.render();
  // },

  checkForOtherActiveElm(ev) {
    const activeElm = document.querySelector(`[active]`);
    if (activeElm !== this && activeElm !== null) {
      activeElm.showError();
      ev.preventDefault();
    }
  },
  showError() {
    this.classList.add('error');
    setTimeout(() => {
      this.querySelector('input').focus();
      this.classList.remove('error');
    }, 1400);
  },
  getState() {
    return this.state;
  },
  setContent(content) {
    this.textContent = content;
    return this;
  },
  appendChildren(childElements) {
    if (Array.isArray(childElements)) {
      childElements.forEach(child => {
        this.appendChild(child);
      });
    } else {
      this.appendChild(childElements);
    }
    return this;
  },
  clear() {
    while (this.firstChild) {
      this.removeChild(this.firstChild);
    }
  },
  appendTo(parent) {
    parent.appendChild(this);
    return this;
  },
  prependTo(parent) {
    parent.prepend(this);
    return this;
  },
  appendIcon(icon) {
    createElement('i').setAttributes({
      class: icon
    }).appendTo(this);
    return this;
  },
  prependIcon(icon) {
    createElement('i').setAttributes({
      class: icon
    }).prependTo(this);
    return this;
  },
  capitalFirstLetter() {
    this.textContent = this.textContent.charAt(0).toUpperCase() + this.textContent.slice(1);
    return this;
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createElement);

/***/ }),

/***/ "./src/utils/IdGenerator.js":
/*!**********************************!*\
  !*** ./src/utils/IdGenerator.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/v4.js");

function createNewID() {
  return (0,uuid__WEBPACK_IMPORTED_MODULE_0__["default"])().toString();
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createNewID);

/***/ }),

/***/ "./src/utils/ObjectBuilder.js":
/*!************************************!*\
  !*** ./src/utils/ObjectBuilder.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _IdGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./IdGenerator */ "./src/utils/IdGenerator.js");

class ObjectBuilder {
  constructor() {
    let data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    this.validateTitle(data.title);
    if (!data.id || data.id === '') this.id = `${data.dataType ? data.dataType : 'id'}-${(0,_IdGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])()}`;
    this.setProperties(data);
  }
  validateTitle(title) {
    if (!title || title === '') {
      throw new Error('Cannot create the object without a title');
    }
  }
  setProperties(data) {
    return Object.assign(this, data);
  }
  updateProperties(data) {
    Object.keys(data).forEach(key => {
      this[key] = data[key];
    });
  }
  getProperty(property) {
    return this[property];
  }
  editProperty(property, newValue) {
    this[property] = newValue;
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ObjectBuilder);

/***/ }),

/***/ "./src/utils/PubSub.js":
/*!*****************************!*\
  !*** ./src/utils/PubSub.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const pubsub = {
  events: {},
  subscriptionsId: -1,
  publish(event, data) {
    if (!this.events[event]) {
      return false;
    }
    this.events[event].forEach(subscription => {
      subscription.func(data);
    });
    return true;
  },
  subscribe(event, func) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.subscriptionsId += 1;
    const token = this.subscriptionsId.toString();
    this.events[event].push({
      token,
      func
    });
    return token;
  },
  unsubscribe(token) {
    const found = Object.keys(this.events).some(event => this.events[event].some((subscription, index) => {
      const areEqual = subscription.token === token.toString();
      if (areEqual) {
        this.events[event].splice(index, 1);
      }
      return areEqual;
    }));
    return found ? token : null;
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (pubsub);

/***/ }),

/***/ "./src/views/components/AddTaskForm.js":
/*!*********************************************!*\
  !*** ./src/views/components/AddTaskForm.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_PubSub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/PubSub */ "./src/utils/PubSub.js");
/* harmony import */ var _utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/ElementBuilder */ "./src/utils/ElementBuilder.js");


class AddTaskForm extends HTMLFormElement {
  constructor(state) {
    super();
    this.state = state;
  }
  connectedCallback() {
    this.render();
    this.addEventListeners();
  }
  render() {
    this.id = 'new-task-form';
    const closeFormBtn = (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_1__["default"])('button').setAttributes({
      type: 'button',
      class: 'close-form',
      name: 'close-form'
    }).appendIcon('fa-solid fa-circle-xmark').appendTo(this);
    const titleInput = (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_1__["default"])('input').setAttributes({
      type: 'text',
      name: 'title-input',
      placeholder: 'Create a task',
      maxlength: '50',
      minlength: '5',
      required: ''
    }).appendTo(this);
    const openFormBtn = (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_1__["default"])('button').setAttributes({
      type: 'button',
      class: 'open-form',
      name: 'open-form'
    }).setContent('New Task').prependIcon('fa-solid fa-feather-pointed').appendTo(this);
    const hiddenInputs = (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_1__["default"])('fieldset').setAttributes({
      class: 'hidden-inputs'
    }).appendTo(this);
    const descriptionInput = (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_1__["default"])('textarea').setAttributes({
      type: 'text',
      name: 'description-input',
      placeholder: 'Enter a description',
      maxlength: '300',
      rows: '3'
    }).appendTo(hiddenInputs);
    const selectionInputs = (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_1__["default"])('div').setAttributes({
      class: 'selection-inputs'
    }).appendTo(hiddenInputs);
    const dateInput = (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_1__["default"])('input').setAttributes({
      type: 'date',
      name: 'date-input',
      min: new Date().toISOString().split('T')[0],
      value: new Date().toISOString().split('T')[0]
    }).appendTo(selectionInputs);
    const selectProject = (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_1__["default"])('select').setAttributes({
      class: 'select-project',
      name: 'select-project'
      // required: '',
    }).appendTo(selectionInputs);
    const selectPriority = (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_1__["default"])('select').setAttributes({
      class: 'select-priority',
      name: 'select-priority'
    }).appendTo(selectionInputs);
    const submitBtn = (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_1__["default"])('button').setAttributes({
      type: 'submit',
      name: 'save-task'
    }).setContent('Add Task').prependIcon('fa-regular fa-calendar-plus').appendTo(hiddenInputs);
    this.setupSelectProjectList(selectProject);
    this.setUpPriorities(selectPriority);
    this.setAttribute('expanded', false);
  }
  expand() {
    this.setAttribute('active', '');
    this.setAttribute('expanded', true);
    const titleInput = this.querySelector('input[name=title-input]');
    titleInput.setAttribute('placeholder', 'Title');
    titleInput.focus();
  }
  contract() {
    this.removeAttribute('active');
    this.setAttribute('expanded', false);
    this.reset();
    this.querySelector('input[name=title-input]').setAttribute('placeholder', 'Create a task');
  }
  showError() {
    this.classList.add('error');
    setTimeout(() => {
      this.querySelector('input[name=title-input]').focus();
      this.classList.remove('error');
    }, 1400);
  }
  setupSelectProjectList(selectProject) {
    const noProjectOption = (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_1__["default"])('option').setAttributes({
      selected: '',
      value: ''
      // disabled: '',
      // hidden: '',
    }).setContent('Select a project').prependTo(selectProject);
    this.state.categories.forEach(category => {
      const optGrp = (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_1__["default"])('optgroup').setAttributes({
        label: category.title,
        id: category.id
      });
      const categoryProjects = this.state.projects.filter(project => project.categoryId === category.id);
      categoryProjects.forEach(project => {
        const option = (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_1__["default"])('option').setAttributes({
          id: project.id
        }).setContent(project.title);
        if (this.state.currentFilter.type === 'project' && project.id === this.state.currentFilter.value) {
          option.setAttribute('selected', '');
          noProjectOption.removeAttribute('selected');
        }
        optGrp.appendChild(option);
      });
      selectProject.appendChild(optGrp);
    });
  }
  setUpPriorities(selectPriority) {
    const priorities = ['1', '2', '3', '4'];
    priorities.forEach(priority => {
      const option = (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_1__["default"])('option').setAttributes({
        class: 'priority',
        id: priority
      }).prependIcon('fa-solid fa-flag').setContent(`Priority ${priority}`).appendTo(selectPriority);
    });
  }
  addEventListeners() {
    this.addEventListener('submit', ev => {
      ev.preventDefault();
      this.passData();
      this.contract();
    });
    this.addEventListener('click', ev => {
      if (document.querySelector(`[active]`) && document.querySelector(`[active]`) !== this) {
        document.querySelector(`[active]`).showError();
        ev.preventDefault();
        return;
      }
      if (ev.target.name === 'open-form') {
        this.expand();
      } else if (ev.target.classList.contains('close-form')) {
        this.contract();
      }
    });
  }
  passData() {
    const selectProject = this.elements['select-project'];
    const selectPriority = this.elements['select-priority'];
    const formData = {
      dataType: 'task',
      completed: false,
      title: this.elements['title-input'].value,
      description: this.elements['description-input'].value,
      date: this.elements['date-input'].value,
      projectId: selectProject.options[selectProject.selectedIndex].id,
      priority: selectPriority.options[selectPriority.selectedIndex].id,
      categoryId: selectProject.options[selectProject.selectedIndex].parentElement.id
    };
    _utils_PubSub__WEBPACK_IMPORTED_MODULE_0__["default"].publish('task:add', formData);
  }
}
customElements.define('add-task-form', AddTaskForm, {
  extends: 'form'
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AddTaskForm);

/***/ }),

/***/ "./src/views/components/EditableListItem.js":
/*!**************************************************!*\
  !*** ./src/views/components/EditableListItem.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/ElementBuilder */ "./src/utils/ElementBuilder.js");
/* harmony import */ var _utils_PubSub__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/PubSub */ "./src/utils/PubSub.js");


class ListItem extends HTMLElement {
  connectedCallback() {
    this.render();
    this.addEventListeners();
  }
  render() {
    const title = (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_0__["default"])('div').setContent(this.state.title).setAttributes({
      class: 'item-title'
    }).capitalFirstLetter().appendTo(this);
    this.setAttribute('data-type', this.state.dataType);
    if (this.state.id) this.setAttribute('id', this.state.id);
    const buttons = (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_0__["default"])('div').setAttributes({
      class: 'item-buttons'
    }).appendTo(this);
    const editBtn = (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_0__["default"])('button').appendIcon('fa-solid fa-pen').setAttributes({
      class: 'edit-item',
      type: 'button'
    }).appendTo(buttons);
    const deleteBtn = (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_0__["default"])('button').appendIcon('fa-regular fa-trash-can').setAttributes({
      class: 'delete-item',
      type: 'button'
    }).appendTo(buttons);
    const saveBtn = (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_0__["default"])('button').appendIcon('fa-solid fa-check').setAttributes({
      class: 'save-item',
      type: 'button'
    }).appendTo(buttons);
    const cancelBtn = (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_0__["default"])('button').appendIcon('fa-solid fa-xmark').setAttributes({
      class: 'cancel-editing'
    }).appendTo(buttons);
  }
  addEventListeners() {
    this.addEventListener('click', ev => {
      if (document.querySelector(`[active]`) && document.querySelector(`[active]`) !== this && !this.closest('exp-list').classList.contains('checklist')) {
        document.querySelector(`[active]`).showError();
        ev.preventDefault();
        return;
      }
      if (ev.target.classList.contains('edit-item')) this.startEditItem();else if (ev.target.classList.contains('delete-item')) this.deleteItem();
      if (ev.target.classList.contains('save-item')) this.saveItem();
      if (ev.target.classList.contains('cancel-editing')) this.cancelChanges();
    });
    document.addEventListener('mousedown', ev => {
      if (!this.hasAttribute('active')) return;
      if (this.hasAttribute('active') && ev.target.closest('editable-li') !== this) {
        this.showError();
      }
    });
  }

  // showError() {
  //    this.classList.add('error');
  //    setTimeout(() => {
  //       this.querySelector('input').focus();
  //       this.classList.remove('error');
  //    }, 1400);
  // }

  startEditItem() {
    const input = (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_0__["default"])('input').setAttributes({
      minlength: '4',
      maxlength: '30',
      placeholder: `New ${this.getAttribute('data-type')}`,
      value: this.state.title || '',
      type: 'text',
      class: 'editing-input'
    }).appendTo(this);
    input.focus();
    this.setAttributes({
      active: ''
    });
  }
  endEditItem() {
    const input = this.querySelector('input');
    this.removeAttribute('active');
    input.remove();
  }
  cancelChanges() {
    if (!this.getAttribute('id')) {
      if (this.classList.contains('list-header')) this.parentElement.remove();else this.remove();
      return;
    }
    const title = this.querySelector('.item-title');
    title.textContent = this.state.title;
    title.capitalFirstLetter();
    this.endEditItem();
    this.removeAttribute('active');
  }
  deleteItem() {
    _utils_PubSub__WEBPACK_IMPORTED_MODULE_1__["default"].publish(`${this.getAttribute('data-type')}:delete`, this);
    this.remove();
  }
  saveItem() {
    const input = this.querySelector('input');
    const title = this.querySelector('.item-title');
    if (!input.value || input.value.length < 4 || input.value.length > 30) {
      this.showError();
      return;
    }
    title.textContent = input.value;
    title.capitalFirstLetter();
    this.setAttribute('parent-list', this.parentElement.getAttribute('list-id'));
    this.state.title = input.value;
    this.endEditItem();
    if (this.getAttribute('id')) {
      _utils_PubSub__WEBPACK_IMPORTED_MODULE_1__["default"].publish(`${this.getAttribute('data-type')}:update`, this);
    } else {
      _utils_PubSub__WEBPACK_IMPORTED_MODULE_1__["default"].publish(`${this.getAttribute('data-type')}:add`, this);
    }
  }
}
customElements.define('editable-li', ListItem);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ListItem);

/***/ }),

/***/ "./src/views/components/ExpandableList.js":
/*!************************************************!*\
  !*** ./src/views/components/ExpandableList.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _formkit_auto_animate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @formkit/auto-animate */ "./node_modules/@formkit/auto-animate/index.mjs");
/* harmony import */ var _utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/ElementBuilder */ "./src/utils/ElementBuilder.js");
/* harmony import */ var _utils_PubSub__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/PubSub */ "./src/utils/PubSub.js");
/* harmony import */ var _EditableListItem__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./EditableListItem */ "./src/views/components/EditableListItem.js");




class ExpandableList extends HTMLElement {
  connectedCallback() {
    this.render();
    this.addEventListeners();
  }
  render() {
    const listHeader = (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_1__["default"])('editable-li').setState(this.state.header).setAttributes({
      class: 'list-header'
    });
    const listUl = (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_1__["default"])('ul').setAttributes({
      'list-id': this.state.header.id || null,
      class: 'items-list',
      'items-type': this.state.items.type
    });
    (0,_formkit_auto_animate__WEBPACK_IMPORTED_MODULE_0__["default"])(listUl);
    if (this.state.items.list) {
      this.state.items.list.forEach(item => {
        const itemLI = (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_1__["default"])('editable-li').setState(item);
        listUl.appendChild(itemLI);
      });
    }
    this.appendChild(listHeader);
    this.appendChild(listUl);
    const addItemBtn = (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_1__["default"])('button').setAttributes({
      class: 'add-item'
    }).appendIcon('fa-solid fa-plus');
    listHeader.querySelector('.item-buttons').prepend(addItemBtn);
  }
  toggleList() {
    this.toggleAttribute('expanded');
  }
  addEventListeners() {
    this.addEventListener('click', ev => {
      if (document.querySelector(`[active]`) && !this.contains(document.querySelector(`[active]`)) && !this.classList.contains('checklist')) {
        document.querySelector(`[active]`).showError();
        ev.preventDefault();
        return;
      }
      if (!document.querySelector('editable-li[active]') && ev.target.classList.contains('add-item')) {
        this.addItem();
      }
    });
  }
  addItem() {
    if (!this.hasAttribute('expanded')) this.toggleList();
    const itemsList = this.querySelector('.items-list');
    const itemType = itemsList.getAttribute('items-type');
    const newItem = (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_1__["default"])('editable-li').setState({
      dataType: itemType
    });
    itemsList.appendChild(newItem);
    newItem.startEditItem();
  }
}
customElements.define('exp-list', ExpandableList);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ExpandableList);

/***/ }),

/***/ "./src/views/components/ProjectList.js":
/*!*********************************************!*\
  !*** ./src/views/components/ProjectList.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/ElementBuilder */ "./src/utils/ElementBuilder.js");
/* harmony import */ var _utils_PubSub__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/PubSub */ "./src/utils/PubSub.js");
/* harmony import */ var _ExpandableList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ExpandableList */ "./src/views/components/ExpandableList.js");



class ProjectList extends HTMLElement {
  connectedCallback() {
    this.render();
    this.addEventListeners();
  }
  render() {
    this.setAttribute('id', 'projects-list');
    const header = (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_0__["default"])('h3').setContent('Projects').prependIcon('fa-solid fa-bars-progress').setAttributes({
      class: 'projects-list-header'
    });
    this.prepend(header);
    this.buildProjectsList();
    const addCategoryBtn = (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_0__["default"])('button').setAttributes({
      class: 'add-category-btn'
    }).setContent('New projects list...').prependIcon('fa-solid fa-square-plus');
    this.append(addCategoryBtn);
  }
  buildProjectsList() {
    this.state.categories.forEach(category => {
      const categoryProjects = this.state.projects.filter(project => project.categoryId === category.id);
      this.createCategoryList(category, categoryProjects);
    });
  }
  createCategoryList(category, categoryProjects) {
    const list = (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_0__["default"])('exp-list').setState({
      header: category,
      items: {
        type: 'project',
        list: categoryProjects
      }
    });
    this.append(list);
  }
  highlightCurrentFilter(filterData) {
    if (document.querySelector(`[current-filter]`)) {
      document.querySelector(`[current-filter]`).removeAttribute('current-filter');
    }
    this.querySelector(`[id=${filterData.id}]`).setAttribute('current-filter', '');
  }
  addEventListeners() {
    this.addEventListener('click', ev => {
      if (document.querySelector(`[active]`)) return;
      if (ev.target.classList.contains('add-category-btn')) {
        this.createCategoryList({
          dataType: 'category'
        }, null);
        this.lastChild.firstChild.startEditItem();
      } else if (ev.target.closest('editable-li') && !ev.target.parentNode.classList.contains('item-buttons') && !ev.target.closest('editable-li').hasAttribute('active')) {
        const filterElm = ev.target.closest('editable-li');
        const data = {
          id: filterElm.getAttribute('id'),
          type: filterElm.getAttribute('data-type'),
          value: filterElm.getAttribute('id')
        };
        if (filterElm.classList.contains('list-header')) {
          if (!filterElm.hasAttribute('current-filter') && filterElm.closest('exp-list').hasAttribute('expanded')) {
            this.highlightCurrentFilter(filterElm);
            _utils_PubSub__WEBPACK_IMPORTED_MODULE_1__["default"].publish('filter:changed', data);
            return;
          }
          filterElm.closest('exp-list').toggleList();
        }
        this.highlightCurrentFilter(filterElm);
        _utils_PubSub__WEBPACK_IMPORTED_MODULE_1__["default"].publish('filter:changed', data);
      }
    });
  }
}
customElements.define('project-list', ProjectList);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProjectList);

/***/ }),

/***/ "./src/views/components/SideBar.js":
/*!*****************************************!*\
  !*** ./src/views/components/SideBar.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/startOfWeek/index.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/endOfWeek/index.js");
/* harmony import */ var _utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/ElementBuilder */ "./src/utils/ElementBuilder.js");
/* harmony import */ var _utils_PubSub__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/PubSub */ "./src/utils/PubSub.js");



class SideBar extends HTMLElement {
  connectedCallback() {
    this.render();
    this.addEventListeners();
  }
  render() {
    const today = new Date();
    const week = {
      start: (0,date_fns__WEBPACK_IMPORTED_MODULE_2__["default"])(today),
      end: (0,date_fns__WEBPACK_IMPORTED_MODULE_3__["default"])(today)
    };
    const defaultFilters = [{
      title: 'all',
      type: 'all',
      value: 'all',
      icon: 'fa-solid fa-inbox'
    }, {
      title: 'today',
      type: 'date',
      value: today,
      icon: 'fa-solid fa-calendar-day'
    }, {
      title: 'week',
      type: 'date-range',
      value: week,
      icon: 'fa-solid fa-calendar-week'
    }];
    const defaultFiltersUl = (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_0__["default"])('ul').setAttributes({
      class: 'default-filters-ul'
    });
    defaultFilters.forEach(filter => {
      const filterLi = (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_0__["default"])('li').setState(filter).setContent(filter.title).capitalFirstLetter().prependIcon(filter.icon).setAttributes({
        'filter-type': filter.type,
        class: 'default-filter',
        id: filter.title
      });
      if (filter.type === 'all') filterLi.setAttribute('current-filter', '');
      defaultFiltersUl.appendChild(filterLi);
    });
    this.prepend(defaultFiltersUl);
    const header = (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_0__["default"])('header').setAttributes({
      class: 'header'
    }).prependTo(this);
    const icon = (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_0__["default"])('div').setContent('ToBe.').setAttributes({
      class: 'icon'
    }).prependIcon('fa-solid fa-fire').prependTo(header);
    const closeSideBar = (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_0__["default"])('button').appendIcon('fa-solid fa-square-caret-left').setAttributes({
      class: 'close-side-bar'
    }).appendTo(header);
  }
  highlightCurrentFilter(filterData) {
    if (document.querySelector(`[current-filter]`)) {
      document.querySelector(`[current-filter]`).removeAttribute('current-filter');
    }
    this.querySelector(`[id=${filterData.id}]`).setAttribute('current-filter', '');
  }
  addEventListeners() {
    this.addEventListener('click', ev => {
      if (ev.target.classList.contains('default-filter')) {
        if (document.querySelector(`[active]`)) {
          document.querySelector(`[active]`).showError();
          ev.preventDefault();
          return;
        }
        const data = {
          title: ev.target.state.title,
          id: ev.target.getAttribute('id'),
          type: ev.target.getAttribute('filter-type'),
          value: ev.target.getState().value
        };
        this.highlightCurrentFilter(ev.target);
        _utils_PubSub__WEBPACK_IMPORTED_MODULE_1__["default"].publish('filter:changed', data);
      }
      if (ev.target.classList.contains('close-side-bar')) {
        this.parentElement.removeAttribute('sidebar-open');
      }
    });
    _utils_PubSub__WEBPACK_IMPORTED_MODULE_1__["default"].subscribe('filter:changed', data => {
      if (this.querySelector(`.default-filter[id=${data.title}]`)) {
        this.highlightCurrentFilter(this.querySelector(`.default-filter[id=${data.title}]`));
      }
      if (this.querySelector('.close-side-bar')) {
        this.querySelector('.close-side-bar').click();
      }
    });
  }
}
customElements.define('side-bar', SideBar);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SideBar);

/***/ }),

/***/ "./src/views/components/TaskCard.js":
/*!******************************************!*\
  !*** ./src/views/components/TaskCard.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/ElementBuilder */ "./src/utils/ElementBuilder.js");
/* harmony import */ var _utils_PubSub__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/PubSub */ "./src/utils/PubSub.js");


class TaskCard extends HTMLElement {
  connectedCallback() {
    this.render();
    this.addEventListeners();
  }
  render() {
    this.setAttribute('task-id', this.state.id);
    const tags = (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_0__["default"])('div').setAttributes({
      class: 'tags'
    }).appendTo(this);
    if (this.state.taskProject !== '') {
      const category = (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_0__["default"])('div').setContent(this.state.projectCategory).capitalFirstLetter().setAttributes({
        class: 'tag'
      }).appendTo(tags);
      const project = (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_0__["default"])('span').setContent(this.state.taskProject).capitalFirstLetter().setAttributes({
        class: 'tag'
      }).appendTo(tags);
    }
    const date = (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_0__["default"])('div').setContent(this.state.date).setAttributes({
      class: 'tag'
    }).appendTo(tags);
    const priority = (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_0__["default"])('div').setContent(`Priority ${this.state.priority}`).prependIcon('fa-regular fa-flag').setAttributes({
      class: 'tag',
      priority: this.state.priority
    }).appendTo(tags);
    const titleLine = (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_0__["default"])('div').setAttributes({
      class: 'title-line'
    }).appendTo(this);
    const title = (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_0__["default"])('h3').setContent(this.state.title).capitalFirstLetter().setAttributes({
      class: 'title'
    }).appendTo(titleLine);
    const statusDiv = (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_0__["default"])('div').setAttributes({
      class: 'status'
    }).appendTo(titleLine);
    const description = (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_0__["default"])('p').setContent(this.state.description).capitalFirstLetter().setAttributes({
      class: 'description'
    }).appendTo(this);
    const buttons = (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_0__["default"])('div').setAttributes({
      class: 'buttons'
    }).appendTo(this);
    const checkboxContainer = (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_0__["default"])('label').setAttributes({
      class: 'checkbox-label',
      completed: this.state.completed
    }).appendTo(buttons);
    this.setStatus(statusDiv, checkboxContainer);
    const checkbox = (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_0__["default"])('input').setAttributes({
      class: 'completed-checkbox',
      type: 'checkbox'
    }).prependTo(checkboxContainer);
    const checkmark = (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_0__["default"])('div').setAttributes({
      class: 'checkmark'
    }).appendIcon('fa-solid fa-calendar-check').appendTo(checkboxContainer);
    checkbox.checked = this.state.completed;
    const editBtn = (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_0__["default"])('button').appendIcon('fa-solid fa-pen-to-square').setAttributes({
      class: 'edit-btn'
    }).appendTo(buttons);
    const deleteBtn = (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_0__["default"])('button').setAttributes({
      class: 'delete',
      type: 'button'
    }).prependIcon('fa-solid fa-trash-can').appendTo(buttons);
  }
  setStatus(statusDiv, checkboxLabel) {
    const today = new Date().setHours(0, 0, 0);
    const taskDate = new Date(this.state.date).setHours(0, 0, 1);
    if (this.state.completed) {
      statusDiv.setContent('Completed');
      statusDiv.setAttribute('status', 'completed');
      checkboxLabel.setAttribute('completed', true);
    } else if (!this.state.completed && taskDate < today) {
      statusDiv.setContent('Overdue');
      statusDiv.setAttribute('status', 'overdue');
      checkboxLabel.setAttribute('completed', false);
    } else {
      statusDiv.setContent('Pending');
      statusDiv.setAttribute('status', 'pending');
    }
  }
  addEventListeners() {
    this.addEventListener('click', ev => {
      if (document.querySelector(`[active]`)) {
        document.querySelector(`[active]`).showError();
        ev.preventDefault();
        return;
      }
      if (ev.target.classList.contains('delete')) {
        this.remove();
        _utils_PubSub__WEBPACK_IMPORTED_MODULE_1__["default"].publish('task:delete', this.state.id);
      } else if (ev.target.classList.contains('completed-checkbox')) {
        this.state.completed = this.querySelector('.completed-checkbox').checked;
        _utils_PubSub__WEBPACK_IMPORTED_MODULE_1__["default"].publish('task:update', this.state);
      } else if (ev.target.classList.contains('edit-btn') && !document.querySelector('task-details')) {
        this.setAttribute('editing', '');
        _utils_PubSub__WEBPACK_IMPORTED_MODULE_1__["default"].publish('task:edit', this.getAttribute('task-id'));
      }
    });
  }
}
customElements.define('task-card', TaskCard);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TaskCard);

/***/ }),

/***/ "./src/views/components/TaskDetails.js":
/*!*********************************************!*\
  !*** ./src/views/components/TaskDetails.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/ElementBuilder */ "./src/utils/ElementBuilder.js");
/* harmony import */ var _utils_PubSub__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/PubSub */ "./src/utils/PubSub.js");
/* harmony import */ var _ExpandableList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ExpandableList */ "./src/views/components/ExpandableList.js");



class TaskDetails extends HTMLElement {
  connectedCallback() {
    this.render();
    this.addEventListeners();
  }
  render() {
    this.id = 'task-details';
    const icon = (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_0__["default"])('span').appendIcon('fa-solid fa-file-pen').setAttributes({
      class: 'icon'
    }).appendTo(this);
    const form = (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_0__["default"])('form').setAttributes({
      id: 'edit-task-form'
    }).appendTo(this);
    const title = (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_0__["default"])('input').setAttributes({
      type: 'text',
      name: 'title-input',
      value: this.state.task.title.charAt(0).toUpperCase() + this.state.task.title.slice(1),
      maxlength: '50',
      minlength: '5',
      required: ''
    }).appendTo(form);
    const description = (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_0__["default"])('textarea').setAttributes({
      name: 'description-input',
      Placeholder: 'add task description...',
      maxlength: '300',
      rows: '3'
    }).setContent(this.state.task.description).capitalFirstLetter().appendTo(form);
    const date = (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_0__["default"])('input').setAttributes({
      type: 'date',
      name: 'date-input',
      value: `${this.state.task.date}`
    }).appendTo(form);
    this.setupSelectProjectList(form);
    this.setUpPriorities(form);
    this.setupChecklist(form);
    const submitBtnContainer = (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_0__["default"])('div').setAttributes({
      class: 'submit-btn-container'
    }).appendTo(form);
    const submitBtn = (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_0__["default"])('button').setAttributes({
      type: 'submit',
      name: 'save-task'
    }).setContent('Save').prependIcon('fa-solid fa-floppy-disk').appendTo(submitBtnContainer);
    const header = (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_0__["default"])('header').setContent('#Task-details').setAttributes({
      class: 'header'
    }).prependTo(this);
    const closeBtn = (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_0__["default"])('button').setAttributes({
      class: 'close',
      type: 'button',
      name: 'cancel'
    }).appendIcon('fa-solid fa-circle-xmark').appendTo(header);
    this.setAttribute('active', '');
  }
  addEventListeners() {
    this.querySelector('form').addEventListener('submit', ev => {
      ev.preventDefault();
      if (this.querySelector('[active]')) return;
      this.passData();
      this.remove();
    });
    this.addEventListener('click', ev => {
      if (this.querySelector('[active]')) return;
      if (ev.target.closest('[data-type="checklist-item"]') && !ev.target.closest('.item-buttons')) {
        const item = ev.target.closest('[data-type="checklist-item"]');
        item.toggleAttribute('checked');
      }
      if (ev.target.closest('.close')) {
        document.querySelector('task-card[editing]').removeAttribute('editing');
        this.remove();
      }
    });
  }
  passData() {
    const form = this.querySelector('form');
    const selectProject = form.elements['select-project'];
    const selectPriority = form.elements['select-priority'];
    const checklistItems = form.querySelectorAll('[data-type="checklist-item"]');
    const formData = {
      id: this.state.task.id,
      title: form.elements['title-input'].value,
      description: form.elements['description-input'].value,
      date: form.elements['date-input'].value,
      projectId: selectProject.options[selectProject.selectedIndex].id,
      priority: selectPriority.options[selectPriority.selectedIndex].id,
      categoryId: selectProject.options[selectProject.selectedIndex].parentElement.id || null,
      checklist: []
    };
    checklistItems.forEach(item => {
      const itemData = {
        dataType: 'checklist-item',
        title: item.textContent,
        checked: item.hasAttribute('checked')
      };
      formData.checklist.push(itemData);
    });
    _utils_PubSub__WEBPACK_IMPORTED_MODULE_1__["default"].publish('task:update', formData);
  }
  setupSelectProjectList(form) {
    const selectProject = (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_0__["default"])('select').setAttributes({
      class: 'select-project',
      name: 'select-project'
    }).appendTo(form);
    const noProjectOption = (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_0__["default"])('option').setAttributes({
      value: '',
      selected: ''
    }).setContent('Select a project').prependTo(selectProject);
    this.state.categories.forEach(category => {
      const optGrp = (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_0__["default"])('optgroup').setAttributes({
        label: category.title,
        id: category.id
      });
      const categoryProjects = this.state.projects.filter(project => project.categoryId === category.id);
      categoryProjects.forEach(project => {
        const option = (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_0__["default"])('option').setAttributes({
          id: project.id
        }).setContent(project.title).appendTo(optGrp);
        if (project.id === this.state.task.projectId) {
          option.setAttribute('selected', true);
          noProjectOption.removeAttribute('selected');
        }
      });
      selectProject.appendChild(optGrp);
    });
  }
  setUpPriorities(form) {
    const selectPriority = (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_0__["default"])('select').setAttributes({
      class: 'select-priority',
      name: 'select-priority'
    }).appendTo(form);
    const priorities = ['1', '2', '3', '4'];
    priorities.forEach(priority => {
      const option = (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_0__["default"])('option').setAttributes({
        id: priority
      }).setContent(`Priority ${priority}`).appendTo(selectPriority);
      if (priority === this.state.task.priority) {
        option.setAttribute('selected', true);
      }
    });
  }
  setupChecklist(form) {
    const checklist = (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_0__["default"])('exp-list').setAttributes({
      class: 'checklist'
    }).setState({
      header: {
        dataType: 'checklist',
        title: 'Task checklist'
      },
      items: {
        type: 'checklist-item',
        list: this.state.task.checklist
      }
    }).appendTo(form);
    const checklistItems = checklist.querySelectorAll('[data-type=checklist-item]');
    checklistItems.forEach(item => {
      if (item.getState().checked) item.setAttribute('checked', '');
    });
  }
}
customElements.define('task-details', TaskDetails);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TaskDetails);

/***/ }),

/***/ "./src/views/components/TaskList.js":
/*!******************************************!*\
  !*** ./src/views/components/TaskList.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _formkit_auto_animate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @formkit/auto-animate */ "./node_modules/@formkit/auto-animate/index.mjs");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/format/index.js");
/* harmony import */ var _TaskCard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TaskCard */ "./src/views/components/TaskCard.js");
/* harmony import */ var _utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/ElementBuilder */ "./src/utils/ElementBuilder.js");
/* harmony import */ var _AddTaskForm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./AddTaskForm */ "./src/views/components/AddTaskForm.js");
/* harmony import */ var _utils_PubSub__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/PubSub */ "./src/utils/PubSub.js");






class TaskList extends HTMLElement {
  connectedCallback() {
    this.render();
    this.addEventListeners();
  }
  render() {
    const addTaskForm = new _AddTaskForm__WEBPACK_IMPORTED_MODULE_3__["default"]({
      projects: this.state.projects,
      categories: this.state.categories,
      currentFilter: this.state.currentFilter
    });
    this.prepend(addTaskForm);
    const controlSection = (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_2__["default"])('div').setAttributes({
      class: 'control-section'
    }).appendTo(this);
    this.setupControls(controlSection);
    const tasksContainer = (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_2__["default"])('div').setAttributes({
      class: 'tasks-container'
    }).appendTo(this);
    this.state.tasks.forEach(task => {
      const taskCard = this.makeTaskCard(task);
      if (!taskCard) {
        return;
      }
      tasksContainer.appendChild(taskCard);
    });
    const header = (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_2__["default"])('header').setContent(`#Tasks-list`).capitalFirstLetter().setAttributes({
      class: 'header'
    }).prependTo(this);
    if (document.querySelector('[current-filter]')) {
      header.setContent(`#${document.querySelector('[current-filter]').textContent}`);
    }
    const sideBarToggle = (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_2__["default"])('button').setAttributes({
      class: 'toggle-side-bar'
    }).appendIcon('fa-solid fa-bars').prependTo(header);
    const fixedBtnContainer = (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_2__["default"])('div').setAttributes({
      class: 'fixed-btn-container'
    }).appendTo(this);
    const fixedAddTaskBtn = (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_2__["default"])('button').setAttributes({
      class: 'fixed-add-task-btn'
    }).appendIcon('fa-solid fa-plus').appendTo(fixedBtnContainer);
  }
  addEventListeners() {
    this.addEventListener('click', ev => {
      if (ev.target.matches('.toggle-side-bar')) {
        _utils_PubSub__WEBPACK_IMPORTED_MODULE_4__["default"].publish('side-bar:toggle');
      }
      if (ev.target.matches('.fixed-add-task-btn')) {
        this.querySelector('.open-form').click();
        this.scrollTo(0, 0);
      }
    });
    this.addEventListener('scroll', () => {
      const fixedBtn = this.querySelector('.fixed-add-task-btn');
      if (this.scrollTop > 30) {
        fixedBtn.style.display = 'block';
      } else {
        fixedBtn.style.display = 'none';
      }
    });
  }
  updateCard(task) {
    const updatedCard = this.makeTaskCard(task);
    const existingCard = this.querySelector(`task-card[task-id=${task.id}]`);
    this.querySelector('.tasks-container').replaceChild(updatedCard, existingCard);
  }
  makeTaskCard(task) {
    const taskProject = this.state.projects.find(project => project.id === task.projectId);
    if (taskProject) {
      const projectCategory = this.state.categories.find(category => category.id === taskProject.categoryId);
      Object.assign(task, {
        taskProject: taskProject.title,
        projectCategory: projectCategory.title
      });
    } else {
      Object.assign(task, {
        taskProject: '',
        projectCategory: ''
      });
    }
    const newCard = (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_2__["default"])('task-card').setState(task);
    return newCard;
  }
  deleteCard(taskId) {
    const card = this.querySelector(`task-card[task-id=${taskId}]`);
    if (card) this.removeChild(card);
  }
  setupControls(controlSection) {
    const sortingOptions = ['priority', 'due date'];
    const sortingCtrl = (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_2__["default"])('div').setContent('Sort by:').setAttributes({
      class: 'sorting-controls'
    }).appendTo(controlSection);
    sortingOptions.forEach(option => {
      const container = (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_2__["default"])('div').setAttributes({
        class: 'sorting-option'
      });
      const choiceInput = (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_2__["default"])('input').setAttributes({
        type: 'radio',
        id: option,
        name: 'sorting-option',
        value: option
      }).appendTo(container);
      choiceInput.addEventListener('change', event => {
        if (event.target.checked) {
          _utils_PubSub__WEBPACK_IMPORTED_MODULE_4__["default"].publish('sorting:changed', event.target.value);
        }
      });
      if (choiceInput.value === this.state.currentSort) {
        choiceInput.checked = true;
      }
      (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_2__["default"])('label').setAttributes({
        for: option
      }).setContent(option).capitalFirstLetter().appendTo(container);
      sortingCtrl.appendChild(container);
    });
    if (this.state.currentFilter.type === 'date' || this.state.currentFilter.type === 'date-range') {
      const nextPreviousBtns = (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_2__["default"])('div').setAttributes({
        class: 'next-previous-btns'
      }).appendTo(controlSection);
      (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_2__["default"])('span').setContent('Previous/Next').setAttributes({
        class: 'next-previous-btns-label'
      }).appendTo(nextPreviousBtns);
      (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_2__["default"])('button').setAttributes({
        class: 'previous-btn'
      }).appendIcon('fa-solid fa-angle-left').appendTo(nextPreviousBtns);
      const label = (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_2__["default"])('div').setAttributes({
        class: 'dates'
      }).appendTo(nextPreviousBtns);
      if (this.state.currentFilter.type === 'date-range') {
        (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_2__["default"])('div').setContent((0,date_fns__WEBPACK_IMPORTED_MODULE_5__["default"])(this.state.currentFilter.value.start, 'E, MMM dd yyyy')).appendTo(label);
        (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_2__["default"])('div').setContent((0,date_fns__WEBPACK_IMPORTED_MODULE_5__["default"])(this.state.currentFilter.value.end, 'E, MMM dd yyyy')).appendTo(label);
      }
      if (this.state.currentFilter.type === 'date') {
        (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_2__["default"])('div').setContent((0,date_fns__WEBPACK_IMPORTED_MODULE_5__["default"])(this.state.currentFilter.value, 'E, MMM dd yyyy')).appendTo(label);
      }
      (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_2__["default"])('button').setAttributes({
        class: 'next-btn'
      }).appendIcon('fa-solid fa-angle-right').appendTo(nextPreviousBtns);
      nextPreviousBtns.addEventListener('click', event => {
        if (event.target.classList.contains('next-btn')) {
          if (this.state.currentFilter.type === 'date-range') {
            this.state.currentFilter.value.start.setDate(this.state.currentFilter.value.start.getDate() + 7);
            this.state.currentFilter.value.end.setDate(this.state.currentFilter.value.end.getDate() + 7);
          }
          if (this.state.currentFilter.type === 'date') {
            this.state.currentFilter.value.setDate(this.state.currentFilter.value.getDate() + 1);
          }
        }
        if (event.target.classList.contains('previous-btn')) {
          if (this.state.currentFilter.type === 'date-range') {
            this.state.currentFilter.value.start.setDate(this.state.currentFilter.value.start.getDate() - 7);
            this.state.currentFilter.value.end.setDate(this.state.currentFilter.value.end.getDate() - 7);
          }
          if (this.state.currentFilter.type === 'date') {
            this.state.currentFilter.value.setDate(this.state.currentFilter.value.getDate() - 1);
          }
        }
        _utils_PubSub__WEBPACK_IMPORTED_MODULE_4__["default"].publish('filter:changed', this.state.currentFilter);
      });
    }
  }
}
customElements.define('task-list', TaskList);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TaskList);

/***/ }),

/***/ "./src/views/pages/AppPage.js":
/*!************************************!*\
  !*** ./src/views/pages/AppPage.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _formkit_auto_animate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @formkit/auto-animate */ "./node_modules/@formkit/auto-animate/index.mjs");
/* harmony import */ var _utils_PubSub__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/PubSub */ "./src/utils/PubSub.js");
/* harmony import */ var _utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/ElementBuilder */ "./src/utils/ElementBuilder.js");
/* harmony import */ var _components_TaskDetails__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/TaskDetails */ "./src/views/components/TaskDetails.js");




class AppPage extends HTMLElement {
  connectedCallback() {
    (0,_formkit_auto_animate__WEBPACK_IMPORTED_MODULE_0__["default"])(this);
    this.addEventListeners();
  }
  openTaskDetails(taskEditState) {
    if (document.getElementById('task-details')) {
      document.getElementById('task-details').setState(taskEditState);
      return;
    }
    const taskDetails = (0,_utils_ElementBuilder__WEBPACK_IMPORTED_MODULE_2__["default"])('task-details').setState(taskEditState).appendTo(this);
  }
  toggleSideBar() {
    this.toggleAttribute('sidebar-open');
  }
  addEventListeners() {
    window.addEventListener('resize', () => {
      if (this.offsetWidth >= 700 && this.hasAttribute('sidebar-open')) {
        this.removeAttribute('sidebar-open');
      }
    });
  }
}
customElements.define('app-page', AppPage);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AppPage);

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/assets/css/reset.css":
/*!************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/assets/css/reset.css ***!
  \************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* http://meyerweb.com/eric/tools/css/reset/ \n   v2.0 | 20110126\n   License: none (public domain)\n*/\n\nhtml,\nbody,\ndiv,\nspan,\napplet,\nobject,\niframe,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\np,\nblockquote,\npre,\na,\nabbr,\nacronym,\naddress,\nbig,\ncite,\ncode,\ndel,\ndfn,\nem,\nimg,\nins,\nkbd,\nq,\ns,\nsamp,\nsmall,\nstrike,\nstrong,\nsub,\nsup,\ntt,\nvar,\nb,\nu,\ni,\ncenter,\ndl,\ndt,\ndd,\nol,\nul,\nli,\nfieldset,\nform,\nlabel,\nlegend,\ntable,\ncaption,\ntbody,\ntfoot,\nthead,\ntr,\nth,\ntd,\narticle,\naside,\ncanvas,\ndetails,\nembed,\nfigure,\nfigcaption,\nfooter,\nheader,\nhgroup,\nmenu,\nnav,\noutput,\nruby,\nsection,\nsummary,\ntime,\nmark,\naudio,\nvideo {\n   margin: 0;\n   padding: 0;\n   border: 0;\n   font-size: 100%;\n   font: inherit;\n   vertical-align: baseline;\n}\n/* HTML5 display-role reset for older browsers */\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nmenu,\nnav,\nsection {\n   display: block;\n}\nbody {\n   line-height: 1;\n}\nol,\nul {\n   list-style: none;\n}\nblockquote,\nq {\n   quotes: none;\n}\nblockquote:before,\nblockquote:after,\nq:before,\nq:after {\n   content: '';\n   content: none;\n}\ntable {\n   border-collapse: collapse;\n   border-spacing: 0;\n}\n", "",{"version":3,"sources":["webpack://./src/assets/css/reset.css"],"names":[],"mappings":"AAAA;;;CAGC;;AAED;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;GAiFG,SAAS;GACT,UAAU;GACV,SAAS;GACT,eAAe;GACf,aAAa;GACb,wBAAwB;AAC3B;AACA,gDAAgD;AAChD;;;;;;;;;;;GAWG,cAAc;AACjB;AACA;GACG,cAAc;AACjB;AACA;;GAEG,gBAAgB;AACnB;AACA;;GAEG,YAAY;AACf;AACA;;;;GAIG,WAAW;GACX,aAAa;AAChB;AACA;GACG,yBAAyB;GACzB,iBAAiB;AACpB","sourcesContent":["/* http://meyerweb.com/eric/tools/css/reset/ \n   v2.0 | 20110126\n   License: none (public domain)\n*/\n\nhtml,\nbody,\ndiv,\nspan,\napplet,\nobject,\niframe,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\np,\nblockquote,\npre,\na,\nabbr,\nacronym,\naddress,\nbig,\ncite,\ncode,\ndel,\ndfn,\nem,\nimg,\nins,\nkbd,\nq,\ns,\nsamp,\nsmall,\nstrike,\nstrong,\nsub,\nsup,\ntt,\nvar,\nb,\nu,\ni,\ncenter,\ndl,\ndt,\ndd,\nol,\nul,\nli,\nfieldset,\nform,\nlabel,\nlegend,\ntable,\ncaption,\ntbody,\ntfoot,\nthead,\ntr,\nth,\ntd,\narticle,\naside,\ncanvas,\ndetails,\nembed,\nfigure,\nfigcaption,\nfooter,\nheader,\nhgroup,\nmenu,\nnav,\noutput,\nruby,\nsection,\nsummary,\ntime,\nmark,\naudio,\nvideo {\n   margin: 0;\n   padding: 0;\n   border: 0;\n   font-size: 100%;\n   font: inherit;\n   vertical-align: baseline;\n}\n/* HTML5 display-role reset for older browsers */\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nmenu,\nnav,\nsection {\n   display: block;\n}\nbody {\n   line-height: 1;\n}\nol,\nul {\n   list-style: none;\n}\nblockquote,\nq {\n   quotes: none;\n}\nblockquote:before,\nblockquote:after,\nq:before,\nq:after {\n   content: '';\n   content: none;\n}\ntable {\n   border-collapse: collapse;\n   border-spacing: 0;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/assets/css/style.css":
/*!************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/assets/css/style.css ***!
  \************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.cdnfonts.com/css/gg-sans-2);"]);
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Lilita+One&display=swap);"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "* {\n   margin: 0;\n   padding: 0;\n   box-sizing: border-box;\n   font-family: 'gg sans Medium', sans-serif;\n}\n\n:root {\n   --darkest: #192332;\n   --darker: #1e293b;\n   --dark: #334155;\n   --medium: #475569;\n   --light: #64748b;\n   --lighter: #94a3b8;\n   --lightest: #cbd5e1;\n   --white: #f1f5f9;\n   --gray: #d1d5db;\n   --red: #f87171;\n   --green: #22c55e;\n   --blue: #3b82f6;\n   --blurple: #4f46e5;\n}\n\nbody {\n   height: 100vh;\n   overflow: hidden;\n}\n\napp-page {\n   display: grid;\n   grid-template-columns: 250px 7fr;\n   grid-auto-flow: column;\n   grid-auto-columns: 3fr;\n   justify-items: stretch;\n   justify-content: stretch;\n   color: var(--white);\n   background-color: var(--darkest);\n}\n\ntask-list {\n   height: 100vh;\n   background-color: var(--darker);\n   display: grid;\n   grid-template-rows: 3rem;\n   grid-auto-rows: auto;\n   gap: 0.7rem;\n   justify-content: stretch;\n   justify-items: center;\n   align-content: start;\n   overflow: auto;\n   padding: 0 0.5rem;\n   position: relative;\n}\n\n.fixed-add-task-btn {\n   color: var(--lightest);\n   background-color: var(--blurple);\n   display: none;\n   height: 3rem;\n   width: 3rem;\n   font-family: 'gg sans Medium', sans-serif;\n   font-size: 1rem;\n   border-radius: 1.5rem;\n   font-size: 1.4rem;\n}\n\n.fixed-btn-container {\n   width: min(100%, 900px);\n   display: flex;\n   min-width: 0;\n   position: sticky;\n   justify-content: end;\n   padding-right: 1rem;\n   bottom: 1rem;\n}\n\n.control-section {\n   display: flex;\n   width: min(100%, 900px);\n   gap: 1rem;\n   padding: 0 1rem;\n   align-items: center;\n   white-space: nowrap;\n   justify-content: space-between;\n}\n\n.sorting-controls {\n   display: flex;\n   gap: 0.5rem;\n   align-items: center;\n}\n\n.sorting-option {\n   position: relative;\n}\n\n.sorting-option label {\n   cursor: pointer;\n   white-space: nowrap;\n   line-height: 1.8em;\n   height: 1.8rem;\n   display: flex;\n   align-items: center;\n   background-color: var(--dark);\n   padding: 0 0.6rem;\n   border-radius: 0.9rem;\n}\n\n.sorting-option input[type='radio'] {\n   display: none;\n   position: absolute;\n}\n\n.sorting-option input[type='radio']:checked + label {\n   background-color: var(--dark);\n   border: var(--blurple) solid 1px;\n   filter: brightness(2);\n}\n\n.next-previous-btns {\n   display: flex;\n   gap: 0.5rem;\n   align-items: center;\n}\n\n.next-previous-btns button {\n   display: flex;\n   color: var(--lightest);\n   background-color: var(--dark);\n   font-size: 1rem;\n   padding: 0.3rem 0.6rem;\n   border-radius: 3px;\n}\n\n.next-previous-btns .dates {\n   display: flex;\n   gap: 0.5rem;\n}\n\n.next-previous-btns .dates div {\n   min-width: 8rem;\n   display: flex;\n   justify-content: center;\n}\n\n.tasks-container {\n   width: min(100%, 900px);\n   display: grid;\n   gap: 0.5rem;\n}\n\ntask-card {\n   width: min(100%, 900px);\n   display: grid;\n   grid-auto-flow: row;\n   grid-template-rows: max-content auto auto max-content;\n   height: 8rem;\n   padding: 0.5rem 1rem;\n   border-radius: 0.7rem;\n   background-color: var(--dark);\n   transition: 300ms;\n}\n\ntask-card:hover {\n   background-color: var(--medium);\n   cursor: pointer;\n   transform: translate(0, -2px);\n   box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);\n}\n\ntask-card[editing] {\n   background-color: var(--medium);\n}\n\ntask-card .tags,\ntask-card .title-line,\ntask-card .buttons {\n   display: flex;\n   align-items: center;\n   justify-content: start;\n   gap: 0.5rem;\n}\n\ntask-card .tag {\n   font-size: 0.8rem;\n   border-radius: 1rem;\n   padding: 0.3rem 0.5rem;\n   width: max-content;\n   max-width: 8rem;\n   white-space: nowrap;\n   overflow: hidden;\n   text-overflow: ellipsis;\n   background-color: var(--darker);\n}\n\ntask-card .tag i {\n   margin-right: 4px;\n}\n\ntask-card .tag[priority='1'] i {\n   color: red;\n}\n\ntask-card .tag[priority='2'] i {\n   color: yellow;\n}\n\ntask-card .tag[priority='3'] i {\n   color: green;\n}\n\ntask-card .tag[priority='4'] i {\n   color: blue;\n}\n\ntask-card .title {\n   font-size: 1.4rem;\n}\n\ntask-card .description {\n   color: var(--lightest);\n   font-family: 'gg sans Normal', sans-serif;\n   font-size: 1rem;\n   white-space: nowrap;\n   overflow: hidden;\n   text-overflow: ellipsis;\n   align-self: flex-start;\n}\n\ntask-card .edit-btn,\ntask-card .delete,\ntask-card .checkbox-label {\n   cursor: pointer;\n   height: 1.6rem;\n   width: 2.6rem;\n   font-size: 1rem;\n   background-color: rgba(255, 255, 255, 0);\n   display: flex;\n   align-items: center;\n   justify-content: center;\n   border-radius: 0.7rem;\n}\n\ntask-card .edit-btn {\n   color: var(--light);\n}\n\ntask-card .delete {\n   color: var(--light);\n}\n\ntask-card .delete:hover,\ntask-card .checkbox-label[completed='true'],\ntask-card .checkbox-label:hover,\ntask-card .edit-btn:hover,\ntask-card[editing] .edit-btn {\n   /* color: var(--lighter); */\n   background-color: var(--dark);\n   border: var(--blurple) solid 1px;\n   filter: brightness(2);\n}\n\ntask-card .checkbox-label input {\n   position: absolute;\n   opacity: 0;\n   cursor: pointer;\n   height: 0;\n   width: 0;\n}\n\n.checkmark {\n   color: var(--light);\n}\n\ntask-card .checkbox-label .checkmark:after {\n   left: 0.3em;\n   top: 0.1em;\n   width: 0.25em;\n   height: 0.5em;\n   border: solid white;\n   border-width: 0 0.15em 0.15em 0;\n   transform: rotate(45deg);\n   transition: all 500ms ease-in-out;\n}\n\ntask-card .status {\n   display: flex;\n   align-items: center;\n   width: max-content;\n   height: 1.8rem;\n   padding: 0 0.6rem;\n\n   font-family: 'gg sans Medium', sans-serif;\n   font-size: 1rem;\n   border-radius: 1rem;\n}\n\ntask-card .status[status='completed'] {\n   /* background-color: var(--green); */\n   background: #2cc0531b;\n   border: var(--green) solid 1px;\n   color: var(--green);\n}\n\ntask-card .status[status='overdue'] {\n   /* background-color: var(--green); */\n   background: #c02c2c1b;\n   border: var(--red) solid 1px;\n   color: var(--red);\n}\n\ntask-card .status[status='pending'] {\n   /* background-color: var(--green); */\n   background: #422cc01b;\n   border: var(--blue) solid 1px;\n   color: var(--blue);\n}\n\n#new-task-form {\n   min-width: min(100%, 900px);\n   display: grid;\n   grid-template-columns: auto 1fr auto;\n   align-items: center;\n   padding: 0.5rem;\n   border-radius: 0.7rem;\n   background-color: var(--dark);\n   column-gap: 0.4rem;\n   justify-content: stretch;\n}\n\ninput,\ntextarea,\nbutton {\n   outline: none;\n   border: none;\n}\n\nbutton {\n   display: flex;\n   align-items: center;\n   justify-content: center;\n   gap: 0.3rem;\n   cursor: pointer;\n}\n\nbutton:hover {\n   filter: brightness(1.2);\n}\n\ni {\n   pointer-events: none;\n}\n\n#new-task-form input,\n#new-task-form textarea {\n   padding: 0;\n   outline: none;\n   color: var(--white);\n   border: none;\n   background-color: var(--dark);\n}\n\n#new-task-form [name='title-input'] {\n   height: max-content;\n   font-size: 1.4rem;\n   font-family: 'gg sans medium', sans-serif;\n   justify-self: stretch;\n   grid-column: 2/3;\n}\n\n#new-task-form [name='description-input'] {\n   resize: none;\n   grid-column: 1/-1;\n   font-family: 'gg sans normal', sans-serif;\n}\n\n#new-task-form [name='save-task'] {\n   grid-row: 3/-1;\n}\n\n#new-task-form [name='save-task'],\n#new-task-form [name='open-form'],\ntask-details [name='save-task'] {\n   justify-self: flex-end;\n   color: var(--white);\n   border: none;\n   background-color: var(--blurple);\n   padding: 0 1rem;\n   height: 2.5rem;\n   font-family: 'gg sans Medium', sans-serif;\n   font-size: 1rem;\n   border-radius: 1.2rem;\n   white-space: nowrap;\n}\n\n#new-task-form select,\n#new-task-form [name='date-input'] {\n   outline: none;\n   color: var(--white);\n   border: none;\n   background-color: var(--darker);\n   max-width: 10rem;\n   padding: 0 1rem;\n   height: 2rem;\n   border-radius: 0.5rem;\n   font-family: 'gg sans Medium', sans-serif;\n   font-size: 1rem;\n   white-space: nowrap;\n   overflow: hidden;\n   text-overflow: ellipsis;\n}\n\n#new-task-form .selection-inputs {\n   display: flex;\n   flex-wrap: wrap;\n   gap: 1rem;\n}\n\n#new-task-form[expanded='false'] .hidden-inputs {\n   display: none;\n}\n\n#new-task-form[expanded='true'] .hidden-inputs {\n   grid-column: 2/-1;\n   display: grid;\n\n   grid-template-rows: auto auto auto;\n   gap: 1rem;\n}\n\n#new-task-form .open-form {\n   grid-column: 3/4;\n}\n\n#new-task-form[expanded='true'] .open-form {\n   display: none;\n}\n\n#new-task-form[expanded='false'] .close-form {\n   display: none;\n}\n\n#new-task-form .close-form {\n   cursor: pointer;\n   color: var(--light);\n   background-color: rgba(255, 255, 255, 0);\n\n   font-size: 1.4rem;\n}\n\nside-bar {\n   height: 100vh;\n   display: grid;\n   grid-template-rows: 3rem auto auto;\n   gap: 2.5rem;\n   align-content: start;\n   background-color: var(--dark);\n   overflow: auto;\n   z-index: 1;\n}\n\n.header {\n   z-index: 1;\n   position: sticky;\n   font-size: 1.1rem;\n   top: 0;\n   width: 100%;\n   display: flex;\n   align-items: center;\n   gap: 1rem;\n   justify-self: stretch;\n   border-bottom: var(--darkest) 1.5px solid;\n   background-color: inherit;\n}\n\nside-bar .header {\n   justify-content: space-between;\n\n   padding: 0 1rem;\n}\n\nside-bar .header .icon {\n   display: flex;\n   gap: 0.4rem;\n   font-family: 'Lilita One', cursive;\n   font-size: 1.7rem;\n   background-size: 100%;\n   background-repeat: no-repeat;\n   -webkit-background-clip: text;\n   -webkit-text-fill-color: transparent;\n   -moz-background-clip: text;\n   -moz-text-fill-color: transparent;\n   background-image: linear-gradient(45deg, #f8f161, #af4242);\n}\n\nside-bar .default-filters-ul {\n   padding: 0 0.4rem;\n}\n\nside-bar .default-filter,\nside-bar .projects-list-header {\n   gap: 0.8rem;\n}\n\nside-bar .default-filter i,\nside-bar .projects-list-header i {\n   color: var(--lighter);\n   padding-bottom: 3px;\n}\n\nside-bar .default-filter:hover i,\nside-bar .default-filter[current-filter] i {\n   color: var(--lightest);\n}\n\nproject-list {\n   width: 100%;\n   display: grid;\n   grid-template-rows: repeat(auto-fill, auto);\n   justify-content: stretch;\n   align-content: start;\n   padding: 0 0.5rem;\n   gap: 0.4rem;\n   overflow: hidden;\n}\n\nproject-list exp-list {\n   display: grid;\n\n   align-items: stretch;\n   overflow: hidden;\n}\n\nproject-list exp-list ul {\n   border-top: var(--light) solid 1px;\n   display: grid;\n   gap: 0.2rem;\n   overflow: hidden;\n   padding-left: 1rem;\n   padding-top: 0.2rem;\n   transition: height 0.5s ease-out;\n}\n\nproject-list editable-li,\n.default-filter,\n.projects-list-header {\n   font-size: 1rem;\n   display: flex;\n   align-items: center;\n   align-content: center;\n   position: relative;\n   cursor: pointer;\n   height: 2rem;\n   padding: 0 0.4rem;\n   border-radius: 0.4rem;\n   gap: 0.3rem;\n   white-space: nowrap;\n   overflow: hidden;\n   text-overflow: ellipsis;\n}\n\neditable-li .item-title {\n   text-align: center;\n   line-height: normal;\n   white-space: nowrap;\n   overflow: hidden;\n   text-overflow: ellipsis;\n}\n\neditable-li[active] {\n   background-color: var(--medium);\n   border: var(--lighter) solid 1px;\n}\n\nside-bar [current-filter] {\n   background-color: var(--medium);\n}\n\nside-bar .default-filters-ul {\n   display: grid;\n   gap: 0.3rem;\n}\n\nside-bar editable-li:hover,\n.default-filter:hover {\n   background-color: var(--medium);\n}\n\neditable-li .item-buttons {\n   display: flex;\n   gap: 0.2rem;\n   opacity: 0;\n   position: absolute;\n   right: 4%;\n}\n\neditable-li[active] .item-buttons {\n   opacity: 1;\n}\n\neditable-li:hover .item-buttons {\n   opacity: 1;\n}\n\nproject-list exp-list [data-type='project']::before {\n   display: inline-block;\n   content: '';\n   -webkit-border-radius: 0.2rem;\n   border-radius: 0.2rem;\n   height: 0.5rem;\n   width: 0.4rem;\n   background-color: var(--light);\n}\n\nproject-list exp-list [data-type='category']::before {\n   border-color: var(--lighter);\n   border-style: solid;\n   border-width: 0.15em 0.15em 0 0;\n   content: '';\n   display: inline-block;\n   height: 0.4em;\n   transform: rotate(45deg);\n   width: 0.4em;\n   margin-right: 0.2rem;\n}\n\nproject-list exp-list[expanded] [data-type='category']::before {\n   transform: rotate(135deg);\n}\n\nproject-list exp-list {\n   display: flex;\n   flex-direction: column;\n}\n\nproject-list .add-category-btn {\n   display: flex;\n   justify-content: start;\n   order: 1;\n   color: var(--lighter);\n   background-color: rgba(255, 255, 255, 0);\n   padding: 0 1rem;\n   height: 2rem;\n   font-family: 'gg sans Medium', sans-serif;\n   font-size: 1rem;\n   border-radius: 0.4rem;\n   gap: 1rem;\n}\n\nproject-list .add-category-btn:hover {\n   background-color: var(--medium);\n   color: var(--lightest);\n}\n\nproject-list exp-list[expanded] .items-list {\n   height: auto;\n}\n\nproject-list exp-list .items-list {\n   height: 0;\n}\n\neditable-li .editing-input {\n   outline: none;\n   font-size: 1.1rem;\n   color: var(--lightest);\n   background-color: rgba(255, 255, 255, 0);\n   border-radius: 0.4rem;\n   width: 100%;\n   align-self: stretch;\n}\n\neditable-li[active].error {\n   background-color: var(--red);\n}\n\n[active].error {\n   -webkit-animation: shake 0.2s ease-in-out 0s 2;\n   animation: shake 0.2s ease-in-out 0s 2;\n}\n\neditable-li button {\n   font-size: 0.8rem;\n   height: 1.4rem;\n   width: 1.4rem;\n   border-radius: 0.2rem;\n   background-color: rgba(255, 255, 255, 0);\n   color: var(--gray);\n}\n\neditable-li button:hover {\n   background-color: var(--light);\n   filter: brightness(1.3);\n}\n\neditable-li .save-item,\neditable-li .cancel-editing {\n   display: none;\n}\n\neditable-li[active] .save-item,\neditable-li[active] .cancel-editing {\n   display: block;\n}\n\neditable-li[active] .edit-item,\neditable-li[active] .delete-item,\neditable-li[active] .item-title {\n   display: none;\n}\n\n.checklist {\n   background-color: var(--darker);\n   display: grid;\n   grid-template-rows: repeat(auto-fill, auto);\n   gap: 0.2rem;\n   align-content: start;\n   border-radius: 0.4rem;\n   padding: 1rem;\n}\n\n.checklist editable-li {\n   font-size: 1rem;\n   display: flex;\n   align-items: center;\n   position: relative;\n   cursor: pointer;\n   height: 2.4rem;\n   padding: 0 0.4rem;\n   border-radius: 0.4rem;\n}\n\n.checklist [data-type='checklist-item'][checked]::before {\n   border-color: var(--white);\n}\n\n.checklist [data-type='checklist-item']::before {\n   border-color: var(--dark);\n   border-style: solid;\n   border-width: 0.18em 0.18em 0 0;\n   content: '';\n   display: inline-block;\n   height: 0.4em;\n   transform: rotate(135deg);\n   width: 0.6em;\n   margin-right: 0.6rem;\n}\n\n.checklist editable-li[data-type='checklist'] .edit-item,\n.checklist editable-li[data-type='checklist'] .delete-item {\n   display: none;\n}\n\n.checklist editable-li[data-type='checklist'] .item-buttons {\n   opacity: 1;\n}\n\n.checklist .list-header {\n   border-radius: 0;\n   border-bottom: var(--medium) solid 1px;\n}\n.checklist [data-type='checklist-item'][checked] {\n   text-decoration: line-through;\n}\n\ntask-details {\n   height: 100vh;\n   z-index: 1;\n   display: grid;\n   grid-auto-flow: row dense;\n   min-width: 400px;\n   grid-template-rows: 3rem auto 1fr;\n   align-items: stretch;\n   background-color: var(--dark);\n   border-radius: 0.5rem;\n   align-content: start;\n   justify-items: start;\n   overflow: auto;\n   position: relative;\n   box-shadow: 0px 0 5px 3px rgba(0, 0, 0, 0.5);\n}\n\ntask-details .header {\n   padding-left: 1rem;\n}\n\ntask-details .icon {\n   font-size: 3.5rem;\n   opacity: 50%;\n   padding: 1rem 2rem;\n}\n\ntask-details form {\n   justify-self: stretch;\n   display: flex;\n   flex-direction: column;\n   gap: 1.2rem;\n   padding: 1rem 2rem;\n}\n\ntask-details form select,\ntask-details form [name='date-input'] {\n   outline: none;\n   color: var(--white);\n   border: none;\n   background-color: var(--darker);\n   padding: 0 1rem;\n   min-height: 2rem;\n   width: 14rem;\n   align-self: flex-start;\n   border-radius: 0.5rem;\n   font-family: 'gg sans Medium', sans-serif;\n   font-size: 1rem;\n   white-space: nowrap;\n   overflow: hidden;\n   text-overflow: ellipsis;\n}\n\ntask-details form [name='title-input'],\ntask-details form [name='description-input'] {\n   padding: 0;\n   outline: none;\n   color: var(--white);\n   border: none;\n   background-color: var(--dark);\n}\n\ntask-details form [name='title-input'] {\n   font-size: 1.6rem;\n   font-family: 'gg sans medium', sans-serif;\n}\n\ntask-details form [name='description-input'] {\n   resize: none;\n   min-height: 8rem;\n   font-family: 'gg sans normal', sans-serif;\n}\n\ntask-details .header {\n   position: relative;\n}\n\ntask-details .close {\n   font-size: 1.5rem;\n   position: absolute;\n   right: 1.5rem;\n   color: var(--light);\n   background-color: rgba(255, 255, 255, 0);\n}\n\ntask-details form [name='save-task'] {\n   align-self: end;\n   justify-self: end;\n}\n\ntask-details form .submit-btn-container {\n   display: flex;\n   flex: 1;\n}\n\n@-webkit-keyframes shake {\n   0% {\n   }\n   25% {\n      transform: translateX(1rem);\n   }\n   75% {\n      transform: translateX(-1rem);\n   }\n   100% {\n   }\n}\n\n.material-symbols-outlined {\n   font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48;\n}\n\ntask-list .header .toggle-side-bar,\nside-bar .header .close-side-bar {\n   width: 2rem;\n   height: 2rem;\n   font-size: 1.1rem;\n   border-radius: 0.2rem;\n   color: var(--lightest);\n   background-color: var(--dark);\n}\n\nside-bar .header .close-side-bar {\n   font-size: 1.2rem;\n   display: none;\n}\n\n@media only screen and (min-width: 700px) {\n   app-page {\n      grid-template-columns: 250px 7fr;\n   }\n\n   task-list .header .toggle-side-bar {\n      display: none;\n   }\n\n   .next-previous-btns-label {\n      display: block;\n   }\n}\n\n@media only screen and (max-width: 700px) {\n   html {\n      -ms-overflow-style: none;\n      /* IE and Edge */\n      scrollbar-width: none;\n      max-width: 100vw !important;\n      overflow: hidden !important;\n      overflow-y: auto !important;\n   }\n\n   html ::-webkit-scrollbar {\n      display: none;\n   }\n\n   app-page {\n      grid-template-columns: 0 7fr;\n   }\n\n   app-page[sidebar-open] {\n      grid-template-columns: 7fr;\n   }\n\n   app-page[sidebar-open] side-bar {\n      position: fixed;\n      top: 0;\n      left: 0;\n      height: 100vh;\n      z-index: 2;\n      box-shadow: 5px 0 5px -2px rgba(0, 0, 0, 0.5);\n   }\n\n   app-page[sidebar-open] .close-side-bar {\n      display: block;\n      z-index: 100;\n   }\n\n   task-list .header .toggle-side-bar {\n      display: block;\n   }\n\n   .control-section {\n      flex-wrap: wrap;\n      justify-content: center;\n   }\n\n   .next-previous-btns-label {\n      display: none;\n   }\n\n   .sorting-controls,\n   .next-previous-btns {\n      flex: 1;\n      justify-content: start;\n   }\n\n   .next-previous-btns {\n      flex: 1;\n      justify-content: space-between;\n   }\n}\n\n@media only screen and (max-width: 500px) {\n   html {\n      font-size: 90%;\n   }\n}\n\n::placeholder {\n   color: var(--lighter);\n   opacity: 1;\n}\n\n:-ms-input-placeholder {\n   color: var(--lighter);\n}\n", "",{"version":3,"sources":["webpack://./src/assets/css/style.css"],"names":[],"mappings":"AAGA;GACG,SAAS;GACT,UAAU;GACV,sBAAsB;GACtB,yCAAyC;AAC5C;;AAEA;GACG,kBAAkB;GAClB,iBAAiB;GACjB,eAAe;GACf,iBAAiB;GACjB,gBAAgB;GAChB,kBAAkB;GAClB,mBAAmB;GACnB,gBAAgB;GAChB,eAAe;GACf,cAAc;GACd,gBAAgB;GAChB,eAAe;GACf,kBAAkB;AACrB;;AAEA;GACG,aAAa;GACb,gBAAgB;AACnB;;AAEA;GACG,aAAa;GACb,gCAAgC;GAChC,sBAAsB;GACtB,sBAAsB;GACtB,sBAAsB;GACtB,wBAAwB;GACxB,mBAAmB;GACnB,gCAAgC;AACnC;;AAEA;GACG,aAAa;GACb,+BAA+B;GAC/B,aAAa;GACb,wBAAwB;GACxB,oBAAoB;GACpB,WAAW;GACX,wBAAwB;GACxB,qBAAqB;GACrB,oBAAoB;GACpB,cAAc;GACd,iBAAiB;GACjB,kBAAkB;AACrB;;AAEA;GACG,sBAAsB;GACtB,gCAAgC;GAChC,aAAa;GACb,YAAY;GACZ,WAAW;GACX,yCAAyC;GACzC,eAAe;GACf,qBAAqB;GACrB,iBAAiB;AACpB;;AAEA;GACG,uBAAuB;GACvB,aAAa;GACb,YAAY;GACZ,gBAAgB;GAChB,oBAAoB;GACpB,mBAAmB;GACnB,YAAY;AACf;;AAEA;GACG,aAAa;GACb,uBAAuB;GACvB,SAAS;GACT,eAAe;GACf,mBAAmB;GACnB,mBAAmB;GACnB,8BAA8B;AACjC;;AAEA;GACG,aAAa;GACb,WAAW;GACX,mBAAmB;AACtB;;AAEA;GACG,kBAAkB;AACrB;;AAEA;GACG,eAAe;GACf,mBAAmB;GACnB,kBAAkB;GAClB,cAAc;GACd,aAAa;GACb,mBAAmB;GACnB,6BAA6B;GAC7B,iBAAiB;GACjB,qBAAqB;AACxB;;AAEA;GACG,aAAa;GACb,kBAAkB;AACrB;;AAEA;GACG,6BAA6B;GAC7B,gCAAgC;GAChC,qBAAqB;AACxB;;AAEA;GACG,aAAa;GACb,WAAW;GACX,mBAAmB;AACtB;;AAEA;GACG,aAAa;GACb,sBAAsB;GACtB,6BAA6B;GAC7B,eAAe;GACf,sBAAsB;GACtB,kBAAkB;AACrB;;AAEA;GACG,aAAa;GACb,WAAW;AACd;;AAEA;GACG,eAAe;GACf,aAAa;GACb,uBAAuB;AAC1B;;AAEA;GACG,uBAAuB;GACvB,aAAa;GACb,WAAW;AACd;;AAEA;GACG,uBAAuB;GACvB,aAAa;GACb,mBAAmB;GACnB,qDAAqD;GACrD,YAAY;GACZ,oBAAoB;GACpB,qBAAqB;GACrB,6BAA6B;GAC7B,iBAAiB;AACpB;;AAEA;GACG,+BAA+B;GAC/B,eAAe;GACf,6BAA6B;GAC7B,4EAA4E;AAC/E;;AAEA;GACG,+BAA+B;AAClC;;AAEA;;;GAGG,aAAa;GACb,mBAAmB;GACnB,sBAAsB;GACtB,WAAW;AACd;;AAEA;GACG,iBAAiB;GACjB,mBAAmB;GACnB,sBAAsB;GACtB,kBAAkB;GAClB,eAAe;GACf,mBAAmB;GACnB,gBAAgB;GAChB,uBAAuB;GACvB,+BAA+B;AAClC;;AAEA;GACG,iBAAiB;AACpB;;AAEA;GACG,UAAU;AACb;;AAEA;GACG,aAAa;AAChB;;AAEA;GACG,YAAY;AACf;;AAEA;GACG,WAAW;AACd;;AAEA;GACG,iBAAiB;AACpB;;AAEA;GACG,sBAAsB;GACtB,yCAAyC;GACzC,eAAe;GACf,mBAAmB;GACnB,gBAAgB;GAChB,uBAAuB;GACvB,sBAAsB;AACzB;;AAEA;;;GAGG,eAAe;GACf,cAAc;GACd,aAAa;GACb,eAAe;GACf,wCAAwC;GACxC,aAAa;GACb,mBAAmB;GACnB,uBAAuB;GACvB,qBAAqB;AACxB;;AAEA;GACG,mBAAmB;AACtB;;AAEA;GACG,mBAAmB;AACtB;;AAEA;;;;;GAKG,2BAA2B;GAC3B,6BAA6B;GAC7B,gCAAgC;GAChC,qBAAqB;AACxB;;AAEA;GACG,kBAAkB;GAClB,UAAU;GACV,eAAe;GACf,SAAS;GACT,QAAQ;AACX;;AAEA;GACG,mBAAmB;AACtB;;AAEA;GACG,WAAW;GACX,UAAU;GACV,aAAa;GACb,aAAa;GACb,mBAAmB;GACnB,+BAA+B;GAC/B,wBAAwB;GACxB,iCAAiC;AACpC;;AAEA;GACG,aAAa;GACb,mBAAmB;GACnB,kBAAkB;GAClB,cAAc;GACd,iBAAiB;;GAEjB,yCAAyC;GACzC,eAAe;GACf,mBAAmB;AACtB;;AAEA;GACG,oCAAoC;GACpC,qBAAqB;GACrB,8BAA8B;GAC9B,mBAAmB;AACtB;;AAEA;GACG,oCAAoC;GACpC,qBAAqB;GACrB,4BAA4B;GAC5B,iBAAiB;AACpB;;AAEA;GACG,oCAAoC;GACpC,qBAAqB;GACrB,6BAA6B;GAC7B,kBAAkB;AACrB;;AAEA;GACG,2BAA2B;GAC3B,aAAa;GACb,oCAAoC;GACpC,mBAAmB;GACnB,eAAe;GACf,qBAAqB;GACrB,6BAA6B;GAC7B,kBAAkB;GAClB,wBAAwB;AAC3B;;AAEA;;;GAGG,aAAa;GACb,YAAY;AACf;;AAEA;GACG,aAAa;GACb,mBAAmB;GACnB,uBAAuB;GACvB,WAAW;GACX,eAAe;AAClB;;AAEA;GACG,uBAAuB;AAC1B;;AAEA;GACG,oBAAoB;AACvB;;AAEA;;GAEG,UAAU;GACV,aAAa;GACb,mBAAmB;GACnB,YAAY;GACZ,6BAA6B;AAChC;;AAEA;GACG,mBAAmB;GACnB,iBAAiB;GACjB,yCAAyC;GACzC,qBAAqB;GACrB,gBAAgB;AACnB;;AAEA;GACG,YAAY;GACZ,iBAAiB;GACjB,yCAAyC;AAC5C;;AAEA;GACG,cAAc;AACjB;;AAEA;;;GAGG,sBAAsB;GACtB,mBAAmB;GACnB,YAAY;GACZ,gCAAgC;GAChC,eAAe;GACf,cAAc;GACd,yCAAyC;GACzC,eAAe;GACf,qBAAqB;GACrB,mBAAmB;AACtB;;AAEA;;GAEG,aAAa;GACb,mBAAmB;GACnB,YAAY;GACZ,+BAA+B;GAC/B,gBAAgB;GAChB,eAAe;GACf,YAAY;GACZ,qBAAqB;GACrB,yCAAyC;GACzC,eAAe;GACf,mBAAmB;GACnB,gBAAgB;GAChB,uBAAuB;AAC1B;;AAEA;GACG,aAAa;GACb,eAAe;GACf,SAAS;AACZ;;AAEA;GACG,aAAa;AAChB;;AAEA;GACG,iBAAiB;GACjB,aAAa;;GAEb,kCAAkC;GAClC,SAAS;AACZ;;AAEA;GACG,gBAAgB;AACnB;;AAEA;GACG,aAAa;AAChB;;AAEA;GACG,aAAa;AAChB;;AAEA;GACG,eAAe;GACf,mBAAmB;GACnB,wCAAwC;;GAExC,iBAAiB;AACpB;;AAEA;GACG,aAAa;GACb,aAAa;GACb,kCAAkC;GAClC,WAAW;GACX,oBAAoB;GACpB,6BAA6B;GAC7B,cAAc;GACd,UAAU;AACb;;AAEA;GACG,UAAU;GACV,gBAAgB;GAChB,iBAAiB;GACjB,MAAM;GACN,WAAW;GACX,aAAa;GACb,mBAAmB;GACnB,SAAS;GACT,qBAAqB;GACrB,yCAAyC;GACzC,yBAAyB;AAC5B;;AAEA;GACG,8BAA8B;;GAE9B,eAAe;AAClB;;AAEA;GACG,aAAa;GACb,WAAW;GACX,kCAAkC;GAClC,iBAAiB;GACjB,qBAAqB;GACrB,4BAA4B;GAC5B,6BAA6B;GAC7B,oCAAoC;GACpC,0BAA0B;GAC1B,iCAAiC;GACjC,0DAA0D;AAC7D;;AAEA;GACG,iBAAiB;AACpB;;AAEA;;GAEG,WAAW;AACd;;AAEA;;GAEG,qBAAqB;GACrB,mBAAmB;AACtB;;AAEA;;GAEG,sBAAsB;AACzB;;AAEA;GACG,WAAW;GACX,aAAa;GACb,2CAA2C;GAC3C,wBAAwB;GACxB,oBAAoB;GACpB,iBAAiB;GACjB,WAAW;GACX,gBAAgB;AACnB;;AAEA;GACG,aAAa;;GAEb,oBAAoB;GACpB,gBAAgB;AACnB;;AAEA;GACG,kCAAkC;GAClC,aAAa;GACb,WAAW;GACX,gBAAgB;GAChB,kBAAkB;GAClB,mBAAmB;GACnB,gCAAgC;AACnC;;AAEA;;;GAGG,eAAe;GACf,aAAa;GACb,mBAAmB;GACnB,qBAAqB;GACrB,kBAAkB;GAClB,eAAe;GACf,YAAY;GACZ,iBAAiB;GACjB,qBAAqB;GACrB,WAAW;GACX,mBAAmB;GACnB,gBAAgB;GAChB,uBAAuB;AAC1B;;AAEA;GACG,kBAAkB;GAClB,mBAAmB;GACnB,mBAAmB;GACnB,gBAAgB;GAChB,uBAAuB;AAC1B;;AAEA;GACG,+BAA+B;GAC/B,gCAAgC;AACnC;;AAEA;GACG,+BAA+B;AAClC;;AAEA;GACG,aAAa;GACb,WAAW;AACd;;AAEA;;GAEG,+BAA+B;AAClC;;AAEA;GACG,aAAa;GACb,WAAW;GACX,UAAU;GACV,kBAAkB;GAClB,SAAS;AACZ;;AAEA;GACG,UAAU;AACb;;AAEA;GACG,UAAU;AACb;;AAEA;GACG,qBAAqB;GACrB,WAAW;GACX,6BAA6B;GAC7B,qBAAqB;GACrB,cAAc;GACd,aAAa;GACb,8BAA8B;AACjC;;AAEA;GACG,4BAA4B;GAC5B,mBAAmB;GACnB,+BAA+B;GAC/B,WAAW;GACX,qBAAqB;GACrB,aAAa;GACb,wBAAwB;GACxB,YAAY;GACZ,oBAAoB;AACvB;;AAEA;GACG,yBAAyB;AAC5B;;AAEA;GACG,aAAa;GACb,sBAAsB;AACzB;;AAEA;GACG,aAAa;GACb,sBAAsB;GACtB,QAAQ;GACR,qBAAqB;GACrB,wCAAwC;GACxC,eAAe;GACf,YAAY;GACZ,yCAAyC;GACzC,eAAe;GACf,qBAAqB;GACrB,SAAS;AACZ;;AAEA;GACG,+BAA+B;GAC/B,sBAAsB;AACzB;;AAEA;GACG,YAAY;AACf;;AAEA;GACG,SAAS;AACZ;;AAEA;GACG,aAAa;GACb,iBAAiB;GACjB,sBAAsB;GACtB,wCAAwC;GACxC,qBAAqB;GACrB,WAAW;GACX,mBAAmB;AACtB;;AAEA;GACG,4BAA4B;AAC/B;;AAEA;GACG,8CAA8C;GAC9C,sCAAsC;AACzC;;AAEA;GACG,iBAAiB;GACjB,cAAc;GACd,aAAa;GACb,qBAAqB;GACrB,wCAAwC;GACxC,kBAAkB;AACrB;;AAEA;GACG,8BAA8B;GAC9B,uBAAuB;AAC1B;;AAEA;;GAEG,aAAa;AAChB;;AAEA;;GAEG,cAAc;AACjB;;AAEA;;;GAGG,aAAa;AAChB;;AAEA;GACG,+BAA+B;GAC/B,aAAa;GACb,2CAA2C;GAC3C,WAAW;GACX,oBAAoB;GACpB,qBAAqB;GACrB,aAAa;AAChB;;AAEA;GACG,eAAe;GACf,aAAa;GACb,mBAAmB;GACnB,kBAAkB;GAClB,eAAe;GACf,cAAc;GACd,iBAAiB;GACjB,qBAAqB;AACxB;;AAEA;GACG,0BAA0B;AAC7B;;AAEA;GACG,yBAAyB;GACzB,mBAAmB;GACnB,+BAA+B;GAC/B,WAAW;GACX,qBAAqB;GACrB,aAAa;GACb,yBAAyB;GACzB,YAAY;GACZ,oBAAoB;AACvB;;AAEA;;GAEG,aAAa;AAChB;;AAEA;GACG,UAAU;AACb;;AAEA;GACG,gBAAgB;GAChB,sCAAsC;AACzC;AACA;GACG,6BAA6B;AAChC;;AAEA;GACG,aAAa;GACb,UAAU;GACV,aAAa;GACb,yBAAyB;GACzB,gBAAgB;GAChB,iCAAiC;GACjC,oBAAoB;GACpB,6BAA6B;GAC7B,qBAAqB;GACrB,oBAAoB;GACpB,oBAAoB;GACpB,cAAc;GACd,kBAAkB;GAClB,4CAA4C;AAC/C;;AAEA;GACG,kBAAkB;AACrB;;AAEA;GACG,iBAAiB;GACjB,YAAY;GACZ,kBAAkB;AACrB;;AAEA;GACG,qBAAqB;GACrB,aAAa;GACb,sBAAsB;GACtB,WAAW;GACX,kBAAkB;AACrB;;AAEA;;GAEG,aAAa;GACb,mBAAmB;GACnB,YAAY;GACZ,+BAA+B;GAC/B,eAAe;GACf,gBAAgB;GAChB,YAAY;GACZ,sBAAsB;GACtB,qBAAqB;GACrB,yCAAyC;GACzC,eAAe;GACf,mBAAmB;GACnB,gBAAgB;GAChB,uBAAuB;AAC1B;;AAEA;;GAEG,UAAU;GACV,aAAa;GACb,mBAAmB;GACnB,YAAY;GACZ,6BAA6B;AAChC;;AAEA;GACG,iBAAiB;GACjB,yCAAyC;AAC5C;;AAEA;GACG,YAAY;GACZ,gBAAgB;GAChB,yCAAyC;AAC5C;;AAEA;GACG,kBAAkB;AACrB;;AAEA;GACG,iBAAiB;GACjB,kBAAkB;GAClB,aAAa;GACb,mBAAmB;GACnB,wCAAwC;AAC3C;;AAEA;GACG,eAAe;GACf,iBAAiB;AACpB;;AAEA;GACG,aAAa;GACb,OAAO;AACV;;AAEA;GACG;GACA;GACA;MACG,2BAA2B;GAC9B;GACA;MACG,4BAA4B;GAC/B;GACA;GACA;AACH;;AAEA;GACG,kEAAkE;AACrE;;AAEA;;GAEG,WAAW;GACX,YAAY;GACZ,iBAAiB;GACjB,qBAAqB;GACrB,sBAAsB;GACtB,6BAA6B;AAChC;;AAEA;GACG,iBAAiB;GACjB,aAAa;AAChB;;AAEA;GACG;MACG,gCAAgC;GACnC;;GAEA;MACG,aAAa;GAChB;;GAEA;MACG,cAAc;GACjB;AACH;;AAEA;GACG;MACG,wBAAwB;MACxB,gBAAgB;MAChB,qBAAqB;MACrB,2BAA2B;MAC3B,2BAA2B;MAC3B,2BAA2B;GAC9B;;GAEA;MACG,aAAa;GAChB;;GAEA;MACG,4BAA4B;GAC/B;;GAEA;MACG,0BAA0B;GAC7B;;GAEA;MACG,eAAe;MACf,MAAM;MACN,OAAO;MACP,aAAa;MACb,UAAU;MACV,6CAA6C;GAChD;;GAEA;MACG,cAAc;MACd,YAAY;GACf;;GAEA;MACG,cAAc;GACjB;;GAEA;MACG,eAAe;MACf,uBAAuB;GAC1B;;GAEA;MACG,aAAa;GAChB;;GAEA;;MAEG,OAAO;MACP,sBAAsB;GACzB;;GAEA;MACG,OAAO;MACP,8BAA8B;GACjC;AACH;;AAEA;GACG;MACG,cAAc;GACjB;AACH;;AAEA;GACG,qBAAqB;GACrB,UAAU;AACb;;AAEA;GACG,qBAAqB;AACxB","sourcesContent":["@import url('https://fonts.cdnfonts.com/css/gg-sans-2');\n@import url('https://fonts.googleapis.com/css2?family=Lilita+One&display=swap');\n\n* {\n   margin: 0;\n   padding: 0;\n   box-sizing: border-box;\n   font-family: 'gg sans Medium', sans-serif;\n}\n\n:root {\n   --darkest: #192332;\n   --darker: #1e293b;\n   --dark: #334155;\n   --medium: #475569;\n   --light: #64748b;\n   --lighter: #94a3b8;\n   --lightest: #cbd5e1;\n   --white: #f1f5f9;\n   --gray: #d1d5db;\n   --red: #f87171;\n   --green: #22c55e;\n   --blue: #3b82f6;\n   --blurple: #4f46e5;\n}\n\nbody {\n   height: 100vh;\n   overflow: hidden;\n}\n\napp-page {\n   display: grid;\n   grid-template-columns: 250px 7fr;\n   grid-auto-flow: column;\n   grid-auto-columns: 3fr;\n   justify-items: stretch;\n   justify-content: stretch;\n   color: var(--white);\n   background-color: var(--darkest);\n}\n\ntask-list {\n   height: 100vh;\n   background-color: var(--darker);\n   display: grid;\n   grid-template-rows: 3rem;\n   grid-auto-rows: auto;\n   gap: 0.7rem;\n   justify-content: stretch;\n   justify-items: center;\n   align-content: start;\n   overflow: auto;\n   padding: 0 0.5rem;\n   position: relative;\n}\n\n.fixed-add-task-btn {\n   color: var(--lightest);\n   background-color: var(--blurple);\n   display: none;\n   height: 3rem;\n   width: 3rem;\n   font-family: 'gg sans Medium', sans-serif;\n   font-size: 1rem;\n   border-radius: 1.5rem;\n   font-size: 1.4rem;\n}\n\n.fixed-btn-container {\n   width: min(100%, 900px);\n   display: flex;\n   min-width: 0;\n   position: sticky;\n   justify-content: end;\n   padding-right: 1rem;\n   bottom: 1rem;\n}\n\n.control-section {\n   display: flex;\n   width: min(100%, 900px);\n   gap: 1rem;\n   padding: 0 1rem;\n   align-items: center;\n   white-space: nowrap;\n   justify-content: space-between;\n}\n\n.sorting-controls {\n   display: flex;\n   gap: 0.5rem;\n   align-items: center;\n}\n\n.sorting-option {\n   position: relative;\n}\n\n.sorting-option label {\n   cursor: pointer;\n   white-space: nowrap;\n   line-height: 1.8em;\n   height: 1.8rem;\n   display: flex;\n   align-items: center;\n   background-color: var(--dark);\n   padding: 0 0.6rem;\n   border-radius: 0.9rem;\n}\n\n.sorting-option input[type='radio'] {\n   display: none;\n   position: absolute;\n}\n\n.sorting-option input[type='radio']:checked + label {\n   background-color: var(--dark);\n   border: var(--blurple) solid 1px;\n   filter: brightness(2);\n}\n\n.next-previous-btns {\n   display: flex;\n   gap: 0.5rem;\n   align-items: center;\n}\n\n.next-previous-btns button {\n   display: flex;\n   color: var(--lightest);\n   background-color: var(--dark);\n   font-size: 1rem;\n   padding: 0.3rem 0.6rem;\n   border-radius: 3px;\n}\n\n.next-previous-btns .dates {\n   display: flex;\n   gap: 0.5rem;\n}\n\n.next-previous-btns .dates div {\n   min-width: 8rem;\n   display: flex;\n   justify-content: center;\n}\n\n.tasks-container {\n   width: min(100%, 900px);\n   display: grid;\n   gap: 0.5rem;\n}\n\ntask-card {\n   width: min(100%, 900px);\n   display: grid;\n   grid-auto-flow: row;\n   grid-template-rows: max-content auto auto max-content;\n   height: 8rem;\n   padding: 0.5rem 1rem;\n   border-radius: 0.7rem;\n   background-color: var(--dark);\n   transition: 300ms;\n}\n\ntask-card:hover {\n   background-color: var(--medium);\n   cursor: pointer;\n   transform: translate(0, -2px);\n   box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);\n}\n\ntask-card[editing] {\n   background-color: var(--medium);\n}\n\ntask-card .tags,\ntask-card .title-line,\ntask-card .buttons {\n   display: flex;\n   align-items: center;\n   justify-content: start;\n   gap: 0.5rem;\n}\n\ntask-card .tag {\n   font-size: 0.8rem;\n   border-radius: 1rem;\n   padding: 0.3rem 0.5rem;\n   width: max-content;\n   max-width: 8rem;\n   white-space: nowrap;\n   overflow: hidden;\n   text-overflow: ellipsis;\n   background-color: var(--darker);\n}\n\ntask-card .tag i {\n   margin-right: 4px;\n}\n\ntask-card .tag[priority='1'] i {\n   color: red;\n}\n\ntask-card .tag[priority='2'] i {\n   color: yellow;\n}\n\ntask-card .tag[priority='3'] i {\n   color: green;\n}\n\ntask-card .tag[priority='4'] i {\n   color: blue;\n}\n\ntask-card .title {\n   font-size: 1.4rem;\n}\n\ntask-card .description {\n   color: var(--lightest);\n   font-family: 'gg sans Normal', sans-serif;\n   font-size: 1rem;\n   white-space: nowrap;\n   overflow: hidden;\n   text-overflow: ellipsis;\n   align-self: flex-start;\n}\n\ntask-card .edit-btn,\ntask-card .delete,\ntask-card .checkbox-label {\n   cursor: pointer;\n   height: 1.6rem;\n   width: 2.6rem;\n   font-size: 1rem;\n   background-color: rgba(255, 255, 255, 0);\n   display: flex;\n   align-items: center;\n   justify-content: center;\n   border-radius: 0.7rem;\n}\n\ntask-card .edit-btn {\n   color: var(--light);\n}\n\ntask-card .delete {\n   color: var(--light);\n}\n\ntask-card .delete:hover,\ntask-card .checkbox-label[completed='true'],\ntask-card .checkbox-label:hover,\ntask-card .edit-btn:hover,\ntask-card[editing] .edit-btn {\n   /* color: var(--lighter); */\n   background-color: var(--dark);\n   border: var(--blurple) solid 1px;\n   filter: brightness(2);\n}\n\ntask-card .checkbox-label input {\n   position: absolute;\n   opacity: 0;\n   cursor: pointer;\n   height: 0;\n   width: 0;\n}\n\n.checkmark {\n   color: var(--light);\n}\n\ntask-card .checkbox-label .checkmark:after {\n   left: 0.3em;\n   top: 0.1em;\n   width: 0.25em;\n   height: 0.5em;\n   border: solid white;\n   border-width: 0 0.15em 0.15em 0;\n   transform: rotate(45deg);\n   transition: all 500ms ease-in-out;\n}\n\ntask-card .status {\n   display: flex;\n   align-items: center;\n   width: max-content;\n   height: 1.8rem;\n   padding: 0 0.6rem;\n\n   font-family: 'gg sans Medium', sans-serif;\n   font-size: 1rem;\n   border-radius: 1rem;\n}\n\ntask-card .status[status='completed'] {\n   /* background-color: var(--green); */\n   background: #2cc0531b;\n   border: var(--green) solid 1px;\n   color: var(--green);\n}\n\ntask-card .status[status='overdue'] {\n   /* background-color: var(--green); */\n   background: #c02c2c1b;\n   border: var(--red) solid 1px;\n   color: var(--red);\n}\n\ntask-card .status[status='pending'] {\n   /* background-color: var(--green); */\n   background: #422cc01b;\n   border: var(--blue) solid 1px;\n   color: var(--blue);\n}\n\n#new-task-form {\n   min-width: min(100%, 900px);\n   display: grid;\n   grid-template-columns: auto 1fr auto;\n   align-items: center;\n   padding: 0.5rem;\n   border-radius: 0.7rem;\n   background-color: var(--dark);\n   column-gap: 0.4rem;\n   justify-content: stretch;\n}\n\ninput,\ntextarea,\nbutton {\n   outline: none;\n   border: none;\n}\n\nbutton {\n   display: flex;\n   align-items: center;\n   justify-content: center;\n   gap: 0.3rem;\n   cursor: pointer;\n}\n\nbutton:hover {\n   filter: brightness(1.2);\n}\n\ni {\n   pointer-events: none;\n}\n\n#new-task-form input,\n#new-task-form textarea {\n   padding: 0;\n   outline: none;\n   color: var(--white);\n   border: none;\n   background-color: var(--dark);\n}\n\n#new-task-form [name='title-input'] {\n   height: max-content;\n   font-size: 1.4rem;\n   font-family: 'gg sans medium', sans-serif;\n   justify-self: stretch;\n   grid-column: 2/3;\n}\n\n#new-task-form [name='description-input'] {\n   resize: none;\n   grid-column: 1/-1;\n   font-family: 'gg sans normal', sans-serif;\n}\n\n#new-task-form [name='save-task'] {\n   grid-row: 3/-1;\n}\n\n#new-task-form [name='save-task'],\n#new-task-form [name='open-form'],\ntask-details [name='save-task'] {\n   justify-self: flex-end;\n   color: var(--white);\n   border: none;\n   background-color: var(--blurple);\n   padding: 0 1rem;\n   height: 2.5rem;\n   font-family: 'gg sans Medium', sans-serif;\n   font-size: 1rem;\n   border-radius: 1.2rem;\n   white-space: nowrap;\n}\n\n#new-task-form select,\n#new-task-form [name='date-input'] {\n   outline: none;\n   color: var(--white);\n   border: none;\n   background-color: var(--darker);\n   max-width: 10rem;\n   padding: 0 1rem;\n   height: 2rem;\n   border-radius: 0.5rem;\n   font-family: 'gg sans Medium', sans-serif;\n   font-size: 1rem;\n   white-space: nowrap;\n   overflow: hidden;\n   text-overflow: ellipsis;\n}\n\n#new-task-form .selection-inputs {\n   display: flex;\n   flex-wrap: wrap;\n   gap: 1rem;\n}\n\n#new-task-form[expanded='false'] .hidden-inputs {\n   display: none;\n}\n\n#new-task-form[expanded='true'] .hidden-inputs {\n   grid-column: 2/-1;\n   display: grid;\n\n   grid-template-rows: auto auto auto;\n   gap: 1rem;\n}\n\n#new-task-form .open-form {\n   grid-column: 3/4;\n}\n\n#new-task-form[expanded='true'] .open-form {\n   display: none;\n}\n\n#new-task-form[expanded='false'] .close-form {\n   display: none;\n}\n\n#new-task-form .close-form {\n   cursor: pointer;\n   color: var(--light);\n   background-color: rgba(255, 255, 255, 0);\n\n   font-size: 1.4rem;\n}\n\nside-bar {\n   height: 100vh;\n   display: grid;\n   grid-template-rows: 3rem auto auto;\n   gap: 2.5rem;\n   align-content: start;\n   background-color: var(--dark);\n   overflow: auto;\n   z-index: 1;\n}\n\n.header {\n   z-index: 1;\n   position: sticky;\n   font-size: 1.1rem;\n   top: 0;\n   width: 100%;\n   display: flex;\n   align-items: center;\n   gap: 1rem;\n   justify-self: stretch;\n   border-bottom: var(--darkest) 1.5px solid;\n   background-color: inherit;\n}\n\nside-bar .header {\n   justify-content: space-between;\n\n   padding: 0 1rem;\n}\n\nside-bar .header .icon {\n   display: flex;\n   gap: 0.4rem;\n   font-family: 'Lilita One', cursive;\n   font-size: 1.7rem;\n   background-size: 100%;\n   background-repeat: no-repeat;\n   -webkit-background-clip: text;\n   -webkit-text-fill-color: transparent;\n   -moz-background-clip: text;\n   -moz-text-fill-color: transparent;\n   background-image: linear-gradient(45deg, #f8f161, #af4242);\n}\n\nside-bar .default-filters-ul {\n   padding: 0 0.4rem;\n}\n\nside-bar .default-filter,\nside-bar .projects-list-header {\n   gap: 0.8rem;\n}\n\nside-bar .default-filter i,\nside-bar .projects-list-header i {\n   color: var(--lighter);\n   padding-bottom: 3px;\n}\n\nside-bar .default-filter:hover i,\nside-bar .default-filter[current-filter] i {\n   color: var(--lightest);\n}\n\nproject-list {\n   width: 100%;\n   display: grid;\n   grid-template-rows: repeat(auto-fill, auto);\n   justify-content: stretch;\n   align-content: start;\n   padding: 0 0.5rem;\n   gap: 0.4rem;\n   overflow: hidden;\n}\n\nproject-list exp-list {\n   display: grid;\n\n   align-items: stretch;\n   overflow: hidden;\n}\n\nproject-list exp-list ul {\n   border-top: var(--light) solid 1px;\n   display: grid;\n   gap: 0.2rem;\n   overflow: hidden;\n   padding-left: 1rem;\n   padding-top: 0.2rem;\n   transition: height 0.5s ease-out;\n}\n\nproject-list editable-li,\n.default-filter,\n.projects-list-header {\n   font-size: 1rem;\n   display: flex;\n   align-items: center;\n   align-content: center;\n   position: relative;\n   cursor: pointer;\n   height: 2rem;\n   padding: 0 0.4rem;\n   border-radius: 0.4rem;\n   gap: 0.3rem;\n   white-space: nowrap;\n   overflow: hidden;\n   text-overflow: ellipsis;\n}\n\neditable-li .item-title {\n   text-align: center;\n   line-height: normal;\n   white-space: nowrap;\n   overflow: hidden;\n   text-overflow: ellipsis;\n}\n\neditable-li[active] {\n   background-color: var(--medium);\n   border: var(--lighter) solid 1px;\n}\n\nside-bar [current-filter] {\n   background-color: var(--medium);\n}\n\nside-bar .default-filters-ul {\n   display: grid;\n   gap: 0.3rem;\n}\n\nside-bar editable-li:hover,\n.default-filter:hover {\n   background-color: var(--medium);\n}\n\neditable-li .item-buttons {\n   display: flex;\n   gap: 0.2rem;\n   opacity: 0;\n   position: absolute;\n   right: 4%;\n}\n\neditable-li[active] .item-buttons {\n   opacity: 1;\n}\n\neditable-li:hover .item-buttons {\n   opacity: 1;\n}\n\nproject-list exp-list [data-type='project']::before {\n   display: inline-block;\n   content: '';\n   -webkit-border-radius: 0.2rem;\n   border-radius: 0.2rem;\n   height: 0.5rem;\n   width: 0.4rem;\n   background-color: var(--light);\n}\n\nproject-list exp-list [data-type='category']::before {\n   border-color: var(--lighter);\n   border-style: solid;\n   border-width: 0.15em 0.15em 0 0;\n   content: '';\n   display: inline-block;\n   height: 0.4em;\n   transform: rotate(45deg);\n   width: 0.4em;\n   margin-right: 0.2rem;\n}\n\nproject-list exp-list[expanded] [data-type='category']::before {\n   transform: rotate(135deg);\n}\n\nproject-list exp-list {\n   display: flex;\n   flex-direction: column;\n}\n\nproject-list .add-category-btn {\n   display: flex;\n   justify-content: start;\n   order: 1;\n   color: var(--lighter);\n   background-color: rgba(255, 255, 255, 0);\n   padding: 0 1rem;\n   height: 2rem;\n   font-family: 'gg sans Medium', sans-serif;\n   font-size: 1rem;\n   border-radius: 0.4rem;\n   gap: 1rem;\n}\n\nproject-list .add-category-btn:hover {\n   background-color: var(--medium);\n   color: var(--lightest);\n}\n\nproject-list exp-list[expanded] .items-list {\n   height: auto;\n}\n\nproject-list exp-list .items-list {\n   height: 0;\n}\n\neditable-li .editing-input {\n   outline: none;\n   font-size: 1.1rem;\n   color: var(--lightest);\n   background-color: rgba(255, 255, 255, 0);\n   border-radius: 0.4rem;\n   width: 100%;\n   align-self: stretch;\n}\n\neditable-li[active].error {\n   background-color: var(--red);\n}\n\n[active].error {\n   -webkit-animation: shake 0.2s ease-in-out 0s 2;\n   animation: shake 0.2s ease-in-out 0s 2;\n}\n\neditable-li button {\n   font-size: 0.8rem;\n   height: 1.4rem;\n   width: 1.4rem;\n   border-radius: 0.2rem;\n   background-color: rgba(255, 255, 255, 0);\n   color: var(--gray);\n}\n\neditable-li button:hover {\n   background-color: var(--light);\n   filter: brightness(1.3);\n}\n\neditable-li .save-item,\neditable-li .cancel-editing {\n   display: none;\n}\n\neditable-li[active] .save-item,\neditable-li[active] .cancel-editing {\n   display: block;\n}\n\neditable-li[active] .edit-item,\neditable-li[active] .delete-item,\neditable-li[active] .item-title {\n   display: none;\n}\n\n.checklist {\n   background-color: var(--darker);\n   display: grid;\n   grid-template-rows: repeat(auto-fill, auto);\n   gap: 0.2rem;\n   align-content: start;\n   border-radius: 0.4rem;\n   padding: 1rem;\n}\n\n.checklist editable-li {\n   font-size: 1rem;\n   display: flex;\n   align-items: center;\n   position: relative;\n   cursor: pointer;\n   height: 2.4rem;\n   padding: 0 0.4rem;\n   border-radius: 0.4rem;\n}\n\n.checklist [data-type='checklist-item'][checked]::before {\n   border-color: var(--white);\n}\n\n.checklist [data-type='checklist-item']::before {\n   border-color: var(--dark);\n   border-style: solid;\n   border-width: 0.18em 0.18em 0 0;\n   content: '';\n   display: inline-block;\n   height: 0.4em;\n   transform: rotate(135deg);\n   width: 0.6em;\n   margin-right: 0.6rem;\n}\n\n.checklist editable-li[data-type='checklist'] .edit-item,\n.checklist editable-li[data-type='checklist'] .delete-item {\n   display: none;\n}\n\n.checklist editable-li[data-type='checklist'] .item-buttons {\n   opacity: 1;\n}\n\n.checklist .list-header {\n   border-radius: 0;\n   border-bottom: var(--medium) solid 1px;\n}\n.checklist [data-type='checklist-item'][checked] {\n   text-decoration: line-through;\n}\n\ntask-details {\n   height: 100vh;\n   z-index: 1;\n   display: grid;\n   grid-auto-flow: row dense;\n   min-width: 400px;\n   grid-template-rows: 3rem auto 1fr;\n   align-items: stretch;\n   background-color: var(--dark);\n   border-radius: 0.5rem;\n   align-content: start;\n   justify-items: start;\n   overflow: auto;\n   position: relative;\n   box-shadow: 0px 0 5px 3px rgba(0, 0, 0, 0.5);\n}\n\ntask-details .header {\n   padding-left: 1rem;\n}\n\ntask-details .icon {\n   font-size: 3.5rem;\n   opacity: 50%;\n   padding: 1rem 2rem;\n}\n\ntask-details form {\n   justify-self: stretch;\n   display: flex;\n   flex-direction: column;\n   gap: 1.2rem;\n   padding: 1rem 2rem;\n}\n\ntask-details form select,\ntask-details form [name='date-input'] {\n   outline: none;\n   color: var(--white);\n   border: none;\n   background-color: var(--darker);\n   padding: 0 1rem;\n   min-height: 2rem;\n   width: 14rem;\n   align-self: flex-start;\n   border-radius: 0.5rem;\n   font-family: 'gg sans Medium', sans-serif;\n   font-size: 1rem;\n   white-space: nowrap;\n   overflow: hidden;\n   text-overflow: ellipsis;\n}\n\ntask-details form [name='title-input'],\ntask-details form [name='description-input'] {\n   padding: 0;\n   outline: none;\n   color: var(--white);\n   border: none;\n   background-color: var(--dark);\n}\n\ntask-details form [name='title-input'] {\n   font-size: 1.6rem;\n   font-family: 'gg sans medium', sans-serif;\n}\n\ntask-details form [name='description-input'] {\n   resize: none;\n   min-height: 8rem;\n   font-family: 'gg sans normal', sans-serif;\n}\n\ntask-details .header {\n   position: relative;\n}\n\ntask-details .close {\n   font-size: 1.5rem;\n   position: absolute;\n   right: 1.5rem;\n   color: var(--light);\n   background-color: rgba(255, 255, 255, 0);\n}\n\ntask-details form [name='save-task'] {\n   align-self: end;\n   justify-self: end;\n}\n\ntask-details form .submit-btn-container {\n   display: flex;\n   flex: 1;\n}\n\n@-webkit-keyframes shake {\n   0% {\n   }\n   25% {\n      transform: translateX(1rem);\n   }\n   75% {\n      transform: translateX(-1rem);\n   }\n   100% {\n   }\n}\n\n.material-symbols-outlined {\n   font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48;\n}\n\ntask-list .header .toggle-side-bar,\nside-bar .header .close-side-bar {\n   width: 2rem;\n   height: 2rem;\n   font-size: 1.1rem;\n   border-radius: 0.2rem;\n   color: var(--lightest);\n   background-color: var(--dark);\n}\n\nside-bar .header .close-side-bar {\n   font-size: 1.2rem;\n   display: none;\n}\n\n@media only screen and (min-width: 700px) {\n   app-page {\n      grid-template-columns: 250px 7fr;\n   }\n\n   task-list .header .toggle-side-bar {\n      display: none;\n   }\n\n   .next-previous-btns-label {\n      display: block;\n   }\n}\n\n@media only screen and (max-width: 700px) {\n   html {\n      -ms-overflow-style: none;\n      /* IE and Edge */\n      scrollbar-width: none;\n      max-width: 100vw !important;\n      overflow: hidden !important;\n      overflow-y: auto !important;\n   }\n\n   html ::-webkit-scrollbar {\n      display: none;\n   }\n\n   app-page {\n      grid-template-columns: 0 7fr;\n   }\n\n   app-page[sidebar-open] {\n      grid-template-columns: 7fr;\n   }\n\n   app-page[sidebar-open] side-bar {\n      position: fixed;\n      top: 0;\n      left: 0;\n      height: 100vh;\n      z-index: 2;\n      box-shadow: 5px 0 5px -2px rgba(0, 0, 0, 0.5);\n   }\n\n   app-page[sidebar-open] .close-side-bar {\n      display: block;\n      z-index: 100;\n   }\n\n   task-list .header .toggle-side-bar {\n      display: block;\n   }\n\n   .control-section {\n      flex-wrap: wrap;\n      justify-content: center;\n   }\n\n   .next-previous-btns-label {\n      display: none;\n   }\n\n   .sorting-controls,\n   .next-previous-btns {\n      flex: 1;\n      justify-content: start;\n   }\n\n   .next-previous-btns {\n      flex: 1;\n      justify-content: space-between;\n   }\n}\n\n@media only screen and (max-width: 500px) {\n   html {\n      font-size: 90%;\n   }\n}\n\n::placeholder {\n   color: var(--lighter);\n   opacity: 1;\n}\n\n:-ms-input-placeholder {\n   color: var(--lighter);\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/addLeadingZeros/index.js":
/*!*****************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/addLeadingZeros/index.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ addLeadingZeros)
/* harmony export */ });
function addLeadingZeros(number, targetLength) {
  var sign = number < 0 ? '-' : '';
  var output = Math.abs(number).toString();
  while (output.length < targetLength) {
    output = '0' + output;
  }
  return sign + output;
}

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/defaultLocale/index.js":
/*!***************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/defaultLocale/index.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _locale_en_US_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../locale/en-US/index.js */ "./node_modules/date-fns/esm/locale/en-US/index.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_locale_en_US_index_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/defaultOptions/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/defaultOptions/index.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getDefaultOptions": () => (/* binding */ getDefaultOptions),
/* harmony export */   "setDefaultOptions": () => (/* binding */ setDefaultOptions)
/* harmony export */ });
var defaultOptions = {};
function getDefaultOptions() {
  return defaultOptions;
}
function setDefaultOptions(newOptions) {
  defaultOptions = newOptions;
}

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/format/formatters/index.js":
/*!*******************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/format/formatters/index.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _lib_getUTCDayOfYear_index_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../_lib/getUTCDayOfYear/index.js */ "./node_modules/date-fns/esm/_lib/getUTCDayOfYear/index.js");
/* harmony import */ var _lib_getUTCISOWeek_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../_lib/getUTCISOWeek/index.js */ "./node_modules/date-fns/esm/_lib/getUTCISOWeek/index.js");
/* harmony import */ var _lib_getUTCISOWeekYear_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../_lib/getUTCISOWeekYear/index.js */ "./node_modules/date-fns/esm/_lib/getUTCISOWeekYear/index.js");
/* harmony import */ var _lib_getUTCWeek_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../_lib/getUTCWeek/index.js */ "./node_modules/date-fns/esm/_lib/getUTCWeek/index.js");
/* harmony import */ var _lib_getUTCWeekYear_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../_lib/getUTCWeekYear/index.js */ "./node_modules/date-fns/esm/_lib/getUTCWeekYear/index.js");
/* harmony import */ var _addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../addLeadingZeros/index.js */ "./node_modules/date-fns/esm/_lib/addLeadingZeros/index.js");
/* harmony import */ var _lightFormatters_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lightFormatters/index.js */ "./node_modules/date-fns/esm/_lib/format/lightFormatters/index.js");







var dayPeriodEnum = {
  am: 'am',
  pm: 'pm',
  midnight: 'midnight',
  noon: 'noon',
  morning: 'morning',
  afternoon: 'afternoon',
  evening: 'evening',
  night: 'night'
};
/*
 * |     | Unit                           |     | Unit                           |
 * |-----|--------------------------------|-----|--------------------------------|
 * |  a  | AM, PM                         |  A* | Milliseconds in day            |
 * |  b  | AM, PM, noon, midnight         |  B  | Flexible day period            |
 * |  c  | Stand-alone local day of week  |  C* | Localized hour w/ day period   |
 * |  d  | Day of month                   |  D  | Day of year                    |
 * |  e  | Local day of week              |  E  | Day of week                    |
 * |  f  |                                |  F* | Day of week in month           |
 * |  g* | Modified Julian day            |  G  | Era                            |
 * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |
 * |  i! | ISO day of week                |  I! | ISO week of year               |
 * |  j* | Localized hour w/ day period   |  J* | Localized hour w/o day period  |
 * |  k  | Hour [1-24]                    |  K  | Hour [0-11]                    |
 * |  l* | (deprecated)                   |  L  | Stand-alone month              |
 * |  m  | Minute                         |  M  | Month                          |
 * |  n  |                                |  N  |                                |
 * |  o! | Ordinal number modifier        |  O  | Timezone (GMT)                 |
 * |  p! | Long localized time            |  P! | Long localized date            |
 * |  q  | Stand-alone quarter            |  Q  | Quarter                        |
 * |  r* | Related Gregorian year         |  R! | ISO week-numbering year        |
 * |  s  | Second                         |  S  | Fraction of second             |
 * |  t! | Seconds timestamp              |  T! | Milliseconds timestamp         |
 * |  u  | Extended year                  |  U* | Cyclic year                    |
 * |  v* | Timezone (generic non-locat.)  |  V* | Timezone (location)            |
 * |  w  | Local week of year             |  W* | Week of month                  |
 * |  x  | Timezone (ISO-8601 w/o Z)      |  X  | Timezone (ISO-8601)            |
 * |  y  | Year (abs)                     |  Y  | Local week-numbering year      |
 * |  z  | Timezone (specific non-locat.) |  Z* | Timezone (aliases)             |
 *
 * Letters marked by * are not implemented but reserved by Unicode standard.
 *
 * Letters marked by ! are non-standard, but implemented by date-fns:
 * - `o` modifies the previous token to turn it into an ordinal (see `format` docs)
 * - `i` is ISO day of week. For `i` and `ii` is returns numeric ISO week days,
 *   i.e. 7 for Sunday, 1 for Monday, etc.
 * - `I` is ISO week of year, as opposed to `w` which is local week of year.
 * - `R` is ISO week-numbering year, as opposed to `Y` which is local week-numbering year.
 *   `R` is supposed to be used in conjunction with `I` and `i`
 *   for universal ISO week-numbering date, whereas
 *   `Y` is supposed to be used in conjunction with `w` and `e`
 *   for week-numbering date specific to the locale.
 * - `P` is long localized date format
 * - `p` is long localized time format
 */

var formatters = {
  // Era
  G: function G(date, token, localize) {
    var era = date.getUTCFullYear() > 0 ? 1 : 0;
    switch (token) {
      // AD, BC
      case 'G':
      case 'GG':
      case 'GGG':
        return localize.era(era, {
          width: 'abbreviated'
        });
      // A, B
      case 'GGGGG':
        return localize.era(era, {
          width: 'narrow'
        });
      // Anno Domini, Before Christ
      case 'GGGG':
      default:
        return localize.era(era, {
          width: 'wide'
        });
    }
  },
  // Year
  y: function y(date, token, localize) {
    // Ordinal number
    if (token === 'yo') {
      var signedYear = date.getUTCFullYear();
      // Returns 1 for 1 BC (which is year 0 in JavaScript)
      var year = signedYear > 0 ? signedYear : 1 - signedYear;
      return localize.ordinalNumber(year, {
        unit: 'year'
      });
    }
    return _lightFormatters_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].y(date, token);
  },
  // Local week-numbering year
  Y: function Y(date, token, localize, options) {
    var signedWeekYear = (0,_lib_getUTCWeekYear_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(date, options);
    // Returns 1 for 1 BC (which is year 0 in JavaScript)
    var weekYear = signedWeekYear > 0 ? signedWeekYear : 1 - signedWeekYear;

    // Two digit year
    if (token === 'YY') {
      var twoDigitYear = weekYear % 100;
      return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(twoDigitYear, 2);
    }

    // Ordinal number
    if (token === 'Yo') {
      return localize.ordinalNumber(weekYear, {
        unit: 'year'
      });
    }

    // Padding
    return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(weekYear, token.length);
  },
  // ISO week-numbering year
  R: function R(date, token) {
    var isoWeekYear = (0,_lib_getUTCISOWeekYear_index_js__WEBPACK_IMPORTED_MODULE_3__["default"])(date);

    // Padding
    return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(isoWeekYear, token.length);
  },
  // Extended year. This is a single number designating the year of this calendar system.
  // The main difference between `y` and `u` localizers are B.C. years:
  // | Year | `y` | `u` |
  // |------|-----|-----|
  // | AC 1 |   1 |   1 |
  // | BC 1 |   1 |   0 |
  // | BC 2 |   2 |  -1 |
  // Also `yy` always returns the last two digits of a year,
  // while `uu` pads single digit years to 2 characters and returns other years unchanged.
  u: function u(date, token) {
    var year = date.getUTCFullYear();
    return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(year, token.length);
  },
  // Quarter
  Q: function Q(date, token, localize) {
    var quarter = Math.ceil((date.getUTCMonth() + 1) / 3);
    switch (token) {
      // 1, 2, 3, 4
      case 'Q':
        return String(quarter);
      // 01, 02, 03, 04
      case 'QQ':
        return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(quarter, 2);
      // 1st, 2nd, 3rd, 4th
      case 'Qo':
        return localize.ordinalNumber(quarter, {
          unit: 'quarter'
        });
      // Q1, Q2, Q3, Q4
      case 'QQQ':
        return localize.quarter(quarter, {
          width: 'abbreviated',
          context: 'formatting'
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case 'QQQQQ':
        return localize.quarter(quarter, {
          width: 'narrow',
          context: 'formatting'
        });
      // 1st quarter, 2nd quarter, ...
      case 'QQQQ':
      default:
        return localize.quarter(quarter, {
          width: 'wide',
          context: 'formatting'
        });
    }
  },
  // Stand-alone quarter
  q: function q(date, token, localize) {
    var quarter = Math.ceil((date.getUTCMonth() + 1) / 3);
    switch (token) {
      // 1, 2, 3, 4
      case 'q':
        return String(quarter);
      // 01, 02, 03, 04
      case 'qq':
        return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(quarter, 2);
      // 1st, 2nd, 3rd, 4th
      case 'qo':
        return localize.ordinalNumber(quarter, {
          unit: 'quarter'
        });
      // Q1, Q2, Q3, Q4
      case 'qqq':
        return localize.quarter(quarter, {
          width: 'abbreviated',
          context: 'standalone'
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case 'qqqqq':
        return localize.quarter(quarter, {
          width: 'narrow',
          context: 'standalone'
        });
      // 1st quarter, 2nd quarter, ...
      case 'qqqq':
      default:
        return localize.quarter(quarter, {
          width: 'wide',
          context: 'standalone'
        });
    }
  },
  // Month
  M: function M(date, token, localize) {
    var month = date.getUTCMonth();
    switch (token) {
      case 'M':
      case 'MM':
        return _lightFormatters_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].M(date, token);
      // 1st, 2nd, ..., 12th
      case 'Mo':
        return localize.ordinalNumber(month + 1, {
          unit: 'month'
        });
      // Jan, Feb, ..., Dec
      case 'MMM':
        return localize.month(month, {
          width: 'abbreviated',
          context: 'formatting'
        });
      // J, F, ..., D
      case 'MMMMM':
        return localize.month(month, {
          width: 'narrow',
          context: 'formatting'
        });
      // January, February, ..., December
      case 'MMMM':
      default:
        return localize.month(month, {
          width: 'wide',
          context: 'formatting'
        });
    }
  },
  // Stand-alone month
  L: function L(date, token, localize) {
    var month = date.getUTCMonth();
    switch (token) {
      // 1, 2, ..., 12
      case 'L':
        return String(month + 1);
      // 01, 02, ..., 12
      case 'LL':
        return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(month + 1, 2);
      // 1st, 2nd, ..., 12th
      case 'Lo':
        return localize.ordinalNumber(month + 1, {
          unit: 'month'
        });
      // Jan, Feb, ..., Dec
      case 'LLL':
        return localize.month(month, {
          width: 'abbreviated',
          context: 'standalone'
        });
      // J, F, ..., D
      case 'LLLLL':
        return localize.month(month, {
          width: 'narrow',
          context: 'standalone'
        });
      // January, February, ..., December
      case 'LLLL':
      default:
        return localize.month(month, {
          width: 'wide',
          context: 'standalone'
        });
    }
  },
  // Local week of year
  w: function w(date, token, localize, options) {
    var week = (0,_lib_getUTCWeek_index_js__WEBPACK_IMPORTED_MODULE_4__["default"])(date, options);
    if (token === 'wo') {
      return localize.ordinalNumber(week, {
        unit: 'week'
      });
    }
    return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(week, token.length);
  },
  // ISO week of year
  I: function I(date, token, localize) {
    var isoWeek = (0,_lib_getUTCISOWeek_index_js__WEBPACK_IMPORTED_MODULE_5__["default"])(date);
    if (token === 'Io') {
      return localize.ordinalNumber(isoWeek, {
        unit: 'week'
      });
    }
    return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(isoWeek, token.length);
  },
  // Day of the month
  d: function d(date, token, localize) {
    if (token === 'do') {
      return localize.ordinalNumber(date.getUTCDate(), {
        unit: 'date'
      });
    }
    return _lightFormatters_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].d(date, token);
  },
  // Day of year
  D: function D(date, token, localize) {
    var dayOfYear = (0,_lib_getUTCDayOfYear_index_js__WEBPACK_IMPORTED_MODULE_6__["default"])(date);
    if (token === 'Do') {
      return localize.ordinalNumber(dayOfYear, {
        unit: 'dayOfYear'
      });
    }
    return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(dayOfYear, token.length);
  },
  // Day of week
  E: function E(date, token, localize) {
    var dayOfWeek = date.getUTCDay();
    switch (token) {
      // Tue
      case 'E':
      case 'EE':
      case 'EEE':
        return localize.day(dayOfWeek, {
          width: 'abbreviated',
          context: 'formatting'
        });
      // T
      case 'EEEEE':
        return localize.day(dayOfWeek, {
          width: 'narrow',
          context: 'formatting'
        });
      // Tu
      case 'EEEEEE':
        return localize.day(dayOfWeek, {
          width: 'short',
          context: 'formatting'
        });
      // Tuesday
      case 'EEEE':
      default:
        return localize.day(dayOfWeek, {
          width: 'wide',
          context: 'formatting'
        });
    }
  },
  // Local day of week
  e: function e(date, token, localize, options) {
    var dayOfWeek = date.getUTCDay();
    var localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
    switch (token) {
      // Numerical value (Nth day of week with current locale or weekStartsOn)
      case 'e':
        return String(localDayOfWeek);
      // Padded numerical value
      case 'ee':
        return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(localDayOfWeek, 2);
      // 1st, 2nd, ..., 7th
      case 'eo':
        return localize.ordinalNumber(localDayOfWeek, {
          unit: 'day'
        });
      case 'eee':
        return localize.day(dayOfWeek, {
          width: 'abbreviated',
          context: 'formatting'
        });
      // T
      case 'eeeee':
        return localize.day(dayOfWeek, {
          width: 'narrow',
          context: 'formatting'
        });
      // Tu
      case 'eeeeee':
        return localize.day(dayOfWeek, {
          width: 'short',
          context: 'formatting'
        });
      // Tuesday
      case 'eeee':
      default:
        return localize.day(dayOfWeek, {
          width: 'wide',
          context: 'formatting'
        });
    }
  },
  // Stand-alone local day of week
  c: function c(date, token, localize, options) {
    var dayOfWeek = date.getUTCDay();
    var localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
    switch (token) {
      // Numerical value (same as in `e`)
      case 'c':
        return String(localDayOfWeek);
      // Padded numerical value
      case 'cc':
        return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(localDayOfWeek, token.length);
      // 1st, 2nd, ..., 7th
      case 'co':
        return localize.ordinalNumber(localDayOfWeek, {
          unit: 'day'
        });
      case 'ccc':
        return localize.day(dayOfWeek, {
          width: 'abbreviated',
          context: 'standalone'
        });
      // T
      case 'ccccc':
        return localize.day(dayOfWeek, {
          width: 'narrow',
          context: 'standalone'
        });
      // Tu
      case 'cccccc':
        return localize.day(dayOfWeek, {
          width: 'short',
          context: 'standalone'
        });
      // Tuesday
      case 'cccc':
      default:
        return localize.day(dayOfWeek, {
          width: 'wide',
          context: 'standalone'
        });
    }
  },
  // ISO day of week
  i: function i(date, token, localize) {
    var dayOfWeek = date.getUTCDay();
    var isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
    switch (token) {
      // 2
      case 'i':
        return String(isoDayOfWeek);
      // 02
      case 'ii':
        return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(isoDayOfWeek, token.length);
      // 2nd
      case 'io':
        return localize.ordinalNumber(isoDayOfWeek, {
          unit: 'day'
        });
      // Tue
      case 'iii':
        return localize.day(dayOfWeek, {
          width: 'abbreviated',
          context: 'formatting'
        });
      // T
      case 'iiiii':
        return localize.day(dayOfWeek, {
          width: 'narrow',
          context: 'formatting'
        });
      // Tu
      case 'iiiiii':
        return localize.day(dayOfWeek, {
          width: 'short',
          context: 'formatting'
        });
      // Tuesday
      case 'iiii':
      default:
        return localize.day(dayOfWeek, {
          width: 'wide',
          context: 'formatting'
        });
    }
  },
  // AM or PM
  a: function a(date, token, localize) {
    var hours = date.getUTCHours();
    var dayPeriodEnumValue = hours / 12 >= 1 ? 'pm' : 'am';
    switch (token) {
      case 'a':
      case 'aa':
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'abbreviated',
          context: 'formatting'
        });
      case 'aaa':
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'abbreviated',
          context: 'formatting'
        }).toLowerCase();
      case 'aaaaa':
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'narrow',
          context: 'formatting'
        });
      case 'aaaa':
      default:
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'wide',
          context: 'formatting'
        });
    }
  },
  // AM, PM, midnight, noon
  b: function b(date, token, localize) {
    var hours = date.getUTCHours();
    var dayPeriodEnumValue;
    if (hours === 12) {
      dayPeriodEnumValue = dayPeriodEnum.noon;
    } else if (hours === 0) {
      dayPeriodEnumValue = dayPeriodEnum.midnight;
    } else {
      dayPeriodEnumValue = hours / 12 >= 1 ? 'pm' : 'am';
    }
    switch (token) {
      case 'b':
      case 'bb':
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'abbreviated',
          context: 'formatting'
        });
      case 'bbb':
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'abbreviated',
          context: 'formatting'
        }).toLowerCase();
      case 'bbbbb':
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'narrow',
          context: 'formatting'
        });
      case 'bbbb':
      default:
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'wide',
          context: 'formatting'
        });
    }
  },
  // in the morning, in the afternoon, in the evening, at night
  B: function B(date, token, localize) {
    var hours = date.getUTCHours();
    var dayPeriodEnumValue;
    if (hours >= 17) {
      dayPeriodEnumValue = dayPeriodEnum.evening;
    } else if (hours >= 12) {
      dayPeriodEnumValue = dayPeriodEnum.afternoon;
    } else if (hours >= 4) {
      dayPeriodEnumValue = dayPeriodEnum.morning;
    } else {
      dayPeriodEnumValue = dayPeriodEnum.night;
    }
    switch (token) {
      case 'B':
      case 'BB':
      case 'BBB':
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'abbreviated',
          context: 'formatting'
        });
      case 'BBBBB':
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'narrow',
          context: 'formatting'
        });
      case 'BBBB':
      default:
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'wide',
          context: 'formatting'
        });
    }
  },
  // Hour [1-12]
  h: function h(date, token, localize) {
    if (token === 'ho') {
      var hours = date.getUTCHours() % 12;
      if (hours === 0) hours = 12;
      return localize.ordinalNumber(hours, {
        unit: 'hour'
      });
    }
    return _lightFormatters_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].h(date, token);
  },
  // Hour [0-23]
  H: function H(date, token, localize) {
    if (token === 'Ho') {
      return localize.ordinalNumber(date.getUTCHours(), {
        unit: 'hour'
      });
    }
    return _lightFormatters_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].H(date, token);
  },
  // Hour [0-11]
  K: function K(date, token, localize) {
    var hours = date.getUTCHours() % 12;
    if (token === 'Ko') {
      return localize.ordinalNumber(hours, {
        unit: 'hour'
      });
    }
    return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(hours, token.length);
  },
  // Hour [1-24]
  k: function k(date, token, localize) {
    var hours = date.getUTCHours();
    if (hours === 0) hours = 24;
    if (token === 'ko') {
      return localize.ordinalNumber(hours, {
        unit: 'hour'
      });
    }
    return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(hours, token.length);
  },
  // Minute
  m: function m(date, token, localize) {
    if (token === 'mo') {
      return localize.ordinalNumber(date.getUTCMinutes(), {
        unit: 'minute'
      });
    }
    return _lightFormatters_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].m(date, token);
  },
  // Second
  s: function s(date, token, localize) {
    if (token === 'so') {
      return localize.ordinalNumber(date.getUTCSeconds(), {
        unit: 'second'
      });
    }
    return _lightFormatters_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].s(date, token);
  },
  // Fraction of second
  S: function S(date, token) {
    return _lightFormatters_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].S(date, token);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function X(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timezoneOffset = originalDate.getTimezoneOffset();
    if (timezoneOffset === 0) {
      return 'Z';
    }
    switch (token) {
      // Hours and optional minutes
      case 'X':
        return formatTimezoneWithOptionalMinutes(timezoneOffset);

      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XX`
      case 'XXXX':
      case 'XX':
        // Hours and minutes without `:` delimiter
        return formatTimezone(timezoneOffset);

      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XXX`
      case 'XXXXX':
      case 'XXX': // Hours and minutes with `:` delimiter
      default:
        return formatTimezone(timezoneOffset, ':');
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function x(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timezoneOffset = originalDate.getTimezoneOffset();
    switch (token) {
      // Hours and optional minutes
      case 'x':
        return formatTimezoneWithOptionalMinutes(timezoneOffset);

      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xx`
      case 'xxxx':
      case 'xx':
        // Hours and minutes without `:` delimiter
        return formatTimezone(timezoneOffset);

      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xxx`
      case 'xxxxx':
      case 'xxx': // Hours and minutes with `:` delimiter
      default:
        return formatTimezone(timezoneOffset, ':');
    }
  },
  // Timezone (GMT)
  O: function O(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timezoneOffset = originalDate.getTimezoneOffset();
    switch (token) {
      // Short
      case 'O':
      case 'OO':
      case 'OOO':
        return 'GMT' + formatTimezoneShort(timezoneOffset, ':');
      // Long
      case 'OOOO':
      default:
        return 'GMT' + formatTimezone(timezoneOffset, ':');
    }
  },
  // Timezone (specific non-location)
  z: function z(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timezoneOffset = originalDate.getTimezoneOffset();
    switch (token) {
      // Short
      case 'z':
      case 'zz':
      case 'zzz':
        return 'GMT' + formatTimezoneShort(timezoneOffset, ':');
      // Long
      case 'zzzz':
      default:
        return 'GMT' + formatTimezone(timezoneOffset, ':');
    }
  },
  // Seconds timestamp
  t: function t(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timestamp = Math.floor(originalDate.getTime() / 1000);
    return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(timestamp, token.length);
  },
  // Milliseconds timestamp
  T: function T(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timestamp = originalDate.getTime();
    return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(timestamp, token.length);
  }
};
function formatTimezoneShort(offset, dirtyDelimiter) {
  var sign = offset > 0 ? '-' : '+';
  var absOffset = Math.abs(offset);
  var hours = Math.floor(absOffset / 60);
  var minutes = absOffset % 60;
  if (minutes === 0) {
    return sign + String(hours);
  }
  var delimiter = dirtyDelimiter || '';
  return sign + String(hours) + delimiter + (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(minutes, 2);
}
function formatTimezoneWithOptionalMinutes(offset, dirtyDelimiter) {
  if (offset % 60 === 0) {
    var sign = offset > 0 ? '-' : '+';
    return sign + (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(Math.abs(offset) / 60, 2);
  }
  return formatTimezone(offset, dirtyDelimiter);
}
function formatTimezone(offset, dirtyDelimiter) {
  var delimiter = dirtyDelimiter || '';
  var sign = offset > 0 ? '-' : '+';
  var absOffset = Math.abs(offset);
  var hours = (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(Math.floor(absOffset / 60), 2);
  var minutes = (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(absOffset % 60, 2);
  return sign + hours + delimiter + minutes;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (formatters);

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/format/lightFormatters/index.js":
/*!************************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/format/lightFormatters/index.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../addLeadingZeros/index.js */ "./node_modules/date-fns/esm/_lib/addLeadingZeros/index.js");

/*
 * |     | Unit                           |     | Unit                           |
 * |-----|--------------------------------|-----|--------------------------------|
 * |  a  | AM, PM                         |  A* |                                |
 * |  d  | Day of month                   |  D  |                                |
 * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |
 * |  m  | Minute                         |  M  | Month                          |
 * |  s  | Second                         |  S  | Fraction of second             |
 * |  y  | Year (abs)                     |  Y  |                                |
 *
 * Letters marked by * are not implemented but reserved by Unicode standard.
 */
var formatters = {
  // Year
  y: function y(date, token) {
    // From http://www.unicode.org/reports/tr35/tr35-31/tr35-dates.html#Date_Format_tokens
    // | Year     |     y | yy |   yyy |  yyyy | yyyyy |
    // |----------|-------|----|-------|-------|-------|
    // | AD 1     |     1 | 01 |   001 |  0001 | 00001 |
    // | AD 12    |    12 | 12 |   012 |  0012 | 00012 |
    // | AD 123   |   123 | 23 |   123 |  0123 | 00123 |
    // | AD 1234  |  1234 | 34 |  1234 |  1234 | 01234 |
    // | AD 12345 | 12345 | 45 | 12345 | 12345 | 12345 |

    var signedYear = date.getUTCFullYear();
    // Returns 1 for 1 BC (which is year 0 in JavaScript)
    var year = signedYear > 0 ? signedYear : 1 - signedYear;
    return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(token === 'yy' ? year % 100 : year, token.length);
  },
  // Month
  M: function M(date, token) {
    var month = date.getUTCMonth();
    return token === 'M' ? String(month + 1) : (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(month + 1, 2);
  },
  // Day of the month
  d: function d(date, token) {
    return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(date.getUTCDate(), token.length);
  },
  // AM or PM
  a: function a(date, token) {
    var dayPeriodEnumValue = date.getUTCHours() / 12 >= 1 ? 'pm' : 'am';
    switch (token) {
      case 'a':
      case 'aa':
        return dayPeriodEnumValue.toUpperCase();
      case 'aaa':
        return dayPeriodEnumValue;
      case 'aaaaa':
        return dayPeriodEnumValue[0];
      case 'aaaa':
      default:
        return dayPeriodEnumValue === 'am' ? 'a.m.' : 'p.m.';
    }
  },
  // Hour [1-12]
  h: function h(date, token) {
    return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(date.getUTCHours() % 12 || 12, token.length);
  },
  // Hour [0-23]
  H: function H(date, token) {
    return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(date.getUTCHours(), token.length);
  },
  // Minute
  m: function m(date, token) {
    return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(date.getUTCMinutes(), token.length);
  },
  // Second
  s: function s(date, token) {
    return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(date.getUTCSeconds(), token.length);
  },
  // Fraction of second
  S: function S(date, token) {
    var numberOfDigits = token.length;
    var milliseconds = date.getUTCMilliseconds();
    var fractionalSeconds = Math.floor(milliseconds * Math.pow(10, numberOfDigits - 3));
    return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(fractionalSeconds, token.length);
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (formatters);

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/format/longFormatters/index.js":
/*!***********************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/format/longFormatters/index.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var dateLongFormatter = function dateLongFormatter(pattern, formatLong) {
  switch (pattern) {
    case 'P':
      return formatLong.date({
        width: 'short'
      });
    case 'PP':
      return formatLong.date({
        width: 'medium'
      });
    case 'PPP':
      return formatLong.date({
        width: 'long'
      });
    case 'PPPP':
    default:
      return formatLong.date({
        width: 'full'
      });
  }
};
var timeLongFormatter = function timeLongFormatter(pattern, formatLong) {
  switch (pattern) {
    case 'p':
      return formatLong.time({
        width: 'short'
      });
    case 'pp':
      return formatLong.time({
        width: 'medium'
      });
    case 'ppp':
      return formatLong.time({
        width: 'long'
      });
    case 'pppp':
    default:
      return formatLong.time({
        width: 'full'
      });
  }
};
var dateTimeLongFormatter = function dateTimeLongFormatter(pattern, formatLong) {
  var matchResult = pattern.match(/(P+)(p+)?/) || [];
  var datePattern = matchResult[1];
  var timePattern = matchResult[2];
  if (!timePattern) {
    return dateLongFormatter(pattern, formatLong);
  }
  var dateTimeFormat;
  switch (datePattern) {
    case 'P':
      dateTimeFormat = formatLong.dateTime({
        width: 'short'
      });
      break;
    case 'PP':
      dateTimeFormat = formatLong.dateTime({
        width: 'medium'
      });
      break;
    case 'PPP':
      dateTimeFormat = formatLong.dateTime({
        width: 'long'
      });
      break;
    case 'PPPP':
    default:
      dateTimeFormat = formatLong.dateTime({
        width: 'full'
      });
      break;
  }
  return dateTimeFormat.replace('{{date}}', dateLongFormatter(datePattern, formatLong)).replace('{{time}}', timeLongFormatter(timePattern, formatLong));
};
var longFormatters = {
  p: timeLongFormatter,
  P: dateTimeLongFormatter
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (longFormatters);

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/getTimezoneOffsetInMilliseconds/index.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/getTimezoneOffsetInMilliseconds/index.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getTimezoneOffsetInMilliseconds)
/* harmony export */ });
/**
 * Google Chrome as of 67.0.3396.87 introduced timezones with offset that includes seconds.
 * They usually appear for dates that denote time before the timezones were introduced
 * (e.g. for 'Europe/Prague' timezone the offset is GMT+00:57:44 before 1 October 1891
 * and GMT+01:00:00 after that date)
 *
 * Date#getTimezoneOffset returns the offset in minutes and would return 57 for the example above,
 * which would lead to incorrect calculations.
 *
 * This function returns the timezone offset in milliseconds that takes seconds in account.
 */
function getTimezoneOffsetInMilliseconds(date) {
  var utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
  utcDate.setUTCFullYear(date.getFullYear());
  return date.getTime() - utcDate.getTime();
}

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/getUTCDayOfYear/index.js":
/*!*****************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/getUTCDayOfYear/index.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getUTCDayOfYear)
/* harmony export */ });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");


var MILLISECONDS_IN_DAY = 86400000;
function getUTCDayOfYear(dirtyDate) {
  (0,_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1, arguments);
  var date = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate);
  var timestamp = date.getTime();
  date.setUTCMonth(0, 1);
  date.setUTCHours(0, 0, 0, 0);
  var startOfYearTimestamp = date.getTime();
  var difference = timestamp - startOfYearTimestamp;
  return Math.floor(difference / MILLISECONDS_IN_DAY) + 1;
}

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/getUTCISOWeek/index.js":
/*!***************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/getUTCISOWeek/index.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getUTCISOWeek)
/* harmony export */ });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _startOfUTCISOWeek_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../startOfUTCISOWeek/index.js */ "./node_modules/date-fns/esm/_lib/startOfUTCISOWeek/index.js");
/* harmony import */ var _startOfUTCISOWeekYear_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../startOfUTCISOWeekYear/index.js */ "./node_modules/date-fns/esm/_lib/startOfUTCISOWeekYear/index.js");
/* harmony import */ var _requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");




var MILLISECONDS_IN_WEEK = 604800000;
function getUTCISOWeek(dirtyDate) {
  (0,_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1, arguments);
  var date = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate);
  var diff = (0,_startOfUTCISOWeek_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(date).getTime() - (0,_startOfUTCISOWeekYear_index_js__WEBPACK_IMPORTED_MODULE_3__["default"])(date).getTime();

  // Round the number of days to the nearest integer
  // because the number of milliseconds in a week is not constant
  // (e.g. it's different in the week of the daylight saving time clock shift)
  return Math.round(diff / MILLISECONDS_IN_WEEK) + 1;
}

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/getUTCISOWeekYear/index.js":
/*!*******************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/getUTCISOWeekYear/index.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getUTCISOWeekYear)
/* harmony export */ });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");
/* harmony import */ var _startOfUTCISOWeek_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../startOfUTCISOWeek/index.js */ "./node_modules/date-fns/esm/_lib/startOfUTCISOWeek/index.js");



function getUTCISOWeekYear(dirtyDate) {
  (0,_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1, arguments);
  var date = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate);
  var year = date.getUTCFullYear();
  var fourthOfJanuaryOfNextYear = new Date(0);
  fourthOfJanuaryOfNextYear.setUTCFullYear(year + 1, 0, 4);
  fourthOfJanuaryOfNextYear.setUTCHours(0, 0, 0, 0);
  var startOfNextYear = (0,_startOfUTCISOWeek_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(fourthOfJanuaryOfNextYear);
  var fourthOfJanuaryOfThisYear = new Date(0);
  fourthOfJanuaryOfThisYear.setUTCFullYear(year, 0, 4);
  fourthOfJanuaryOfThisYear.setUTCHours(0, 0, 0, 0);
  var startOfThisYear = (0,_startOfUTCISOWeek_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(fourthOfJanuaryOfThisYear);
  if (date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/getUTCWeek/index.js":
/*!************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/getUTCWeek/index.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getUTCWeek)
/* harmony export */ });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _startOfUTCWeek_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../startOfUTCWeek/index.js */ "./node_modules/date-fns/esm/_lib/startOfUTCWeek/index.js");
/* harmony import */ var _startOfUTCWeekYear_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../startOfUTCWeekYear/index.js */ "./node_modules/date-fns/esm/_lib/startOfUTCWeekYear/index.js");
/* harmony import */ var _requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");




var MILLISECONDS_IN_WEEK = 604800000;
function getUTCWeek(dirtyDate, options) {
  (0,_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1, arguments);
  var date = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate);
  var diff = (0,_startOfUTCWeek_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(date, options).getTime() - (0,_startOfUTCWeekYear_index_js__WEBPACK_IMPORTED_MODULE_3__["default"])(date, options).getTime();

  // Round the number of days to the nearest integer
  // because the number of milliseconds in a week is not constant
  // (e.g. it's different in the week of the daylight saving time clock shift)
  return Math.round(diff / MILLISECONDS_IN_WEEK) + 1;
}

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/getUTCWeekYear/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/getUTCWeekYear/index.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getUTCWeekYear)
/* harmony export */ });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");
/* harmony import */ var _startOfUTCWeek_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../startOfUTCWeek/index.js */ "./node_modules/date-fns/esm/_lib/startOfUTCWeek/index.js");
/* harmony import */ var _toInteger_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../toInteger/index.js */ "./node_modules/date-fns/esm/_lib/toInteger/index.js");
/* harmony import */ var _defaultOptions_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../defaultOptions/index.js */ "./node_modules/date-fns/esm/_lib/defaultOptions/index.js");





function getUTCWeekYear(dirtyDate, options) {
  var _ref, _ref2, _ref3, _options$firstWeekCon, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  (0,_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1, arguments);
  var date = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate);
  var year = date.getUTCFullYear();
  var defaultOptions = (0,_defaultOptions_index_js__WEBPACK_IMPORTED_MODULE_2__.getDefaultOptions)();
  var firstWeekContainsDate = (0,_toInteger_index_js__WEBPACK_IMPORTED_MODULE_3__["default"])((_ref = (_ref2 = (_ref3 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref !== void 0 ? _ref : 1);

  // Test if weekStartsOn is between 1 and 7 _and_ is not NaN
  if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
    throw new RangeError('firstWeekContainsDate must be between 1 and 7 inclusively');
  }
  var firstWeekOfNextYear = new Date(0);
  firstWeekOfNextYear.setUTCFullYear(year + 1, 0, firstWeekContainsDate);
  firstWeekOfNextYear.setUTCHours(0, 0, 0, 0);
  var startOfNextYear = (0,_startOfUTCWeek_index_js__WEBPACK_IMPORTED_MODULE_4__["default"])(firstWeekOfNextYear, options);
  var firstWeekOfThisYear = new Date(0);
  firstWeekOfThisYear.setUTCFullYear(year, 0, firstWeekContainsDate);
  firstWeekOfThisYear.setUTCHours(0, 0, 0, 0);
  var startOfThisYear = (0,_startOfUTCWeek_index_js__WEBPACK_IMPORTED_MODULE_4__["default"])(firstWeekOfThisYear, options);
  if (date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/protectedTokens/index.js":
/*!*****************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/protectedTokens/index.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isProtectedDayOfYearToken": () => (/* binding */ isProtectedDayOfYearToken),
/* harmony export */   "isProtectedWeekYearToken": () => (/* binding */ isProtectedWeekYearToken),
/* harmony export */   "throwProtectedError": () => (/* binding */ throwProtectedError)
/* harmony export */ });
var protectedDayOfYearTokens = ['D', 'DD'];
var protectedWeekYearTokens = ['YY', 'YYYY'];
function isProtectedDayOfYearToken(token) {
  return protectedDayOfYearTokens.indexOf(token) !== -1;
}
function isProtectedWeekYearToken(token) {
  return protectedWeekYearTokens.indexOf(token) !== -1;
}
function throwProtectedError(token, format, input) {
  if (token === 'YYYY') {
    throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(format, "`) for formatting years to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  } else if (token === 'YY') {
    throw new RangeError("Use `yy` instead of `YY` (in `".concat(format, "`) for formatting years to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  } else if (token === 'D') {
    throw new RangeError("Use `d` instead of `D` (in `".concat(format, "`) for formatting days of the month to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  } else if (token === 'DD') {
    throw new RangeError("Use `dd` instead of `DD` (in `".concat(format, "`) for formatting days of the month to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  }
}

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/requiredArgs/index.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ requiredArgs)
/* harmony export */ });
function requiredArgs(required, args) {
  if (args.length < required) {
    throw new TypeError(required + ' argument' + (required > 1 ? 's' : '') + ' required, but only ' + args.length + ' present');
  }
}

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/startOfUTCISOWeek/index.js":
/*!*******************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/startOfUTCISOWeek/index.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ startOfUTCISOWeek)
/* harmony export */ });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");


function startOfUTCISOWeek(dirtyDate) {
  (0,_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1, arguments);
  var weekStartsOn = 1;
  var date = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate);
  var day = date.getUTCDay();
  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  date.setUTCDate(date.getUTCDate() - diff);
  date.setUTCHours(0, 0, 0, 0);
  return date;
}

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/startOfUTCISOWeekYear/index.js":
/*!***********************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/startOfUTCISOWeekYear/index.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ startOfUTCISOWeekYear)
/* harmony export */ });
/* harmony import */ var _getUTCISOWeekYear_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../getUTCISOWeekYear/index.js */ "./node_modules/date-fns/esm/_lib/getUTCISOWeekYear/index.js");
/* harmony import */ var _startOfUTCISOWeek_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../startOfUTCISOWeek/index.js */ "./node_modules/date-fns/esm/_lib/startOfUTCISOWeek/index.js");
/* harmony import */ var _requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");



function startOfUTCISOWeekYear(dirtyDate) {
  (0,_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1, arguments);
  var year = (0,_getUTCISOWeekYear_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate);
  var fourthOfJanuary = new Date(0);
  fourthOfJanuary.setUTCFullYear(year, 0, 4);
  fourthOfJanuary.setUTCHours(0, 0, 0, 0);
  var date = (0,_startOfUTCISOWeek_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(fourthOfJanuary);
  return date;
}

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/startOfUTCWeek/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/startOfUTCWeek/index.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ startOfUTCWeek)
/* harmony export */ });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");
/* harmony import */ var _toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../toInteger/index.js */ "./node_modules/date-fns/esm/_lib/toInteger/index.js");
/* harmony import */ var _defaultOptions_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../defaultOptions/index.js */ "./node_modules/date-fns/esm/_lib/defaultOptions/index.js");




function startOfUTCWeek(dirtyDate, options) {
  var _ref, _ref2, _ref3, _options$weekStartsOn, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  (0,_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1, arguments);
  var defaultOptions = (0,_defaultOptions_index_js__WEBPACK_IMPORTED_MODULE_1__.getDefaultOptions)();
  var weekStartsOn = (0,_toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])((_ref = (_ref2 = (_ref3 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.weekStartsOn) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions.weekStartsOn) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.weekStartsOn) !== null && _ref !== void 0 ? _ref : 0);

  // Test if weekStartsOn is between 0 and 6 _and_ is not NaN
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
  }
  var date = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_3__["default"])(dirtyDate);
  var day = date.getUTCDay();
  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  date.setUTCDate(date.getUTCDate() - diff);
  date.setUTCHours(0, 0, 0, 0);
  return date;
}

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/startOfUTCWeekYear/index.js":
/*!********************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/startOfUTCWeekYear/index.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ startOfUTCWeekYear)
/* harmony export */ });
/* harmony import */ var _getUTCWeekYear_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../getUTCWeekYear/index.js */ "./node_modules/date-fns/esm/_lib/getUTCWeekYear/index.js");
/* harmony import */ var _requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");
/* harmony import */ var _startOfUTCWeek_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../startOfUTCWeek/index.js */ "./node_modules/date-fns/esm/_lib/startOfUTCWeek/index.js");
/* harmony import */ var _toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../toInteger/index.js */ "./node_modules/date-fns/esm/_lib/toInteger/index.js");
/* harmony import */ var _defaultOptions_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../defaultOptions/index.js */ "./node_modules/date-fns/esm/_lib/defaultOptions/index.js");





function startOfUTCWeekYear(dirtyDate, options) {
  var _ref, _ref2, _ref3, _options$firstWeekCon, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  (0,_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1, arguments);
  var defaultOptions = (0,_defaultOptions_index_js__WEBPACK_IMPORTED_MODULE_1__.getDefaultOptions)();
  var firstWeekContainsDate = (0,_toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])((_ref = (_ref2 = (_ref3 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref !== void 0 ? _ref : 1);
  var year = (0,_getUTCWeekYear_index_js__WEBPACK_IMPORTED_MODULE_3__["default"])(dirtyDate, options);
  var firstWeek = new Date(0);
  firstWeek.setUTCFullYear(year, 0, firstWeekContainsDate);
  firstWeek.setUTCHours(0, 0, 0, 0);
  var date = (0,_startOfUTCWeek_index_js__WEBPACK_IMPORTED_MODULE_4__["default"])(firstWeek, options);
  return date;
}

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/toInteger/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/toInteger/index.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ toInteger)
/* harmony export */ });
function toInteger(dirtyNumber) {
  if (dirtyNumber === null || dirtyNumber === true || dirtyNumber === false) {
    return NaN;
  }
  var number = Number(dirtyNumber);
  if (isNaN(number)) {
    return number;
  }
  return number < 0 ? Math.ceil(number) : Math.floor(number);
}

/***/ }),

/***/ "./node_modules/date-fns/esm/addMilliseconds/index.js":
/*!************************************************************!*\
  !*** ./node_modules/date-fns/esm/addMilliseconds/index.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ addMilliseconds)
/* harmony export */ });
/* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_lib/toInteger/index.js */ "./node_modules/date-fns/esm/_lib/toInteger/index.js");
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");



/**
 * @name addMilliseconds
 * @category Millisecond Helpers
 * @summary Add the specified number of milliseconds to the given date.
 *
 * @description
 * Add the specified number of milliseconds to the given date.
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of milliseconds to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the milliseconds added
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Add 750 milliseconds to 10 July 2014 12:45:30.000:
 * const result = addMilliseconds(new Date(2014, 6, 10, 12, 45, 30, 0), 750)
 * //=> Thu Jul 10 2014 12:45:30.750
 */
function addMilliseconds(dirtyDate, dirtyAmount) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(2, arguments);
  var timestamp = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate).getTime();
  var amount = (0,_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(dirtyAmount);
  return new Date(timestamp + amount);
}

/***/ }),

/***/ "./node_modules/date-fns/esm/endOfWeek/index.js":
/*!******************************************************!*\
  !*** ./node_modules/date-fns/esm/endOfWeek/index.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ endOfWeek)
/* harmony export */ });
/* harmony import */ var _lib_defaultOptions_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_lib/defaultOptions/index.js */ "./node_modules/date-fns/esm/_lib/defaultOptions/index.js");
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_lib/toInteger/index.js */ "./node_modules/date-fns/esm/_lib/toInteger/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");




/**
 * @name endOfWeek
 * @category Week Helpers
 * @summary Return the end of a week for the given date.
 *
 * @description
 * Return the end of a week for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|Number} date - the original date
 * @param {Object} [options] - an object with options.
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @returns {Date} the end of a week
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 *
 * @example
 * // The end of a week for 2 September 2014 11:55:00:
 * const result = endOfWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sat Sep 06 2014 23:59:59.999
 *
 * @example
 * // If the week starts on Monday, the end of the week for 2 September 2014 11:55:00:
 * const result = endOfWeek(new Date(2014, 8, 2, 11, 55, 0), { weekStartsOn: 1 })
 * //=> Sun Sep 07 2014 23:59:59.999
 */
function endOfWeek(dirtyDate, options) {
  var _ref, _ref2, _ref3, _options$weekStartsOn, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1, arguments);
  var defaultOptions = (0,_lib_defaultOptions_index_js__WEBPACK_IMPORTED_MODULE_1__.getDefaultOptions)();
  var weekStartsOn = (0,_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])((_ref = (_ref2 = (_ref3 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.weekStartsOn) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions.weekStartsOn) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.weekStartsOn) !== null && _ref !== void 0 ? _ref : 0);

  // Test if weekStartsOn is between 0 and 6 _and_ is not NaN
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
  }
  var date = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_3__["default"])(dirtyDate);
  var day = date.getDay();
  var diff = (day < weekStartsOn ? -7 : 0) + 6 - (day - weekStartsOn);
  date.setDate(date.getDate() + diff);
  date.setHours(23, 59, 59, 999);
  return date;
}

/***/ }),

/***/ "./node_modules/date-fns/esm/format/index.js":
/*!***************************************************!*\
  !*** ./node_modules/date-fns/esm/format/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ format)
/* harmony export */ });
/* harmony import */ var _isValid_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../isValid/index.js */ "./node_modules/date-fns/esm/isValid/index.js");
/* harmony import */ var _subMilliseconds_index_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../subMilliseconds/index.js */ "./node_modules/date-fns/esm/subMilliseconds/index.js");
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _lib_format_formatters_index_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../_lib/format/formatters/index.js */ "./node_modules/date-fns/esm/_lib/format/formatters/index.js");
/* harmony import */ var _lib_format_longFormatters_index_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../_lib/format/longFormatters/index.js */ "./node_modules/date-fns/esm/_lib/format/longFormatters/index.js");
/* harmony import */ var _lib_getTimezoneOffsetInMilliseconds_index_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../_lib/getTimezoneOffsetInMilliseconds/index.js */ "./node_modules/date-fns/esm/_lib/getTimezoneOffsetInMilliseconds/index.js");
/* harmony import */ var _lib_protectedTokens_index_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../_lib/protectedTokens/index.js */ "./node_modules/date-fns/esm/_lib/protectedTokens/index.js");
/* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_lib/toInteger/index.js */ "./node_modules/date-fns/esm/_lib/toInteger/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");
/* harmony import */ var _lib_defaultOptions_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_lib/defaultOptions/index.js */ "./node_modules/date-fns/esm/_lib/defaultOptions/index.js");
/* harmony import */ var _lib_defaultLocale_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_lib/defaultLocale/index.js */ "./node_modules/date-fns/esm/_lib/defaultLocale/index.js");










 // This RegExp consists of three parts separated by `|`:
// - [yYQqMLwIdDecihHKkms]o matches any available ordinal number token
//   (one of the certain letters followed by `o`)
// - (\w)\1* matches any sequences of the same letter
// - '' matches two quote characters in a row
// - '(''|[^'])+('|$) matches anything surrounded by two quote characters ('),
//   except a single quote symbol, which ends the sequence.
//   Two quote characters do not end the sequence.
//   If there is no matching single quote
//   then the sequence will continue until the end of the string.
// - . matches any single character unmatched by previous parts of the RegExps
var formattingTokensRegExp = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;

// This RegExp catches symbols escaped by quotes, and also
// sequences of symbols P, p, and the combinations like `PPPPPPPppppp`
var longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
var escapedStringRegExp = /^'([^]*?)'?$/;
var doubleQuoteRegExp = /''/g;
var unescapedLatinCharacterRegExp = /[a-zA-Z]/;

/**
 * @name format
 * @category Common Helpers
 * @summary Format the date.
 *
 * @description
 * Return the formatted date string in the given format. The result may vary by locale.
 *
 * > ⚠️ Please note that the `format` tokens differ from Moment.js and other libraries.
 * > See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 *
 * The characters wrapped between two single quotes characters (') are escaped.
 * Two single quotes in a row, whether inside or outside a quoted sequence, represent a 'real' single quote.
 * (see the last example)
 *
 * Format of the string is based on Unicode Technical Standard #35:
 * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
 * with a few additions (see note 7 below the table).
 *
 * Accepted patterns:
 * | Unit                            | Pattern | Result examples                   | Notes |
 * |---------------------------------|---------|-----------------------------------|-------|
 * | Era                             | G..GGG  | AD, BC                            |       |
 * |                                 | GGGG    | Anno Domini, Before Christ        | 2     |
 * |                                 | GGGGG   | A, B                              |       |
 * | Calendar year                   | y       | 44, 1, 1900, 2017                 | 5     |
 * |                                 | yo      | 44th, 1st, 0th, 17th              | 5,7   |
 * |                                 | yy      | 44, 01, 00, 17                    | 5     |
 * |                                 | yyy     | 044, 001, 1900, 2017              | 5     |
 * |                                 | yyyy    | 0044, 0001, 1900, 2017            | 5     |
 * |                                 | yyyyy   | ...                               | 3,5   |
 * | Local week-numbering year       | Y       | 44, 1, 1900, 2017                 | 5     |
 * |                                 | Yo      | 44th, 1st, 1900th, 2017th         | 5,7   |
 * |                                 | YY      | 44, 01, 00, 17                    | 5,8   |
 * |                                 | YYY     | 044, 001, 1900, 2017              | 5     |
 * |                                 | YYYY    | 0044, 0001, 1900, 2017            | 5,8   |
 * |                                 | YYYYY   | ...                               | 3,5   |
 * | ISO week-numbering year         | R       | -43, 0, 1, 1900, 2017             | 5,7   |
 * |                                 | RR      | -43, 00, 01, 1900, 2017           | 5,7   |
 * |                                 | RRR     | -043, 000, 001, 1900, 2017        | 5,7   |
 * |                                 | RRRR    | -0043, 0000, 0001, 1900, 2017     | 5,7   |
 * |                                 | RRRRR   | ...                               | 3,5,7 |
 * | Extended year                   | u       | -43, 0, 1, 1900, 2017             | 5     |
 * |                                 | uu      | -43, 01, 1900, 2017               | 5     |
 * |                                 | uuu     | -043, 001, 1900, 2017             | 5     |
 * |                                 | uuuu    | -0043, 0001, 1900, 2017           | 5     |
 * |                                 | uuuuu   | ...                               | 3,5   |
 * | Quarter (formatting)            | Q       | 1, 2, 3, 4                        |       |
 * |                                 | Qo      | 1st, 2nd, 3rd, 4th                | 7     |
 * |                                 | QQ      | 01, 02, 03, 04                    |       |
 * |                                 | QQQ     | Q1, Q2, Q3, Q4                    |       |
 * |                                 | QQQQ    | 1st quarter, 2nd quarter, ...     | 2     |
 * |                                 | QQQQQ   | 1, 2, 3, 4                        | 4     |
 * | Quarter (stand-alone)           | q       | 1, 2, 3, 4                        |       |
 * |                                 | qo      | 1st, 2nd, 3rd, 4th                | 7     |
 * |                                 | qq      | 01, 02, 03, 04                    |       |
 * |                                 | qqq     | Q1, Q2, Q3, Q4                    |       |
 * |                                 | qqqq    | 1st quarter, 2nd quarter, ...     | 2     |
 * |                                 | qqqqq   | 1, 2, 3, 4                        | 4     |
 * | Month (formatting)              | M       | 1, 2, ..., 12                     |       |
 * |                                 | Mo      | 1st, 2nd, ..., 12th               | 7     |
 * |                                 | MM      | 01, 02, ..., 12                   |       |
 * |                                 | MMM     | Jan, Feb, ..., Dec                |       |
 * |                                 | MMMM    | January, February, ..., December  | 2     |
 * |                                 | MMMMM   | J, F, ..., D                      |       |
 * | Month (stand-alone)             | L       | 1, 2, ..., 12                     |       |
 * |                                 | Lo      | 1st, 2nd, ..., 12th               | 7     |
 * |                                 | LL      | 01, 02, ..., 12                   |       |
 * |                                 | LLL     | Jan, Feb, ..., Dec                |       |
 * |                                 | LLLL    | January, February, ..., December  | 2     |
 * |                                 | LLLLL   | J, F, ..., D                      |       |
 * | Local week of year              | w       | 1, 2, ..., 53                     |       |
 * |                                 | wo      | 1st, 2nd, ..., 53th               | 7     |
 * |                                 | ww      | 01, 02, ..., 53                   |       |
 * | ISO week of year                | I       | 1, 2, ..., 53                     | 7     |
 * |                                 | Io      | 1st, 2nd, ..., 53th               | 7     |
 * |                                 | II      | 01, 02, ..., 53                   | 7     |
 * | Day of month                    | d       | 1, 2, ..., 31                     |       |
 * |                                 | do      | 1st, 2nd, ..., 31st               | 7     |
 * |                                 | dd      | 01, 02, ..., 31                   |       |
 * | Day of year                     | D       | 1, 2, ..., 365, 366               | 9     |
 * |                                 | Do      | 1st, 2nd, ..., 365th, 366th       | 7     |
 * |                                 | DD      | 01, 02, ..., 365, 366             | 9     |
 * |                                 | DDD     | 001, 002, ..., 365, 366           |       |
 * |                                 | DDDD    | ...                               | 3     |
 * | Day of week (formatting)        | E..EEE  | Mon, Tue, Wed, ..., Sun           |       |
 * |                                 | EEEE    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 | EEEEE   | M, T, W, T, F, S, S               |       |
 * |                                 | EEEEEE  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
 * | ISO day of week (formatting)    | i       | 1, 2, 3, ..., 7                   | 7     |
 * |                                 | io      | 1st, 2nd, ..., 7th                | 7     |
 * |                                 | ii      | 01, 02, ..., 07                   | 7     |
 * |                                 | iii     | Mon, Tue, Wed, ..., Sun           | 7     |
 * |                                 | iiii    | Monday, Tuesday, ..., Sunday      | 2,7   |
 * |                                 | iiiii   | M, T, W, T, F, S, S               | 7     |
 * |                                 | iiiiii  | Mo, Tu, We, Th, Fr, Sa, Su        | 7     |
 * | Local day of week (formatting)  | e       | 2, 3, 4, ..., 1                   |       |
 * |                                 | eo      | 2nd, 3rd, ..., 1st                | 7     |
 * |                                 | ee      | 02, 03, ..., 01                   |       |
 * |                                 | eee     | Mon, Tue, Wed, ..., Sun           |       |
 * |                                 | eeee    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 | eeeee   | M, T, W, T, F, S, S               |       |
 * |                                 | eeeeee  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
 * | Local day of week (stand-alone) | c       | 2, 3, 4, ..., 1                   |       |
 * |                                 | co      | 2nd, 3rd, ..., 1st                | 7     |
 * |                                 | cc      | 02, 03, ..., 01                   |       |
 * |                                 | ccc     | Mon, Tue, Wed, ..., Sun           |       |
 * |                                 | cccc    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 | ccccc   | M, T, W, T, F, S, S               |       |
 * |                                 | cccccc  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
 * | AM, PM                          | a..aa   | AM, PM                            |       |
 * |                                 | aaa     | am, pm                            |       |
 * |                                 | aaaa    | a.m., p.m.                        | 2     |
 * |                                 | aaaaa   | a, p                              |       |
 * | AM, PM, noon, midnight          | b..bb   | AM, PM, noon, midnight            |       |
 * |                                 | bbb     | am, pm, noon, midnight            |       |
 * |                                 | bbbb    | a.m., p.m., noon, midnight        | 2     |
 * |                                 | bbbbb   | a, p, n, mi                       |       |
 * | Flexible day period             | B..BBB  | at night, in the morning, ...     |       |
 * |                                 | BBBB    | at night, in the morning, ...     | 2     |
 * |                                 | BBBBB   | at night, in the morning, ...     |       |
 * | Hour [1-12]                     | h       | 1, 2, ..., 11, 12                 |       |
 * |                                 | ho      | 1st, 2nd, ..., 11th, 12th         | 7     |
 * |                                 | hh      | 01, 02, ..., 11, 12               |       |
 * | Hour [0-23]                     | H       | 0, 1, 2, ..., 23                  |       |
 * |                                 | Ho      | 0th, 1st, 2nd, ..., 23rd          | 7     |
 * |                                 | HH      | 00, 01, 02, ..., 23               |       |
 * | Hour [0-11]                     | K       | 1, 2, ..., 11, 0                  |       |
 * |                                 | Ko      | 1st, 2nd, ..., 11th, 0th          | 7     |
 * |                                 | KK      | 01, 02, ..., 11, 00               |       |
 * | Hour [1-24]                     | k       | 24, 1, 2, ..., 23                 |       |
 * |                                 | ko      | 24th, 1st, 2nd, ..., 23rd         | 7     |
 * |                                 | kk      | 24, 01, 02, ..., 23               |       |
 * | Minute                          | m       | 0, 1, ..., 59                     |       |
 * |                                 | mo      | 0th, 1st, ..., 59th               | 7     |
 * |                                 | mm      | 00, 01, ..., 59                   |       |
 * | Second                          | s       | 0, 1, ..., 59                     |       |
 * |                                 | so      | 0th, 1st, ..., 59th               | 7     |
 * |                                 | ss      | 00, 01, ..., 59                   |       |
 * | Fraction of second              | S       | 0, 1, ..., 9                      |       |
 * |                                 | SS      | 00, 01, ..., 99                   |       |
 * |                                 | SSS     | 000, 001, ..., 999                |       |
 * |                                 | SSSS    | ...                               | 3     |
 * | Timezone (ISO-8601 w/ Z)        | X       | -08, +0530, Z                     |       |
 * |                                 | XX      | -0800, +0530, Z                   |       |
 * |                                 | XXX     | -08:00, +05:30, Z                 |       |
 * |                                 | XXXX    | -0800, +0530, Z, +123456          | 2     |
 * |                                 | XXXXX   | -08:00, +05:30, Z, +12:34:56      |       |
 * | Timezone (ISO-8601 w/o Z)       | x       | -08, +0530, +00                   |       |
 * |                                 | xx      | -0800, +0530, +0000               |       |
 * |                                 | xxx     | -08:00, +05:30, +00:00            | 2     |
 * |                                 | xxxx    | -0800, +0530, +0000, +123456      |       |
 * |                                 | xxxxx   | -08:00, +05:30, +00:00, +12:34:56 |       |
 * | Timezone (GMT)                  | O...OOO | GMT-8, GMT+5:30, GMT+0            |       |
 * |                                 | OOOO    | GMT-08:00, GMT+05:30, GMT+00:00   | 2     |
 * | Timezone (specific non-locat.)  | z...zzz | GMT-8, GMT+5:30, GMT+0            | 6     |
 * |                                 | zzzz    | GMT-08:00, GMT+05:30, GMT+00:00   | 2,6   |
 * | Seconds timestamp               | t       | 512969520                         | 7     |
 * |                                 | tt      | ...                               | 3,7   |
 * | Milliseconds timestamp          | T       | 512969520900                      | 7     |
 * |                                 | TT      | ...                               | 3,7   |
 * | Long localized date             | P       | 04/29/1453                        | 7     |
 * |                                 | PP      | Apr 29, 1453                      | 7     |
 * |                                 | PPP     | April 29th, 1453                  | 7     |
 * |                                 | PPPP    | Friday, April 29th, 1453          | 2,7   |
 * | Long localized time             | p       | 12:00 AM                          | 7     |
 * |                                 | pp      | 12:00:00 AM                       | 7     |
 * |                                 | ppp     | 12:00:00 AM GMT+2                 | 7     |
 * |                                 | pppp    | 12:00:00 AM GMT+02:00             | 2,7   |
 * | Combination of date and time    | Pp      | 04/29/1453, 12:00 AM              | 7     |
 * |                                 | PPpp    | Apr 29, 1453, 12:00:00 AM         | 7     |
 * |                                 | PPPppp  | April 29th, 1453 at ...           | 7     |
 * |                                 | PPPPpppp| Friday, April 29th, 1453 at ...   | 2,7   |
 * Notes:
 * 1. "Formatting" units (e.g. formatting quarter) in the default en-US locale
 *    are the same as "stand-alone" units, but are different in some languages.
 *    "Formatting" units are declined according to the rules of the language
 *    in the context of a date. "Stand-alone" units are always nominative singular:
 *
 *    `format(new Date(2017, 10, 6), 'do LLLL', {locale: cs}) //=> '6. listopad'`
 *
 *    `format(new Date(2017, 10, 6), 'do MMMM', {locale: cs}) //=> '6. listopadu'`
 *
 * 2. Any sequence of the identical letters is a pattern, unless it is escaped by
 *    the single quote characters (see below).
 *    If the sequence is longer than listed in table (e.g. `EEEEEEEEEEE`)
 *    the output will be the same as default pattern for this unit, usually
 *    the longest one (in case of ISO weekdays, `EEEE`). Default patterns for units
 *    are marked with "2" in the last column of the table.
 *
 *    `format(new Date(2017, 10, 6), 'MMM') //=> 'Nov'`
 *
 *    `format(new Date(2017, 10, 6), 'MMMM') //=> 'November'`
 *
 *    `format(new Date(2017, 10, 6), 'MMMMM') //=> 'N'`
 *
 *    `format(new Date(2017, 10, 6), 'MMMMMM') //=> 'November'`
 *
 *    `format(new Date(2017, 10, 6), 'MMMMMMM') //=> 'November'`
 *
 * 3. Some patterns could be unlimited length (such as `yyyyyyyy`).
 *    The output will be padded with zeros to match the length of the pattern.
 *
 *    `format(new Date(2017, 10, 6), 'yyyyyyyy') //=> '00002017'`
 *
 * 4. `QQQQQ` and `qqqqq` could be not strictly numerical in some locales.
 *    These tokens represent the shortest form of the quarter.
 *
 * 5. The main difference between `y` and `u` patterns are B.C. years:
 *
 *    | Year | `y` | `u` |
 *    |------|-----|-----|
 *    | AC 1 |   1 |   1 |
 *    | BC 1 |   1 |   0 |
 *    | BC 2 |   2 |  -1 |
 *
 *    Also `yy` always returns the last two digits of a year,
 *    while `uu` pads single digit years to 2 characters and returns other years unchanged:
 *
 *    | Year | `yy` | `uu` |
 *    |------|------|------|
 *    | 1    |   01 |   01 |
 *    | 14   |   14 |   14 |
 *    | 376  |   76 |  376 |
 *    | 1453 |   53 | 1453 |
 *
 *    The same difference is true for local and ISO week-numbering years (`Y` and `R`),
 *    except local week-numbering years are dependent on `options.weekStartsOn`
 *    and `options.firstWeekContainsDate` (compare [getISOWeekYear]{@link https://date-fns.org/docs/getISOWeekYear}
 *    and [getWeekYear]{@link https://date-fns.org/docs/getWeekYear}).
 *
 * 6. Specific non-location timezones are currently unavailable in `date-fns`,
 *    so right now these tokens fall back to GMT timezones.
 *
 * 7. These patterns are not in the Unicode Technical Standard #35:
 *    - `i`: ISO day of week
 *    - `I`: ISO week of year
 *    - `R`: ISO week-numbering year
 *    - `t`: seconds timestamp
 *    - `T`: milliseconds timestamp
 *    - `o`: ordinal number modifier
 *    - `P`: long localized date
 *    - `p`: long localized time
 *
 * 8. `YY` and `YYYY` tokens represent week-numbering years but they are often confused with years.
 *    You should enable `options.useAdditionalWeekYearTokens` to use them. See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 *
 * 9. `D` and `DD` tokens represent days of the year but they are often confused with days of the month.
 *    You should enable `options.useAdditionalDayOfYearTokens` to use them. See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 *
 * @param {Date|Number} date - the original date
 * @param {String} format - the string of tokens
 * @param {Object} [options] - an object with options.
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @param {Number} [options.firstWeekContainsDate=1] - the day of January, which is
 * @param {Boolean} [options.useAdditionalWeekYearTokens=false] - if true, allows usage of the week-numbering year tokens `YY` and `YYYY`;
 *   see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @param {Boolean} [options.useAdditionalDayOfYearTokens=false] - if true, allows usage of the day of year tokens `D` and `DD`;
 *   see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @returns {String} the formatted date string
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} `date` must not be Invalid Date
 * @throws {RangeError} `options.locale` must contain `localize` property
 * @throws {RangeError} `options.locale` must contain `formatLong` property
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 * @throws {RangeError} `options.firstWeekContainsDate` must be between 1 and 7
 * @throws {RangeError} use `yyyy` instead of `YYYY` for formatting years using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws {RangeError} use `yy` instead of `YY` for formatting years using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws {RangeError} use `d` instead of `D` for formatting days of the month using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws {RangeError} use `dd` instead of `DD` for formatting days of the month using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws {RangeError} format string contains an unescaped latin alphabet character
 *
 * @example
 * // Represent 11 February 2014 in middle-endian format:
 * const result = format(new Date(2014, 1, 11), 'MM/dd/yyyy')
 * //=> '02/11/2014'
 *
 * @example
 * // Represent 2 July 2014 in Esperanto:
 * import { eoLocale } from 'date-fns/locale/eo'
 * const result = format(new Date(2014, 6, 2), "do 'de' MMMM yyyy", {
 *   locale: eoLocale
 * })
 * //=> '2-a de julio 2014'
 *
 * @example
 * // Escape string by single quote characters:
 * const result = format(new Date(2014, 6, 2, 15), "h 'o''clock'")
 * //=> "3 o'clock"
 */

function format(dirtyDate, dirtyFormatStr, options) {
  var _ref, _options$locale, _ref2, _ref3, _ref4, _options$firstWeekCon, _options$locale2, _options$locale2$opti, _defaultOptions$local, _defaultOptions$local2, _ref5, _ref6, _ref7, _options$weekStartsOn, _options$locale3, _options$locale3$opti, _defaultOptions$local3, _defaultOptions$local4;
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(2, arguments);
  var formatStr = String(dirtyFormatStr);
  var defaultOptions = (0,_lib_defaultOptions_index_js__WEBPACK_IMPORTED_MODULE_1__.getDefaultOptions)();
  var locale = (_ref = (_options$locale = options === null || options === void 0 ? void 0 : options.locale) !== null && _options$locale !== void 0 ? _options$locale : defaultOptions.locale) !== null && _ref !== void 0 ? _ref : _lib_defaultLocale_index_js__WEBPACK_IMPORTED_MODULE_2__["default"];
  var firstWeekContainsDate = (0,_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_3__["default"])((_ref2 = (_ref3 = (_ref4 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale2 = options.locale) === null || _options$locale2 === void 0 ? void 0 : (_options$locale2$opti = _options$locale2.options) === null || _options$locale2$opti === void 0 ? void 0 : _options$locale2$opti.firstWeekContainsDate) !== null && _ref4 !== void 0 ? _ref4 : defaultOptions.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : (_defaultOptions$local = defaultOptions.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : 1);

  // Test if weekStartsOn is between 1 and 7 _and_ is not NaN
  if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
    throw new RangeError('firstWeekContainsDate must be between 1 and 7 inclusively');
  }
  var weekStartsOn = (0,_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_3__["default"])((_ref5 = (_ref6 = (_ref7 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale3 = options.locale) === null || _options$locale3 === void 0 ? void 0 : (_options$locale3$opti = _options$locale3.options) === null || _options$locale3$opti === void 0 ? void 0 : _options$locale3$opti.weekStartsOn) !== null && _ref7 !== void 0 ? _ref7 : defaultOptions.weekStartsOn) !== null && _ref6 !== void 0 ? _ref6 : (_defaultOptions$local3 = defaultOptions.locale) === null || _defaultOptions$local3 === void 0 ? void 0 : (_defaultOptions$local4 = _defaultOptions$local3.options) === null || _defaultOptions$local4 === void 0 ? void 0 : _defaultOptions$local4.weekStartsOn) !== null && _ref5 !== void 0 ? _ref5 : 0);

  // Test if weekStartsOn is between 0 and 6 _and_ is not NaN
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
  }
  if (!locale.localize) {
    throw new RangeError('locale must contain localize property');
  }
  if (!locale.formatLong) {
    throw new RangeError('locale must contain formatLong property');
  }
  var originalDate = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_4__["default"])(dirtyDate);
  if (!(0,_isValid_index_js__WEBPACK_IMPORTED_MODULE_5__["default"])(originalDate)) {
    throw new RangeError('Invalid time value');
  }

  // Convert the date in system timezone to the same date in UTC+00:00 timezone.
  // This ensures that when UTC functions will be implemented, locales will be compatible with them.
  // See an issue about UTC functions: https://github.com/date-fns/date-fns/issues/376
  var timezoneOffset = (0,_lib_getTimezoneOffsetInMilliseconds_index_js__WEBPACK_IMPORTED_MODULE_6__["default"])(originalDate);
  var utcDate = (0,_subMilliseconds_index_js__WEBPACK_IMPORTED_MODULE_7__["default"])(originalDate, timezoneOffset);
  var formatterOptions = {
    firstWeekContainsDate: firstWeekContainsDate,
    weekStartsOn: weekStartsOn,
    locale: locale,
    _originalDate: originalDate
  };
  var result = formatStr.match(longFormattingTokensRegExp).map(function (substring) {
    var firstCharacter = substring[0];
    if (firstCharacter === 'p' || firstCharacter === 'P') {
      var longFormatter = _lib_format_longFormatters_index_js__WEBPACK_IMPORTED_MODULE_8__["default"][firstCharacter];
      return longFormatter(substring, locale.formatLong);
    }
    return substring;
  }).join('').match(formattingTokensRegExp).map(function (substring) {
    // Replace two single quote characters with one single quote character
    if (substring === "''") {
      return "'";
    }
    var firstCharacter = substring[0];
    if (firstCharacter === "'") {
      return cleanEscapedString(substring);
    }
    var formatter = _lib_format_formatters_index_js__WEBPACK_IMPORTED_MODULE_9__["default"][firstCharacter];
    if (formatter) {
      if (!(options !== null && options !== void 0 && options.useAdditionalWeekYearTokens) && (0,_lib_protectedTokens_index_js__WEBPACK_IMPORTED_MODULE_10__.isProtectedWeekYearToken)(substring)) {
        (0,_lib_protectedTokens_index_js__WEBPACK_IMPORTED_MODULE_10__.throwProtectedError)(substring, dirtyFormatStr, String(dirtyDate));
      }
      if (!(options !== null && options !== void 0 && options.useAdditionalDayOfYearTokens) && (0,_lib_protectedTokens_index_js__WEBPACK_IMPORTED_MODULE_10__.isProtectedDayOfYearToken)(substring)) {
        (0,_lib_protectedTokens_index_js__WEBPACK_IMPORTED_MODULE_10__.throwProtectedError)(substring, dirtyFormatStr, String(dirtyDate));
      }
      return formatter(utcDate, substring, locale.localize, formatterOptions);
    }
    if (firstCharacter.match(unescapedLatinCharacterRegExp)) {
      throw new RangeError('Format string contains an unescaped latin alphabet character `' + firstCharacter + '`');
    }
    return substring;
  }).join('');
  return result;
}
function cleanEscapedString(input) {
  var matched = input.match(escapedStringRegExp);
  if (!matched) {
    return input;
  }
  return matched[1].replace(doubleQuoteRegExp, "'");
}

/***/ }),

/***/ "./node_modules/date-fns/esm/isDate/index.js":
/*!***************************************************!*\
  !*** ./node_modules/date-fns/esm/isDate/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isDate)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/typeof */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");


/**
 * @name isDate
 * @category Common Helpers
 * @summary Is the given value a date?
 *
 * @description
 * Returns true if the given value is an instance of Date. The function works for dates transferred across iframes.
 *
 * @param {*} value - the value to check
 * @returns {boolean} true if the given value is a date
 * @throws {TypeError} 1 arguments required
 *
 * @example
 * // For a valid date:
 * const result = isDate(new Date())
 * //=> true
 *
 * @example
 * // For an invalid date:
 * const result = isDate(new Date(NaN))
 * //=> true
 *
 * @example
 * // For some value:
 * const result = isDate('2014-02-31')
 * //=> false
 *
 * @example
 * // For an object:
 * const result = isDate({})
 * //=> false
 */
function isDate(value) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(1, arguments);
  return value instanceof Date || (0,_babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(value) === 'object' && Object.prototype.toString.call(value) === '[object Date]';
}

/***/ }),

/***/ "./node_modules/date-fns/esm/isSameDay/index.js":
/*!******************************************************!*\
  !*** ./node_modules/date-fns/esm/isSameDay/index.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isSameDay)
/* harmony export */ });
/* harmony import */ var _startOfDay_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../startOfDay/index.js */ "./node_modules/date-fns/esm/startOfDay/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");


/**
 * @name isSameDay
 * @category Day Helpers
 * @summary Are the given dates in the same day (and year and month)?
 *
 * @description
 * Are the given dates in the same day (and year and month)?
 *
 * @param {Date|Number} dateLeft - the first date to check
 * @param {Date|Number} dateRight - the second date to check
 * @returns {Boolean} the dates are in the same day (and year and month)
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Are 4 September 06:00:00 and 4 September 18:00:00 in the same day?
 * const result = isSameDay(new Date(2014, 8, 4, 6, 0), new Date(2014, 8, 4, 18, 0))
 * //=> true
 *
 * @example
 * // Are 4 September and 4 October in the same day?
 * const result = isSameDay(new Date(2014, 8, 4), new Date(2014, 9, 4))
 * //=> false
 *
 * @example
 * // Are 4 September, 2014 and 4 September, 2015 in the same day?
 * const result = isSameDay(new Date(2014, 8, 4), new Date(2015, 8, 4))
 * //=> false
 */
function isSameDay(dirtyDateLeft, dirtyDateRight) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(2, arguments);
  var dateLeftStartOfDay = (0,_startOfDay_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDateLeft);
  var dateRightStartOfDay = (0,_startOfDay_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDateRight);
  return dateLeftStartOfDay.getTime() === dateRightStartOfDay.getTime();
}

/***/ }),

/***/ "./node_modules/date-fns/esm/isValid/index.js":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/esm/isValid/index.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isValid)
/* harmony export */ });
/* harmony import */ var _isDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../isDate/index.js */ "./node_modules/date-fns/esm/isDate/index.js");
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");



/**
 * @name isValid
 * @category Common Helpers
 * @summary Is the given date valid?
 *
 * @description
 * Returns false if argument is Invalid Date and true otherwise.
 * Argument is converted to Date using `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
 * Invalid Date is a Date, whose time value is NaN.
 *
 * Time value of Date: http://es5.github.io/#x15.9.1.1
 *
 * @param {*} date - the date to check
 * @returns {Boolean} the date is valid
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // For the valid date:
 * const result = isValid(new Date(2014, 1, 31))
 * //=> true
 *
 * @example
 * // For the value, convertable into a date:
 * const result = isValid(1393804800000)
 * //=> true
 *
 * @example
 * // For the invalid date:
 * const result = isValid(new Date(''))
 * //=> false
 */
function isValid(dirtyDate) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1, arguments);
  if (!(0,_isDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate) && typeof dirtyDate !== 'number') {
    return false;
  }
  var date = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(dirtyDate);
  return !isNaN(Number(date));
}

/***/ }),

/***/ "./node_modules/date-fns/esm/isWithinInterval/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/date-fns/esm/isWithinInterval/index.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isWithinInterval)
/* harmony export */ });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");


/**
 * @name isWithinInterval
 * @category Interval Helpers
 * @summary Is the given date within the interval?
 *
 * @description
 * Is the given date within the interval? (Including start and end.)
 *
 * @param {Date|Number} date - the date to check
 * @param {Interval} interval - the interval to check
 * @returns {Boolean} the date is within the interval
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} The start of an interval cannot be after its end
 * @throws {RangeError} Date in interval cannot be `Invalid Date`
 *
 * @example
 * // For the date within the interval:
 * isWithinInterval(new Date(2014, 0, 3), {
 *   start: new Date(2014, 0, 1),
 *   end: new Date(2014, 0, 7)
 * })
 * //=> true
 *
 * @example
 * // For the date outside of the interval:
 * isWithinInterval(new Date(2014, 0, 10), {
 *   start: new Date(2014, 0, 1),
 *   end: new Date(2014, 0, 7)
 * })
 * //=> false
 *
 * @example
 * // For date equal to interval start:
 * isWithinInterval(date, { start, end: date }) // => true
 *
 * @example
 * // For date equal to interval end:
 * isWithinInterval(date, { start: date, end }) // => true
 */
function isWithinInterval(dirtyDate, interval) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(2, arguments);
  var time = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate).getTime();
  var startTime = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(interval.start).getTime();
  var endTime = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(interval.end).getTime();

  // Throw an exception if start date is after end date or if any date is `Invalid Date`
  if (!(startTime <= endTime)) {
    throw new RangeError('Invalid interval');
  }
  return time >= startTime && time <= endTime;
}

/***/ }),

/***/ "./node_modules/date-fns/esm/locale/_lib/buildFormatLongFn/index.js":
/*!**************************************************************************!*\
  !*** ./node_modules/date-fns/esm/locale/_lib/buildFormatLongFn/index.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ buildFormatLongFn)
/* harmony export */ });
function buildFormatLongFn(args) {
  return function () {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    // TODO: Remove String()
    var width = options.width ? String(options.width) : args.defaultWidth;
    var format = args.formats[width] || args.formats[args.defaultWidth];
    return format;
  };
}

/***/ }),

/***/ "./node_modules/date-fns/esm/locale/_lib/buildLocalizeFn/index.js":
/*!************************************************************************!*\
  !*** ./node_modules/date-fns/esm/locale/_lib/buildLocalizeFn/index.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ buildLocalizeFn)
/* harmony export */ });
function buildLocalizeFn(args) {
  return function (dirtyIndex, options) {
    var context = options !== null && options !== void 0 && options.context ? String(options.context) : 'standalone';
    var valuesArray;
    if (context === 'formatting' && args.formattingValues) {
      var defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
      var width = options !== null && options !== void 0 && options.width ? String(options.width) : defaultWidth;
      valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
    } else {
      var _defaultWidth = args.defaultWidth;
      var _width = options !== null && options !== void 0 && options.width ? String(options.width) : args.defaultWidth;
      valuesArray = args.values[_width] || args.values[_defaultWidth];
    }
    var index = args.argumentCallback ? args.argumentCallback(dirtyIndex) : dirtyIndex;
    // @ts-ignore: For some reason TypeScript just don't want to match it, no matter how hard we try. I challenge you to try to remove it!
    return valuesArray[index];
  };
}

/***/ }),

/***/ "./node_modules/date-fns/esm/locale/_lib/buildMatchFn/index.js":
/*!*********************************************************************!*\
  !*** ./node_modules/date-fns/esm/locale/_lib/buildMatchFn/index.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ buildMatchFn)
/* harmony export */ });
function buildMatchFn(args) {
  return function (string) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var width = options.width;
    var matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];
    var matchResult = string.match(matchPattern);
    if (!matchResult) {
      return null;
    }
    var matchedString = matchResult[0];
    var parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];
    var key = Array.isArray(parsePatterns) ? findIndex(parsePatterns, function (pattern) {
      return pattern.test(matchedString);
    }) : findKey(parsePatterns, function (pattern) {
      return pattern.test(matchedString);
    });
    var value;
    value = args.valueCallback ? args.valueCallback(key) : key;
    value = options.valueCallback ? options.valueCallback(value) : value;
    var rest = string.slice(matchedString.length);
    return {
      value: value,
      rest: rest
    };
  };
}
function findKey(object, predicate) {
  for (var key in object) {
    if (object.hasOwnProperty(key) && predicate(object[key])) {
      return key;
    }
  }
  return undefined;
}
function findIndex(array, predicate) {
  for (var key = 0; key < array.length; key++) {
    if (predicate(array[key])) {
      return key;
    }
  }
  return undefined;
}

/***/ }),

/***/ "./node_modules/date-fns/esm/locale/_lib/buildMatchPatternFn/index.js":
/*!****************************************************************************!*\
  !*** ./node_modules/date-fns/esm/locale/_lib/buildMatchPatternFn/index.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ buildMatchPatternFn)
/* harmony export */ });
function buildMatchPatternFn(args) {
  return function (string) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var matchResult = string.match(args.matchPattern);
    if (!matchResult) return null;
    var matchedString = matchResult[0];
    var parseResult = string.match(args.parsePattern);
    if (!parseResult) return null;
    var value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
    value = options.valueCallback ? options.valueCallback(value) : value;
    var rest = string.slice(matchedString.length);
    return {
      value: value,
      rest: rest
    };
  };
}

/***/ }),

/***/ "./node_modules/date-fns/esm/locale/en-US/_lib/formatDistance/index.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/date-fns/esm/locale/en-US/_lib/formatDistance/index.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var formatDistanceLocale = {
  lessThanXSeconds: {
    one: 'less than a second',
    other: 'less than {{count}} seconds'
  },
  xSeconds: {
    one: '1 second',
    other: '{{count}} seconds'
  },
  halfAMinute: 'half a minute',
  lessThanXMinutes: {
    one: 'less than a minute',
    other: 'less than {{count}} minutes'
  },
  xMinutes: {
    one: '1 minute',
    other: '{{count}} minutes'
  },
  aboutXHours: {
    one: 'about 1 hour',
    other: 'about {{count}} hours'
  },
  xHours: {
    one: '1 hour',
    other: '{{count}} hours'
  },
  xDays: {
    one: '1 day',
    other: '{{count}} days'
  },
  aboutXWeeks: {
    one: 'about 1 week',
    other: 'about {{count}} weeks'
  },
  xWeeks: {
    one: '1 week',
    other: '{{count}} weeks'
  },
  aboutXMonths: {
    one: 'about 1 month',
    other: 'about {{count}} months'
  },
  xMonths: {
    one: '1 month',
    other: '{{count}} months'
  },
  aboutXYears: {
    one: 'about 1 year',
    other: 'about {{count}} years'
  },
  xYears: {
    one: '1 year',
    other: '{{count}} years'
  },
  overXYears: {
    one: 'over 1 year',
    other: 'over {{count}} years'
  },
  almostXYears: {
    one: 'almost 1 year',
    other: 'almost {{count}} years'
  }
};
var formatDistance = function formatDistance(token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale[token];
  if (typeof tokenValue === 'string') {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace('{{count}}', count.toString());
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return 'in ' + result;
    } else {
      return result + ' ago';
    }
  }
  return result;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (formatDistance);

/***/ }),

/***/ "./node_modules/date-fns/esm/locale/en-US/_lib/formatLong/index.js":
/*!*************************************************************************!*\
  !*** ./node_modules/date-fns/esm/locale/en-US/_lib/formatLong/index.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _lib_buildFormatLongFn_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../_lib/buildFormatLongFn/index.js */ "./node_modules/date-fns/esm/locale/_lib/buildFormatLongFn/index.js");

var dateFormats = {
  full: 'EEEE, MMMM do, y',
  long: 'MMMM do, y',
  medium: 'MMM d, y',
  short: 'MM/dd/yyyy'
};
var timeFormats = {
  full: 'h:mm:ss a zzzz',
  long: 'h:mm:ss a z',
  medium: 'h:mm:ss a',
  short: 'h:mm a'
};
var dateTimeFormats = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: '{{date}}, {{time}}',
  short: '{{date}}, {{time}}'
};
var formatLong = {
  date: (0,_lib_buildFormatLongFn_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    formats: dateFormats,
    defaultWidth: 'full'
  }),
  time: (0,_lib_buildFormatLongFn_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    formats: timeFormats,
    defaultWidth: 'full'
  }),
  dateTime: (0,_lib_buildFormatLongFn_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    formats: dateTimeFormats,
    defaultWidth: 'full'
  })
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (formatLong);

/***/ }),

/***/ "./node_modules/date-fns/esm/locale/en-US/_lib/formatRelative/index.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/date-fns/esm/locale/en-US/_lib/formatRelative/index.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var formatRelativeLocale = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: 'P'
};
var formatRelative = function formatRelative(token, _date, _baseDate, _options) {
  return formatRelativeLocale[token];
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (formatRelative);

/***/ }),

/***/ "./node_modules/date-fns/esm/locale/en-US/_lib/localize/index.js":
/*!***********************************************************************!*\
  !*** ./node_modules/date-fns/esm/locale/en-US/_lib/localize/index.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _lib_buildLocalizeFn_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../_lib/buildLocalizeFn/index.js */ "./node_modules/date-fns/esm/locale/_lib/buildLocalizeFn/index.js");

var eraValues = {
  narrow: ['B', 'A'],
  abbreviated: ['BC', 'AD'],
  wide: ['Before Christ', 'Anno Domini']
};
var quarterValues = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['Q1', 'Q2', 'Q3', 'Q4'],
  wide: ['1st quarter', '2nd quarter', '3rd quarter', '4th quarter']
};

// Note: in English, the names of days of the week and months are capitalized.
// If you are making a new locale based on this one, check if the same is true for the language you're working on.
// Generally, formatted dates should look like they are in the middle of a sentence,
// e.g. in Spanish language the weekdays and months should be in the lowercase.
var monthValues = {
  narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  abbreviated: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  wide: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
};
var dayValues = {
  narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  short: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  abbreviated: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  wide: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
};
var dayPeriodValues = {
  narrow: {
    am: 'a',
    pm: 'p',
    midnight: 'mi',
    noon: 'n',
    morning: 'morning',
    afternoon: 'afternoon',
    evening: 'evening',
    night: 'night'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'midnight',
    noon: 'noon',
    morning: 'morning',
    afternoon: 'afternoon',
    evening: 'evening',
    night: 'night'
  },
  wide: {
    am: 'a.m.',
    pm: 'p.m.',
    midnight: 'midnight',
    noon: 'noon',
    morning: 'morning',
    afternoon: 'afternoon',
    evening: 'evening',
    night: 'night'
  }
};
var formattingDayPeriodValues = {
  narrow: {
    am: 'a',
    pm: 'p',
    midnight: 'mi',
    noon: 'n',
    morning: 'in the morning',
    afternoon: 'in the afternoon',
    evening: 'in the evening',
    night: 'at night'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'midnight',
    noon: 'noon',
    morning: 'in the morning',
    afternoon: 'in the afternoon',
    evening: 'in the evening',
    night: 'at night'
  },
  wide: {
    am: 'a.m.',
    pm: 'p.m.',
    midnight: 'midnight',
    noon: 'noon',
    morning: 'in the morning',
    afternoon: 'in the afternoon',
    evening: 'in the evening',
    night: 'at night'
  }
};
var ordinalNumber = function ordinalNumber(dirtyNumber, _options) {
  var number = Number(dirtyNumber);

  // If ordinal numbers depend on context, for example,
  // if they are different for different grammatical genders,
  // use `options.unit`.
  //
  // `unit` can be 'year', 'quarter', 'month', 'week', 'date', 'dayOfYear',
  // 'day', 'hour', 'minute', 'second'.

  var rem100 = number % 100;
  if (rem100 > 20 || rem100 < 10) {
    switch (rem100 % 10) {
      case 1:
        return number + 'st';
      case 2:
        return number + 'nd';
      case 3:
        return number + 'rd';
    }
  }
  return number + 'th';
};
var localize = {
  ordinalNumber: ordinalNumber,
  era: (0,_lib_buildLocalizeFn_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    values: eraValues,
    defaultWidth: 'wide'
  }),
  quarter: (0,_lib_buildLocalizeFn_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    values: quarterValues,
    defaultWidth: 'wide',
    argumentCallback: function argumentCallback(quarter) {
      return quarter - 1;
    }
  }),
  month: (0,_lib_buildLocalizeFn_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    values: monthValues,
    defaultWidth: 'wide'
  }),
  day: (0,_lib_buildLocalizeFn_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    values: dayValues,
    defaultWidth: 'wide'
  }),
  dayPeriod: (0,_lib_buildLocalizeFn_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    values: dayPeriodValues,
    defaultWidth: 'wide',
    formattingValues: formattingDayPeriodValues,
    defaultFormattingWidth: 'wide'
  })
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (localize);

/***/ }),

/***/ "./node_modules/date-fns/esm/locale/en-US/_lib/match/index.js":
/*!********************************************************************!*\
  !*** ./node_modules/date-fns/esm/locale/en-US/_lib/match/index.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _lib_buildMatchFn_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../_lib/buildMatchFn/index.js */ "./node_modules/date-fns/esm/locale/_lib/buildMatchFn/index.js");
/* harmony import */ var _lib_buildMatchPatternFn_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../_lib/buildMatchPatternFn/index.js */ "./node_modules/date-fns/esm/locale/_lib/buildMatchPatternFn/index.js");


var matchOrdinalNumberPattern = /^(\d+)(th|st|nd|rd)?/i;
var parseOrdinalNumberPattern = /\d+/i;
var matchEraPatterns = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
};
var parseEraPatterns = {
  any: [/^b/i, /^(a|c)/i]
};
var matchQuarterPatterns = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
};
var parseQuarterPatterns = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
};
var parseMonthPatterns = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
};
var matchDayPatterns = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
};
var parseDayPatterns = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
};
var matchDayPeriodPatterns = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
};
var parseDayPeriodPatterns = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
};
var match = {
  ordinalNumber: (0,_lib_buildMatchPatternFn_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    matchPattern: matchOrdinalNumberPattern,
    parsePattern: parseOrdinalNumberPattern,
    valueCallback: function valueCallback(value) {
      return parseInt(value, 10);
    }
  }),
  era: (0,_lib_buildMatchFn_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
    matchPatterns: matchEraPatterns,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns,
    defaultParseWidth: 'any'
  }),
  quarter: (0,_lib_buildMatchFn_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
    matchPatterns: matchQuarterPatterns,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns,
    defaultParseWidth: 'any',
    valueCallback: function valueCallback(index) {
      return index + 1;
    }
  }),
  month: (0,_lib_buildMatchFn_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
    matchPatterns: matchMonthPatterns,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns,
    defaultParseWidth: 'any'
  }),
  day: (0,_lib_buildMatchFn_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
    matchPatterns: matchDayPatterns,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns,
    defaultParseWidth: 'any'
  }),
  dayPeriod: (0,_lib_buildMatchFn_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
    matchPatterns: matchDayPeriodPatterns,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns,
    defaultParseWidth: 'any'
  })
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (match);

/***/ }),

/***/ "./node_modules/date-fns/esm/locale/en-US/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/date-fns/esm/locale/en-US/index.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _lib_formatDistance_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_lib/formatDistance/index.js */ "./node_modules/date-fns/esm/locale/en-US/_lib/formatDistance/index.js");
/* harmony import */ var _lib_formatLong_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_lib/formatLong/index.js */ "./node_modules/date-fns/esm/locale/en-US/_lib/formatLong/index.js");
/* harmony import */ var _lib_formatRelative_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_lib/formatRelative/index.js */ "./node_modules/date-fns/esm/locale/en-US/_lib/formatRelative/index.js");
/* harmony import */ var _lib_localize_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_lib/localize/index.js */ "./node_modules/date-fns/esm/locale/en-US/_lib/localize/index.js");
/* harmony import */ var _lib_match_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./_lib/match/index.js */ "./node_modules/date-fns/esm/locale/en-US/_lib/match/index.js");





/**
 * @type {Locale}
 * @category Locales
 * @summary English locale (United States).
 * @language English
 * @iso-639-2 eng
 * @author Sasha Koss [@kossnocorp]{@link https://github.com/kossnocorp}
 * @author Lesha Koss [@leshakoss]{@link https://github.com/leshakoss}
 */
var locale = {
  code: 'en-US',
  formatDistance: _lib_formatDistance_index_js__WEBPACK_IMPORTED_MODULE_0__["default"],
  formatLong: _lib_formatLong_index_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  formatRelative: _lib_formatRelative_index_js__WEBPACK_IMPORTED_MODULE_2__["default"],
  localize: _lib_localize_index_js__WEBPACK_IMPORTED_MODULE_3__["default"],
  match: _lib_match_index_js__WEBPACK_IMPORTED_MODULE_4__["default"],
  options: {
    weekStartsOn: 0 /* Sunday */,
    firstWeekContainsDate: 1
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (locale);

/***/ }),

/***/ "./node_modules/date-fns/esm/startOfDay/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/date-fns/esm/startOfDay/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ startOfDay)
/* harmony export */ });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");


/**
 * @name startOfDay
 * @category Day Helpers
 * @summary Return the start of a day for the given date.
 *
 * @description
 * Return the start of a day for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the start of a day
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The start of a day for 2 September 2014 11:55:00:
 * const result = startOfDay(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 02 2014 00:00:00
 */
function startOfDay(dirtyDate) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1, arguments);
  var date = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate);
  date.setHours(0, 0, 0, 0);
  return date;
}

/***/ }),

/***/ "./node_modules/date-fns/esm/startOfWeek/index.js":
/*!********************************************************!*\
  !*** ./node_modules/date-fns/esm/startOfWeek/index.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ startOfWeek)
/* harmony export */ });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_lib/toInteger/index.js */ "./node_modules/date-fns/esm/_lib/toInteger/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");
/* harmony import */ var _lib_defaultOptions_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_lib/defaultOptions/index.js */ "./node_modules/date-fns/esm/_lib/defaultOptions/index.js");




/**
 * @name startOfWeek
 * @category Week Helpers
 * @summary Return the start of a week for the given date.
 *
 * @description
 * Return the start of a week for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|Number} date - the original date
 * @param {Object} [options] - an object with options.
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @returns {Date} the start of a week
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 *
 * @example
 * // The start of a week for 2 September 2014 11:55:00:
 * const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sun Aug 31 2014 00:00:00
 *
 * @example
 * // If the week starts on Monday, the start of the week for 2 September 2014 11:55:00:
 * const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0), { weekStartsOn: 1 })
 * //=> Mon Sep 01 2014 00:00:00
 */
function startOfWeek(dirtyDate, options) {
  var _ref, _ref2, _ref3, _options$weekStartsOn, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1, arguments);
  var defaultOptions = (0,_lib_defaultOptions_index_js__WEBPACK_IMPORTED_MODULE_1__.getDefaultOptions)();
  var weekStartsOn = (0,_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])((_ref = (_ref2 = (_ref3 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.weekStartsOn) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions.weekStartsOn) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.weekStartsOn) !== null && _ref !== void 0 ? _ref : 0);

  // Test if weekStartsOn is between 0 and 6 _and_ is not NaN
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
  }
  var date = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_3__["default"])(dirtyDate);
  var day = date.getDay();
  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  date.setDate(date.getDate() - diff);
  date.setHours(0, 0, 0, 0);
  return date;
}

/***/ }),

/***/ "./node_modules/date-fns/esm/subMilliseconds/index.js":
/*!************************************************************!*\
  !*** ./node_modules/date-fns/esm/subMilliseconds/index.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ subMilliseconds)
/* harmony export */ });
/* harmony import */ var _addMilliseconds_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../addMilliseconds/index.js */ "./node_modules/date-fns/esm/addMilliseconds/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");
/* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_lib/toInteger/index.js */ "./node_modules/date-fns/esm/_lib/toInteger/index.js");



/**
 * @name subMilliseconds
 * @category Millisecond Helpers
 * @summary Subtract the specified number of milliseconds from the given date.
 *
 * @description
 * Subtract the specified number of milliseconds from the given date.
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of milliseconds to be subtracted. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the milliseconds subtracted
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Subtract 750 milliseconds from 10 July 2014 12:45:30.000:
 * const result = subMilliseconds(new Date(2014, 6, 10, 12, 45, 30, 0), 750)
 * //=> Thu Jul 10 2014 12:45:29.250
 */
function subMilliseconds(dirtyDate, dirtyAmount) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(2, arguments);
  var amount = (0,_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyAmount);
  return (0,_addMilliseconds_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(dirtyDate, -amount);
}

/***/ }),

/***/ "./node_modules/date-fns/esm/toDate/index.js":
/*!***************************************************!*\
  !*** ./node_modules/date-fns/esm/toDate/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ toDate)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/typeof */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");


/**
 * @name toDate
 * @category Common Helpers
 * @summary Convert the given argument to an instance of Date.
 *
 * @description
 * Convert the given argument to an instance of Date.
 *
 * If the argument is an instance of Date, the function returns its clone.
 *
 * If the argument is a number, it is treated as a timestamp.
 *
 * If the argument is none of the above, the function returns Invalid Date.
 *
 * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
 *
 * @param {Date|Number} argument - the value to convert
 * @returns {Date} the parsed date in the local time zone
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Clone the date:
 * const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert the timestamp to date:
 * const result = toDate(1392098430000)
 * //=> Tue Feb 11 2014 11:30:30
 */
function toDate(argument) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(1, arguments);
  var argStr = Object.prototype.toString.call(argument);

  // Clone the date
  if (argument instanceof Date || (0,_babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(argument) === 'object' && argStr === '[object Date]') {
    // Prevent the date to lose the milliseconds when passed to new Date() in IE10
    return new Date(argument.getTime());
  } else if (typeof argument === 'number' || argStr === '[object Number]') {
    return new Date(argument);
  } else {
    if ((typeof argument === 'string' || argStr === '[object String]') && typeof console !== 'undefined') {
      // eslint-disable-next-line no-console
      console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments");
      // eslint-disable-next-line no-console
      console.warn(new Error().stack);
    }
    return new Date(NaN);
  }
}

/***/ }),

/***/ "./src/assets/css/reset.css":
/*!**********************************!*\
  !*** ./src/assets/css/reset.css ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_reset_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!./reset.css */ "./node_modules/css-loader/dist/cjs.js!./src/assets/css/reset.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_reset_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_reset_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_reset_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_reset_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/assets/css/style.css":
/*!**********************************!*\
  !*** ./src/assets/css/style.css ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/assets/css/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/native.js":
/*!******************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/native.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  randomUUID
});

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/regex.js":
/*!*****************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/regex.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/rng.js":
/*!***************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/rng.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ rng)
/* harmony export */ });
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
let getRandomValues;
const rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/stringify.js":
/*!*********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/stringify.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "unsafeStringify": () => (/* binding */ unsafeStringify)
/* harmony export */ });
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ "./node_modules/uuid/dist/esm-browser/validate.js");

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

const byteToHex = [];

for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).slice(1));
}

function unsafeStringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
}

function stringify(arr, offset = 0) {
  const uuid = unsafeStringify(arr, offset); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__["default"])(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stringify);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/v4.js":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v4.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _native_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./native.js */ "./node_modules/uuid/dist/esm-browser/native.js");
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rng.js */ "./node_modules/uuid/dist/esm-browser/rng.js");
/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stringify.js */ "./node_modules/uuid/dist/esm-browser/stringify.js");




function v4(options, buf, offset) {
  if (_native_js__WEBPACK_IMPORTED_MODULE_0__["default"].randomUUID && !buf && !options) {
    return _native_js__WEBPACK_IMPORTED_MODULE_0__["default"].randomUUID();
  }

  options = options || {};
  const rnds = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_1__["default"])(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return (0,_stringify_js__WEBPACK_IMPORTED_MODULE_2__.unsafeStringify)(rnds);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (v4);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/validate.js":
/*!********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/validate.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./regex.js */ "./node_modules/uuid/dist/esm-browser/regex.js");


function validate(uuid) {
  return typeof uuid === 'string' && _regex_js__WEBPACK_IMPORTED_MODULE_0__["default"].test(uuid);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validate);

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/typeof.js":
/*!***********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/typeof.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _typeof)
/* harmony export */ });
function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

/***/ }),

/***/ "./node_modules/@formkit/auto-animate/index.mjs":
/*!******************************************************!*\
  !*** ./node_modules/@formkit/auto-animate/index.mjs ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ autoAnimate),
/* harmony export */   "getTransitionSizes": () => (/* binding */ getTransitionSizes),
/* harmony export */   "vAutoAnimate": () => (/* binding */ vAutoAnimate)
/* harmony export */ });
/**
 * A set of all the parents currently being observe. This is the only non weak
 * registry.
 */
const parents = new Set();
/**
 * Element coordinates that is constantly kept up to date.
 */
const coords = new WeakMap();
/**
 * Siblings of elements that have been removed from the dom.
 */
const siblings = new WeakMap();
/**
 * Animations that are currently running.
 */
const animations = new WeakMap();
/**
 * A map of existing intersection observers used to track element movements.
 */
const intersections = new WeakMap();
/**
 * Intervals for automatically checking the position of elements occasionally.
 */
const intervals = new WeakMap();
/**
 * The configuration options for each group of elements.
 */
const options = new WeakMap();
/**
 * Debounce counters by id, used to debounce calls to update positions.
 */
const debounces = new WeakMap();
/**
 * All parents that are currently enabled are tracked here.
 */
const enabled = new WeakSet();
/**
 * The document used to calculate transitions.
 */
let root;
/**
 * Used to sign an element as the target.
 */
const TGT = "__aa_tgt";
/**
 * Used to sign an element as being part of a removal.
 */
const DEL = "__aa_del";
/**
 * Callback for handling all mutations.
 * @param mutations - A mutation list
 */
const handleMutations = (mutations) => {
    const elements = getElements(mutations);
    // If elements is "false" that means this mutation that should be ignored.
    if (elements) {
        elements.forEach((el) => animate(el));
    }
};
/**
 *
 * @param entries - Elements that have been resized.
 */
const handleResizes = (entries) => {
    entries.forEach((entry) => {
        if (entry.target === root)
            updateAllPos();
        if (coords.has(entry.target))
            updatePos(entry.target);
    });
};
/**
 * Observe this elements position.
 * @param el - The element to observe the position of.
 */
function observePosition(el) {
    const oldObserver = intersections.get(el);
    oldObserver === null || oldObserver === void 0 ? void 0 : oldObserver.disconnect();
    let rect = coords.get(el);
    let invocations = 0;
    const buffer = 5;
    if (!rect) {
        rect = getCoords(el);
        coords.set(el, rect);
    }
    const { offsetWidth, offsetHeight } = root;
    const rootMargins = [
        rect.top - buffer,
        offsetWidth - (rect.left + buffer + rect.width),
        offsetHeight - (rect.top + buffer + rect.height),
        rect.left - buffer,
    ];
    const rootMargin = rootMargins
        .map((px) => `${-1 * Math.floor(px)}px`)
        .join(" ");
    const observer = new IntersectionObserver(() => {
        ++invocations > 1 && updatePos(el);
    }, {
        root,
        threshold: 1,
        rootMargin,
    });
    observer.observe(el);
    intersections.set(el, observer);
}
/**
 * Update the exact position of a given element.
 * @param el - An element to update the position of.
 */
function updatePos(el) {
    clearTimeout(debounces.get(el));
    const optionsOrPlugin = getOptions(el);
    const delay = typeof optionsOrPlugin === "function" ? 500 : optionsOrPlugin.duration;
    debounces.set(el, setTimeout(async () => {
        const currentAnimation = animations.get(el);
        try {
            await (currentAnimation === null || currentAnimation === void 0 ? void 0 : currentAnimation.finished);
            coords.set(el, getCoords(el));
            observePosition(el);
        }
        catch {
            // ignore errors as the `.finished` promise is rejected when animations were cancelled
        }
    }, delay));
}
/**
 * Updates all positions that are currently being tracked.
 */
function updateAllPos() {
    clearTimeout(debounces.get(root));
    debounces.set(root, setTimeout(() => {
        parents.forEach((parent) => forEach(parent, (el) => lowPriority(() => updatePos(el))));
    }, 100));
}
/**
 * Its possible for a quick scroll or other fast events to get past the
 * intersection observer, so occasionally we need want "cold-poll" for the
 * latests and greatest position. We try to do this in the most non-disruptive
 * fashion possible. First we only do this ever couple seconds, staggard by a
 * random offset.
 * @param el - Element
 */
function poll(el) {
    setTimeout(() => {
        intervals.set(el, setInterval(() => lowPriority(updatePos.bind(null, el)), 2000));
    }, Math.round(2000 * Math.random()));
}
/**
 * Perform some operation that is non critical at some point.
 * @param callback
 */
function lowPriority(callback) {
    if (typeof requestIdleCallback === "function") {
        requestIdleCallback(() => callback());
    }
    else {
        requestAnimationFrame(() => callback());
    }
}
/**
 * The mutation observer responsible for watching each root element.
 */
let mutations;
/**
 * A resize observer, responsible for recalculating elements on resize.
 */
let resize;
/**
 * If this is in a browser, initialize our Web APIs
 */
if (typeof window !== "undefined") {
    root = document.documentElement;
    mutations = new MutationObserver(handleMutations);
    resize = new ResizeObserver(handleResizes);
    resize.observe(root);
}
/**
 * Retrieves all the elements that may have been affected by the last mutation
 * including ones that have been removed and are no longer in the DOM.
 * @param mutations - A mutation list.
 * @returns
 */
function getElements(mutations) {
    const observedNodes = mutations.reduce((nodes, mutation) => {
        return [
            ...nodes,
            ...Array.from(mutation.addedNodes),
            ...Array.from(mutation.removedNodes),
        ];
    }, []);
    // Short circuit if _only_ comment nodes are observed
    const onlyCommentNodesObserved = observedNodes.every((node) => node.nodeName === "#comment");
    if (onlyCommentNodesObserved)
        return false;
    return mutations.reduce((elements, mutation) => {
        // Short circuit if we find a purposefully deleted node.
        if (elements === false)
            return false;
        if (mutation.target instanceof Element) {
            target(mutation.target);
            if (!elements.has(mutation.target)) {
                elements.add(mutation.target);
                for (let i = 0; i < mutation.target.children.length; i++) {
                    const child = mutation.target.children.item(i);
                    if (!child)
                        continue;
                    if (DEL in child)
                        return false;
                    target(mutation.target, child);
                    elements.add(child);
                }
            }
            if (mutation.removedNodes.length) {
                for (let i = 0; i < mutation.removedNodes.length; i++) {
                    const child = mutation.removedNodes[i];
                    if (DEL in child)
                        return false;
                    if (child instanceof Element) {
                        elements.add(child);
                        target(mutation.target, child);
                        siblings.set(child, [
                            mutation.previousSibling,
                            mutation.nextSibling,
                        ]);
                    }
                }
            }
        }
        return elements;
    }, new Set());
}
/**
 * Assign the target to an element.
 * @param el - The root element
 * @param child
 */
function target(el, child) {
    if (!child && !(TGT in el))
        Object.defineProperty(el, TGT, { value: el });
    else if (child && !(TGT in child))
        Object.defineProperty(child, TGT, { value: el });
}
/**
 * Determines what kind of change took place on the given element and then
 * performs the proper animation based on that.
 * @param el - The specific element to animate.
 */
function animate(el) {
    var _a;
    const isMounted = el.isConnected;
    const preExisting = coords.has(el);
    if (isMounted && siblings.has(el))
        siblings.delete(el);
    if (animations.has(el)) {
        (_a = animations.get(el)) === null || _a === void 0 ? void 0 : _a.cancel();
    }
    if (preExisting && isMounted) {
        remain(el);
    }
    else if (preExisting && !isMounted) {
        remove(el);
    }
    else {
        add(el);
    }
}
/**
 * Removes all non-digits from a string and casts to a number.
 * @param str - A string containing a pixel value.
 * @returns
 */
function raw(str) {
    return Number(str.replace(/[^0-9.\-]/g, ""));
}
/**
 * Get the scroll offset of elements
 * @param el - Element
 * @returns
 */
function getScrollOffset(el) {
    let p = el.parentElement;
    while (p) {
        if (p.scrollLeft || p.scrollTop) {
            return { x: p.scrollLeft, y: p.scrollTop };
        }
        p = p.parentElement;
    }
    return { x: 0, y: 0 };
}
/**
 * Get the coordinates of elements adjusted for scroll position.
 * @param el - Element
 * @returns
 */
function getCoords(el) {
    const rect = el.getBoundingClientRect();
    const { x, y } = getScrollOffset(el);
    return {
        top: rect.top + y,
        left: rect.left + x,
        width: rect.width,
        height: rect.height,
    };
}
/**
 * Returns the width/height that the element should be transitioned between.
 * This takes into account box-sizing.
 * @param el - Element being animated
 * @param oldCoords - Old set of Coordinates coordinates
 * @param newCoords - New set of Coordinates coordinates
 * @returns
 */
function getTransitionSizes(el, oldCoords, newCoords) {
    let widthFrom = oldCoords.width;
    let heightFrom = oldCoords.height;
    let widthTo = newCoords.width;
    let heightTo = newCoords.height;
    const styles = getComputedStyle(el);
    const sizing = styles.getPropertyValue("box-sizing");
    if (sizing === "content-box") {
        const paddingY = raw(styles.paddingTop) +
            raw(styles.paddingBottom) +
            raw(styles.borderTopWidth) +
            raw(styles.borderBottomWidth);
        const paddingX = raw(styles.paddingLeft) +
            raw(styles.paddingRight) +
            raw(styles.borderRightWidth) +
            raw(styles.borderLeftWidth);
        widthFrom -= paddingX;
        widthTo -= paddingX;
        heightFrom -= paddingY;
        heightTo -= paddingY;
    }
    return [widthFrom, widthTo, heightFrom, heightTo].map(Math.round);
}
/**
 * Retrieves animation options for the current element.
 * @param el - Element to retrieve options for.
 * @returns
 */
function getOptions(el) {
    return TGT in el && options.has(el[TGT])
        ? options.get(el[TGT])
        : { duration: 250, easing: "ease-in-out" };
}
/**
 * Returns the target of a given animation (generally the parent).
 * @param el - An element to check for a target
 * @returns
 */
function getTarget(el) {
    if (TGT in el)
        return el[TGT];
    return undefined;
}
/**
 * Checks if animations are enabled or disabled for a given element.
 * @param el - Any element
 * @returns
 */
function isEnabled(el) {
    const target = getTarget(el);
    return target ? enabled.has(target) : false;
}
/**
 * Iterate over the children of a given parent.
 * @param parent - A parent element
 * @param callback - A callback
 */
function forEach(parent, ...callbacks) {
    callbacks.forEach((callback) => callback(parent, options.has(parent)));
    for (let i = 0; i < parent.children.length; i++) {
        const child = parent.children.item(i);
        if (child) {
            callbacks.forEach((callback) => callback(child, options.has(child)));
        }
    }
}
/**
 * The element in question is remaining in the DOM.
 * @param el - Element to flip
 * @returns
 */
function remain(el) {
    const oldCoords = coords.get(el);
    const newCoords = getCoords(el);
    if (!isEnabled(el))
        return coords.set(el, newCoords);
    let animation;
    if (!oldCoords)
        return;
    const pluginOrOptions = getOptions(el);
    if (typeof pluginOrOptions !== "function") {
        const deltaX = oldCoords.left - newCoords.left;
        const deltaY = oldCoords.top - newCoords.top;
        const [widthFrom, widthTo, heightFrom, heightTo] = getTransitionSizes(el, oldCoords, newCoords);
        const start = {
            transform: `translate(${deltaX}px, ${deltaY}px)`,
        };
        const end = {
            transform: `translate(0, 0)`,
        };
        if (widthFrom !== widthTo) {
            start.width = `${widthFrom}px`;
            end.width = `${widthTo}px`;
        }
        if (heightFrom !== heightTo) {
            start.height = `${heightFrom}px`;
            end.height = `${heightTo}px`;
        }
        animation = el.animate([start, end], {
            duration: pluginOrOptions.duration,
            easing: pluginOrOptions.easing,
        });
    }
    else {
        animation = new Animation(pluginOrOptions(el, "remain", oldCoords, newCoords));
        animation.play();
    }
    animations.set(el, animation);
    coords.set(el, newCoords);
    animation.addEventListener("finish", updatePos.bind(null, el));
}
/**
 * Adds the element with a transition.
 * @param el - Animates the element being added.
 */
function add(el) {
    const newCoords = getCoords(el);
    coords.set(el, newCoords);
    const pluginOrOptions = getOptions(el);
    if (!isEnabled(el))
        return;
    let animation;
    if (typeof pluginOrOptions !== "function") {
        animation = el.animate([
            { transform: "scale(.98)", opacity: 0 },
            { transform: "scale(0.98)", opacity: 0, offset: 0.5 },
            { transform: "scale(1)", opacity: 1 },
        ], {
            duration: pluginOrOptions.duration * 1.5,
            easing: "ease-in",
        });
    }
    else {
        animation = new Animation(pluginOrOptions(el, "add", newCoords));
        animation.play();
    }
    animations.set(el, animation);
    animation.addEventListener("finish", updatePos.bind(null, el));
}
/**
 * Animates the removal of an element.
 * @param el - Element to remove
 */
function remove(el) {
    var _a;
    if (!siblings.has(el) || !coords.has(el))
        return;
    const [prev, next] = siblings.get(el);
    Object.defineProperty(el, DEL, { value: true });
    if (next && next.parentNode && next.parentNode instanceof Element) {
        next.parentNode.insertBefore(el, next);
    }
    else if (prev && prev.parentNode) {
        prev.parentNode.appendChild(el);
    }
    else {
        (_a = getTarget(el)) === null || _a === void 0 ? void 0 : _a.appendChild(el);
    }
    function cleanUp() {
        var _a;
        el.remove();
        coords.delete(el);
        siblings.delete(el);
        animations.delete(el);
        (_a = intersections.get(el)) === null || _a === void 0 ? void 0 : _a.disconnect();
    }
    if (!isEnabled(el))
        return cleanUp();
    const [top, left, width, height] = deletePosition(el);
    const optionsOrPlugin = getOptions(el);
    const oldCoords = coords.get(el);
    let animation;
    Object.assign(el.style, {
        position: "absolute",
        top: `${top}px`,
        left: `${left}px`,
        width: `${width}px`,
        height: `${height}px`,
        margin: 0,
        pointerEvents: "none",
        transformOrigin: "center",
        zIndex: 100,
    });
    if (typeof optionsOrPlugin !== "function") {
        animation = el.animate([
            {
                transform: "scale(1)",
                opacity: 1,
            },
            {
                transform: "scale(.98)",
                opacity: 0,
            },
        ], { duration: optionsOrPlugin.duration, easing: "ease-out" });
    }
    else {
        animation = new Animation(optionsOrPlugin(el, "remove", oldCoords));
        animation.play();
    }
    animations.set(el, animation);
    animation.addEventListener("finish", cleanUp);
}
function deletePosition(el) {
    const oldCoords = coords.get(el);
    const [width, , height] = getTransitionSizes(el, oldCoords, getCoords(el));
    let offsetParent = el.parentElement;
    while (offsetParent &&
        (getComputedStyle(offsetParent).position === "static" ||
            offsetParent instanceof HTMLBodyElement)) {
        offsetParent = offsetParent.parentElement;
    }
    if (!offsetParent)
        offsetParent = document.body;
    const parentStyles = getComputedStyle(offsetParent);
    const parentCoords = coords.get(offsetParent) || getCoords(offsetParent);
    const top = Math.round(oldCoords.top - parentCoords.top) -
        raw(parentStyles.borderTopWidth);
    const left = Math.round(oldCoords.left - parentCoords.left) -
        raw(parentStyles.borderLeftWidth);
    return [top, left, width, height];
}
/**
 * A function that automatically adds animation effects to itself and its
 * immediate children. Specifically it adds effects for adding, moving, and
 * removing DOM elements.
 * @param el - A parent element to add animations to.
 * @param options - An optional object of options.
 */
function autoAnimate(el, config = {}) {
    if (mutations && resize) {
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        const isDisabledDueToReduceMotion = mediaQuery.matches &&
            typeof config !== "function" &&
            !config.disrespectUserMotionPreference;
        if (!isDisabledDueToReduceMotion) {
            enabled.add(el);
            if (getComputedStyle(el).position === "static") {
                Object.assign(el.style, { position: "relative" });
            }
            forEach(el, updatePos, poll, (element) => resize === null || resize === void 0 ? void 0 : resize.observe(element));
            if (typeof config === "function") {
                options.set(el, config);
            }
            else {
                options.set(el, { duration: 250, easing: "ease-in-out", ...config });
            }
            mutations.observe(el, { childList: true });
            parents.add(el);
        }
    }
    return Object.freeze({
        parent: el,
        enable: () => {
            enabled.add(el);
        },
        disable: () => {
            enabled.delete(el);
        },
        isEnabled: () => enabled.has(el),
    });
}
/**
 * The vue directive.
 */
const vAutoAnimate = {
    mounted: (el, binding) => {
        autoAnimate(el, binding.value || {});
    },
};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _assets_css_reset_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assets/css/reset.css */ "./src/assets/css/reset.css");
/* harmony import */ var _assets_css_style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assets/css/style.css */ "./src/assets/css/style.css");
/* harmony import */ var _compositionRoot__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./compositionRoot */ "./src/compositionRoot.js");



document.addEventListener('DOMContentLoaded', () => {
  const appController = (0,_compositionRoot__WEBPACK_IMPORTED_MODULE_2__["default"])();
  appController.launch();
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBMEQ7QUFDTTtBQUNFO0FBQ3ZCO0FBQ007QUFDRTtBQUNBO0FBQ007QUFDYjtBQUNPO0FBQ0s7QUFDZjtBQUNBO0FBRTFCLFNBQVNhLGFBQWFBLENBQUEsRUFBRztFQUNyQyxNQUFNQyxhQUFhLEdBQUcsSUFBSVQsNkRBQWEsQ0FBQyxDQUFDO0VBQ3pDLE1BQU1VLFlBQVksR0FBRyxJQUFJWCw0REFBWSxDQUFDLENBQUM7RUFDdkMsTUFBTVksU0FBUyxHQUFHLElBQUliLHlEQUFTLENBQUMsQ0FBQztFQUNqQyxNQUFNYyxNQUFNLEdBQUcsSUFBSU4sMkRBQU0sQ0FBQyxDQUFDO0VBQzNCLE1BQU1PLE1BQU0sR0FBRyxJQUFJTiwyREFBTSxDQUFDLENBQUM7RUFFM0IsTUFBTU8sUUFBUSxHQUFHVixpRUFBYSxDQUFDLFdBQVcsQ0FBQztFQUMzQyxNQUFNVyxXQUFXLEdBQUdYLGlFQUFhLENBQUMsY0FBYyxDQUFDO0VBQ2pELE1BQU1ZLE9BQU8sR0FBR1osaUVBQWEsQ0FBQyxVQUFVLENBQUM7RUFFekMsTUFBTWEsY0FBYyxHQUFHLElBQUl0QixtRUFBYyxDQUN0Q2dCLFNBQVMsRUFDVEcsUUFBUSxFQUNSRixNQUFNLEVBQ05DLE1BQ0gsQ0FBQztFQUNELE1BQU1LLGlCQUFpQixHQUFHLElBQUl0QixzRUFBaUIsQ0FBQ2MsWUFBWSxFQUFFSyxXQUFXLENBQUM7RUFDMUUsTUFBTUksa0JBQWtCLEdBQUcsSUFBSXRCLHVFQUFrQixDQUFDWSxhQUFhLENBQUM7RUFFaEUsTUFBTVcsYUFBYSxHQUFHLElBQUlmLG1FQUFhLENBQ3BDWSxjQUFjLEVBQ2RDLGlCQUFpQixFQUNqQkMsa0JBQWtCLEVBQ2xCSCxPQUNILENBQUM7RUFFRCxPQUFPSSxhQUFhO0FBQ3ZCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxQ3FDO0FBQ2U7QUFDTztBQUNqQjtBQUUxQyxNQUFNZixhQUFhLENBQUM7RUFDakJrQixXQUFXQSxDQUFDTixjQUFjLEVBQUVDLGlCQUFpQixFQUFFQyxrQkFBa0IsRUFBRUgsT0FBTyxFQUFFO0lBQ3pFLElBQUksQ0FBQ0MsY0FBYyxHQUFHQSxjQUFjO0lBQ3BDLElBQUksQ0FBQ0MsaUJBQWlCLEdBQUdBLGlCQUFpQjtJQUMxQyxJQUFJLENBQUNDLGtCQUFrQixHQUFHQSxrQkFBa0I7SUFDNUMsSUFBSSxDQUFDSyxJQUFJLEdBQUdSLE9BQU87SUFDbkIsSUFBSSxDQUFDUyxtQkFBbUIsQ0FBQyxDQUFDO0VBQzdCO0VBRUFDLE1BQU1BLENBQUEsRUFBRztJQUNOLElBQUksQ0FBQ0MsY0FBYyxDQUFDLENBQUM7SUFDckJDLFFBQVEsQ0FBQ0MsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDQyxXQUFXLENBQUMsSUFBSSxDQUFDTixJQUFJLENBQUM7RUFDekQ7RUFFQUcsY0FBY0EsQ0FBQSxFQUFHO0lBQ2QsTUFBTUksVUFBVSxHQUFHLElBQUksQ0FBQ1osa0JBQWtCLENBQUNhLEtBQUssQ0FBQ0MsV0FBVyxDQUFDLENBQUM7SUFDOUQsTUFBTUMsUUFBUSxHQUFHLElBQUksQ0FBQ2hCLGlCQUFpQixDQUFDYyxLQUFLLENBQUNDLFdBQVcsQ0FBQyxDQUFDO0lBRTNELElBQUksQ0FBQ2hCLGNBQWMsQ0FBQ2tCLGNBQWMsQ0FBQztNQUFFRCxRQUFRO01BQUVIO0lBQVcsQ0FBQyxDQUFDO0lBQzVELElBQUksQ0FBQ2IsaUJBQWlCLENBQUNpQixjQUFjLENBQUM7TUFBRUo7SUFBVyxDQUFDLENBQUM7SUFFckQsTUFBTUssT0FBTyxHQUFHaEMsaUVBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQ2lDLGNBQWMsQ0FDckQsSUFBSSxDQUFDbkIsaUJBQWlCLENBQUNNLElBQzFCLENBQUM7SUFFRCxJQUFJLENBQUNBLElBQUksQ0FBQ2EsY0FBYyxDQUFDLENBQUNELE9BQU8sRUFBRSxJQUFJLENBQUNuQixjQUFjLENBQUNPLElBQUksQ0FBQyxDQUFDO0VBQ2hFO0VBRUFDLG1CQUFtQkEsQ0FBQSxFQUFHO0lBQ25CSiwrREFBZ0IsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDa0IsWUFBWSxDQUFDQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0RuQiwrREFBZ0IsQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUNvQixhQUFhLENBQUNELElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztFQUNyRTtFQUVBRCxZQUFZQSxDQUFDRyxNQUFNLEVBQUU7SUFDbEIsTUFBTVgsVUFBVSxHQUFHLElBQUksQ0FBQ1osa0JBQWtCLENBQUNhLEtBQUssQ0FBQ0MsV0FBVyxDQUFDLENBQUM7SUFDOUQsTUFBTUMsUUFBUSxHQUFHLElBQUksQ0FBQ2hCLGlCQUFpQixDQUFDYyxLQUFLLENBQUNDLFdBQVcsQ0FBQyxDQUFDO0lBQzNELE1BQU1VLElBQUksR0FBRyxJQUFJLENBQUMxQixjQUFjLENBQUNlLEtBQUssQ0FBQ1ksV0FBVyxDQUFDRixNQUFNLENBQUM7SUFFMUQsSUFBSSxDQUFDbEIsSUFBSSxDQUFDcUIsZUFBZSxDQUFDO01BQUVGLElBQUk7TUFBRVosVUFBVTtNQUFFRztJQUFTLENBQUMsQ0FBQztFQUM1RDtFQUVBTyxhQUFhQSxDQUFBLEVBQUc7SUFDYixJQUFJLENBQUNqQixJQUFJLENBQUNpQixhQUFhLENBQUMsQ0FBQztFQUM1QjtBQUNIO0FBRUEsaUVBQWVwQyxhQUFhOzs7Ozs7Ozs7Ozs7Ozs7QUNuRFM7QUFFckMsTUFBTVIsa0JBQWtCLENBQUM7RUFDdEIwQixXQUFXQSxDQUFDZCxhQUFhLEVBQUU7SUFDeEIsSUFBSSxDQUFDdUIsS0FBSyxHQUFHdkIsYUFBYTtJQUMxQixJQUFJLENBQUNnQixtQkFBbUIsQ0FBQyxDQUFDO0VBQzdCO0VBRUFBLG1CQUFtQkEsQ0FBQSxFQUFHO0lBQ25CSiwrREFBZ0IsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDeUIsaUJBQWlCLENBQUNOLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuRW5CLCtEQUFnQixDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQzBCLG9CQUFvQixDQUFDUCxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDekVuQiwrREFBZ0IsQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMyQixvQkFBb0IsQ0FBQ1IsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0VBQzVFO0VBRUFNLGlCQUFpQkEsQ0FBQ0csYUFBYSxFQUFFO0lBQzlCLElBQUksQ0FBQ2pCLEtBQUssQ0FBQ2tCLE9BQU8sQ0FBQ0QsYUFBYSxDQUFDRSxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQzVDLE1BQU1DLFdBQVcsR0FBRyxJQUFJLENBQUNwQixLQUFLLENBQUNxQixnQkFBZ0IsQ0FBQyxDQUFDO0lBQ2pESixhQUFhLENBQUNLLGFBQWEsQ0FBQ0MsUUFBUSxDQUFDO01BQ2xDQyxNQUFNLEVBQUVKLFdBQVc7TUFDbkJLLEtBQUssRUFBRTtRQUFFQyxJQUFJLEVBQUUsU0FBUztRQUFFQyxJQUFJLEVBQUU7TUFBSztJQUN4QyxDQUFDLENBQUM7SUFFRnRDLDZEQUFjLENBQUMsb0JBQW9CLEVBQUU7TUFDbENVLFVBQVUsRUFBRSxJQUFJLENBQUNDLEtBQUssQ0FBQ0MsV0FBVyxDQUFDO0lBQ3RDLENBQUMsQ0FBQztFQUNMO0VBRUFjLG9CQUFvQkEsQ0FBQ2MsVUFBVSxFQUFFO0lBQzlCLElBQUksQ0FBQzdCLEtBQUssQ0FBQzhCLFVBQVUsQ0FDbEJELFVBQVUsQ0FBQ0UsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUM3QkYsVUFBVSxDQUFDVixRQUFRLENBQUMsQ0FDdkIsQ0FBQztJQUVELE1BQU1hLGNBQWMsR0FBRyxJQUFJLENBQUNoQyxLQUFLLENBQUNZLFdBQVcsQ0FDMUNpQixVQUFVLENBQUNFLFlBQVksQ0FBQyxJQUFJLENBQy9CLENBQUM7SUFDREYsVUFBVSxDQUFDUCxhQUFhLENBQUNDLFFBQVEsQ0FBQztNQUFFQyxNQUFNLEVBQUVRO0lBQWUsQ0FBQyxDQUFDO0lBRTdEM0MsNkRBQWMsQ0FBQyxvQkFBb0IsRUFBRTtNQUNsQ1UsVUFBVSxFQUFFLElBQUksQ0FBQ0MsS0FBSyxDQUFDQyxXQUFXLENBQUM7SUFDdEMsQ0FBQyxDQUFDO0VBQ0w7RUFFQWUsb0JBQW9CQSxDQUFDYSxVQUFVLEVBQUU7SUFDOUIsSUFBSSxDQUFDN0IsS0FBSyxDQUFDaUMsVUFBVSxDQUFDSixVQUFVLENBQUNFLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwREYsVUFBVSxDQUFDUCxhQUFhLENBQUNZLE1BQU0sQ0FBQyxDQUFDO0lBQ2pDN0MsNkRBQWMsQ0FBQyxrQkFBa0IsRUFBRXdDLFVBQVUsQ0FBQ0UsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pFbkMsUUFBUSxDQUFDdUMsYUFBYSxDQUFFLHlCQUF3QixDQUFDLENBQUNDLEtBQUssQ0FBQyxDQUFDO0VBQzVEO0FBQ0g7QUFFQSxpRUFBZXZFLGtCQUFrQjs7Ozs7Ozs7Ozs7Ozs7O0FDbkRJO0FBRXJDLE1BQU1ELGlCQUFpQixDQUFDO0VBQ3JCMkIsV0FBV0EsQ0FBQ2IsWUFBWSxFQUFFSyxXQUFXLEVBQUU7SUFDcEMsSUFBSSxDQUFDaUIsS0FBSyxHQUFHdEIsWUFBWTtJQUN6QixJQUFJLENBQUNjLElBQUksR0FBR1QsV0FBVztJQUN2QixJQUFJLENBQUNzRCxTQUFTLEdBQUcsQ0FBQyxDQUFDO0lBQ25CLElBQUksQ0FBQzVDLG1CQUFtQixDQUFDLENBQUM7RUFDN0I7RUFFQUEsbUJBQW1CQSxDQUFBLEVBQUc7SUFDbkJKLCtEQUFnQixDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUNpRCxnQkFBZ0IsQ0FBQzlCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqRW5CLCtEQUFnQixDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQ2tELG1CQUFtQixDQUFDL0IsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZFbkIsK0RBQWdCLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDbUQsbUJBQW1CLENBQUNoQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkVuQiwrREFBZ0IsQ0FDYixrQkFBa0IsRUFDbEIsSUFBSSxDQUFDb0Qsb0JBQW9CLENBQUNqQyxJQUFJLENBQUMsSUFBSSxDQUN0QyxDQUFDO0VBQ0o7RUFFQThCLGdCQUFnQkEsQ0FBQ0ksWUFBWSxFQUFFO0lBQzVCLE1BQU1DLElBQUksR0FBR0QsWUFBWSxDQUFDdkIsUUFBUSxDQUFDLENBQUM7SUFDcEN5QixNQUFNLENBQUNDLE1BQU0sQ0FBQ0YsSUFBSSxFQUFFO01BQ2pCRyxVQUFVLEVBQUVKLFlBQVksQ0FBQ1gsWUFBWSxDQUFDLGFBQWE7SUFDdEQsQ0FBQyxDQUFDO0lBQ0YsSUFBSSxDQUFDL0IsS0FBSyxDQUFDa0IsT0FBTyxDQUFDeUIsSUFBSSxDQUFDO0lBQ3hCLE1BQU1JLFVBQVUsR0FBRyxJQUFJLENBQUMvQyxLQUFLLENBQUNxQixnQkFBZ0IsQ0FBQyxDQUFDO0lBQ2hEcUIsWUFBWSxDQUFDbkIsUUFBUSxDQUFDd0IsVUFBVSxDQUFDO0lBQ2pDMUQsNkRBQWMsQ0FBQyxrQkFBa0IsRUFBRTtNQUNoQ2EsUUFBUSxFQUFFLElBQUksQ0FBQ0YsS0FBSyxDQUFDQyxXQUFXLENBQUM7SUFDcEMsQ0FBQyxDQUFDO0VBQ0w7RUFFQXVDLG1CQUFtQkEsQ0FBQ1EsU0FBUyxFQUFFO0lBQzVCLE1BQU1DLGlCQUFpQixHQUFHRCxTQUFTLENBQUNFLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQ0MsVUFBVTtJQUNsRSxJQUFJSCxTQUFTLENBQUNJLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO01BQzNDLE1BQU1DLGFBQWEsR0FBRztRQUNuQkMsS0FBSyxFQUFFTCxpQkFBaUIsQ0FBQ2xCLFlBQVksQ0FBQyxZQUFZLENBQUM7UUFDbkR3QixFQUFFLEVBQUVOLGlCQUFpQixDQUFDbEIsWUFBWSxDQUFDLElBQUksQ0FBQztRQUN4Q0wsSUFBSSxFQUFFdUIsaUJBQWlCLENBQUNsQixZQUFZLENBQUMsV0FBVyxDQUFDO1FBQ2pEeUIsS0FBSyxFQUFFUCxpQkFBaUIsQ0FBQ2xCLFlBQVksQ0FBQyxJQUFJO01BQzdDLENBQUM7TUFDRDFDLDZEQUFjLENBQUMsZ0JBQWdCLEVBQUVnRSxhQUFhLENBQUM7TUFDL0MsSUFBSSxDQUFDN0QsSUFBSSxDQUFDaUUsc0JBQXNCLENBQUNKLGFBQWEsQ0FBQztJQUNsRDtJQUVBLElBQUksQ0FBQ3JELEtBQUssQ0FBQ2lDLFVBQVUsQ0FBQ2UsU0FBUyxDQUFDakIsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25EMUMsNkRBQWMsQ0FBQyxpQkFBaUIsRUFBRTJELFNBQVMsQ0FBQ2pCLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztFQUNsRTtFQUVBUSxtQkFBbUJBLENBQUNTLFNBQVMsRUFBRTtJQUM1QixJQUFJLENBQUNoRCxLQUFLLENBQUM4QixVQUFVLENBQUNrQixTQUFTLENBQUNqQixZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUVpQixTQUFTLENBQUM3QixRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQ3pFLE1BQU11QyxhQUFhLEdBQUcsSUFBSSxDQUFDMUQsS0FBSyxDQUFDWSxXQUFXLENBQ3pDb0MsU0FBUyxDQUFDakIsWUFBWSxDQUFDLElBQUksQ0FDOUIsQ0FBQztJQUVEaUIsU0FBUyxDQUFDekIsUUFBUSxDQUFDbUMsYUFBYSxDQUFDO0lBQ2pDckUsNkRBQWMsQ0FBQyxrQkFBa0IsRUFBRTtNQUNoQ2EsUUFBUSxFQUFFLElBQUksQ0FBQ0YsS0FBSyxDQUFDQyxXQUFXLENBQUM7SUFDcEMsQ0FBQyxDQUFDO0VBQ0w7RUFFQXdDLG9CQUFvQkEsQ0FBQ0ssVUFBVSxFQUFFO0lBQzlCLElBQUksQ0FBQzlDLEtBQUssQ0FBQ0MsV0FBVyxDQUFDLENBQUMsQ0FBQzBELE9BQU8sQ0FBRUMsT0FBTyxJQUFLO01BQzNDLElBQUlBLE9BQU8sQ0FBQ2QsVUFBVSxLQUFLQSxVQUFVLEVBQUU7UUFDcEMsSUFBSSxDQUFDOUMsS0FBSyxDQUFDaUMsVUFBVSxDQUFDMkIsT0FBTyxDQUFDTCxFQUFFLENBQUM7UUFDakNsRSw2REFBYyxDQUFDLGlCQUFpQixFQUFFdUUsT0FBTyxDQUFDTCxFQUFFLENBQUM7TUFDaEQ7SUFDSCxDQUFDLENBQUM7SUFFRixJQUFJLENBQUNNLDJCQUEyQixDQUFDLENBQUM7RUFDckM7RUFFQTFELGNBQWNBLENBQUMyRCxZQUFZLEVBQUU7SUFDMUIsSUFBSSxDQUFDekIsU0FBUyxHQUFHO01BQUVuQyxRQUFRLEVBQUUsSUFBSSxDQUFDRixLQUFLLENBQUNDLFdBQVcsQ0FBQztJQUFFLENBQUM7SUFDdkQyQyxNQUFNLENBQUNDLE1BQU0sQ0FBQyxJQUFJLENBQUNSLFNBQVMsRUFBRXlCLFlBQVksQ0FBQztJQUMzQyxJQUFJLENBQUN0RSxJQUFJLENBQUMrQixRQUFRLENBQUMsSUFBSSxDQUFDYyxTQUFTLENBQUM7RUFDckM7RUFFQXdCLDJCQUEyQkEsQ0FBQSxFQUFHO0lBQzNCLElBQUksQ0FBQzdELEtBQUssQ0FBQ0MsV0FBVyxDQUFDLENBQUMsQ0FBQzBELE9BQU8sQ0FBRUMsT0FBTyxJQUFLO01BQzNDLE1BQU1HLGVBQWUsR0FBRyxJQUFJLENBQUMxQixTQUFTLENBQUN0QyxVQUFVLENBQUNpRSxJQUFJLENBQ2xEQyxRQUFRLElBQUtMLE9BQU8sQ0FBQ2QsVUFBVSxLQUFLbUIsUUFBUSxDQUFDVixFQUNqRCxDQUFDO01BQ0QsSUFBSSxDQUFDUSxlQUFlLEVBQUU7UUFDbkIsSUFBSSxDQUFDL0QsS0FBSyxDQUFDaUMsVUFBVSxDQUFDMkIsT0FBTyxDQUFDTCxFQUFFLENBQUM7UUFDakNsRSw2REFBYyxDQUFDLGtCQUFrQixFQUFFO1VBQ2hDYSxRQUFRLEVBQUUsSUFBSSxDQUFDRixLQUFLLENBQUNDLFdBQVcsQ0FBQztRQUNwQyxDQUFDLENBQUM7TUFDTDtJQUNILENBQUMsQ0FBQztFQUNMO0FBQ0g7QUFFQSxpRUFBZXJDLGlCQUFpQjs7Ozs7Ozs7Ozs7Ozs7O0FDOUZLO0FBRXJDLE1BQU1ELGNBQWMsQ0FBQztFQUNsQjRCLFdBQVdBLENBQUNaLFNBQVMsRUFBRXVGLFFBQVEsRUFBRXRGLE1BQU0sRUFBRUMsTUFBTSxFQUFFO0lBQzlDLElBQUksQ0FBQ0EsTUFBTSxHQUFHQSxNQUFNO0lBQ3BCLElBQUksQ0FBQ0QsTUFBTSxHQUFHQSxNQUFNO0lBQ3BCLElBQUksQ0FBQ29CLEtBQUssR0FBR3JCLFNBQVM7SUFDdEIsSUFBSSxDQUFDYSxJQUFJLEdBQUcwRSxRQUFRO0lBQ3BCLElBQUksQ0FBQ0MsV0FBVyxHQUFHLEVBQUU7SUFDckIsSUFBSSxDQUFDQyxhQUFhLEdBQUc7TUFDbEIxQyxJQUFJLEVBQUUsS0FBSztNQUNYNEIsS0FBSyxFQUFFLEtBQUs7TUFDWkUsS0FBSyxFQUFFO0lBQ1YsQ0FBQztJQUVELElBQUksQ0FBQy9ELG1CQUFtQixDQUFDLENBQUM7RUFDN0I7RUFFQUEsbUJBQW1CQSxDQUFBLEVBQUc7SUFDbkJKLCtEQUFnQixDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUNnRixhQUFhLENBQUM3RCxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0RuQiwrREFBZ0IsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDaUYsZ0JBQWdCLENBQUM5RCxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakVuQiwrREFBZ0IsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDa0YsZ0JBQWdCLENBQUMvRCxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakVuQiwrREFBZ0IsQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUNtRixvQkFBb0IsQ0FBQ2hFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN6RW5CLCtEQUFnQixDQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQ2MsY0FBYyxDQUFDSyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEVuQiwrREFBZ0IsQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUNjLGNBQWMsQ0FBQ0ssSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RFbkIsK0RBQWdCLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDb0Ysa0JBQWtCLENBQUNqRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEVuQiwrREFBZ0IsQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUNxRixvQkFBb0IsQ0FBQ2xFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztFQUM1RTtFQUVBNkQsYUFBYUEsQ0FBQzFCLElBQUksRUFBRTtJQUNqQixJQUFJLENBQUMzQyxLQUFLLENBQUNrQixPQUFPLENBQUN5QixJQUFJLENBQUM7SUFDeEIsSUFBSSxDQUFDbkQsSUFBSSxDQUFDK0IsUUFBUSxDQUFDO01BQ2hCb0QsS0FBSyxFQUFFLElBQUksQ0FBQ0MscUJBQXFCLENBQUM7SUFDckMsQ0FBQyxDQUFDO0VBQ0w7RUFFQUwsZ0JBQWdCQSxDQUFDN0QsTUFBTSxFQUFFO0lBQ3RCLElBQUksQ0FBQ1YsS0FBSyxDQUFDaUMsVUFBVSxDQUFDdkIsTUFBTSxDQUFDO0lBQzdCLElBQUksQ0FBQ2xCLElBQUksQ0FBQ3FGLFVBQVUsQ0FBQ25FLE1BQU0sQ0FBQztFQUMvQjtFQUVBNEQsZ0JBQWdCQSxDQUFDUSxXQUFXLEVBQUU7SUFDM0IsSUFBSSxDQUFDOUUsS0FBSyxDQUFDOEIsVUFBVSxDQUFDZ0QsV0FBVyxDQUFDdkIsRUFBRSxFQUFFdUIsV0FBVyxDQUFDO0lBQ2xELE1BQU1DLFVBQVUsR0FBRyxJQUFJLENBQUMvRSxLQUFLLENBQUNZLFdBQVcsQ0FBQ2tFLFdBQVcsQ0FBQ3ZCLEVBQUUsQ0FBQztJQUV6RCxJQUFJLENBQUMvRCxJQUFJLENBQUN3RixVQUFVLENBQUNELFVBQVUsQ0FBQztFQUNuQztFQUVBNUUsY0FBY0EsQ0FBQzJELFlBQVksRUFBRTtJQUMxQixJQUFJLENBQUN6QixTQUFTLEdBQUc7TUFDZCtCLGFBQWEsRUFBRSxJQUFJLENBQUNBLGFBQWE7TUFDakNPLEtBQUssRUFBRSxJQUFJLENBQUNDLHFCQUFxQixDQUFDO0lBQ3JDLENBQUM7SUFFRGhDLE1BQU0sQ0FBQ0MsTUFBTSxDQUFDLElBQUksQ0FBQ1IsU0FBUyxFQUFFeUIsWUFBWSxDQUFDO0lBRTNDLElBQUksQ0FBQ3RFLElBQUksQ0FBQytCLFFBQVEsQ0FBQyxJQUFJLENBQUNjLFNBQVMsQ0FBQztFQUNyQztFQUVBbUMsb0JBQW9CQSxDQUFDUyxTQUFTLEVBQUU7SUFDN0IsSUFBSSxDQUFDakYsS0FBSyxDQUFDa0YscUJBQXFCLENBQUMsV0FBVyxFQUFFRCxTQUFTLENBQUM7SUFDeEQsTUFBTS9FLFFBQVEsR0FBRyxJQUFJLENBQUNtQyxTQUFTLENBQUNuQyxRQUFRLENBQUN0QixNQUFNLENBQzNDZ0YsT0FBTyxJQUFLQSxPQUFPLENBQUNMLEVBQUUsS0FBSzBCLFNBQy9CLENBQUM7SUFDRCxNQUFNTixLQUFLLEdBQUcsSUFBSSxDQUFDQyxxQkFBcUIsQ0FBQyxDQUFDO0lBQzFDaEMsTUFBTSxDQUFDQyxNQUFNLENBQUMsSUFBSSxDQUFDUixTQUFTLEVBQUU7TUFBRW5DLFFBQVE7TUFBRXlFO0lBQU0sQ0FBQyxDQUFDO0lBQ2xELElBQUksQ0FBQ25GLElBQUksQ0FBQytCLFFBQVEsQ0FBQyxJQUFJLENBQUNjLFNBQVMsQ0FBQztFQUNyQztFQUVBdUMscUJBQXFCQSxDQUFBLEVBQUc7SUFDckIsT0FBTyxJQUFJLENBQUNoRyxNQUFNLENBQUN1RyxRQUFRLENBQ3hCLElBQUksQ0FBQ2YsYUFBYSxDQUFDMUMsSUFBSSxFQUN2QixJQUFJLENBQUMxQixLQUFLLENBQUNDLFdBQVcsQ0FBQyxDQUFDLEVBQ3hCLElBQUksQ0FBQ21FLGFBQWEsQ0FBQ1osS0FDdEIsQ0FBQztFQUNKO0VBRUFpQixrQkFBa0JBLENBQUNXLFVBQVUsRUFBRTtJQUM1QixJQUFJLENBQUNqQixXQUFXLEdBQUcsRUFBRTtJQUNyQixJQUFJLENBQUNDLGFBQWEsR0FBR2dCLFVBQVU7SUFDL0IsTUFBTVQsS0FBSyxHQUFHLElBQUksQ0FBQ0MscUJBQXFCLENBQUMsQ0FBQztJQUMxQ2hDLE1BQU0sQ0FBQ0MsTUFBTSxDQUFDLElBQUksQ0FBQ1IsU0FBUyxFQUFFO01BQzNCOEIsV0FBVyxFQUFFLElBQUksQ0FBQ0EsV0FBVztNQUM3QkMsYUFBYSxFQUFFLElBQUksQ0FBQ0EsYUFBYTtNQUNqQ087SUFDSCxDQUFDLENBQUM7SUFDRixJQUFJLENBQUNuRixJQUFJLENBQUMrQixRQUFRLENBQUMsSUFBSSxDQUFDYyxTQUFTLENBQUM7RUFDckM7RUFFQXFDLG9CQUFvQkEsQ0FBQ1csV0FBVyxFQUFFO0lBQy9CLElBQUksQ0FBQ2xCLFdBQVcsR0FBR2tCLFdBQVc7SUFDOUIsTUFBTVYsS0FBSyxHQUFHLElBQUksQ0FBQ0MscUJBQXFCLENBQUMsQ0FBQztJQUMxQyxNQUFNVSxXQUFXLEdBQUcsSUFBSSxDQUFDekcsTUFBTSxDQUFDMEcsTUFBTSxDQUFDRixXQUFXLEVBQUVWLEtBQUssQ0FBQztJQUMxRC9CLE1BQU0sQ0FBQ0MsTUFBTSxDQUFDLElBQUksQ0FBQ1IsU0FBUyxFQUFFO01BQzNCOEIsV0FBVyxFQUFFLElBQUksQ0FBQ0EsV0FBVztNQUM3QlEsS0FBSyxFQUFFVztJQUNWLENBQUMsQ0FBQztJQUNGLElBQUksQ0FBQzlGLElBQUksQ0FBQytCLFFBQVEsQ0FBQyxJQUFJLENBQUNjLFNBQVMsQ0FBQztFQUNyQztBQUNIO0FBRUEsaUVBQWUxRSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7O0FDckdzQjtBQUNMO0FBRTlDLE1BQU0rSCxTQUFTLENBQUM7RUFDYm5HLFdBQVdBLENBQUNvRyxjQUFjLEVBQUU7SUFDekIsSUFBSSxDQUFDQSxjQUFjLEdBQUdBLGNBQWM7SUFDcEMsSUFBSSxDQUFDQSxjQUFjLENBQUMsR0FBRyxFQUFFO0lBQ3pCLElBQUksQ0FBQ0MsZUFBZSxDQUFDLENBQUM7SUFDdEIsSUFBSSxDQUFDQyx3QkFBd0IsQ0FBQyxDQUFDO0VBQ2xDO0VBRUFBLHdCQUF3QkEsQ0FBQSxFQUFHO0lBQ3hCLE1BQU1DLFNBQVMsR0FBR0MsS0FBSyxDQUFDQyxJQUFJLENBQ3pCQyxJQUFJLENBQUNDLEtBQUssQ0FBQ0MsWUFBWSxDQUFDQyxPQUFPLENBQUMsSUFBSSxDQUFDVCxjQUFjLENBQUMsQ0FDdkQsQ0FBQztJQUVERyxTQUFTLENBQUNuQyxPQUFPLENBQUUwQyxJQUFJLElBQUs7TUFDekIsTUFBTUMsTUFBTSxHQUFHLElBQUlkLDREQUFhLENBQUNhLElBQUksQ0FBQztNQUN0QyxJQUFJLENBQUMsSUFBSSxDQUFDVixjQUFjLENBQUMsQ0FBQ1ksSUFBSSxDQUFDRCxNQUFNLENBQUM7SUFDekMsQ0FBQyxDQUFDO0VBQ0w7RUFFQUUsa0JBQWtCQSxDQUFBLEVBQUc7SUFDbEJMLFlBQVksQ0FBQ00sT0FBTyxDQUNqQixJQUFJLENBQUNkLGNBQWMsRUFDbkJNLElBQUksQ0FBQ1MsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUNmLGNBQWMsQ0FBQyxDQUMzQyxDQUFDO0VBQ0o7RUFFQXpFLE9BQU9BLENBQUN5QixJQUFJLEVBQUU7SUFDWCxNQUFNZ0UsT0FBTyxHQUFHLElBQUluQiw0REFBYSxDQUFDN0MsSUFBSSxDQUFDO0lBQ3ZDLElBQUksQ0FBQyxJQUFJLENBQUNnRCxjQUFjLENBQUMsQ0FBQ1ksSUFBSSxDQUFDSSxPQUFPLENBQUM7SUFDdkMsSUFBSSxDQUFDSCxrQkFBa0IsQ0FBQyxDQUFDO0VBQzVCO0VBRUF2RyxXQUFXQSxDQUFBLEVBQUc7SUFDWCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMwRixjQUFjLENBQUM7RUFDbkM7RUFFQXRFLGdCQUFnQkEsQ0FBQSxFQUFHO0lBQ2hCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQ3NFLGNBQWMsQ0FBQyxDQUFDaUIsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2hEO0VBRUFoRyxXQUFXQSxDQUFDMkMsRUFBRSxFQUFFO0lBQ2IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDb0MsY0FBYyxDQUFDLENBQUMzQixJQUFJLENBQUVxQyxJQUFJLElBQUtBLElBQUksQ0FBQzlDLEVBQUUsS0FBS0EsRUFBRSxDQUFDO0VBQ2xFO0VBRUF6QixVQUFVQSxDQUFDeUIsRUFBRSxFQUFFWixJQUFJLEVBQUU7SUFDbEIsTUFBTWtFLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDbEIsY0FBYyxDQUFDLENBQUMzQixJQUFJLENBQzdDcUMsSUFBSSxJQUFLQSxJQUFJLENBQUM5QyxFQUFFLEtBQUtBLEVBQ3pCLENBQUM7SUFDRHNELFVBQVUsQ0FBQ0MsZ0JBQWdCLENBQUNuRSxJQUFJLENBQUM7SUFDakMsSUFBSSxDQUFDNkQsa0JBQWtCLENBQUMsQ0FBQztFQUM1QjtFQUVBdkUsVUFBVUEsQ0FBQ3NCLEVBQUUsRUFBRTtJQUNaLE1BQU13RCxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQ3BCLGNBQWMsQ0FBQyxDQUFDcUIsU0FBUyxDQUM3Q1gsSUFBSSxJQUFLQSxJQUFJLENBQUM5QyxFQUFFLEtBQUtBLEVBQ3pCLENBQUM7SUFDRCxJQUFJd0QsS0FBSyxLQUFLLENBQUMsQ0FBQyxFQUFFO01BQ2YsSUFBSSxDQUFDLElBQUksQ0FBQ3BCLGNBQWMsQ0FBQyxDQUFDc0IsTUFBTSxDQUFDRixLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBQzdDO0lBQ0EsSUFBSSxDQUFDUCxrQkFBa0IsQ0FBQyxDQUFDO0VBQzVCO0VBRUF0QixxQkFBcUJBLENBQUNnQyxRQUFRLEVBQUUxRCxLQUFLLEVBQUU7SUFDcEMsSUFBSSxDQUFDLElBQUksQ0FBQ21DLGNBQWMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUNBLGNBQWMsQ0FBQyxDQUFDL0csTUFBTSxDQUN4RHlILElBQUksSUFBS0EsSUFBSSxDQUFDYSxRQUFRLENBQUMsS0FBSzFELEtBQ2hDLENBQUM7SUFDRCxJQUFJLENBQUNnRCxrQkFBa0IsQ0FBQyxDQUFDO0VBQzVCO0VBRUFaLGVBQWVBLENBQUEsRUFBRztJQUNmLElBQ0dLLElBQUksQ0FBQ0MsS0FBSyxDQUNQQyxZQUFZLENBQUNDLE9BQU8sQ0FBRSxHQUFFLElBQUksQ0FBQ1QsY0FBZSxnQkFBZSxDQUM5RCxDQUFDLEtBQUssSUFBSSxFQUNYO01BQ0NRLFlBQVksQ0FBQ00sT0FBTyxDQUNqQixJQUFJLENBQUNkLGNBQWMsRUFDbkJNLElBQUksQ0FBQ1MsU0FBUyxDQUFDakIsMkRBQVMsQ0FBQyxJQUFJLENBQUNFLGNBQWMsQ0FBQyxDQUNoRCxDQUFDO01BQ0RRLFlBQVksQ0FBQ00sT0FBTyxDQUNoQixHQUFFLElBQUksQ0FBQ2QsY0FBZSxnQkFBZSxFQUN0Q00sSUFBSSxDQUFDUyxTQUFTLENBQUMsSUFBSSxDQUN0QixDQUFDO0lBQ0o7RUFDSDtBQUNIO0FBRUEsaUVBQWVoQixTQUFTOzs7Ozs7Ozs7Ozs7Ozs7QUMxRlk7QUFFcEMsTUFBTTFILGFBQWEsU0FBUzBILGtEQUFTLENBQUM7RUFDbkNuRyxXQUFXQSxDQUFBLEVBQUc7SUFDWCxLQUFLLENBQUMsWUFBWSxDQUFDO0VBQ3RCO0FBQ0g7QUFFQSxpRUFBZXZCLGFBQWE7Ozs7Ozs7Ozs7Ozs7Ozs7QUNSUTtBQUNRO0FBRTVDLE1BQU1ELFlBQVksU0FBUzJILGtEQUFTLENBQUM7RUFDbENuRyxXQUFXQSxDQUFBLEVBQUc7SUFDWCxLQUFLLENBQUMsVUFBVSxDQUFDO0VBQ3BCO0FBQ0g7QUFFQSxpRUFBZXhCLFlBQVk7Ozs7Ozs7Ozs7Ozs7OztBQ1RTO0FBRXBDLE1BQU1ELFNBQVMsU0FBUzRILGtEQUFTLENBQUM7RUFDL0JuRyxXQUFXQSxDQUFBLEVBQUc7SUFDWCxLQUFLLENBQUMsT0FBTyxDQUFDO0VBQ2pCO0FBQ0g7QUFFQSxpRUFBZXpCLFNBQVM7Ozs7Ozs7Ozs7Ozs7Ozs7QUNSK0I7QUFFdkQsTUFBTXVKLG1CQUFtQixHQUFHLENBQ3pCO0VBQ0czRixJQUFJLEVBQUUsS0FBSztFQUNYOUMsTUFBTSxFQUFFLFNBQVNBLE1BQU1BLENBQUMrRixLQUFLLEVBQUU7SUFDNUIsT0FBT0EsS0FBSztFQUNmO0FBQ0gsQ0FBQyxFQUVEO0VBQ0dqRCxJQUFJLEVBQUUsTUFBTTtFQUNaOUMsTUFBTSxFQUFFLFNBQVNBLE1BQU1BLENBQUMrRixLQUFLLEVBQUUyQyxJQUFJLEVBQUU7SUFDbEMsT0FBTzNDLEtBQUssQ0FBQy9GLE1BQU0sQ0FBRStCLElBQUksSUFBS3dHLG9EQUFTLENBQUMsSUFBSUksSUFBSSxDQUFDNUcsSUFBSSxDQUFDMkcsSUFBSSxDQUFDLEVBQUVBLElBQUksQ0FBQyxDQUFDO0VBQ3RFO0FBQ0gsQ0FBQyxFQUVEO0VBQ0c1RixJQUFJLEVBQUUsWUFBWTtFQUNsQjlDLE1BQU0sRUFBRSxTQUFTQSxNQUFNQSxDQUFDK0YsS0FBSyxFQUFFNkMsU0FBUyxFQUFFO0lBQ3ZDLE9BQU83QyxLQUFLLENBQUMvRixNQUFNLENBQUUrQixJQUFJLElBQ3RCeUcsb0RBQWdCLENBQUMsSUFBSUcsSUFBSSxDQUFDNUcsSUFBSSxDQUFDMkcsSUFBSSxDQUFDLEVBQUVFLFNBQVMsQ0FDbEQsQ0FBQztFQUNKO0FBQ0gsQ0FBQyxFQUVEO0VBQ0c5RixJQUFJLEVBQUUsU0FBUztFQUNmOUMsTUFBTSxFQUFFLFNBQVNBLE1BQU1BLENBQUMrRixLQUFLLEVBQUVNLFNBQVMsRUFBRTtJQUN2QyxPQUFPTixLQUFLLENBQUMvRixNQUFNLENBQUUrQixJQUFJLElBQUtBLElBQUksQ0FBQ3NFLFNBQVMsS0FBS0EsU0FBUyxDQUFDO0VBQzlEO0FBQ0gsQ0FBQyxFQUVEO0VBQ0d2RCxJQUFJLEVBQUUsVUFBVTtFQUNoQjlDLE1BQU0sRUFBRSxTQUFTQSxNQUFNQSxDQUFDK0YsS0FBSyxFQUFFN0IsVUFBVSxFQUFFO0lBQ3hDLE9BQU82QixLQUFLLENBQUMvRixNQUFNLENBQUUrQixJQUFJLElBQUtBLElBQUksQ0FBQ21DLFVBQVUsS0FBS0EsVUFBVSxDQUFDO0VBQ2hFO0FBQ0gsQ0FBQyxDQUNIO0FBRUQsTUFBTXhFLE1BQU0sQ0FBQztFQUNWaUIsV0FBV0EsQ0FBQSxFQUFHO0lBQ1gsSUFBSSxDQUFDa0ksVUFBVSxHQUFHLElBQUlDLEdBQUcsQ0FBQyxDQUFDO0lBQzNCLElBQUksQ0FBQ0MsYUFBYSxDQUFDTixtQkFBbUIsQ0FBQztFQUMxQztFQUVBTSxhQUFhQSxDQUFDRixVQUFVLEVBQUU7SUFDdkJBLFVBQVUsQ0FBQzlELE9BQU8sQ0FBRWlFLFFBQVEsSUFBSztNQUM5QixJQUFJLENBQUNILFVBQVUsQ0FBQ0ksR0FBRyxDQUFDRCxRQUFRLENBQUNsRyxJQUFJLEVBQUVrRyxRQUFRLENBQUNoSixNQUFNLENBQUM7SUFDdEQsQ0FBQyxDQUFDO0VBQ0w7RUFFQXVHLFFBQVFBLENBQUN6RCxJQUFJLEVBQUVpRCxLQUFLLEVBQUVtRCxXQUFXLEVBQUU7SUFDaEMsTUFBTWxKLE1BQU0sR0FBRyxJQUFJLENBQUM2SSxVQUFVLENBQUNNLEdBQUcsQ0FBQ3JHLElBQUksQ0FBQztJQUN4QyxJQUFJOUMsTUFBTSxFQUFFO01BQ1QsT0FBT0EsTUFBTSxDQUFDK0YsS0FBSyxFQUFFbUQsV0FBVyxDQUFDO0lBQ3BDO0lBRUEsT0FBT25ELEtBQUs7RUFDZjtBQUNIO0FBRUEsaUVBQWVyRyxNQUFNOzs7Ozs7Ozs7Ozs7OztBQy9EckIsTUFBTTBKLGlCQUFpQixHQUFHLENBQ3ZCO0VBQ0d0RyxJQUFJLEVBQUUsVUFBVTtFQUNoQnVHLElBQUksRUFBR3RELEtBQUssSUFDVCxDQUFDLEdBQUdBLEtBQUssQ0FBQyxDQUFDc0QsSUFBSSxDQUFDLENBQUNDLENBQUMsRUFBRUMsQ0FBQyxLQUFLQyxNQUFNLENBQUNGLENBQUMsQ0FBQ0csUUFBUSxDQUFDLEdBQUdELE1BQU0sQ0FBQ0QsQ0FBQyxDQUFDRSxRQUFRLENBQUM7QUFDdkUsQ0FBQyxFQUVEO0VBQ0czRyxJQUFJLEVBQUUsVUFBVTtFQUNoQnVHLElBQUksRUFBR3RELEtBQUssSUFDVCxDQUFDLEdBQUdBLEtBQUssQ0FBQyxDQUFDc0QsSUFBSSxDQUFDLENBQUNDLENBQUMsRUFBRUMsQ0FBQyxLQUFLLElBQUlaLElBQUksQ0FBQ1csQ0FBQyxDQUFDWixJQUFJLENBQUMsR0FBRyxJQUFJQyxJQUFJLENBQUNZLENBQUMsQ0FBQ2IsSUFBSSxDQUFDO0FBQ25FLENBQUMsQ0FDSDtBQUVELE1BQU0vSSxNQUFNLENBQUM7RUFDVmdCLFdBQVdBLENBQUEsRUFBRztJQUNYLElBQUksQ0FBQ2tJLFVBQVUsR0FBRyxJQUFJQyxHQUFHLENBQUMsQ0FBQztJQUMzQixJQUFJLENBQUNDLGFBQWEsQ0FBQ0ssaUJBQWlCLENBQUM7RUFDeEM7RUFFQUwsYUFBYUEsQ0FBQ0YsVUFBVSxFQUFFO0lBQ3ZCQSxVQUFVLENBQUM5RCxPQUFPLENBQUVpRSxRQUFRLElBQUs7TUFDOUIsSUFBSSxDQUFDSCxVQUFVLENBQUNJLEdBQUcsQ0FBQ0QsUUFBUSxDQUFDbEcsSUFBSSxFQUFFa0csUUFBUSxDQUFDSyxJQUFJLENBQUM7SUFDcEQsQ0FBQyxDQUFDO0VBQ0w7RUFFQTFDLE1BQU1BLENBQUM3RCxJQUFJLEVBQUVpRCxLQUFLLEVBQUU7SUFDakIsTUFBTXNELElBQUksR0FBRyxJQUFJLENBQUNSLFVBQVUsQ0FBQ00sR0FBRyxDQUFDckcsSUFBSSxDQUFDO0lBRXRDLElBQUl1RyxJQUFJLEVBQUU7TUFDUCxPQUFPQSxJQUFJLENBQUN0RCxLQUFLLENBQUM7SUFDckI7SUFFQSxPQUFPQSxLQUFLO0VBQ2Y7QUFDSDtBQUVBLGlFQUFlcEcsTUFBTTs7Ozs7Ozs7Ozs7Ozs7QUNyQ3JCLE1BQU1rSCxTQUFTLEdBQUc7RUFDZjFGLFVBQVUsRUFBRSxDQUNUO0lBQ0d3RCxFQUFFLEVBQUUsK0NBQStDO0lBQ25EK0UsUUFBUSxFQUFFLFVBQVU7SUFDcEJoRixLQUFLLEVBQUU7RUFDVixDQUFDLEVBQ0Q7SUFDR0MsRUFBRSxFQUFFLCtDQUErQztJQUNuRCtFLFFBQVEsRUFBRSxVQUFVO0lBQ3BCaEYsS0FBSyxFQUFFO0VBQ1YsQ0FBQyxFQUNEO0lBQ0dDLEVBQUUsRUFBRSwrQ0FBK0M7SUFDbkQrRSxRQUFRLEVBQUUsVUFBVTtJQUNwQmhGLEtBQUssRUFBRTtFQUNWLENBQUMsQ0FDSDtFQUVEcEQsUUFBUSxFQUFFLENBQ1A7SUFDR3FELEVBQUUsRUFBRSw4Q0FBOEM7SUFDbEQrRSxRQUFRLEVBQUUsU0FBUztJQUNuQmhGLEtBQUssRUFBRSxpQkFBaUI7SUFDeEJSLFVBQVUsRUFBRTtFQUNmLENBQUMsRUFDRDtJQUNHUyxFQUFFLEVBQUUsOENBQThDO0lBQ2xEK0UsUUFBUSxFQUFFLFNBQVM7SUFDbkJoRixLQUFLLEVBQUUscUJBQXFCO0lBQzVCUixVQUFVLEVBQUU7RUFDZixDQUFDLEVBQ0Q7SUFDR1MsRUFBRSxFQUFFLDhDQUE4QztJQUNsRCtFLFFBQVEsRUFBRSxTQUFTO0lBQ25CaEYsS0FBSyxFQUFFLGVBQWU7SUFDdEJSLFVBQVUsRUFBRTtFQUNmLENBQUMsQ0FDSDtFQUNENkIsS0FBSyxFQUFFLENBQ0o7SUFDR3BCLEVBQUUsRUFBRSwyQ0FBMkM7SUFDL0MrRSxRQUFRLEVBQUUsTUFBTTtJQUNoQkMsU0FBUyxFQUFFLEtBQUs7SUFDaEJqRixLQUFLLEVBQUUsdUJBQXVCO0lBQzlCa0YsV0FBVyxFQUFFLEVBQUU7SUFDZmxCLElBQUksRUFBRSxZQUFZO0lBQ2xCckMsU0FBUyxFQUFFLDhDQUE4QztJQUN6RG9ELFFBQVEsRUFBRSxHQUFHO0lBQ2J2RixVQUFVLEVBQUUsK0NBQStDO0lBQzNEMkYsV0FBVyxFQUFFLGlCQUFpQjtJQUM5QjFFLGVBQWUsRUFBRSxVQUFVO0lBQzNCMkUsU0FBUyxFQUFFLENBQ1I7TUFDR0osUUFBUSxFQUFFLGdCQUFnQjtNQUMxQmhGLEtBQUssRUFBRSxpQkFBaUI7TUFDeEJxRixPQUFPLEVBQUU7SUFDWixDQUFDLEVBQ0Q7TUFDR0wsUUFBUSxFQUFFLGdCQUFnQjtNQUMxQmhGLEtBQUssRUFBRSwwQkFBMEI7TUFDakNxRixPQUFPLEVBQUU7SUFDWixDQUFDLEVBQ0Q7TUFDR0wsUUFBUSxFQUFFLGdCQUFnQjtNQUMxQmhGLEtBQUssRUFBRSxjQUFjO01BQ3JCcUYsT0FBTyxFQUFFO0lBQ1osQ0FBQztFQUVQLENBQUMsRUFDRDtJQUNHcEYsRUFBRSxFQUFFLDJDQUEyQztJQUMvQytFLFFBQVEsRUFBRSxNQUFNO0lBQ2hCQyxTQUFTLEVBQUUsS0FBSztJQUNoQmpGLEtBQUssRUFBRSx5QkFBeUI7SUFDaENrRixXQUFXLEVBQUUsRUFBRTtJQUNmbEIsSUFBSSxFQUFFLFlBQVk7SUFDbEJyQyxTQUFTLEVBQUUsOENBQThDO0lBQ3pEb0QsUUFBUSxFQUFFLEdBQUc7SUFDYnZGLFVBQVUsRUFBRSwrQ0FBK0M7SUFDM0QyRixXQUFXLEVBQUUsaUJBQWlCO0lBQzlCMUUsZUFBZSxFQUFFLFVBQVU7SUFDM0IyRSxTQUFTLEVBQUU7RUFDZCxDQUFDLEVBQ0Q7SUFDR25GLEVBQUUsRUFBRSwyQ0FBMkM7SUFDL0MrRSxRQUFRLEVBQUUsTUFBTTtJQUNoQkMsU0FBUyxFQUFFLEtBQUs7SUFDaEJqRixLQUFLLEVBQUUsZ0JBQWdCO0lBQ3ZCa0YsV0FBVyxFQUFFLEVBQUU7SUFDZmxCLElBQUksRUFBRSxZQUFZO0lBQ2xCckMsU0FBUyxFQUFFLDhDQUE4QztJQUN6RG9ELFFBQVEsRUFBRSxHQUFHO0lBQ2J2RixVQUFVLEVBQUUsK0NBQStDO0lBQzNEMkYsV0FBVyxFQUFFLGlCQUFpQjtJQUM5QjFFLGVBQWUsRUFBRSxVQUFVO0lBQzNCMkUsU0FBUyxFQUFFO0VBQ2QsQ0FBQyxFQUNEO0lBQ0duRixFQUFFLEVBQUUsMkNBQTJDO0lBQy9DK0UsUUFBUSxFQUFFLE1BQU07SUFDaEJDLFNBQVMsRUFBRSxLQUFLO0lBQ2hCakYsS0FBSyxFQUFFLGtCQUFrQjtJQUN6QmtGLFdBQVcsRUFBRSxFQUFFO0lBQ2ZsQixJQUFJLEVBQUUsWUFBWTtJQUNsQnJDLFNBQVMsRUFBRSw4Q0FBOEM7SUFDekRvRCxRQUFRLEVBQUUsR0FBRztJQUNidkYsVUFBVSxFQUFFLCtDQUErQztJQUMzRDJGLFdBQVcsRUFBRSxxQkFBcUI7SUFDbEMxRSxlQUFlLEVBQUUsTUFBTTtJQUN2QjJFLFNBQVMsRUFBRSxDQUNSO01BQ0dKLFFBQVEsRUFBRSxnQkFBZ0I7TUFDMUJoRixLQUFLLEVBQUUsNEJBQTRCO01BQ25DcUYsT0FBTyxFQUFFO0lBQ1osQ0FBQyxFQUNEO01BQ0dMLFFBQVEsRUFBRSxnQkFBZ0I7TUFDMUJoRixLQUFLLEVBQUUsNEJBQTRCO01BQ25DcUYsT0FBTyxFQUFFO0lBQ1osQ0FBQztFQUVQLENBQUMsRUFDRDtJQUNHcEYsRUFBRSxFQUFFLDJDQUEyQztJQUMvQytFLFFBQVEsRUFBRSxNQUFNO0lBQ2hCQyxTQUFTLEVBQUUsSUFBSTtJQUNmakYsS0FBSyxFQUFFLHdCQUF3QjtJQUMvQmtGLFdBQVcsRUFBRSxFQUFFO0lBQ2ZsQixJQUFJLEVBQUUsWUFBWTtJQUNsQnJDLFNBQVMsRUFBRSw4Q0FBOEM7SUFDekRvRCxRQUFRLEVBQUUsR0FBRztJQUNidkYsVUFBVSxFQUFFLCtDQUErQztJQUMzRDJGLFdBQVcsRUFBRSxlQUFlO0lBQzVCMUUsZUFBZSxFQUFFLFdBQVc7SUFDNUIyRSxTQUFTLEVBQUUsQ0FDUjtNQUNHSixRQUFRLEVBQUUsZ0JBQWdCO01BQzFCaEYsS0FBSyxFQUFFLDRCQUE0QjtNQUNuQ3FGLE9BQU8sRUFBRTtJQUNaLENBQUMsRUFDRDtNQUNHTCxRQUFRLEVBQUUsZ0JBQWdCO01BQzFCaEYsS0FBSyxFQUFFLDRCQUE0QjtNQUNuQ3FGLE9BQU8sRUFBRTtJQUNaLENBQUMsRUFDRDtNQUNHTCxRQUFRLEVBQUUsZ0JBQWdCO01BQzFCaEYsS0FBSyxFQUFFLDJCQUEyQjtNQUNsQ3FGLE9BQU8sRUFBRTtJQUNaLENBQUM7RUFFUCxDQUFDO0FBRVAsQ0FBQztBQUVELGlFQUFlbEQsU0FBUzs7Ozs7Ozs7Ozs7Ozs7QUM1SnhCLFNBQVNySCxhQUFhQSxDQUFDd0ssR0FBRyxFQUFFO0VBQ3pCLE1BQU1DLE9BQU8sR0FBR2pKLFFBQVEsQ0FBQ3hCLGFBQWEsQ0FBQ3dLLEdBQUcsQ0FBQztFQUMzQ2hHLE1BQU0sQ0FBQ0MsTUFBTSxDQUFDZ0csT0FBTyxFQUFFQyxZQUFZLENBQUM7RUFDcEMsT0FBT0QsT0FBTztBQUNqQjtBQUVBLE1BQU1DLFlBQVksR0FBRztFQUNsQkMsYUFBYUEsQ0FBQ0MsVUFBVSxFQUFFO0lBQ3ZCcEcsTUFBTSxDQUFDcUcsT0FBTyxDQUFDRCxVQUFVLENBQUMsQ0FBQ3JGLE9BQU8sQ0FBQ3VGLElBQUEsSUFBa0I7TUFBQSxJQUFqQixDQUFDQyxHQUFHLEVBQUUzRixLQUFLLENBQUMsR0FBQTBGLElBQUE7TUFDN0MsSUFBSW5ELEtBQUssQ0FBQ3FELE9BQU8sQ0FBQzVGLEtBQUssQ0FBQyxFQUFFO1FBQ3ZCLElBQUksQ0FBQzZGLFlBQVksQ0FBQ0YsR0FBRyxFQUFFM0YsS0FBSyxDQUFDOEYsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO01BQzFDLENBQUMsTUFBTTtRQUNKLElBQUksQ0FBQ0QsWUFBWSxDQUFDRixHQUFHLEVBQUUzRixLQUFLLENBQUM7TUFDaEM7SUFDSCxDQUFDLENBQUM7SUFDRixPQUFPLElBQUk7RUFDZCxDQUFDO0VBRURqQyxRQUFRQSxDQUFDZ0ksS0FBSyxFQUFFO0lBQ2IsSUFBSSxJQUFJLENBQUNDLFdBQVcsRUFBRTtNQUNuQjVHLE1BQU0sQ0FBQ0MsTUFBTSxDQUFDLElBQUksQ0FBQzBHLEtBQUssRUFBRUEsS0FBSyxDQUFDO01BQ2hDLElBQUksQ0FBQ0UsS0FBSyxDQUFDLENBQUM7TUFDWixJQUFJLENBQUNDLE1BQU0sQ0FBQyxDQUFDO0lBQ2hCLENBQUMsTUFBTTtNQUNKLElBQUksQ0FBQ0gsS0FBSyxHQUFHQSxLQUFLO0lBQ3JCO0lBQ0EsT0FBTyxJQUFJO0VBQ2QsQ0FBQztFQUVEO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7O0VBRUFJLHNCQUFzQkEsQ0FBQ0MsRUFBRSxFQUFFO0lBQ3hCLE1BQU1DLFNBQVMsR0FBR2pLLFFBQVEsQ0FBQ3VDLGFBQWEsQ0FBRSxVQUFTLENBQUM7SUFFcEQsSUFBSTBILFNBQVMsS0FBSyxJQUFJLElBQUlBLFNBQVMsS0FBSyxJQUFJLEVBQUU7TUFDM0NBLFNBQVMsQ0FBQ0MsU0FBUyxDQUFDLENBQUM7TUFDckJGLEVBQUUsQ0FBQ0csY0FBYyxDQUFDLENBQUM7SUFDdEI7RUFDSCxDQUFDO0VBRURELFNBQVNBLENBQUEsRUFBRztJQUNULElBQUksQ0FBQ0UsU0FBUyxDQUFDQyxHQUFHLENBQUMsT0FBTyxDQUFDO0lBQzNCQyxVQUFVLENBQUMsTUFBTTtNQUNkLElBQUksQ0FBQy9ILGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQ2dJLEtBQUssQ0FBQyxDQUFDO01BQ25DLElBQUksQ0FBQ0gsU0FBUyxDQUFDOUgsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUNqQyxDQUFDLEVBQUUsSUFBSSxDQUFDO0VBQ1gsQ0FBQztFQUVEZixRQUFRQSxDQUFBLEVBQUc7SUFDUixPQUFPLElBQUksQ0FBQ29JLEtBQUs7RUFDcEIsQ0FBQztFQUVEYSxVQUFVQSxDQUFDQyxPQUFPLEVBQUU7SUFDakIsSUFBSSxDQUFDQyxXQUFXLEdBQUdELE9BQU87SUFDMUIsT0FBTyxJQUFJO0VBQ2QsQ0FBQztFQUVEaEssY0FBY0EsQ0FBQ2tLLGFBQWEsRUFBRTtJQUMzQixJQUFJeEUsS0FBSyxDQUFDcUQsT0FBTyxDQUFDbUIsYUFBYSxDQUFDLEVBQUU7TUFDL0JBLGFBQWEsQ0FBQzVHLE9BQU8sQ0FBRTZHLEtBQUssSUFBSztRQUM5QixJQUFJLENBQUMxSyxXQUFXLENBQUMwSyxLQUFLLENBQUM7TUFDMUIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxNQUFNO01BQ0osSUFBSSxDQUFDMUssV0FBVyxDQUFDeUssYUFBYSxDQUFDO0lBQ2xDO0lBQ0EsT0FBTyxJQUFJO0VBQ2QsQ0FBQztFQUVEZCxLQUFLQSxDQUFBLEVBQUc7SUFDTCxPQUFPLElBQUksQ0FBQ3RHLFVBQVUsRUFBRTtNQUNyQixJQUFJLENBQUNzSCxXQUFXLENBQUMsSUFBSSxDQUFDdEgsVUFBVSxDQUFDO0lBQ3BDO0VBQ0gsQ0FBQztFQUVEdUgsUUFBUUEsQ0FBQ0MsTUFBTSxFQUFFO0lBQ2RBLE1BQU0sQ0FBQzdLLFdBQVcsQ0FBQyxJQUFJLENBQUM7SUFDeEIsT0FBTyxJQUFJO0VBQ2QsQ0FBQztFQUVEOEssU0FBU0EsQ0FBQ0QsTUFBTSxFQUFFO0lBQ2ZBLE1BQU0sQ0FBQ0UsT0FBTyxDQUFDLElBQUksQ0FBQztJQUNwQixPQUFPLElBQUk7RUFDZCxDQUFDO0VBRURDLFVBQVVBLENBQUNDLElBQUksRUFBRTtJQUNkM00sYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDMkssYUFBYSxDQUFDO01BQUVpQyxLQUFLLEVBQUVEO0lBQUssQ0FBQyxDQUFDLENBQUNMLFFBQVEsQ0FBQyxJQUFJLENBQUM7SUFDaEUsT0FBTyxJQUFJO0VBQ2QsQ0FBQztFQUVETyxXQUFXQSxDQUFDRixJQUFJLEVBQUU7SUFDZjNNLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQzJLLGFBQWEsQ0FBQztNQUFFaUMsS0FBSyxFQUFFRDtJQUFLLENBQUMsQ0FBQyxDQUFDSCxTQUFTLENBQUMsSUFBSSxDQUFDO0lBQ2pFLE9BQU8sSUFBSTtFQUNkLENBQUM7RUFFRE0sa0JBQWtCQSxDQUFBLEVBQUc7SUFDbEIsSUFBSSxDQUFDWixXQUFXLEdBQ2IsSUFBSSxDQUFDQSxXQUFXLENBQUNhLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQ0MsV0FBVyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUNkLFdBQVcsQ0FBQzFELEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDdkUsT0FBTyxJQUFJO0VBQ2Q7QUFDSCxDQUFDO0FBRUQsaUVBQWV4SSxhQUFhOzs7Ozs7Ozs7Ozs7Ozs7QUN6R1E7QUFFcEMsU0FBU21OLFdBQVdBLENBQUEsRUFBRztFQUNwQixPQUFPRCxnREFBTSxDQUFDLENBQUMsQ0FBQ0UsUUFBUSxDQUFDLENBQUM7QUFDN0I7QUFFQSxpRUFBZUQsV0FBVzs7Ozs7Ozs7Ozs7Ozs7O0FDTmM7QUFFeEMsTUFBTS9GLGFBQWEsQ0FBQztFQUNqQmpHLFdBQVdBLENBQUEsRUFBWTtJQUFBLElBQVhvRCxJQUFJLEdBQUE4SSxTQUFBLENBQUFDLE1BQUEsUUFBQUQsU0FBQSxRQUFBRSxTQUFBLEdBQUFGLFNBQUEsTUFBRyxDQUFDLENBQUM7SUFDbEIsSUFBSSxDQUFDRyxhQUFhLENBQUNqSixJQUFJLENBQUNXLEtBQUssQ0FBQztJQUM5QixJQUFJLENBQUNYLElBQUksQ0FBQ1ksRUFBRSxJQUFJWixJQUFJLENBQUNZLEVBQUUsS0FBSyxFQUFFLEVBQzNCLElBQUksQ0FBQ0EsRUFBRSxHQUFJLEdBQUVaLElBQUksQ0FBQzJGLFFBQVEsR0FBRzNGLElBQUksQ0FBQzJGLFFBQVEsR0FBRyxJQUFLLElBQUdpRCx3REFBVyxDQUFDLENBQUUsRUFBQztJQUN2RSxJQUFJLENBQUNNLGFBQWEsQ0FBQ2xKLElBQUksQ0FBQztFQUMzQjtFQUVBaUosYUFBYUEsQ0FBQ3RJLEtBQUssRUFBRTtJQUNsQixJQUFJLENBQUNBLEtBQUssSUFBSUEsS0FBSyxLQUFLLEVBQUUsRUFBRTtNQUN6QixNQUFNLElBQUl3SSxLQUFLLENBQUMsMENBQTBDLENBQUM7SUFDOUQ7RUFDSDtFQUVBRCxhQUFhQSxDQUFDbEosSUFBSSxFQUFFO0lBQ2pCLE9BQU9DLE1BQU0sQ0FBQ0MsTUFBTSxDQUFDLElBQUksRUFBRUYsSUFBSSxDQUFDO0VBQ25DO0VBRUFtRSxnQkFBZ0JBLENBQUNuRSxJQUFJLEVBQUU7SUFDcEJDLE1BQU0sQ0FBQ21KLElBQUksQ0FBQ3BKLElBQUksQ0FBQyxDQUFDZ0IsT0FBTyxDQUFFd0YsR0FBRyxJQUFLO01BQ2hDLElBQUksQ0FBQ0EsR0FBRyxDQUFDLEdBQUd4RyxJQUFJLENBQUN3RyxHQUFHLENBQUM7SUFDeEIsQ0FBQyxDQUFDO0VBQ0w7RUFFQTZDLFdBQVdBLENBQUM5RSxRQUFRLEVBQUU7SUFDbkIsT0FBTyxJQUFJLENBQUNBLFFBQVEsQ0FBQztFQUN4QjtFQUVBK0UsWUFBWUEsQ0FBQy9FLFFBQVEsRUFBRWdGLFFBQVEsRUFBRTtJQUM5QixJQUFJLENBQUNoRixRQUFRLENBQUMsR0FBR2dGLFFBQVE7RUFDNUI7QUFDSDtBQUVBLGlFQUFlMUcsYUFBYTs7Ozs7Ozs7Ozs7Ozs7QUNuQzVCLE1BQU1uRyxNQUFNLEdBQUc7RUFDWjhNLE1BQU0sRUFBRSxDQUFDLENBQUM7RUFDVkMsZUFBZSxFQUFFLENBQUMsQ0FBQztFQUVuQnhLLE9BQU9BLENBQUN5SyxLQUFLLEVBQUUxSixJQUFJLEVBQUU7SUFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQ3dKLE1BQU0sQ0FBQ0UsS0FBSyxDQUFDLEVBQUU7TUFDdEIsT0FBTyxLQUFLO0lBQ2Y7SUFFQSxJQUFJLENBQUNGLE1BQU0sQ0FBQ0UsS0FBSyxDQUFDLENBQUMxSSxPQUFPLENBQUUySSxZQUFZLElBQUs7TUFDMUNBLFlBQVksQ0FBQ0MsSUFBSSxDQUFDNUosSUFBSSxDQUFDO0lBQzFCLENBQUMsQ0FBQztJQUNGLE9BQU8sSUFBSTtFQUNkLENBQUM7RUFFRHJDLFNBQVNBLENBQUMrTCxLQUFLLEVBQUVFLElBQUksRUFBRTtJQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDSixNQUFNLENBQUNFLEtBQUssQ0FBQyxFQUFFO01BQ3RCLElBQUksQ0FBQ0YsTUFBTSxDQUFDRSxLQUFLLENBQUMsR0FBRyxFQUFFO0lBQzFCO0lBRUEsSUFBSSxDQUFDRCxlQUFlLElBQUksQ0FBQztJQUN6QixNQUFNSSxLQUFLLEdBQUcsSUFBSSxDQUFDSixlQUFlLENBQUNaLFFBQVEsQ0FBQyxDQUFDO0lBQzdDLElBQUksQ0FBQ1csTUFBTSxDQUFDRSxLQUFLLENBQUMsQ0FBQzlGLElBQUksQ0FBQztNQUNyQmlHLEtBQUs7TUFDTEQ7SUFDSCxDQUFDLENBQUM7SUFDRixPQUFPQyxLQUFLO0VBQ2YsQ0FBQztFQUVEQyxXQUFXQSxDQUFDRCxLQUFLLEVBQUU7SUFDaEIsTUFBTUUsS0FBSyxHQUFHOUosTUFBTSxDQUFDbUosSUFBSSxDQUFDLElBQUksQ0FBQ0ksTUFBTSxDQUFDLENBQUNRLElBQUksQ0FBRU4sS0FBSyxJQUMvQyxJQUFJLENBQUNGLE1BQU0sQ0FBQ0UsS0FBSyxDQUFDLENBQUNNLElBQUksQ0FBQyxDQUFDTCxZQUFZLEVBQUV2RixLQUFLLEtBQUs7TUFDOUMsTUFBTTZGLFFBQVEsR0FBR04sWUFBWSxDQUFDRSxLQUFLLEtBQUtBLEtBQUssQ0FBQ2hCLFFBQVEsQ0FBQyxDQUFDO01BQ3hELElBQUlvQixRQUFRLEVBQUU7UUFDWCxJQUFJLENBQUNULE1BQU0sQ0FBQ0UsS0FBSyxDQUFDLENBQUNwRixNQUFNLENBQUNGLEtBQUssRUFBRSxDQUFDLENBQUM7TUFDdEM7TUFDQSxPQUFPNkYsUUFBUTtJQUNsQixDQUFDLENBQ0osQ0FBQztJQUVELE9BQU9GLEtBQUssR0FBR0YsS0FBSyxHQUFHLElBQUk7RUFDOUI7QUFDSCxDQUFDO0FBRUQsaUVBQWVuTixNQUFNOzs7Ozs7Ozs7Ozs7Ozs7O0FDNUNtQjtBQUNlO0FBRXZELE1BQU13TixXQUFXLFNBQVNDLGVBQWUsQ0FBQztFQUN2Q3ZOLFdBQVdBLENBQUNnSyxLQUFLLEVBQUU7SUFDaEIsS0FBSyxDQUFDLENBQUM7SUFDUCxJQUFJLENBQUNBLEtBQUssR0FBR0EsS0FBSztFQUNyQjtFQUVBd0QsaUJBQWlCQSxDQUFBLEVBQUc7SUFDakIsSUFBSSxDQUFDckQsTUFBTSxDQUFDLENBQUM7SUFDYixJQUFJLENBQUNzRCxpQkFBaUIsQ0FBQyxDQUFDO0VBQzNCO0VBRUF0RCxNQUFNQSxDQUFBLEVBQUc7SUFDTixJQUFJLENBQUNuRyxFQUFFLEdBQUcsZUFBZTtJQUV6QixNQUFNMEosWUFBWSxHQUFHN08saUVBQWEsQ0FBQyxRQUFRLENBQUMsQ0FDeEMySyxhQUFhLENBQUM7TUFDWnJILElBQUksRUFBRSxRQUFRO01BQ2RzSixLQUFLLEVBQUUsWUFBWTtNQUNuQmtDLElBQUksRUFBRTtJQUNULENBQUMsQ0FBQyxDQUNEcEMsVUFBVSxDQUFDLDBCQUEwQixDQUFDLENBQ3RDSixRQUFRLENBQUMsSUFBSSxDQUFDO0lBRWxCLE1BQU15QyxVQUFVLEdBQUcvTyxpRUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUNyQzJLLGFBQWEsQ0FBQztNQUNackgsSUFBSSxFQUFFLE1BQU07TUFDWndMLElBQUksRUFBRSxhQUFhO01BQ25CRSxXQUFXLEVBQUUsZUFBZTtNQUM1QkMsU0FBUyxFQUFFLElBQUk7TUFDZkMsU0FBUyxFQUFFLEdBQUc7TUFDZEMsUUFBUSxFQUFFO0lBQ2IsQ0FBQyxDQUFDLENBQ0Q3QyxRQUFRLENBQUMsSUFBSSxDQUFDO0lBRWxCLE1BQU04QyxXQUFXLEdBQUdwUCxpRUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUN2QzJLLGFBQWEsQ0FBQztNQUNackgsSUFBSSxFQUFFLFFBQVE7TUFDZHNKLEtBQUssRUFBRSxXQUFXO01BQ2xCa0MsSUFBSSxFQUFFO0lBQ1QsQ0FBQyxDQUFDLENBQ0Q5QyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQ3RCYSxXQUFXLENBQUMsNkJBQTZCLENBQUMsQ0FDMUNQLFFBQVEsQ0FBQyxJQUFJLENBQUM7SUFFbEIsTUFBTStDLFlBQVksR0FBR3JQLGlFQUFhLENBQUMsVUFBVSxDQUFDLENBQzFDMkssYUFBYSxDQUFDO01BQUVpQyxLQUFLLEVBQUU7SUFBZ0IsQ0FBQyxDQUFDLENBQ3pDTixRQUFRLENBQUMsSUFBSSxDQUFDO0lBRWxCLE1BQU1nRCxnQkFBZ0IsR0FBR3RQLGlFQUFhLENBQUMsVUFBVSxDQUFDLENBQzlDMkssYUFBYSxDQUFDO01BQ1pySCxJQUFJLEVBQUUsTUFBTTtNQUNad0wsSUFBSSxFQUFFLG1CQUFtQjtNQUN6QkUsV0FBVyxFQUFFLHFCQUFxQjtNQUNsQ0MsU0FBUyxFQUFFLEtBQUs7TUFDaEJNLElBQUksRUFBRTtJQUNULENBQUMsQ0FBQyxDQUNEakQsUUFBUSxDQUFDK0MsWUFBWSxDQUFDO0lBRTFCLE1BQU1HLGVBQWUsR0FBR3hQLGlFQUFhLENBQUMsS0FBSyxDQUFDLENBQ3hDMkssYUFBYSxDQUFDO01BQ1ppQyxLQUFLLEVBQUU7SUFDVixDQUFDLENBQUMsQ0FDRE4sUUFBUSxDQUFDK0MsWUFBWSxDQUFDO0lBRTFCLE1BQU1JLFNBQVMsR0FBR3pQLGlFQUFhLENBQUMsT0FBTyxDQUFDLENBQ3BDMkssYUFBYSxDQUFDO01BQ1pySCxJQUFJLEVBQUUsTUFBTTtNQUNad0wsSUFBSSxFQUFFLFlBQVk7TUFDbEJZLEdBQUcsRUFBRSxJQUFJdkcsSUFBSSxDQUFDLENBQUMsQ0FBQ3dHLFdBQVcsQ0FBQyxDQUFDLENBQUNDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7TUFDM0N4SyxLQUFLLEVBQUUsSUFBSStELElBQUksQ0FBQyxDQUFDLENBQUN3RyxXQUFXLENBQUMsQ0FBQyxDQUFDQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUMvQyxDQUFDLENBQUMsQ0FDRHRELFFBQVEsQ0FBQ2tELGVBQWUsQ0FBQztJQUU3QixNQUFNSyxhQUFhLEdBQUc3UCxpRUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUN6QzJLLGFBQWEsQ0FBQztNQUNaaUMsS0FBSyxFQUFFLGdCQUFnQjtNQUN2QmtDLElBQUksRUFBRTtNQUNOO0lBQ0gsQ0FBQyxDQUFDLENBQ0R4QyxRQUFRLENBQUNrRCxlQUFlLENBQUM7SUFFN0IsTUFBTU0sY0FBYyxHQUFHOVAsaUVBQWEsQ0FBQyxRQUFRLENBQUMsQ0FDMUMySyxhQUFhLENBQUM7TUFDWmlDLEtBQUssRUFBRSxpQkFBaUI7TUFDeEJrQyxJQUFJLEVBQUU7SUFDVCxDQUFDLENBQUMsQ0FDRHhDLFFBQVEsQ0FBQ2tELGVBQWUsQ0FBQztJQUU3QixNQUFNTyxTQUFTLEdBQUcvUCxpRUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUNyQzJLLGFBQWEsQ0FBQztNQUNackgsSUFBSSxFQUFFLFFBQVE7TUFDZHdMLElBQUksRUFBRTtJQUNULENBQUMsQ0FBQyxDQUNEOUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUN0QmEsV0FBVyxDQUFDLDZCQUE2QixDQUFDLENBQzFDUCxRQUFRLENBQUMrQyxZQUFZLENBQUM7SUFFMUIsSUFBSSxDQUFDVyxzQkFBc0IsQ0FBQ0gsYUFBYSxDQUFDO0lBQzFDLElBQUksQ0FBQ0ksZUFBZSxDQUFDSCxjQUFjLENBQUM7SUFDcEMsSUFBSSxDQUFDN0UsWUFBWSxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUM7RUFDdkM7RUFFQWlGLE1BQU1BLENBQUEsRUFBRztJQUNOLElBQUksQ0FBQ2pGLFlBQVksQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDO0lBQy9CLElBQUksQ0FBQ0EsWUFBWSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUM7SUFDbkMsTUFBTThELFVBQVUsR0FBRyxJQUFJLENBQUNoTCxhQUFhLENBQUMseUJBQXlCLENBQUM7SUFDaEVnTCxVQUFVLENBQUM5RCxZQUFZLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQztJQUMvQzhELFVBQVUsQ0FBQ2hELEtBQUssQ0FBQyxDQUFDO0VBQ3JCO0VBRUFvRSxRQUFRQSxDQUFBLEVBQUc7SUFDUixJQUFJLENBQUNDLGVBQWUsQ0FBQyxRQUFRLENBQUM7SUFFOUIsSUFBSSxDQUFDbkYsWUFBWSxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUM7SUFDcEMsSUFBSSxDQUFDb0YsS0FBSyxDQUFDLENBQUM7SUFDWixJQUFJLENBQUN0TSxhQUFhLENBQUMseUJBQXlCLENBQUMsQ0FBQ2tILFlBQVksQ0FDdkQsYUFBYSxFQUNiLGVBQ0gsQ0FBQztFQUNKO0VBRUFTLFNBQVNBLENBQUEsRUFBRztJQUNULElBQUksQ0FBQ0UsU0FBUyxDQUFDQyxHQUFHLENBQUMsT0FBTyxDQUFDO0lBRTNCQyxVQUFVLENBQUMsTUFBTTtNQUNkLElBQUksQ0FBQy9ILGFBQWEsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDZ0ksS0FBSyxDQUFDLENBQUM7TUFDckQsSUFBSSxDQUFDSCxTQUFTLENBQUM5SCxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ2pDLENBQUMsRUFBRSxJQUFJLENBQUM7RUFDWDtFQUVBa00sc0JBQXNCQSxDQUFDSCxhQUFhLEVBQUU7SUFDbkMsTUFBTVMsZUFBZSxHQUFHdFEsaUVBQWEsQ0FBQyxRQUFRLENBQUMsQ0FDM0MySyxhQUFhLENBQUM7TUFDWjRGLFFBQVEsRUFBRSxFQUFFO01BQ1puTCxLQUFLLEVBQUU7TUFDUDtNQUNBO0lBQ0gsQ0FBQyxDQUFDLENBQ0Q0RyxVQUFVLENBQUMsa0JBQWtCLENBQUMsQ0FDOUJRLFNBQVMsQ0FBQ3FELGFBQWEsQ0FBQztJQUU1QixJQUFJLENBQUMxRSxLQUFLLENBQUN4SixVQUFVLENBQUM0RCxPQUFPLENBQUVNLFFBQVEsSUFBSztNQUN6QyxNQUFNMkssTUFBTSxHQUFHeFEsaUVBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQzJLLGFBQWEsQ0FBQztRQUNwRDhGLEtBQUssRUFBRTVLLFFBQVEsQ0FBQ1gsS0FBSztRQUNyQkMsRUFBRSxFQUFFVSxRQUFRLENBQUNWO01BQ2hCLENBQUMsQ0FBQztNQUVGLE1BQU11TCxnQkFBZ0IsR0FBRyxJQUFJLENBQUN2RixLQUFLLENBQUNySixRQUFRLENBQUN0QixNQUFNLENBQy9DZ0YsT0FBTyxJQUFLQSxPQUFPLENBQUNkLFVBQVUsS0FBS21CLFFBQVEsQ0FBQ1YsRUFDaEQsQ0FBQztNQUVEdUwsZ0JBQWdCLENBQUNuTCxPQUFPLENBQUVDLE9BQU8sSUFBSztRQUNuQyxNQUFNbUwsTUFBTSxHQUFHM1EsaUVBQWEsQ0FBQyxRQUFRLENBQUMsQ0FDbEMySyxhQUFhLENBQUM7VUFDWnhGLEVBQUUsRUFBRUssT0FBTyxDQUFDTDtRQUNmLENBQUMsQ0FBQyxDQUNENkcsVUFBVSxDQUFDeEcsT0FBTyxDQUFDTixLQUFLLENBQUM7UUFDN0IsSUFDRyxJQUFJLENBQUNpRyxLQUFLLENBQUNuRixhQUFhLENBQUMxQyxJQUFJLEtBQUssU0FBUyxJQUMzQ2tDLE9BQU8sQ0FBQ0wsRUFBRSxLQUFLLElBQUksQ0FBQ2dHLEtBQUssQ0FBQ25GLGFBQWEsQ0FBQ1osS0FBSyxFQUM5QztVQUNDdUwsTUFBTSxDQUFDMUYsWUFBWSxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUM7VUFDbkNxRixlQUFlLENBQUNGLGVBQWUsQ0FBQyxVQUFVLENBQUM7UUFDOUM7UUFDQUksTUFBTSxDQUFDOU8sV0FBVyxDQUFDaVAsTUFBTSxDQUFDO01BQzdCLENBQUMsQ0FBQztNQUNGZCxhQUFhLENBQUNuTyxXQUFXLENBQUM4TyxNQUFNLENBQUM7SUFDcEMsQ0FBQyxDQUFDO0VBQ0w7RUFFQVAsZUFBZUEsQ0FBQ0gsY0FBYyxFQUFFO0lBQzdCLE1BQU1jLFVBQVUsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztJQUN2Q0EsVUFBVSxDQUFDckwsT0FBTyxDQUFFMEUsUUFBUSxJQUFLO01BQzlCLE1BQU0wRyxNQUFNLEdBQUczUSxpRUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUNsQzJLLGFBQWEsQ0FBQztRQUNaaUMsS0FBSyxFQUFFLFVBQVU7UUFDakJ6SCxFQUFFLEVBQUU4RTtNQUNQLENBQUMsQ0FBQyxDQUNENEMsV0FBVyxDQUFDLGtCQUFrQixDQUFDLENBQy9CYixVQUFVLENBQUUsWUFBVy9CLFFBQVMsRUFBQyxDQUFDLENBQ2xDcUMsUUFBUSxDQUFDd0QsY0FBYyxDQUFDO0lBQy9CLENBQUMsQ0FBQztFQUNMO0VBRUFsQixpQkFBaUJBLENBQUEsRUFBRztJQUNqQixJQUFJLENBQUNpQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUdyRixFQUFFLElBQUs7TUFDckNBLEVBQUUsQ0FBQ0csY0FBYyxDQUFDLENBQUM7TUFDbkIsSUFBSSxDQUFDbUYsUUFBUSxDQUFDLENBQUM7TUFDZixJQUFJLENBQUNYLFFBQVEsQ0FBQyxDQUFDO0lBQ2xCLENBQUMsQ0FBQztJQUVGLElBQUksQ0FBQ1UsZ0JBQWdCLENBQUMsT0FBTyxFQUFHckYsRUFBRSxJQUFLO01BQ3BDLElBQ0doSyxRQUFRLENBQUN1QyxhQUFhLENBQUUsVUFBUyxDQUFDLElBQ2xDdkMsUUFBUSxDQUFDdUMsYUFBYSxDQUFFLFVBQVMsQ0FBQyxLQUFLLElBQUksRUFDNUM7UUFDQ3ZDLFFBQVEsQ0FBQ3VDLGFBQWEsQ0FBRSxVQUFTLENBQUMsQ0FBQzJILFNBQVMsQ0FBQyxDQUFDO1FBQzlDRixFQUFFLENBQUNHLGNBQWMsQ0FBQyxDQUFDO1FBQ25CO01BQ0g7TUFDQSxJQUFJSCxFQUFFLENBQUN1RixNQUFNLENBQUNqQyxJQUFJLEtBQUssV0FBVyxFQUFFO1FBQ2pDLElBQUksQ0FBQ29CLE1BQU0sQ0FBQyxDQUFDO01BQ2hCLENBQUMsTUFBTSxJQUFJMUUsRUFBRSxDQUFDdUYsTUFBTSxDQUFDbkYsU0FBUyxDQUFDb0YsUUFBUSxDQUFDLFlBQVksQ0FBQyxFQUFFO1FBQ3BELElBQUksQ0FBQ2IsUUFBUSxDQUFDLENBQUM7TUFDbEI7SUFDSCxDQUFDLENBQUM7RUFDTDtFQUVBVyxRQUFRQSxDQUFBLEVBQUc7SUFDUixNQUFNakIsYUFBYSxHQUFHLElBQUksQ0FBQ29CLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQztJQUNyRCxNQUFNbkIsY0FBYyxHQUFHLElBQUksQ0FBQ21CLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQztJQUV2RCxNQUFNQyxRQUFRLEdBQUc7TUFDZGhILFFBQVEsRUFBRSxNQUFNO01BQ2hCQyxTQUFTLEVBQUUsS0FBSztNQUNoQmpGLEtBQUssRUFBRSxJQUFJLENBQUMrTCxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUM3TCxLQUFLO01BQ3pDZ0YsV0FBVyxFQUFFLElBQUksQ0FBQzZHLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDN0wsS0FBSztNQUNyRDhELElBQUksRUFBRSxJQUFJLENBQUMrSCxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUM3TCxLQUFLO01BQ3ZDeUIsU0FBUyxFQUFFZ0osYUFBYSxDQUFDc0IsT0FBTyxDQUFDdEIsYUFBYSxDQUFDdUIsYUFBYSxDQUFDLENBQUNqTSxFQUFFO01BQ2hFOEUsUUFBUSxFQUFFNkYsY0FBYyxDQUFDcUIsT0FBTyxDQUFDckIsY0FBYyxDQUFDc0IsYUFBYSxDQUFDLENBQUNqTSxFQUFFO01BQ2pFVCxVQUFVLEVBQ1BtTCxhQUFhLENBQUNzQixPQUFPLENBQUN0QixhQUFhLENBQUN1QixhQUFhLENBQUMsQ0FBQ2xPLGFBQWEsQ0FBQ2lDO0lBQ3ZFLENBQUM7SUFFRGxFLDZEQUFjLENBQUMsVUFBVSxFQUFFaVEsUUFBUSxDQUFDO0VBQ3ZDO0FBQ0g7QUFDQUcsY0FBYyxDQUFDQyxNQUFNLENBQUMsZUFBZSxFQUFFN0MsV0FBVyxFQUFFO0VBQUU4QyxPQUFPLEVBQUU7QUFBTyxDQUFDLENBQUM7QUFDeEUsaUVBQWU5QyxXQUFXOzs7Ozs7Ozs7Ozs7Ozs7O0FDdk82QjtBQUNmO0FBRXhDLE1BQU0rQyxRQUFRLFNBQVNDLFdBQVcsQ0FBQztFQUNoQzlDLGlCQUFpQkEsQ0FBQSxFQUFHO0lBQ2pCLElBQUksQ0FBQ3JELE1BQU0sQ0FBQyxDQUFDO0lBQ2IsSUFBSSxDQUFDc0QsaUJBQWlCLENBQUMsQ0FBQztFQUMzQjtFQUVBdEQsTUFBTUEsQ0FBQSxFQUFHO0lBQ04sTUFBTXBHLEtBQUssR0FBR2xGLGlFQUFhLENBQUMsS0FBSyxDQUFDLENBQzlCZ00sVUFBVSxDQUFDLElBQUksQ0FBQ2IsS0FBSyxDQUFDakcsS0FBSyxDQUFDLENBQzVCeUYsYUFBYSxDQUFDO01BQUVpQyxLQUFLLEVBQUU7SUFBYSxDQUFDLENBQUMsQ0FDdENFLGtCQUFrQixDQUFDLENBQUMsQ0FDcEJSLFFBQVEsQ0FBQyxJQUFJLENBQUM7SUFFbEIsSUFBSSxDQUFDckIsWUFBWSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUNFLEtBQUssQ0FBQ2pCLFFBQVEsQ0FBQztJQUNuRCxJQUFJLElBQUksQ0FBQ2lCLEtBQUssQ0FBQ2hHLEVBQUUsRUFBRSxJQUFJLENBQUM4RixZQUFZLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQ0UsS0FBSyxDQUFDaEcsRUFBRSxDQUFDO0lBRXpELE1BQU11TSxPQUFPLEdBQUcxUixpRUFBYSxDQUFDLEtBQUssQ0FBQyxDQUNoQzJLLGFBQWEsQ0FBQztNQUFFaUMsS0FBSyxFQUFFO0lBQWUsQ0FBQyxDQUFDLENBQ3hDTixRQUFRLENBQUMsSUFBSSxDQUFDO0lBRWxCLE1BQU1xRixPQUFPLEdBQUczUixpRUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUNuQzBNLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUM3Qi9CLGFBQWEsQ0FBQztNQUFFaUMsS0FBSyxFQUFFLFdBQVc7TUFBRXRKLElBQUksRUFBRTtJQUFTLENBQUMsQ0FBQyxDQUNyRGdKLFFBQVEsQ0FBQ29GLE9BQU8sQ0FBQztJQUVyQixNQUFNRSxTQUFTLEdBQUc1UixpRUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUNyQzBNLFVBQVUsQ0FBQyx5QkFBeUIsQ0FBQyxDQUNyQy9CLGFBQWEsQ0FBQztNQUNaaUMsS0FBSyxFQUFFLGFBQWE7TUFDcEJ0SixJQUFJLEVBQUU7SUFDVCxDQUFDLENBQUMsQ0FDRGdKLFFBQVEsQ0FBQ29GLE9BQU8sQ0FBQztJQUVyQixNQUFNRyxPQUFPLEdBQUc3UixpRUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUNuQzBNLFVBQVUsQ0FBQyxtQkFBbUIsQ0FBQyxDQUMvQi9CLGFBQWEsQ0FBQztNQUFFaUMsS0FBSyxFQUFFLFdBQVc7TUFBRXRKLElBQUksRUFBRTtJQUFTLENBQUMsQ0FBQyxDQUNyRGdKLFFBQVEsQ0FBQ29GLE9BQU8sQ0FBQztJQUVyQixNQUFNSSxTQUFTLEdBQUc5UixpRUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUNyQzBNLFVBQVUsQ0FBQyxtQkFBbUIsQ0FBQyxDQUMvQi9CLGFBQWEsQ0FBQztNQUFFaUMsS0FBSyxFQUFFO0lBQWlCLENBQUMsQ0FBQyxDQUMxQ04sUUFBUSxDQUFDb0YsT0FBTyxDQUFDO0VBQ3hCO0VBRUE5QyxpQkFBaUJBLENBQUEsRUFBRztJQUNqQixJQUFJLENBQUNpQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUdyRixFQUFFLElBQUs7TUFDcEMsSUFDR2hLLFFBQVEsQ0FBQ3VDLGFBQWEsQ0FBRSxVQUFTLENBQUMsSUFDbEN2QyxRQUFRLENBQUN1QyxhQUFhLENBQUUsVUFBUyxDQUFDLEtBQUssSUFBSSxJQUMzQyxDQUFDLElBQUksQ0FBQ2UsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDOEcsU0FBUyxDQUFDb0YsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUMxRDtRQUNDeFAsUUFBUSxDQUFDdUMsYUFBYSxDQUFFLFVBQVMsQ0FBQyxDQUFDMkgsU0FBUyxDQUFDLENBQUM7UUFDOUNGLEVBQUUsQ0FBQ0csY0FBYyxDQUFDLENBQUM7UUFDbkI7TUFDSDtNQUNBLElBQUlILEVBQUUsQ0FBQ3VGLE1BQU0sQ0FBQ25GLFNBQVMsQ0FBQ29GLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRSxJQUFJLENBQUNlLGFBQWEsQ0FBQyxDQUFDLENBQUMsS0FDL0QsSUFBSXZHLEVBQUUsQ0FBQ3VGLE1BQU0sQ0FBQ25GLFNBQVMsQ0FBQ29GLFFBQVEsQ0FBQyxhQUFhLENBQUMsRUFDakQsSUFBSSxDQUFDbk4sVUFBVSxDQUFDLENBQUM7TUFFcEIsSUFBSTJILEVBQUUsQ0FBQ3VGLE1BQU0sQ0FBQ25GLFNBQVMsQ0FBQ29GLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRSxJQUFJLENBQUNnQixRQUFRLENBQUMsQ0FBQztNQUM5RCxJQUFJeEcsRUFBRSxDQUFDdUYsTUFBTSxDQUFDbkYsU0FBUyxDQUFDb0YsUUFBUSxDQUFDLGdCQUFnQixDQUFDLEVBQy9DLElBQUksQ0FBQ2lCLGFBQWEsQ0FBQyxDQUFDO0lBQzFCLENBQUMsQ0FBQztJQUVGelEsUUFBUSxDQUFDcVAsZ0JBQWdCLENBQUMsV0FBVyxFQUFHckYsRUFBRSxJQUFLO01BQzVDLElBQUksQ0FBQyxJQUFJLENBQUN4RyxZQUFZLENBQUMsUUFBUSxDQUFDLEVBQUU7TUFDbEMsSUFDRyxJQUFJLENBQUNBLFlBQVksQ0FBQyxRQUFRLENBQUMsSUFDM0J3RyxFQUFFLENBQUN1RixNQUFNLENBQUNqTSxPQUFPLENBQUMsYUFBYSxDQUFDLEtBQUssSUFBSSxFQUMxQztRQUNDLElBQUksQ0FBQzRHLFNBQVMsQ0FBQyxDQUFDO01BQ25CO0lBQ0gsQ0FBQyxDQUFDO0VBQ0w7O0VBRUE7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7O0VBRUFxRyxhQUFhQSxDQUFBLEVBQUc7SUFDYixNQUFNRyxLQUFLLEdBQUdsUyxpRUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUNoQzJLLGFBQWEsQ0FBQztNQUNadUUsU0FBUyxFQUFFLEdBQUc7TUFDZEQsU0FBUyxFQUFFLElBQUk7TUFDZkQsV0FBVyxFQUFHLE9BQU0sSUFBSSxDQUFDckwsWUFBWSxDQUFDLFdBQVcsQ0FBRSxFQUFDO01BQ3BEeUIsS0FBSyxFQUFFLElBQUksQ0FBQytGLEtBQUssQ0FBQ2pHLEtBQUssSUFBSSxFQUFFO01BQzdCNUIsSUFBSSxFQUFFLE1BQU07TUFDWnNKLEtBQUssRUFBRTtJQUNWLENBQUMsQ0FBQyxDQUNETixRQUFRLENBQUMsSUFBSSxDQUFDO0lBRWxCNEYsS0FBSyxDQUFDbkcsS0FBSyxDQUFDLENBQUM7SUFDYixJQUFJLENBQUNwQixhQUFhLENBQUM7TUFBRXdILE1BQU0sRUFBRTtJQUFHLENBQUMsQ0FBQztFQUNyQztFQUVBQyxXQUFXQSxDQUFBLEVBQUc7SUFDWCxNQUFNRixLQUFLLEdBQUcsSUFBSSxDQUFDbk8sYUFBYSxDQUFDLE9BQU8sQ0FBQztJQUN6QyxJQUFJLENBQUNxTSxlQUFlLENBQUMsUUFBUSxDQUFDO0lBRTlCOEIsS0FBSyxDQUFDcE8sTUFBTSxDQUFDLENBQUM7RUFDakI7RUFFQW1PLGFBQWFBLENBQUEsRUFBRztJQUNiLElBQUksQ0FBQyxJQUFJLENBQUN0TyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUU7TUFDM0IsSUFBSSxJQUFJLENBQUNpSSxTQUFTLENBQUNvRixRQUFRLENBQUMsYUFBYSxDQUFDLEVBQ3ZDLElBQUksQ0FBQzlOLGFBQWEsQ0FBQ1ksTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUMxQixJQUFJLENBQUNBLE1BQU0sQ0FBQyxDQUFDO01BQ2xCO0lBQ0g7SUFDQSxNQUFNb0IsS0FBSyxHQUFHLElBQUksQ0FBQ25CLGFBQWEsQ0FBQyxhQUFhLENBQUM7SUFDL0NtQixLQUFLLENBQUNnSCxXQUFXLEdBQUcsSUFBSSxDQUFDZixLQUFLLENBQUNqRyxLQUFLO0lBQ3BDQSxLQUFLLENBQUM0SCxrQkFBa0IsQ0FBQyxDQUFDO0lBQzFCLElBQUksQ0FBQ3NGLFdBQVcsQ0FBQyxDQUFDO0lBQ2xCLElBQUksQ0FBQ2hDLGVBQWUsQ0FBQyxRQUFRLENBQUM7RUFDakM7RUFFQXZNLFVBQVVBLENBQUEsRUFBRztJQUNWNUMsNkRBQWMsQ0FBRSxHQUFFLElBQUksQ0FBQzBDLFlBQVksQ0FBQyxXQUFXLENBQUUsU0FBUSxFQUFFLElBQUksQ0FBQztJQUNoRSxJQUFJLENBQUNHLE1BQU0sQ0FBQyxDQUFDO0VBQ2hCO0VBRUFrTyxRQUFRQSxDQUFBLEVBQUc7SUFDUixNQUFNRSxLQUFLLEdBQUcsSUFBSSxDQUFDbk8sYUFBYSxDQUFDLE9BQU8sQ0FBQztJQUN6QyxNQUFNbUIsS0FBSyxHQUFHLElBQUksQ0FBQ25CLGFBQWEsQ0FBQyxhQUFhLENBQUM7SUFFL0MsSUFBSSxDQUFDbU8sS0FBSyxDQUFDOU0sS0FBSyxJQUFJOE0sS0FBSyxDQUFDOU0sS0FBSyxDQUFDa0ksTUFBTSxHQUFHLENBQUMsSUFBSTRFLEtBQUssQ0FBQzlNLEtBQUssQ0FBQ2tJLE1BQU0sR0FBRyxFQUFFLEVBQUU7TUFDcEUsSUFBSSxDQUFDNUIsU0FBUyxDQUFDLENBQUM7TUFDaEI7SUFDSDtJQUVBeEcsS0FBSyxDQUFDZ0gsV0FBVyxHQUFHZ0csS0FBSyxDQUFDOU0sS0FBSztJQUMvQkYsS0FBSyxDQUFDNEgsa0JBQWtCLENBQUMsQ0FBQztJQUMxQixJQUFJLENBQUM3QixZQUFZLENBQ2QsYUFBYSxFQUNiLElBQUksQ0FBQy9ILGFBQWEsQ0FBQ1MsWUFBWSxDQUFDLFNBQVMsQ0FDNUMsQ0FBQztJQUNELElBQUksQ0FBQ3dILEtBQUssQ0FBQ2pHLEtBQUssR0FBR2dOLEtBQUssQ0FBQzlNLEtBQUs7SUFDOUIsSUFBSSxDQUFDZ04sV0FBVyxDQUFDLENBQUM7SUFDbEIsSUFBSSxJQUFJLENBQUN6TyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUU7TUFDMUIxQyw2REFBYyxDQUFFLEdBQUUsSUFBSSxDQUFDMEMsWUFBWSxDQUFDLFdBQVcsQ0FBRSxTQUFRLEVBQUUsSUFBSSxDQUFDO0lBQ25FLENBQUMsTUFBTTtNQUNKMUMsNkRBQWMsQ0FBRSxHQUFFLElBQUksQ0FBQzBDLFlBQVksQ0FBQyxXQUFXLENBQUUsTUFBSyxFQUFFLElBQUksQ0FBQztJQUNoRTtFQUNIO0FBQ0g7QUFDQTBOLGNBQWMsQ0FBQ0MsTUFBTSxDQUFDLGFBQWEsRUFBRUUsUUFBUSxDQUFDO0FBQzlDLGlFQUFlQSxRQUFROzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6SnlCO0FBQ087QUFDZjtBQUNFO0FBRTFDLE1BQU1jLGNBQWMsU0FBU2IsV0FBVyxDQUFDO0VBQ3RDOUMsaUJBQWlCQSxDQUFBLEVBQUc7SUFDakIsSUFBSSxDQUFDckQsTUFBTSxDQUFDLENBQUM7SUFDYixJQUFJLENBQUNzRCxpQkFBaUIsQ0FBQyxDQUFDO0VBQzNCO0VBRUF0RCxNQUFNQSxDQUFBLEVBQUc7SUFDTixNQUFNaUgsVUFBVSxHQUFHdlMsaUVBQWEsQ0FBQyxhQUFhLENBQUMsQ0FDM0NtRCxRQUFRLENBQUMsSUFBSSxDQUFDZ0ksS0FBSyxDQUFDL0gsTUFBTSxDQUFDLENBQzNCdUgsYUFBYSxDQUFDO01BQ1ppQyxLQUFLLEVBQUU7SUFDVixDQUFDLENBQUM7SUFFTCxNQUFNNEYsTUFBTSxHQUFHeFMsaUVBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQzJLLGFBQWEsQ0FBQztNQUM5QyxTQUFTLEVBQUUsSUFBSSxDQUFDUSxLQUFLLENBQUMvSCxNQUFNLENBQUMrQixFQUFFLElBQUksSUFBSTtNQUN2Q3lILEtBQUssRUFBRSxZQUFZO01BQ25CLFlBQVksRUFBRSxJQUFJLENBQUN6QixLQUFLLENBQUM5SCxLQUFLLENBQUNDO0lBQ2xDLENBQUMsQ0FBQztJQUVGK08saUVBQVcsQ0FBQ0csTUFBTSxDQUFDO0lBRW5CLElBQUksSUFBSSxDQUFDckgsS0FBSyxDQUFDOUgsS0FBSyxDQUFDRSxJQUFJLEVBQUU7TUFDeEIsSUFBSSxDQUFDNEgsS0FBSyxDQUFDOUgsS0FBSyxDQUFDRSxJQUFJLENBQUNnQyxPQUFPLENBQUUwQyxJQUFJLElBQUs7UUFDckMsTUFBTXdLLE1BQU0sR0FBR3pTLGlFQUFhLENBQUMsYUFBYSxDQUFDLENBQUNtRCxRQUFRLENBQUM4RSxJQUFJLENBQUM7UUFDMUR1SyxNQUFNLENBQUM5USxXQUFXLENBQUMrUSxNQUFNLENBQUM7TUFDN0IsQ0FBQyxDQUFDO0lBQ0w7SUFFQSxJQUFJLENBQUMvUSxXQUFXLENBQUM2USxVQUFVLENBQUM7SUFDNUIsSUFBSSxDQUFDN1EsV0FBVyxDQUFDOFEsTUFBTSxDQUFDO0lBRXhCLE1BQU1FLFVBQVUsR0FBRzFTLGlFQUFhLENBQUMsUUFBUSxDQUFDLENBQ3RDMkssYUFBYSxDQUFDO01BQ1ppQyxLQUFLLEVBQUU7SUFDVixDQUFDLENBQUMsQ0FDREYsVUFBVSxDQUFDLGtCQUFrQixDQUFDO0lBRWxDNkYsVUFBVSxDQUFDeE8sYUFBYSxDQUFDLGVBQWUsQ0FBQyxDQUFDMEksT0FBTyxDQUFDaUcsVUFBVSxDQUFDO0VBQ2hFO0VBRUFDLFVBQVVBLENBQUEsRUFBRztJQUNWLElBQUksQ0FBQ0MsZUFBZSxDQUFDLFVBQVUsQ0FBQztFQUNuQztFQUVBaEUsaUJBQWlCQSxDQUFBLEVBQUc7SUFDakIsSUFBSSxDQUFDaUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFHckYsRUFBRSxJQUFLO01BQ3BDLElBQ0doSyxRQUFRLENBQUN1QyxhQUFhLENBQUUsVUFBUyxDQUFDLElBQ2xDLENBQUMsSUFBSSxDQUFDaU4sUUFBUSxDQUFDeFAsUUFBUSxDQUFDdUMsYUFBYSxDQUFFLFVBQVMsQ0FBQyxDQUFDLElBQ2xELENBQUMsSUFBSSxDQUFDNkgsU0FBUyxDQUFDb0YsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUN0QztRQUNDeFAsUUFBUSxDQUFDdUMsYUFBYSxDQUFFLFVBQVMsQ0FBQyxDQUFDMkgsU0FBUyxDQUFDLENBQUM7UUFDOUNGLEVBQUUsQ0FBQ0csY0FBYyxDQUFDLENBQUM7UUFDbkI7TUFDSDtNQUVBLElBQ0csQ0FBQ25LLFFBQVEsQ0FBQ3VDLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQyxJQUM5Q3lILEVBQUUsQ0FBQ3VGLE1BQU0sQ0FBQ25GLFNBQVMsQ0FBQ29GLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFDekM7UUFDQyxJQUFJLENBQUNsTyxPQUFPLENBQUMsQ0FBQztNQUNqQjtJQUNILENBQUMsQ0FBQztFQUNMO0VBRUFBLE9BQU9BLENBQUEsRUFBRztJQUNQLElBQUksQ0FBQyxJQUFJLENBQUNrQyxZQUFZLENBQUMsVUFBVSxDQUFDLEVBQUUsSUFBSSxDQUFDMk4sVUFBVSxDQUFDLENBQUM7SUFFckQsTUFBTUUsU0FBUyxHQUFHLElBQUksQ0FBQzlPLGFBQWEsQ0FBQyxhQUFhLENBQUM7SUFDbkQsTUFBTStPLFFBQVEsR0FBR0QsU0FBUyxDQUFDbFAsWUFBWSxDQUFDLFlBQVksQ0FBQztJQUNyRCxNQUFNNEUsT0FBTyxHQUFHdkksaUVBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQ21ELFFBQVEsQ0FBQztNQUNuRCtHLFFBQVEsRUFBRTRJO0lBQ2IsQ0FBQyxDQUFDO0lBQ0ZELFNBQVMsQ0FBQ25SLFdBQVcsQ0FBQzZHLE9BQU8sQ0FBQztJQUM5QkEsT0FBTyxDQUFDd0osYUFBYSxDQUFDLENBQUM7RUFDMUI7QUFDSDtBQUVBVixjQUFjLENBQUNDLE1BQU0sQ0FBQyxVQUFVLEVBQUVnQixjQUFjLENBQUM7QUFFakQsaUVBQWVBLGNBQWM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckYwQjtBQUNmO0FBQ007QUFFOUMsTUFBTXhTLFdBQVcsU0FBUzJSLFdBQVcsQ0FBQztFQUNuQzlDLGlCQUFpQkEsQ0FBQSxFQUFHO0lBQ2pCLElBQUksQ0FBQ3JELE1BQU0sQ0FBQyxDQUFDO0lBQ2IsSUFBSSxDQUFDc0QsaUJBQWlCLENBQUMsQ0FBQztFQUMzQjtFQUVBdEQsTUFBTUEsQ0FBQSxFQUFHO0lBQ04sSUFBSSxDQUFDTCxZQUFZLENBQUMsSUFBSSxFQUFFLGVBQWUsQ0FBQztJQUN4QyxNQUFNN0gsTUFBTSxHQUFHcEQsaUVBQWEsQ0FBQyxJQUFJLENBQUMsQ0FDOUJnTSxVQUFVLENBQUMsVUFBVSxDQUFDLENBQ3RCYSxXQUFXLENBQUMsMkJBQTJCLENBQUMsQ0FDeENsQyxhQUFhLENBQUM7TUFBRWlDLEtBQUssRUFBRTtJQUF1QixDQUFDLENBQUM7SUFDcEQsSUFBSSxDQUFDSCxPQUFPLENBQUNySixNQUFNLENBQUM7SUFFcEIsSUFBSSxDQUFDMlAsaUJBQWlCLENBQUMsQ0FBQztJQUV4QixNQUFNQyxjQUFjLEdBQUdoVCxpRUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUMxQzJLLGFBQWEsQ0FBQztNQUFFaUMsS0FBSyxFQUFFO0lBQW1CLENBQUMsQ0FBQyxDQUM1Q1osVUFBVSxDQUFDLHNCQUFzQixDQUFDLENBQ2xDYSxXQUFXLENBQUMseUJBQXlCLENBQUM7SUFFMUMsSUFBSSxDQUFDb0csTUFBTSxDQUFDRCxjQUFjLENBQUM7RUFDOUI7RUFFQUQsaUJBQWlCQSxDQUFBLEVBQUc7SUFDakIsSUFBSSxDQUFDNUgsS0FBSyxDQUFDeEosVUFBVSxDQUFDNEQsT0FBTyxDQUFFTSxRQUFRLElBQUs7TUFDekMsTUFBTTZLLGdCQUFnQixHQUFHLElBQUksQ0FBQ3ZGLEtBQUssQ0FBQ3JKLFFBQVEsQ0FBQ3RCLE1BQU0sQ0FDL0NnRixPQUFPLElBQUtBLE9BQU8sQ0FBQ2QsVUFBVSxLQUFLbUIsUUFBUSxDQUFDVixFQUNoRCxDQUFDO01BQ0QsSUFBSSxDQUFDK04sa0JBQWtCLENBQUNyTixRQUFRLEVBQUU2SyxnQkFBZ0IsQ0FBQztJQUN0RCxDQUFDLENBQUM7RUFDTDtFQUVBd0Msa0JBQWtCQSxDQUFDck4sUUFBUSxFQUFFNkssZ0JBQWdCLEVBQUU7SUFDNUMsTUFBTW5OLElBQUksR0FBR3ZELGlFQUFhLENBQUMsVUFBVSxDQUFDLENBQUNtRCxRQUFRLENBQUM7TUFDN0NDLE1BQU0sRUFBRXlDLFFBQVE7TUFDaEJ4QyxLQUFLLEVBQUU7UUFBRUMsSUFBSSxFQUFFLFNBQVM7UUFBRUMsSUFBSSxFQUFFbU47TUFBaUI7SUFDcEQsQ0FBQyxDQUFDO0lBQ0YsSUFBSSxDQUFDdUMsTUFBTSxDQUFDMVAsSUFBSSxDQUFDO0VBQ3BCO0VBRUE4QixzQkFBc0JBLENBQUMyQixVQUFVLEVBQUU7SUFDaEMsSUFBSXhGLFFBQVEsQ0FBQ3VDLGFBQWEsQ0FBRSxrQkFBaUIsQ0FBQyxFQUFFO01BQzdDdkMsUUFBUSxDQUNKdUMsYUFBYSxDQUFFLGtCQUFpQixDQUFDLENBQ2pDcU0sZUFBZSxDQUFDLGdCQUFnQixDQUFDO0lBQ3hDO0lBQ0EsSUFBSSxDQUFDck0sYUFBYSxDQUFFLE9BQU1pRCxVQUFVLENBQUM3QixFQUFHLEdBQUUsQ0FBQyxDQUFDOEYsWUFBWSxDQUNyRCxnQkFBZ0IsRUFDaEIsRUFDSCxDQUFDO0VBQ0o7RUFFQTJELGlCQUFpQkEsQ0FBQSxFQUFHO0lBQ2pCLElBQUksQ0FBQ2lDLGdCQUFnQixDQUFDLE9BQU8sRUFBR3JGLEVBQUUsSUFBSztNQUNwQyxJQUFJaEssUUFBUSxDQUFDdUMsYUFBYSxDQUFFLFVBQVMsQ0FBQyxFQUFFO01BRXhDLElBQUl5SCxFQUFFLENBQUN1RixNQUFNLENBQUNuRixTQUFTLENBQUNvRixRQUFRLENBQUMsa0JBQWtCLENBQUMsRUFBRTtRQUNuRCxJQUFJLENBQUNrQyxrQkFBa0IsQ0FBQztVQUFFaEosUUFBUSxFQUFFO1FBQVcsQ0FBQyxFQUFFLElBQUksQ0FBQztRQUN2RCxJQUFJLENBQUNpSixTQUFTLENBQUNwTyxVQUFVLENBQUNnTixhQUFhLENBQUMsQ0FBQztNQUM1QyxDQUFDLE1BQU0sSUFDSnZHLEVBQUUsQ0FBQ3VGLE1BQU0sQ0FBQ2pNLE9BQU8sQ0FBQyxhQUFhLENBQUMsSUFDaEMsQ0FBQzBHLEVBQUUsQ0FBQ3VGLE1BQU0sQ0FBQ3FDLFVBQVUsQ0FBQ3hILFNBQVMsQ0FBQ29GLFFBQVEsQ0FBQyxjQUFjLENBQUMsSUFDeEQsQ0FBQ3hGLEVBQUUsQ0FBQ3VGLE1BQU0sQ0FBQ2pNLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQ0UsWUFBWSxDQUFDLFFBQVEsQ0FBQyxFQUN6RDtRQUNDLE1BQU1xTyxTQUFTLEdBQUc3SCxFQUFFLENBQUN1RixNQUFNLENBQUNqTSxPQUFPLENBQUMsYUFBYSxDQUFDO1FBQ2xELE1BQU1QLElBQUksR0FBRztVQUNWWSxFQUFFLEVBQUVrTyxTQUFTLENBQUMxUCxZQUFZLENBQUMsSUFBSSxDQUFDO1VBQ2hDTCxJQUFJLEVBQUUrUCxTQUFTLENBQUMxUCxZQUFZLENBQUMsV0FBVyxDQUFDO1VBQ3pDeUIsS0FBSyxFQUFFaU8sU0FBUyxDQUFDMVAsWUFBWSxDQUFDLElBQUk7UUFDckMsQ0FBQztRQUVELElBQUkwUCxTQUFTLENBQUN6SCxTQUFTLENBQUNvRixRQUFRLENBQUMsYUFBYSxDQUFDLEVBQUU7VUFDOUMsSUFDRyxDQUFDcUMsU0FBUyxDQUFDck8sWUFBWSxDQUFDLGdCQUFnQixDQUFDLElBQ3pDcU8sU0FBUyxDQUFDdk8sT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDRSxZQUFZLENBQUMsVUFBVSxDQUFDLEVBQ3ZEO1lBQ0MsSUFBSSxDQUFDSyxzQkFBc0IsQ0FBQ2dPLFNBQVMsQ0FBQztZQUN0Q3BTLDZEQUFjLENBQUMsZ0JBQWdCLEVBQUVzRCxJQUFJLENBQUM7WUFDdEM7VUFDSDtVQUNBOE8sU0FBUyxDQUFDdk8sT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDNk4sVUFBVSxDQUFDLENBQUM7UUFDN0M7UUFFQSxJQUFJLENBQUN0TixzQkFBc0IsQ0FBQ2dPLFNBQVMsQ0FBQztRQUN0Q3BTLDZEQUFjLENBQUMsZ0JBQWdCLEVBQUVzRCxJQUFJLENBQUM7TUFDekM7SUFDSCxDQUFDLENBQUM7RUFDTDtBQUNIO0FBRUE4TSxjQUFjLENBQUNDLE1BQU0sQ0FBQyxjQUFjLEVBQUV4UixXQUFXLENBQUM7QUFFbEQsaUVBQWVBLFdBQVc7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pHd0I7QUFDSztBQUNmO0FBRXhDLE1BQU0wVCxPQUFPLFNBQVMvQixXQUFXLENBQUM7RUFDL0I5QyxpQkFBaUJBLENBQUEsRUFBRztJQUNqQixJQUFJLENBQUNyRCxNQUFNLENBQUMsQ0FBQztJQUNiLElBQUksQ0FBQ3NELGlCQUFpQixDQUFDLENBQUM7RUFDM0I7RUFFQXRELE1BQU1BLENBQUEsRUFBRztJQUNOLE1BQU1tSSxLQUFLLEdBQUcsSUFBSXRLLElBQUksQ0FBQyxDQUFDO0lBQ3hCLE1BQU11SyxJQUFJLEdBQUc7TUFBRUMsS0FBSyxFQUFFTCxvREFBVyxDQUFDRyxLQUFLLENBQUM7TUFBRUcsR0FBRyxFQUFFTCxvREFBUyxDQUFDRSxLQUFLO0lBQUUsQ0FBQztJQUNqRSxNQUFNSSxjQUFjLEdBQUcsQ0FDcEI7TUFBRTNPLEtBQUssRUFBRSxLQUFLO01BQUU1QixJQUFJLEVBQUUsS0FBSztNQUFFOEIsS0FBSyxFQUFFLEtBQUs7TUFBRXVILElBQUksRUFBRTtJQUFvQixDQUFDLEVBQ3RFO01BQ0d6SCxLQUFLLEVBQUUsT0FBTztNQUNkNUIsSUFBSSxFQUFFLE1BQU07TUFDWjhCLEtBQUssRUFBRXFPLEtBQUs7TUFDWjlHLElBQUksRUFBRTtJQUNULENBQUMsRUFDRDtNQUNHekgsS0FBSyxFQUFFLE1BQU07TUFDYjVCLElBQUksRUFBRSxZQUFZO01BQ2xCOEIsS0FBSyxFQUFFc08sSUFBSTtNQUNYL0csSUFBSSxFQUFFO0lBQ1QsQ0FBQyxDQUNIO0lBRUQsTUFBTW1ILGdCQUFnQixHQUFHOVQsaUVBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQzJLLGFBQWEsQ0FBQztNQUN4RGlDLEtBQUssRUFBRTtJQUNWLENBQUMsQ0FBQztJQUNGaUgsY0FBYyxDQUFDdE8sT0FBTyxDQUFFL0UsTUFBTSxJQUFLO01BQ2hDLE1BQU11VCxRQUFRLEdBQUcvVCxpRUFBYSxDQUFDLElBQUksQ0FBQyxDQUNoQ21ELFFBQVEsQ0FBQzNDLE1BQU0sQ0FBQyxDQUNoQndMLFVBQVUsQ0FBQ3hMLE1BQU0sQ0FBQzBFLEtBQUssQ0FBQyxDQUN4QjRILGtCQUFrQixDQUFDLENBQUMsQ0FDcEJELFdBQVcsQ0FBQ3JNLE1BQU0sQ0FBQ21NLElBQUksQ0FBQyxDQUN4QmhDLGFBQWEsQ0FBQztRQUNaLGFBQWEsRUFBRW5LLE1BQU0sQ0FBQzhDLElBQUk7UUFDMUJzSixLQUFLLEVBQUUsZ0JBQWdCO1FBQ3ZCekgsRUFBRSxFQUFFM0UsTUFBTSxDQUFDMEU7TUFDZCxDQUFDLENBQUM7TUFDTCxJQUFJMUUsTUFBTSxDQUFDOEMsSUFBSSxLQUFLLEtBQUssRUFBRXlRLFFBQVEsQ0FBQzlJLFlBQVksQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLENBQUM7TUFDdEU2SSxnQkFBZ0IsQ0FBQ3BTLFdBQVcsQ0FBQ3FTLFFBQVEsQ0FBQztJQUN6QyxDQUFDLENBQUM7SUFDRixJQUFJLENBQUN0SCxPQUFPLENBQUNxSCxnQkFBZ0IsQ0FBQztJQUU5QixNQUFNMVEsTUFBTSxHQUFHcEQsaUVBQWEsQ0FBQyxRQUFRLENBQUMsQ0FDbEMySyxhQUFhLENBQUM7TUFBRWlDLEtBQUssRUFBRTtJQUFTLENBQUMsQ0FBQyxDQUNsQ0osU0FBUyxDQUFDLElBQUksQ0FBQztJQUVuQixNQUFNRyxJQUFJLEdBQUczTSxpRUFBYSxDQUFDLEtBQUssQ0FBQyxDQUM3QmdNLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FDbkJyQixhQUFhLENBQUM7TUFBRWlDLEtBQUssRUFBRTtJQUFPLENBQUMsQ0FBQyxDQUNoQ0MsV0FBVyxDQUFDLGtCQUFrQixDQUFDLENBQy9CTCxTQUFTLENBQUNwSixNQUFNLENBQUM7SUFFckIsTUFBTTRRLFlBQVksR0FBR2hVLGlFQUFhLENBQUMsUUFBUSxDQUFDLENBQ3hDME0sVUFBVSxDQUFDLCtCQUErQixDQUFDLENBQzNDL0IsYUFBYSxDQUFDO01BQUVpQyxLQUFLLEVBQUU7SUFBaUIsQ0FBQyxDQUFDLENBQzFDTixRQUFRLENBQUNsSixNQUFNLENBQUM7RUFDdkI7RUFFQWlDLHNCQUFzQkEsQ0FBQzJCLFVBQVUsRUFBRTtJQUNoQyxJQUFJeEYsUUFBUSxDQUFDdUMsYUFBYSxDQUFFLGtCQUFpQixDQUFDLEVBQUU7TUFDN0N2QyxRQUFRLENBQ0p1QyxhQUFhLENBQUUsa0JBQWlCLENBQUMsQ0FDakNxTSxlQUFlLENBQUMsZ0JBQWdCLENBQUM7SUFDeEM7SUFDQSxJQUFJLENBQUNyTSxhQUFhLENBQUUsT0FBTWlELFVBQVUsQ0FBQzdCLEVBQUcsR0FBRSxDQUFDLENBQUM4RixZQUFZLENBQ3JELGdCQUFnQixFQUNoQixFQUNILENBQUM7RUFDSjtFQUVBMkQsaUJBQWlCQSxDQUFBLEVBQUc7SUFDakIsSUFBSSxDQUFDaUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFHckYsRUFBRSxJQUFLO01BQ3BDLElBQUlBLEVBQUUsQ0FBQ3VGLE1BQU0sQ0FBQ25GLFNBQVMsQ0FBQ29GLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO1FBQ2pELElBQUl4UCxRQUFRLENBQUN1QyxhQUFhLENBQUUsVUFBUyxDQUFDLEVBQUU7VUFDckN2QyxRQUFRLENBQUN1QyxhQUFhLENBQUUsVUFBUyxDQUFDLENBQUMySCxTQUFTLENBQUMsQ0FBQztVQUM5Q0YsRUFBRSxDQUFDRyxjQUFjLENBQUMsQ0FBQztVQUNuQjtRQUNIO1FBQ0EsTUFBTXBILElBQUksR0FBRztVQUNWVyxLQUFLLEVBQUVzRyxFQUFFLENBQUN1RixNQUFNLENBQUM1RixLQUFLLENBQUNqRyxLQUFLO1VBQzVCQyxFQUFFLEVBQUVxRyxFQUFFLENBQUN1RixNQUFNLENBQUNwTixZQUFZLENBQUMsSUFBSSxDQUFDO1VBQ2hDTCxJQUFJLEVBQUVrSSxFQUFFLENBQUN1RixNQUFNLENBQUNwTixZQUFZLENBQUMsYUFBYSxDQUFDO1VBQzNDeUIsS0FBSyxFQUFFb0csRUFBRSxDQUFDdUYsTUFBTSxDQUFDaE8sUUFBUSxDQUFDLENBQUMsQ0FBQ3FDO1FBQy9CLENBQUM7UUFFRCxJQUFJLENBQUNDLHNCQUFzQixDQUFDbUcsRUFBRSxDQUFDdUYsTUFBTSxDQUFDO1FBQ3RDOVAsNkRBQWMsQ0FBQyxnQkFBZ0IsRUFBRXNELElBQUksQ0FBQztNQUN6QztNQUVBLElBQUlpSCxFQUFFLENBQUN1RixNQUFNLENBQUNuRixTQUFTLENBQUNvRixRQUFRLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtRQUNqRCxJQUFJLENBQUM5TixhQUFhLENBQUNrTixlQUFlLENBQUMsY0FBYyxDQUFDO01BQ3JEO0lBQ0gsQ0FBQyxDQUFDO0lBRUZuUCwrREFBZ0IsQ0FBQyxnQkFBZ0IsRUFBR3NELElBQUksSUFBSztNQUMxQyxJQUFJLElBQUksQ0FBQ1IsYUFBYSxDQUFFLHNCQUFxQlEsSUFBSSxDQUFDVyxLQUFNLEdBQUUsQ0FBQyxFQUFFO1FBQzFELElBQUksQ0FBQ0csc0JBQXNCLENBQ3hCLElBQUksQ0FBQ3RCLGFBQWEsQ0FBRSxzQkFBcUJRLElBQUksQ0FBQ1csS0FBTSxHQUFFLENBQ3pELENBQUM7TUFDSjtNQUVBLElBQUksSUFBSSxDQUFDbkIsYUFBYSxDQUFDLGlCQUFpQixDQUFDLEVBQUU7UUFDeEMsSUFBSSxDQUFDQSxhQUFhLENBQUMsaUJBQWlCLENBQUMsQ0FBQ0MsS0FBSyxDQUFDLENBQUM7TUFDaEQ7SUFDSCxDQUFDLENBQUM7RUFDTDtBQUNIO0FBQ0FxTixjQUFjLENBQUNDLE1BQU0sQ0FBQyxVQUFVLEVBQUVrQyxPQUFPLENBQUM7QUFFMUMsaUVBQWVBLE9BQU87Ozs7Ozs7Ozs7Ozs7Ozs7QUNuSGlDO0FBQ2Y7QUFFeEMsTUFBTVMsUUFBUSxTQUFTeEMsV0FBVyxDQUFDO0VBQ2hDOUMsaUJBQWlCQSxDQUFBLEVBQUc7SUFDakIsSUFBSSxDQUFDckQsTUFBTSxDQUFDLENBQUM7SUFDYixJQUFJLENBQUNzRCxpQkFBaUIsQ0FBQyxDQUFDO0VBQzNCO0VBRUF0RCxNQUFNQSxDQUFBLEVBQUc7SUFDTixJQUFJLENBQUNMLFlBQVksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDRSxLQUFLLENBQUNoRyxFQUFFLENBQUM7SUFFM0MsTUFBTStPLElBQUksR0FBR2xVLGlFQUFhLENBQUMsS0FBSyxDQUFDLENBQzdCMkssYUFBYSxDQUFDO01BQUVpQyxLQUFLLEVBQUU7SUFBTyxDQUFDLENBQUMsQ0FDaENOLFFBQVEsQ0FBQyxJQUFJLENBQUM7SUFFbEIsSUFBSSxJQUFJLENBQUNuQixLQUFLLENBQUNkLFdBQVcsS0FBSyxFQUFFLEVBQUU7TUFDaEMsTUFBTXhFLFFBQVEsR0FBRzdGLGlFQUFhLENBQUMsS0FBSyxDQUFDLENBQ2pDZ00sVUFBVSxDQUFDLElBQUksQ0FBQ2IsS0FBSyxDQUFDeEYsZUFBZSxDQUFDLENBQ3RDbUgsa0JBQWtCLENBQUMsQ0FBQyxDQUNwQm5DLGFBQWEsQ0FBQztRQUFFaUMsS0FBSyxFQUFFO01BQU0sQ0FBQyxDQUFDLENBQy9CTixRQUFRLENBQUM0SCxJQUFJLENBQUM7TUFFbEIsTUFBTTFPLE9BQU8sR0FBR3hGLGlFQUFhLENBQUMsTUFBTSxDQUFDLENBQ2pDZ00sVUFBVSxDQUFDLElBQUksQ0FBQ2IsS0FBSyxDQUFDZCxXQUFXLENBQUMsQ0FDbEN5QyxrQkFBa0IsQ0FBQyxDQUFDLENBQ3BCbkMsYUFBYSxDQUFDO1FBQUVpQyxLQUFLLEVBQUU7TUFBTSxDQUFDLENBQUMsQ0FDL0JOLFFBQVEsQ0FBQzRILElBQUksQ0FBQztJQUNyQjtJQUVBLE1BQU1oTCxJQUFJLEdBQUdsSixpRUFBYSxDQUFDLEtBQUssQ0FBQyxDQUM3QmdNLFVBQVUsQ0FBQyxJQUFJLENBQUNiLEtBQUssQ0FBQ2pDLElBQUksQ0FBQyxDQUMzQnlCLGFBQWEsQ0FBQztNQUFFaUMsS0FBSyxFQUFFO0lBQU0sQ0FBQyxDQUFDLENBQy9CTixRQUFRLENBQUM0SCxJQUFJLENBQUM7SUFFbEIsTUFBTWpLLFFBQVEsR0FBR2pLLGlFQUFhLENBQUMsS0FBSyxDQUFDLENBQ2pDZ00sVUFBVSxDQUFFLFlBQVcsSUFBSSxDQUFDYixLQUFLLENBQUNsQixRQUFTLEVBQUMsQ0FBQyxDQUM3QzRDLFdBQVcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUNqQ2xDLGFBQWEsQ0FBQztNQUFFaUMsS0FBSyxFQUFFLEtBQUs7TUFBRTNDLFFBQVEsRUFBRSxJQUFJLENBQUNrQixLQUFLLENBQUNsQjtJQUFTLENBQUMsQ0FBQyxDQUM5RHFDLFFBQVEsQ0FBQzRILElBQUksQ0FBQztJQUVsQixNQUFNQyxTQUFTLEdBQUduVSxpRUFBYSxDQUFDLEtBQUssQ0FBQyxDQUNsQzJLLGFBQWEsQ0FBQztNQUFFaUMsS0FBSyxFQUFFO0lBQWEsQ0FBQyxDQUFDLENBQ3RDTixRQUFRLENBQUMsSUFBSSxDQUFDO0lBRWxCLE1BQU1wSCxLQUFLLEdBQUdsRixpRUFBYSxDQUFDLElBQUksQ0FBQyxDQUM3QmdNLFVBQVUsQ0FBQyxJQUFJLENBQUNiLEtBQUssQ0FBQ2pHLEtBQUssQ0FBQyxDQUM1QjRILGtCQUFrQixDQUFDLENBQUMsQ0FDcEJuQyxhQUFhLENBQUM7TUFBRWlDLEtBQUssRUFBRTtJQUFRLENBQUMsQ0FBQyxDQUNqQ04sUUFBUSxDQUFDNkgsU0FBUyxDQUFDO0lBRXZCLE1BQU1DLFNBQVMsR0FBR3BVLGlFQUFhLENBQUMsS0FBSyxDQUFDLENBQ2xDMkssYUFBYSxDQUFDO01BQUVpQyxLQUFLLEVBQUU7SUFBUyxDQUFDLENBQUMsQ0FDbENOLFFBQVEsQ0FBQzZILFNBQVMsQ0FBQztJQUV2QixNQUFNL0osV0FBVyxHQUFHcEssaUVBQWEsQ0FBQyxHQUFHLENBQUMsQ0FDbENnTSxVQUFVLENBQUMsSUFBSSxDQUFDYixLQUFLLENBQUNmLFdBQVcsQ0FBQyxDQUNsQzBDLGtCQUFrQixDQUFDLENBQUMsQ0FDcEJuQyxhQUFhLENBQUM7TUFBRWlDLEtBQUssRUFBRTtJQUFjLENBQUMsQ0FBQyxDQUN2Q04sUUFBUSxDQUFDLElBQUksQ0FBQztJQUVsQixNQUFNb0YsT0FBTyxHQUFHMVIsaUVBQWEsQ0FBQyxLQUFLLENBQUMsQ0FDaEMySyxhQUFhLENBQUM7TUFBRWlDLEtBQUssRUFBRTtJQUFVLENBQUMsQ0FBQyxDQUNuQ04sUUFBUSxDQUFDLElBQUksQ0FBQztJQUVsQixNQUFNK0gsaUJBQWlCLEdBQUdyVSxpRUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUM1QzJLLGFBQWEsQ0FBQztNQUNaaUMsS0FBSyxFQUFFLGdCQUFnQjtNQUN2QnpDLFNBQVMsRUFBRSxJQUFJLENBQUNnQixLQUFLLENBQUNoQjtJQUN6QixDQUFDLENBQUMsQ0FDRG1DLFFBQVEsQ0FBQ29GLE9BQU8sQ0FBQztJQUVyQixJQUFJLENBQUM0QyxTQUFTLENBQUNGLFNBQVMsRUFBRUMsaUJBQWlCLENBQUM7SUFFNUMsTUFBTUUsUUFBUSxHQUFHdlUsaUVBQWEsQ0FBQyxPQUFPLENBQUMsQ0FDbkMySyxhQUFhLENBQUM7TUFDWmlDLEtBQUssRUFBRSxvQkFBb0I7TUFDM0J0SixJQUFJLEVBQUU7SUFDVCxDQUFDLENBQUMsQ0FDRGtKLFNBQVMsQ0FBQzZILGlCQUFpQixDQUFDO0lBRWhDLE1BQU1HLFNBQVMsR0FBR3hVLGlFQUFhLENBQUMsS0FBSyxDQUFDLENBQ2xDMkssYUFBYSxDQUFDO01BQUVpQyxLQUFLLEVBQUU7SUFBWSxDQUFDLENBQUMsQ0FDckNGLFVBQVUsQ0FBQyw0QkFBNEIsQ0FBQyxDQUN4Q0osUUFBUSxDQUFDK0gsaUJBQWlCLENBQUM7SUFFL0JFLFFBQVEsQ0FBQ2hLLE9BQU8sR0FBRyxJQUFJLENBQUNZLEtBQUssQ0FBQ2hCLFNBQVM7SUFFdkMsTUFBTXdILE9BQU8sR0FBRzNSLGlFQUFhLENBQUMsUUFBUSxDQUFDLENBQ25DME0sVUFBVSxDQUFDLDJCQUEyQixDQUFDLENBQ3ZDL0IsYUFBYSxDQUFDO01BQUVpQyxLQUFLLEVBQUU7SUFBVyxDQUFDLENBQUMsQ0FDcENOLFFBQVEsQ0FBQ29GLE9BQU8sQ0FBQztJQUVyQixNQUFNRSxTQUFTLEdBQUc1UixpRUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUNyQzJLLGFBQWEsQ0FBQztNQUFFaUMsS0FBSyxFQUFFLFFBQVE7TUFBRXRKLElBQUksRUFBRTtJQUFTLENBQUMsQ0FBQyxDQUNsRHVKLFdBQVcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUNwQ1AsUUFBUSxDQUFDb0YsT0FBTyxDQUFDO0VBQ3hCO0VBRUE0QyxTQUFTQSxDQUFDRixTQUFTLEVBQUVLLGFBQWEsRUFBRTtJQUNqQyxNQUFNaEIsS0FBSyxHQUFHLElBQUl0SyxJQUFJLENBQUMsQ0FBQyxDQUFDdUwsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzFDLE1BQU1DLFFBQVEsR0FBRyxJQUFJeEwsSUFBSSxDQUFDLElBQUksQ0FBQ2dDLEtBQUssQ0FBQ2pDLElBQUksQ0FBQyxDQUFDd0wsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBRTVELElBQUksSUFBSSxDQUFDdkosS0FBSyxDQUFDaEIsU0FBUyxFQUFFO01BQ3ZCaUssU0FBUyxDQUFDcEksVUFBVSxDQUFDLFdBQVcsQ0FBQztNQUNqQ29JLFNBQVMsQ0FBQ25KLFlBQVksQ0FBQyxRQUFRLEVBQUUsV0FBVyxDQUFDO01BQzdDd0osYUFBYSxDQUFDeEosWUFBWSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUM7SUFDaEQsQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUNFLEtBQUssQ0FBQ2hCLFNBQVMsSUFBSXdLLFFBQVEsR0FBR2xCLEtBQUssRUFBRTtNQUNuRFcsU0FBUyxDQUFDcEksVUFBVSxDQUFDLFNBQVMsQ0FBQztNQUMvQm9JLFNBQVMsQ0FBQ25KLFlBQVksQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDO01BQzNDd0osYUFBYSxDQUFDeEosWUFBWSxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUM7SUFDakQsQ0FBQyxNQUFNO01BQ0ptSixTQUFTLENBQUNwSSxVQUFVLENBQUMsU0FBUyxDQUFDO01BQy9Cb0ksU0FBUyxDQUFDbkosWUFBWSxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUM7SUFDOUM7RUFDSDtFQUVBMkQsaUJBQWlCQSxDQUFBLEVBQUc7SUFDakIsSUFBSSxDQUFDaUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFHckYsRUFBRSxJQUFLO01BQ3BDLElBQUloSyxRQUFRLENBQUN1QyxhQUFhLENBQUUsVUFBUyxDQUFDLEVBQUU7UUFDckN2QyxRQUFRLENBQUN1QyxhQUFhLENBQUUsVUFBUyxDQUFDLENBQUMySCxTQUFTLENBQUMsQ0FBQztRQUM5Q0YsRUFBRSxDQUFDRyxjQUFjLENBQUMsQ0FBQztRQUNuQjtNQUNIO01BQ0EsSUFBSUgsRUFBRSxDQUFDdUYsTUFBTSxDQUFDbkYsU0FBUyxDQUFDb0YsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQ3pDLElBQUksQ0FBQ2xOLE1BQU0sQ0FBQyxDQUFDO1FBQ2I3Qyw2REFBYyxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUNrSyxLQUFLLENBQUNoRyxFQUFFLENBQUM7TUFDL0MsQ0FBQyxNQUFNLElBQUlxRyxFQUFFLENBQUN1RixNQUFNLENBQUNuRixTQUFTLENBQUNvRixRQUFRLENBQUMsb0JBQW9CLENBQUMsRUFBRTtRQUM1RCxJQUFJLENBQUM3RixLQUFLLENBQUNoQixTQUFTLEdBQUcsSUFBSSxDQUFDcEcsYUFBYSxDQUN0QyxxQkFDSCxDQUFDLENBQUN3RyxPQUFPO1FBQ1R0Siw2REFBYyxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUNrSyxLQUFLLENBQUM7TUFDNUMsQ0FBQyxNQUFNLElBQ0pLLEVBQUUsQ0FBQ3VGLE1BQU0sQ0FBQ25GLFNBQVMsQ0FBQ29GLFFBQVEsQ0FBQyxVQUFVLENBQUMsSUFDeEMsQ0FBQ3hQLFFBQVEsQ0FBQ3VDLGFBQWEsQ0FBQyxjQUFjLENBQUMsRUFDeEM7UUFDQyxJQUFJLENBQUNrSCxZQUFZLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQztRQUNoQ2hLLDZEQUFjLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQzBDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztNQUM1RDtJQUNILENBQUMsQ0FBQztFQUNMO0FBQ0g7QUFFQTBOLGNBQWMsQ0FBQ0MsTUFBTSxDQUFDLFdBQVcsRUFBRTJDLFFBQVEsQ0FBQztBQUU1QyxpRUFBZUEsUUFBUTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqSmdDO0FBQ2Y7QUFDTTtBQUU5QyxNQUFNVyxXQUFXLFNBQVNuRCxXQUFXLENBQUM7RUFDbkM5QyxpQkFBaUJBLENBQUEsRUFBRztJQUNqQixJQUFJLENBQUNyRCxNQUFNLENBQUMsQ0FBQztJQUNiLElBQUksQ0FBQ3NELGlCQUFpQixDQUFDLENBQUM7RUFDM0I7RUFFQXRELE1BQU1BLENBQUEsRUFBRztJQUNOLElBQUksQ0FBQ25HLEVBQUUsR0FBRyxjQUFjO0lBRXhCLE1BQU13SCxJQUFJLEdBQUczTSxpRUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUM5QjBNLFVBQVUsQ0FBQyxzQkFBc0IsQ0FBQyxDQUNsQy9CLGFBQWEsQ0FBQztNQUFFaUMsS0FBSyxFQUFFO0lBQU8sQ0FBQyxDQUFDLENBQ2hDTixRQUFRLENBQUMsSUFBSSxDQUFDO0lBRWxCLE1BQU11SSxJQUFJLEdBQUc3VSxpRUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUM5QjJLLGFBQWEsQ0FBQztNQUFFeEYsRUFBRSxFQUFFO0lBQWlCLENBQUMsQ0FBQyxDQUN2Q21ILFFBQVEsQ0FBQyxJQUFJLENBQUM7SUFFbEIsTUFBTXBILEtBQUssR0FBR2xGLGlFQUFhLENBQUMsT0FBTyxDQUFDLENBQ2hDMkssYUFBYSxDQUFDO01BQ1pySCxJQUFJLEVBQUUsTUFBTTtNQUNad0wsSUFBSSxFQUFFLGFBQWE7TUFDbkIxSixLQUFLLEVBQ0YsSUFBSSxDQUFDK0YsS0FBSyxDQUFDNUksSUFBSSxDQUFDMkMsS0FBSyxDQUFDNkgsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDQyxXQUFXLENBQUMsQ0FBQyxHQUM3QyxJQUFJLENBQUM3QixLQUFLLENBQUM1SSxJQUFJLENBQUMyQyxLQUFLLENBQUNzRCxLQUFLLENBQUMsQ0FBQyxDQUFDO01BQ2pDeUcsU0FBUyxFQUFFLElBQUk7TUFDZkMsU0FBUyxFQUFFLEdBQUc7TUFDZEMsUUFBUSxFQUFFO0lBQ2IsQ0FBQyxDQUFDLENBQ0Q3QyxRQUFRLENBQUN1SSxJQUFJLENBQUM7SUFFbEIsTUFBTXpLLFdBQVcsR0FBR3BLLGlFQUFhLENBQUMsVUFBVSxDQUFDLENBQ3pDMkssYUFBYSxDQUFDO01BQ1ptRSxJQUFJLEVBQUUsbUJBQW1CO01BQ3pCZ0csV0FBVyxFQUFFLHlCQUF5QjtNQUN0QzdGLFNBQVMsRUFBRSxLQUFLO01BQ2hCTSxJQUFJLEVBQUU7SUFDVCxDQUFDLENBQUMsQ0FDRHZELFVBQVUsQ0FBQyxJQUFJLENBQUNiLEtBQUssQ0FBQzVJLElBQUksQ0FBQzZILFdBQVcsQ0FBQyxDQUN2QzBDLGtCQUFrQixDQUFDLENBQUMsQ0FDcEJSLFFBQVEsQ0FBQ3VJLElBQUksQ0FBQztJQUVsQixNQUFNM0wsSUFBSSxHQUFHbEosaUVBQWEsQ0FBQyxPQUFPLENBQUMsQ0FDL0IySyxhQUFhLENBQUM7TUFDWnJILElBQUksRUFBRSxNQUFNO01BQ1p3TCxJQUFJLEVBQUUsWUFBWTtNQUNsQjFKLEtBQUssRUFBRyxHQUFFLElBQUksQ0FBQytGLEtBQUssQ0FBQzVJLElBQUksQ0FBQzJHLElBQUs7SUFDbEMsQ0FBQyxDQUFDLENBQ0RvRCxRQUFRLENBQUN1SSxJQUFJLENBQUM7SUFFbEIsSUFBSSxDQUFDN0Usc0JBQXNCLENBQUM2RSxJQUFJLENBQUM7SUFDakMsSUFBSSxDQUFDNUUsZUFBZSxDQUFDNEUsSUFBSSxDQUFDO0lBQzFCLElBQUksQ0FBQ0UsY0FBYyxDQUFDRixJQUFJLENBQUM7SUFFekIsTUFBTUcsa0JBQWtCLEdBQUdoVixpRUFBYSxDQUFDLEtBQUssQ0FBQyxDQUMzQzJLLGFBQWEsQ0FBQztNQUFFaUMsS0FBSyxFQUFFO0lBQXVCLENBQUMsQ0FBQyxDQUNoRE4sUUFBUSxDQUFDdUksSUFBSSxDQUFDO0lBRWxCLE1BQU05RSxTQUFTLEdBQUcvUCxpRUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUNyQzJLLGFBQWEsQ0FBQztNQUNackgsSUFBSSxFQUFFLFFBQVE7TUFDZHdMLElBQUksRUFBRTtJQUNULENBQUMsQ0FBQyxDQUNEOUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUNsQmEsV0FBVyxDQUFDLHlCQUF5QixDQUFDLENBQ3RDUCxRQUFRLENBQUMwSSxrQkFBa0IsQ0FBQztJQUVoQyxNQUFNNVIsTUFBTSxHQUFHcEQsaUVBQWEsQ0FBQyxRQUFRLENBQUMsQ0FDbENnTSxVQUFVLENBQUMsZUFBZSxDQUFDLENBQzNCckIsYUFBYSxDQUFDO01BQUVpQyxLQUFLLEVBQUU7SUFBUyxDQUFDLENBQUMsQ0FDbENKLFNBQVMsQ0FBQyxJQUFJLENBQUM7SUFFbkIsTUFBTXlJLFFBQVEsR0FBR2pWLGlFQUFhLENBQUMsUUFBUSxDQUFDLENBQ3BDMkssYUFBYSxDQUFDO01BQ1ppQyxLQUFLLEVBQUUsT0FBTztNQUNkdEosSUFBSSxFQUFFLFFBQVE7TUFDZHdMLElBQUksRUFBRTtJQUNULENBQUMsQ0FBQyxDQUNEcEMsVUFBVSxDQUFDLDBCQUEwQixDQUFDLENBQ3RDSixRQUFRLENBQUNsSixNQUFNLENBQUM7SUFFcEIsSUFBSSxDQUFDNkgsWUFBWSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUM7RUFDbEM7RUFFQTJELGlCQUFpQkEsQ0FBQSxFQUFHO0lBQ2pCLElBQUksQ0FBQzdLLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQzhNLGdCQUFnQixDQUFDLFFBQVEsRUFBR3JGLEVBQUUsSUFBSztNQUMzREEsRUFBRSxDQUFDRyxjQUFjLENBQUMsQ0FBQztNQUNuQixJQUFJLElBQUksQ0FBQzVILGFBQWEsQ0FBQyxVQUFVLENBQUMsRUFBRTtNQUVwQyxJQUFJLENBQUMrTSxRQUFRLENBQUMsQ0FBQztNQUNmLElBQUksQ0FBQ2hOLE1BQU0sQ0FBQyxDQUFDO0lBQ2hCLENBQUMsQ0FBQztJQUVGLElBQUksQ0FBQytNLGdCQUFnQixDQUFDLE9BQU8sRUFBR3JGLEVBQUUsSUFBSztNQUNwQyxJQUFJLElBQUksQ0FBQ3pILGFBQWEsQ0FBQyxVQUFVLENBQUMsRUFBRTtNQUNwQyxJQUNHeUgsRUFBRSxDQUFDdUYsTUFBTSxDQUFDak0sT0FBTyxDQUFDLDhCQUE4QixDQUFDLElBQ2pELENBQUMwRyxFQUFFLENBQUN1RixNQUFNLENBQUNqTSxPQUFPLENBQUMsZUFBZSxDQUFDLEVBQ3BDO1FBQ0MsTUFBTW1ELElBQUksR0FBR3VELEVBQUUsQ0FBQ3VGLE1BQU0sQ0FBQ2pNLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQztRQUM5RG1ELElBQUksQ0FBQzJLLGVBQWUsQ0FBQyxTQUFTLENBQUM7TUFDbEM7TUFFQSxJQUFJcEgsRUFBRSxDQUFDdUYsTUFBTSxDQUFDak0sT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQzlCdEQsUUFBUSxDQUNKdUMsYUFBYSxDQUFDLG9CQUFvQixDQUFDLENBQ25DcU0sZUFBZSxDQUFDLFNBQVMsQ0FBQztRQUM5QixJQUFJLENBQUN0TSxNQUFNLENBQUMsQ0FBQztNQUNoQjtJQUNILENBQUMsQ0FBQztFQUNMO0VBRUFnTixRQUFRQSxDQUFBLEVBQUc7SUFDUixNQUFNK0QsSUFBSSxHQUFHLElBQUksQ0FBQzlRLGFBQWEsQ0FBQyxNQUFNLENBQUM7SUFDdkMsTUFBTThMLGFBQWEsR0FBR2dGLElBQUksQ0FBQzVELFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQztJQUNyRCxNQUFNbkIsY0FBYyxHQUFHK0UsSUFBSSxDQUFDNUQsUUFBUSxDQUFDLGlCQUFpQixDQUFDO0lBQ3ZELE1BQU1pRSxjQUFjLEdBQUdMLElBQUksQ0FBQ00sZ0JBQWdCLENBQ3pDLDhCQUNILENBQUM7SUFFRCxNQUFNakUsUUFBUSxHQUFHO01BQ2QvTCxFQUFFLEVBQUUsSUFBSSxDQUFDZ0csS0FBSyxDQUFDNUksSUFBSSxDQUFDNEMsRUFBRTtNQUN0QkQsS0FBSyxFQUFFMlAsSUFBSSxDQUFDNUQsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDN0wsS0FBSztNQUN6Q2dGLFdBQVcsRUFBRXlLLElBQUksQ0FBQzVELFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDN0wsS0FBSztNQUNyRDhELElBQUksRUFBRTJMLElBQUksQ0FBQzVELFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQzdMLEtBQUs7TUFDdkN5QixTQUFTLEVBQUVnSixhQUFhLENBQUNzQixPQUFPLENBQUN0QixhQUFhLENBQUN1QixhQUFhLENBQUMsQ0FBQ2pNLEVBQUU7TUFDaEU4RSxRQUFRLEVBQUU2RixjQUFjLENBQUNxQixPQUFPLENBQUNyQixjQUFjLENBQUNzQixhQUFhLENBQUMsQ0FBQ2pNLEVBQUU7TUFDakVULFVBQVUsRUFDUG1MLGFBQWEsQ0FBQ3NCLE9BQU8sQ0FBQ3RCLGFBQWEsQ0FBQ3VCLGFBQWEsQ0FBQyxDQUFDbE8sYUFBYSxDQUM1RGlDLEVBQUUsSUFBSSxJQUFJO01BQ2pCbUYsU0FBUyxFQUFFO0lBQ2QsQ0FBQztJQUVENEssY0FBYyxDQUFDM1AsT0FBTyxDQUFFMEMsSUFBSSxJQUFLO01BQzlCLE1BQU1tTixRQUFRLEdBQUc7UUFDZGxMLFFBQVEsRUFBRSxnQkFBZ0I7UUFDMUJoRixLQUFLLEVBQUUrQyxJQUFJLENBQUNpRSxXQUFXO1FBQ3ZCM0IsT0FBTyxFQUFFdEMsSUFBSSxDQUFDakQsWUFBWSxDQUFDLFNBQVM7TUFDdkMsQ0FBQztNQUNEa00sUUFBUSxDQUFDNUcsU0FBUyxDQUFDbkMsSUFBSSxDQUFDaU4sUUFBUSxDQUFDO0lBQ3BDLENBQUMsQ0FBQztJQUVGblUsNkRBQWMsQ0FBQyxhQUFhLEVBQUVpUSxRQUFRLENBQUM7RUFDMUM7RUFFQWxCLHNCQUFzQkEsQ0FBQzZFLElBQUksRUFBRTtJQUMxQixNQUFNaEYsYUFBYSxHQUFHN1AsaUVBQWEsQ0FBQyxRQUFRLENBQUMsQ0FDekMySyxhQUFhLENBQUM7TUFDWmlDLEtBQUssRUFBRSxnQkFBZ0I7TUFDdkJrQyxJQUFJLEVBQUU7SUFDVCxDQUFDLENBQUMsQ0FDRHhDLFFBQVEsQ0FBQ3VJLElBQUksQ0FBQztJQUVsQixNQUFNdkUsZUFBZSxHQUFHdFEsaUVBQWEsQ0FBQyxRQUFRLENBQUMsQ0FDM0MySyxhQUFhLENBQUM7TUFDWnZGLEtBQUssRUFBRSxFQUFFO01BQ1RtTCxRQUFRLEVBQUU7SUFDYixDQUFDLENBQUMsQ0FDRHZFLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUM5QlEsU0FBUyxDQUFDcUQsYUFBYSxDQUFDO0lBRTVCLElBQUksQ0FBQzFFLEtBQUssQ0FBQ3hKLFVBQVUsQ0FBQzRELE9BQU8sQ0FBRU0sUUFBUSxJQUFLO01BQ3pDLE1BQU0ySyxNQUFNLEdBQUd4USxpRUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDMkssYUFBYSxDQUFDO1FBQ3BEOEYsS0FBSyxFQUFFNUssUUFBUSxDQUFDWCxLQUFLO1FBQ3JCQyxFQUFFLEVBQUVVLFFBQVEsQ0FBQ1Y7TUFDaEIsQ0FBQyxDQUFDO01BRUYsTUFBTXVMLGdCQUFnQixHQUFHLElBQUksQ0FBQ3ZGLEtBQUssQ0FBQ3JKLFFBQVEsQ0FBQ3RCLE1BQU0sQ0FDL0NnRixPQUFPLElBQUtBLE9BQU8sQ0FBQ2QsVUFBVSxLQUFLbUIsUUFBUSxDQUFDVixFQUNoRCxDQUFDO01BQ0R1TCxnQkFBZ0IsQ0FBQ25MLE9BQU8sQ0FBRUMsT0FBTyxJQUFLO1FBQ25DLE1BQU1tTCxNQUFNLEdBQUczUSxpRUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUNsQzJLLGFBQWEsQ0FBQztVQUNaeEYsRUFBRSxFQUFFSyxPQUFPLENBQUNMO1FBQ2YsQ0FBQyxDQUFDLENBQ0Q2RyxVQUFVLENBQUN4RyxPQUFPLENBQUNOLEtBQUssQ0FBQyxDQUN6Qm9ILFFBQVEsQ0FBQ2tFLE1BQU0sQ0FBQztRQUVwQixJQUFJaEwsT0FBTyxDQUFDTCxFQUFFLEtBQUssSUFBSSxDQUFDZ0csS0FBSyxDQUFDNUksSUFBSSxDQUFDc0UsU0FBUyxFQUFFO1VBQzNDOEosTUFBTSxDQUFDMUYsWUFBWSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUM7VUFDckNxRixlQUFlLENBQUNGLGVBQWUsQ0FBQyxVQUFVLENBQUM7UUFDOUM7TUFDSCxDQUFDLENBQUM7TUFFRlAsYUFBYSxDQUFDbk8sV0FBVyxDQUFDOE8sTUFBTSxDQUFDO0lBQ3BDLENBQUMsQ0FBQztFQUNMO0VBRUFQLGVBQWVBLENBQUM0RSxJQUFJLEVBQUU7SUFDbkIsTUFBTS9FLGNBQWMsR0FBRzlQLGlFQUFhLENBQUMsUUFBUSxDQUFDLENBQzFDMkssYUFBYSxDQUFDO01BQ1ppQyxLQUFLLEVBQUUsaUJBQWlCO01BQ3hCa0MsSUFBSSxFQUFFO0lBQ1QsQ0FBQyxDQUFDLENBQ0R4QyxRQUFRLENBQUN1SSxJQUFJLENBQUM7SUFDbEIsTUFBTWpFLFVBQVUsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztJQUN2Q0EsVUFBVSxDQUFDckwsT0FBTyxDQUFFMEUsUUFBUSxJQUFLO01BQzlCLE1BQU0wRyxNQUFNLEdBQUczUSxpRUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUNsQzJLLGFBQWEsQ0FBQztRQUNaeEYsRUFBRSxFQUFFOEU7TUFDUCxDQUFDLENBQUMsQ0FDRCtCLFVBQVUsQ0FBRSxZQUFXL0IsUUFBUyxFQUFDLENBQUMsQ0FDbENxQyxRQUFRLENBQUN3RCxjQUFjLENBQUM7TUFFNUIsSUFBSTdGLFFBQVEsS0FBSyxJQUFJLENBQUNrQixLQUFLLENBQUM1SSxJQUFJLENBQUMwSCxRQUFRLEVBQUU7UUFDeEMwRyxNQUFNLENBQUMxRixZQUFZLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQztNQUN4QztJQUNILENBQUMsQ0FBQztFQUNMO0VBRUE4SixjQUFjQSxDQUFDRixJQUFJLEVBQUU7SUFDbEIsTUFBTXZLLFNBQVMsR0FBR3RLLGlFQUFhLENBQUMsVUFBVSxDQUFDLENBQ3ZDMkssYUFBYSxDQUFDO01BQ1ppQyxLQUFLLEVBQUU7SUFDVixDQUFDLENBQUMsQ0FDRHpKLFFBQVEsQ0FBQztNQUNQQyxNQUFNLEVBQUU7UUFBRThHLFFBQVEsRUFBRSxXQUFXO1FBQUVoRixLQUFLLEVBQUU7TUFBaUIsQ0FBQztNQUMxRDdCLEtBQUssRUFBRTtRQUFFQyxJQUFJLEVBQUUsZ0JBQWdCO1FBQUVDLElBQUksRUFBRSxJQUFJLENBQUM0SCxLQUFLLENBQUM1SSxJQUFJLENBQUMrSDtNQUFVO0lBQ3BFLENBQUMsQ0FBQyxDQUNEZ0MsUUFBUSxDQUFDdUksSUFBSSxDQUFDO0lBRWxCLE1BQU1LLGNBQWMsR0FBRzVLLFNBQVMsQ0FBQzZLLGdCQUFnQixDQUM5Qyw0QkFDSCxDQUFDO0lBRURELGNBQWMsQ0FBQzNQLE9BQU8sQ0FBRTBDLElBQUksSUFBSztNQUM5QixJQUFJQSxJQUFJLENBQUNsRixRQUFRLENBQUMsQ0FBQyxDQUFDd0gsT0FBTyxFQUFFdEMsSUFBSSxDQUFDZ0QsWUFBWSxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUM7SUFDaEUsQ0FBQyxDQUFDO0VBQ0w7QUFDSDtBQUVBb0csY0FBYyxDQUFDQyxNQUFNLENBQUMsY0FBYyxFQUFFc0QsV0FBVyxDQUFDO0FBQ2xELGlFQUFlQSxXQUFXOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzVPc0I7QUFDZDtBQUNBO0FBQ3FCO0FBQ2Y7QUFDQTtBQUV4QyxNQUFNL1UsUUFBUSxTQUFTNFIsV0FBVyxDQUFDO0VBQ2hDOUMsaUJBQWlCQSxDQUFBLEVBQUc7SUFDakIsSUFBSSxDQUFDckQsTUFBTSxDQUFDLENBQUM7SUFDYixJQUFJLENBQUNzRCxpQkFBaUIsQ0FBQyxDQUFDO0VBQzNCO0VBRUF0RCxNQUFNQSxDQUFBLEVBQUc7SUFDTixNQUFNZ0ssV0FBVyxHQUFHLElBQUk3RyxvREFBVyxDQUFDO01BQ2pDM00sUUFBUSxFQUFFLElBQUksQ0FBQ3FKLEtBQUssQ0FBQ3JKLFFBQVE7TUFDN0JILFVBQVUsRUFBRSxJQUFJLENBQUN3SixLQUFLLENBQUN4SixVQUFVO01BQ2pDcUUsYUFBYSxFQUFFLElBQUksQ0FBQ21GLEtBQUssQ0FBQ25GO0lBQzdCLENBQUMsQ0FBQztJQUNGLElBQUksQ0FBQ3lHLE9BQU8sQ0FBQzZJLFdBQVcsQ0FBQztJQUV6QixNQUFNQyxjQUFjLEdBQUd2VixpRUFBYSxDQUFDLEtBQUssQ0FBQyxDQUN2QzJLLGFBQWEsQ0FBQztNQUFFaUMsS0FBSyxFQUFFO0lBQWtCLENBQUMsQ0FBQyxDQUMzQ04sUUFBUSxDQUFDLElBQUksQ0FBQztJQUNsQixJQUFJLENBQUNrSixhQUFhLENBQUNELGNBQWMsQ0FBQztJQUVsQyxNQUFNRSxjQUFjLEdBQUd6VixpRUFBYSxDQUFDLEtBQUssQ0FBQyxDQUN2QzJLLGFBQWEsQ0FBQztNQUFFaUMsS0FBSyxFQUFFO0lBQWtCLENBQUMsQ0FBQyxDQUMzQ04sUUFBUSxDQUFDLElBQUksQ0FBQztJQUVsQixJQUFJLENBQUNuQixLQUFLLENBQUM1RSxLQUFLLENBQUNoQixPQUFPLENBQUVoRCxJQUFJLElBQUs7TUFDaEMsTUFBTW1ULFFBQVEsR0FBRyxJQUFJLENBQUNDLFlBQVksQ0FBQ3BULElBQUksQ0FBQztNQUN4QyxJQUFJLENBQUNtVCxRQUFRLEVBQUU7UUFDWjtNQUNIO01BQ0FELGNBQWMsQ0FBQy9ULFdBQVcsQ0FBQ2dVLFFBQVEsQ0FBQztJQUN2QyxDQUFDLENBQUM7SUFFRixNQUFNdFMsTUFBTSxHQUFHcEQsaUVBQWEsQ0FBQyxRQUFRLENBQUMsQ0FDbENnTSxVQUFVLENBQUUsYUFBWSxDQUFDLENBQ3pCYyxrQkFBa0IsQ0FBQyxDQUFDLENBQ3BCbkMsYUFBYSxDQUFDO01BQUVpQyxLQUFLLEVBQUU7SUFBUyxDQUFDLENBQUMsQ0FDbENKLFNBQVMsQ0FBQyxJQUFJLENBQUM7SUFFbkIsSUFBSWhMLFFBQVEsQ0FBQ3VDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFO01BQzdDWCxNQUFNLENBQUM0SSxVQUFVLENBQ2IsSUFBR3hLLFFBQVEsQ0FBQ3VDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDbUksV0FBWSxFQUM5RCxDQUFDO0lBQ0o7SUFFQSxNQUFNMEosYUFBYSxHQUFHNVYsaUVBQWEsQ0FBQyxRQUFRLENBQUMsQ0FDekMySyxhQUFhLENBQUM7TUFBRWlDLEtBQUssRUFBRTtJQUFrQixDQUFDLENBQUMsQ0FDM0NGLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUM5QkYsU0FBUyxDQUFDcEosTUFBTSxDQUFDO0lBRXJCLE1BQU15UyxpQkFBaUIsR0FBRzdWLGlFQUFhLENBQUMsS0FBSyxDQUFDLENBQzFDMkssYUFBYSxDQUFDO01BQUVpQyxLQUFLLEVBQUU7SUFBc0IsQ0FBQyxDQUFDLENBQy9DTixRQUFRLENBQUMsSUFBSSxDQUFDO0lBRWxCLE1BQU13SixlQUFlLEdBQUc5VixpRUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUMzQzJLLGFBQWEsQ0FBQztNQUFFaUMsS0FBSyxFQUFFO0lBQXFCLENBQUMsQ0FBQyxDQUM5Q0YsVUFBVSxDQUFDLGtCQUFrQixDQUFDLENBQzlCSixRQUFRLENBQUN1SixpQkFBaUIsQ0FBQztFQUNsQztFQUVBakgsaUJBQWlCQSxDQUFBLEVBQUc7SUFDakIsSUFBSSxDQUFDaUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFHckYsRUFBRSxJQUFLO01BQ3BDLElBQUlBLEVBQUUsQ0FBQ3VGLE1BQU0sQ0FBQ2dGLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFO1FBQ3hDOVUsNkRBQWMsQ0FBQyxpQkFBaUIsQ0FBQztNQUNwQztNQUNBLElBQUl1SyxFQUFFLENBQUN1RixNQUFNLENBQUNnRixPQUFPLENBQUMscUJBQXFCLENBQUMsRUFBRTtRQUMzQyxJQUFJLENBQUNoUyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUNDLEtBQUssQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQ2dTLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO01BQ3RCO0lBQ0gsQ0FBQyxDQUFDO0lBRUYsSUFBSSxDQUFDbkYsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLE1BQU07TUFDbkMsTUFBTW9GLFFBQVEsR0FBRyxJQUFJLENBQUNsUyxhQUFhLENBQUMscUJBQXFCLENBQUM7TUFDMUQsSUFBSSxJQUFJLENBQUNtUyxTQUFTLEdBQUcsRUFBRSxFQUFFO1FBQ3RCRCxRQUFRLENBQUNFLEtBQUssQ0FBQ0MsT0FBTyxHQUFHLE9BQU87TUFDbkMsQ0FBQyxNQUFNO1FBQ0pILFFBQVEsQ0FBQ0UsS0FBSyxDQUFDQyxPQUFPLEdBQUcsTUFBTTtNQUNsQztJQUNILENBQUMsQ0FBQztFQUNMO0VBRUF4UCxVQUFVQSxDQUFDckUsSUFBSSxFQUFFO0lBQ2QsTUFBTThULFdBQVcsR0FBRyxJQUFJLENBQUNWLFlBQVksQ0FBQ3BULElBQUksQ0FBQztJQUMzQyxNQUFNK1QsWUFBWSxHQUFHLElBQUksQ0FBQ3ZTLGFBQWEsQ0FBRSxxQkFBb0J4QixJQUFJLENBQUM0QyxFQUFHLEdBQUUsQ0FBQztJQUV4RSxJQUFJLENBQUNwQixhQUFhLENBQUMsa0JBQWtCLENBQUMsQ0FBQ3dTLFlBQVksQ0FDaERGLFdBQVcsRUFDWEMsWUFDSCxDQUFDO0VBQ0o7RUFFQVgsWUFBWUEsQ0FBQ3BULElBQUksRUFBRTtJQUNoQixNQUFNOEgsV0FBVyxHQUFHLElBQUksQ0FBQ2MsS0FBSyxDQUFDckosUUFBUSxDQUFDOEQsSUFBSSxDQUN4Q0osT0FBTyxJQUFLQSxPQUFPLENBQUNMLEVBQUUsS0FBSzVDLElBQUksQ0FBQ3NFLFNBQ3BDLENBQUM7SUFDRCxJQUFJd0QsV0FBVyxFQUFFO01BQ2QsTUFBTTFFLGVBQWUsR0FBRyxJQUFJLENBQUN3RixLQUFLLENBQUN4SixVQUFVLENBQUNpRSxJQUFJLENBQzlDQyxRQUFRLElBQUtBLFFBQVEsQ0FBQ1YsRUFBRSxLQUFLa0YsV0FBVyxDQUFDM0YsVUFDN0MsQ0FBQztNQUVERixNQUFNLENBQUNDLE1BQU0sQ0FBQ2xDLElBQUksRUFBRTtRQUNqQjhILFdBQVcsRUFBRUEsV0FBVyxDQUFDbkYsS0FBSztRQUM5QlMsZUFBZSxFQUFFQSxlQUFlLENBQUNUO01BQ3BDLENBQUMsQ0FBQztJQUNMLENBQUMsTUFBTTtNQUNKVixNQUFNLENBQUNDLE1BQU0sQ0FBQ2xDLElBQUksRUFBRTtRQUNqQjhILFdBQVcsRUFBRSxFQUFFO1FBQ2YxRSxlQUFlLEVBQUU7TUFDcEIsQ0FBQyxDQUFDO0lBQ0w7SUFDQSxNQUFNNlEsT0FBTyxHQUFHeFcsaUVBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQ21ELFFBQVEsQ0FBQ1osSUFBSSxDQUFDO0lBRXpELE9BQU9pVSxPQUFPO0VBQ2pCO0VBRUEvUCxVQUFVQSxDQUFDbkUsTUFBTSxFQUFFO0lBQ2hCLE1BQU1tVSxJQUFJLEdBQUcsSUFBSSxDQUFDMVMsYUFBYSxDQUFFLHFCQUFvQnpCLE1BQU8sR0FBRSxDQUFDO0lBQy9ELElBQUltVSxJQUFJLEVBQUUsSUFBSSxDQUFDcEssV0FBVyxDQUFDb0ssSUFBSSxDQUFDO0VBQ25DO0VBRUFqQixhQUFhQSxDQUFDRCxjQUFjLEVBQUU7SUFDM0IsTUFBTW1CLGNBQWMsR0FBRyxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUM7SUFDL0MsTUFBTUMsV0FBVyxHQUFHM1csaUVBQWEsQ0FBQyxLQUFLLENBQUMsQ0FDcENnTSxVQUFVLENBQUMsVUFBVSxDQUFDLENBQ3RCckIsYUFBYSxDQUFDO01BQUVpQyxLQUFLLEVBQUU7SUFBbUIsQ0FBQyxDQUFDLENBQzVDTixRQUFRLENBQUNpSixjQUFjLENBQUM7SUFFNUJtQixjQUFjLENBQUNuUixPQUFPLENBQUVvTCxNQUFNLElBQUs7TUFDaEMsTUFBTWlHLFNBQVMsR0FBRzVXLGlFQUFhLENBQUMsS0FBSyxDQUFDLENBQUMySyxhQUFhLENBQUM7UUFDbERpQyxLQUFLLEVBQUU7TUFDVixDQUFDLENBQUM7TUFFRixNQUFNaUssV0FBVyxHQUFHN1csaUVBQWEsQ0FBQyxPQUFPLENBQUMsQ0FDdEMySyxhQUFhLENBQUM7UUFDWnJILElBQUksRUFBRSxPQUFPO1FBQ2I2QixFQUFFLEVBQUV3TCxNQUFNO1FBQ1Y3QixJQUFJLEVBQUUsZ0JBQWdCO1FBQ3RCMUosS0FBSyxFQUFFdUw7TUFDVixDQUFDLENBQUMsQ0FDRHJFLFFBQVEsQ0FBQ3NLLFNBQVMsQ0FBQztNQUV2QkMsV0FBVyxDQUFDaEcsZ0JBQWdCLENBQUMsUUFBUSxFQUFHNUMsS0FBSyxJQUFLO1FBQy9DLElBQUlBLEtBQUssQ0FBQzhDLE1BQU0sQ0FBQ3hHLE9BQU8sRUFBRTtVQUN2QnRKLDZEQUFjLENBQUMsaUJBQWlCLEVBQUVnTixLQUFLLENBQUM4QyxNQUFNLENBQUMzTCxLQUFLLENBQUM7UUFDeEQ7TUFDSCxDQUFDLENBQUM7TUFFRixJQUFJeVIsV0FBVyxDQUFDelIsS0FBSyxLQUFLLElBQUksQ0FBQytGLEtBQUssQ0FBQ3BGLFdBQVcsRUFBRTtRQUMvQzhRLFdBQVcsQ0FBQ3RNLE9BQU8sR0FBRyxJQUFJO01BQzdCO01BRUF2SyxpRUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUNsQjJLLGFBQWEsQ0FBQztRQUFFbU0sR0FBRyxFQUFFbkc7TUFBTyxDQUFDLENBQUMsQ0FDOUIzRSxVQUFVLENBQUMyRSxNQUFNLENBQUMsQ0FDbEI3RCxrQkFBa0IsQ0FBQyxDQUFDLENBQ3BCUixRQUFRLENBQUNzSyxTQUFTLENBQUM7TUFFdkJELFdBQVcsQ0FBQ2pWLFdBQVcsQ0FBQ2tWLFNBQVMsQ0FBQztJQUNyQyxDQUFDLENBQUM7SUFFRixJQUNHLElBQUksQ0FBQ3pMLEtBQUssQ0FBQ25GLGFBQWEsQ0FBQzFDLElBQUksS0FBSyxNQUFNLElBQ3hDLElBQUksQ0FBQzZILEtBQUssQ0FBQ25GLGFBQWEsQ0FBQzFDLElBQUksS0FBSyxZQUFZLEVBQy9DO01BQ0MsTUFBTXlULGdCQUFnQixHQUFHL1csaUVBQWEsQ0FBQyxLQUFLLENBQUMsQ0FDekMySyxhQUFhLENBQUM7UUFBRWlDLEtBQUssRUFBRTtNQUFxQixDQUFDLENBQUMsQ0FDOUNOLFFBQVEsQ0FBQ2lKLGNBQWMsQ0FBQztNQUU1QnZWLGlFQUFhLENBQUMsTUFBTSxDQUFDLENBQ2pCZ00sVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUMzQnJCLGFBQWEsQ0FBQztRQUFFaUMsS0FBSyxFQUFFO01BQTJCLENBQUMsQ0FBQyxDQUNwRE4sUUFBUSxDQUFDeUssZ0JBQWdCLENBQUM7TUFFOUIvVyxpRUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUNuQjJLLGFBQWEsQ0FBQztRQUFFaUMsS0FBSyxFQUFFO01BQWUsQ0FBQyxDQUFDLENBQ3hDRixVQUFVLENBQUMsd0JBQXdCLENBQUMsQ0FDcENKLFFBQVEsQ0FBQ3lLLGdCQUFnQixDQUFDO01BRTlCLE1BQU10RyxLQUFLLEdBQUd6USxpRUFBYSxDQUFDLEtBQUssQ0FBQyxDQUM5QjJLLGFBQWEsQ0FBQztRQUFFaUMsS0FBSyxFQUFFO01BQVEsQ0FBQyxDQUFDLENBQ2pDTixRQUFRLENBQUN5SyxnQkFBZ0IsQ0FBQztNQUM5QixJQUFJLElBQUksQ0FBQzVMLEtBQUssQ0FBQ25GLGFBQWEsQ0FBQzFDLElBQUksS0FBSyxZQUFZLEVBQUU7UUFDakR0RCxpRUFBYSxDQUFDLEtBQUssQ0FBQyxDQUNoQmdNLFVBQVUsQ0FDUnFKLG9EQUFNLENBQUMsSUFBSSxDQUFDbEssS0FBSyxDQUFDbkYsYUFBYSxDQUFDWixLQUFLLENBQUN1TyxLQUFLLEVBQUUsZ0JBQWdCLENBQ2hFLENBQUMsQ0FDQXJILFFBQVEsQ0FBQ21FLEtBQUssQ0FBQztRQUNuQnpRLGlFQUFhLENBQUMsS0FBSyxDQUFDLENBQ2hCZ00sVUFBVSxDQUNScUosb0RBQU0sQ0FBQyxJQUFJLENBQUNsSyxLQUFLLENBQUNuRixhQUFhLENBQUNaLEtBQUssQ0FBQ3dPLEdBQUcsRUFBRSxnQkFBZ0IsQ0FDOUQsQ0FBQyxDQUNBdEgsUUFBUSxDQUFDbUUsS0FBSyxDQUFDO01BQ3RCO01BQ0EsSUFBSSxJQUFJLENBQUN0RixLQUFLLENBQUNuRixhQUFhLENBQUMxQyxJQUFJLEtBQUssTUFBTSxFQUFFO1FBQzNDdEQsaUVBQWEsQ0FBQyxLQUFLLENBQUMsQ0FDaEJnTSxVQUFVLENBQ1JxSixvREFBTSxDQUFDLElBQUksQ0FBQ2xLLEtBQUssQ0FBQ25GLGFBQWEsQ0FBQ1osS0FBSyxFQUFFLGdCQUFnQixDQUMxRCxDQUFDLENBQ0FrSCxRQUFRLENBQUNtRSxLQUFLLENBQUM7TUFDdEI7TUFFQXpRLGlFQUFhLENBQUMsUUFBUSxDQUFDLENBQ25CMkssYUFBYSxDQUFDO1FBQUVpQyxLQUFLLEVBQUU7TUFBVyxDQUFDLENBQUMsQ0FDcENGLFVBQVUsQ0FBQyx5QkFBeUIsQ0FBQyxDQUNyQ0osUUFBUSxDQUFDeUssZ0JBQWdCLENBQUM7TUFFOUJBLGdCQUFnQixDQUFDbEcsZ0JBQWdCLENBQUMsT0FBTyxFQUFHNUMsS0FBSyxJQUFLO1FBQ25ELElBQUlBLEtBQUssQ0FBQzhDLE1BQU0sQ0FBQ25GLFNBQVMsQ0FBQ29GLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRTtVQUM5QyxJQUFJLElBQUksQ0FBQzdGLEtBQUssQ0FBQ25GLGFBQWEsQ0FBQzFDLElBQUksS0FBSyxZQUFZLEVBQUU7WUFDakQsSUFBSSxDQUFDNkgsS0FBSyxDQUFDbkYsYUFBYSxDQUFDWixLQUFLLENBQUN1TyxLQUFLLENBQUNxRCxPQUFPLENBQ3pDLElBQUksQ0FBQzdMLEtBQUssQ0FBQ25GLGFBQWEsQ0FBQ1osS0FBSyxDQUFDdU8sS0FBSyxDQUFDc0QsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUNwRCxDQUFDO1lBQ0QsSUFBSSxDQUFDOUwsS0FBSyxDQUFDbkYsYUFBYSxDQUFDWixLQUFLLENBQUN3TyxHQUFHLENBQUNvRCxPQUFPLENBQ3ZDLElBQUksQ0FBQzdMLEtBQUssQ0FBQ25GLGFBQWEsQ0FBQ1osS0FBSyxDQUFDd08sR0FBRyxDQUFDcUQsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUNsRCxDQUFDO1VBQ0o7VUFDQSxJQUFJLElBQUksQ0FBQzlMLEtBQUssQ0FBQ25GLGFBQWEsQ0FBQzFDLElBQUksS0FBSyxNQUFNLEVBQUU7WUFDM0MsSUFBSSxDQUFDNkgsS0FBSyxDQUFDbkYsYUFBYSxDQUFDWixLQUFLLENBQUM0UixPQUFPLENBQ25DLElBQUksQ0FBQzdMLEtBQUssQ0FBQ25GLGFBQWEsQ0FBQ1osS0FBSyxDQUFDNlIsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUM5QyxDQUFDO1VBQ0o7UUFDSDtRQUVBLElBQUloSixLQUFLLENBQUM4QyxNQUFNLENBQUNuRixTQUFTLENBQUNvRixRQUFRLENBQUMsY0FBYyxDQUFDLEVBQUU7VUFDbEQsSUFBSSxJQUFJLENBQUM3RixLQUFLLENBQUNuRixhQUFhLENBQUMxQyxJQUFJLEtBQUssWUFBWSxFQUFFO1lBQ2pELElBQUksQ0FBQzZILEtBQUssQ0FBQ25GLGFBQWEsQ0FBQ1osS0FBSyxDQUFDdU8sS0FBSyxDQUFDcUQsT0FBTyxDQUN6QyxJQUFJLENBQUM3TCxLQUFLLENBQUNuRixhQUFhLENBQUNaLEtBQUssQ0FBQ3VPLEtBQUssQ0FBQ3NELE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FDcEQsQ0FBQztZQUNELElBQUksQ0FBQzlMLEtBQUssQ0FBQ25GLGFBQWEsQ0FBQ1osS0FBSyxDQUFDd08sR0FBRyxDQUFDb0QsT0FBTyxDQUN2QyxJQUFJLENBQUM3TCxLQUFLLENBQUNuRixhQUFhLENBQUNaLEtBQUssQ0FBQ3dPLEdBQUcsQ0FBQ3FELE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FDbEQsQ0FBQztVQUNKO1VBQ0EsSUFBSSxJQUFJLENBQUM5TCxLQUFLLENBQUNuRixhQUFhLENBQUMxQyxJQUFJLEtBQUssTUFBTSxFQUFFO1lBQzNDLElBQUksQ0FBQzZILEtBQUssQ0FBQ25GLGFBQWEsQ0FBQ1osS0FBSyxDQUFDNFIsT0FBTyxDQUNuQyxJQUFJLENBQUM3TCxLQUFLLENBQUNuRixhQUFhLENBQUNaLEtBQUssQ0FBQzZSLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FDOUMsQ0FBQztVQUNKO1FBQ0g7UUFFQWhXLDZEQUFjLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDa0ssS0FBSyxDQUFDbkYsYUFBYSxDQUFDO01BQzdELENBQUMsQ0FBQztJQUNMO0VBQ0g7QUFDSDtBQUNBcUwsY0FBYyxDQUFDQyxNQUFNLENBQUMsV0FBVyxFQUFFelIsUUFBUSxDQUFDO0FBRTVDLGlFQUFlQSxRQUFROzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzUHlCO0FBQ1I7QUFDZTtBQUNIO0FBRXBELE1BQU1FLE9BQU8sU0FBUzBSLFdBQVcsQ0FBQztFQUMvQjlDLGlCQUFpQkEsQ0FBQSxFQUFHO0lBQ2pCMEQsaUVBQVcsQ0FBQyxJQUFJLENBQUM7SUFDakIsSUFBSSxDQUFDekQsaUJBQWlCLENBQUMsQ0FBQztFQUMzQjtFQUVBbk0sZUFBZUEsQ0FBQ3lVLGFBQWEsRUFBRTtJQUM1QixJQUFJMVYsUUFBUSxDQUFDQyxjQUFjLENBQUMsY0FBYyxDQUFDLEVBQUU7TUFDMUNELFFBQVEsQ0FBQ0MsY0FBYyxDQUFDLGNBQWMsQ0FBQyxDQUFDMEIsUUFBUSxDQUFDK1QsYUFBYSxDQUFDO01BQy9EO0lBQ0g7SUFDQSxNQUFNQyxXQUFXLEdBQUduWCxpRUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUM3Q21ELFFBQVEsQ0FBQytULGFBQWEsQ0FBQyxDQUN2QjVLLFFBQVEsQ0FBQyxJQUFJLENBQUM7RUFDckI7RUFFQWpLLGFBQWFBLENBQUEsRUFBRztJQUNiLElBQUksQ0FBQ3VRLGVBQWUsQ0FBQyxjQUFjLENBQUM7RUFDdkM7RUFFQWhFLGlCQUFpQkEsQ0FBQSxFQUFHO0lBQ2pCd0ksTUFBTSxDQUFDdkcsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLE1BQU07TUFDckMsSUFBSSxJQUFJLENBQUN3RyxXQUFXLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQ3JTLFlBQVksQ0FBQyxjQUFjLENBQUMsRUFBRTtRQUMvRCxJQUFJLENBQUNvTCxlQUFlLENBQUMsY0FBYyxDQUFDO01BQ3ZDO0lBQ0gsQ0FBQyxDQUFDO0VBQ0w7QUFDSDtBQUVBaUIsY0FBYyxDQUFDQyxNQUFNLENBQUMsVUFBVSxFQUFFdlIsT0FBTyxDQUFDO0FBRTFDLGlFQUFlQSxPQUFPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwQ3RCO0FBQ2dIO0FBQ2pCO0FBQy9GLDhCQUE4QixtRkFBMkIsQ0FBQyw0RkFBcUM7QUFDL0Y7QUFDQSxpdEJBQWl0QixlQUFlLGdCQUFnQixlQUFlLHFCQUFxQixtQkFBbUIsOEJBQThCLEdBQUcsd0pBQXdKLG9CQUFvQixHQUFHLFFBQVEsb0JBQW9CLEdBQUcsV0FBVyxzQkFBc0IsR0FBRyxrQkFBa0Isa0JBQWtCLEdBQUcsNkRBQTZELGlCQUFpQixtQkFBbUIsR0FBRyxTQUFTLCtCQUErQix1QkFBdUIsR0FBRyxTQUFTLDZGQUE2RixNQUFNLHFGQUFxRixXQUFXLFVBQVUsVUFBVSxVQUFVLFVBQVUsWUFBWSxNQUFNLFlBQVksZ0JBQWdCLFVBQVUsTUFBTSxLQUFLLFVBQVUsTUFBTSxNQUFNLFlBQVksTUFBTSxNQUFNLFVBQVUsS0FBSyxRQUFRLFVBQVUsVUFBVSxNQUFNLEtBQUssWUFBWSxhQUFhLGlzQkFBaXNCLGVBQWUsZ0JBQWdCLGVBQWUscUJBQXFCLG1CQUFtQiw4QkFBOEIsR0FBRyx3SkFBd0osb0JBQW9CLEdBQUcsUUFBUSxvQkFBb0IsR0FBRyxXQUFXLHNCQUFzQixHQUFHLGtCQUFrQixrQkFBa0IsR0FBRyw2REFBNkQsaUJBQWlCLG1CQUFtQixHQUFHLFNBQVMsK0JBQStCLHVCQUF1QixHQUFHLHFCQUFxQjtBQUN2OEY7QUFDQSxpRUFBZSx1QkFBdUIsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1B2QztBQUNnSDtBQUNqQjtBQUMvRiw4QkFBOEIsbUZBQTJCLENBQUMsNEZBQXFDO0FBQy9GLGdHQUFnRztBQUNoRyx3SEFBd0g7QUFDeEg7QUFDQSw2Q0FBNkMsZUFBZSxnQkFBZ0IsNEJBQTRCLCtDQUErQyxHQUFHLFdBQVcsd0JBQXdCLHVCQUF1QixxQkFBcUIsdUJBQXVCLHNCQUFzQix3QkFBd0IseUJBQXlCLHNCQUFzQixxQkFBcUIsb0JBQW9CLHNCQUFzQixxQkFBcUIsd0JBQXdCLEdBQUcsVUFBVSxtQkFBbUIsc0JBQXNCLEdBQUcsY0FBYyxtQkFBbUIsc0NBQXNDLDRCQUE0Qiw0QkFBNEIsNEJBQTRCLDhCQUE4Qix5QkFBeUIsc0NBQXNDLEdBQUcsZUFBZSxtQkFBbUIscUNBQXFDLG1CQUFtQiw4QkFBOEIsMEJBQTBCLGlCQUFpQiw4QkFBOEIsMkJBQTJCLDBCQUEwQixvQkFBb0IsdUJBQXVCLHdCQUF3QixHQUFHLHlCQUF5Qiw0QkFBNEIsc0NBQXNDLG1CQUFtQixrQkFBa0IsaUJBQWlCLCtDQUErQyxxQkFBcUIsMkJBQTJCLHVCQUF1QixHQUFHLDBCQUEwQiw2QkFBNkIsbUJBQW1CLGtCQUFrQixzQkFBc0IsMEJBQTBCLHlCQUF5QixrQkFBa0IsR0FBRyxzQkFBc0IsbUJBQW1CLDZCQUE2QixlQUFlLHFCQUFxQix5QkFBeUIseUJBQXlCLG9DQUFvQyxHQUFHLHVCQUF1QixtQkFBbUIsaUJBQWlCLHlCQUF5QixHQUFHLHFCQUFxQix3QkFBd0IsR0FBRywyQkFBMkIscUJBQXFCLHlCQUF5Qix3QkFBd0Isb0JBQW9CLG1CQUFtQix5QkFBeUIsbUNBQW1DLHVCQUF1QiwyQkFBMkIsR0FBRyx5Q0FBeUMsbUJBQW1CLHdCQUF3QixHQUFHLHlEQUF5RCxtQ0FBbUMsc0NBQXNDLDJCQUEyQixHQUFHLHlCQUF5QixtQkFBbUIsaUJBQWlCLHlCQUF5QixHQUFHLGdDQUFnQyxtQkFBbUIsNEJBQTRCLG1DQUFtQyxxQkFBcUIsNEJBQTRCLHdCQUF3QixHQUFHLGdDQUFnQyxtQkFBbUIsaUJBQWlCLEdBQUcsb0NBQW9DLHFCQUFxQixtQkFBbUIsNkJBQTZCLEdBQUcsc0JBQXNCLDZCQUE2QixtQkFBbUIsaUJBQWlCLEdBQUcsZUFBZSw2QkFBNkIsbUJBQW1CLHlCQUF5QiwyREFBMkQsa0JBQWtCLDBCQUEwQiwyQkFBMkIsbUNBQW1DLHVCQUF1QixHQUFHLHFCQUFxQixxQ0FBcUMscUJBQXFCLG1DQUFtQyxrRkFBa0YsR0FBRyx3QkFBd0IscUNBQXFDLEdBQUcsa0VBQWtFLG1CQUFtQix5QkFBeUIsNEJBQTRCLGlCQUFpQixHQUFHLG9CQUFvQix1QkFBdUIseUJBQXlCLDRCQUE0Qix3QkFBd0IscUJBQXFCLHlCQUF5QixzQkFBc0IsNkJBQTZCLHFDQUFxQyxHQUFHLHNCQUFzQix1QkFBdUIsR0FBRyxvQ0FBb0MsZ0JBQWdCLEdBQUcsb0NBQW9DLG1CQUFtQixHQUFHLG9DQUFvQyxrQkFBa0IsR0FBRyxvQ0FBb0MsaUJBQWlCLEdBQUcsc0JBQXNCLHVCQUF1QixHQUFHLDRCQUE0Qiw0QkFBNEIsK0NBQStDLHFCQUFxQix5QkFBeUIsc0JBQXNCLDZCQUE2Qiw0QkFBNEIsR0FBRyx5RUFBeUUscUJBQXFCLG9CQUFvQixtQkFBbUIscUJBQXFCLDhDQUE4QyxtQkFBbUIseUJBQXlCLDZCQUE2QiwyQkFBMkIsR0FBRyx5QkFBeUIseUJBQXlCLEdBQUcsdUJBQXVCLHlCQUF5QixHQUFHLHdLQUF3SywrQkFBK0IscUNBQXFDLHNDQUFzQywyQkFBMkIsR0FBRyxxQ0FBcUMsd0JBQXdCLGdCQUFnQixxQkFBcUIsZUFBZSxjQUFjLEdBQUcsZ0JBQWdCLHlCQUF5QixHQUFHLGdEQUFnRCxpQkFBaUIsZ0JBQWdCLG1CQUFtQixtQkFBbUIseUJBQXlCLHFDQUFxQyw4QkFBOEIsdUNBQXVDLEdBQUcsdUJBQXVCLG1CQUFtQix5QkFBeUIsd0JBQXdCLG9CQUFvQix1QkFBdUIsaURBQWlELHFCQUFxQix5QkFBeUIsR0FBRywyQ0FBMkMsd0NBQXdDLDZCQUE2QixvQ0FBb0MseUJBQXlCLEdBQUcseUNBQXlDLHdDQUF3Qyw2QkFBNkIsa0NBQWtDLHVCQUF1QixHQUFHLHlDQUF5Qyx3Q0FBd0MsNkJBQTZCLG1DQUFtQyx3QkFBd0IsR0FBRyxvQkFBb0IsaUNBQWlDLG1CQUFtQiwwQ0FBMEMseUJBQXlCLHFCQUFxQiwyQkFBMkIsbUNBQW1DLHdCQUF3Qiw4QkFBOEIsR0FBRywrQkFBK0IsbUJBQW1CLGtCQUFrQixHQUFHLFlBQVksbUJBQW1CLHlCQUF5Qiw2QkFBNkIsaUJBQWlCLHFCQUFxQixHQUFHLGtCQUFrQiw2QkFBNkIsR0FBRyxPQUFPLDBCQUEwQixHQUFHLG9EQUFvRCxnQkFBZ0IsbUJBQW1CLHlCQUF5QixrQkFBa0IsbUNBQW1DLEdBQUcseUNBQXlDLHlCQUF5Qix1QkFBdUIsK0NBQStDLDJCQUEyQixzQkFBc0IsR0FBRywrQ0FBK0Msa0JBQWtCLHVCQUF1QiwrQ0FBK0MsR0FBRyx1Q0FBdUMsb0JBQW9CLEdBQUcsNkdBQTZHLDRCQUE0Qix5QkFBeUIsa0JBQWtCLHNDQUFzQyxxQkFBcUIsb0JBQW9CLCtDQUErQyxxQkFBcUIsMkJBQTJCLHlCQUF5QixHQUFHLGdFQUFnRSxtQkFBbUIseUJBQXlCLGtCQUFrQixxQ0FBcUMsc0JBQXNCLHFCQUFxQixrQkFBa0IsMkJBQTJCLCtDQUErQyxxQkFBcUIseUJBQXlCLHNCQUFzQiw2QkFBNkIsR0FBRyxzQ0FBc0MsbUJBQW1CLHFCQUFxQixlQUFlLEdBQUcscURBQXFELG1CQUFtQixHQUFHLG9EQUFvRCx1QkFBdUIsbUJBQW1CLDBDQUEwQyxlQUFlLEdBQUcsK0JBQStCLHNCQUFzQixHQUFHLGdEQUFnRCxtQkFBbUIsR0FBRyxrREFBa0QsbUJBQW1CLEdBQUcsZ0NBQWdDLHFCQUFxQix5QkFBeUIsOENBQThDLHlCQUF5QixHQUFHLGNBQWMsbUJBQW1CLG1CQUFtQix3Q0FBd0MsaUJBQWlCLDBCQUEwQixtQ0FBbUMsb0JBQW9CLGdCQUFnQixHQUFHLGFBQWEsZ0JBQWdCLHNCQUFzQix1QkFBdUIsWUFBWSxpQkFBaUIsbUJBQW1CLHlCQUF5QixlQUFlLDJCQUEyQiwrQ0FBK0MsK0JBQStCLEdBQUcsc0JBQXNCLG9DQUFvQyx1QkFBdUIsR0FBRyw0QkFBNEIsbUJBQW1CLGlCQUFpQix3Q0FBd0MsdUJBQXVCLDJCQUEyQixrQ0FBa0MsbUNBQW1DLDBDQUEwQyxnQ0FBZ0MsdUNBQXVDLGdFQUFnRSxHQUFHLGtDQUFrQyx1QkFBdUIsR0FBRywrREFBK0QsaUJBQWlCLEdBQUcsbUVBQW1FLDJCQUEyQix5QkFBeUIsR0FBRyxtRkFBbUYsNEJBQTRCLEdBQUcsa0JBQWtCLGlCQUFpQixtQkFBbUIsaURBQWlELDhCQUE4QiwwQkFBMEIsdUJBQXVCLGlCQUFpQixzQkFBc0IsR0FBRywyQkFBMkIsbUJBQW1CLDRCQUE0QixzQkFBc0IsR0FBRyw4QkFBOEIsd0NBQXdDLG1CQUFtQixpQkFBaUIsc0JBQXNCLHdCQUF3Qix5QkFBeUIsc0NBQXNDLEdBQUcsd0VBQXdFLHFCQUFxQixtQkFBbUIseUJBQXlCLDJCQUEyQix3QkFBd0IscUJBQXFCLGtCQUFrQix1QkFBdUIsMkJBQTJCLGlCQUFpQix5QkFBeUIsc0JBQXNCLDZCQUE2QixHQUFHLDZCQUE2Qix3QkFBd0IseUJBQXlCLHlCQUF5QixzQkFBc0IsNkJBQTZCLEdBQUcseUJBQXlCLHFDQUFxQyxzQ0FBc0MsR0FBRywrQkFBK0IscUNBQXFDLEdBQUcsa0NBQWtDLG1CQUFtQixpQkFBaUIsR0FBRyx3REFBd0QscUNBQXFDLEdBQUcsK0JBQStCLG1CQUFtQixpQkFBaUIsZ0JBQWdCLHdCQUF3QixlQUFlLEdBQUcsdUNBQXVDLGdCQUFnQixHQUFHLHFDQUFxQyxnQkFBZ0IsR0FBRyx5REFBeUQsMkJBQTJCLGlCQUFpQixtQ0FBbUMsMkJBQTJCLG9CQUFvQixtQkFBbUIsb0NBQW9DLEdBQUcsMERBQTBELGtDQUFrQyx5QkFBeUIscUNBQXFDLGlCQUFpQiwyQkFBMkIsbUJBQW1CLDhCQUE4QixrQkFBa0IsMEJBQTBCLEdBQUcsb0VBQW9FLCtCQUErQixHQUFHLDJCQUEyQixtQkFBbUIsNEJBQTRCLEdBQUcsb0NBQW9DLG1CQUFtQiw0QkFBNEIsY0FBYywyQkFBMkIsOENBQThDLHFCQUFxQixrQkFBa0IsK0NBQStDLHFCQUFxQiwyQkFBMkIsZUFBZSxHQUFHLDBDQUEwQyxxQ0FBcUMsNEJBQTRCLEdBQUcsaURBQWlELGtCQUFrQixHQUFHLHVDQUF1QyxlQUFlLEdBQUcsZ0NBQWdDLG1CQUFtQix1QkFBdUIsNEJBQTRCLDhDQUE4QywyQkFBMkIsaUJBQWlCLHlCQUF5QixHQUFHLCtCQUErQixrQ0FBa0MsR0FBRyxvQkFBb0Isb0RBQW9ELDRDQUE0QyxHQUFHLHdCQUF3Qix1QkFBdUIsb0JBQW9CLG1CQUFtQiwyQkFBMkIsOENBQThDLHdCQUF3QixHQUFHLDhCQUE4QixvQ0FBb0MsNkJBQTZCLEdBQUcsMERBQTBELG1CQUFtQixHQUFHLDBFQUEwRSxvQkFBb0IsR0FBRyx5R0FBeUcsbUJBQW1CLEdBQUcsZ0JBQWdCLHFDQUFxQyxtQkFBbUIsaURBQWlELGlCQUFpQiwwQkFBMEIsMkJBQTJCLG1CQUFtQixHQUFHLDRCQUE0QixxQkFBcUIsbUJBQW1CLHlCQUF5Qix3QkFBd0IscUJBQXFCLG9CQUFvQix1QkFBdUIsMkJBQTJCLEdBQUcsOERBQThELGdDQUFnQyxHQUFHLHFEQUFxRCwrQkFBK0IseUJBQXlCLHFDQUFxQyxpQkFBaUIsMkJBQTJCLG1CQUFtQiwrQkFBK0Isa0JBQWtCLDBCQUEwQixHQUFHLDJIQUEySCxtQkFBbUIsR0FBRyxpRUFBaUUsZ0JBQWdCLEdBQUcsNkJBQTZCLHNCQUFzQiw0Q0FBNEMsR0FBRyxvREFBb0QsbUNBQW1DLEdBQUcsa0JBQWtCLG1CQUFtQixnQkFBZ0IsbUJBQW1CLCtCQUErQixzQkFBc0IsdUNBQXVDLDBCQUEwQixtQ0FBbUMsMkJBQTJCLDBCQUEwQiwwQkFBMEIsb0JBQW9CLHdCQUF3QixrREFBa0QsR0FBRywwQkFBMEIsd0JBQXdCLEdBQUcsd0JBQXdCLHVCQUF1QixrQkFBa0Isd0JBQXdCLEdBQUcsdUJBQXVCLDJCQUEyQixtQkFBbUIsNEJBQTRCLGlCQUFpQix3QkFBd0IsR0FBRyxzRUFBc0UsbUJBQW1CLHlCQUF5QixrQkFBa0IscUNBQXFDLHFCQUFxQixzQkFBc0Isa0JBQWtCLDRCQUE0QiwyQkFBMkIsK0NBQStDLHFCQUFxQix5QkFBeUIsc0JBQXNCLDZCQUE2QixHQUFHLDJGQUEyRixnQkFBZ0IsbUJBQW1CLHlCQUF5QixrQkFBa0IsbUNBQW1DLEdBQUcsNENBQTRDLHVCQUF1QiwrQ0FBK0MsR0FBRyxrREFBa0Qsa0JBQWtCLHNCQUFzQiwrQ0FBK0MsR0FBRywwQkFBMEIsd0JBQXdCLEdBQUcseUJBQXlCLHVCQUF1Qix3QkFBd0IsbUJBQW1CLHlCQUF5Qiw4Q0FBOEMsR0FBRywwQ0FBMEMscUJBQXFCLHVCQUF1QixHQUFHLDZDQUE2QyxtQkFBbUIsYUFBYSxHQUFHLDhCQUE4QixTQUFTLE1BQU0sVUFBVSxvQ0FBb0MsTUFBTSxVQUFVLHFDQUFxQyxNQUFNLFdBQVcsTUFBTSxHQUFHLGdDQUFnQyx3RUFBd0UsR0FBRywyRUFBMkUsaUJBQWlCLGtCQUFrQix1QkFBdUIsMkJBQTJCLDRCQUE0QixtQ0FBbUMsR0FBRyxzQ0FBc0MsdUJBQXVCLG1CQUFtQixHQUFHLCtDQUErQyxlQUFlLHlDQUF5QyxNQUFNLDJDQUEyQyxzQkFBc0IsTUFBTSxrQ0FBa0MsdUJBQXVCLE1BQU0sR0FBRywrQ0FBK0MsV0FBVyxpQ0FBaUMsdURBQXVELG9DQUFvQyxvQ0FBb0Msb0NBQW9DLE1BQU0saUNBQWlDLHNCQUFzQixNQUFNLGlCQUFpQixxQ0FBcUMsTUFBTSwrQkFBK0IsbUNBQW1DLE1BQU0sd0NBQXdDLHdCQUF3QixlQUFlLGdCQUFnQixzQkFBc0IsbUJBQW1CLHNEQUFzRCxNQUFNLCtDQUErQyx1QkFBdUIscUJBQXFCLE1BQU0sMkNBQTJDLHVCQUF1QixNQUFNLHlCQUF5Qix3QkFBd0IsZ0NBQWdDLE1BQU0sa0NBQWtDLHNCQUFzQixNQUFNLG1EQUFtRCxnQkFBZ0IsK0JBQStCLE1BQU0sNEJBQTRCLGdCQUFnQix1Q0FBdUMsTUFBTSxHQUFHLCtDQUErQyxXQUFXLHVCQUF1QixNQUFNLEdBQUcsbUJBQW1CLDJCQUEyQixnQkFBZ0IsR0FBRyw0QkFBNEIsMkJBQTJCLEdBQUcsU0FBUywyRkFBMkYsVUFBVSxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLFdBQVcsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLFdBQVcsVUFBVSxZQUFZLFdBQVcsWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxXQUFXLFlBQVksYUFBYSxXQUFXLFlBQVksYUFBYSxhQUFhLFdBQVcsWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsV0FBVyxVQUFVLFVBQVUsWUFBWSxXQUFXLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxXQUFXLFVBQVUsWUFBWSxhQUFhLGFBQWEsV0FBVyxNQUFNLEtBQUssVUFBVSxZQUFZLFdBQVcsVUFBVSxZQUFZLGFBQWEsYUFBYSxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLFdBQVcsVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxVQUFVLFVBQVUsWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsV0FBVyxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsVUFBVSxNQUFNLEtBQUssVUFBVSxVQUFVLFlBQVksT0FBTyxLQUFLLFlBQVksV0FBVyxVQUFVLE1BQU0sS0FBSyxZQUFZLFdBQVcsWUFBWSxhQUFhLFdBQVcsWUFBWSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxXQUFXLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxPQUFPLE9BQU8sVUFBVSxZQUFZLGFBQWEsV0FBVyxNQUFNLEtBQUssWUFBWSxhQUFhLGFBQWEsYUFBYSxXQUFXLFlBQVksYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsTUFBTSxLQUFLLFVBQVUsT0FBTyxLQUFLLFVBQVUsTUFBTSxLQUFLLFVBQVUsTUFBTSxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksYUFBYSxXQUFXLFlBQVksYUFBYSxhQUFhLGFBQWEsT0FBTyxPQUFPLFVBQVUsVUFBVSxVQUFVLFVBQVUsWUFBWSxXQUFXLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sU0FBUyxZQUFZLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLFdBQVcsVUFBVSxVQUFVLFVBQVUsTUFBTSxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsVUFBVSxVQUFVLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsV0FBVyxhQUFhLGFBQWEsV0FBVyxZQUFZLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLFdBQVcsWUFBWSxhQUFhLFdBQVcsWUFBWSxhQUFhLGFBQWEsYUFBYSxPQUFPLE9BQU8sVUFBVSxVQUFVLE1BQU0sS0FBSyxVQUFVLFlBQVksYUFBYSxXQUFXLFVBQVUsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxNQUFNLFVBQVUsVUFBVSxZQUFZLFdBQVcsWUFBWSxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxPQUFPLE9BQU8sWUFBWSxhQUFhLFdBQVcsWUFBWSxXQUFXLFVBQVUsWUFBWSxXQUFXLFlBQVksYUFBYSxPQUFPLE1BQU0sVUFBVSxZQUFZLFdBQVcsWUFBWSxhQUFhLFdBQVcsVUFBVSxZQUFZLGFBQWEsV0FBVyxZQUFZLGFBQWEsYUFBYSxPQUFPLEtBQUssVUFBVSxVQUFVLFVBQVUsTUFBTSxLQUFLLFVBQVUsT0FBTyxLQUFLLFlBQVksWUFBWSxZQUFZLFdBQVcsTUFBTSxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsT0FBTyxLQUFLLFVBQVUsT0FBTyxLQUFLLFVBQVUsWUFBWSxjQUFjLGFBQWEsT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLFdBQVcsWUFBWSxhQUFhLFdBQVcsVUFBVSxNQUFNLEtBQUssVUFBVSxZQUFZLGFBQWEsV0FBVyxVQUFVLFVBQVUsWUFBWSxXQUFXLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxhQUFhLFdBQVcsT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxPQUFPLE1BQU0sVUFBVSxNQUFNLE1BQU0sWUFBWSxhQUFhLE9BQU8sTUFBTSxZQUFZLE9BQU8sS0FBSyxVQUFVLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxXQUFXLFlBQVksT0FBTyxLQUFLLFdBQVcsWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLFdBQVcsVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLE9BQU8sT0FBTyxVQUFVLFVBQVUsWUFBWSxhQUFhLGFBQWEsV0FBVyxVQUFVLFlBQVksYUFBYSxXQUFXLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxVQUFVLE1BQU0sTUFBTSxZQUFZLE9BQU8sS0FBSyxVQUFVLFVBQVUsVUFBVSxZQUFZLFdBQVcsTUFBTSxLQUFLLFVBQVUsTUFBTSxLQUFLLFVBQVUsTUFBTSxLQUFLLFlBQVksV0FBVyxZQUFZLGFBQWEsV0FBVyxVQUFVLFlBQVksT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLFdBQVcsWUFBWSxXQUFXLFlBQVksV0FBVyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxXQUFXLFlBQVksYUFBYSxXQUFXLFVBQVUsWUFBWSxXQUFXLFlBQVksV0FBVyxNQUFNLEtBQUssWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLE1BQU0sS0FBSyxVQUFVLE1BQU0sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsV0FBVyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksV0FBVyxVQUFVLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxNQUFNLFVBQVUsT0FBTyxNQUFNLFVBQVUsT0FBTyxPQUFPLFVBQVUsT0FBTyxLQUFLLFlBQVksV0FBVyxZQUFZLFdBQVcsWUFBWSxhQUFhLFdBQVcsT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLGFBQWEsV0FBVyxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsV0FBVyxZQUFZLFdBQVcsWUFBWSxXQUFXLFlBQVksT0FBTyxNQUFNLFVBQVUsT0FBTyxLQUFLLFVBQVUsTUFBTSxLQUFLLFlBQVksYUFBYSxNQUFNLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxVQUFVLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLFdBQVcsWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLFdBQVcsWUFBWSxPQUFPLEtBQUssWUFBWSxXQUFXLFlBQVksV0FBVyxZQUFZLE9B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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxxRUFBZTtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxxRUFBZTtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxxRUFBZTtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLFdBQVcsbUVBQWlCO0FBQzVCLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsV0FBVyxtRUFBaUI7QUFDNUIsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLFdBQVcscUVBQWU7QUFDMUIsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FB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O0FBQ1QsQ0FBQztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlELFdBQVc7QUFDNUQ7QUFDQSxpREFBaUQsV0FBVztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9FQUFvRTtBQUNwRSx3QkFBd0IsNENBQTRDO0FBQ3BFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGFBQWE7QUFDeEIsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVEsaUVBQWlFO0FBQ3BGLFdBQVcsZUFBZTtBQUMxQixXQUFXLFFBQVE7QUFDbkIsV0FBVyxTQUFTO0FBQ3BCO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCLFlBQVksV0FBVztBQUN2QixZQUFZLFlBQVk7QUFDeEIsWUFBWSxZQUFZO0FBQ3hCLFlBQVksWUFBWTtBQUN4QixZQUFZLFlBQVk7QUFDeEIsWUFBWSxZQUFZO0FBQ3hCLFlBQVksWUFBWSx5R0FBeUc7QUFDakksWUFBWSxZQUFZLHFHQUFxRztBQUM3SCxZQUFZLFlBQVksK0dBQStHO0FBQ3ZJLFlBQVksWUFBWSxpSEFBaUg7QUFDekksWUFBWSxZQUFZO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLFdBQVc7QUFDdkI7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFZTtBQUNmO0FBQ0EsRUFBRSxzRUFBWTtBQUNkO0FBQ0EsdUJBQXVCLCtFQUFpQjtBQUN4QyxtT0FBbU8sbUVBQWE7QUFDaFAsOEJBQThCLG1FQUFTOztBQUV2QztBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixtRUFBUzs7QUFFOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsNERBQU07QUFDM0IsT0FBTyw2REFBTztBQUNkO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHlGQUErQjtBQUN0RCxnQkFBZ0IscUVBQWU7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLDJFQUFjO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLHVFQUFVO0FBQzlCO0FBQ0EsOEZBQThGLHdGQUF3QjtBQUN0SCxRQUFRLG1GQUFtQjtBQUMzQjtBQUNBLCtGQUErRix5RkFBeUI7QUFDeEgsUUFBUSxtRkFBbUI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDalp3RDtBQUNDO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLEdBQUc7QUFDZCxhQUFhLFNBQVM7QUFDdEIsWUFBWSxXQUFXO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ2U7QUFDZixFQUFFLHNFQUFZO0FBQ2Qsa0NBQWtDLDZFQUFPO0FBQ3pDOzs7Ozs7Ozs7Ozs7Ozs7O0FDckNnRDtBQUNTO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGFBQWE7QUFDeEIsV0FBVyxhQUFhO0FBQ3hCLGFBQWEsU0FBUztBQUN0QixZQUFZLFdBQVc7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDZTtBQUNmLEVBQUUsc0VBQVk7QUFDZCwyQkFBMkIsZ0VBQVU7QUFDckMsNEJBQTRCLGdFQUFVO0FBQ3RDO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbkN3QztBQUNBO0FBQ2lCO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOERBQThEO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxHQUFHO0FBQ2QsYUFBYSxTQUFTO0FBQ3RCLFlBQVksV0FBVztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNlO0FBQ2YsRUFBRSxzRUFBWTtBQUNkLE9BQU8sNERBQU07QUFDYjtBQUNBO0FBQ0EsYUFBYSw0REFBTTtBQUNuQjtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDekN3QztBQUNpQjtBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxhQUFhO0FBQ3hCLFdBQVcsVUFBVTtBQUNyQixhQUFhLFNBQVM7QUFDdEIsWUFBWSxXQUFXO0FBQ3ZCLFlBQVksWUFBWTtBQUN4QixZQUFZLFlBQVk7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLGtCQUFrQjtBQUM5QztBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsa0JBQWtCO0FBQzlDO0FBQ2U7QUFDZixFQUFFLHNFQUFZO0FBQ2QsYUFBYSw0REFBTTtBQUNuQixrQkFBa0IsNERBQU07QUFDeEIsZ0JBQWdCLDREQUFNOztBQUV0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDcERlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUNSZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUNqQmU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0Isb0JBQW9CO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUN6Q2U7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUNoQkE7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLFFBQVE7QUFDaEMsR0FBRztBQUNIO0FBQ0E7QUFDQSxjQUFjLFFBQVE7QUFDdEIsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixRQUFRO0FBQ2hDLEdBQUc7QUFDSDtBQUNBO0FBQ0EsY0FBYyxRQUFRO0FBQ3RCLEdBQUc7QUFDSDtBQUNBO0FBQ0Esb0JBQW9CLFFBQVE7QUFDNUIsR0FBRztBQUNIO0FBQ0E7QUFDQSxjQUFjLFFBQVE7QUFDdEIsR0FBRztBQUNIO0FBQ0E7QUFDQSxjQUFjLFFBQVE7QUFDdEIsR0FBRztBQUNIO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QixHQUFHO0FBQ0g7QUFDQTtBQUNBLGNBQWMsUUFBUTtBQUN0QixHQUFHO0FBQ0g7QUFDQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCLEdBQUc7QUFDSDtBQUNBO0FBQ0EsY0FBYyxRQUFRO0FBQ3RCLEdBQUc7QUFDSDtBQUNBO0FBQ0Esb0JBQW9CLFFBQVE7QUFDNUIsR0FBRztBQUNIO0FBQ0E7QUFDQSxjQUFjLFFBQVE7QUFDdEIsR0FBRztBQUNIO0FBQ0E7QUFDQSxtQkFBbUIsUUFBUTtBQUMzQixHQUFHO0FBQ0g7QUFDQTtBQUNBLHFCQUFxQixRQUFRO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsSUFBSTtBQUNKLHlDQUF5QyxPQUFPO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBZSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7QUNsRjRDO0FBQ3pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPLE9BQU8sTUFBTTtBQUMvQixXQUFXLE9BQU8sT0FBTyxNQUFNO0FBQy9CLGFBQWEsTUFBTSxJQUFJLE1BQU07QUFDN0IsWUFBWSxNQUFNLElBQUksTUFBTTtBQUM1QjtBQUNBO0FBQ0EsUUFBUSwyRUFBaUI7QUFDekI7QUFDQTtBQUNBLEdBQUc7QUFDSCxRQUFRLDJFQUFpQjtBQUN6QjtBQUNBO0FBQ0EsR0FBRztBQUNILFlBQVksMkVBQWlCO0FBQzdCO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxpRUFBZSxVQUFVOzs7Ozs7Ozs7Ozs7OztBQ2pDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFlLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztBQ1h3QztBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTyx5RUFBZTtBQUN0QjtBQUNBO0FBQ0EsR0FBRztBQUNILFdBQVcseUVBQWU7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxTQUFTLHlFQUFlO0FBQ3hCO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsT0FBTyx5RUFBZTtBQUN0QjtBQUNBO0FBQ0EsR0FBRztBQUNILGFBQWEseUVBQWU7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxpRUFBZSxRQUFROzs7Ozs7Ozs7Ozs7Ozs7O0FDOUl3QztBQUNjO0FBQzdFO0FB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MscUNBQXFDO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLGtDQUFrQztBQUNsRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QyxXQUFXO0FBQ3BEO0FBQ0EsNENBQTRDLFdBQVc7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBLGFB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RW9FOzs7Ozs7O1VDdmtCcEU7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7Ozs7Ozs7Ozs7Ozs7O0FDQWdDO0FBQ0E7QUFDYztBQUU5Q3lCLFFBQVEsQ0FBQ3FQLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLE1BQU07RUFDakQsTUFBTTdQLGFBQWEsR0FBR1osNERBQWEsQ0FBQyxDQUFDO0VBQ3JDWSxhQUFhLENBQUNNLE1BQU0sQ0FBQyxDQUFDO0FBQ3pCLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2NvbXBvc2l0aW9uUm9vdC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvY29udHJvbGxlcnMvQXBwQ29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvY29udHJvbGxlcnMvQ2F0ZWdvcnlDb250cm9sbGVyLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9jb250cm9sbGVycy9Qcm9qZWN0Q29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvY29udHJvbGxlcnMvVGFza0NvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZGVscy9CYXNlTW9kZWwuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZGVscy9DYXRlZ29yeU1vZGVsLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2RlbHMvUHJvamVjdE1vZGVsLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2RlbHMvVGFza01vZGVsLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9zdHJhdGVnaWVzL0ZpbHRlci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvc3RyYXRlZ2llcy9Tb3J0ZXIuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3V0aWxzL0R1bW15Q29udGVudC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvdXRpbHMvRWxlbWVudEJ1aWxkZXIuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3V0aWxzL0lkR2VuZXJhdG9yLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy91dGlscy9PYmplY3RCdWlsZGVyLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy91dGlscy9QdWJTdWIuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3ZpZXdzL2NvbXBvbmVudHMvQWRkVGFza0Zvcm0uanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3ZpZXdzL2NvbXBvbmVudHMvRWRpdGFibGVMaXN0SXRlbS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvdmlld3MvY29tcG9uZW50cy9FeHBhbmRhYmxlTGlzdC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvdmlld3MvY29tcG9uZW50cy9Qcm9qZWN0TGlzdC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvdmlld3MvY29tcG9uZW50cy9TaWRlQmFyLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy92aWV3cy9jb21wb25lbnRzL1Rhc2tDYXJkLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy92aWV3cy9jb21wb25lbnRzL1Rhc2tEZXRhaWxzLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy92aWV3cy9jb21wb25lbnRzL1Rhc2tMaXN0LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy92aWV3cy9wYWdlcy9BcHBQYWdlLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9hc3NldHMvY3NzL3Jlc2V0LmNzcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvYXNzZXRzL2Nzcy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL19saWIvYWRkTGVhZGluZ1plcm9zL2luZGV4LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vX2xpYi9kZWZhdWx0TG9jYWxlL2luZGV4LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vX2xpYi9kZWZhdWx0T3B0aW9ucy9pbmRleC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL19saWIvZm9ybWF0L2Zvcm1hdHRlcnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9fbGliL2Zvcm1hdC9saWdodEZvcm1hdHRlcnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9fbGliL2Zvcm1hdC9sb25nRm9ybWF0dGVycy9pbmRleC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL19saWIvZ2V0VGltZXpvbmVPZmZzZXRJbk1pbGxpc2Vjb25kcy9pbmRleC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL19saWIvZ2V0VVRDRGF5T2ZZZWFyL2luZGV4LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vX2xpYi9nZXRVVENJU09XZWVrL2luZGV4LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vX2xpYi9nZXRVVENJU09XZWVrWWVhci9pbmRleC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL19saWIvZ2V0VVRDV2Vlay9pbmRleC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL19saWIvZ2V0VVRDV2Vla1llYXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9fbGliL3Byb3RlY3RlZFRva2Vucy9pbmRleC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL19saWIvcmVxdWlyZWRBcmdzL2luZGV4LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vX2xpYi9zdGFydE9mVVRDSVNPV2Vlay9pbmRleC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL19saWIvc3RhcnRPZlVUQ0lTT1dlZWtZZWFyL2luZGV4LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vX2xpYi9zdGFydE9mVVRDV2Vlay9pbmRleC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL19saWIvc3RhcnRPZlVUQ1dlZWtZZWFyL2luZGV4LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vX2xpYi90b0ludGVnZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9hZGRNaWxsaXNlY29uZHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9lbmRPZldlZWsvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9mb3JtYXQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9pc0RhdGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9pc1NhbWVEYXkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9pc1ZhbGlkL2luZGV4LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vaXNXaXRoaW5JbnRlcnZhbC9pbmRleC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL2xvY2FsZS9fbGliL2J1aWxkRm9ybWF0TG9uZ0ZuL2luZGV4LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vbG9jYWxlL19saWIvYnVpbGRMb2NhbGl6ZUZuL2luZGV4LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vbG9jYWxlL19saWIvYnVpbGRNYXRjaEZuL2luZGV4LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vbG9jYWxlL19saWIvYnVpbGRNYXRjaFBhdHRlcm5Gbi9pbmRleC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL2xvY2FsZS9lbi1VUy9fbGliL2Zvcm1hdERpc3RhbmNlL2luZGV4LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vbG9jYWxlL2VuLVVTL19saWIvZm9ybWF0TG9uZy9pbmRleC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL2xvY2FsZS9lbi1VUy9fbGliL2Zvcm1hdFJlbGF0aXZlL2luZGV4LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vbG9jYWxlL2VuLVVTL19saWIvbG9jYWxpemUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9sb2NhbGUvZW4tVVMvX2xpYi9tYXRjaC9pbmRleC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL2xvY2FsZS9lbi1VUy9pbmRleC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL3N0YXJ0T2ZEYXkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9zdGFydE9mV2Vlay9pbmRleC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL3N1Yk1pbGxpc2Vjb25kcy9pbmRleC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL3RvRGF0ZS9pbmRleC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvYXNzZXRzL2Nzcy9yZXNldC5jc3M/MjUzMSIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvYXNzZXRzL2Nzcy9zdHlsZS5jc3M/Y2RkNiIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvbmF0aXZlLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvcmVnZXguanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9ybmcuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9zdHJpbmdpZnkuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci92NC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3ZhbGlkYXRlLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS90eXBlb2YuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL0Bmb3Jta2l0L2F1dG8tYW5pbWF0ZS9pbmRleC5tanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2FwcC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVGFza0NvbnRyb2xsZXIgZnJvbSAnLi9jb250cm9sbGVycy9UYXNrQ29udHJvbGxlcic7XG5pbXBvcnQgUHJvamVjdENvbnRyb2xsZXIgZnJvbSAnLi9jb250cm9sbGVycy9Qcm9qZWN0Q29udHJvbGxlcic7XG5pbXBvcnQgQ2F0ZWdvcnlDb250cm9sbGVyIGZyb20gJy4vY29udHJvbGxlcnMvQ2F0ZWdvcnlDb250cm9sbGVyJztcbmltcG9ydCBUYXNrTW9kZWwgZnJvbSAnLi9tb2RlbHMvVGFza01vZGVsJztcbmltcG9ydCBQcm9qZWN0TW9kZWwgZnJvbSAnLi9tb2RlbHMvUHJvamVjdE1vZGVsJztcbmltcG9ydCBDYXRlZ29yeU1vZGVsIGZyb20gJy4vbW9kZWxzL0NhdGVnb3J5TW9kZWwnO1xuaW1wb3J0IFRhc2tMaXN0IGZyb20gJy4vdmlld3MvY29tcG9uZW50cy9UYXNrTGlzdCc7XG5pbXBvcnQgUHJvamVjdExpc3QgZnJvbSAnLi92aWV3cy9jb21wb25lbnRzL1Byb2plY3RMaXN0JztcbmltcG9ydCBBcHBQYWdlIGZyb20gJy4vdmlld3MvcGFnZXMvQXBwUGFnZSc7XG5pbXBvcnQgY3JlYXRlRWxlbWVudCBmcm9tICcuL3V0aWxzL0VsZW1lbnRCdWlsZGVyJztcbmltcG9ydCBBcHBDb250cm9sbGVyIGZyb20gJy4vY29udHJvbGxlcnMvQXBwQ29udHJvbGxlcic7XG5pbXBvcnQgRmlsdGVyIGZyb20gJy4vc3RyYXRlZ2llcy9GaWx0ZXInO1xuaW1wb3J0IFNvcnRlciBmcm9tICcuL3N0cmF0ZWdpZXMvU29ydGVyJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5pdGlhbGl6ZUFwcCgpIHtcbiAgIGNvbnN0IGNhdGVnb3J5TW9kZWwgPSBuZXcgQ2F0ZWdvcnlNb2RlbCgpO1xuICAgY29uc3QgcHJvamVjdE1vZGVsID0gbmV3IFByb2plY3RNb2RlbCgpO1xuICAgY29uc3QgdGFza01vZGVsID0gbmV3IFRhc2tNb2RlbCgpO1xuICAgY29uc3QgZmlsdGVyID0gbmV3IEZpbHRlcigpO1xuICAgY29uc3Qgc29ydGVyID0gbmV3IFNvcnRlcigpO1xuXG4gICBjb25zdCB0YXNrTGlzdCA9IGNyZWF0ZUVsZW1lbnQoJ3Rhc2stbGlzdCcpO1xuICAgY29uc3QgcHJvamVjdExpc3QgPSBjcmVhdGVFbGVtZW50KCdwcm9qZWN0LWxpc3QnKTtcbiAgIGNvbnN0IGFwcFBhZ2UgPSBjcmVhdGVFbGVtZW50KCdhcHAtcGFnZScpO1xuXG4gICBjb25zdCB0YXNrQ29udHJvbGxlciA9IG5ldyBUYXNrQ29udHJvbGxlcihcbiAgICAgIHRhc2tNb2RlbCxcbiAgICAgIHRhc2tMaXN0LFxuICAgICAgZmlsdGVyLFxuICAgICAgc29ydGVyXG4gICApO1xuICAgY29uc3QgcHJvamVjdENvbnRyb2xsZXIgPSBuZXcgUHJvamVjdENvbnRyb2xsZXIocHJvamVjdE1vZGVsLCBwcm9qZWN0TGlzdCk7XG4gICBjb25zdCBjYXRlZ29yeUNvbnRyb2xsZXIgPSBuZXcgQ2F0ZWdvcnlDb250cm9sbGVyKGNhdGVnb3J5TW9kZWwpO1xuXG4gICBjb25zdCBhcHBDb250cm9sbGVyID0gbmV3IEFwcENvbnRyb2xsZXIoXG4gICAgICB0YXNrQ29udHJvbGxlcixcbiAgICAgIHByb2plY3RDb250cm9sbGVyLFxuICAgICAgY2F0ZWdvcnlDb250cm9sbGVyLFxuICAgICAgYXBwUGFnZVxuICAgKTtcblxuICAgcmV0dXJuIGFwcENvbnRyb2xsZXI7XG59XG4iLCJpbXBvcnQgcHVic3ViIGZyb20gJy4uL3V0aWxzL1B1YlN1Yic7XG5pbXBvcnQgY3JlYXRlRWxlbWVudCBmcm9tICcuLi91dGlscy9FbGVtZW50QnVpbGRlcic7XG5pbXBvcnQgc2lkZUJhckNvbXBvbmVudCBmcm9tICcuLi92aWV3cy9jb21wb25lbnRzL1NpZGVCYXInO1xuaW1wb3J0IEZpbHRlciBmcm9tICcuLi9zdHJhdGVnaWVzL0ZpbHRlcic7XG5cbmNsYXNzIEFwcENvbnRyb2xsZXIge1xuICAgY29uc3RydWN0b3IodGFza0NvbnRyb2xsZXIsIHByb2plY3RDb250cm9sbGVyLCBjYXRlZ29yeUNvbnRyb2xsZXIsIGFwcFBhZ2UpIHtcbiAgICAgIHRoaXMudGFza0NvbnRyb2xsZXIgPSB0YXNrQ29udHJvbGxlcjtcbiAgICAgIHRoaXMucHJvamVjdENvbnRyb2xsZXIgPSBwcm9qZWN0Q29udHJvbGxlcjtcbiAgICAgIHRoaXMuY2F0ZWdvcnlDb250cm9sbGVyID0gY2F0ZWdvcnlDb250cm9sbGVyO1xuICAgICAgdGhpcy52aWV3ID0gYXBwUGFnZTtcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZUxpc3RlbmVycygpO1xuICAgfVxuXG4gICBsYXVuY2goKSB7XG4gICAgICB0aGlzLnNldHVwRmlyc3RMb2FkKCk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYm9keScpLmFwcGVuZENoaWxkKHRoaXMudmlldyk7XG4gICB9XG5cbiAgIHNldHVwRmlyc3RMb2FkKCkge1xuICAgICAgY29uc3QgY2F0ZWdvcmllcyA9IHRoaXMuY2F0ZWdvcnlDb250cm9sbGVyLm1vZGVsLmdldEFsbEl0ZW1zKCk7XG4gICAgICBjb25zdCBwcm9qZWN0cyA9IHRoaXMucHJvamVjdENvbnRyb2xsZXIubW9kZWwuZ2V0QWxsSXRlbXMoKTtcblxuICAgICAgdGhpcy50YXNrQ29udHJvbGxlci5idWlsZFZpZXdTdGF0ZSh7IHByb2plY3RzLCBjYXRlZ29yaWVzIH0pO1xuICAgICAgdGhpcy5wcm9qZWN0Q29udHJvbGxlci5idWlsZFZpZXdTdGF0ZSh7IGNhdGVnb3JpZXMgfSk7XG5cbiAgICAgIGNvbnN0IHNpZGVCYXIgPSBjcmVhdGVFbGVtZW50KCdzaWRlLWJhcicpLmFwcGVuZENoaWxkcmVuKFxuICAgICAgICAgdGhpcy5wcm9qZWN0Q29udHJvbGxlci52aWV3XG4gICAgICApO1xuXG4gICAgICB0aGlzLnZpZXcuYXBwZW5kQ2hpbGRyZW4oW3NpZGVCYXIsIHRoaXMudGFza0NvbnRyb2xsZXIudmlld10pO1xuICAgfVxuXG4gICBpbml0aWFsaXplTGlzdGVuZXJzKCkge1xuICAgICAgcHVic3ViLnN1YnNjcmliZSgndGFzazplZGl0JywgdGhpcy5vcGVuVGFza0VkaXQuYmluZCh0aGlzKSk7XG4gICAgICBwdWJzdWIuc3Vic2NyaWJlKCdzaWRlLWJhcjp0b2dnbGUnLCB0aGlzLnRvZ2dsZVNpZGVCYXIuYmluZCh0aGlzKSk7XG4gICB9XG5cbiAgIG9wZW5UYXNrRWRpdCh0YXNrSWQpIHtcbiAgICAgIGNvbnN0IGNhdGVnb3JpZXMgPSB0aGlzLmNhdGVnb3J5Q29udHJvbGxlci5tb2RlbC5nZXRBbGxJdGVtcygpO1xuICAgICAgY29uc3QgcHJvamVjdHMgPSB0aGlzLnByb2plY3RDb250cm9sbGVyLm1vZGVsLmdldEFsbEl0ZW1zKCk7XG4gICAgICBjb25zdCB0YXNrID0gdGhpcy50YXNrQ29udHJvbGxlci5tb2RlbC5nZXRJdGVtQnlJZCh0YXNrSWQpO1xuXG4gICAgICB0aGlzLnZpZXcub3BlblRhc2tEZXRhaWxzKHsgdGFzaywgY2F0ZWdvcmllcywgcHJvamVjdHMgfSk7XG4gICB9XG5cbiAgIHRvZ2dsZVNpZGVCYXIoKSB7XG4gICAgICB0aGlzLnZpZXcudG9nZ2xlU2lkZUJhcigpO1xuICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBcHBDb250cm9sbGVyO1xuIiwiaW1wb3J0IHB1YnN1YiBmcm9tICcuLi91dGlscy9QdWJTdWInO1xuXG5jbGFzcyBDYXRlZ29yeUNvbnRyb2xsZXIge1xuICAgY29uc3RydWN0b3IoY2F0ZWdvcnlNb2RlbCkge1xuICAgICAgdGhpcy5tb2RlbCA9IGNhdGVnb3J5TW9kZWw7XG4gICAgICB0aGlzLmluaXRpYWxpemVMaXN0ZW5lcnMoKTtcbiAgIH1cblxuICAgaW5pdGlhbGl6ZUxpc3RlbmVycygpIHtcbiAgICAgIHB1YnN1Yi5zdWJzY3JpYmUoJ2NhdGVnb3J5OmFkZCcsIHRoaXMuaGFuZGxlQWRkQ2F0ZWdvcnkuYmluZCh0aGlzKSk7XG4gICAgICBwdWJzdWIuc3Vic2NyaWJlKCdjYXRlZ29yeTp1cGRhdGUnLCB0aGlzLmhhbmRsZVVwZGF0ZUNhdGVnb3J5LmJpbmQodGhpcykpO1xuICAgICAgcHVic3ViLnN1YnNjcmliZSgnY2F0ZWdvcnk6ZGVsZXRlJywgdGhpcy5oYW5kbGVEZWxldGVDYXRlZ29yeS5iaW5kKHRoaXMpKTtcbiAgIH1cblxuICAgaGFuZGxlQWRkQ2F0ZWdvcnkobmV3Q2F0ZWdvcnlMaSkge1xuICAgICAgdGhpcy5tb2RlbC5hZGRJdGVtKG5ld0NhdGVnb3J5TGkuZ2V0U3RhdGUoKSk7XG4gICAgICBjb25zdCBuZXdDYXRlZ29yeSA9IHRoaXMubW9kZWwuZ2V0TGFzdEFkZGVkSXRlbSgpO1xuICAgICAgbmV3Q2F0ZWdvcnlMaS5wYXJlbnRFbGVtZW50LnNldFN0YXRlKHtcbiAgICAgICAgIGhlYWRlcjogbmV3Q2F0ZWdvcnksXG4gICAgICAgICBpdGVtczogeyB0eXBlOiAncHJvamVjdCcsIGxpc3Q6IG51bGwgfSxcbiAgICAgIH0pO1xuXG4gICAgICBwdWJzdWIucHVibGlzaCgnY2F0ZWdvcmllczp1cGRhdGVkJywge1xuICAgICAgICAgY2F0ZWdvcmllczogdGhpcy5tb2RlbC5nZXRBbGxJdGVtcygpLFxuICAgICAgfSk7XG4gICB9XG5cbiAgIGhhbmRsZVVwZGF0ZUNhdGVnb3J5KGNhdGVnb3J5TGkpIHtcbiAgICAgIHRoaXMubW9kZWwudXBkYXRlSXRlbShcbiAgICAgICAgIGNhdGVnb3J5TGkuZ2V0QXR0cmlidXRlKCdpZCcpLFxuICAgICAgICAgY2F0ZWdvcnlMaS5nZXRTdGF0ZSgpXG4gICAgICApO1xuXG4gICAgICBjb25zdCBlZGl0ZWRDYXRlZ29yeSA9IHRoaXMubW9kZWwuZ2V0SXRlbUJ5SWQoXG4gICAgICAgICBjYXRlZ29yeUxpLmdldEF0dHJpYnV0ZSgnaWQnKVxuICAgICAgKTtcbiAgICAgIGNhdGVnb3J5TGkucGFyZW50RWxlbWVudC5zZXRTdGF0ZSh7IGhlYWRlcjogZWRpdGVkQ2F0ZWdvcnkgfSk7XG5cbiAgICAgIHB1YnN1Yi5wdWJsaXNoKCdjYXRlZ29yaWVzOnVwZGF0ZWQnLCB7XG4gICAgICAgICBjYXRlZ29yaWVzOiB0aGlzLm1vZGVsLmdldEFsbEl0ZW1zKCksXG4gICAgICB9KTtcbiAgIH1cblxuICAgaGFuZGxlRGVsZXRlQ2F0ZWdvcnkoY2F0ZWdvcnlMaSkge1xuICAgICAgdGhpcy5tb2RlbC5kZWxldGVJdGVtKGNhdGVnb3J5TGkuZ2V0QXR0cmlidXRlKCdpZCcpKTtcbiAgICAgIGNhdGVnb3J5TGkucGFyZW50RWxlbWVudC5yZW1vdmUoKTtcbiAgICAgIHB1YnN1Yi5wdWJsaXNoKCdjYXRlZ29yeTpkZWxldGVkJywgY2F0ZWdvcnlMaS5nZXRBdHRyaWJ1dGUoJ2lkJykpO1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmRlZmF1bHQtZmlsdGVyW2lkPWFsbF1gKS5jbGljaygpO1xuICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDYXRlZ29yeUNvbnRyb2xsZXI7XG4iLCJpbXBvcnQgcHVic3ViIGZyb20gJy4uL3V0aWxzL1B1YlN1Yic7XG5cbmNsYXNzIFByb2plY3RDb250cm9sbGVyIHtcbiAgIGNvbnN0cnVjdG9yKHByb2plY3RNb2RlbCwgcHJvamVjdExpc3QpIHtcbiAgICAgIHRoaXMubW9kZWwgPSBwcm9qZWN0TW9kZWw7XG4gICAgICB0aGlzLnZpZXcgPSBwcm9qZWN0TGlzdDtcbiAgICAgIHRoaXMudmlld1N0YXRlID0ge307XG4gICAgICB0aGlzLmluaXRpYWxpemVMaXN0ZW5lcnMoKTtcbiAgIH1cblxuICAgaW5pdGlhbGl6ZUxpc3RlbmVycygpIHtcbiAgICAgIHB1YnN1Yi5zdWJzY3JpYmUoJ3Byb2plY3Q6YWRkJywgdGhpcy5oYW5kbGVBZGRQcm9qZWN0LmJpbmQodGhpcykpO1xuICAgICAgcHVic3ViLnN1YnNjcmliZSgncHJvamVjdDp1cGRhdGUnLCB0aGlzLmhhbmRsZVVwZGF0ZVByb2plY3QuYmluZCh0aGlzKSk7XG4gICAgICBwdWJzdWIuc3Vic2NyaWJlKCdwcm9qZWN0OmRlbGV0ZScsIHRoaXMuaGFuZGxlRGVsZXRlUHJvamVjdC5iaW5kKHRoaXMpKTtcbiAgICAgIHB1YnN1Yi5zdWJzY3JpYmUoXG4gICAgICAgICAnY2F0ZWdvcnk6ZGVsZXRlZCcsXG4gICAgICAgICB0aGlzLmhhbmRsZUNhdGVnb3J5RGVsZXRlLmJpbmQodGhpcylcbiAgICAgICk7XG4gICB9XG5cbiAgIGhhbmRsZUFkZFByb2plY3QobmV3UHJvamVjdExpKSB7XG4gICAgICBjb25zdCBkYXRhID0gbmV3UHJvamVjdExpLmdldFN0YXRlKCk7XG4gICAgICBPYmplY3QuYXNzaWduKGRhdGEsIHtcbiAgICAgICAgIGNhdGVnb3J5SWQ6IG5ld1Byb2plY3RMaS5nZXRBdHRyaWJ1dGUoJ3BhcmVudC1saXN0JyksXG4gICAgICB9KTtcbiAgICAgIHRoaXMubW9kZWwuYWRkSXRlbShkYXRhKTtcbiAgICAgIGNvbnN0IG5ld1Byb2plY3QgPSB0aGlzLm1vZGVsLmdldExhc3RBZGRlZEl0ZW0oKTtcbiAgICAgIG5ld1Byb2plY3RMaS5zZXRTdGF0ZShuZXdQcm9qZWN0KTtcbiAgICAgIHB1YnN1Yi5wdWJsaXNoKCdwcm9qZWN0czp1cGRhdGVkJywge1xuICAgICAgICAgcHJvamVjdHM6IHRoaXMubW9kZWwuZ2V0QWxsSXRlbXMoKSxcbiAgICAgIH0pO1xuICAgfVxuXG4gICBoYW5kbGVEZWxldGVQcm9qZWN0KHByb2plY3RMaSkge1xuICAgICAgY29uc3QgcHJvamVjdENhdGVnb3J5TGkgPSBwcm9qZWN0TGkuY2xvc2VzdCgnZXhwLWxpc3QnKS5maXJzdENoaWxkO1xuICAgICAgaWYgKHByb2plY3RMaS5oYXNBdHRyaWJ1dGUoJ2N1cnJlbnQtZmlsdGVyJykpIHtcbiAgICAgICAgIGNvbnN0IG5ld0ZpbHRlckRhdGEgPSB7XG4gICAgICAgICAgICB0aXRsZTogcHJvamVjdENhdGVnb3J5TGkuZ2V0QXR0cmlidXRlKCdkYXRhLXRpdGxlJyksXG4gICAgICAgICAgICBpZDogcHJvamVjdENhdGVnb3J5TGkuZ2V0QXR0cmlidXRlKCdpZCcpLFxuICAgICAgICAgICAgdHlwZTogcHJvamVjdENhdGVnb3J5TGkuZ2V0QXR0cmlidXRlKCdkYXRhLXR5cGUnKSxcbiAgICAgICAgICAgIHZhbHVlOiBwcm9qZWN0Q2F0ZWdvcnlMaS5nZXRBdHRyaWJ1dGUoJ2lkJyksXG4gICAgICAgICB9O1xuICAgICAgICAgcHVic3ViLnB1Ymxpc2goJ2ZpbHRlcjpjaGFuZ2VkJywgbmV3RmlsdGVyRGF0YSk7XG4gICAgICAgICB0aGlzLnZpZXcuaGlnaGxpZ2h0Q3VycmVudEZpbHRlcihuZXdGaWx0ZXJEYXRhKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5tb2RlbC5kZWxldGVJdGVtKHByb2plY3RMaS5nZXRBdHRyaWJ1dGUoJ2lkJykpO1xuICAgICAgcHVic3ViLnB1Ymxpc2goJ3Byb2plY3Q6ZGVsZXRlZCcsIHByb2plY3RMaS5nZXRBdHRyaWJ1dGUoJ2lkJykpO1xuICAgfVxuXG4gICBoYW5kbGVVcGRhdGVQcm9qZWN0KHByb2plY3RMaSkge1xuICAgICAgdGhpcy5tb2RlbC51cGRhdGVJdGVtKHByb2plY3RMaS5nZXRBdHRyaWJ1dGUoJ2lkJyksIHByb2plY3RMaS5nZXRTdGF0ZSgpKTtcbiAgICAgIGNvbnN0IGVkaXRlZFByb2plY3QgPSB0aGlzLm1vZGVsLmdldEl0ZW1CeUlkKFxuICAgICAgICAgcHJvamVjdExpLmdldEF0dHJpYnV0ZSgnaWQnKVxuICAgICAgKTtcblxuICAgICAgcHJvamVjdExpLnNldFN0YXRlKGVkaXRlZFByb2plY3QpO1xuICAgICAgcHVic3ViLnB1Ymxpc2goJ3Byb2plY3RzOnVwZGF0ZWQnLCB7XG4gICAgICAgICBwcm9qZWN0czogdGhpcy5tb2RlbC5nZXRBbGxJdGVtcygpLFxuICAgICAgfSk7XG4gICB9XG5cbiAgIGhhbmRsZUNhdGVnb3J5RGVsZXRlKGNhdGVnb3J5SWQpIHtcbiAgICAgIHRoaXMubW9kZWwuZ2V0QWxsSXRlbXMoKS5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XG4gICAgICAgICBpZiAocHJvamVjdC5jYXRlZ29yeUlkID09PSBjYXRlZ29yeUlkKSB7XG4gICAgICAgICAgICB0aGlzLm1vZGVsLmRlbGV0ZUl0ZW0ocHJvamVjdC5pZCk7XG4gICAgICAgICAgICBwdWJzdWIucHVibGlzaCgncHJvamVjdDpkZWxldGVkJywgcHJvamVjdC5pZCk7XG4gICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5jbGVhck5vbkNhdGVnb3JpemVkUHJvamVjdHMoKTtcbiAgIH1cblxuICAgYnVpbGRWaWV3U3RhdGUoZXh0ZXJuYWxEYXRhKSB7XG4gICAgICB0aGlzLnZpZXdTdGF0ZSA9IHsgcHJvamVjdHM6IHRoaXMubW9kZWwuZ2V0QWxsSXRlbXMoKSB9O1xuICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLnZpZXdTdGF0ZSwgZXh0ZXJuYWxEYXRhKTtcbiAgICAgIHRoaXMudmlldy5zZXRTdGF0ZSh0aGlzLnZpZXdTdGF0ZSk7XG4gICB9XG5cbiAgIGNsZWFyTm9uQ2F0ZWdvcml6ZWRQcm9qZWN0cygpIHtcbiAgICAgIHRoaXMubW9kZWwuZ2V0QWxsSXRlbXMoKS5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XG4gICAgICAgICBjb25zdCBwcm9qZWN0Q2F0ZWdvcnkgPSB0aGlzLnZpZXdTdGF0ZS5jYXRlZ29yaWVzLmZpbmQoXG4gICAgICAgICAgICAoY2F0ZWdvcnkpID0+IHByb2plY3QuY2F0ZWdvcnlJZCA9PT0gY2F0ZWdvcnkuaWRcbiAgICAgICAgICk7XG4gICAgICAgICBpZiAoIXByb2plY3RDYXRlZ29yeSkge1xuICAgICAgICAgICAgdGhpcy5tb2RlbC5kZWxldGVJdGVtKHByb2plY3QuaWQpO1xuICAgICAgICAgICAgcHVic3ViLnB1Ymxpc2goJ3Byb2plY3RzOnVwZGF0ZWQnLCB7XG4gICAgICAgICAgICAgICBwcm9qZWN0czogdGhpcy5tb2RlbC5nZXRBbGxJdGVtcygpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICB9XG4gICAgICB9KTtcbiAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUHJvamVjdENvbnRyb2xsZXI7XG4iLCJpbXBvcnQgcHVic3ViIGZyb20gJy4uL3V0aWxzL1B1YlN1Yic7XG5cbmNsYXNzIFRhc2tDb250cm9sbGVyIHtcbiAgIGNvbnN0cnVjdG9yKHRhc2tNb2RlbCwgdGFza1ZpZXcsIGZpbHRlciwgc29ydGVyKSB7XG4gICAgICB0aGlzLnNvcnRlciA9IHNvcnRlcjtcbiAgICAgIHRoaXMuZmlsdGVyID0gZmlsdGVyO1xuICAgICAgdGhpcy5tb2RlbCA9IHRhc2tNb2RlbDtcbiAgICAgIHRoaXMudmlldyA9IHRhc2tWaWV3O1xuICAgICAgdGhpcy5jdXJyZW50U29ydCA9ICcnO1xuICAgICAgdGhpcy5jdXJyZW50RmlsdGVyID0ge1xuICAgICAgICAgdHlwZTogJ2FsbCcsXG4gICAgICAgICB0aXRsZTogJ2FsbCcsXG4gICAgICAgICB2YWx1ZTogbnVsbCxcbiAgICAgIH07XG5cbiAgICAgIHRoaXMuaW5pdGlhbGl6ZUxpc3RlbmVycygpO1xuICAgfVxuXG4gICBpbml0aWFsaXplTGlzdGVuZXJzKCkge1xuICAgICAgcHVic3ViLnN1YnNjcmliZSgndGFzazphZGQnLCB0aGlzLmhhbmRsZUFkZFRhc2suYmluZCh0aGlzKSk7XG4gICAgICBwdWJzdWIuc3Vic2NyaWJlKCd0YXNrOnVwZGF0ZScsIHRoaXMuaGFuZGxlVXBkYXRlVGFzay5iaW5kKHRoaXMpKTtcbiAgICAgIHB1YnN1Yi5zdWJzY3JpYmUoJ3Rhc2s6ZGVsZXRlJywgdGhpcy5oYW5kbGVEZWxldGVUYXNrLmJpbmQodGhpcykpO1xuICAgICAgcHVic3ViLnN1YnNjcmliZSgncHJvamVjdDpkZWxldGVkJywgdGhpcy5oYW5kbGVQcm9qZWN0RGVsZXRlZC5iaW5kKHRoaXMpKTtcbiAgICAgIHB1YnN1Yi5zdWJzY3JpYmUoJ3Byb2plY3RzOnVwZGF0ZWQnLCB0aGlzLmJ1aWxkVmlld1N0YXRlLmJpbmQodGhpcykpO1xuICAgICAgcHVic3ViLnN1YnNjcmliZSgnY2F0ZWdvcmllczp1cGRhdGVkJywgdGhpcy5idWlsZFZpZXdTdGF0ZS5iaW5kKHRoaXMpKTtcbiAgICAgIHB1YnN1Yi5zdWJzY3JpYmUoJ2ZpbHRlcjpjaGFuZ2VkJywgdGhpcy5oYW5kbGVGaWx0ZXJDaGFuZ2UuYmluZCh0aGlzKSk7XG4gICAgICBwdWJzdWIuc3Vic2NyaWJlKCdzb3J0aW5nOmNoYW5nZWQnLCB0aGlzLmhhbmRsZVNvcnRpbmdDaGFuZ2VkLmJpbmQodGhpcykpO1xuICAgfVxuXG4gICBoYW5kbGVBZGRUYXNrKGRhdGEpIHtcbiAgICAgIHRoaXMubW9kZWwuYWRkSXRlbShkYXRhKTtcbiAgICAgIHRoaXMudmlldy5zZXRTdGF0ZSh7XG4gICAgICAgICB0YXNrczogdGhpcy5nZXRDdXJyZW50RmlsdGVyVGFza3MoKSxcbiAgICAgIH0pO1xuICAgfVxuXG4gICBoYW5kbGVEZWxldGVUYXNrKHRhc2tJZCkge1xuICAgICAgdGhpcy5tb2RlbC5kZWxldGVJdGVtKHRhc2tJZCk7XG4gICAgICB0aGlzLnZpZXcuZGVsZXRlQ2FyZCh0YXNrSWQpO1xuICAgfVxuXG4gICBoYW5kbGVVcGRhdGVUYXNrKG5ld1Rhc2tEYXRhKSB7XG4gICAgICB0aGlzLm1vZGVsLnVwZGF0ZUl0ZW0obmV3VGFza0RhdGEuaWQsIG5ld1Rhc2tEYXRhKTtcbiAgICAgIGNvbnN0IGVkaXRlZFRhc2sgPSB0aGlzLm1vZGVsLmdldEl0ZW1CeUlkKG5ld1Rhc2tEYXRhLmlkKTtcblxuICAgICAgdGhpcy52aWV3LnVwZGF0ZUNhcmQoZWRpdGVkVGFzayk7XG4gICB9XG5cbiAgIGJ1aWxkVmlld1N0YXRlKGV4dGVybmFsRGF0YSkge1xuICAgICAgdGhpcy52aWV3U3RhdGUgPSB7XG4gICAgICAgICBjdXJyZW50RmlsdGVyOiB0aGlzLmN1cnJlbnRGaWx0ZXIsXG4gICAgICAgICB0YXNrczogdGhpcy5nZXRDdXJyZW50RmlsdGVyVGFza3MoKSxcbiAgICAgIH07XG5cbiAgICAgIE9iamVjdC5hc3NpZ24odGhpcy52aWV3U3RhdGUsIGV4dGVybmFsRGF0YSk7XG5cbiAgICAgIHRoaXMudmlldy5zZXRTdGF0ZSh0aGlzLnZpZXdTdGF0ZSk7XG4gICB9XG5cbiAgIGhhbmRsZVByb2plY3REZWxldGVkKHByb2plY3RJZCkge1xuICAgICAgdGhpcy5tb2RlbC5kZWxldGVJdGVtc0J5UHJvcGVydHkoJ3Byb2plY3RJZCcsIHByb2plY3RJZCk7XG4gICAgICBjb25zdCBwcm9qZWN0cyA9IHRoaXMudmlld1N0YXRlLnByb2plY3RzLmZpbHRlcihcbiAgICAgICAgIChwcm9qZWN0KSA9PiBwcm9qZWN0LmlkICE9PSBwcm9qZWN0SWRcbiAgICAgICk7XG4gICAgICBjb25zdCB0YXNrcyA9IHRoaXMuZ2V0Q3VycmVudEZpbHRlclRhc2tzKCk7XG4gICAgICBPYmplY3QuYXNzaWduKHRoaXMudmlld1N0YXRlLCB7IHByb2plY3RzLCB0YXNrcyB9KTtcbiAgICAgIHRoaXMudmlldy5zZXRTdGF0ZSh0aGlzLnZpZXdTdGF0ZSk7XG4gICB9XG5cbiAgIGdldEN1cnJlbnRGaWx0ZXJUYXNrcygpIHtcbiAgICAgIHJldHVybiB0aGlzLmZpbHRlci5maWx0ZXJCeShcbiAgICAgICAgIHRoaXMuY3VycmVudEZpbHRlci50eXBlLFxuICAgICAgICAgdGhpcy5tb2RlbC5nZXRBbGxJdGVtcygpLFxuICAgICAgICAgdGhpcy5jdXJyZW50RmlsdGVyLnZhbHVlXG4gICAgICApO1xuICAgfVxuXG4gICBoYW5kbGVGaWx0ZXJDaGFuZ2UoZmlsdGVyRGF0YSkge1xuICAgICAgdGhpcy5jdXJyZW50U29ydCA9ICcnO1xuICAgICAgdGhpcy5jdXJyZW50RmlsdGVyID0gZmlsdGVyRGF0YTtcbiAgICAgIGNvbnN0IHRhc2tzID0gdGhpcy5nZXRDdXJyZW50RmlsdGVyVGFza3MoKTtcbiAgICAgIE9iamVjdC5hc3NpZ24odGhpcy52aWV3U3RhdGUsIHtcbiAgICAgICAgIGN1cnJlbnRTb3J0OiB0aGlzLmN1cnJlbnRTb3J0LFxuICAgICAgICAgY3VycmVudEZpbHRlcjogdGhpcy5jdXJyZW50RmlsdGVyLFxuICAgICAgICAgdGFza3MsXG4gICAgICB9KTtcbiAgICAgIHRoaXMudmlldy5zZXRTdGF0ZSh0aGlzLnZpZXdTdGF0ZSk7XG4gICB9XG5cbiAgIGhhbmRsZVNvcnRpbmdDaGFuZ2VkKHNvcnRpbmdUeXBlKSB7XG4gICAgICB0aGlzLmN1cnJlbnRTb3J0ID0gc29ydGluZ1R5cGU7XG4gICAgICBjb25zdCB0YXNrcyA9IHRoaXMuZ2V0Q3VycmVudEZpbHRlclRhc2tzKCk7XG4gICAgICBjb25zdCBzb3J0ZWRUYXNrcyA9IHRoaXMuc29ydGVyLnNvcnRCeShzb3J0aW5nVHlwZSwgdGFza3MpO1xuICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLnZpZXdTdGF0ZSwge1xuICAgICAgICAgY3VycmVudFNvcnQ6IHRoaXMuY3VycmVudFNvcnQsXG4gICAgICAgICB0YXNrczogc29ydGVkVGFza3MsXG4gICAgICB9KTtcbiAgICAgIHRoaXMudmlldy5zZXRTdGF0ZSh0aGlzLnZpZXdTdGF0ZSk7XG4gICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRhc2tDb250cm9sbGVyO1xuIiwiaW1wb3J0IE9iamVjdEJ1aWxkZXIgZnJvbSAnLi4vdXRpbHMvT2JqZWN0QnVpbGRlcic7XG5pbXBvcnQgZHVtbXlEYXRhIGZyb20gJy4uL3V0aWxzL0R1bW15Q29udGVudCc7XG5cbmNsYXNzIEJhc2VNb2RlbCB7XG4gICBjb25zdHJ1Y3Rvcihjb2xsZWN0aW9uTmFtZSkge1xuICAgICAgdGhpcy5jb2xsZWN0aW9uTmFtZSA9IGNvbGxlY3Rpb25OYW1lO1xuICAgICAgdGhpc1tjb2xsZWN0aW9uTmFtZV0gPSBbXTtcbiAgICAgIHRoaXMuc2V0RHVtbXlDb250ZW50KCk7XG4gICAgICB0aGlzLnJldHJpZXZlRnJvbUxvY2FsU3RvcmFnZSgpO1xuICAgfVxuXG4gICByZXRyaWV2ZUZyb21Mb2NhbFN0b3JhZ2UoKSB7XG4gICAgICBjb25zdCBpdGVtc0RhdGEgPSBBcnJheS5mcm9tKFxuICAgICAgICAgSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0aGlzLmNvbGxlY3Rpb25OYW1lKSlcbiAgICAgICk7XG5cbiAgICAgIGl0ZW1zRGF0YS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICBjb25zdCBvYmplY3QgPSBuZXcgT2JqZWN0QnVpbGRlcihpdGVtKTtcbiAgICAgICAgIHRoaXNbdGhpcy5jb2xsZWN0aW9uTmFtZV0ucHVzaChvYmplY3QpO1xuICAgICAgfSk7XG4gICB9XG5cbiAgIHNhdmVUb0xvY2FsU3RvcmFnZSgpIHtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFxuICAgICAgICAgdGhpcy5jb2xsZWN0aW9uTmFtZSxcbiAgICAgICAgIEpTT04uc3RyaW5naWZ5KHRoaXNbdGhpcy5jb2xsZWN0aW9uTmFtZV0pXG4gICAgICApO1xuICAgfVxuXG4gICBhZGRJdGVtKGRhdGEpIHtcbiAgICAgIGNvbnN0IG5ld0l0ZW0gPSBuZXcgT2JqZWN0QnVpbGRlcihkYXRhKTtcbiAgICAgIHRoaXNbdGhpcy5jb2xsZWN0aW9uTmFtZV0ucHVzaChuZXdJdGVtKTtcbiAgICAgIHRoaXMuc2F2ZVRvTG9jYWxTdG9yYWdlKCk7XG4gICB9XG5cbiAgIGdldEFsbEl0ZW1zKCkge1xuICAgICAgcmV0dXJuIHRoaXNbdGhpcy5jb2xsZWN0aW9uTmFtZV07XG4gICB9XG5cbiAgIGdldExhc3RBZGRlZEl0ZW0oKSB7XG4gICAgICByZXR1cm4gdGhpc1t0aGlzLmNvbGxlY3Rpb25OYW1lXS5zbGljZSgtMSlbMF07XG4gICB9XG5cbiAgIGdldEl0ZW1CeUlkKGlkKSB7XG4gICAgICByZXR1cm4gdGhpc1t0aGlzLmNvbGxlY3Rpb25OYW1lXS5maW5kKChpdGVtKSA9PiBpdGVtLmlkID09PSBpZCk7XG4gICB9XG5cbiAgIHVwZGF0ZUl0ZW0oaWQsIGRhdGEpIHtcbiAgICAgIGNvbnN0IGl0ZW1Ub0VkaXQgPSB0aGlzW3RoaXMuY29sbGVjdGlvbk5hbWVdLmZpbmQoXG4gICAgICAgICAoaXRlbSkgPT4gaXRlbS5pZCA9PT0gaWRcbiAgICAgICk7XG4gICAgICBpdGVtVG9FZGl0LnVwZGF0ZVByb3BlcnRpZXMoZGF0YSk7XG4gICAgICB0aGlzLnNhdmVUb0xvY2FsU3RvcmFnZSgpO1xuICAgfVxuXG4gICBkZWxldGVJdGVtKGlkKSB7XG4gICAgICBjb25zdCBpbmRleCA9IHRoaXNbdGhpcy5jb2xsZWN0aW9uTmFtZV0uZmluZEluZGV4KFxuICAgICAgICAgKGl0ZW0pID0+IGl0ZW0uaWQgPT09IGlkXG4gICAgICApO1xuICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgdGhpc1t0aGlzLmNvbGxlY3Rpb25OYW1lXS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgfVxuICAgICAgdGhpcy5zYXZlVG9Mb2NhbFN0b3JhZ2UoKTtcbiAgIH1cblxuICAgZGVsZXRlSXRlbXNCeVByb3BlcnR5KHByb3BlcnR5LCB2YWx1ZSkge1xuICAgICAgdGhpc1t0aGlzLmNvbGxlY3Rpb25OYW1lXSA9IHRoaXNbdGhpcy5jb2xsZWN0aW9uTmFtZV0uZmlsdGVyKFxuICAgICAgICAgKGl0ZW0pID0+IGl0ZW1bcHJvcGVydHldICE9PSB2YWx1ZVxuICAgICAgKTtcbiAgICAgIHRoaXMuc2F2ZVRvTG9jYWxTdG9yYWdlKCk7XG4gICB9XG5cbiAgIHNldER1bW15Q29udGVudCgpIHtcbiAgICAgIGlmIChcbiAgICAgICAgIEpTT04ucGFyc2UoXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgJHt0aGlzLmNvbGxlY3Rpb25OYW1lfS1kdW1teS1jb250ZW50YClcbiAgICAgICAgICkgPT09IG51bGxcbiAgICAgICkge1xuICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXG4gICAgICAgICAgICB0aGlzLmNvbGxlY3Rpb25OYW1lLFxuICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoZHVtbXlEYXRhW3RoaXMuY29sbGVjdGlvbk5hbWVdKVxuICAgICAgICAgKTtcbiAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFxuICAgICAgICAgICAgYCR7dGhpcy5jb2xsZWN0aW9uTmFtZX0tZHVtbXktY29udGVudGAsXG4gICAgICAgICAgICBKU09OLnN0cmluZ2lmeSh0cnVlKVxuICAgICAgICAgKTtcbiAgICAgIH1cbiAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQmFzZU1vZGVsO1xuIiwiaW1wb3J0IEJhc2VNb2RlbCBmcm9tICcuL0Jhc2VNb2RlbCc7XG5cbmNsYXNzIENhdGVnb3J5TW9kZWwgZXh0ZW5kcyBCYXNlTW9kZWwge1xuICAgY29uc3RydWN0b3IoKSB7XG4gICAgICBzdXBlcignY2F0ZWdvcmllcycpO1xuICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDYXRlZ29yeU1vZGVsO1xuIiwiaW1wb3J0IEJhc2VNb2RlbCBmcm9tICcuL0Jhc2VNb2RlbCc7XG5pbXBvcnQgQ2F0ZWdvcnlNb2RlbCBmcm9tICcuL0NhdGVnb3J5TW9kZWwnO1xuXG5jbGFzcyBQcm9qZWN0TW9kZWwgZXh0ZW5kcyBCYXNlTW9kZWwge1xuICAgY29uc3RydWN0b3IoKSB7XG4gICAgICBzdXBlcigncHJvamVjdHMnKTtcbiAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUHJvamVjdE1vZGVsO1xuIiwiaW1wb3J0IEJhc2VNb2RlbCBmcm9tICcuL0Jhc2VNb2RlbCc7XG5cbmNsYXNzIFRhc2tNb2RlbCBleHRlbmRzIEJhc2VNb2RlbCB7XG4gICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgIHN1cGVyKCd0YXNrcycpO1xuICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBUYXNrTW9kZWw7XG4iLCJpbXBvcnQgeyBpc1NhbWVEYXksIGlzV2l0aGluSW50ZXJ2YWwgfSBmcm9tICdkYXRlLWZucyc7XG5cbmNvbnN0IGZpbHRlcmluZ1N0cmF0ZWdpZXMgPSBbXG4gICB7XG4gICAgICB0eXBlOiAnYWxsJyxcbiAgICAgIGZpbHRlcjogZnVuY3Rpb24gZmlsdGVyKHRhc2tzKSB7XG4gICAgICAgICByZXR1cm4gdGFza3M7XG4gICAgICB9LFxuICAgfSxcblxuICAge1xuICAgICAgdHlwZTogJ2RhdGUnLFxuICAgICAgZmlsdGVyOiBmdW5jdGlvbiBmaWx0ZXIodGFza3MsIGRhdGUpIHtcbiAgICAgICAgIHJldHVybiB0YXNrcy5maWx0ZXIoKHRhc2spID0+IGlzU2FtZURheShuZXcgRGF0ZSh0YXNrLmRhdGUpLCBkYXRlKSk7XG4gICAgICB9LFxuICAgfSxcblxuICAge1xuICAgICAgdHlwZTogJ2RhdGUtcmFuZ2UnLFxuICAgICAgZmlsdGVyOiBmdW5jdGlvbiBmaWx0ZXIodGFza3MsIGRhdGVSYW5nZSkge1xuICAgICAgICAgcmV0dXJuIHRhc2tzLmZpbHRlcigodGFzaykgPT5cbiAgICAgICAgICAgIGlzV2l0aGluSW50ZXJ2YWwobmV3IERhdGUodGFzay5kYXRlKSwgZGF0ZVJhbmdlKVxuICAgICAgICAgKTtcbiAgICAgIH0sXG4gICB9LFxuXG4gICB7XG4gICAgICB0eXBlOiAncHJvamVjdCcsXG4gICAgICBmaWx0ZXI6IGZ1bmN0aW9uIGZpbHRlcih0YXNrcywgcHJvamVjdElkKSB7XG4gICAgICAgICByZXR1cm4gdGFza3MuZmlsdGVyKCh0YXNrKSA9PiB0YXNrLnByb2plY3RJZCA9PT0gcHJvamVjdElkKTtcbiAgICAgIH0sXG4gICB9LFxuXG4gICB7XG4gICAgICB0eXBlOiAnY2F0ZWdvcnknLFxuICAgICAgZmlsdGVyOiBmdW5jdGlvbiBmaWx0ZXIodGFza3MsIGNhdGVnb3J5SWQpIHtcbiAgICAgICAgIHJldHVybiB0YXNrcy5maWx0ZXIoKHRhc2spID0+IHRhc2suY2F0ZWdvcnlJZCA9PT0gY2F0ZWdvcnlJZCk7XG4gICAgICB9LFxuICAgfSxcbl07XG5cbmNsYXNzIEZpbHRlciB7XG4gICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgIHRoaXMuc3RyYXRlZ2llcyA9IG5ldyBNYXAoKTtcbiAgICAgIHRoaXMuYWRkU3RyYXRlZ2llcyhmaWx0ZXJpbmdTdHJhdGVnaWVzKTtcbiAgIH1cblxuICAgYWRkU3RyYXRlZ2llcyhzdHJhdGVnaWVzKSB7XG4gICAgICBzdHJhdGVnaWVzLmZvckVhY2goKHN0cmF0ZWd5KSA9PiB7XG4gICAgICAgICB0aGlzLnN0cmF0ZWdpZXMuc2V0KHN0cmF0ZWd5LnR5cGUsIHN0cmF0ZWd5LmZpbHRlcik7XG4gICAgICB9KTtcbiAgIH1cblxuICAgZmlsdGVyQnkodHlwZSwgdGFza3MsIGZpbHRlclZhbHVlKSB7XG4gICAgICBjb25zdCBmaWx0ZXIgPSB0aGlzLnN0cmF0ZWdpZXMuZ2V0KHR5cGUpO1xuICAgICAgaWYgKGZpbHRlcikge1xuICAgICAgICAgcmV0dXJuIGZpbHRlcih0YXNrcywgZmlsdGVyVmFsdWUpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGFza3M7XG4gICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEZpbHRlcjtcbiIsImNvbnN0IHNvcnRpbmdTdHJhdGVnaWVzID0gW1xuICAge1xuICAgICAgdHlwZTogJ3ByaW9yaXR5JyxcbiAgICAgIHNvcnQ6ICh0YXNrcykgPT5cbiAgICAgICAgIFsuLi50YXNrc10uc29ydCgoYSwgYikgPT4gTnVtYmVyKGEucHJpb3JpdHkpIC0gTnVtYmVyKGIucHJpb3JpdHkpKSxcbiAgIH0sXG5cbiAgIHtcbiAgICAgIHR5cGU6ICdkdWUgZGF0ZScsXG4gICAgICBzb3J0OiAodGFza3MpID0+XG4gICAgICAgICBbLi4udGFza3NdLnNvcnQoKGEsIGIpID0+IG5ldyBEYXRlKGEuZGF0ZSkgLSBuZXcgRGF0ZShiLmRhdGUpKSxcbiAgIH0sXG5dO1xuXG5jbGFzcyBTb3J0ZXIge1xuICAgY29uc3RydWN0b3IoKSB7XG4gICAgICB0aGlzLnN0cmF0ZWdpZXMgPSBuZXcgTWFwKCk7XG4gICAgICB0aGlzLmFkZFN0cmF0ZWdpZXMoc29ydGluZ1N0cmF0ZWdpZXMpO1xuICAgfVxuXG4gICBhZGRTdHJhdGVnaWVzKHN0cmF0ZWdpZXMpIHtcbiAgICAgIHN0cmF0ZWdpZXMuZm9yRWFjaCgoc3RyYXRlZ3kpID0+IHtcbiAgICAgICAgIHRoaXMuc3RyYXRlZ2llcy5zZXQoc3RyYXRlZ3kudHlwZSwgc3RyYXRlZ3kuc29ydCk7XG4gICAgICB9KTtcbiAgIH1cblxuICAgc29ydEJ5KHR5cGUsIHRhc2tzKSB7XG4gICAgICBjb25zdCBzb3J0ID0gdGhpcy5zdHJhdGVnaWVzLmdldCh0eXBlKTtcblxuICAgICAgaWYgKHNvcnQpIHtcbiAgICAgICAgIHJldHVybiBzb3J0KHRhc2tzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRhc2tzO1xuICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTb3J0ZXI7XG4iLCJjb25zdCBkdW1teURhdGEgPSB7XG4gICBjYXRlZ29yaWVzOiBbXG4gICAgICB7XG4gICAgICAgICBpZDogJ2NhdGVnb3J5LTE3NmZjZTBiLTAwY2QtNDVmMC04ZjJjLWUwOGY2MDE2NjY1ZScsXG4gICAgICAgICBkYXRhVHlwZTogJ2NhdGVnb3J5JyxcbiAgICAgICAgIHRpdGxlOiAnUGVyc29uYWwnLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgIGlkOiAnY2F0ZWdvcnktZTk5YTRlNDUtYTRlZC00OGYyLTkzMjktNjA0NjQ5N2YwNGVkJyxcbiAgICAgICAgIGRhdGFUeXBlOiAnY2F0ZWdvcnknLFxuICAgICAgICAgdGl0bGU6ICdXb3JrJyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICBpZDogJ2NhdGVnb3J5LTA3MDYwODhlLTMyOGMtNDljZi05ZjAyLTBhZmEwMDdmMTI3ZScsXG4gICAgICAgICBkYXRhVHlwZTogJ2NhdGVnb3J5JyxcbiAgICAgICAgIHRpdGxlOiAnRWR1Y2F0aW9uJyxcbiAgICAgIH0sXG4gICBdLFxuXG4gICBwcm9qZWN0czogW1xuICAgICAge1xuICAgICAgICAgaWQ6ICdwcm9qZWN0LWZhYTM4NGFjLTg1YzgtNDA4Zi1iZTM3LTFjOWNmMWMzMDUwNicsXG4gICAgICAgICBkYXRhVHlwZTogJ3Byb2plY3QnLFxuICAgICAgICAgdGl0bGU6ICdTdW1tZXIgdmFjYXRpb24nLFxuICAgICAgICAgY2F0ZWdvcnlJZDogJ2NhdGVnb3J5LTE3NmZjZTBiLTAwY2QtNDVmMC04ZjJjLWUwOGY2MDE2NjY1ZScsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgaWQ6ICdwcm9qZWN0LWU1NGJlYTBjLWE1YzYtNGU3Yi04YjA5LWYwYTg4MjY3ZjZlMycsXG4gICAgICAgICBkYXRhVHlwZTogJ3Byb2plY3QnLFxuICAgICAgICAgdGl0bGU6ICdlLWNvbW1lcmNlIHByb2plY3QgJyxcbiAgICAgICAgIGNhdGVnb3J5SWQ6ICdjYXRlZ29yeS1lOTlhNGU0NS1hNGVkLTQ4ZjItOTMyOS02MDQ2NDk3ZjA0ZWQnLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgIGlkOiAncHJvamVjdC1kNmYwYzVmMi0xYTVlLTRjZWYtOTM3MC1kNjkzNjVjMGE4YTknLFxuICAgICAgICAgZGF0YVR5cGU6ICdwcm9qZWN0JyxcbiAgICAgICAgIHRpdGxlOiAnVE9QIFRvZG8gbGlzdCcsXG4gICAgICAgICBjYXRlZ29yeUlkOiAnY2F0ZWdvcnktMDcwNjA4OGUtMzI4Yy00OWNmLTlmMDItMGFmYTAwN2YxMjdlJyxcbiAgICAgIH0sXG4gICBdLFxuICAgdGFza3M6IFtcbiAgICAgIHtcbiAgICAgICAgIGlkOiAndGFzay1kMGI0NWQwZS1jMGZiLTQ5ZTEtYjIzOC0xOTZiY2E3NDA5NDgnLFxuICAgICAgICAgZGF0YVR5cGU6ICd0YXNrJyxcbiAgICAgICAgIGNvbXBsZXRlZDogZmFsc2UsXG4gICAgICAgICB0aXRsZTogJ0NoZWNrIGNhciBtYWludGVuYW5jZScsXG4gICAgICAgICBkZXNjcmlwdGlvbjogJycsXG4gICAgICAgICBkYXRlOiAnMjAyMy0wOC0wMScsXG4gICAgICAgICBwcm9qZWN0SWQ6ICdwcm9qZWN0LWZhYTM4NGFjLTg1YzgtNDA4Zi1iZTM3LTFjOWNmMWMzMDUwNicsXG4gICAgICAgICBwcmlvcml0eTogJzInLFxuICAgICAgICAgY2F0ZWdvcnlJZDogJ2NhdGVnb3J5LTE3NmZjZTBiLTAwY2QtNDVmMC04ZjJjLWUwOGY2MDE2NjY1ZScsXG4gICAgICAgICB0YXNrUHJvamVjdDogJ1N1bW1lciB2YWNhdGlvbicsXG4gICAgICAgICBwcm9qZWN0Q2F0ZWdvcnk6ICdQZXJzb25hbCcsXG4gICAgICAgICBjaGVja2xpc3Q6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnY2hlY2tsaXN0LWl0ZW0nLFxuICAgICAgICAgICAgICAgdGl0bGU6ICdDaGVjayBlbmdpbiBvaWwnLFxuICAgICAgICAgICAgICAgY2hlY2tlZDogZmFsc2UsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdjaGVja2xpc3QtaXRlbScsXG4gICAgICAgICAgICAgICB0aXRsZTogJ0NoZWNrIFRoZSBFbmdpbmUgQ29vbGFudCcsXG4gICAgICAgICAgICAgICBjaGVja2VkOiBmYWxzZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICBkYXRhVHlwZTogJ2NoZWNrbGlzdC1pdGVtJyxcbiAgICAgICAgICAgICAgIHRpdGxlOiAnVGVzdCAgQnJha2VzJyxcbiAgICAgICAgICAgICAgIGNoZWNrZWQ6IGZhbHNlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgIF0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgaWQ6ICd0YXNrLTE1MzU4N2Y4LTY3OTItNDYyMC04NTY4LTg4MTgzZTJiM2UwMicsXG4gICAgICAgICBkYXRhVHlwZTogJ3Rhc2snLFxuICAgICAgICAgY29tcGxldGVkOiBmYWxzZSxcbiAgICAgICAgIHRpdGxlOiAnTWFrZSBob3RlbCByZXNlcnZhdGlvbnMnLFxuICAgICAgICAgZGVzY3JpcHRpb246ICcnLFxuICAgICAgICAgZGF0ZTogJzIwMjMtMDctMjYnLFxuICAgICAgICAgcHJvamVjdElkOiAncHJvamVjdC1mYWEzODRhYy04NWM4LTQwOGYtYmUzNy0xYzljZjFjMzA1MDYnLFxuICAgICAgICAgcHJpb3JpdHk6ICcyJyxcbiAgICAgICAgIGNhdGVnb3J5SWQ6ICdjYXRlZ29yeS0xNzZmY2UwYi0wMGNkLTQ1ZjAtOGYyYy1lMDhmNjAxNjY2NWUnLFxuICAgICAgICAgdGFza1Byb2plY3Q6ICdTdW1tZXIgdmFjYXRpb24nLFxuICAgICAgICAgcHJvamVjdENhdGVnb3J5OiAnUGVyc29uYWwnLFxuICAgICAgICAgY2hlY2tsaXN0OiBbXSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICBpZDogJ3Rhc2stYWJlMzM3MWQtNTY0OC00YWEzLWIwYzgtNjA2YTFhM2U3ZDM5JyxcbiAgICAgICAgIGRhdGFUeXBlOiAndGFzaycsXG4gICAgICAgICBjb21wbGV0ZWQ6IGZhbHNlLFxuICAgICAgICAgdGl0bGU6ICdHbyBvbiB2YWNhdGlvbicsXG4gICAgICAgICBkZXNjcmlwdGlvbjogJycsXG4gICAgICAgICBkYXRlOiAnMjAyMy0wOC0wNScsXG4gICAgICAgICBwcm9qZWN0SWQ6ICdwcm9qZWN0LWZhYTM4NGFjLTg1YzgtNDA4Zi1iZTM3LTFjOWNmMWMzMDUwNicsXG4gICAgICAgICBwcmlvcml0eTogJzEnLFxuICAgICAgICAgY2F0ZWdvcnlJZDogJ2NhdGVnb3J5LTE3NmZjZTBiLTAwY2QtNDVmMC04ZjJjLWUwOGY2MDE2NjY1ZScsXG4gICAgICAgICB0YXNrUHJvamVjdDogJ1N1bW1lciB2YWNhdGlvbicsXG4gICAgICAgICBwcm9qZWN0Q2F0ZWdvcnk6ICdQZXJzb25hbCcsXG4gICAgICAgICBjaGVja2xpc3Q6IFtdLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgIGlkOiAndGFzay1jY2Y2MDE3OS1kY2ExLTQ3MmEtOWZhNC03NWE0MTA3NmY0OWUnLFxuICAgICAgICAgZGF0YVR5cGU6ICd0YXNrJyxcbiAgICAgICAgIGNvbXBsZXRlZDogZmFsc2UsXG4gICAgICAgICB0aXRsZTogJ0tpY2sgb2ZmIG1lZXRpbmcnLFxuICAgICAgICAgZGVzY3JpcHRpb246ICcnLFxuICAgICAgICAgZGF0ZTogJzIwMjMtMDctMzEnLFxuICAgICAgICAgcHJvamVjdElkOiAncHJvamVjdC1lNTRiZWEwYy1hNWM2LTRlN2ItOGIwOS1mMGE4ODI2N2Y2ZTMnLFxuICAgICAgICAgcHJpb3JpdHk6ICcxJyxcbiAgICAgICAgIGNhdGVnb3J5SWQ6ICdjYXRlZ29yeS1lOTlhNGU0NS1hNGVkLTQ4ZjItOTMyOS02MDQ2NDk3ZjA0ZWQnLFxuICAgICAgICAgdGFza1Byb2plY3Q6ICdlLWNvbW1lcmNlIHByb2plY3QgJyxcbiAgICAgICAgIHByb2plY3RDYXRlZ29yeTogJ1dvcmsnLFxuICAgICAgICAgY2hlY2tsaXN0OiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICBkYXRhVHlwZTogJ2NoZWNrbGlzdC1pdGVtJyxcbiAgICAgICAgICAgICAgIHRpdGxlOiAnVGFrZSBjbGllbnQgc3BlY2lmaWNhdGlvbnMnLFxuICAgICAgICAgICAgICAgY2hlY2tlZDogZmFsc2UsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdjaGVja2xpc3QtaXRlbScsXG4gICAgICAgICAgICAgICB0aXRsZTogJ0Rpc2N1cyByZWFzb25hYmxlIGRlYWRsaW5lJyxcbiAgICAgICAgICAgICAgIGNoZWNrZWQ6IGZhbHNlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgIF0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgaWQ6ICd0YXNrLTljY2QxYjQyLWFhN2EtNDc4OC1iYWIzLTg2M2I3YmYwMzliYycsXG4gICAgICAgICBkYXRhVHlwZTogJ3Rhc2snLFxuICAgICAgICAgY29tcGxldGVkOiB0cnVlLFxuICAgICAgICAgdGl0bGU6ICdGaW5pc2hpbmcgbGFzdCB0b3VjaGVzJyxcbiAgICAgICAgIGRlc2NyaXB0aW9uOiAnJyxcbiAgICAgICAgIGRhdGU6ICcyMDIzLTA3LTI3JyxcbiAgICAgICAgIHByb2plY3RJZDogJ3Byb2plY3QtZDZmMGM1ZjItMWE1ZS00Y2VmLTkzNzAtZDY5MzY1YzBhOGE5JyxcbiAgICAgICAgIHByaW9yaXR5OiAnMScsXG4gICAgICAgICBjYXRlZ29yeUlkOiAnY2F0ZWdvcnktMDcwNjA4OGUtMzI4Yy00OWNmLTlmMDItMGFmYTAwN2YxMjdlJyxcbiAgICAgICAgIHRhc2tQcm9qZWN0OiAnVE9QIFRvZG8gbGlzdCcsXG4gICAgICAgICBwcm9qZWN0Q2F0ZWdvcnk6ICdFZHVjYXRpb24nLFxuICAgICAgICAgY2hlY2tsaXN0OiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICBkYXRhVHlwZTogJ2NoZWNrbGlzdC1pdGVtJyxcbiAgICAgICAgICAgICAgIHRpdGxlOiAnVHJ5IHRvIGFkZCBzb21lIGFuaW1hdGlvbnMnLFxuICAgICAgICAgICAgICAgY2hlY2tlZDogdHJ1ZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICBkYXRhVHlwZTogJ2NoZWNrbGlzdC1pdGVtJyxcbiAgICAgICAgICAgICAgIHRpdGxlOiAnTWFrZSB3ZWJzaXRlIG1vY2t1cCBpbWFnZXMnLFxuICAgICAgICAgICAgICAgY2hlY2tlZDogZmFsc2UsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdjaGVja2xpc3QtaXRlbScsXG4gICAgICAgICAgICAgICB0aXRsZTogJ1B1Ymxpc2ggb24gZGlzY29yZCBzZXJ2ZXInLFxuICAgICAgICAgICAgICAgY2hlY2tlZDogdHJ1ZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICBdLFxuICAgICAgfSxcbiAgIF0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBkdW1teURhdGE7XG4iLCJmdW5jdGlvbiBjcmVhdGVFbGVtZW50KHRhZykge1xuICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcbiAgIE9iamVjdC5hc3NpZ24oZWxlbWVudCwgZWxlbWVudE1peGluKTtcbiAgIHJldHVybiBlbGVtZW50O1xufVxuXG5jb25zdCBlbGVtZW50TWl4aW4gPSB7XG4gICBzZXRBdHRyaWJ1dGVzKGF0dHJpYnV0ZXMpIHtcbiAgICAgIE9iamVjdC5lbnRyaWVzKGF0dHJpYnV0ZXMpLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xuICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZShrZXksIHZhbHVlLmpvaW4oJyAnKSk7XG4gICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZSk7XG4gICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgfSxcblxuICAgc2V0U3RhdGUoc3RhdGUpIHtcbiAgICAgIGlmICh0aGlzLmlzQ29ubmVjdGVkKSB7XG4gICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMuc3RhdGUsIHN0YXRlKTtcbiAgICAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXM7XG4gICB9LFxuXG4gICAvLyB1cGRhdGVTdGF0ZShzdGF0ZSkge1xuICAgLy8gICAgT2JqZWN0LmFzc2lnbih0aGlzLnN0YXRlLCBzdGF0ZSk7XG4gICAvLyAgICB0aGlzLmNsZWFyKCk7XG4gICAvLyAgICB0aGlzLnJlbmRlcigpO1xuICAgLy8gfSxcblxuICAgY2hlY2tGb3JPdGhlckFjdGl2ZUVsbShldikge1xuICAgICAgY29uc3QgYWN0aXZlRWxtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2FjdGl2ZV1gKTtcblxuICAgICAgaWYgKGFjdGl2ZUVsbSAhPT0gdGhpcyAmJiBhY3RpdmVFbG0gIT09IG51bGwpIHtcbiAgICAgICAgIGFjdGl2ZUVsbS5zaG93RXJyb3IoKTtcbiAgICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG4gICB9LFxuXG4gICBzaG93RXJyb3IoKSB7XG4gICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ2Vycm9yJyk7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgIHRoaXMucXVlcnlTZWxlY3RvcignaW5wdXQnKS5mb2N1cygpO1xuICAgICAgICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdlcnJvcicpO1xuICAgICAgfSwgMTQwMCk7XG4gICB9LFxuXG4gICBnZXRTdGF0ZSgpIHtcbiAgICAgIHJldHVybiB0aGlzLnN0YXRlO1xuICAgfSxcblxuICAgc2V0Q29udGVudChjb250ZW50KSB7XG4gICAgICB0aGlzLnRleHRDb250ZW50ID0gY29udGVudDtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgfSxcblxuICAgYXBwZW5kQ2hpbGRyZW4oY2hpbGRFbGVtZW50cykge1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY2hpbGRFbGVtZW50cykpIHtcbiAgICAgICAgIGNoaWxkRWxlbWVudHMuZm9yRWFjaCgoY2hpbGQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuYXBwZW5kQ2hpbGQoY2hpbGQpO1xuICAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgdGhpcy5hcHBlbmRDaGlsZChjaGlsZEVsZW1lbnRzKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgfSxcblxuICAgY2xlYXIoKSB7XG4gICAgICB3aGlsZSAodGhpcy5maXJzdENoaWxkKSB7XG4gICAgICAgICB0aGlzLnJlbW92ZUNoaWxkKHRoaXMuZmlyc3RDaGlsZCk7XG4gICAgICB9XG4gICB9LFxuXG4gICBhcHBlbmRUbyhwYXJlbnQpIHtcbiAgICAgIHBhcmVudC5hcHBlbmRDaGlsZCh0aGlzKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgfSxcblxuICAgcHJlcGVuZFRvKHBhcmVudCkge1xuICAgICAgcGFyZW50LnByZXBlbmQodGhpcyk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgIH0sXG5cbiAgIGFwcGVuZEljb24oaWNvbikge1xuICAgICAgY3JlYXRlRWxlbWVudCgnaScpLnNldEF0dHJpYnV0ZXMoeyBjbGFzczogaWNvbiB9KS5hcHBlbmRUbyh0aGlzKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgfSxcblxuICAgcHJlcGVuZEljb24oaWNvbikge1xuICAgICAgY3JlYXRlRWxlbWVudCgnaScpLnNldEF0dHJpYnV0ZXMoeyBjbGFzczogaWNvbiB9KS5wcmVwZW5kVG8odGhpcyk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgIH0sXG5cbiAgIGNhcGl0YWxGaXJzdExldHRlcigpIHtcbiAgICAgIHRoaXMudGV4dENvbnRlbnQgPVxuICAgICAgICAgdGhpcy50ZXh0Q29udGVudC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHRoaXMudGV4dENvbnRlbnQuc2xpY2UoMSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVFbGVtZW50O1xuIiwiaW1wb3J0IHsgdjQgYXMgdXVpZHY0IH0gZnJvbSAndXVpZCc7XG5cbmZ1bmN0aW9uIGNyZWF0ZU5ld0lEKCkge1xuICAgcmV0dXJuIHV1aWR2NCgpLnRvU3RyaW5nKCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZU5ld0lEO1xuIiwiaW1wb3J0IGNyZWF0ZU5ld0lEIGZyb20gJy4vSWRHZW5lcmF0b3InO1xuXG5jbGFzcyBPYmplY3RCdWlsZGVyIHtcbiAgIGNvbnN0cnVjdG9yKGRhdGEgPSB7fSkge1xuICAgICAgdGhpcy52YWxpZGF0ZVRpdGxlKGRhdGEudGl0bGUpO1xuICAgICAgaWYgKCFkYXRhLmlkIHx8IGRhdGEuaWQgPT09ICcnKVxuICAgICAgICAgdGhpcy5pZCA9IGAke2RhdGEuZGF0YVR5cGUgPyBkYXRhLmRhdGFUeXBlIDogJ2lkJ30tJHtjcmVhdGVOZXdJRCgpfWA7XG4gICAgICB0aGlzLnNldFByb3BlcnRpZXMoZGF0YSk7XG4gICB9XG5cbiAgIHZhbGlkYXRlVGl0bGUodGl0bGUpIHtcbiAgICAgIGlmICghdGl0bGUgfHwgdGl0bGUgPT09ICcnKSB7XG4gICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBjcmVhdGUgdGhlIG9iamVjdCB3aXRob3V0IGEgdGl0bGUnKTtcbiAgICAgIH1cbiAgIH1cblxuICAgc2V0UHJvcGVydGllcyhkYXRhKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih0aGlzLCBkYXRhKTtcbiAgIH1cblxuICAgdXBkYXRlUHJvcGVydGllcyhkYXRhKSB7XG4gICAgICBPYmplY3Qua2V5cyhkYXRhKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgIHRoaXNba2V5XSA9IGRhdGFba2V5XTtcbiAgICAgIH0pO1xuICAgfVxuXG4gICBnZXRQcm9wZXJ0eShwcm9wZXJ0eSkge1xuICAgICAgcmV0dXJuIHRoaXNbcHJvcGVydHldO1xuICAgfVxuXG4gICBlZGl0UHJvcGVydHkocHJvcGVydHksIG5ld1ZhbHVlKSB7XG4gICAgICB0aGlzW3Byb3BlcnR5XSA9IG5ld1ZhbHVlO1xuICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBPYmplY3RCdWlsZGVyO1xuIiwiY29uc3QgcHVic3ViID0ge1xuICAgZXZlbnRzOiB7fSxcbiAgIHN1YnNjcmlwdGlvbnNJZDogLTEsXG5cbiAgIHB1Ymxpc2goZXZlbnQsIGRhdGEpIHtcbiAgICAgIGlmICghdGhpcy5ldmVudHNbZXZlbnRdKSB7XG4gICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZXZlbnRzW2V2ZW50XS5mb3JFYWNoKChzdWJzY3JpcHRpb24pID0+IHtcbiAgICAgICAgIHN1YnNjcmlwdGlvbi5mdW5jKGRhdGEpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgIH0sXG5cbiAgIHN1YnNjcmliZShldmVudCwgZnVuYykge1xuICAgICAgaWYgKCF0aGlzLmV2ZW50c1tldmVudF0pIHtcbiAgICAgICAgIHRoaXMuZXZlbnRzW2V2ZW50XSA9IFtdO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbnNJZCArPSAxO1xuICAgICAgY29uc3QgdG9rZW4gPSB0aGlzLnN1YnNjcmlwdGlvbnNJZC50b1N0cmluZygpO1xuICAgICAgdGhpcy5ldmVudHNbZXZlbnRdLnB1c2goe1xuICAgICAgICAgdG9rZW4sXG4gICAgICAgICBmdW5jLFxuICAgICAgfSk7XG4gICAgICByZXR1cm4gdG9rZW47XG4gICB9LFxuXG4gICB1bnN1YnNjcmliZSh0b2tlbikge1xuICAgICAgY29uc3QgZm91bmQgPSBPYmplY3Qua2V5cyh0aGlzLmV2ZW50cykuc29tZSgoZXZlbnQpID0+XG4gICAgICAgICB0aGlzLmV2ZW50c1tldmVudF0uc29tZSgoc3Vic2NyaXB0aW9uLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgYXJlRXF1YWwgPSBzdWJzY3JpcHRpb24udG9rZW4gPT09IHRva2VuLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICBpZiAoYXJlRXF1YWwpIHtcbiAgICAgICAgICAgICAgIHRoaXMuZXZlbnRzW2V2ZW50XS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGFyZUVxdWFsO1xuICAgICAgICAgfSlcbiAgICAgICk7XG5cbiAgICAgIHJldHVybiBmb3VuZCA/IHRva2VuIDogbnVsbDtcbiAgIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBwdWJzdWI7XG4iLCJpbXBvcnQgcHVic3ViIGZyb20gJy4uLy4uL3V0aWxzL1B1YlN1Yic7XG5pbXBvcnQgY3JlYXRlRWxlbWVudCBmcm9tICcuLi8uLi91dGlscy9FbGVtZW50QnVpbGRlcic7XG5cbmNsYXNzIEFkZFRhc2tGb3JtIGV4dGVuZHMgSFRNTEZvcm1FbGVtZW50IHtcbiAgIGNvbnN0cnVjdG9yKHN0YXRlKSB7XG4gICAgICBzdXBlcigpO1xuICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuICAgfVxuXG4gICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXJzKCk7XG4gICB9XG5cbiAgIHJlbmRlcigpIHtcbiAgICAgIHRoaXMuaWQgPSAnbmV3LXRhc2stZm9ybSc7XG5cbiAgICAgIGNvbnN0IGNsb3NlRm9ybUJ0biA9IGNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXG4gICAgICAgICAuc2V0QXR0cmlidXRlcyh7XG4gICAgICAgICAgICB0eXBlOiAnYnV0dG9uJyxcbiAgICAgICAgICAgIGNsYXNzOiAnY2xvc2UtZm9ybScsXG4gICAgICAgICAgICBuYW1lOiAnY2xvc2UtZm9ybScsXG4gICAgICAgICB9KVxuICAgICAgICAgLmFwcGVuZEljb24oJ2ZhLXNvbGlkIGZhLWNpcmNsZS14bWFyaycpXG4gICAgICAgICAuYXBwZW5kVG8odGhpcyk7XG5cbiAgICAgIGNvbnN0IHRpdGxlSW5wdXQgPSBjcmVhdGVFbGVtZW50KCdpbnB1dCcpXG4gICAgICAgICAuc2V0QXR0cmlidXRlcyh7XG4gICAgICAgICAgICB0eXBlOiAndGV4dCcsXG4gICAgICAgICAgICBuYW1lOiAndGl0bGUtaW5wdXQnLFxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICdDcmVhdGUgYSB0YXNrJyxcbiAgICAgICAgICAgIG1heGxlbmd0aDogJzUwJyxcbiAgICAgICAgICAgIG1pbmxlbmd0aDogJzUnLFxuICAgICAgICAgICAgcmVxdWlyZWQ6ICcnLFxuICAgICAgICAgfSlcbiAgICAgICAgIC5hcHBlbmRUbyh0aGlzKTtcblxuICAgICAgY29uc3Qgb3BlbkZvcm1CdG4gPSBjcmVhdGVFbGVtZW50KCdidXR0b24nKVxuICAgICAgICAgLnNldEF0dHJpYnV0ZXMoe1xuICAgICAgICAgICAgdHlwZTogJ2J1dHRvbicsXG4gICAgICAgICAgICBjbGFzczogJ29wZW4tZm9ybScsXG4gICAgICAgICAgICBuYW1lOiAnb3Blbi1mb3JtJyxcbiAgICAgICAgIH0pXG4gICAgICAgICAuc2V0Q29udGVudCgnTmV3IFRhc2snKVxuICAgICAgICAgLnByZXBlbmRJY29uKCdmYS1zb2xpZCBmYS1mZWF0aGVyLXBvaW50ZWQnKVxuICAgICAgICAgLmFwcGVuZFRvKHRoaXMpO1xuXG4gICAgICBjb25zdCBoaWRkZW5JbnB1dHMgPSBjcmVhdGVFbGVtZW50KCdmaWVsZHNldCcpXG4gICAgICAgICAuc2V0QXR0cmlidXRlcyh7IGNsYXNzOiAnaGlkZGVuLWlucHV0cycgfSlcbiAgICAgICAgIC5hcHBlbmRUbyh0aGlzKTtcblxuICAgICAgY29uc3QgZGVzY3JpcHRpb25JbnB1dCA9IGNyZWF0ZUVsZW1lbnQoJ3RleHRhcmVhJylcbiAgICAgICAgIC5zZXRBdHRyaWJ1dGVzKHtcbiAgICAgICAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgICAgICAgIG5hbWU6ICdkZXNjcmlwdGlvbi1pbnB1dCcsXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogJ0VudGVyIGEgZGVzY3JpcHRpb24nLFxuICAgICAgICAgICAgbWF4bGVuZ3RoOiAnMzAwJyxcbiAgICAgICAgICAgIHJvd3M6ICczJyxcbiAgICAgICAgIH0pXG4gICAgICAgICAuYXBwZW5kVG8oaGlkZGVuSW5wdXRzKTtcblxuICAgICAgY29uc3Qgc2VsZWN0aW9uSW5wdXRzID0gY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgIC5zZXRBdHRyaWJ1dGVzKHtcbiAgICAgICAgICAgIGNsYXNzOiAnc2VsZWN0aW9uLWlucHV0cycsXG4gICAgICAgICB9KVxuICAgICAgICAgLmFwcGVuZFRvKGhpZGRlbklucHV0cyk7XG5cbiAgICAgIGNvbnN0IGRhdGVJbnB1dCA9IGNyZWF0ZUVsZW1lbnQoJ2lucHV0JylcbiAgICAgICAgIC5zZXRBdHRyaWJ1dGVzKHtcbiAgICAgICAgICAgIHR5cGU6ICdkYXRlJyxcbiAgICAgICAgICAgIG5hbWU6ICdkYXRlLWlucHV0JyxcbiAgICAgICAgICAgIG1pbjogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF0sXG4gICAgICAgICAgICB2YWx1ZTogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF0sXG4gICAgICAgICB9KVxuICAgICAgICAgLmFwcGVuZFRvKHNlbGVjdGlvbklucHV0cyk7XG5cbiAgICAgIGNvbnN0IHNlbGVjdFByb2plY3QgPSBjcmVhdGVFbGVtZW50KCdzZWxlY3QnKVxuICAgICAgICAgLnNldEF0dHJpYnV0ZXMoe1xuICAgICAgICAgICAgY2xhc3M6ICdzZWxlY3QtcHJvamVjdCcsXG4gICAgICAgICAgICBuYW1lOiAnc2VsZWN0LXByb2plY3QnLFxuICAgICAgICAgICAgLy8gcmVxdWlyZWQ6ICcnLFxuICAgICAgICAgfSlcbiAgICAgICAgIC5hcHBlbmRUbyhzZWxlY3Rpb25JbnB1dHMpO1xuXG4gICAgICBjb25zdCBzZWxlY3RQcmlvcml0eSA9IGNyZWF0ZUVsZW1lbnQoJ3NlbGVjdCcpXG4gICAgICAgICAuc2V0QXR0cmlidXRlcyh7XG4gICAgICAgICAgICBjbGFzczogJ3NlbGVjdC1wcmlvcml0eScsXG4gICAgICAgICAgICBuYW1lOiAnc2VsZWN0LXByaW9yaXR5JyxcbiAgICAgICAgIH0pXG4gICAgICAgICAuYXBwZW5kVG8oc2VsZWN0aW9uSW5wdXRzKTtcblxuICAgICAgY29uc3Qgc3VibWl0QnRuID0gY3JlYXRlRWxlbWVudCgnYnV0dG9uJylcbiAgICAgICAgIC5zZXRBdHRyaWJ1dGVzKHtcbiAgICAgICAgICAgIHR5cGU6ICdzdWJtaXQnLFxuICAgICAgICAgICAgbmFtZTogJ3NhdmUtdGFzaycsXG4gICAgICAgICB9KVxuICAgICAgICAgLnNldENvbnRlbnQoJ0FkZCBUYXNrJylcbiAgICAgICAgIC5wcmVwZW5kSWNvbignZmEtcmVndWxhciBmYS1jYWxlbmRhci1wbHVzJylcbiAgICAgICAgIC5hcHBlbmRUbyhoaWRkZW5JbnB1dHMpO1xuXG4gICAgICB0aGlzLnNldHVwU2VsZWN0UHJvamVjdExpc3Qoc2VsZWN0UHJvamVjdCk7XG4gICAgICB0aGlzLnNldFVwUHJpb3JpdGllcyhzZWxlY3RQcmlvcml0eSk7XG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnZXhwYW5kZWQnLCBmYWxzZSk7XG4gICB9XG5cbiAgIGV4cGFuZCgpIHtcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdhY3RpdmUnLCAnJyk7XG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnZXhwYW5kZWQnLCB0cnVlKTtcbiAgICAgIGNvbnN0IHRpdGxlSW5wdXQgPSB0aGlzLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9dGl0bGUtaW5wdXRdJyk7XG4gICAgICB0aXRsZUlucHV0LnNldEF0dHJpYnV0ZSgncGxhY2Vob2xkZXInLCAnVGl0bGUnKTtcbiAgICAgIHRpdGxlSW5wdXQuZm9jdXMoKTtcbiAgIH1cblxuICAgY29udHJhY3QoKSB7XG4gICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZSgnYWN0aXZlJyk7XG5cbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdleHBhbmRlZCcsIGZhbHNlKTtcbiAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgIHRoaXMucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT10aXRsZS1pbnB1dF0nKS5zZXRBdHRyaWJ1dGUoXG4gICAgICAgICAncGxhY2Vob2xkZXInLFxuICAgICAgICAgJ0NyZWF0ZSBhIHRhc2snXG4gICAgICApO1xuICAgfVxuXG4gICBzaG93RXJyb3IoKSB7XG4gICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ2Vycm9yJyk7XG5cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgdGhpcy5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPXRpdGxlLWlucHV0XScpLmZvY3VzKCk7XG4gICAgICAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ2Vycm9yJyk7XG4gICAgICB9LCAxNDAwKTtcbiAgIH1cblxuICAgc2V0dXBTZWxlY3RQcm9qZWN0TGlzdChzZWxlY3RQcm9qZWN0KSB7XG4gICAgICBjb25zdCBub1Byb2plY3RPcHRpb24gPSBjcmVhdGVFbGVtZW50KCdvcHRpb24nKVxuICAgICAgICAgLnNldEF0dHJpYnV0ZXMoe1xuICAgICAgICAgICAgc2VsZWN0ZWQ6ICcnLFxuICAgICAgICAgICAgdmFsdWU6ICcnLFxuICAgICAgICAgICAgLy8gZGlzYWJsZWQ6ICcnLFxuICAgICAgICAgICAgLy8gaGlkZGVuOiAnJyxcbiAgICAgICAgIH0pXG4gICAgICAgICAuc2V0Q29udGVudCgnU2VsZWN0IGEgcHJvamVjdCcpXG4gICAgICAgICAucHJlcGVuZFRvKHNlbGVjdFByb2plY3QpO1xuXG4gICAgICB0aGlzLnN0YXRlLmNhdGVnb3JpZXMuZm9yRWFjaCgoY2F0ZWdvcnkpID0+IHtcbiAgICAgICAgIGNvbnN0IG9wdEdycCA9IGNyZWF0ZUVsZW1lbnQoJ29wdGdyb3VwJykuc2V0QXR0cmlidXRlcyh7XG4gICAgICAgICAgICBsYWJlbDogY2F0ZWdvcnkudGl0bGUsXG4gICAgICAgICAgICBpZDogY2F0ZWdvcnkuaWQsXG4gICAgICAgICB9KTtcblxuICAgICAgICAgY29uc3QgY2F0ZWdvcnlQcm9qZWN0cyA9IHRoaXMuc3RhdGUucHJvamVjdHMuZmlsdGVyKFxuICAgICAgICAgICAgKHByb2plY3QpID0+IHByb2plY3QuY2F0ZWdvcnlJZCA9PT0gY2F0ZWdvcnkuaWRcbiAgICAgICAgICk7XG5cbiAgICAgICAgIGNhdGVnb3J5UHJvamVjdHMuZm9yRWFjaCgocHJvamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgb3B0aW9uID0gY3JlYXRlRWxlbWVudCgnb3B0aW9uJylcbiAgICAgICAgICAgICAgIC5zZXRBdHRyaWJ1dGVzKHtcbiAgICAgICAgICAgICAgICAgIGlkOiBwcm9qZWN0LmlkLFxuICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgIC5zZXRDb250ZW50KHByb2plY3QudGl0bGUpO1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5jdXJyZW50RmlsdGVyLnR5cGUgPT09ICdwcm9qZWN0JyAmJlxuICAgICAgICAgICAgICAgcHJvamVjdC5pZCA9PT0gdGhpcy5zdGF0ZS5jdXJyZW50RmlsdGVyLnZhbHVlXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgIG9wdGlvbi5zZXRBdHRyaWJ1dGUoJ3NlbGVjdGVkJywgJycpO1xuICAgICAgICAgICAgICAgbm9Qcm9qZWN0T3B0aW9uLnJlbW92ZUF0dHJpYnV0ZSgnc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9wdEdycC5hcHBlbmRDaGlsZChvcHRpb24pO1xuICAgICAgICAgfSk7XG4gICAgICAgICBzZWxlY3RQcm9qZWN0LmFwcGVuZENoaWxkKG9wdEdycCk7XG4gICAgICB9KTtcbiAgIH1cblxuICAgc2V0VXBQcmlvcml0aWVzKHNlbGVjdFByaW9yaXR5KSB7XG4gICAgICBjb25zdCBwcmlvcml0aWVzID0gWycxJywgJzInLCAnMycsICc0J107XG4gICAgICBwcmlvcml0aWVzLmZvckVhY2goKHByaW9yaXR5KSA9PiB7XG4gICAgICAgICBjb25zdCBvcHRpb24gPSBjcmVhdGVFbGVtZW50KCdvcHRpb24nKVxuICAgICAgICAgICAgLnNldEF0dHJpYnV0ZXMoe1xuICAgICAgICAgICAgICAgY2xhc3M6ICdwcmlvcml0eScsXG4gICAgICAgICAgICAgICBpZDogcHJpb3JpdHksXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnByZXBlbmRJY29uKCdmYS1zb2xpZCBmYS1mbGFnJylcbiAgICAgICAgICAgIC5zZXRDb250ZW50KGBQcmlvcml0eSAke3ByaW9yaXR5fWApXG4gICAgICAgICAgICAuYXBwZW5kVG8oc2VsZWN0UHJpb3JpdHkpO1xuICAgICAgfSk7XG4gICB9XG5cbiAgIGFkZEV2ZW50TGlzdGVuZXJzKCkge1xuICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZXYpID0+IHtcbiAgICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICB0aGlzLnBhc3NEYXRhKCk7XG4gICAgICAgICB0aGlzLmNvbnRyYWN0KCk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldikgPT4ge1xuICAgICAgICAgaWYgKFxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2FjdGl2ZV1gKSAmJlxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2FjdGl2ZV1gKSAhPT0gdGhpc1xuICAgICAgICAgKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbYWN0aXZlXWApLnNob3dFcnJvcigpO1xuICAgICAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgIH1cbiAgICAgICAgIGlmIChldi50YXJnZXQubmFtZSA9PT0gJ29wZW4tZm9ybScpIHtcbiAgICAgICAgICAgIHRoaXMuZXhwYW5kKCk7XG4gICAgICAgICB9IGVsc2UgaWYgKGV2LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2Nsb3NlLWZvcm0nKSkge1xuICAgICAgICAgICAgdGhpcy5jb250cmFjdCgpO1xuICAgICAgICAgfVxuICAgICAgfSk7XG4gICB9XG5cbiAgIHBhc3NEYXRhKCkge1xuICAgICAgY29uc3Qgc2VsZWN0UHJvamVjdCA9IHRoaXMuZWxlbWVudHNbJ3NlbGVjdC1wcm9qZWN0J107XG4gICAgICBjb25zdCBzZWxlY3RQcmlvcml0eSA9IHRoaXMuZWxlbWVudHNbJ3NlbGVjdC1wcmlvcml0eSddO1xuXG4gICAgICBjb25zdCBmb3JtRGF0YSA9IHtcbiAgICAgICAgIGRhdGFUeXBlOiAndGFzaycsXG4gICAgICAgICBjb21wbGV0ZWQ6IGZhbHNlLFxuICAgICAgICAgdGl0bGU6IHRoaXMuZWxlbWVudHNbJ3RpdGxlLWlucHV0J10udmFsdWUsXG4gICAgICAgICBkZXNjcmlwdGlvbjogdGhpcy5lbGVtZW50c1snZGVzY3JpcHRpb24taW5wdXQnXS52YWx1ZSxcbiAgICAgICAgIGRhdGU6IHRoaXMuZWxlbWVudHNbJ2RhdGUtaW5wdXQnXS52YWx1ZSxcbiAgICAgICAgIHByb2plY3RJZDogc2VsZWN0UHJvamVjdC5vcHRpb25zW3NlbGVjdFByb2plY3Quc2VsZWN0ZWRJbmRleF0uaWQsXG4gICAgICAgICBwcmlvcml0eTogc2VsZWN0UHJpb3JpdHkub3B0aW9uc1tzZWxlY3RQcmlvcml0eS5zZWxlY3RlZEluZGV4XS5pZCxcbiAgICAgICAgIGNhdGVnb3J5SWQ6XG4gICAgICAgICAgICBzZWxlY3RQcm9qZWN0Lm9wdGlvbnNbc2VsZWN0UHJvamVjdC5zZWxlY3RlZEluZGV4XS5wYXJlbnRFbGVtZW50LmlkLFxuICAgICAgfTtcblxuICAgICAgcHVic3ViLnB1Ymxpc2goJ3Rhc2s6YWRkJywgZm9ybURhdGEpO1xuICAgfVxufVxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdhZGQtdGFzay1mb3JtJywgQWRkVGFza0Zvcm0sIHsgZXh0ZW5kczogJ2Zvcm0nIH0pO1xuZXhwb3J0IGRlZmF1bHQgQWRkVGFza0Zvcm07XG4iLCJpbXBvcnQgY3JlYXRlRWxlbWVudCBmcm9tICcuLi8uLi91dGlscy9FbGVtZW50QnVpbGRlcic7XG5pbXBvcnQgcHVic3ViIGZyb20gJy4uLy4uL3V0aWxzL1B1YlN1Yic7XG5cbmNsYXNzIExpc3RJdGVtIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVycygpO1xuICAgfVxuXG4gICByZW5kZXIoKSB7XG4gICAgICBjb25zdCB0aXRsZSA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgICAuc2V0Q29udGVudCh0aGlzLnN0YXRlLnRpdGxlKVxuICAgICAgICAgLnNldEF0dHJpYnV0ZXMoeyBjbGFzczogJ2l0ZW0tdGl0bGUnIH0pXG4gICAgICAgICAuY2FwaXRhbEZpcnN0TGV0dGVyKClcbiAgICAgICAgIC5hcHBlbmRUbyh0aGlzKTtcblxuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ2RhdGEtdHlwZScsIHRoaXMuc3RhdGUuZGF0YVR5cGUpO1xuICAgICAgaWYgKHRoaXMuc3RhdGUuaWQpIHRoaXMuc2V0QXR0cmlidXRlKCdpZCcsIHRoaXMuc3RhdGUuaWQpO1xuXG4gICAgICBjb25zdCBidXR0b25zID0gY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgIC5zZXRBdHRyaWJ1dGVzKHsgY2xhc3M6ICdpdGVtLWJ1dHRvbnMnIH0pXG4gICAgICAgICAuYXBwZW5kVG8odGhpcyk7XG5cbiAgICAgIGNvbnN0IGVkaXRCdG4gPSBjcmVhdGVFbGVtZW50KCdidXR0b24nKVxuICAgICAgICAgLmFwcGVuZEljb24oJ2ZhLXNvbGlkIGZhLXBlbicpXG4gICAgICAgICAuc2V0QXR0cmlidXRlcyh7IGNsYXNzOiAnZWRpdC1pdGVtJywgdHlwZTogJ2J1dHRvbicgfSlcbiAgICAgICAgIC5hcHBlbmRUbyhidXR0b25zKTtcblxuICAgICAgY29uc3QgZGVsZXRlQnRuID0gY3JlYXRlRWxlbWVudCgnYnV0dG9uJylcbiAgICAgICAgIC5hcHBlbmRJY29uKCdmYS1yZWd1bGFyIGZhLXRyYXNoLWNhbicpXG4gICAgICAgICAuc2V0QXR0cmlidXRlcyh7XG4gICAgICAgICAgICBjbGFzczogJ2RlbGV0ZS1pdGVtJyxcbiAgICAgICAgICAgIHR5cGU6ICdidXR0b24nLFxuICAgICAgICAgfSlcbiAgICAgICAgIC5hcHBlbmRUbyhidXR0b25zKTtcblxuICAgICAgY29uc3Qgc2F2ZUJ0biA9IGNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXG4gICAgICAgICAuYXBwZW5kSWNvbignZmEtc29saWQgZmEtY2hlY2snKVxuICAgICAgICAgLnNldEF0dHJpYnV0ZXMoeyBjbGFzczogJ3NhdmUtaXRlbScsIHR5cGU6ICdidXR0b24nIH0pXG4gICAgICAgICAuYXBwZW5kVG8oYnV0dG9ucyk7XG5cbiAgICAgIGNvbnN0IGNhbmNlbEJ0biA9IGNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXG4gICAgICAgICAuYXBwZW5kSWNvbignZmEtc29saWQgZmEteG1hcmsnKVxuICAgICAgICAgLnNldEF0dHJpYnV0ZXMoeyBjbGFzczogJ2NhbmNlbC1lZGl0aW5nJyB9KVxuICAgICAgICAgLmFwcGVuZFRvKGJ1dHRvbnMpO1xuICAgfVxuXG4gICBhZGRFdmVudExpc3RlbmVycygpIHtcbiAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXYpID0+IHtcbiAgICAgICAgIGlmIChcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFthY3RpdmVdYCkgJiZcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFthY3RpdmVdYCkgIT09IHRoaXMgJiZcbiAgICAgICAgICAgICF0aGlzLmNsb3Nlc3QoJ2V4cC1saXN0JykuY2xhc3NMaXN0LmNvbnRhaW5zKCdjaGVja2xpc3QnKVxuICAgICAgICAgKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbYWN0aXZlXWApLnNob3dFcnJvcigpO1xuICAgICAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgIH1cbiAgICAgICAgIGlmIChldi50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdlZGl0LWl0ZW0nKSkgdGhpcy5zdGFydEVkaXRJdGVtKCk7XG4gICAgICAgICBlbHNlIGlmIChldi50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkZWxldGUtaXRlbScpKVxuICAgICAgICAgICAgdGhpcy5kZWxldGVJdGVtKCk7XG5cbiAgICAgICAgIGlmIChldi50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdzYXZlLWl0ZW0nKSkgdGhpcy5zYXZlSXRlbSgpO1xuICAgICAgICAgaWYgKGV2LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2NhbmNlbC1lZGl0aW5nJykpXG4gICAgICAgICAgICB0aGlzLmNhbmNlbENoYW5nZXMoKTtcbiAgICAgIH0pO1xuXG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCAoZXYpID0+IHtcbiAgICAgICAgIGlmICghdGhpcy5oYXNBdHRyaWJ1dGUoJ2FjdGl2ZScpKSByZXR1cm47XG4gICAgICAgICBpZiAoXG4gICAgICAgICAgICB0aGlzLmhhc0F0dHJpYnV0ZSgnYWN0aXZlJykgJiZcbiAgICAgICAgICAgIGV2LnRhcmdldC5jbG9zZXN0KCdlZGl0YWJsZS1saScpICE9PSB0aGlzXG4gICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd0Vycm9yKCk7XG4gICAgICAgICB9XG4gICAgICB9KTtcbiAgIH1cblxuICAgLy8gc2hvd0Vycm9yKCkge1xuICAgLy8gICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdlcnJvcicpO1xuICAgLy8gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAvLyAgICAgICB0aGlzLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0JykuZm9jdXMoKTtcbiAgIC8vICAgICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnZXJyb3InKTtcbiAgIC8vICAgIH0sIDE0MDApO1xuICAgLy8gfVxuXG4gICBzdGFydEVkaXRJdGVtKCkge1xuICAgICAgY29uc3QgaW5wdXQgPSBjcmVhdGVFbGVtZW50KCdpbnB1dCcpXG4gICAgICAgICAuc2V0QXR0cmlidXRlcyh7XG4gICAgICAgICAgICBtaW5sZW5ndGg6ICc0JyxcbiAgICAgICAgICAgIG1heGxlbmd0aDogJzMwJyxcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBgTmV3ICR7dGhpcy5nZXRBdHRyaWJ1dGUoJ2RhdGEtdHlwZScpfWAsXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5zdGF0ZS50aXRsZSB8fCAnJyxcbiAgICAgICAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgICAgICAgIGNsYXNzOiAnZWRpdGluZy1pbnB1dCcsXG4gICAgICAgICB9KVxuICAgICAgICAgLmFwcGVuZFRvKHRoaXMpO1xuXG4gICAgICBpbnB1dC5mb2N1cygpO1xuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGVzKHsgYWN0aXZlOiAnJyB9KTtcbiAgIH1cblxuICAgZW5kRWRpdEl0ZW0oKSB7XG4gICAgICBjb25zdCBpbnB1dCA9IHRoaXMucXVlcnlTZWxlY3RvcignaW5wdXQnKTtcbiAgICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlKCdhY3RpdmUnKTtcblxuICAgICAgaW5wdXQucmVtb3ZlKCk7XG4gICB9XG5cbiAgIGNhbmNlbENoYW5nZXMoKSB7XG4gICAgICBpZiAoIXRoaXMuZ2V0QXR0cmlidXRlKCdpZCcpKSB7XG4gICAgICAgICBpZiAodGhpcy5jbGFzc0xpc3QuY29udGFpbnMoJ2xpc3QtaGVhZGVyJykpXG4gICAgICAgICAgICB0aGlzLnBhcmVudEVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICAgICBlbHNlIHRoaXMucmVtb3ZlKCk7XG4gICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCB0aXRsZSA9IHRoaXMucXVlcnlTZWxlY3RvcignLml0ZW0tdGl0bGUnKTtcbiAgICAgIHRpdGxlLnRleHRDb250ZW50ID0gdGhpcy5zdGF0ZS50aXRsZTtcbiAgICAgIHRpdGxlLmNhcGl0YWxGaXJzdExldHRlcigpO1xuICAgICAgdGhpcy5lbmRFZGl0SXRlbSgpO1xuICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoJ2FjdGl2ZScpO1xuICAgfVxuXG4gICBkZWxldGVJdGVtKCkge1xuICAgICAgcHVic3ViLnB1Ymxpc2goYCR7dGhpcy5nZXRBdHRyaWJ1dGUoJ2RhdGEtdHlwZScpfTpkZWxldGVgLCB0aGlzKTtcbiAgICAgIHRoaXMucmVtb3ZlKCk7XG4gICB9XG5cbiAgIHNhdmVJdGVtKCkge1xuICAgICAgY29uc3QgaW5wdXQgPSB0aGlzLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0Jyk7XG4gICAgICBjb25zdCB0aXRsZSA9IHRoaXMucXVlcnlTZWxlY3RvcignLml0ZW0tdGl0bGUnKTtcblxuICAgICAgaWYgKCFpbnB1dC52YWx1ZSB8fCBpbnB1dC52YWx1ZS5sZW5ndGggPCA0IHx8IGlucHV0LnZhbHVlLmxlbmd0aCA+IDMwKSB7XG4gICAgICAgICB0aGlzLnNob3dFcnJvcigpO1xuICAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aXRsZS50ZXh0Q29udGVudCA9IGlucHV0LnZhbHVlO1xuICAgICAgdGl0bGUuY2FwaXRhbEZpcnN0TGV0dGVyKCk7XG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZShcbiAgICAgICAgICdwYXJlbnQtbGlzdCcsXG4gICAgICAgICB0aGlzLnBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdsaXN0LWlkJylcbiAgICAgICk7XG4gICAgICB0aGlzLnN0YXRlLnRpdGxlID0gaW5wdXQudmFsdWU7XG4gICAgICB0aGlzLmVuZEVkaXRJdGVtKCk7XG4gICAgICBpZiAodGhpcy5nZXRBdHRyaWJ1dGUoJ2lkJykpIHtcbiAgICAgICAgIHB1YnN1Yi5wdWJsaXNoKGAke3RoaXMuZ2V0QXR0cmlidXRlKCdkYXRhLXR5cGUnKX06dXBkYXRlYCwgdGhpcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgcHVic3ViLnB1Ymxpc2goYCR7dGhpcy5nZXRBdHRyaWJ1dGUoJ2RhdGEtdHlwZScpfTphZGRgLCB0aGlzKTtcbiAgICAgIH1cbiAgIH1cbn1cbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnZWRpdGFibGUtbGknLCBMaXN0SXRlbSk7XG5leHBvcnQgZGVmYXVsdCBMaXN0SXRlbTtcbiIsImltcG9ydCBhdXRvQW5pbWF0ZSBmcm9tICdAZm9ybWtpdC9hdXRvLWFuaW1hdGUnO1xuaW1wb3J0IGNyZWF0ZUVsZW1lbnQgZnJvbSAnLi4vLi4vdXRpbHMvRWxlbWVudEJ1aWxkZXInO1xuaW1wb3J0IHB1YnN1YiBmcm9tICcuLi8uLi91dGlscy9QdWJTdWInO1xuaW1wb3J0IExpc3RJdGVtIGZyb20gJy4vRWRpdGFibGVMaXN0SXRlbSc7XG5cbmNsYXNzIEV4cGFuZGFibGVMaXN0IGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVycygpO1xuICAgfVxuXG4gICByZW5kZXIoKSB7XG4gICAgICBjb25zdCBsaXN0SGVhZGVyID0gY3JlYXRlRWxlbWVudCgnZWRpdGFibGUtbGknKVxuICAgICAgICAgLnNldFN0YXRlKHRoaXMuc3RhdGUuaGVhZGVyKVxuICAgICAgICAgLnNldEF0dHJpYnV0ZXMoe1xuICAgICAgICAgICAgY2xhc3M6ICdsaXN0LWhlYWRlcicsXG4gICAgICAgICB9KTtcblxuICAgICAgY29uc3QgbGlzdFVsID0gY3JlYXRlRWxlbWVudCgndWwnKS5zZXRBdHRyaWJ1dGVzKHtcbiAgICAgICAgICdsaXN0LWlkJzogdGhpcy5zdGF0ZS5oZWFkZXIuaWQgfHwgbnVsbCxcbiAgICAgICAgIGNsYXNzOiAnaXRlbXMtbGlzdCcsXG4gICAgICAgICAnaXRlbXMtdHlwZSc6IHRoaXMuc3RhdGUuaXRlbXMudHlwZSxcbiAgICAgIH0pO1xuXG4gICAgICBhdXRvQW5pbWF0ZShsaXN0VWwpO1xuXG4gICAgICBpZiAodGhpcy5zdGF0ZS5pdGVtcy5saXN0KSB7XG4gICAgICAgICB0aGlzLnN0YXRlLml0ZW1zLmxpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaXRlbUxJID0gY3JlYXRlRWxlbWVudCgnZWRpdGFibGUtbGknKS5zZXRTdGF0ZShpdGVtKTtcbiAgICAgICAgICAgIGxpc3RVbC5hcHBlbmRDaGlsZChpdGVtTEkpO1xuICAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuYXBwZW5kQ2hpbGQobGlzdEhlYWRlcik7XG4gICAgICB0aGlzLmFwcGVuZENoaWxkKGxpc3RVbCk7XG5cbiAgICAgIGNvbnN0IGFkZEl0ZW1CdG4gPSBjcmVhdGVFbGVtZW50KCdidXR0b24nKVxuICAgICAgICAgLnNldEF0dHJpYnV0ZXMoe1xuICAgICAgICAgICAgY2xhc3M6ICdhZGQtaXRlbScsXG4gICAgICAgICB9KVxuICAgICAgICAgLmFwcGVuZEljb24oJ2ZhLXNvbGlkIGZhLXBsdXMnKTtcblxuICAgICAgbGlzdEhlYWRlci5xdWVyeVNlbGVjdG9yKCcuaXRlbS1idXR0b25zJykucHJlcGVuZChhZGRJdGVtQnRuKTtcbiAgIH1cblxuICAgdG9nZ2xlTGlzdCgpIHtcbiAgICAgIHRoaXMudG9nZ2xlQXR0cmlidXRlKCdleHBhbmRlZCcpO1xuICAgfVxuXG4gICBhZGRFdmVudExpc3RlbmVycygpIHtcbiAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXYpID0+IHtcbiAgICAgICAgIGlmIChcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFthY3RpdmVdYCkgJiZcbiAgICAgICAgICAgICF0aGlzLmNvbnRhaW5zKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFthY3RpdmVdYCkpICYmXG4gICAgICAgICAgICAhdGhpcy5jbGFzc0xpc3QuY29udGFpbnMoJ2NoZWNrbGlzdCcpXG4gICAgICAgICApIHtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFthY3RpdmVdYCkuc2hvd0Vycm9yKCk7XG4gICAgICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgfVxuXG4gICAgICAgICBpZiAoXG4gICAgICAgICAgICAhZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZWRpdGFibGUtbGlbYWN0aXZlXScpICYmXG4gICAgICAgICAgICBldi50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdhZGQtaXRlbScpXG4gICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMuYWRkSXRlbSgpO1xuICAgICAgICAgfVxuICAgICAgfSk7XG4gICB9XG5cbiAgIGFkZEl0ZW0oKSB7XG4gICAgICBpZiAoIXRoaXMuaGFzQXR0cmlidXRlKCdleHBhbmRlZCcpKSB0aGlzLnRvZ2dsZUxpc3QoKTtcblxuICAgICAgY29uc3QgaXRlbXNMaXN0ID0gdGhpcy5xdWVyeVNlbGVjdG9yKCcuaXRlbXMtbGlzdCcpO1xuICAgICAgY29uc3QgaXRlbVR5cGUgPSBpdGVtc0xpc3QuZ2V0QXR0cmlidXRlKCdpdGVtcy10eXBlJyk7XG4gICAgICBjb25zdCBuZXdJdGVtID0gY3JlYXRlRWxlbWVudCgnZWRpdGFibGUtbGknKS5zZXRTdGF0ZSh7XG4gICAgICAgICBkYXRhVHlwZTogaXRlbVR5cGUsXG4gICAgICB9KTtcbiAgICAgIGl0ZW1zTGlzdC5hcHBlbmRDaGlsZChuZXdJdGVtKTtcbiAgICAgIG5ld0l0ZW0uc3RhcnRFZGl0SXRlbSgpO1xuICAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ2V4cC1saXN0JywgRXhwYW5kYWJsZUxpc3QpO1xuXG5leHBvcnQgZGVmYXVsdCBFeHBhbmRhYmxlTGlzdDtcbiIsImltcG9ydCBjcmVhdGVFbGVtZW50IGZyb20gJy4uLy4uL3V0aWxzL0VsZW1lbnRCdWlsZGVyJztcbmltcG9ydCBwdWJzdWIgZnJvbSAnLi4vLi4vdXRpbHMvUHViU3ViJztcbmltcG9ydCBFeHBhbmRhYmxlTGlzdCBmcm9tICcuL0V4cGFuZGFibGVMaXN0JztcblxuY2xhc3MgUHJvamVjdExpc3QgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXJzKCk7XG4gICB9XG5cbiAgIHJlbmRlcigpIHtcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdpZCcsICdwcm9qZWN0cy1saXN0Jyk7XG4gICAgICBjb25zdCBoZWFkZXIgPSBjcmVhdGVFbGVtZW50KCdoMycpXG4gICAgICAgICAuc2V0Q29udGVudCgnUHJvamVjdHMnKVxuICAgICAgICAgLnByZXBlbmRJY29uKCdmYS1zb2xpZCBmYS1iYXJzLXByb2dyZXNzJylcbiAgICAgICAgIC5zZXRBdHRyaWJ1dGVzKHsgY2xhc3M6ICdwcm9qZWN0cy1saXN0LWhlYWRlcicgfSk7XG4gICAgICB0aGlzLnByZXBlbmQoaGVhZGVyKTtcblxuICAgICAgdGhpcy5idWlsZFByb2plY3RzTGlzdCgpO1xuXG4gICAgICBjb25zdCBhZGRDYXRlZ29yeUJ0biA9IGNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXG4gICAgICAgICAuc2V0QXR0cmlidXRlcyh7IGNsYXNzOiAnYWRkLWNhdGVnb3J5LWJ0bicgfSlcbiAgICAgICAgIC5zZXRDb250ZW50KCdOZXcgcHJvamVjdHMgbGlzdC4uLicpXG4gICAgICAgICAucHJlcGVuZEljb24oJ2ZhLXNvbGlkIGZhLXNxdWFyZS1wbHVzJyk7XG5cbiAgICAgIHRoaXMuYXBwZW5kKGFkZENhdGVnb3J5QnRuKTtcbiAgIH1cblxuICAgYnVpbGRQcm9qZWN0c0xpc3QoKSB7XG4gICAgICB0aGlzLnN0YXRlLmNhdGVnb3JpZXMuZm9yRWFjaCgoY2F0ZWdvcnkpID0+IHtcbiAgICAgICAgIGNvbnN0IGNhdGVnb3J5UHJvamVjdHMgPSB0aGlzLnN0YXRlLnByb2plY3RzLmZpbHRlcihcbiAgICAgICAgICAgIChwcm9qZWN0KSA9PiBwcm9qZWN0LmNhdGVnb3J5SWQgPT09IGNhdGVnb3J5LmlkXG4gICAgICAgICApO1xuICAgICAgICAgdGhpcy5jcmVhdGVDYXRlZ29yeUxpc3QoY2F0ZWdvcnksIGNhdGVnb3J5UHJvamVjdHMpO1xuICAgICAgfSk7XG4gICB9XG5cbiAgIGNyZWF0ZUNhdGVnb3J5TGlzdChjYXRlZ29yeSwgY2F0ZWdvcnlQcm9qZWN0cykge1xuICAgICAgY29uc3QgbGlzdCA9IGNyZWF0ZUVsZW1lbnQoJ2V4cC1saXN0Jykuc2V0U3RhdGUoe1xuICAgICAgICAgaGVhZGVyOiBjYXRlZ29yeSxcbiAgICAgICAgIGl0ZW1zOiB7IHR5cGU6ICdwcm9qZWN0JywgbGlzdDogY2F0ZWdvcnlQcm9qZWN0cyB9LFxuICAgICAgfSk7XG4gICAgICB0aGlzLmFwcGVuZChsaXN0KTtcbiAgIH1cblxuICAgaGlnaGxpZ2h0Q3VycmVudEZpbHRlcihmaWx0ZXJEYXRhKSB7XG4gICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2N1cnJlbnQtZmlsdGVyXWApKSB7XG4gICAgICAgICBkb2N1bWVudFxuICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoYFtjdXJyZW50LWZpbHRlcl1gKVxuICAgICAgICAgICAgLnJlbW92ZUF0dHJpYnV0ZSgnY3VycmVudC1maWx0ZXInKTtcbiAgICAgIH1cbiAgICAgIHRoaXMucXVlcnlTZWxlY3RvcihgW2lkPSR7ZmlsdGVyRGF0YS5pZH1dYCkuc2V0QXR0cmlidXRlKFxuICAgICAgICAgJ2N1cnJlbnQtZmlsdGVyJyxcbiAgICAgICAgICcnXG4gICAgICApO1xuICAgfVxuXG4gICBhZGRFdmVudExpc3RlbmVycygpIHtcbiAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXYpID0+IHtcbiAgICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbYWN0aXZlXWApKSByZXR1cm47XG5cbiAgICAgICAgIGlmIChldi50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdhZGQtY2F0ZWdvcnktYnRuJykpIHtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQ2F0ZWdvcnlMaXN0KHsgZGF0YVR5cGU6ICdjYXRlZ29yeScgfSwgbnVsbCk7XG4gICAgICAgICAgICB0aGlzLmxhc3RDaGlsZC5maXJzdENoaWxkLnN0YXJ0RWRpdEl0ZW0oKTtcbiAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICBldi50YXJnZXQuY2xvc2VzdCgnZWRpdGFibGUtbGknKSAmJlxuICAgICAgICAgICAgIWV2LnRhcmdldC5wYXJlbnROb2RlLmNsYXNzTGlzdC5jb250YWlucygnaXRlbS1idXR0b25zJykgJiZcbiAgICAgICAgICAgICFldi50YXJnZXQuY2xvc2VzdCgnZWRpdGFibGUtbGknKS5oYXNBdHRyaWJ1dGUoJ2FjdGl2ZScpXG4gICAgICAgICApIHtcbiAgICAgICAgICAgIGNvbnN0IGZpbHRlckVsbSA9IGV2LnRhcmdldC5jbG9zZXN0KCdlZGl0YWJsZS1saScpO1xuICAgICAgICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgICAgICAgIGlkOiBmaWx0ZXJFbG0uZ2V0QXR0cmlidXRlKCdpZCcpLFxuICAgICAgICAgICAgICAgdHlwZTogZmlsdGVyRWxtLmdldEF0dHJpYnV0ZSgnZGF0YS10eXBlJyksXG4gICAgICAgICAgICAgICB2YWx1ZTogZmlsdGVyRWxtLmdldEF0dHJpYnV0ZSgnaWQnKSxcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGlmIChmaWx0ZXJFbG0uY2xhc3NMaXN0LmNvbnRhaW5zKCdsaXN0LWhlYWRlcicpKSB7XG4gICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAhZmlsdGVyRWxtLmhhc0F0dHJpYnV0ZSgnY3VycmVudC1maWx0ZXInKSAmJlxuICAgICAgICAgICAgICAgICAgZmlsdGVyRWxtLmNsb3Nlc3QoJ2V4cC1saXN0JykuaGFzQXR0cmlidXRlKCdleHBhbmRlZCcpXG4gICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0Q3VycmVudEZpbHRlcihmaWx0ZXJFbG0pO1xuICAgICAgICAgICAgICAgICAgcHVic3ViLnB1Ymxpc2goJ2ZpbHRlcjpjaGFuZ2VkJywgZGF0YSk7XG4gICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICBmaWx0ZXJFbG0uY2xvc2VzdCgnZXhwLWxpc3QnKS50b2dnbGVMaXN0KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0Q3VycmVudEZpbHRlcihmaWx0ZXJFbG0pO1xuICAgICAgICAgICAgcHVic3ViLnB1Ymxpc2goJ2ZpbHRlcjpjaGFuZ2VkJywgZGF0YSk7XG4gICAgICAgICB9XG4gICAgICB9KTtcbiAgIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdwcm9qZWN0LWxpc3QnLCBQcm9qZWN0TGlzdCk7XG5cbmV4cG9ydCBkZWZhdWx0IFByb2plY3RMaXN0O1xuIiwiaW1wb3J0IHsgc3RhcnRPZldlZWssIGVuZE9mV2VlayB9IGZyb20gJ2RhdGUtZm5zJztcbmltcG9ydCBjcmVhdGVFbGVtZW50IGZyb20gJy4uLy4uL3V0aWxzL0VsZW1lbnRCdWlsZGVyJztcbmltcG9ydCBwdWJzdWIgZnJvbSAnLi4vLi4vdXRpbHMvUHViU3ViJztcblxuY2xhc3MgU2lkZUJhciBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcnMoKTtcbiAgIH1cblxuICAgcmVuZGVyKCkge1xuICAgICAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuICAgICAgY29uc3Qgd2VlayA9IHsgc3RhcnQ6IHN0YXJ0T2ZXZWVrKHRvZGF5KSwgZW5kOiBlbmRPZldlZWsodG9kYXkpIH07XG4gICAgICBjb25zdCBkZWZhdWx0RmlsdGVycyA9IFtcbiAgICAgICAgIHsgdGl0bGU6ICdhbGwnLCB0eXBlOiAnYWxsJywgdmFsdWU6ICdhbGwnLCBpY29uOiAnZmEtc29saWQgZmEtaW5ib3gnIH0sXG4gICAgICAgICB7XG4gICAgICAgICAgICB0aXRsZTogJ3RvZGF5JyxcbiAgICAgICAgICAgIHR5cGU6ICdkYXRlJyxcbiAgICAgICAgICAgIHZhbHVlOiB0b2RheSxcbiAgICAgICAgICAgIGljb246ICdmYS1zb2xpZCBmYS1jYWxlbmRhci1kYXknLFxuICAgICAgICAgfSxcbiAgICAgICAgIHtcbiAgICAgICAgICAgIHRpdGxlOiAnd2VlaycsXG4gICAgICAgICAgICB0eXBlOiAnZGF0ZS1yYW5nZScsXG4gICAgICAgICAgICB2YWx1ZTogd2VlayxcbiAgICAgICAgICAgIGljb246ICdmYS1zb2xpZCBmYS1jYWxlbmRhci13ZWVrJyxcbiAgICAgICAgIH0sXG4gICAgICBdO1xuXG4gICAgICBjb25zdCBkZWZhdWx0RmlsdGVyc1VsID0gY3JlYXRlRWxlbWVudCgndWwnKS5zZXRBdHRyaWJ1dGVzKHtcbiAgICAgICAgIGNsYXNzOiAnZGVmYXVsdC1maWx0ZXJzLXVsJyxcbiAgICAgIH0pO1xuICAgICAgZGVmYXVsdEZpbHRlcnMuZm9yRWFjaCgoZmlsdGVyKSA9PiB7XG4gICAgICAgICBjb25zdCBmaWx0ZXJMaSA9IGNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICAgICAgICAgIC5zZXRTdGF0ZShmaWx0ZXIpXG4gICAgICAgICAgICAuc2V0Q29udGVudChmaWx0ZXIudGl0bGUpXG4gICAgICAgICAgICAuY2FwaXRhbEZpcnN0TGV0dGVyKClcbiAgICAgICAgICAgIC5wcmVwZW5kSWNvbihmaWx0ZXIuaWNvbilcbiAgICAgICAgICAgIC5zZXRBdHRyaWJ1dGVzKHtcbiAgICAgICAgICAgICAgICdmaWx0ZXItdHlwZSc6IGZpbHRlci50eXBlLFxuICAgICAgICAgICAgICAgY2xhc3M6ICdkZWZhdWx0LWZpbHRlcicsXG4gICAgICAgICAgICAgICBpZDogZmlsdGVyLnRpdGxlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICBpZiAoZmlsdGVyLnR5cGUgPT09ICdhbGwnKSBmaWx0ZXJMaS5zZXRBdHRyaWJ1dGUoJ2N1cnJlbnQtZmlsdGVyJywgJycpO1xuICAgICAgICAgZGVmYXVsdEZpbHRlcnNVbC5hcHBlbmRDaGlsZChmaWx0ZXJMaSk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMucHJlcGVuZChkZWZhdWx0RmlsdGVyc1VsKTtcblxuICAgICAgY29uc3QgaGVhZGVyID0gY3JlYXRlRWxlbWVudCgnaGVhZGVyJylcbiAgICAgICAgIC5zZXRBdHRyaWJ1dGVzKHsgY2xhc3M6ICdoZWFkZXInIH0pXG4gICAgICAgICAucHJlcGVuZFRvKHRoaXMpO1xuXG4gICAgICBjb25zdCBpY29uID0gY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgIC5zZXRDb250ZW50KCdUb0JlLicpXG4gICAgICAgICAuc2V0QXR0cmlidXRlcyh7IGNsYXNzOiAnaWNvbicgfSlcbiAgICAgICAgIC5wcmVwZW5kSWNvbignZmEtc29saWQgZmEtZmlyZScpXG4gICAgICAgICAucHJlcGVuZFRvKGhlYWRlcik7XG5cbiAgICAgIGNvbnN0IGNsb3NlU2lkZUJhciA9IGNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXG4gICAgICAgICAuYXBwZW5kSWNvbignZmEtc29saWQgZmEtc3F1YXJlLWNhcmV0LWxlZnQnKVxuICAgICAgICAgLnNldEF0dHJpYnV0ZXMoeyBjbGFzczogJ2Nsb3NlLXNpZGUtYmFyJyB9KVxuICAgICAgICAgLmFwcGVuZFRvKGhlYWRlcik7XG4gICB9XG5cbiAgIGhpZ2hsaWdodEN1cnJlbnRGaWx0ZXIoZmlsdGVyRGF0YSkge1xuICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtjdXJyZW50LWZpbHRlcl1gKSkge1xuICAgICAgICAgZG9jdW1lbnRcbiAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKGBbY3VycmVudC1maWx0ZXJdYClcbiAgICAgICAgICAgIC5yZW1vdmVBdHRyaWJ1dGUoJ2N1cnJlbnQtZmlsdGVyJyk7XG4gICAgICB9XG4gICAgICB0aGlzLnF1ZXJ5U2VsZWN0b3IoYFtpZD0ke2ZpbHRlckRhdGEuaWR9XWApLnNldEF0dHJpYnV0ZShcbiAgICAgICAgICdjdXJyZW50LWZpbHRlcicsXG4gICAgICAgICAnJ1xuICAgICAgKTtcbiAgIH1cblxuICAgYWRkRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2KSA9PiB7XG4gICAgICAgICBpZiAoZXYudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZGVmYXVsdC1maWx0ZXInKSkge1xuICAgICAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFthY3RpdmVdYCkpIHtcbiAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFthY3RpdmVdYCkuc2hvd0Vycm9yKCk7XG4gICAgICAgICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgICAgICAgIHRpdGxlOiBldi50YXJnZXQuc3RhdGUudGl0bGUsXG4gICAgICAgICAgICAgICBpZDogZXYudGFyZ2V0LmdldEF0dHJpYnV0ZSgnaWQnKSxcbiAgICAgICAgICAgICAgIHR5cGU6IGV2LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2ZpbHRlci10eXBlJyksXG4gICAgICAgICAgICAgICB2YWx1ZTogZXYudGFyZ2V0LmdldFN0YXRlKCkudmFsdWUsXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLmhpZ2hsaWdodEN1cnJlbnRGaWx0ZXIoZXYudGFyZ2V0KTtcbiAgICAgICAgICAgIHB1YnN1Yi5wdWJsaXNoKCdmaWx0ZXI6Y2hhbmdlZCcsIGRhdGEpO1xuICAgICAgICAgfVxuXG4gICAgICAgICBpZiAoZXYudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnY2xvc2Utc2lkZS1iYXInKSkge1xuICAgICAgICAgICAgdGhpcy5wYXJlbnRFbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnc2lkZWJhci1vcGVuJyk7XG4gICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgcHVic3ViLnN1YnNjcmliZSgnZmlsdGVyOmNoYW5nZWQnLCAoZGF0YSkgPT4ge1xuICAgICAgICAgaWYgKHRoaXMucXVlcnlTZWxlY3RvcihgLmRlZmF1bHQtZmlsdGVyW2lkPSR7ZGF0YS50aXRsZX1dYCkpIHtcbiAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0Q3VycmVudEZpbHRlcihcbiAgICAgICAgICAgICAgIHRoaXMucXVlcnlTZWxlY3RvcihgLmRlZmF1bHQtZmlsdGVyW2lkPSR7ZGF0YS50aXRsZX1dYClcbiAgICAgICAgICAgICk7XG4gICAgICAgICB9XG5cbiAgICAgICAgIGlmICh0aGlzLnF1ZXJ5U2VsZWN0b3IoJy5jbG9zZS1zaWRlLWJhcicpKSB7XG4gICAgICAgICAgICB0aGlzLnF1ZXJ5U2VsZWN0b3IoJy5jbG9zZS1zaWRlLWJhcicpLmNsaWNrKCk7XG4gICAgICAgICB9XG4gICAgICB9KTtcbiAgIH1cbn1cbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnc2lkZS1iYXInLCBTaWRlQmFyKTtcblxuZXhwb3J0IGRlZmF1bHQgU2lkZUJhcjtcbiIsImltcG9ydCBjcmVhdGVFbGVtZW50IGZyb20gJy4uLy4uL3V0aWxzL0VsZW1lbnRCdWlsZGVyJztcbmltcG9ydCBwdWJzdWIgZnJvbSAnLi4vLi4vdXRpbHMvUHViU3ViJztcblxuY2xhc3MgVGFza0NhcmQgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXJzKCk7XG4gICB9XG5cbiAgIHJlbmRlcigpIHtcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCd0YXNrLWlkJywgdGhpcy5zdGF0ZS5pZCk7XG5cbiAgICAgIGNvbnN0IHRhZ3MgPSBjcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICAgLnNldEF0dHJpYnV0ZXMoeyBjbGFzczogJ3RhZ3MnIH0pXG4gICAgICAgICAuYXBwZW5kVG8odGhpcyk7XG5cbiAgICAgIGlmICh0aGlzLnN0YXRlLnRhc2tQcm9qZWN0ICE9PSAnJykge1xuICAgICAgICAgY29uc3QgY2F0ZWdvcnkgPSBjcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICAgICAgLnNldENvbnRlbnQodGhpcy5zdGF0ZS5wcm9qZWN0Q2F0ZWdvcnkpXG4gICAgICAgICAgICAuY2FwaXRhbEZpcnN0TGV0dGVyKClcbiAgICAgICAgICAgIC5zZXRBdHRyaWJ1dGVzKHsgY2xhc3M6ICd0YWcnIH0pXG4gICAgICAgICAgICAuYXBwZW5kVG8odGFncyk7XG5cbiAgICAgICAgIGNvbnN0IHByb2plY3QgPSBjcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICAgICAgICAgIC5zZXRDb250ZW50KHRoaXMuc3RhdGUudGFza1Byb2plY3QpXG4gICAgICAgICAgICAuY2FwaXRhbEZpcnN0TGV0dGVyKClcbiAgICAgICAgICAgIC5zZXRBdHRyaWJ1dGVzKHsgY2xhc3M6ICd0YWcnIH0pXG4gICAgICAgICAgICAuYXBwZW5kVG8odGFncyk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGRhdGUgPSBjcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICAgLnNldENvbnRlbnQodGhpcy5zdGF0ZS5kYXRlKVxuICAgICAgICAgLnNldEF0dHJpYnV0ZXMoeyBjbGFzczogJ3RhZycgfSlcbiAgICAgICAgIC5hcHBlbmRUbyh0YWdzKTtcblxuICAgICAgY29uc3QgcHJpb3JpdHkgPSBjcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICAgLnNldENvbnRlbnQoYFByaW9yaXR5ICR7dGhpcy5zdGF0ZS5wcmlvcml0eX1gKVxuICAgICAgICAgLnByZXBlbmRJY29uKCdmYS1yZWd1bGFyIGZhLWZsYWcnKVxuICAgICAgICAgLnNldEF0dHJpYnV0ZXMoeyBjbGFzczogJ3RhZycsIHByaW9yaXR5OiB0aGlzLnN0YXRlLnByaW9yaXR5IH0pXG4gICAgICAgICAuYXBwZW5kVG8odGFncyk7XG5cbiAgICAgIGNvbnN0IHRpdGxlTGluZSA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgICAuc2V0QXR0cmlidXRlcyh7IGNsYXNzOiAndGl0bGUtbGluZScgfSlcbiAgICAgICAgIC5hcHBlbmRUbyh0aGlzKTtcblxuICAgICAgY29uc3QgdGl0bGUgPSBjcmVhdGVFbGVtZW50KCdoMycpXG4gICAgICAgICAuc2V0Q29udGVudCh0aGlzLnN0YXRlLnRpdGxlKVxuICAgICAgICAgLmNhcGl0YWxGaXJzdExldHRlcigpXG4gICAgICAgICAuc2V0QXR0cmlidXRlcyh7IGNsYXNzOiAndGl0bGUnIH0pXG4gICAgICAgICAuYXBwZW5kVG8odGl0bGVMaW5lKTtcblxuICAgICAgY29uc3Qgc3RhdHVzRGl2ID0gY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgIC5zZXRBdHRyaWJ1dGVzKHsgY2xhc3M6ICdzdGF0dXMnIH0pXG4gICAgICAgICAuYXBwZW5kVG8odGl0bGVMaW5lKTtcblxuICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSBjcmVhdGVFbGVtZW50KCdwJylcbiAgICAgICAgIC5zZXRDb250ZW50KHRoaXMuc3RhdGUuZGVzY3JpcHRpb24pXG4gICAgICAgICAuY2FwaXRhbEZpcnN0TGV0dGVyKClcbiAgICAgICAgIC5zZXRBdHRyaWJ1dGVzKHsgY2xhc3M6ICdkZXNjcmlwdGlvbicgfSlcbiAgICAgICAgIC5hcHBlbmRUbyh0aGlzKTtcblxuICAgICAgY29uc3QgYnV0dG9ucyA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgICAuc2V0QXR0cmlidXRlcyh7IGNsYXNzOiAnYnV0dG9ucycgfSlcbiAgICAgICAgIC5hcHBlbmRUbyh0aGlzKTtcblxuICAgICAgY29uc3QgY2hlY2tib3hDb250YWluZXIgPSBjcmVhdGVFbGVtZW50KCdsYWJlbCcpXG4gICAgICAgICAuc2V0QXR0cmlidXRlcyh7XG4gICAgICAgICAgICBjbGFzczogJ2NoZWNrYm94LWxhYmVsJyxcbiAgICAgICAgICAgIGNvbXBsZXRlZDogdGhpcy5zdGF0ZS5jb21wbGV0ZWQsXG4gICAgICAgICB9KVxuICAgICAgICAgLmFwcGVuZFRvKGJ1dHRvbnMpO1xuXG4gICAgICB0aGlzLnNldFN0YXR1cyhzdGF0dXNEaXYsIGNoZWNrYm94Q29udGFpbmVyKTtcblxuICAgICAgY29uc3QgY2hlY2tib3ggPSBjcmVhdGVFbGVtZW50KCdpbnB1dCcpXG4gICAgICAgICAuc2V0QXR0cmlidXRlcyh7XG4gICAgICAgICAgICBjbGFzczogJ2NvbXBsZXRlZC1jaGVja2JveCcsXG4gICAgICAgICAgICB0eXBlOiAnY2hlY2tib3gnLFxuICAgICAgICAgfSlcbiAgICAgICAgIC5wcmVwZW5kVG8oY2hlY2tib3hDb250YWluZXIpO1xuXG4gICAgICBjb25zdCBjaGVja21hcmsgPSBjcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICAgLnNldEF0dHJpYnV0ZXMoeyBjbGFzczogJ2NoZWNrbWFyaycgfSlcbiAgICAgICAgIC5hcHBlbmRJY29uKCdmYS1zb2xpZCBmYS1jYWxlbmRhci1jaGVjaycpXG4gICAgICAgICAuYXBwZW5kVG8oY2hlY2tib3hDb250YWluZXIpO1xuXG4gICAgICBjaGVja2JveC5jaGVja2VkID0gdGhpcy5zdGF0ZS5jb21wbGV0ZWQ7XG5cbiAgICAgIGNvbnN0IGVkaXRCdG4gPSBjcmVhdGVFbGVtZW50KCdidXR0b24nKVxuICAgICAgICAgLmFwcGVuZEljb24oJ2ZhLXNvbGlkIGZhLXBlbi10by1zcXVhcmUnKVxuICAgICAgICAgLnNldEF0dHJpYnV0ZXMoeyBjbGFzczogJ2VkaXQtYnRuJyB9KVxuICAgICAgICAgLmFwcGVuZFRvKGJ1dHRvbnMpO1xuXG4gICAgICBjb25zdCBkZWxldGVCdG4gPSBjcmVhdGVFbGVtZW50KCdidXR0b24nKVxuICAgICAgICAgLnNldEF0dHJpYnV0ZXMoeyBjbGFzczogJ2RlbGV0ZScsIHR5cGU6ICdidXR0b24nIH0pXG4gICAgICAgICAucHJlcGVuZEljb24oJ2ZhLXNvbGlkIGZhLXRyYXNoLWNhbicpXG4gICAgICAgICAuYXBwZW5kVG8oYnV0dG9ucyk7XG4gICB9XG5cbiAgIHNldFN0YXR1cyhzdGF0dXNEaXYsIGNoZWNrYm94TGFiZWwpIHtcbiAgICAgIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKS5zZXRIb3VycygwLCAwLCAwKTtcbiAgICAgIGNvbnN0IHRhc2tEYXRlID0gbmV3IERhdGUodGhpcy5zdGF0ZS5kYXRlKS5zZXRIb3VycygwLCAwLCAxKTtcblxuICAgICAgaWYgKHRoaXMuc3RhdGUuY29tcGxldGVkKSB7XG4gICAgICAgICBzdGF0dXNEaXYuc2V0Q29udGVudCgnQ29tcGxldGVkJyk7XG4gICAgICAgICBzdGF0dXNEaXYuc2V0QXR0cmlidXRlKCdzdGF0dXMnLCAnY29tcGxldGVkJyk7XG4gICAgICAgICBjaGVja2JveExhYmVsLnNldEF0dHJpYnV0ZSgnY29tcGxldGVkJywgdHJ1ZSk7XG4gICAgICB9IGVsc2UgaWYgKCF0aGlzLnN0YXRlLmNvbXBsZXRlZCAmJiB0YXNrRGF0ZSA8IHRvZGF5KSB7XG4gICAgICAgICBzdGF0dXNEaXYuc2V0Q29udGVudCgnT3ZlcmR1ZScpO1xuICAgICAgICAgc3RhdHVzRGl2LnNldEF0dHJpYnV0ZSgnc3RhdHVzJywgJ292ZXJkdWUnKTtcbiAgICAgICAgIGNoZWNrYm94TGFiZWwuc2V0QXR0cmlidXRlKCdjb21wbGV0ZWQnLCBmYWxzZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgc3RhdHVzRGl2LnNldENvbnRlbnQoJ1BlbmRpbmcnKTtcbiAgICAgICAgIHN0YXR1c0Rpdi5zZXRBdHRyaWJ1dGUoJ3N0YXR1cycsICdwZW5kaW5nJyk7XG4gICAgICB9XG4gICB9XG5cbiAgIGFkZEV2ZW50TGlzdGVuZXJzKCkge1xuICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldikgPT4ge1xuICAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFthY3RpdmVdYCkpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFthY3RpdmVdYCkuc2hvd0Vycm9yKCk7XG4gICAgICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgfVxuICAgICAgICAgaWYgKGV2LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2RlbGV0ZScpKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZSgpO1xuICAgICAgICAgICAgcHVic3ViLnB1Ymxpc2goJ3Rhc2s6ZGVsZXRlJywgdGhpcy5zdGF0ZS5pZCk7XG4gICAgICAgICB9IGVsc2UgaWYgKGV2LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2NvbXBsZXRlZC1jaGVja2JveCcpKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlLmNvbXBsZXRlZCA9IHRoaXMucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAgICAgICcuY29tcGxldGVkLWNoZWNrYm94J1xuICAgICAgICAgICAgKS5jaGVja2VkO1xuICAgICAgICAgICAgcHVic3ViLnB1Ymxpc2goJ3Rhc2s6dXBkYXRlJywgdGhpcy5zdGF0ZSk7XG4gICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgZXYudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZWRpdC1idG4nKSAmJlxuICAgICAgICAgICAgIWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3Rhc2stZGV0YWlscycpXG4gICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdlZGl0aW5nJywgJycpO1xuICAgICAgICAgICAgcHVic3ViLnB1Ymxpc2goJ3Rhc2s6ZWRpdCcsIHRoaXMuZ2V0QXR0cmlidXRlKCd0YXNrLWlkJykpO1xuICAgICAgICAgfVxuICAgICAgfSk7XG4gICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgndGFzay1jYXJkJywgVGFza0NhcmQpO1xuXG5leHBvcnQgZGVmYXVsdCBUYXNrQ2FyZDtcbiIsImltcG9ydCBjcmVhdGVFbGVtZW50IGZyb20gJy4uLy4uL3V0aWxzL0VsZW1lbnRCdWlsZGVyJztcbmltcG9ydCBwdWJzdWIgZnJvbSAnLi4vLi4vdXRpbHMvUHViU3ViJztcbmltcG9ydCBFeHBhbmRhYmxlTGlzdCBmcm9tICcuL0V4cGFuZGFibGVMaXN0JztcblxuY2xhc3MgVGFza0RldGFpbHMgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXJzKCk7XG4gICB9XG5cbiAgIHJlbmRlcigpIHtcbiAgICAgIHRoaXMuaWQgPSAndGFzay1kZXRhaWxzJztcblxuICAgICAgY29uc3QgaWNvbiA9IGNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgICAgICAgLmFwcGVuZEljb24oJ2ZhLXNvbGlkIGZhLWZpbGUtcGVuJylcbiAgICAgICAgIC5zZXRBdHRyaWJ1dGVzKHsgY2xhc3M6ICdpY29uJyB9KVxuICAgICAgICAgLmFwcGVuZFRvKHRoaXMpO1xuXG4gICAgICBjb25zdCBmb3JtID0gY3JlYXRlRWxlbWVudCgnZm9ybScpXG4gICAgICAgICAuc2V0QXR0cmlidXRlcyh7IGlkOiAnZWRpdC10YXNrLWZvcm0nIH0pXG4gICAgICAgICAuYXBwZW5kVG8odGhpcyk7XG5cbiAgICAgIGNvbnN0IHRpdGxlID0gY3JlYXRlRWxlbWVudCgnaW5wdXQnKVxuICAgICAgICAgLnNldEF0dHJpYnV0ZXMoe1xuICAgICAgICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgICAgICAgbmFtZTogJ3RpdGxlLWlucHV0JyxcbiAgICAgICAgICAgIHZhbHVlOlxuICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS50YXNrLnRpdGxlLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICtcbiAgICAgICAgICAgICAgIHRoaXMuc3RhdGUudGFzay50aXRsZS5zbGljZSgxKSxcbiAgICAgICAgICAgIG1heGxlbmd0aDogJzUwJyxcbiAgICAgICAgICAgIG1pbmxlbmd0aDogJzUnLFxuICAgICAgICAgICAgcmVxdWlyZWQ6ICcnLFxuICAgICAgICAgfSlcbiAgICAgICAgIC5hcHBlbmRUbyhmb3JtKTtcblxuICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSBjcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpXG4gICAgICAgICAuc2V0QXR0cmlidXRlcyh7XG4gICAgICAgICAgICBuYW1lOiAnZGVzY3JpcHRpb24taW5wdXQnLFxuICAgICAgICAgICAgUGxhY2Vob2xkZXI6ICdhZGQgdGFzayBkZXNjcmlwdGlvbi4uLicsXG4gICAgICAgICAgICBtYXhsZW5ndGg6ICczMDAnLFxuICAgICAgICAgICAgcm93czogJzMnLFxuICAgICAgICAgfSlcbiAgICAgICAgIC5zZXRDb250ZW50KHRoaXMuc3RhdGUudGFzay5kZXNjcmlwdGlvbilcbiAgICAgICAgIC5jYXBpdGFsRmlyc3RMZXR0ZXIoKVxuICAgICAgICAgLmFwcGVuZFRvKGZvcm0pO1xuXG4gICAgICBjb25zdCBkYXRlID0gY3JlYXRlRWxlbWVudCgnaW5wdXQnKVxuICAgICAgICAgLnNldEF0dHJpYnV0ZXMoe1xuICAgICAgICAgICAgdHlwZTogJ2RhdGUnLFxuICAgICAgICAgICAgbmFtZTogJ2RhdGUtaW5wdXQnLFxuICAgICAgICAgICAgdmFsdWU6IGAke3RoaXMuc3RhdGUudGFzay5kYXRlfWAsXG4gICAgICAgICB9KVxuICAgICAgICAgLmFwcGVuZFRvKGZvcm0pO1xuXG4gICAgICB0aGlzLnNldHVwU2VsZWN0UHJvamVjdExpc3QoZm9ybSk7XG4gICAgICB0aGlzLnNldFVwUHJpb3JpdGllcyhmb3JtKTtcbiAgICAgIHRoaXMuc2V0dXBDaGVja2xpc3QoZm9ybSk7XG5cbiAgICAgIGNvbnN0IHN1Ym1pdEJ0bkNvbnRhaW5lciA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgICAuc2V0QXR0cmlidXRlcyh7IGNsYXNzOiAnc3VibWl0LWJ0bi1jb250YWluZXInIH0pXG4gICAgICAgICAuYXBwZW5kVG8oZm9ybSk7XG5cbiAgICAgIGNvbnN0IHN1Ym1pdEJ0biA9IGNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXG4gICAgICAgICAuc2V0QXR0cmlidXRlcyh7XG4gICAgICAgICAgICB0eXBlOiAnc3VibWl0JyxcbiAgICAgICAgICAgIG5hbWU6ICdzYXZlLXRhc2snLFxuICAgICAgICAgfSlcbiAgICAgICAgIC5zZXRDb250ZW50KCdTYXZlJylcbiAgICAgICAgIC5wcmVwZW5kSWNvbignZmEtc29saWQgZmEtZmxvcHB5LWRpc2snKVxuICAgICAgICAgLmFwcGVuZFRvKHN1Ym1pdEJ0bkNvbnRhaW5lcik7XG5cbiAgICAgIGNvbnN0IGhlYWRlciA9IGNyZWF0ZUVsZW1lbnQoJ2hlYWRlcicpXG4gICAgICAgICAuc2V0Q29udGVudCgnI1Rhc2stZGV0YWlscycpXG4gICAgICAgICAuc2V0QXR0cmlidXRlcyh7IGNsYXNzOiAnaGVhZGVyJyB9KVxuICAgICAgICAgLnByZXBlbmRUbyh0aGlzKTtcblxuICAgICAgY29uc3QgY2xvc2VCdG4gPSBjcmVhdGVFbGVtZW50KCdidXR0b24nKVxuICAgICAgICAgLnNldEF0dHJpYnV0ZXMoe1xuICAgICAgICAgICAgY2xhc3M6ICdjbG9zZScsXG4gICAgICAgICAgICB0eXBlOiAnYnV0dG9uJyxcbiAgICAgICAgICAgIG5hbWU6ICdjYW5jZWwnLFxuICAgICAgICAgfSlcbiAgICAgICAgIC5hcHBlbmRJY29uKCdmYS1zb2xpZCBmYS1jaXJjbGUteG1hcmsnKVxuICAgICAgICAgLmFwcGVuZFRvKGhlYWRlcik7XG5cbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdhY3RpdmUnLCAnJyk7XG4gICB9XG5cbiAgIGFkZEV2ZW50TGlzdGVuZXJzKCkge1xuICAgICAgdGhpcy5xdWVyeVNlbGVjdG9yKCdmb3JtJykuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGV2KSA9PiB7XG4gICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgaWYgKHRoaXMucXVlcnlTZWxlY3RvcignW2FjdGl2ZV0nKSkgcmV0dXJuO1xuXG4gICAgICAgICB0aGlzLnBhc3NEYXRhKCk7XG4gICAgICAgICB0aGlzLnJlbW92ZSgpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXYpID0+IHtcbiAgICAgICAgIGlmICh0aGlzLnF1ZXJ5U2VsZWN0b3IoJ1thY3RpdmVdJykpIHJldHVybjtcbiAgICAgICAgIGlmIChcbiAgICAgICAgICAgIGV2LnRhcmdldC5jbG9zZXN0KCdbZGF0YS10eXBlPVwiY2hlY2tsaXN0LWl0ZW1cIl0nKSAmJlxuICAgICAgICAgICAgIWV2LnRhcmdldC5jbG9zZXN0KCcuaXRlbS1idXR0b25zJylcbiAgICAgICAgICkge1xuICAgICAgICAgICAgY29uc3QgaXRlbSA9IGV2LnRhcmdldC5jbG9zZXN0KCdbZGF0YS10eXBlPVwiY2hlY2tsaXN0LWl0ZW1cIl0nKTtcbiAgICAgICAgICAgIGl0ZW0udG9nZ2xlQXR0cmlidXRlKCdjaGVja2VkJyk7XG4gICAgICAgICB9XG5cbiAgICAgICAgIGlmIChldi50YXJnZXQuY2xvc2VzdCgnLmNsb3NlJykpIHtcbiAgICAgICAgICAgIGRvY3VtZW50XG4gICAgICAgICAgICAgICAucXVlcnlTZWxlY3RvcigndGFzay1jYXJkW2VkaXRpbmddJylcbiAgICAgICAgICAgICAgIC5yZW1vdmVBdHRyaWJ1dGUoJ2VkaXRpbmcnKTtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlKCk7XG4gICAgICAgICB9XG4gICAgICB9KTtcbiAgIH1cblxuICAgcGFzc0RhdGEoKSB7XG4gICAgICBjb25zdCBmb3JtID0gdGhpcy5xdWVyeVNlbGVjdG9yKCdmb3JtJyk7XG4gICAgICBjb25zdCBzZWxlY3RQcm9qZWN0ID0gZm9ybS5lbGVtZW50c1snc2VsZWN0LXByb2plY3QnXTtcbiAgICAgIGNvbnN0IHNlbGVjdFByaW9yaXR5ID0gZm9ybS5lbGVtZW50c1snc2VsZWN0LXByaW9yaXR5J107XG4gICAgICBjb25zdCBjaGVja2xpc3RJdGVtcyA9IGZvcm0ucXVlcnlTZWxlY3RvckFsbChcbiAgICAgICAgICdbZGF0YS10eXBlPVwiY2hlY2tsaXN0LWl0ZW1cIl0nXG4gICAgICApO1xuXG4gICAgICBjb25zdCBmb3JtRGF0YSA9IHtcbiAgICAgICAgIGlkOiB0aGlzLnN0YXRlLnRhc2suaWQsXG4gICAgICAgICB0aXRsZTogZm9ybS5lbGVtZW50c1sndGl0bGUtaW5wdXQnXS52YWx1ZSxcbiAgICAgICAgIGRlc2NyaXB0aW9uOiBmb3JtLmVsZW1lbnRzWydkZXNjcmlwdGlvbi1pbnB1dCddLnZhbHVlLFxuICAgICAgICAgZGF0ZTogZm9ybS5lbGVtZW50c1snZGF0ZS1pbnB1dCddLnZhbHVlLFxuICAgICAgICAgcHJvamVjdElkOiBzZWxlY3RQcm9qZWN0Lm9wdGlvbnNbc2VsZWN0UHJvamVjdC5zZWxlY3RlZEluZGV4XS5pZCxcbiAgICAgICAgIHByaW9yaXR5OiBzZWxlY3RQcmlvcml0eS5vcHRpb25zW3NlbGVjdFByaW9yaXR5LnNlbGVjdGVkSW5kZXhdLmlkLFxuICAgICAgICAgY2F0ZWdvcnlJZDpcbiAgICAgICAgICAgIHNlbGVjdFByb2plY3Qub3B0aW9uc1tzZWxlY3RQcm9qZWN0LnNlbGVjdGVkSW5kZXhdLnBhcmVudEVsZW1lbnRcbiAgICAgICAgICAgICAgIC5pZCB8fCBudWxsLFxuICAgICAgICAgY2hlY2tsaXN0OiBbXSxcbiAgICAgIH07XG5cbiAgICAgIGNoZWNrbGlzdEl0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgIGNvbnN0IGl0ZW1EYXRhID0ge1xuICAgICAgICAgICAgZGF0YVR5cGU6ICdjaGVja2xpc3QtaXRlbScsXG4gICAgICAgICAgICB0aXRsZTogaXRlbS50ZXh0Q29udGVudCxcbiAgICAgICAgICAgIGNoZWNrZWQ6IGl0ZW0uaGFzQXR0cmlidXRlKCdjaGVja2VkJyksXG4gICAgICAgICB9O1xuICAgICAgICAgZm9ybURhdGEuY2hlY2tsaXN0LnB1c2goaXRlbURhdGEpO1xuICAgICAgfSk7XG5cbiAgICAgIHB1YnN1Yi5wdWJsaXNoKCd0YXNrOnVwZGF0ZScsIGZvcm1EYXRhKTtcbiAgIH1cblxuICAgc2V0dXBTZWxlY3RQcm9qZWN0TGlzdChmb3JtKSB7XG4gICAgICBjb25zdCBzZWxlY3RQcm9qZWN0ID0gY3JlYXRlRWxlbWVudCgnc2VsZWN0JylcbiAgICAgICAgIC5zZXRBdHRyaWJ1dGVzKHtcbiAgICAgICAgICAgIGNsYXNzOiAnc2VsZWN0LXByb2plY3QnLFxuICAgICAgICAgICAgbmFtZTogJ3NlbGVjdC1wcm9qZWN0JyxcbiAgICAgICAgIH0pXG4gICAgICAgICAuYXBwZW5kVG8oZm9ybSk7XG5cbiAgICAgIGNvbnN0IG5vUHJvamVjdE9wdGlvbiA9IGNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpXG4gICAgICAgICAuc2V0QXR0cmlidXRlcyh7XG4gICAgICAgICAgICB2YWx1ZTogJycsXG4gICAgICAgICAgICBzZWxlY3RlZDogJycsXG4gICAgICAgICB9KVxuICAgICAgICAgLnNldENvbnRlbnQoJ1NlbGVjdCBhIHByb2plY3QnKVxuICAgICAgICAgLnByZXBlbmRUbyhzZWxlY3RQcm9qZWN0KTtcblxuICAgICAgdGhpcy5zdGF0ZS5jYXRlZ29yaWVzLmZvckVhY2goKGNhdGVnb3J5KSA9PiB7XG4gICAgICAgICBjb25zdCBvcHRHcnAgPSBjcmVhdGVFbGVtZW50KCdvcHRncm91cCcpLnNldEF0dHJpYnV0ZXMoe1xuICAgICAgICAgICAgbGFiZWw6IGNhdGVnb3J5LnRpdGxlLFxuICAgICAgICAgICAgaWQ6IGNhdGVnb3J5LmlkLFxuICAgICAgICAgfSk7XG5cbiAgICAgICAgIGNvbnN0IGNhdGVnb3J5UHJvamVjdHMgPSB0aGlzLnN0YXRlLnByb2plY3RzLmZpbHRlcihcbiAgICAgICAgICAgIChwcm9qZWN0KSA9PiBwcm9qZWN0LmNhdGVnb3J5SWQgPT09IGNhdGVnb3J5LmlkXG4gICAgICAgICApO1xuICAgICAgICAgY2F0ZWdvcnlQcm9qZWN0cy5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBvcHRpb24gPSBjcmVhdGVFbGVtZW50KCdvcHRpb24nKVxuICAgICAgICAgICAgICAgLnNldEF0dHJpYnV0ZXMoe1xuICAgICAgICAgICAgICAgICAgaWQ6IHByb2plY3QuaWQsXG4gICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgLnNldENvbnRlbnQocHJvamVjdC50aXRsZSlcbiAgICAgICAgICAgICAgIC5hcHBlbmRUbyhvcHRHcnApO1xuXG4gICAgICAgICAgICBpZiAocHJvamVjdC5pZCA9PT0gdGhpcy5zdGF0ZS50YXNrLnByb2plY3RJZCkge1xuICAgICAgICAgICAgICAgb3B0aW9uLnNldEF0dHJpYnV0ZSgnc2VsZWN0ZWQnLCB0cnVlKTtcbiAgICAgICAgICAgICAgIG5vUHJvamVjdE9wdGlvbi5yZW1vdmVBdHRyaWJ1dGUoJ3NlbGVjdGVkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICB9KTtcblxuICAgICAgICAgc2VsZWN0UHJvamVjdC5hcHBlbmRDaGlsZChvcHRHcnApO1xuICAgICAgfSk7XG4gICB9XG5cbiAgIHNldFVwUHJpb3JpdGllcyhmb3JtKSB7XG4gICAgICBjb25zdCBzZWxlY3RQcmlvcml0eSA9IGNyZWF0ZUVsZW1lbnQoJ3NlbGVjdCcpXG4gICAgICAgICAuc2V0QXR0cmlidXRlcyh7XG4gICAgICAgICAgICBjbGFzczogJ3NlbGVjdC1wcmlvcml0eScsXG4gICAgICAgICAgICBuYW1lOiAnc2VsZWN0LXByaW9yaXR5JyxcbiAgICAgICAgIH0pXG4gICAgICAgICAuYXBwZW5kVG8oZm9ybSk7XG4gICAgICBjb25zdCBwcmlvcml0aWVzID0gWycxJywgJzInLCAnMycsICc0J107XG4gICAgICBwcmlvcml0aWVzLmZvckVhY2goKHByaW9yaXR5KSA9PiB7XG4gICAgICAgICBjb25zdCBvcHRpb24gPSBjcmVhdGVFbGVtZW50KCdvcHRpb24nKVxuICAgICAgICAgICAgLnNldEF0dHJpYnV0ZXMoe1xuICAgICAgICAgICAgICAgaWQ6IHByaW9yaXR5LFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zZXRDb250ZW50KGBQcmlvcml0eSAke3ByaW9yaXR5fWApXG4gICAgICAgICAgICAuYXBwZW5kVG8oc2VsZWN0UHJpb3JpdHkpO1xuXG4gICAgICAgICBpZiAocHJpb3JpdHkgPT09IHRoaXMuc3RhdGUudGFzay5wcmlvcml0eSkge1xuICAgICAgICAgICAgb3B0aW9uLnNldEF0dHJpYnV0ZSgnc2VsZWN0ZWQnLCB0cnVlKTtcbiAgICAgICAgIH1cbiAgICAgIH0pO1xuICAgfVxuXG4gICBzZXR1cENoZWNrbGlzdChmb3JtKSB7XG4gICAgICBjb25zdCBjaGVja2xpc3QgPSBjcmVhdGVFbGVtZW50KCdleHAtbGlzdCcpXG4gICAgICAgICAuc2V0QXR0cmlidXRlcyh7XG4gICAgICAgICAgICBjbGFzczogJ2NoZWNrbGlzdCcsXG4gICAgICAgICB9KVxuICAgICAgICAgLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGhlYWRlcjogeyBkYXRhVHlwZTogJ2NoZWNrbGlzdCcsIHRpdGxlOiAnVGFzayBjaGVja2xpc3QnIH0sXG4gICAgICAgICAgICBpdGVtczogeyB0eXBlOiAnY2hlY2tsaXN0LWl0ZW0nLCBsaXN0OiB0aGlzLnN0YXRlLnRhc2suY2hlY2tsaXN0IH0sXG4gICAgICAgICB9KVxuICAgICAgICAgLmFwcGVuZFRvKGZvcm0pO1xuXG4gICAgICBjb25zdCBjaGVja2xpc3RJdGVtcyA9IGNoZWNrbGlzdC5xdWVyeVNlbGVjdG9yQWxsKFxuICAgICAgICAgJ1tkYXRhLXR5cGU9Y2hlY2tsaXN0LWl0ZW1dJ1xuICAgICAgKTtcblxuICAgICAgY2hlY2tsaXN0SXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgaWYgKGl0ZW0uZ2V0U3RhdGUoKS5jaGVja2VkKSBpdGVtLnNldEF0dHJpYnV0ZSgnY2hlY2tlZCcsICcnKTtcbiAgICAgIH0pO1xuICAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ3Rhc2stZGV0YWlscycsIFRhc2tEZXRhaWxzKTtcbmV4cG9ydCBkZWZhdWx0IFRhc2tEZXRhaWxzO1xuIiwiaW1wb3J0IGF1dG9BbmltYXRlIGZyb20gJ0Bmb3Jta2l0L2F1dG8tYW5pbWF0ZSc7XG5pbXBvcnQgeyBmb3JtYXQgfSBmcm9tICdkYXRlLWZucyc7XG5pbXBvcnQgVGFza0NhcmQgZnJvbSAnLi9UYXNrQ2FyZCc7XG5pbXBvcnQgY3JlYXRlRWxlbWVudCBmcm9tICcuLi8uLi91dGlscy9FbGVtZW50QnVpbGRlcic7XG5pbXBvcnQgQWRkVGFza0Zvcm0gZnJvbSAnLi9BZGRUYXNrRm9ybSc7XG5pbXBvcnQgcHVic3ViIGZyb20gJy4uLy4uL3V0aWxzL1B1YlN1Yic7XG5cbmNsYXNzIFRhc2tMaXN0IGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVycygpO1xuICAgfVxuXG4gICByZW5kZXIoKSB7XG4gICAgICBjb25zdCBhZGRUYXNrRm9ybSA9IG5ldyBBZGRUYXNrRm9ybSh7XG4gICAgICAgICBwcm9qZWN0czogdGhpcy5zdGF0ZS5wcm9qZWN0cyxcbiAgICAgICAgIGNhdGVnb3JpZXM6IHRoaXMuc3RhdGUuY2F0ZWdvcmllcyxcbiAgICAgICAgIGN1cnJlbnRGaWx0ZXI6IHRoaXMuc3RhdGUuY3VycmVudEZpbHRlcixcbiAgICAgIH0pO1xuICAgICAgdGhpcy5wcmVwZW5kKGFkZFRhc2tGb3JtKTtcblxuICAgICAgY29uc3QgY29udHJvbFNlY3Rpb24gPSBjcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICAgLnNldEF0dHJpYnV0ZXMoeyBjbGFzczogJ2NvbnRyb2wtc2VjdGlvbicgfSlcbiAgICAgICAgIC5hcHBlbmRUbyh0aGlzKTtcbiAgICAgIHRoaXMuc2V0dXBDb250cm9scyhjb250cm9sU2VjdGlvbik7XG5cbiAgICAgIGNvbnN0IHRhc2tzQ29udGFpbmVyID0gY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgIC5zZXRBdHRyaWJ1dGVzKHsgY2xhc3M6ICd0YXNrcy1jb250YWluZXInIH0pXG4gICAgICAgICAuYXBwZW5kVG8odGhpcyk7XG5cbiAgICAgIHRoaXMuc3RhdGUudGFza3MuZm9yRWFjaCgodGFzaykgPT4ge1xuICAgICAgICAgY29uc3QgdGFza0NhcmQgPSB0aGlzLm1ha2VUYXNrQ2FyZCh0YXNrKTtcbiAgICAgICAgIGlmICghdGFza0NhcmQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgIH1cbiAgICAgICAgIHRhc2tzQ29udGFpbmVyLmFwcGVuZENoaWxkKHRhc2tDYXJkKTtcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBoZWFkZXIgPSBjcmVhdGVFbGVtZW50KCdoZWFkZXInKVxuICAgICAgICAgLnNldENvbnRlbnQoYCNUYXNrcy1saXN0YClcbiAgICAgICAgIC5jYXBpdGFsRmlyc3RMZXR0ZXIoKVxuICAgICAgICAgLnNldEF0dHJpYnV0ZXMoeyBjbGFzczogJ2hlYWRlcicgfSlcbiAgICAgICAgIC5wcmVwZW5kVG8odGhpcyk7XG5cbiAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbY3VycmVudC1maWx0ZXJdJykpIHtcbiAgICAgICAgIGhlYWRlci5zZXRDb250ZW50KFxuICAgICAgICAgICAgYCMke2RvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tjdXJyZW50LWZpbHRlcl0nKS50ZXh0Q29udGVudH1gXG4gICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBzaWRlQmFyVG9nZ2xlID0gY3JlYXRlRWxlbWVudCgnYnV0dG9uJylcbiAgICAgICAgIC5zZXRBdHRyaWJ1dGVzKHsgY2xhc3M6ICd0b2dnbGUtc2lkZS1iYXInIH0pXG4gICAgICAgICAuYXBwZW5kSWNvbignZmEtc29saWQgZmEtYmFycycpXG4gICAgICAgICAucHJlcGVuZFRvKGhlYWRlcik7XG5cbiAgICAgIGNvbnN0IGZpeGVkQnRuQ29udGFpbmVyID0gY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgIC5zZXRBdHRyaWJ1dGVzKHsgY2xhc3M6ICdmaXhlZC1idG4tY29udGFpbmVyJyB9KVxuICAgICAgICAgLmFwcGVuZFRvKHRoaXMpO1xuXG4gICAgICBjb25zdCBmaXhlZEFkZFRhc2tCdG4gPSBjcmVhdGVFbGVtZW50KCdidXR0b24nKVxuICAgICAgICAgLnNldEF0dHJpYnV0ZXMoeyBjbGFzczogJ2ZpeGVkLWFkZC10YXNrLWJ0bicgfSlcbiAgICAgICAgIC5hcHBlbmRJY29uKCdmYS1zb2xpZCBmYS1wbHVzJylcbiAgICAgICAgIC5hcHBlbmRUbyhmaXhlZEJ0bkNvbnRhaW5lcik7XG4gICB9XG5cbiAgIGFkZEV2ZW50TGlzdGVuZXJzKCkge1xuICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldikgPT4ge1xuICAgICAgICAgaWYgKGV2LnRhcmdldC5tYXRjaGVzKCcudG9nZ2xlLXNpZGUtYmFyJykpIHtcbiAgICAgICAgICAgIHB1YnN1Yi5wdWJsaXNoKCdzaWRlLWJhcjp0b2dnbGUnKTtcbiAgICAgICAgIH1cbiAgICAgICAgIGlmIChldi50YXJnZXQubWF0Y2hlcygnLmZpeGVkLWFkZC10YXNrLWJ0bicpKSB7XG4gICAgICAgICAgICB0aGlzLnF1ZXJ5U2VsZWN0b3IoJy5vcGVuLWZvcm0nKS5jbGljaygpO1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxUbygwLCAwKTtcbiAgICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsICgpID0+IHtcbiAgICAgICAgIGNvbnN0IGZpeGVkQnRuID0gdGhpcy5xdWVyeVNlbGVjdG9yKCcuZml4ZWQtYWRkLXRhc2stYnRuJyk7XG4gICAgICAgICBpZiAodGhpcy5zY3JvbGxUb3AgPiAzMCkge1xuICAgICAgICAgICAgZml4ZWRCdG4uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZml4ZWRCdG4uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgIH1cbiAgICAgIH0pO1xuICAgfVxuXG4gICB1cGRhdGVDYXJkKHRhc2spIHtcbiAgICAgIGNvbnN0IHVwZGF0ZWRDYXJkID0gdGhpcy5tYWtlVGFza0NhcmQodGFzayk7XG4gICAgICBjb25zdCBleGlzdGluZ0NhcmQgPSB0aGlzLnF1ZXJ5U2VsZWN0b3IoYHRhc2stY2FyZFt0YXNrLWlkPSR7dGFzay5pZH1dYCk7XG5cbiAgICAgIHRoaXMucXVlcnlTZWxlY3RvcignLnRhc2tzLWNvbnRhaW5lcicpLnJlcGxhY2VDaGlsZChcbiAgICAgICAgIHVwZGF0ZWRDYXJkLFxuICAgICAgICAgZXhpc3RpbmdDYXJkXG4gICAgICApO1xuICAgfVxuXG4gICBtYWtlVGFza0NhcmQodGFzaykge1xuICAgICAgY29uc3QgdGFza1Byb2plY3QgPSB0aGlzLnN0YXRlLnByb2plY3RzLmZpbmQoXG4gICAgICAgICAocHJvamVjdCkgPT4gcHJvamVjdC5pZCA9PT0gdGFzay5wcm9qZWN0SWRcbiAgICAgICk7XG4gICAgICBpZiAodGFza1Byb2plY3QpIHtcbiAgICAgICAgIGNvbnN0IHByb2plY3RDYXRlZ29yeSA9IHRoaXMuc3RhdGUuY2F0ZWdvcmllcy5maW5kKFxuICAgICAgICAgICAgKGNhdGVnb3J5KSA9PiBjYXRlZ29yeS5pZCA9PT0gdGFza1Byb2plY3QuY2F0ZWdvcnlJZFxuICAgICAgICAgKTtcblxuICAgICAgICAgT2JqZWN0LmFzc2lnbih0YXNrLCB7XG4gICAgICAgICAgICB0YXNrUHJvamVjdDogdGFza1Byb2plY3QudGl0bGUsXG4gICAgICAgICAgICBwcm9qZWN0Q2F0ZWdvcnk6IHByb2plY3RDYXRlZ29yeS50aXRsZSxcbiAgICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgIE9iamVjdC5hc3NpZ24odGFzaywge1xuICAgICAgICAgICAgdGFza1Byb2plY3Q6ICcnLFxuICAgICAgICAgICAgcHJvamVjdENhdGVnb3J5OiAnJyxcbiAgICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgY29uc3QgbmV3Q2FyZCA9IGNyZWF0ZUVsZW1lbnQoJ3Rhc2stY2FyZCcpLnNldFN0YXRlKHRhc2spO1xuXG4gICAgICByZXR1cm4gbmV3Q2FyZDtcbiAgIH1cblxuICAgZGVsZXRlQ2FyZCh0YXNrSWQpIHtcbiAgICAgIGNvbnN0IGNhcmQgPSB0aGlzLnF1ZXJ5U2VsZWN0b3IoYHRhc2stY2FyZFt0YXNrLWlkPSR7dGFza0lkfV1gKTtcbiAgICAgIGlmIChjYXJkKSB0aGlzLnJlbW92ZUNoaWxkKGNhcmQpO1xuICAgfVxuXG4gICBzZXR1cENvbnRyb2xzKGNvbnRyb2xTZWN0aW9uKSB7XG4gICAgICBjb25zdCBzb3J0aW5nT3B0aW9ucyA9IFsncHJpb3JpdHknLCAnZHVlIGRhdGUnXTtcbiAgICAgIGNvbnN0IHNvcnRpbmdDdHJsID0gY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgIC5zZXRDb250ZW50KCdTb3J0IGJ5OicpXG4gICAgICAgICAuc2V0QXR0cmlidXRlcyh7IGNsYXNzOiAnc29ydGluZy1jb250cm9scycgfSlcbiAgICAgICAgIC5hcHBlbmRUbyhjb250cm9sU2VjdGlvbik7XG5cbiAgICAgIHNvcnRpbmdPcHRpb25zLmZvckVhY2goKG9wdGlvbikgPT4ge1xuICAgICAgICAgY29uc3QgY29udGFpbmVyID0gY3JlYXRlRWxlbWVudCgnZGl2Jykuc2V0QXR0cmlidXRlcyh7XG4gICAgICAgICAgICBjbGFzczogJ3NvcnRpbmctb3B0aW9uJyxcbiAgICAgICAgIH0pO1xuXG4gICAgICAgICBjb25zdCBjaG9pY2VJbnB1dCA9IGNyZWF0ZUVsZW1lbnQoJ2lucHV0JylcbiAgICAgICAgICAgIC5zZXRBdHRyaWJ1dGVzKHtcbiAgICAgICAgICAgICAgIHR5cGU6ICdyYWRpbycsXG4gICAgICAgICAgICAgICBpZDogb3B0aW9uLFxuICAgICAgICAgICAgICAgbmFtZTogJ3NvcnRpbmctb3B0aW9uJyxcbiAgICAgICAgICAgICAgIHZhbHVlOiBvcHRpb24sXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmFwcGVuZFRvKGNvbnRhaW5lcik7XG5cbiAgICAgICAgIGNob2ljZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5jaGVja2VkKSB7XG4gICAgICAgICAgICAgICBwdWJzdWIucHVibGlzaCgnc29ydGluZzpjaGFuZ2VkJywgZXZlbnQudGFyZ2V0LnZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgIH0pO1xuXG4gICAgICAgICBpZiAoY2hvaWNlSW5wdXQudmFsdWUgPT09IHRoaXMuc3RhdGUuY3VycmVudFNvcnQpIHtcbiAgICAgICAgICAgIGNob2ljZUlucHV0LmNoZWNrZWQgPSB0cnVlO1xuICAgICAgICAgfVxuXG4gICAgICAgICBjcmVhdGVFbGVtZW50KCdsYWJlbCcpXG4gICAgICAgICAgICAuc2V0QXR0cmlidXRlcyh7IGZvcjogb3B0aW9uIH0pXG4gICAgICAgICAgICAuc2V0Q29udGVudChvcHRpb24pXG4gICAgICAgICAgICAuY2FwaXRhbEZpcnN0TGV0dGVyKClcbiAgICAgICAgICAgIC5hcHBlbmRUbyhjb250YWluZXIpO1xuXG4gICAgICAgICBzb3J0aW5nQ3RybC5hcHBlbmRDaGlsZChjb250YWluZXIpO1xuICAgICAgfSk7XG5cbiAgICAgIGlmIChcbiAgICAgICAgIHRoaXMuc3RhdGUuY3VycmVudEZpbHRlci50eXBlID09PSAnZGF0ZScgfHxcbiAgICAgICAgIHRoaXMuc3RhdGUuY3VycmVudEZpbHRlci50eXBlID09PSAnZGF0ZS1yYW5nZSdcbiAgICAgICkge1xuICAgICAgICAgY29uc3QgbmV4dFByZXZpb3VzQnRucyA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgICAgICAuc2V0QXR0cmlidXRlcyh7IGNsYXNzOiAnbmV4dC1wcmV2aW91cy1idG5zJyB9KVxuICAgICAgICAgICAgLmFwcGVuZFRvKGNvbnRyb2xTZWN0aW9uKTtcblxuICAgICAgICAgY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgICAgICAgICAuc2V0Q29udGVudCgnUHJldmlvdXMvTmV4dCcpXG4gICAgICAgICAgICAuc2V0QXR0cmlidXRlcyh7IGNsYXNzOiAnbmV4dC1wcmV2aW91cy1idG5zLWxhYmVsJyB9KVxuICAgICAgICAgICAgLmFwcGVuZFRvKG5leHRQcmV2aW91c0J0bnMpO1xuXG4gICAgICAgICBjcmVhdGVFbGVtZW50KCdidXR0b24nKVxuICAgICAgICAgICAgLnNldEF0dHJpYnV0ZXMoeyBjbGFzczogJ3ByZXZpb3VzLWJ0bicgfSlcbiAgICAgICAgICAgIC5hcHBlbmRJY29uKCdmYS1zb2xpZCBmYS1hbmdsZS1sZWZ0JylcbiAgICAgICAgICAgIC5hcHBlbmRUbyhuZXh0UHJldmlvdXNCdG5zKTtcblxuICAgICAgICAgY29uc3QgbGFiZWwgPSBjcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICAgICAgLnNldEF0dHJpYnV0ZXMoeyBjbGFzczogJ2RhdGVzJyB9KVxuICAgICAgICAgICAgLmFwcGVuZFRvKG5leHRQcmV2aW91c0J0bnMpO1xuICAgICAgICAgaWYgKHRoaXMuc3RhdGUuY3VycmVudEZpbHRlci50eXBlID09PSAnZGF0ZS1yYW5nZScpIHtcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgICAgICAgICAuc2V0Q29udGVudChcbiAgICAgICAgICAgICAgICAgIGZvcm1hdCh0aGlzLnN0YXRlLmN1cnJlbnRGaWx0ZXIudmFsdWUuc3RhcnQsICdFLCBNTU0gZGQgeXl5eScpXG4gICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAuYXBwZW5kVG8obGFiZWwpO1xuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgICAgICAgIC5zZXRDb250ZW50KFxuICAgICAgICAgICAgICAgICAgZm9ybWF0KHRoaXMuc3RhdGUuY3VycmVudEZpbHRlci52YWx1ZS5lbmQsICdFLCBNTU0gZGQgeXl5eScpXG4gICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAuYXBwZW5kVG8obGFiZWwpO1xuICAgICAgICAgfVxuICAgICAgICAgaWYgKHRoaXMuc3RhdGUuY3VycmVudEZpbHRlci50eXBlID09PSAnZGF0ZScpIHtcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgICAgICAgICAuc2V0Q29udGVudChcbiAgICAgICAgICAgICAgICAgIGZvcm1hdCh0aGlzLnN0YXRlLmN1cnJlbnRGaWx0ZXIudmFsdWUsICdFLCBNTU0gZGQgeXl5eScpXG4gICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAuYXBwZW5kVG8obGFiZWwpO1xuICAgICAgICAgfVxuXG4gICAgICAgICBjcmVhdGVFbGVtZW50KCdidXR0b24nKVxuICAgICAgICAgICAgLnNldEF0dHJpYnV0ZXMoeyBjbGFzczogJ25leHQtYnRuJyB9KVxuICAgICAgICAgICAgLmFwcGVuZEljb24oJ2ZhLXNvbGlkIGZhLWFuZ2xlLXJpZ2h0JylcbiAgICAgICAgICAgIC5hcHBlbmRUbyhuZXh0UHJldmlvdXNCdG5zKTtcblxuICAgICAgICAgbmV4dFByZXZpb3VzQnRucy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ25leHQtYnRuJykpIHtcbiAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLmN1cnJlbnRGaWx0ZXIudHlwZSA9PT0gJ2RhdGUtcmFuZ2UnKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLmN1cnJlbnRGaWx0ZXIudmFsdWUuc3RhcnQuc2V0RGF0ZShcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuY3VycmVudEZpbHRlci52YWx1ZS5zdGFydC5nZXREYXRlKCkgKyA3XG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5jdXJyZW50RmlsdGVyLnZhbHVlLmVuZC5zZXREYXRlKFxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5jdXJyZW50RmlsdGVyLnZhbHVlLmVuZC5nZXREYXRlKCkgKyA3XG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUuY3VycmVudEZpbHRlci50eXBlID09PSAnZGF0ZScpIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuY3VycmVudEZpbHRlci52YWx1ZS5zZXREYXRlKFxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5jdXJyZW50RmlsdGVyLnZhbHVlLmdldERhdGUoKSArIDFcbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwcmV2aW91cy1idG4nKSkge1xuICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUuY3VycmVudEZpbHRlci50eXBlID09PSAnZGF0ZS1yYW5nZScpIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuY3VycmVudEZpbHRlci52YWx1ZS5zdGFydC5zZXREYXRlKFxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5jdXJyZW50RmlsdGVyLnZhbHVlLnN0YXJ0LmdldERhdGUoKSAtIDdcbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLmN1cnJlbnRGaWx0ZXIudmFsdWUuZW5kLnNldERhdGUoXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLmN1cnJlbnRGaWx0ZXIudmFsdWUuZW5kLmdldERhdGUoKSAtIDdcbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZS5jdXJyZW50RmlsdGVyLnR5cGUgPT09ICdkYXRlJykge1xuICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5jdXJyZW50RmlsdGVyLnZhbHVlLnNldERhdGUoXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLmN1cnJlbnRGaWx0ZXIudmFsdWUuZ2V0RGF0ZSgpIC0gMVxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcHVic3ViLnB1Ymxpc2goJ2ZpbHRlcjpjaGFuZ2VkJywgdGhpcy5zdGF0ZS5jdXJyZW50RmlsdGVyKTtcbiAgICAgICAgIH0pO1xuICAgICAgfVxuICAgfVxufVxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCd0YXNrLWxpc3QnLCBUYXNrTGlzdCk7XG5cbmV4cG9ydCBkZWZhdWx0IFRhc2tMaXN0O1xuIiwiaW1wb3J0IGF1dG9BbmltYXRlIGZyb20gJ0Bmb3Jta2l0L2F1dG8tYW5pbWF0ZSc7XG5pbXBvcnQgcHVic3ViIGZyb20gJy4uLy4uL3V0aWxzL1B1YlN1Yic7XG5pbXBvcnQgY3JlYXRlRWxlbWVudCBmcm9tICcuLi8uLi91dGlscy9FbGVtZW50QnVpbGRlcic7XG5pbXBvcnQgVGFza0RldGFpbHMgZnJvbSAnLi4vY29tcG9uZW50cy9UYXNrRGV0YWlscyc7XG5cbmNsYXNzIEFwcFBhZ2UgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAgIGF1dG9BbmltYXRlKHRoaXMpO1xuICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVycygpO1xuICAgfVxuXG4gICBvcGVuVGFza0RldGFpbHModGFza0VkaXRTdGF0ZSkge1xuICAgICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrLWRldGFpbHMnKSkge1xuICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2stZGV0YWlscycpLnNldFN0YXRlKHRhc2tFZGl0U3RhdGUpO1xuICAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3QgdGFza0RldGFpbHMgPSBjcmVhdGVFbGVtZW50KCd0YXNrLWRldGFpbHMnKVxuICAgICAgICAgLnNldFN0YXRlKHRhc2tFZGl0U3RhdGUpXG4gICAgICAgICAuYXBwZW5kVG8odGhpcyk7XG4gICB9XG5cbiAgIHRvZ2dsZVNpZGVCYXIoKSB7XG4gICAgICB0aGlzLnRvZ2dsZUF0dHJpYnV0ZSgnc2lkZWJhci1vcGVuJyk7XG4gICB9XG5cbiAgIGFkZEV2ZW50TGlzdGVuZXJzKCkge1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsICgpID0+IHtcbiAgICAgICAgIGlmICh0aGlzLm9mZnNldFdpZHRoID49IDcwMCAmJiB0aGlzLmhhc0F0dHJpYnV0ZSgnc2lkZWJhci1vcGVuJykpIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlKCdzaWRlYmFyLW9wZW4nKTtcbiAgICAgICAgIH1cbiAgICAgIH0pO1xuICAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ2FwcC1wYWdlJywgQXBwUGFnZSk7XG5cbmV4cG9ydCBkZWZhdWx0IEFwcFBhZ2U7XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIi8qIGh0dHA6Ly9tZXllcndlYi5jb20vZXJpYy90b29scy9jc3MvcmVzZXQvIFxcbiAgIHYyLjAgfCAyMDExMDEyNlxcbiAgIExpY2Vuc2U6IG5vbmUgKHB1YmxpYyBkb21haW4pXFxuKi9cXG5cXG5odG1sLFxcbmJvZHksXFxuZGl2LFxcbnNwYW4sXFxuYXBwbGV0LFxcbm9iamVjdCxcXG5pZnJhbWUsXFxuaDEsXFxuaDIsXFxuaDMsXFxuaDQsXFxuaDUsXFxuaDYsXFxucCxcXG5ibG9ja3F1b3RlLFxcbnByZSxcXG5hLFxcbmFiYnIsXFxuYWNyb255bSxcXG5hZGRyZXNzLFxcbmJpZyxcXG5jaXRlLFxcbmNvZGUsXFxuZGVsLFxcbmRmbixcXG5lbSxcXG5pbWcsXFxuaW5zLFxcbmtiZCxcXG5xLFxcbnMsXFxuc2FtcCxcXG5zbWFsbCxcXG5zdHJpa2UsXFxuc3Ryb25nLFxcbnN1YixcXG5zdXAsXFxudHQsXFxudmFyLFxcbmIsXFxudSxcXG5pLFxcbmNlbnRlcixcXG5kbCxcXG5kdCxcXG5kZCxcXG5vbCxcXG51bCxcXG5saSxcXG5maWVsZHNldCxcXG5mb3JtLFxcbmxhYmVsLFxcbmxlZ2VuZCxcXG50YWJsZSxcXG5jYXB0aW9uLFxcbnRib2R5LFxcbnRmb290LFxcbnRoZWFkLFxcbnRyLFxcbnRoLFxcbnRkLFxcbmFydGljbGUsXFxuYXNpZGUsXFxuY2FudmFzLFxcbmRldGFpbHMsXFxuZW1iZWQsXFxuZmlndXJlLFxcbmZpZ2NhcHRpb24sXFxuZm9vdGVyLFxcbmhlYWRlcixcXG5oZ3JvdXAsXFxubWVudSxcXG5uYXYsXFxub3V0cHV0LFxcbnJ1YnksXFxuc2VjdGlvbixcXG5zdW1tYXJ5LFxcbnRpbWUsXFxubWFyayxcXG5hdWRpbyxcXG52aWRlbyB7XFxuICAgbWFyZ2luOiAwO1xcbiAgIHBhZGRpbmc6IDA7XFxuICAgYm9yZGVyOiAwO1xcbiAgIGZvbnQtc2l6ZTogMTAwJTtcXG4gICBmb250OiBpbmhlcml0O1xcbiAgIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXG59XFxuLyogSFRNTDUgZGlzcGxheS1yb2xlIHJlc2V0IGZvciBvbGRlciBicm93c2VycyAqL1xcbmFydGljbGUsXFxuYXNpZGUsXFxuZGV0YWlscyxcXG5maWdjYXB0aW9uLFxcbmZpZ3VyZSxcXG5mb290ZXIsXFxuaGVhZGVyLFxcbmhncm91cCxcXG5tZW51LFxcbm5hdixcXG5zZWN0aW9uIHtcXG4gICBkaXNwbGF5OiBibG9jaztcXG59XFxuYm9keSB7XFxuICAgbGluZS1oZWlnaHQ6IDE7XFxufVxcbm9sLFxcbnVsIHtcXG4gICBsaXN0LXN0eWxlOiBub25lO1xcbn1cXG5ibG9ja3F1b3RlLFxcbnEge1xcbiAgIHF1b3Rlczogbm9uZTtcXG59XFxuYmxvY2txdW90ZTpiZWZvcmUsXFxuYmxvY2txdW90ZTphZnRlcixcXG5xOmJlZm9yZSxcXG5xOmFmdGVyIHtcXG4gICBjb250ZW50OiAnJztcXG4gICBjb250ZW50OiBub25lO1xcbn1cXG50YWJsZSB7XFxuICAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcXG4gICBib3JkZXItc3BhY2luZzogMDtcXG59XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL2Fzc2V0cy9jc3MvcmVzZXQuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBOzs7Q0FHQzs7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUZHLFNBQVM7R0FDVCxVQUFVO0dBQ1YsU0FBUztHQUNULGVBQWU7R0FDZixhQUFhO0dBQ2Isd0JBQXdCO0FBQzNCO0FBQ0EsZ0RBQWdEO0FBQ2hEOzs7Ozs7Ozs7OztHQVdHLGNBQWM7QUFDakI7QUFDQTtHQUNHLGNBQWM7QUFDakI7QUFDQTs7R0FFRyxnQkFBZ0I7QUFDbkI7QUFDQTs7R0FFRyxZQUFZO0FBQ2Y7QUFDQTs7OztHQUlHLFdBQVc7R0FDWCxhQUFhO0FBQ2hCO0FBQ0E7R0FDRyx5QkFBeUI7R0FDekIsaUJBQWlCO0FBQ3BCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi8qIGh0dHA6Ly9tZXllcndlYi5jb20vZXJpYy90b29scy9jc3MvcmVzZXQvIFxcbiAgIHYyLjAgfCAyMDExMDEyNlxcbiAgIExpY2Vuc2U6IG5vbmUgKHB1YmxpYyBkb21haW4pXFxuKi9cXG5cXG5odG1sLFxcbmJvZHksXFxuZGl2LFxcbnNwYW4sXFxuYXBwbGV0LFxcbm9iamVjdCxcXG5pZnJhbWUsXFxuaDEsXFxuaDIsXFxuaDMsXFxuaDQsXFxuaDUsXFxuaDYsXFxucCxcXG5ibG9ja3F1b3RlLFxcbnByZSxcXG5hLFxcbmFiYnIsXFxuYWNyb255bSxcXG5hZGRyZXNzLFxcbmJpZyxcXG5jaXRlLFxcbmNvZGUsXFxuZGVsLFxcbmRmbixcXG5lbSxcXG5pbWcsXFxuaW5zLFxcbmtiZCxcXG5xLFxcbnMsXFxuc2FtcCxcXG5zbWFsbCxcXG5zdHJpa2UsXFxuc3Ryb25nLFxcbnN1YixcXG5zdXAsXFxudHQsXFxudmFyLFxcbmIsXFxudSxcXG5pLFxcbmNlbnRlcixcXG5kbCxcXG5kdCxcXG5kZCxcXG5vbCxcXG51bCxcXG5saSxcXG5maWVsZHNldCxcXG5mb3JtLFxcbmxhYmVsLFxcbmxlZ2VuZCxcXG50YWJsZSxcXG5jYXB0aW9uLFxcbnRib2R5LFxcbnRmb290LFxcbnRoZWFkLFxcbnRyLFxcbnRoLFxcbnRkLFxcbmFydGljbGUsXFxuYXNpZGUsXFxuY2FudmFzLFxcbmRldGFpbHMsXFxuZW1iZWQsXFxuZmlndXJlLFxcbmZpZ2NhcHRpb24sXFxuZm9vdGVyLFxcbmhlYWRlcixcXG5oZ3JvdXAsXFxubWVudSxcXG5uYXYsXFxub3V0cHV0LFxcbnJ1YnksXFxuc2VjdGlvbixcXG5zdW1tYXJ5LFxcbnRpbWUsXFxubWFyayxcXG5hdWRpbyxcXG52aWRlbyB7XFxuICAgbWFyZ2luOiAwO1xcbiAgIHBhZGRpbmc6IDA7XFxuICAgYm9yZGVyOiAwO1xcbiAgIGZvbnQtc2l6ZTogMTAwJTtcXG4gICBmb250OiBpbmhlcml0O1xcbiAgIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXG59XFxuLyogSFRNTDUgZGlzcGxheS1yb2xlIHJlc2V0IGZvciBvbGRlciBicm93c2VycyAqL1xcbmFydGljbGUsXFxuYXNpZGUsXFxuZGV0YWlscyxcXG5maWdjYXB0aW9uLFxcbmZpZ3VyZSxcXG5mb290ZXIsXFxuaGVhZGVyLFxcbmhncm91cCxcXG5tZW51LFxcbm5hdixcXG5zZWN0aW9uIHtcXG4gICBkaXNwbGF5OiBibG9jaztcXG59XFxuYm9keSB7XFxuICAgbGluZS1oZWlnaHQ6IDE7XFxufVxcbm9sLFxcbnVsIHtcXG4gICBsaXN0LXN0eWxlOiBub25lO1xcbn1cXG5ibG9ja3F1b3RlLFxcbnEge1xcbiAgIHF1b3Rlczogbm9uZTtcXG59XFxuYmxvY2txdW90ZTpiZWZvcmUsXFxuYmxvY2txdW90ZTphZnRlcixcXG5xOmJlZm9yZSxcXG5xOmFmdGVyIHtcXG4gICBjb250ZW50OiAnJztcXG4gICBjb250ZW50OiBub25lO1xcbn1cXG50YWJsZSB7XFxuICAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcXG4gICBib3JkZXItc3BhY2luZzogMDtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIkBpbXBvcnQgdXJsKGh0dHBzOi8vZm9udHMuY2RuZm9udHMuY29tL2Nzcy9nZy1zYW5zLTIpO1wiXSk7XG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiQGltcG9ydCB1cmwoaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1MaWxpdGErT25lJmRpc3BsYXk9c3dhcCk7XCJdKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIioge1xcbiAgIG1hcmdpbjogMDtcXG4gICBwYWRkaW5nOiAwO1xcbiAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgZm9udC1mYW1pbHk6ICdnZyBzYW5zIE1lZGl1bScsIHNhbnMtc2VyaWY7XFxufVxcblxcbjpyb290IHtcXG4gICAtLWRhcmtlc3Q6ICMxOTIzMzI7XFxuICAgLS1kYXJrZXI6ICMxZTI5M2I7XFxuICAgLS1kYXJrOiAjMzM0MTU1O1xcbiAgIC0tbWVkaXVtOiAjNDc1NTY5O1xcbiAgIC0tbGlnaHQ6ICM2NDc0OGI7XFxuICAgLS1saWdodGVyOiAjOTRhM2I4O1xcbiAgIC0tbGlnaHRlc3Q6ICNjYmQ1ZTE7XFxuICAgLS13aGl0ZTogI2YxZjVmOTtcXG4gICAtLWdyYXk6ICNkMWQ1ZGI7XFxuICAgLS1yZWQ6ICNmODcxNzE7XFxuICAgLS1ncmVlbjogIzIyYzU1ZTtcXG4gICAtLWJsdWU6ICMzYjgyZjY7XFxuICAgLS1ibHVycGxlOiAjNGY0NmU1O1xcbn1cXG5cXG5ib2R5IHtcXG4gICBoZWlnaHQ6IDEwMHZoO1xcbiAgIG92ZXJmbG93OiBoaWRkZW47XFxufVxcblxcbmFwcC1wYWdlIHtcXG4gICBkaXNwbGF5OiBncmlkO1xcbiAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMjUwcHggN2ZyO1xcbiAgIGdyaWQtYXV0by1mbG93OiBjb2x1bW47XFxuICAgZ3JpZC1hdXRvLWNvbHVtbnM6IDNmcjtcXG4gICBqdXN0aWZ5LWl0ZW1zOiBzdHJldGNoO1xcbiAgIGp1c3RpZnktY29udGVudDogc3RyZXRjaDtcXG4gICBjb2xvcjogdmFyKC0td2hpdGUpO1xcbiAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWRhcmtlc3QpO1xcbn1cXG5cXG50YXNrLWxpc3Qge1xcbiAgIGhlaWdodDogMTAwdmg7XFxuICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZGFya2VyKTtcXG4gICBkaXNwbGF5OiBncmlkO1xcbiAgIGdyaWQtdGVtcGxhdGUtcm93czogM3JlbTtcXG4gICBncmlkLWF1dG8tcm93czogYXV0bztcXG4gICBnYXA6IDAuN3JlbTtcXG4gICBqdXN0aWZ5LWNvbnRlbnQ6IHN0cmV0Y2g7XFxuICAganVzdGlmeS1pdGVtczogY2VudGVyO1xcbiAgIGFsaWduLWNvbnRlbnQ6IHN0YXJ0O1xcbiAgIG92ZXJmbG93OiBhdXRvO1xcbiAgIHBhZGRpbmc6IDAgMC41cmVtO1xcbiAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59XFxuXFxuLmZpeGVkLWFkZC10YXNrLWJ0biB7XFxuICAgY29sb3I6IHZhcigtLWxpZ2h0ZXN0KTtcXG4gICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1ibHVycGxlKTtcXG4gICBkaXNwbGF5OiBub25lO1xcbiAgIGhlaWdodDogM3JlbTtcXG4gICB3aWR0aDogM3JlbTtcXG4gICBmb250LWZhbWlseTogJ2dnIHNhbnMgTWVkaXVtJywgc2Fucy1zZXJpZjtcXG4gICBmb250LXNpemU6IDFyZW07XFxuICAgYm9yZGVyLXJhZGl1czogMS41cmVtO1xcbiAgIGZvbnQtc2l6ZTogMS40cmVtO1xcbn1cXG5cXG4uZml4ZWQtYnRuLWNvbnRhaW5lciB7XFxuICAgd2lkdGg6IG1pbigxMDAlLCA5MDBweCk7XFxuICAgZGlzcGxheTogZmxleDtcXG4gICBtaW4td2lkdGg6IDA7XFxuICAgcG9zaXRpb246IHN0aWNreTtcXG4gICBqdXN0aWZ5LWNvbnRlbnQ6IGVuZDtcXG4gICBwYWRkaW5nLXJpZ2h0OiAxcmVtO1xcbiAgIGJvdHRvbTogMXJlbTtcXG59XFxuXFxuLmNvbnRyb2wtc2VjdGlvbiB7XFxuICAgZGlzcGxheTogZmxleDtcXG4gICB3aWR0aDogbWluKDEwMCUsIDkwMHB4KTtcXG4gICBnYXA6IDFyZW07XFxuICAgcGFkZGluZzogMCAxcmVtO1xcbiAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG4gICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxufVxcblxcbi5zb3J0aW5nLWNvbnRyb2xzIHtcXG4gICBkaXNwbGF5OiBmbGV4O1xcbiAgIGdhcDogMC41cmVtO1xcbiAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5zb3J0aW5nLW9wdGlvbiB7XFxuICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbn1cXG5cXG4uc29ydGluZy1vcHRpb24gbGFiZWwge1xcbiAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbiAgIGxpbmUtaGVpZ2h0OiAxLjhlbTtcXG4gICBoZWlnaHQ6IDEuOHJlbTtcXG4gICBkaXNwbGF5OiBmbGV4O1xcbiAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZGFyayk7XFxuICAgcGFkZGluZzogMCAwLjZyZW07XFxuICAgYm9yZGVyLXJhZGl1czogMC45cmVtO1xcbn1cXG5cXG4uc29ydGluZy1vcHRpb24gaW5wdXRbdHlwZT0ncmFkaW8nXSB7XFxuICAgZGlzcGxheTogbm9uZTtcXG4gICBwb3NpdGlvbjogYWJzb2x1dGU7XFxufVxcblxcbi5zb3J0aW5nLW9wdGlvbiBpbnB1dFt0eXBlPSdyYWRpbyddOmNoZWNrZWQgKyBsYWJlbCB7XFxuICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZGFyayk7XFxuICAgYm9yZGVyOiB2YXIoLS1ibHVycGxlKSBzb2xpZCAxcHg7XFxuICAgZmlsdGVyOiBicmlnaHRuZXNzKDIpO1xcbn1cXG5cXG4ubmV4dC1wcmV2aW91cy1idG5zIHtcXG4gICBkaXNwbGF5OiBmbGV4O1xcbiAgIGdhcDogMC41cmVtO1xcbiAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5uZXh0LXByZXZpb3VzLWJ0bnMgYnV0dG9uIHtcXG4gICBkaXNwbGF5OiBmbGV4O1xcbiAgIGNvbG9yOiB2YXIoLS1saWdodGVzdCk7XFxuICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZGFyayk7XFxuICAgZm9udC1zaXplOiAxcmVtO1xcbiAgIHBhZGRpbmc6IDAuM3JlbSAwLjZyZW07XFxuICAgYm9yZGVyLXJhZGl1czogM3B4O1xcbn1cXG5cXG4ubmV4dC1wcmV2aW91cy1idG5zIC5kYXRlcyB7XFxuICAgZGlzcGxheTogZmxleDtcXG4gICBnYXA6IDAuNXJlbTtcXG59XFxuXFxuLm5leHQtcHJldmlvdXMtYnRucyAuZGF0ZXMgZGl2IHtcXG4gICBtaW4td2lkdGg6IDhyZW07XFxuICAgZGlzcGxheTogZmxleDtcXG4gICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuLnRhc2tzLWNvbnRhaW5lciB7XFxuICAgd2lkdGg6IG1pbigxMDAlLCA5MDBweCk7XFxuICAgZGlzcGxheTogZ3JpZDtcXG4gICBnYXA6IDAuNXJlbTtcXG59XFxuXFxudGFzay1jYXJkIHtcXG4gICB3aWR0aDogbWluKDEwMCUsIDkwMHB4KTtcXG4gICBkaXNwbGF5OiBncmlkO1xcbiAgIGdyaWQtYXV0by1mbG93OiByb3c7XFxuICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBtYXgtY29udGVudCBhdXRvIGF1dG8gbWF4LWNvbnRlbnQ7XFxuICAgaGVpZ2h0OiA4cmVtO1xcbiAgIHBhZGRpbmc6IDAuNXJlbSAxcmVtO1xcbiAgIGJvcmRlci1yYWRpdXM6IDAuN3JlbTtcXG4gICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1kYXJrKTtcXG4gICB0cmFuc2l0aW9uOiAzMDBtcztcXG59XFxuXFxudGFzay1jYXJkOmhvdmVyIHtcXG4gICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1tZWRpdW0pO1xcbiAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAtMnB4KTtcXG4gICBib3gtc2hhZG93OiAwIDE0cHggMjhweCByZ2JhKDAsIDAsIDAsIDAuMjUpLCAwIDEwcHggMTBweCByZ2JhKDAsIDAsIDAsIDAuMjIpO1xcbn1cXG5cXG50YXNrLWNhcmRbZWRpdGluZ10ge1xcbiAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLW1lZGl1bSk7XFxufVxcblxcbnRhc2stY2FyZCAudGFncyxcXG50YXNrLWNhcmQgLnRpdGxlLWxpbmUsXFxudGFzay1jYXJkIC5idXR0b25zIHtcXG4gICBkaXNwbGF5OiBmbGV4O1xcbiAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAganVzdGlmeS1jb250ZW50OiBzdGFydDtcXG4gICBnYXA6IDAuNXJlbTtcXG59XFxuXFxudGFzay1jYXJkIC50YWcge1xcbiAgIGZvbnQtc2l6ZTogMC44cmVtO1xcbiAgIGJvcmRlci1yYWRpdXM6IDFyZW07XFxuICAgcGFkZGluZzogMC4zcmVtIDAuNXJlbTtcXG4gICB3aWR0aDogbWF4LWNvbnRlbnQ7XFxuICAgbWF4LXdpZHRoOiA4cmVtO1xcbiAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XFxuICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcXG4gICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1kYXJrZXIpO1xcbn1cXG5cXG50YXNrLWNhcmQgLnRhZyBpIHtcXG4gICBtYXJnaW4tcmlnaHQ6IDRweDtcXG59XFxuXFxudGFzay1jYXJkIC50YWdbcHJpb3JpdHk9JzEnXSBpIHtcXG4gICBjb2xvcjogcmVkO1xcbn1cXG5cXG50YXNrLWNhcmQgLnRhZ1twcmlvcml0eT0nMiddIGkge1xcbiAgIGNvbG9yOiB5ZWxsb3c7XFxufVxcblxcbnRhc2stY2FyZCAudGFnW3ByaW9yaXR5PSczJ10gaSB7XFxuICAgY29sb3I6IGdyZWVuO1xcbn1cXG5cXG50YXNrLWNhcmQgLnRhZ1twcmlvcml0eT0nNCddIGkge1xcbiAgIGNvbG9yOiBibHVlO1xcbn1cXG5cXG50YXNrLWNhcmQgLnRpdGxlIHtcXG4gICBmb250LXNpemU6IDEuNHJlbTtcXG59XFxuXFxudGFzay1jYXJkIC5kZXNjcmlwdGlvbiB7XFxuICAgY29sb3I6IHZhcigtLWxpZ2h0ZXN0KTtcXG4gICBmb250LWZhbWlseTogJ2dnIHNhbnMgTm9ybWFsJywgc2Fucy1zZXJpZjtcXG4gICBmb250LXNpemU6IDFyZW07XFxuICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG4gICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xcbiAgIGFsaWduLXNlbGY6IGZsZXgtc3RhcnQ7XFxufVxcblxcbnRhc2stY2FyZCAuZWRpdC1idG4sXFxudGFzay1jYXJkIC5kZWxldGUsXFxudGFzay1jYXJkIC5jaGVja2JveC1sYWJlbCB7XFxuICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgIGhlaWdodDogMS42cmVtO1xcbiAgIHdpZHRoOiAyLjZyZW07XFxuICAgZm9udC1zaXplOiAxcmVtO1xcbiAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMCk7XFxuICAgZGlzcGxheTogZmxleDtcXG4gICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgIGJvcmRlci1yYWRpdXM6IDAuN3JlbTtcXG59XFxuXFxudGFzay1jYXJkIC5lZGl0LWJ0biB7XFxuICAgY29sb3I6IHZhcigtLWxpZ2h0KTtcXG59XFxuXFxudGFzay1jYXJkIC5kZWxldGUge1xcbiAgIGNvbG9yOiB2YXIoLS1saWdodCk7XFxufVxcblxcbnRhc2stY2FyZCAuZGVsZXRlOmhvdmVyLFxcbnRhc2stY2FyZCAuY2hlY2tib3gtbGFiZWxbY29tcGxldGVkPSd0cnVlJ10sXFxudGFzay1jYXJkIC5jaGVja2JveC1sYWJlbDpob3ZlcixcXG50YXNrLWNhcmQgLmVkaXQtYnRuOmhvdmVyLFxcbnRhc2stY2FyZFtlZGl0aW5nXSAuZWRpdC1idG4ge1xcbiAgIC8qIGNvbG9yOiB2YXIoLS1saWdodGVyKTsgKi9cXG4gICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1kYXJrKTtcXG4gICBib3JkZXI6IHZhcigtLWJsdXJwbGUpIHNvbGlkIDFweDtcXG4gICBmaWx0ZXI6IGJyaWdodG5lc3MoMik7XFxufVxcblxcbnRhc2stY2FyZCAuY2hlY2tib3gtbGFiZWwgaW5wdXQge1xcbiAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICBvcGFjaXR5OiAwO1xcbiAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICBoZWlnaHQ6IDA7XFxuICAgd2lkdGg6IDA7XFxufVxcblxcbi5jaGVja21hcmsge1xcbiAgIGNvbG9yOiB2YXIoLS1saWdodCk7XFxufVxcblxcbnRhc2stY2FyZCAuY2hlY2tib3gtbGFiZWwgLmNoZWNrbWFyazphZnRlciB7XFxuICAgbGVmdDogMC4zZW07XFxuICAgdG9wOiAwLjFlbTtcXG4gICB3aWR0aDogMC4yNWVtO1xcbiAgIGhlaWdodDogMC41ZW07XFxuICAgYm9yZGVyOiBzb2xpZCB3aGl0ZTtcXG4gICBib3JkZXItd2lkdGg6IDAgMC4xNWVtIDAuMTVlbSAwO1xcbiAgIHRyYW5zZm9ybTogcm90YXRlKDQ1ZGVnKTtcXG4gICB0cmFuc2l0aW9uOiBhbGwgNTAwbXMgZWFzZS1pbi1vdXQ7XFxufVxcblxcbnRhc2stY2FyZCAuc3RhdHVzIHtcXG4gICBkaXNwbGF5OiBmbGV4O1xcbiAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgd2lkdGg6IG1heC1jb250ZW50O1xcbiAgIGhlaWdodDogMS44cmVtO1xcbiAgIHBhZGRpbmc6IDAgMC42cmVtO1xcblxcbiAgIGZvbnQtZmFtaWx5OiAnZ2cgc2FucyBNZWRpdW0nLCBzYW5zLXNlcmlmO1xcbiAgIGZvbnQtc2l6ZTogMXJlbTtcXG4gICBib3JkZXItcmFkaXVzOiAxcmVtO1xcbn1cXG5cXG50YXNrLWNhcmQgLnN0YXR1c1tzdGF0dXM9J2NvbXBsZXRlZCddIHtcXG4gICAvKiBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1ncmVlbik7ICovXFxuICAgYmFja2dyb3VuZDogIzJjYzA1MzFiO1xcbiAgIGJvcmRlcjogdmFyKC0tZ3JlZW4pIHNvbGlkIDFweDtcXG4gICBjb2xvcjogdmFyKC0tZ3JlZW4pO1xcbn1cXG5cXG50YXNrLWNhcmQgLnN0YXR1c1tzdGF0dXM9J292ZXJkdWUnXSB7XFxuICAgLyogYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZ3JlZW4pOyAqL1xcbiAgIGJhY2tncm91bmQ6ICNjMDJjMmMxYjtcXG4gICBib3JkZXI6IHZhcigtLXJlZCkgc29saWQgMXB4O1xcbiAgIGNvbG9yOiB2YXIoLS1yZWQpO1xcbn1cXG5cXG50YXNrLWNhcmQgLnN0YXR1c1tzdGF0dXM9J3BlbmRpbmcnXSB7XFxuICAgLyogYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZ3JlZW4pOyAqL1xcbiAgIGJhY2tncm91bmQ6ICM0MjJjYzAxYjtcXG4gICBib3JkZXI6IHZhcigtLWJsdWUpIHNvbGlkIDFweDtcXG4gICBjb2xvcjogdmFyKC0tYmx1ZSk7XFxufVxcblxcbiNuZXctdGFzay1mb3JtIHtcXG4gICBtaW4td2lkdGg6IG1pbigxMDAlLCA5MDBweCk7XFxuICAgZGlzcGxheTogZ3JpZDtcXG4gICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IGF1dG8gMWZyIGF1dG87XFxuICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICBwYWRkaW5nOiAwLjVyZW07XFxuICAgYm9yZGVyLXJhZGl1czogMC43cmVtO1xcbiAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWRhcmspO1xcbiAgIGNvbHVtbi1nYXA6IDAuNHJlbTtcXG4gICBqdXN0aWZ5LWNvbnRlbnQ6IHN0cmV0Y2g7XFxufVxcblxcbmlucHV0LFxcbnRleHRhcmVhLFxcbmJ1dHRvbiB7XFxuICAgb3V0bGluZTogbm9uZTtcXG4gICBib3JkZXI6IG5vbmU7XFxufVxcblxcbmJ1dHRvbiB7XFxuICAgZGlzcGxheTogZmxleDtcXG4gICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgIGdhcDogMC4zcmVtO1xcbiAgIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuYnV0dG9uOmhvdmVyIHtcXG4gICBmaWx0ZXI6IGJyaWdodG5lc3MoMS4yKTtcXG59XFxuXFxuaSB7XFxuICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxufVxcblxcbiNuZXctdGFzay1mb3JtIGlucHV0LFxcbiNuZXctdGFzay1mb3JtIHRleHRhcmVhIHtcXG4gICBwYWRkaW5nOiAwO1xcbiAgIG91dGxpbmU6IG5vbmU7XFxuICAgY29sb3I6IHZhcigtLXdoaXRlKTtcXG4gICBib3JkZXI6IG5vbmU7XFxuICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZGFyayk7XFxufVxcblxcbiNuZXctdGFzay1mb3JtIFtuYW1lPSd0aXRsZS1pbnB1dCddIHtcXG4gICBoZWlnaHQ6IG1heC1jb250ZW50O1xcbiAgIGZvbnQtc2l6ZTogMS40cmVtO1xcbiAgIGZvbnQtZmFtaWx5OiAnZ2cgc2FucyBtZWRpdW0nLCBzYW5zLXNlcmlmO1xcbiAgIGp1c3RpZnktc2VsZjogc3RyZXRjaDtcXG4gICBncmlkLWNvbHVtbjogMi8zO1xcbn1cXG5cXG4jbmV3LXRhc2stZm9ybSBbbmFtZT0nZGVzY3JpcHRpb24taW5wdXQnXSB7XFxuICAgcmVzaXplOiBub25lO1xcbiAgIGdyaWQtY29sdW1uOiAxLy0xO1xcbiAgIGZvbnQtZmFtaWx5OiAnZ2cgc2FucyBub3JtYWwnLCBzYW5zLXNlcmlmO1xcbn1cXG5cXG4jbmV3LXRhc2stZm9ybSBbbmFtZT0nc2F2ZS10YXNrJ10ge1xcbiAgIGdyaWQtcm93OiAzLy0xO1xcbn1cXG5cXG4jbmV3LXRhc2stZm9ybSBbbmFtZT0nc2F2ZS10YXNrJ10sXFxuI25ldy10YXNrLWZvcm0gW25hbWU9J29wZW4tZm9ybSddLFxcbnRhc2stZGV0YWlscyBbbmFtZT0nc2F2ZS10YXNrJ10ge1xcbiAgIGp1c3RpZnktc2VsZjogZmxleC1lbmQ7XFxuICAgY29sb3I6IHZhcigtLXdoaXRlKTtcXG4gICBib3JkZXI6IG5vbmU7XFxuICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYmx1cnBsZSk7XFxuICAgcGFkZGluZzogMCAxcmVtO1xcbiAgIGhlaWdodDogMi41cmVtO1xcbiAgIGZvbnQtZmFtaWx5OiAnZ2cgc2FucyBNZWRpdW0nLCBzYW5zLXNlcmlmO1xcbiAgIGZvbnQtc2l6ZTogMXJlbTtcXG4gICBib3JkZXItcmFkaXVzOiAxLjJyZW07XFxuICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG59XFxuXFxuI25ldy10YXNrLWZvcm0gc2VsZWN0LFxcbiNuZXctdGFzay1mb3JtIFtuYW1lPSdkYXRlLWlucHV0J10ge1xcbiAgIG91dGxpbmU6IG5vbmU7XFxuICAgY29sb3I6IHZhcigtLXdoaXRlKTtcXG4gICBib3JkZXI6IG5vbmU7XFxuICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZGFya2VyKTtcXG4gICBtYXgtd2lkdGg6IDEwcmVtO1xcbiAgIHBhZGRpbmc6IDAgMXJlbTtcXG4gICBoZWlnaHQ6IDJyZW07XFxuICAgYm9yZGVyLXJhZGl1czogMC41cmVtO1xcbiAgIGZvbnQtZmFtaWx5OiAnZ2cgc2FucyBNZWRpdW0nLCBzYW5zLXNlcmlmO1xcbiAgIGZvbnQtc2l6ZTogMXJlbTtcXG4gICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbiAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XFxufVxcblxcbiNuZXctdGFzay1mb3JtIC5zZWxlY3Rpb24taW5wdXRzIHtcXG4gICBkaXNwbGF5OiBmbGV4O1xcbiAgIGZsZXgtd3JhcDogd3JhcDtcXG4gICBnYXA6IDFyZW07XFxufVxcblxcbiNuZXctdGFzay1mb3JtW2V4cGFuZGVkPSdmYWxzZSddIC5oaWRkZW4taW5wdXRzIHtcXG4gICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG4jbmV3LXRhc2stZm9ybVtleHBhbmRlZD0ndHJ1ZSddIC5oaWRkZW4taW5wdXRzIHtcXG4gICBncmlkLWNvbHVtbjogMi8tMTtcXG4gICBkaXNwbGF5OiBncmlkO1xcblxcbiAgIGdyaWQtdGVtcGxhdGUtcm93czogYXV0byBhdXRvIGF1dG87XFxuICAgZ2FwOiAxcmVtO1xcbn1cXG5cXG4jbmV3LXRhc2stZm9ybSAub3Blbi1mb3JtIHtcXG4gICBncmlkLWNvbHVtbjogMy80O1xcbn1cXG5cXG4jbmV3LXRhc2stZm9ybVtleHBhbmRlZD0ndHJ1ZSddIC5vcGVuLWZvcm0ge1xcbiAgIGRpc3BsYXk6IG5vbmU7XFxufVxcblxcbiNuZXctdGFzay1mb3JtW2V4cGFuZGVkPSdmYWxzZSddIC5jbG9zZS1mb3JtIHtcXG4gICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG4jbmV3LXRhc2stZm9ybSAuY2xvc2UtZm9ybSB7XFxuICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgIGNvbG9yOiB2YXIoLS1saWdodCk7XFxuICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwKTtcXG5cXG4gICBmb250LXNpemU6IDEuNHJlbTtcXG59XFxuXFxuc2lkZS1iYXIge1xcbiAgIGhlaWdodDogMTAwdmg7XFxuICAgZGlzcGxheTogZ3JpZDtcXG4gICBncmlkLXRlbXBsYXRlLXJvd3M6IDNyZW0gYXV0byBhdXRvO1xcbiAgIGdhcDogMi41cmVtO1xcbiAgIGFsaWduLWNvbnRlbnQ6IHN0YXJ0O1xcbiAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWRhcmspO1xcbiAgIG92ZXJmbG93OiBhdXRvO1xcbiAgIHotaW5kZXg6IDE7XFxufVxcblxcbi5oZWFkZXIge1xcbiAgIHotaW5kZXg6IDE7XFxuICAgcG9zaXRpb246IHN0aWNreTtcXG4gICBmb250LXNpemU6IDEuMXJlbTtcXG4gICB0b3A6IDA7XFxuICAgd2lkdGg6IDEwMCU7XFxuICAgZGlzcGxheTogZmxleDtcXG4gICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgIGdhcDogMXJlbTtcXG4gICBqdXN0aWZ5LXNlbGY6IHN0cmV0Y2g7XFxuICAgYm9yZGVyLWJvdHRvbTogdmFyKC0tZGFya2VzdCkgMS41cHggc29saWQ7XFxuICAgYmFja2dyb3VuZC1jb2xvcjogaW5oZXJpdDtcXG59XFxuXFxuc2lkZS1iYXIgLmhlYWRlciB7XFxuICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcblxcbiAgIHBhZGRpbmc6IDAgMXJlbTtcXG59XFxuXFxuc2lkZS1iYXIgLmhlYWRlciAuaWNvbiB7XFxuICAgZGlzcGxheTogZmxleDtcXG4gICBnYXA6IDAuNHJlbTtcXG4gICBmb250LWZhbWlseTogJ0xpbGl0YSBPbmUnLCBjdXJzaXZlO1xcbiAgIGZvbnQtc2l6ZTogMS43cmVtO1xcbiAgIGJhY2tncm91bmQtc2l6ZTogMTAwJTtcXG4gICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcbiAgIC13ZWJraXQtYmFja2dyb3VuZC1jbGlwOiB0ZXh0O1xcbiAgIC13ZWJraXQtdGV4dC1maWxsLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gICAtbW96LWJhY2tncm91bmQtY2xpcDogdGV4dDtcXG4gICAtbW96LXRleHQtZmlsbC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCAjZjhmMTYxLCAjYWY0MjQyKTtcXG59XFxuXFxuc2lkZS1iYXIgLmRlZmF1bHQtZmlsdGVycy11bCB7XFxuICAgcGFkZGluZzogMCAwLjRyZW07XFxufVxcblxcbnNpZGUtYmFyIC5kZWZhdWx0LWZpbHRlcixcXG5zaWRlLWJhciAucHJvamVjdHMtbGlzdC1oZWFkZXIge1xcbiAgIGdhcDogMC44cmVtO1xcbn1cXG5cXG5zaWRlLWJhciAuZGVmYXVsdC1maWx0ZXIgaSxcXG5zaWRlLWJhciAucHJvamVjdHMtbGlzdC1oZWFkZXIgaSB7XFxuICAgY29sb3I6IHZhcigtLWxpZ2h0ZXIpO1xcbiAgIHBhZGRpbmctYm90dG9tOiAzcHg7XFxufVxcblxcbnNpZGUtYmFyIC5kZWZhdWx0LWZpbHRlcjpob3ZlciBpLFxcbnNpZGUtYmFyIC5kZWZhdWx0LWZpbHRlcltjdXJyZW50LWZpbHRlcl0gaSB7XFxuICAgY29sb3I6IHZhcigtLWxpZ2h0ZXN0KTtcXG59XFxuXFxucHJvamVjdC1saXN0IHtcXG4gICB3aWR0aDogMTAwJTtcXG4gICBkaXNwbGF5OiBncmlkO1xcbiAgIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KGF1dG8tZmlsbCwgYXV0byk7XFxuICAganVzdGlmeS1jb250ZW50OiBzdHJldGNoO1xcbiAgIGFsaWduLWNvbnRlbnQ6IHN0YXJ0O1xcbiAgIHBhZGRpbmc6IDAgMC41cmVtO1xcbiAgIGdhcDogMC40cmVtO1xcbiAgIG92ZXJmbG93OiBoaWRkZW47XFxufVxcblxcbnByb2plY3QtbGlzdCBleHAtbGlzdCB7XFxuICAgZGlzcGxheTogZ3JpZDtcXG5cXG4gICBhbGlnbi1pdGVtczogc3RyZXRjaDtcXG4gICBvdmVyZmxvdzogaGlkZGVuO1xcbn1cXG5cXG5wcm9qZWN0LWxpc3QgZXhwLWxpc3QgdWwge1xcbiAgIGJvcmRlci10b3A6IHZhcigtLWxpZ2h0KSBzb2xpZCAxcHg7XFxuICAgZGlzcGxheTogZ3JpZDtcXG4gICBnYXA6IDAuMnJlbTtcXG4gICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgIHBhZGRpbmctbGVmdDogMXJlbTtcXG4gICBwYWRkaW5nLXRvcDogMC4ycmVtO1xcbiAgIHRyYW5zaXRpb246IGhlaWdodCAwLjVzIGVhc2Utb3V0O1xcbn1cXG5cXG5wcm9qZWN0LWxpc3QgZWRpdGFibGUtbGksXFxuLmRlZmF1bHQtZmlsdGVyLFxcbi5wcm9qZWN0cy1saXN0LWhlYWRlciB7XFxuICAgZm9udC1zaXplOiAxcmVtO1xcbiAgIGRpc3BsYXk6IGZsZXg7XFxuICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICBhbGlnbi1jb250ZW50OiBjZW50ZXI7XFxuICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICBoZWlnaHQ6IDJyZW07XFxuICAgcGFkZGluZzogMCAwLjRyZW07XFxuICAgYm9yZGVyLXJhZGl1czogMC40cmVtO1xcbiAgIGdhcDogMC4zcmVtO1xcbiAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XFxuICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcXG59XFxuXFxuZWRpdGFibGUtbGkgLml0ZW0tdGl0bGUge1xcbiAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICBsaW5lLWhlaWdodDogbm9ybWFsO1xcbiAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XFxuICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcXG59XFxuXFxuZWRpdGFibGUtbGlbYWN0aXZlXSB7XFxuICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbWVkaXVtKTtcXG4gICBib3JkZXI6IHZhcigtLWxpZ2h0ZXIpIHNvbGlkIDFweDtcXG59XFxuXFxuc2lkZS1iYXIgW2N1cnJlbnQtZmlsdGVyXSB7XFxuICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbWVkaXVtKTtcXG59XFxuXFxuc2lkZS1iYXIgLmRlZmF1bHQtZmlsdGVycy11bCB7XFxuICAgZGlzcGxheTogZ3JpZDtcXG4gICBnYXA6IDAuM3JlbTtcXG59XFxuXFxuc2lkZS1iYXIgZWRpdGFibGUtbGk6aG92ZXIsXFxuLmRlZmF1bHQtZmlsdGVyOmhvdmVyIHtcXG4gICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1tZWRpdW0pO1xcbn1cXG5cXG5lZGl0YWJsZS1saSAuaXRlbS1idXR0b25zIHtcXG4gICBkaXNwbGF5OiBmbGV4O1xcbiAgIGdhcDogMC4ycmVtO1xcbiAgIG9wYWNpdHk6IDA7XFxuICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgIHJpZ2h0OiA0JTtcXG59XFxuXFxuZWRpdGFibGUtbGlbYWN0aXZlXSAuaXRlbS1idXR0b25zIHtcXG4gICBvcGFjaXR5OiAxO1xcbn1cXG5cXG5lZGl0YWJsZS1saTpob3ZlciAuaXRlbS1idXR0b25zIHtcXG4gICBvcGFjaXR5OiAxO1xcbn1cXG5cXG5wcm9qZWN0LWxpc3QgZXhwLWxpc3QgW2RhdGEtdHlwZT0ncHJvamVjdCddOjpiZWZvcmUge1xcbiAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICBjb250ZW50OiAnJztcXG4gICAtd2Via2l0LWJvcmRlci1yYWRpdXM6IDAuMnJlbTtcXG4gICBib3JkZXItcmFkaXVzOiAwLjJyZW07XFxuICAgaGVpZ2h0OiAwLjVyZW07XFxuICAgd2lkdGg6IDAuNHJlbTtcXG4gICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1saWdodCk7XFxufVxcblxcbnByb2plY3QtbGlzdCBleHAtbGlzdCBbZGF0YS10eXBlPSdjYXRlZ29yeSddOjpiZWZvcmUge1xcbiAgIGJvcmRlci1jb2xvcjogdmFyKC0tbGlnaHRlcik7XFxuICAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcXG4gICBib3JkZXItd2lkdGg6IDAuMTVlbSAwLjE1ZW0gMCAwO1xcbiAgIGNvbnRlbnQ6ICcnO1xcbiAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICBoZWlnaHQ6IDAuNGVtO1xcbiAgIHRyYW5zZm9ybTogcm90YXRlKDQ1ZGVnKTtcXG4gICB3aWR0aDogMC40ZW07XFxuICAgbWFyZ2luLXJpZ2h0OiAwLjJyZW07XFxufVxcblxcbnByb2plY3QtbGlzdCBleHAtbGlzdFtleHBhbmRlZF0gW2RhdGEtdHlwZT0nY2F0ZWdvcnknXTo6YmVmb3JlIHtcXG4gICB0cmFuc2Zvcm06IHJvdGF0ZSgxMzVkZWcpO1xcbn1cXG5cXG5wcm9qZWN0LWxpc3QgZXhwLWxpc3Qge1xcbiAgIGRpc3BsYXk6IGZsZXg7XFxuICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG59XFxuXFxucHJvamVjdC1saXN0IC5hZGQtY2F0ZWdvcnktYnRuIHtcXG4gICBkaXNwbGF5OiBmbGV4O1xcbiAgIGp1c3RpZnktY29udGVudDogc3RhcnQ7XFxuICAgb3JkZXI6IDE7XFxuICAgY29sb3I6IHZhcigtLWxpZ2h0ZXIpO1xcbiAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMCk7XFxuICAgcGFkZGluZzogMCAxcmVtO1xcbiAgIGhlaWdodDogMnJlbTtcXG4gICBmb250LWZhbWlseTogJ2dnIHNhbnMgTWVkaXVtJywgc2Fucy1zZXJpZjtcXG4gICBmb250LXNpemU6IDFyZW07XFxuICAgYm9yZGVyLXJhZGl1czogMC40cmVtO1xcbiAgIGdhcDogMXJlbTtcXG59XFxuXFxucHJvamVjdC1saXN0IC5hZGQtY2F0ZWdvcnktYnRuOmhvdmVyIHtcXG4gICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1tZWRpdW0pO1xcbiAgIGNvbG9yOiB2YXIoLS1saWdodGVzdCk7XFxufVxcblxcbnByb2plY3QtbGlzdCBleHAtbGlzdFtleHBhbmRlZF0gLml0ZW1zLWxpc3Qge1xcbiAgIGhlaWdodDogYXV0bztcXG59XFxuXFxucHJvamVjdC1saXN0IGV4cC1saXN0IC5pdGVtcy1saXN0IHtcXG4gICBoZWlnaHQ6IDA7XFxufVxcblxcbmVkaXRhYmxlLWxpIC5lZGl0aW5nLWlucHV0IHtcXG4gICBvdXRsaW5lOiBub25lO1xcbiAgIGZvbnQtc2l6ZTogMS4xcmVtO1xcbiAgIGNvbG9yOiB2YXIoLS1saWdodGVzdCk7XFxuICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwKTtcXG4gICBib3JkZXItcmFkaXVzOiAwLjRyZW07XFxuICAgd2lkdGg6IDEwMCU7XFxuICAgYWxpZ24tc2VsZjogc3RyZXRjaDtcXG59XFxuXFxuZWRpdGFibGUtbGlbYWN0aXZlXS5lcnJvciB7XFxuICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tcmVkKTtcXG59XFxuXFxuW2FjdGl2ZV0uZXJyb3Ige1xcbiAgIC13ZWJraXQtYW5pbWF0aW9uOiBzaGFrZSAwLjJzIGVhc2UtaW4tb3V0IDBzIDI7XFxuICAgYW5pbWF0aW9uOiBzaGFrZSAwLjJzIGVhc2UtaW4tb3V0IDBzIDI7XFxufVxcblxcbmVkaXRhYmxlLWxpIGJ1dHRvbiB7XFxuICAgZm9udC1zaXplOiAwLjhyZW07XFxuICAgaGVpZ2h0OiAxLjRyZW07XFxuICAgd2lkdGg6IDEuNHJlbTtcXG4gICBib3JkZXItcmFkaXVzOiAwLjJyZW07XFxuICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwKTtcXG4gICBjb2xvcjogdmFyKC0tZ3JheSk7XFxufVxcblxcbmVkaXRhYmxlLWxpIGJ1dHRvbjpob3ZlciB7XFxuICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbGlnaHQpO1xcbiAgIGZpbHRlcjogYnJpZ2h0bmVzcygxLjMpO1xcbn1cXG5cXG5lZGl0YWJsZS1saSAuc2F2ZS1pdGVtLFxcbmVkaXRhYmxlLWxpIC5jYW5jZWwtZWRpdGluZyB7XFxuICAgZGlzcGxheTogbm9uZTtcXG59XFxuXFxuZWRpdGFibGUtbGlbYWN0aXZlXSAuc2F2ZS1pdGVtLFxcbmVkaXRhYmxlLWxpW2FjdGl2ZV0gLmNhbmNlbC1lZGl0aW5nIHtcXG4gICBkaXNwbGF5OiBibG9jaztcXG59XFxuXFxuZWRpdGFibGUtbGlbYWN0aXZlXSAuZWRpdC1pdGVtLFxcbmVkaXRhYmxlLWxpW2FjdGl2ZV0gLmRlbGV0ZS1pdGVtLFxcbmVkaXRhYmxlLWxpW2FjdGl2ZV0gLml0ZW0tdGl0bGUge1xcbiAgIGRpc3BsYXk6IG5vbmU7XFxufVxcblxcbi5jaGVja2xpc3Qge1xcbiAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWRhcmtlcik7XFxuICAgZGlzcGxheTogZ3JpZDtcXG4gICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdChhdXRvLWZpbGwsIGF1dG8pO1xcbiAgIGdhcDogMC4ycmVtO1xcbiAgIGFsaWduLWNvbnRlbnQ6IHN0YXJ0O1xcbiAgIGJvcmRlci1yYWRpdXM6IDAuNHJlbTtcXG4gICBwYWRkaW5nOiAxcmVtO1xcbn1cXG5cXG4uY2hlY2tsaXN0IGVkaXRhYmxlLWxpIHtcXG4gICBmb250LXNpemU6IDFyZW07XFxuICAgZGlzcGxheTogZmxleDtcXG4gICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgaGVpZ2h0OiAyLjRyZW07XFxuICAgcGFkZGluZzogMCAwLjRyZW07XFxuICAgYm9yZGVyLXJhZGl1czogMC40cmVtO1xcbn1cXG5cXG4uY2hlY2tsaXN0IFtkYXRhLXR5cGU9J2NoZWNrbGlzdC1pdGVtJ11bY2hlY2tlZF06OmJlZm9yZSB7XFxuICAgYm9yZGVyLWNvbG9yOiB2YXIoLS13aGl0ZSk7XFxufVxcblxcbi5jaGVja2xpc3QgW2RhdGEtdHlwZT0nY2hlY2tsaXN0LWl0ZW0nXTo6YmVmb3JlIHtcXG4gICBib3JkZXItY29sb3I6IHZhcigtLWRhcmspO1xcbiAgIGJvcmRlci1zdHlsZTogc29saWQ7XFxuICAgYm9yZGVyLXdpZHRoOiAwLjE4ZW0gMC4xOGVtIDAgMDtcXG4gICBjb250ZW50OiAnJztcXG4gICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgaGVpZ2h0OiAwLjRlbTtcXG4gICB0cmFuc2Zvcm06IHJvdGF0ZSgxMzVkZWcpO1xcbiAgIHdpZHRoOiAwLjZlbTtcXG4gICBtYXJnaW4tcmlnaHQ6IDAuNnJlbTtcXG59XFxuXFxuLmNoZWNrbGlzdCBlZGl0YWJsZS1saVtkYXRhLXR5cGU9J2NoZWNrbGlzdCddIC5lZGl0LWl0ZW0sXFxuLmNoZWNrbGlzdCBlZGl0YWJsZS1saVtkYXRhLXR5cGU9J2NoZWNrbGlzdCddIC5kZWxldGUtaXRlbSB7XFxuICAgZGlzcGxheTogbm9uZTtcXG59XFxuXFxuLmNoZWNrbGlzdCBlZGl0YWJsZS1saVtkYXRhLXR5cGU9J2NoZWNrbGlzdCddIC5pdGVtLWJ1dHRvbnMge1xcbiAgIG9wYWNpdHk6IDE7XFxufVxcblxcbi5jaGVja2xpc3QgLmxpc3QtaGVhZGVyIHtcXG4gICBib3JkZXItcmFkaXVzOiAwO1xcbiAgIGJvcmRlci1ib3R0b206IHZhcigtLW1lZGl1bSkgc29saWQgMXB4O1xcbn1cXG4uY2hlY2tsaXN0IFtkYXRhLXR5cGU9J2NoZWNrbGlzdC1pdGVtJ11bY2hlY2tlZF0ge1xcbiAgIHRleHQtZGVjb3JhdGlvbjogbGluZS10aHJvdWdoO1xcbn1cXG5cXG50YXNrLWRldGFpbHMge1xcbiAgIGhlaWdodDogMTAwdmg7XFxuICAgei1pbmRleDogMTtcXG4gICBkaXNwbGF5OiBncmlkO1xcbiAgIGdyaWQtYXV0by1mbG93OiByb3cgZGVuc2U7XFxuICAgbWluLXdpZHRoOiA0MDBweDtcXG4gICBncmlkLXRlbXBsYXRlLXJvd3M6IDNyZW0gYXV0byAxZnI7XFxuICAgYWxpZ24taXRlbXM6IHN0cmV0Y2g7XFxuICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZGFyayk7XFxuICAgYm9yZGVyLXJhZGl1czogMC41cmVtO1xcbiAgIGFsaWduLWNvbnRlbnQ6IHN0YXJ0O1xcbiAgIGp1c3RpZnktaXRlbXM6IHN0YXJ0O1xcbiAgIG92ZXJmbG93OiBhdXRvO1xcbiAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICBib3gtc2hhZG93OiAwcHggMCA1cHggM3B4IHJnYmEoMCwgMCwgMCwgMC41KTtcXG59XFxuXFxudGFzay1kZXRhaWxzIC5oZWFkZXIge1xcbiAgIHBhZGRpbmctbGVmdDogMXJlbTtcXG59XFxuXFxudGFzay1kZXRhaWxzIC5pY29uIHtcXG4gICBmb250LXNpemU6IDMuNXJlbTtcXG4gICBvcGFjaXR5OiA1MCU7XFxuICAgcGFkZGluZzogMXJlbSAycmVtO1xcbn1cXG5cXG50YXNrLWRldGFpbHMgZm9ybSB7XFxuICAganVzdGlmeS1zZWxmOiBzdHJldGNoO1xcbiAgIGRpc3BsYXk6IGZsZXg7XFxuICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICBnYXA6IDEuMnJlbTtcXG4gICBwYWRkaW5nOiAxcmVtIDJyZW07XFxufVxcblxcbnRhc2stZGV0YWlscyBmb3JtIHNlbGVjdCxcXG50YXNrLWRldGFpbHMgZm9ybSBbbmFtZT0nZGF0ZS1pbnB1dCddIHtcXG4gICBvdXRsaW5lOiBub25lO1xcbiAgIGNvbG9yOiB2YXIoLS13aGl0ZSk7XFxuICAgYm9yZGVyOiBub25lO1xcbiAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWRhcmtlcik7XFxuICAgcGFkZGluZzogMCAxcmVtO1xcbiAgIG1pbi1oZWlnaHQ6IDJyZW07XFxuICAgd2lkdGg6IDE0cmVtO1xcbiAgIGFsaWduLXNlbGY6IGZsZXgtc3RhcnQ7XFxuICAgYm9yZGVyLXJhZGl1czogMC41cmVtO1xcbiAgIGZvbnQtZmFtaWx5OiAnZ2cgc2FucyBNZWRpdW0nLCBzYW5zLXNlcmlmO1xcbiAgIGZvbnQtc2l6ZTogMXJlbTtcXG4gICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbiAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XFxufVxcblxcbnRhc2stZGV0YWlscyBmb3JtIFtuYW1lPSd0aXRsZS1pbnB1dCddLFxcbnRhc2stZGV0YWlscyBmb3JtIFtuYW1lPSdkZXNjcmlwdGlvbi1pbnB1dCddIHtcXG4gICBwYWRkaW5nOiAwO1xcbiAgIG91dGxpbmU6IG5vbmU7XFxuICAgY29sb3I6IHZhcigtLXdoaXRlKTtcXG4gICBib3JkZXI6IG5vbmU7XFxuICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZGFyayk7XFxufVxcblxcbnRhc2stZGV0YWlscyBmb3JtIFtuYW1lPSd0aXRsZS1pbnB1dCddIHtcXG4gICBmb250LXNpemU6IDEuNnJlbTtcXG4gICBmb250LWZhbWlseTogJ2dnIHNhbnMgbWVkaXVtJywgc2Fucy1zZXJpZjtcXG59XFxuXFxudGFzay1kZXRhaWxzIGZvcm0gW25hbWU9J2Rlc2NyaXB0aW9uLWlucHV0J10ge1xcbiAgIHJlc2l6ZTogbm9uZTtcXG4gICBtaW4taGVpZ2h0OiA4cmVtO1xcbiAgIGZvbnQtZmFtaWx5OiAnZ2cgc2FucyBub3JtYWwnLCBzYW5zLXNlcmlmO1xcbn1cXG5cXG50YXNrLWRldGFpbHMgLmhlYWRlciB7XFxuICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbn1cXG5cXG50YXNrLWRldGFpbHMgLmNsb3NlIHtcXG4gICBmb250LXNpemU6IDEuNXJlbTtcXG4gICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgcmlnaHQ6IDEuNXJlbTtcXG4gICBjb2xvcjogdmFyKC0tbGlnaHQpO1xcbiAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMCk7XFxufVxcblxcbnRhc2stZGV0YWlscyBmb3JtIFtuYW1lPSdzYXZlLXRhc2snXSB7XFxuICAgYWxpZ24tc2VsZjogZW5kO1xcbiAgIGp1c3RpZnktc2VsZjogZW5kO1xcbn1cXG5cXG50YXNrLWRldGFpbHMgZm9ybSAuc3VibWl0LWJ0bi1jb250YWluZXIge1xcbiAgIGRpc3BsYXk6IGZsZXg7XFxuICAgZmxleDogMTtcXG59XFxuXFxuQC13ZWJraXQta2V5ZnJhbWVzIHNoYWtlIHtcXG4gICAwJSB7XFxuICAgfVxcbiAgIDI1JSB7XFxuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDFyZW0pO1xcbiAgIH1cXG4gICA3NSUge1xcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMXJlbSk7XFxuICAgfVxcbiAgIDEwMCUge1xcbiAgIH1cXG59XFxuXFxuLm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQge1xcbiAgIGZvbnQtdmFyaWF0aW9uLXNldHRpbmdzOiAnRklMTCcgMCwgJ3dnaHQnIDQwMCwgJ0dSQUQnIDAsICdvcHN6JyA0ODtcXG59XFxuXFxudGFzay1saXN0IC5oZWFkZXIgLnRvZ2dsZS1zaWRlLWJhcixcXG5zaWRlLWJhciAuaGVhZGVyIC5jbG9zZS1zaWRlLWJhciB7XFxuICAgd2lkdGg6IDJyZW07XFxuICAgaGVpZ2h0OiAycmVtO1xcbiAgIGZvbnQtc2l6ZTogMS4xcmVtO1xcbiAgIGJvcmRlci1yYWRpdXM6IDAuMnJlbTtcXG4gICBjb2xvcjogdmFyKC0tbGlnaHRlc3QpO1xcbiAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWRhcmspO1xcbn1cXG5cXG5zaWRlLWJhciAuaGVhZGVyIC5jbG9zZS1zaWRlLWJhciB7XFxuICAgZm9udC1zaXplOiAxLjJyZW07XFxuICAgZGlzcGxheTogbm9uZTtcXG59XFxuXFxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA3MDBweCkge1xcbiAgIGFwcC1wYWdlIHtcXG4gICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDI1MHB4IDdmcjtcXG4gICB9XFxuXFxuICAgdGFzay1saXN0IC5oZWFkZXIgLnRvZ2dsZS1zaWRlLWJhciB7XFxuICAgICAgZGlzcGxheTogbm9uZTtcXG4gICB9XFxuXFxuICAgLm5leHQtcHJldmlvdXMtYnRucy1sYWJlbCB7XFxuICAgICAgZGlzcGxheTogYmxvY2s7XFxuICAgfVxcbn1cXG5cXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDcwMHB4KSB7XFxuICAgaHRtbCB7XFxuICAgICAgLW1zLW92ZXJmbG93LXN0eWxlOiBub25lO1xcbiAgICAgIC8qIElFIGFuZCBFZGdlICovXFxuICAgICAgc2Nyb2xsYmFyLXdpZHRoOiBub25lO1xcbiAgICAgIG1heC13aWR0aDogMTAwdncgIWltcG9ydGFudDtcXG4gICAgICBvdmVyZmxvdzogaGlkZGVuICFpbXBvcnRhbnQ7XFxuICAgICAgb3ZlcmZsb3cteTogYXV0byAhaW1wb3J0YW50O1xcbiAgIH1cXG5cXG4gICBodG1sIDo6LXdlYmtpdC1zY3JvbGxiYXIge1xcbiAgICAgIGRpc3BsYXk6IG5vbmU7XFxuICAgfVxcblxcbiAgIGFwcC1wYWdlIHtcXG4gICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDAgN2ZyO1xcbiAgIH1cXG5cXG4gICBhcHAtcGFnZVtzaWRlYmFyLW9wZW5dIHtcXG4gICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDdmcjtcXG4gICB9XFxuXFxuICAgYXBwLXBhZ2Vbc2lkZWJhci1vcGVuXSBzaWRlLWJhciB7XFxuICAgICAgcG9zaXRpb246IGZpeGVkO1xcbiAgICAgIHRvcDogMDtcXG4gICAgICBsZWZ0OiAwO1xcbiAgICAgIGhlaWdodDogMTAwdmg7XFxuICAgICAgei1pbmRleDogMjtcXG4gICAgICBib3gtc2hhZG93OiA1cHggMCA1cHggLTJweCByZ2JhKDAsIDAsIDAsIDAuNSk7XFxuICAgfVxcblxcbiAgIGFwcC1wYWdlW3NpZGViYXItb3Blbl0gLmNsb3NlLXNpZGUtYmFyIHtcXG4gICAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgICB6LWluZGV4OiAxMDA7XFxuICAgfVxcblxcbiAgIHRhc2stbGlzdCAuaGVhZGVyIC50b2dnbGUtc2lkZS1iYXIge1xcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgIH1cXG5cXG4gICAuY29udHJvbC1zZWN0aW9uIHtcXG4gICAgICBmbGV4LXdyYXA6IHdyYXA7XFxuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgfVxcblxcbiAgIC5uZXh0LXByZXZpb3VzLWJ0bnMtbGFiZWwge1xcbiAgICAgIGRpc3BsYXk6IG5vbmU7XFxuICAgfVxcblxcbiAgIC5zb3J0aW5nLWNvbnRyb2xzLFxcbiAgIC5uZXh0LXByZXZpb3VzLWJ0bnMge1xcbiAgICAgIGZsZXg6IDE7XFxuICAgICAganVzdGlmeS1jb250ZW50OiBzdGFydDtcXG4gICB9XFxuXFxuICAgLm5leHQtcHJldmlvdXMtYnRucyB7XFxuICAgICAgZmxleDogMTtcXG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICAgfVxcbn1cXG5cXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDUwMHB4KSB7XFxuICAgaHRtbCB7XFxuICAgICAgZm9udC1zaXplOiA5MCU7XFxuICAgfVxcbn1cXG5cXG46OnBsYWNlaG9sZGVyIHtcXG4gICBjb2xvcjogdmFyKC0tbGlnaHRlcik7XFxuICAgb3BhY2l0eTogMTtcXG59XFxuXFxuOi1tcy1pbnB1dC1wbGFjZWhvbGRlciB7XFxuICAgY29sb3I6IHZhcigtLWxpZ2h0ZXIpO1xcbn1cXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvYXNzZXRzL2Nzcy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBR0E7R0FDRyxTQUFTO0dBQ1QsVUFBVTtHQUNWLHNCQUFzQjtHQUN0Qix5Q0FBeUM7QUFDNUM7O0FBRUE7R0FDRyxrQkFBa0I7R0FDbEIsaUJBQWlCO0dBQ2pCLGVBQWU7R0FDZixpQkFBaUI7R0FDakIsZ0JBQWdCO0dBQ2hCLGtCQUFrQjtHQUNsQixtQkFBbUI7R0FDbkIsZ0JBQWdCO0dBQ2hCLGVBQWU7R0FDZixjQUFjO0dBQ2QsZ0JBQWdCO0dBQ2hCLGVBQWU7R0FDZixrQkFBa0I7QUFDckI7O0FBRUE7R0FDRyxhQUFhO0dBQ2IsZ0JBQWdCO0FBQ25COztBQUVBO0dBQ0csYUFBYTtHQUNiLGdDQUFnQztHQUNoQyxzQkFBc0I7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Q0csMEJBQTBCO0dBQzdCOztHQUVBO01BQ0csZUFBZTtNQUNmLE1BQU07TUFDTixPQUFPO01BQ1AsYUFBYTtNQUNiLFVBQVU7TUFDViw2Q0FBNkM7R0FDaEQ7O0dBRUE7TUFDRyxjQUFjO01BQ2QsWUFBWTtHQUNmOztHQUVBO01BQ0csY0FBYztHQUNqQjs7R0FFQTtNQUNHLGVBQWU7TUFDZix1QkFBdUI7R0FDMUI7O0dBRUE7TUFDRyxhQUFhO0dBQ2hCOztHQUVBOztNQUVHLE9BQU87TUFDUCxzQkFBc0I7R0FDekI7O0dBRUE7TUFDRyxPQUFPO01BQ1AsOEJBQThCO0dBQ2pDO0FBQ0g7O0FBRUE7R0FDRztNQUNHLGNBQWM7R0FDakI7QUFDSDs7QUFFQTtHQUNHLHFCQUFxQjtHQUNyQixVQUFVO0FBQ2I7O0FBRUE7R0FDRyxxQkFBcUI7QUFDeEJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiQGltcG9ydCB1cmwoJ2h0dHBzOi8vZm9udHMuY2RuZm9udHMuY29tL2Nzcy9nZy1zYW5zLTInKTtcXG5AaW1wb3J0IHVybCgnaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1MaWxpdGErT25lJmRpc3BsYXk9c3dhcCcpO1xcblxcbioge1xcbiAgIG1hcmdpbjogMDtcXG4gICBwYWRkaW5nOiAwO1xcbiAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgZm9udC1mYW1pbHk6ICdnZyBzYW5zIE1lZGl1bScsIHNhbnMtc2VyaWY7XFxufVxcblxcbjpyb290IHtcXG4gICAtLWRhcmtlc3Q6ICMxOTIzMzI7XFxuICAgLS1kYXJrZXI6ICMxZTI5M2I7XFxuICAgLS1kYXJrOiAjMzM0MTU1O1xcbiAgIC0tbWVkaXVtOiAjNDc1NTY5O1xcbiAgIC0tbGlnaHQ6ICM2NDc0OGI7XFxuICAgLS1saWdodGVyOiAjOTRhM2I4O1xcbiAgIC0tbGlnaHRlc3Q6ICNjYmQ1ZTE7XFxuICAgLS13aGl0ZTogI2YxZjVmOTtcXG4gICAtLWdyYXk6ICNkMWQ1ZGI7XFxuICAgLS1yZWQ6ICNmODcxNzE7XFxuICAgLS1ncmVlbjogIzIyYzU1ZTtcXG4gICAtLWJsdWU6ICMzYjgyZjY7XFxuICAgLS1ibHVycGxlOiAjNGY0NmU1O1xcbn1cXG5cXG5ib2R5IHtcXG4gICBoZWlnaHQ6IDEwMHZoO1xcbiAgIG92ZXJmbG93OiBoaWRkZW47XFxufVxcblxcbmFwcC1wYWdlIHtcXG4gICBkaXNwbGF5OiBncmlkO1xcbiAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMjUwcHggN2ZyO1xcbiAgIGdyaWQtYXV0by1mbG93OiBjb2x1bW47XFxuICAgZ3JpZC1hdXRvLWNvbHVtbnM6IDNmcjtcXG4gICBqdXN0aWZ5LWl0ZW1zOiBzdHJldGNoO1xcbiAgIGp1c3RpZnktY29udGVudDogc3RyZXRjaDtcXG4gICBjb2xvcjogdmFyKC0td2hpdGUpO1xcbiAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWRhcmtlc3QpO1xcbn1cXG5cXG50YXNrLWxpc3Qge1xcbiAgIGhlaWdodDogMTAwdmg7XFxuICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZGFya2VyKTtcXG4gICBkaXNwbGF5OiBncmlkO1xcbiAgIGdyaWQtdGVtcGxhdGUtcm93czogM3JlbTtcXG4gICBncmlkLWF1dG8tcm93czogYXV0bztcXG4gICBnYXA6IDAuN3JlbTtcXG4gICBqdXN0aWZ5LWNvbnRlbnQ6IHN0cmV0Y2g7XFxuICAganVzdGlmeS1pdGVtczogY2VudGVyO1xcbiAgIGFsaWduLWNvbnRlbnQ6IHN0YXJ0O1xcbiAgIG92ZXJmbG93OiBhdXRvO1xcbiAgIHBhZGRpbmc6IDAgMC41cmVtO1xcbiAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59XFxuXFxuLmZpeGVkLWFkZC10YXNrLWJ0biB7XFxuICAgY29sb3I6IHZhcigtLWxpZ2h0ZXN0KTtcXG4gICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1ibHVycGxlKTtcXG4gICBkaXNwbGF5OiBub25lO1xcbiAgIGhlaWdodDogM3JlbTtcXG4gICB3aWR0aDogM3JlbTtcXG4gICBmb250LWZhbWlseTogJ2dnIHNhbnMgTWVkaXVtJywgc2Fucy1zZXJpZjtcXG4gICBmb250LXNpemU6IDFyZW07XFxuICAgYm9yZGVyLXJhZGl1czogMS41cmVtO1xcbiAgIGZvbnQtc2l6ZTogMS40cmVtO1xcbn1cXG5cXG4uZml4ZWQtYnRuLWNvbnRhaW5lciB7XFxuICAgd2lkdGg6IG1pbigxMDAlLCA5MDBweCk7XFxuICAgZGlzcGxheTogZmxleDtcXG4gICBtaW4td2lkdGg6IDA7XFxuICAgcG9zaXRpb246IHN0aWNreTtcXG4gICBqdXN0aWZ5LWNvbnRlbnQ6IGVuZDtcXG4gICBwYWRkaW5nLXJpZ2h0OiAxcmVtO1xcbiAgIGJvdHRvbTogMXJlbTtcXG59XFxuXFxuLmNvbnRyb2wtc2VjdGlvbiB7XFxuICAgZGlzcGxheTogZmxleDtcXG4gICB3aWR0aDogbWluKDEwMCUsIDkwMHB4KTtcXG4gICBnYXA6IDFyZW07XFxuICAgcGFkZGluZzogMCAxcmVtO1xcbiAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG4gICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxufVxcblxcbi5zb3J0aW5nLWNvbnRyb2xzIHtcXG4gICBkaXNwbGF5OiBmbGV4O1xcbiAgIGdhcDogMC41cmVtO1xcbiAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5zb3J0aW5nLW9wdGlvbiB7XFxuICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbn1cXG5cXG4uc29ydGluZy1vcHRpb24gbGFiZWwge1xcbiAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbiAgIGxpbmUtaGVpZ2h0OiAxLjhlbTtcXG4gICBoZWlnaHQ6IDEuOHJlbTtcXG4gICBkaXNwbGF5OiBmbGV4O1xcbiAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZGFyayk7XFxuICAgcGFkZGluZzogMCAwLjZyZW07XFxuICAgYm9yZGVyLXJhZGl1czogMC45cmVtO1xcbn1cXG5cXG4uc29ydGluZy1vcHRpb24gaW5wdXRbdHlwZT0ncmFkaW8nXSB7XFxuICAgZGlzcGxheTogbm9uZTtcXG4gICBwb3NpdGlvbjogYWJzb2x1dGU7XFxufVxcblxcbi5zb3J0aW5nLW9wdGlvbiBpbnB1dFt0eXBlPSdyYWRpbyddOmNoZWNrZWQgKyBsYWJlbCB7XFxuICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZGFyayk7XFxuICAgYm9yZGVyOiB2YXIoLS1ibHVycGxlKSBzb2xpZCAxcHg7XFxuICAgZmlsdGVyOiBicmlnaHRuZXNzKDIpO1xcbn1cXG5cXG4ubmV4dC1wcmV2aW91cy1idG5zIHtcXG4gICBkaXNwbGF5OiBmbGV4O1xcbiAgIGdhcDogMC41cmVtO1xcbiAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5uZXh0LXByZXZpb3VzLWJ0bnMgYnV0dG9uIHtcXG4gICBkaXNwbGF5OiBmbGV4O1xcbiAgIGNvbG9yOiB2YXIoLS1saWdodGVzdCk7XFxuICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZGFyayk7XFxuICAgZm9udC1zaXplOiAxcmVtO1xcbiAgIHBhZGRpbmc6IDAuM3JlbSAwLjZyZW07XFxuICAgYm9yZGVyLXJhZGl1czogM3B4O1xcbn1cXG5cXG4ubmV4dC1wcmV2aW91cy1idG5zIC5kYXRlcyB7XFxuICAgZGlzcGxheTogZmxleDtcXG4gICBnYXA6IDAuNXJlbTtcXG59XFxuXFxuLm5leHQtcHJldmlvdXMtYnRucyAuZGF0ZXMgZGl2IHtcXG4gICBtaW4td2lkdGg6IDhyZW07XFxuICAgZGlzcGxheTogZmxleDtcXG4gICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuLnRhc2tzLWNvbnRhaW5lciB7XFxuICAgd2lkdGg6IG1pbigxMDAlLCA5MDBweCk7XFxuICAgZGlzcGxheTogZ3JpZDtcXG4gICBnYXA6IDAuNXJlbTtcXG59XFxuXFxudGFzay1jYXJkIHtcXG4gICB3aWR0aDogbWluKDEwMCUsIDkwMHB4KTtcXG4gICBkaXNwbGF5OiBncmlkO1xcbiAgIGdyaWQtYXV0by1mbG93OiByb3c7XFxuICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBtYXgtY29udGVudCBhdXRvIGF1dG8gbWF4LWNvbnRlbnQ7XFxuICAgaGVpZ2h0OiA4cmVtO1xcbiAgIHBhZGRpbmc6IDAuNXJlbSAxcmVtO1xcbiAgIGJvcmRlci1yYWRpdXM6IDAuN3JlbTtcXG4gICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1kYXJrKTtcXG4gICB0cmFuc2l0aW9uOiAzMDBtcztcXG59XFxuXFxudGFzay1jYXJkOmhvdmVyIHtcXG4gICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1tZWRpdW0pO1xcbiAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAtMnB4KTtcXG4gICBib3gtc2hhZG93OiAwIDE0cHggMjhweCByZ2JhKDAsIDAsIDAsIDAuMjUpLCAwIDEwcHggMTBweCByZ2JhKDAsIDAsIDAsIDAuMjIpO1xcbn1cXG5cXG50YXNrLWNhcmRbZWRpdGluZ10ge1xcbiAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLW1lZGl1bSk7XFxufVxcblxcbnRhc2stY2FyZCAudGFncyxcXG50YXNrLWNhcmQgLnRpdGxlLWxpbmUsXFxudGFzay1jYXJkIC5idXR0b25zIHtcXG4gICBkaXNwbGF5OiBmbGV4O1xcbiAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAganVzdGlmeS1jb250ZW50OiBzdGFydDtcXG4gICBnYXA6IDAuNXJlbTtcXG59XFxuXFxudGFzay1jYXJkIC50YWcge1xcbiAgIGZvbnQtc2l6ZTogMC44cmVtO1xcbiAgIGJvcmRlci1yYWRpdXM6IDFyZW07XFxuICAgcGFkZGluZzogMC4zcmVtIDAuNXJlbTtcXG4gICB3aWR0aDogbWF4LWNvbnRlbnQ7XFxuICAgbWF4LXdpZHRoOiA4cmVtO1xcbiAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XFxuICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcXG4gICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1kYXJrZXIpO1xcbn1cXG5cXG50YXNrLWNhcmQgLnRhZyBpIHtcXG4gICBtYXJnaW4tcmlnaHQ6IDRweDtcXG59XFxuXFxudGFzay1jYXJkIC50YWdbcHJpb3JpdHk9JzEnXSBpIHtcXG4gICBjb2xvcjogcmVkO1xcbn1cXG5cXG50YXNrLWNhcmQgLnRhZ1twcmlvcml0eT0nMiddIGkge1xcbiAgIGNvbG9yOiB5ZWxsb3c7XFxufVxcblxcbnRhc2stY2FyZCAudGFnW3ByaW9yaXR5PSczJ10gaSB7XFxuICAgY29sb3I6IGdyZWVuO1xcbn1cXG5cXG50YXNrLWNhcmQgLnRhZ1twcmlvcml0eT0nNCddIGkge1xcbiAgIGNvbG9yOiBibHVlO1xcbn1cXG5cXG50YXNrLWNhcmQgLnRpdGxlIHtcXG4gICBmb250LXNpemU6IDEuNHJlbTtcXG59XFxuXFxudGFzay1jYXJkIC5kZXNjcmlwdGlvbiB7XFxuICAgY29sb3I6IHZhcigtLWxpZ2h0ZXN0KTtcXG4gICBmb250LWZhbWlseTogJ2dnIHNhbnMgTm9ybWFsJywgc2Fucy1zZXJpZjtcXG4gICBmb250LXNpemU6IDFyZW07XFxuICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG4gICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xcbiAgIGFsaWduLXNlbGY6IGZsZXgtc3RhcnQ7XFxufVxcblxcbnRhc2stY2FyZCAuZWRpdC1idG4sXFxudGFzay1jYXJkIC5kZWxldGUsXFxudGFzay1jYXJkIC5jaGVja2JveC1sYWJlbCB7XFxuICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgIGhlaWdodDogMS42cmVtO1xcbiAgIHdpZHRoOiAyLjZyZW07XFxuICAgZm9udC1zaXplOiAxcmVtO1xcbiAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMCk7XFxuICAgZGlzcGxheTogZmxleDtcXG4gICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgIGJvcmRlci1yYWRpdXM6IDAuN3JlbTtcXG59XFxuXFxudGFzay1jYXJkIC5lZGl0LWJ0biB7XFxuICAgY29sb3I6IHZhcigtLWxpZ2h0KTtcXG59XFxuXFxudGFzay1jYXJkIC5kZWxldGUge1xcbiAgIGNvbG9yOiB2YXIoLS1saWdodCk7XFxufVxcblxcbnRhc2stY2FyZCAuZGVsZXRlOmhvdmVyLFxcbnRhc2stY2FyZCAuY2hlY2tib3gtbGFiZWxbY29tcGxldGVkPSd0cnVlJ10sXFxudGFzay1jYXJkIC5jaGVja2JveC1sYWJlbDpob3ZlcixcXG50YXNrLWNhcmQgLmVkaXQtYnRuOmhvdmVyLFxcbnRhc2stY2FyZFtlZGl0aW5nXSAuZWRpdC1idG4ge1xcbiAgIC8qIGNvbG9yOiB2YXIoLS1saWdodGVyKTsgKi9cXG4gICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1kYXJrKTtcXG4gICBib3JkZXI6IHZhcigtLWJsdXJwbGUpIHNvbGlkIDFweDtcXG4gICBmaWx0ZXI6IGJyaWdodG5lc3MoMik7XFxufVxcblxcbnRhc2stY2FyZCAuY2hlY2tib3gtbGFiZWwgaW5wdXQge1xcbiAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICBvcGFjaXR5OiAwO1xcbiAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICBoZWlnaHQ6IDA7XFxuICAgd2lkdGg6IDA7XFxufVxcblxcbi5jaGVja21hcmsge1xcbiAgIGNvbG9yOiB2YXIoLS1saWdodCk7XFxufVxcblxcbnRhc2stY2FyZCAuY2hlY2tib3gtbGFiZWwgLmNoZWNrbWFyazphZnRlciB7XFxuICAgbGVmdDogMC4zZW07XFxuICAgdG9wOiAwLjFlbTtcXG4gICB3aWR0aDogMC4yNWVtO1xcbiAgIGhlaWdodDogMC41ZW07XFxuICAgYm9yZGVyOiBzb2xpZCB3aGl0ZTtcXG4gICBib3JkZXItd2lkdGg6IDAgMC4xNWVtIDAuMTVlbSAwO1xcbiAgIHRyYW5zZm9ybTogcm90YXRlKDQ1ZGVnKTtcXG4gICB0cmFuc2l0aW9uOiBhbGwgNTAwbXMgZWFzZS1pbi1vdXQ7XFxufVxcblxcbnRhc2stY2FyZCAuc3RhdHVzIHtcXG4gICBkaXNwbGF5OiBmbGV4O1xcbiAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgd2lkdGg6IG1heC1jb250ZW50O1xcbiAgIGhlaWdodDogMS44cmVtO1xcbiAgIHBhZGRpbmc6IDAgMC42cmVtO1xcblxcbiAgIGZvbnQtZmFtaWx5OiAnZ2cgc2FucyBNZWRpdW0nLCBzYW5zLXNlcmlmO1xcbiAgIGZvbnQtc2l6ZTogMXJlbTtcXG4gICBib3JkZXItcmFkaXVzOiAxcmVtO1xcbn1cXG5cXG50YXNrLWNhcmQgLnN0YXR1c1tzdGF0dXM9J2NvbXBsZXRlZCddIHtcXG4gICAvKiBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1ncmVlbik7ICovXFxuICAgYmFja2dyb3VuZDogIzJjYzA1MzFiO1xcbiAgIGJvcmRlcjogdmFyKC0tZ3JlZW4pIHNvbGlkIDFweDtcXG4gICBjb2xvcjogdmFyKC0tZ3JlZW4pO1xcbn1cXG5cXG50YXNrLWNhcmQgLnN0YXR1c1tzdGF0dXM9J292ZXJkdWUnXSB7XFxuICAgLyogYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZ3JlZW4pOyAqL1xcbiAgIGJhY2tncm91bmQ6ICNjMDJjMmMxYjtcXG4gICBib3JkZXI6IHZhcigtLXJlZCkgc29saWQgMXB4O1xcbiAgIGNvbG9yOiB2YXIoLS1yZWQpO1xcbn1cXG5cXG50YXNrLWNhcmQgLnN0YXR1c1tzdGF0dXM9J3BlbmRpbmcnXSB7XFxuICAgLyogYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZ3JlZW4pOyAqL1xcbiAgIGJhY2tncm91bmQ6ICM0MjJjYzAxYjtcXG4gICBib3JkZXI6IHZhcigtLWJsdWUpIHNvbGlkIDFweDtcXG4gICBjb2xvcjogdmFyKC0tYmx1ZSk7XFxufVxcblxcbiNuZXctdGFzay1mb3JtIHtcXG4gICBtaW4td2lkdGg6IG1pbigxMDAlLCA5MDBweCk7XFxuICAgZGlzcGxheTogZ3JpZDtcXG4gICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IGF1dG8gMWZyIGF1dG87XFxuICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICBwYWRkaW5nOiAwLjVyZW07XFxuICAgYm9yZGVyLXJhZGl1czogMC43cmVtO1xcbiAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWRhcmspO1xcbiAgIGNvbHVtbi1nYXA6IDAuNHJlbTtcXG4gICBqdXN0aWZ5LWNvbnRlbnQ6IHN0cmV0Y2g7XFxufVxcblxcbmlucHV0LFxcbnRleHRhcmVhLFxcbmJ1dHRvbiB7XFxuICAgb3V0bGluZTogbm9uZTtcXG4gICBib3JkZXI6IG5vbmU7XFxufVxcblxcbmJ1dHRvbiB7XFxuICAgZGlzcGxheTogZmxleDtcXG4gICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgIGdhcDogMC4zcmVtO1xcbiAgIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuYnV0dG9uOmhvdmVyIHtcXG4gICBmaWx0ZXI6IGJyaWdodG5lc3MoMS4yKTtcXG59XFxuXFxuaSB7XFxuICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxufVxcblxcbiNuZXctdGFzay1mb3JtIGlucHV0LFxcbiNuZXctdGFzay1mb3JtIHRleHRhcmVhIHtcXG4gICBwYWRkaW5nOiAwO1xcbiAgIG91dGxpbmU6IG5vbmU7XFxuICAgY29sb3I6IHZhcigtLXdoaXRlKTtcXG4gICBib3JkZXI6IG5vbmU7XFxuICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZGFyayk7XFxufVxcblxcbiNuZXctdGFzay1mb3JtIFtuYW1lPSd0aXRsZS1pbnB1dCddIHtcXG4gICBoZWlnaHQ6IG1heC1jb250ZW50O1xcbiAgIGZvbnQtc2l6ZTogMS40cmVtO1xcbiAgIGZvbnQtZmFtaWx5OiAnZ2cgc2FucyBtZWRpdW0nLCBzYW5zLXNlcmlmO1xcbiAgIGp1c3RpZnktc2VsZjogc3RyZXRjaDtcXG4gICBncmlkLWNvbHVtbjogMi8zO1xcbn1cXG5cXG4jbmV3LXRhc2stZm9ybSBbbmFtZT0nZGVzY3JpcHRpb24taW5wdXQnXSB7XFxuICAgcmVzaXplOiBub25lO1xcbiAgIGdyaWQtY29sdW1uOiAxLy0xO1xcbiAgIGZvbnQtZmFtaWx5OiAnZ2cgc2FucyBub3JtYWwnLCBzYW5zLXNlcmlmO1xcbn1cXG5cXG4jbmV3LXRhc2stZm9ybSBbbmFtZT0nc2F2ZS10YXNrJ10ge1xcbiAgIGdyaWQtcm93OiAzLy0xO1xcbn1cXG5cXG4jbmV3LXRhc2stZm9ybSBbbmFtZT0nc2F2ZS10YXNrJ10sXFxuI25ldy10YXNrLWZvcm0gW25hbWU9J29wZW4tZm9ybSddLFxcbnRhc2stZGV0YWlscyBbbmFtZT0nc2F2ZS10YXNrJ10ge1xcbiAgIGp1c3RpZnktc2VsZjogZmxleC1lbmQ7XFxuICAgY29sb3I6IHZhcigtLXdoaXRlKTtcXG4gICBib3JkZXI6IG5vbmU7XFxuICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYmx1cnBsZSk7XFxuICAgcGFkZGluZzogMCAxcmVtO1xcbiAgIGhlaWdodDogMi41cmVtO1xcbiAgIGZvbnQtZmFtaWx5OiAnZ2cgc2FucyBNZWRpdW0nLCBzYW5zLXNlcmlmO1xcbiAgIGZvbnQtc2l6ZTogMXJlbTtcXG4gICBib3JkZXItcmFkaXVzOiAxLjJyZW07XFxuICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG59XFxuXFxuI25ldy10YXNrLWZvcm0gc2VsZWN0LFxcbiNuZXctdGFzay1mb3JtIFtuYW1lPSdkYXRlLWlucHV0J10ge1xcbiAgIG91dGxpbmU6IG5vbmU7XFxuICAgY29sb3I6IHZhcigtLXdoaXRlKTtcXG4gICBib3JkZXI6IG5vbmU7XFxuICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZGFya2VyKTtcXG4gICBtYXgtd2lkdGg6IDEwcmVtO1xcbiAgIHBhZGRpbmc6IDAgMXJlbTtcXG4gICBoZWlnaHQ6IDJyZW07XFxuICAgYm9yZGVyLXJhZGl1czogMC41cmVtO1xcbiAgIGZvbnQtZmFtaWx5OiAnZ2cgc2FucyBNZWRpdW0nLCBzYW5zLXNlcmlmO1xcbiAgIGZvbnQtc2l6ZTogMXJlbTtcXG4gICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbiAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XFxufVxcblxcbiNuZXctdGFzay1mb3JtIC5zZWxlY3Rpb24taW5wdXRzIHtcXG4gICBkaXNwbGF5OiBmbGV4O1xcbiAgIGZsZXgtd3JhcDogd3JhcDtcXG4gICBnYXA6IDFyZW07XFxufVxcblxcbiNuZXctdGFzay1mb3JtW2V4cGFuZGVkPSdmYWxzZSddIC5oaWRkZW4taW5wdXRzIHtcXG4gICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG4jbmV3LXRhc2stZm9ybVtleHBhbmRlZD0ndHJ1ZSddIC5oaWRkZW4taW5wdXRzIHtcXG4gICBncmlkLWNvbHVtbjogMi8tMTtcXG4gICBkaXNwbGF5OiBncmlkO1xcblxcbiAgIGdyaWQtdGVtcGxhdGUtcm93czogYXV0byBhdXRvIGF1dG87XFxuICAgZ2FwOiAxcmVtO1xcbn1cXG5cXG4jbmV3LXRhc2stZm9ybSAub3Blbi1mb3JtIHtcXG4gICBncmlkLWNvbHVtbjogMy80O1xcbn1cXG5cXG4jbmV3LXRhc2stZm9ybVtleHBhbmRlZD0ndHJ1ZSddIC5vcGVuLWZvcm0ge1xcbiAgIGRpc3BsYXk6IG5vbmU7XFxufVxcblxcbiNuZXctdGFzay1mb3JtW2V4cGFuZGVkPSdmYWxzZSddIC5jbG9zZS1mb3JtIHtcXG4gICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG4jbmV3LXRhc2stZm9ybSAuY2xvc2UtZm9ybSB7XFxuICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgIGNvbG9yOiB2YXIoLS1saWdodCk7XFxuICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwKTtcXG5cXG4gICBmb250LXNpemU6IDEuNHJlbTtcXG59XFxuXFxuc2lkZS1iYXIge1xcbiAgIGhlaWdodDogMTAwdmg7XFxuICAgZGlzcGxheTogZ3JpZDtcXG4gICBncmlkLXRlbXBsYXRlLXJvd3M6IDNyZW0gYXV0byBhdXRvO1xcbiAgIGdhcDogMi41cmVtO1xcbiAgIGFsaWduLWNvbnRlbnQ6IHN0YXJ0O1xcbiAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWRhcmspO1xcbiAgIG92ZXJmbG93OiBhdXRvO1xcbiAgIHotaW5kZXg6IDE7XFxufVxcblxcbi5oZWFkZXIge1xcbiAgIHotaW5kZXg6IDE7XFxuICAgcG9zaXRpb246IHN0aWNreTtcXG4gICBmb250LXNpemU6IDEuMXJlbTtcXG4gICB0b3A6IDA7XFxuICAgd2lkdGg6IDEwMCU7XFxuICAgZGlzcGxheTogZmxleDtcXG4gICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgIGdhcDogMXJlbTtcXG4gICBqdXN0aWZ5LXNlbGY6IHN0cmV0Y2g7XFxuICAgYm9yZGVyLWJvdHRvbTogdmFyKC0tZGFya2VzdCkgMS41cHggc29saWQ7XFxuICAgYmFja2dyb3VuZC1jb2xvcjogaW5oZXJpdDtcXG59XFxuXFxuc2lkZS1iYXIgLmhlYWRlciB7XFxuICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcblxcbiAgIHBhZGRpbmc6IDAgMXJlbTtcXG59XFxuXFxuc2lkZS1iYXIgLmhlYWRlciAuaWNvbiB7XFxuICAgZGlzcGxheTogZmxleDtcXG4gICBnYXA6IDAuNHJlbTtcXG4gICBmb250LWZhbWlseTogJ0xpbGl0YSBPbmUnLCBjdXJzaXZlO1xcbiAgIGZvbnQtc2l6ZTogMS43cmVtO1xcbiAgIGJhY2tncm91bmQtc2l6ZTogMTAwJTtcXG4gICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcbiAgIC13ZWJraXQtYmFja2dyb3VuZC1jbGlwOiB0ZXh0O1xcbiAgIC13ZWJraXQtdGV4dC1maWxsLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gICAtbW96LWJhY2tncm91bmQtY2xpcDogdGV4dDtcXG4gICAtbW96LXRleHQtZmlsbC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCAjZjhmMTYxLCAjYWY0MjQyKTtcXG59XFxuXFxuc2lkZS1iYXIgLmRlZmF1bHQtZmlsdGVycy11bCB7XFxuICAgcGFkZGluZzogMCAwLjRyZW07XFxufVxcblxcbnNpZGUtYmFyIC5kZWZhdWx0LWZpbHRlcixcXG5zaWRlLWJhciAucHJvamVjdHMtbGlzdC1oZWFkZXIge1xcbiAgIGdhcDogMC44cmVtO1xcbn1cXG5cXG5zaWRlLWJhciAuZGVmYXVsdC1maWx0ZXIgaSxcXG5zaWRlLWJhciAucHJvamVjdHMtbGlzdC1oZWFkZXIgaSB7XFxuICAgY29sb3I6IHZhcigtLWxpZ2h0ZXIpO1xcbiAgIHBhZGRpbmctYm90dG9tOiAzcHg7XFxufVxcblxcbnNpZGUtYmFyIC5kZWZhdWx0LWZpbHRlcjpob3ZlciBpLFxcbnNpZGUtYmFyIC5kZWZhdWx0LWZpbHRlcltjdXJyZW50LWZpbHRlcl0gaSB7XFxuICAgY29sb3I6IHZhcigtLWxpZ2h0ZXN0KTtcXG59XFxuXFxucHJvamVjdC1saXN0IHtcXG4gICB3aWR0aDogMTAwJTtcXG4gICBkaXNwbGF5OiBncmlkO1xcbiAgIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KGF1dG8tZmlsbCwgYXV0byk7XFxuICAganVzdGlmeS1jb250ZW50OiBzdHJldGNoO1xcbiAgIGFsaWduLWNvbnRlbnQ6IHN0YXJ0O1xcbiAgIHBhZGRpbmc6IDAgMC41cmVtO1xcbiAgIGdhcDogMC40cmVtO1xcbiAgIG92ZXJmbG93OiBoaWRkZW47XFxufVxcblxcbnByb2plY3QtbGlzdCBleHAtbGlzdCB7XFxuICAgZGlzcGxheTogZ3JpZDtcXG5cXG4gICBhbGlnbi1pdGVtczogc3RyZXRjaDtcXG4gICBvdmVyZmxvdzogaGlkZGVuO1xcbn1cXG5cXG5wcm9qZWN0LWxpc3QgZXhwLWxpc3QgdWwge1xcbiAgIGJvcmRlci10b3A6IHZhcigtLWxpZ2h0KSBzb2xpZCAxcHg7XFxuICAgZGlzcGxheTogZ3JpZDtcXG4gICBnYXA6IDAuMnJlbTtcXG4gICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgIHBhZGRpbmctbGVmdDogMXJlbTtcXG4gICBwYWRkaW5nLXRvcDogMC4ycmVtO1xcbiAgIHRyYW5zaXRpb246IGhlaWdodCAwLjVzIGVhc2Utb3V0O1xcbn1cXG5cXG5wcm9qZWN0LWxpc3QgZWRpdGFibGUtbGksXFxuLmRlZmF1bHQtZmlsdGVyLFxcbi5wcm9qZWN0cy1saXN0LWhlYWRlciB7XFxuICAgZm9udC1zaXplOiAxcmVtO1xcbiAgIGRpc3BsYXk6IGZsZXg7XFxuICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICBhbGlnbi1jb250ZW50OiBjZW50ZXI7XFxuICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICBoZWlnaHQ6IDJyZW07XFxuICAgcGFkZGluZzogMCAwLjRyZW07XFxuICAgYm9yZGVyLXJhZGl1czogMC40cmVtO1xcbiAgIGdhcDogMC4zcmVtO1xcbiAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XFxuICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcXG59XFxuXFxuZWRpdGFibGUtbGkgLml0ZW0tdGl0bGUge1xcbiAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICBsaW5lLWhlaWdodDogbm9ybWFsO1xcbiAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XFxuICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcXG59XFxuXFxuZWRpdGFibGUtbGlbYWN0aXZlXSB7XFxuICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbWVkaXVtKTtcXG4gICBib3JkZXI6IHZhcigtLWxpZ2h0ZXIpIHNvbGlkIDFweDtcXG59XFxuXFxuc2lkZS1iYXIgW2N1cnJlbnQtZmlsdGVyXSB7XFxuICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbWVkaXVtKTtcXG59XFxuXFxuc2lkZS1iYXIgLmRlZmF1bHQtZmlsdGVycy11bCB7XFxuICAgZGlzcGxheTogZ3JpZDtcXG4gICBnYXA6IDAuM3JlbTtcXG59XFxuXFxuc2lkZS1iYXIgZWRpdGFibGUtbGk6aG92ZXIsXFxuLmRlZmF1bHQtZmlsdGVyOmhvdmVyIHtcXG4gICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1tZWRpdW0pO1xcbn1cXG5cXG5lZGl0YWJsZS1saSAuaXRlbS1idXR0b25zIHtcXG4gICBkaXNwbGF5OiBmbGV4O1xcbiAgIGdhcDogMC4ycmVtO1xcbiAgIG9wYWNpdHk6IDA7XFxuICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgIHJpZ2h0OiA0JTtcXG59XFxuXFxuZWRpdGFibGUtbGlbYWN0aXZlXSAuaXRlbS1idXR0b25zIHtcXG4gICBvcGFjaXR5OiAxO1xcbn1cXG5cXG5lZGl0YWJsZS1saTpob3ZlciAuaXRlbS1idXR0b25zIHtcXG4gICBvcGFjaXR5OiAxO1xcbn1cXG5cXG5wcm9qZWN0LWxpc3QgZXhwLWxpc3QgW2RhdGEtdHlwZT0ncHJvamVjdCddOjpiZWZvcmUge1xcbiAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICBjb250ZW50OiAnJztcXG4gICAtd2Via2l0LWJvcmRlci1yYWRpdXM6IDAuMnJlbTtcXG4gICBib3JkZXItcmFkaXVzOiAwLjJyZW07XFxuICAgaGVpZ2h0OiAwLjVyZW07XFxuICAgd2lkdGg6IDAuNHJlbTtcXG4gICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1saWdodCk7XFxufVxcblxcbnByb2plY3QtbGlzdCBleHAtbGlzdCBbZGF0YS10eXBlPSdjYXRlZ29yeSddOjpiZWZvcmUge1xcbiAgIGJvcmRlci1jb2xvcjogdmFyKC0tbGlnaHRlcik7XFxuICAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcXG4gICBib3JkZXItd2lkdGg6IDAuMTVlbSAwLjE1ZW0gMCAwO1xcbiAgIGNvbnRlbnQ6ICcnO1xcbiAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICBoZWlnaHQ6IDAuNGVtO1xcbiAgIHRyYW5zZm9ybTogcm90YXRlKDQ1ZGVnKTtcXG4gICB3aWR0aDogMC40ZW07XFxuICAgbWFyZ2luLXJpZ2h0OiAwLjJyZW07XFxufVxcblxcbnByb2plY3QtbGlzdCBleHAtbGlzdFtleHBhbmRlZF0gW2RhdGEtdHlwZT0nY2F0ZWdvcnknXTo6YmVmb3JlIHtcXG4gICB0cmFuc2Zvcm06IHJvdGF0ZSgxMzVkZWcpO1xcbn1cXG5cXG5wcm9qZWN0LWxpc3QgZXhwLWxpc3Qge1xcbiAgIGRpc3BsYXk6IGZsZXg7XFxuICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG59XFxuXFxucHJvamVjdC1saXN0IC5hZGQtY2F0ZWdvcnktYnRuIHtcXG4gICBkaXNwbGF5OiBmbGV4O1xcbiAgIGp1c3RpZnktY29udGVudDogc3RhcnQ7XFxuICAgb3JkZXI6IDE7XFxuICAgY29sb3I6IHZhcigtLWxpZ2h0ZXIpO1xcbiAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMCk7XFxuICAgcGFkZGluZzogMCAxcmVtO1xcbiAgIGhlaWdodDogMnJlbTtcXG4gICBmb250LWZhbWlseTogJ2dnIHNhbnMgTWVkaXVtJywgc2Fucy1zZXJpZjtcXG4gICBmb250LXNpemU6IDFyZW07XFxuICAgYm9yZGVyLXJhZGl1czogMC40cmVtO1xcbiAgIGdhcDogMXJlbTtcXG59XFxuXFxucHJvamVjdC1saXN0IC5hZGQtY2F0ZWdvcnktYnRuOmhvdmVyIHtcXG4gICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1tZWRpdW0pO1xcbiAgIGNvbG9yOiB2YXIoLS1saWdodGVzdCk7XFxufVxcblxcbnByb2plY3QtbGlzdCBleHAtbGlzdFtleHBhbmRlZF0gLml0ZW1zLWxpc3Qge1xcbiAgIGhlaWdodDogYXV0bztcXG59XFxuXFxucHJvamVjdC1saXN0IGV4cC1saXN0IC5pdGVtcy1saXN0IHtcXG4gICBoZWlnaHQ6IDA7XFxufVxcblxcbmVkaXRhYmxlLWxpIC5lZGl0aW5nLWlucHV0IHtcXG4gICBvdXRsaW5lOiBub25lO1xcbiAgIGZvbnQtc2l6ZTogMS4xcmVtO1xcbiAgIGNvbG9yOiB2YXIoLS1saWdodGVzdCk7XFxuICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwKTtcXG4gICBib3JkZXItcmFkaXVzOiAwLjRyZW07XFxuICAgd2lkdGg6IDEwMCU7XFxuICAgYWxpZ24tc2VsZjogc3RyZXRjaDtcXG59XFxuXFxuZWRpdGFibGUtbGlbYWN0aXZlXS5lcnJvciB7XFxuICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tcmVkKTtcXG59XFxuXFxuW2FjdGl2ZV0uZXJyb3Ige1xcbiAgIC13ZWJraXQtYW5pbWF0aW9uOiBzaGFrZSAwLjJzIGVhc2UtaW4tb3V0IDBzIDI7XFxuICAgYW5pbWF0aW9uOiBzaGFrZSAwLjJzIGVhc2UtaW4tb3V0IDBzIDI7XFxufVxcblxcbmVkaXRhYmxlLWxpIGJ1dHRvbiB7XFxuICAgZm9udC1zaXplOiAwLjhyZW07XFxuICAgaGVpZ2h0OiAxLjRyZW07XFxuICAgd2lkdGg6IDEuNHJlbTtcXG4gICBib3JkZXItcmFkaXVzOiAwLjJyZW07XFxuICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwKTtcXG4gICBjb2xvcjogdmFyKC0tZ3JheSk7XFxufVxcblxcbmVkaXRhYmxlLWxpIGJ1dHRvbjpob3ZlciB7XFxuICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbGlnaHQpO1xcbiAgIGZpbHRlcjogYnJpZ2h0bmVzcygxLjMpO1xcbn1cXG5cXG5lZGl0YWJsZS1saSAuc2F2ZS1pdGVtLFxcbmVkaXRhYmxlLWxpIC5jYW5jZWwtZWRpdGluZyB7XFxuICAgZGlzcGxheTogbm9uZTtcXG59XFxuXFxuZWRpdGFibGUtbGlbYWN0aXZlXSAuc2F2ZS1pdGVtLFxcbmVkaXRhYmxlLWxpW2FjdGl2ZV0gLmNhbmNlbC1lZGl0aW5nIHtcXG4gICBkaXNwbGF5OiBibG9jaztcXG59XFxuXFxuZWRpdGFibGUtbGlbYWN0aXZlXSAuZWRpdC1pdGVtLFxcbmVkaXRhYmxlLWxpW2FjdGl2ZV0gLmRlbGV0ZS1pdGVtLFxcbmVkaXRhYmxlLWxpW2FjdGl2ZV0gLml0ZW0tdGl0bGUge1xcbiAgIGRpc3BsYXk6IG5vbmU7XFxufVxcblxcbi5jaGVja2xpc3Qge1xcbiAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWRhcmtlcik7XFxuICAgZGlzcGxheTogZ3JpZDtcXG4gICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdChhdXRvLWZpbGwsIGF1dG8pO1xcbiAgIGdhcDogMC4ycmVtO1xcbiAgIGFsaWduLWNvbnRlbnQ6IHN0YXJ0O1xcbiAgIGJvcmRlci1yYWRpdXM6IDAuNHJlbTtcXG4gICBwYWRkaW5nOiAxcmVtO1xcbn1cXG5cXG4uY2hlY2tsaXN0IGVkaXRhYmxlLWxpIHtcXG4gICBmb250LXNpemU6IDFyZW07XFxuICAgZGlzcGxheTogZmxleDtcXG4gICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgaGVpZ2h0OiAyLjRyZW07XFxuICAgcGFkZGluZzogMCAwLjRyZW07XFxuICAgYm9yZGVyLXJhZGl1czogMC40cmVtO1xcbn1cXG5cXG4uY2hlY2tsaXN0IFtkYXRhLXR5cGU9J2NoZWNrbGlzdC1pdGVtJ11bY2hlY2tlZF06OmJlZm9yZSB7XFxuICAgYm9yZGVyLWNvbG9yOiB2YXIoLS13aGl0ZSk7XFxufVxcblxcbi5jaGVja2xpc3QgW2RhdGEtdHlwZT0nY2hlY2tsaXN0LWl0ZW0nXTo6YmVmb3JlIHtcXG4gICBib3JkZXItY29sb3I6IHZhcigtLWRhcmspO1xcbiAgIGJvcmRlci1zdHlsZTogc29saWQ7XFxuICAgYm9yZGVyLXdpZHRoOiAwLjE4ZW0gMC4xOGVtIDAgMDtcXG4gICBjb250ZW50OiAnJztcXG4gICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgaGVpZ2h0OiAwLjRlbTtcXG4gICB0cmFuc2Zvcm06IHJvdGF0ZSgxMzVkZWcpO1xcbiAgIHdpZHRoOiAwLjZlbTtcXG4gICBtYXJnaW4tcmlnaHQ6IDAuNnJlbTtcXG59XFxuXFxuLmNoZWNrbGlzdCBlZGl0YWJsZS1saVtkYXRhLXR5cGU9J2NoZWNrbGlzdCddIC5lZGl0LWl0ZW0sXFxuLmNoZWNrbGlzdCBlZGl0YWJsZS1saVtkYXRhLXR5cGU9J2NoZWNrbGlzdCddIC5kZWxldGUtaXRlbSB7XFxuICAgZGlzcGxheTogbm9uZTtcXG59XFxuXFxuLmNoZWNrbGlzdCBlZGl0YWJsZS1saVtkYXRhLXR5cGU9J2NoZWNrbGlzdCddIC5pdGVtLWJ1dHRvbnMge1xcbiAgIG9wYWNpdHk6IDE7XFxufVxcblxcbi5jaGVja2xpc3QgLmxpc3QtaGVhZGVyIHtcXG4gICBib3JkZXItcmFkaXVzOiAwO1xcbiAgIGJvcmRlci1ib3R0b206IHZhcigtLW1lZGl1bSkgc29saWQgMXB4O1xcbn1cXG4uY2hlY2tsaXN0IFtkYXRhLXR5cGU9J2NoZWNrbGlzdC1pdGVtJ11bY2hlY2tlZF0ge1xcbiAgIHRleHQtZGVjb3JhdGlvbjogbGluZS10aHJvdWdoO1xcbn1cXG5cXG50YXNrLWRldGFpbHMge1xcbiAgIGhlaWdodDogMTAwdmg7XFxuICAgei1pbmRleDogMTtcXG4gICBkaXNwbGF5OiBncmlkO1xcbiAgIGdyaWQtYXV0by1mbG93OiByb3cgZGVuc2U7XFxuICAgbWluLXdpZHRoOiA0MDBweDtcXG4gICBncmlkLXRlbXBsYXRlLXJvd3M6IDNyZW0gYXV0byAxZnI7XFxuICAgYWxpZ24taXRlbXM6IHN0cmV0Y2g7XFxuICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZGFyayk7XFxuICAgYm9yZGVyLXJhZGl1czogMC41cmVtO1xcbiAgIGFsaWduLWNvbnRlbnQ6IHN0YXJ0O1xcbiAgIGp1c3RpZnktaXRlbXM6IHN0YXJ0O1xcbiAgIG92ZXJmbG93OiBhdXRvO1xcbiAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICBib3gtc2hhZG93OiAwcHggMCA1cHggM3B4IHJnYmEoMCwgMCwgMCwgMC41KTtcXG59XFxuXFxudGFzay1kZXRhaWxzIC5oZWFkZXIge1xcbiAgIHBhZGRpbmctbGVmdDogMXJlbTtcXG59XFxuXFxudGFzay1kZXRhaWxzIC5pY29uIHtcXG4gICBmb250LXNpemU6IDMuNXJlbTtcXG4gICBvcGFjaXR5OiA1MCU7XFxuICAgcGFkZGluZzogMXJlbSAycmVtO1xcbn1cXG5cXG50YXNrLWRldGFpbHMgZm9ybSB7XFxuICAganVzdGlmeS1zZWxmOiBzdHJldGNoO1xcbiAgIGRpc3BsYXk6IGZsZXg7XFxuICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICBnYXA6IDEuMnJlbTtcXG4gICBwYWRkaW5nOiAxcmVtIDJyZW07XFxufVxcblxcbnRhc2stZGV0YWlscyBmb3JtIHNlbGVjdCxcXG50YXNrLWRldGFpbHMgZm9ybSBbbmFtZT0nZGF0ZS1pbnB1dCddIHtcXG4gICBvdXRsaW5lOiBub25lO1xcbiAgIGNvbG9yOiB2YXIoLS13aGl0ZSk7XFxuICAgYm9yZGVyOiBub25lO1xcbiAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWRhcmtlcik7XFxuICAgcGFkZGluZzogMCAxcmVtO1xcbiAgIG1pbi1oZWlnaHQ6IDJyZW07XFxuICAgd2lkdGg6IDE0cmVtO1xcbiAgIGFsaWduLXNlbGY6IGZsZXgtc3RhcnQ7XFxuICAgYm9yZGVyLXJhZGl1czogMC41cmVtO1xcbiAgIGZvbnQtZmFtaWx5OiAnZ2cgc2FucyBNZWRpdW0nLCBzYW5zLXNlcmlmO1xcbiAgIGZvbnQtc2l6ZTogMXJlbTtcXG4gICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbiAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XFxufVxcblxcbnRhc2stZGV0YWlscyBmb3JtIFtuYW1lPSd0aXRsZS1pbnB1dCddLFxcbnRhc2stZGV0YWlscyBmb3JtIFtuYW1lPSdkZXNjcmlwdGlvbi1pbnB1dCddIHtcXG4gICBwYWRkaW5nOiAwO1xcbiAgIG91dGxpbmU6IG5vbmU7XFxuICAgY29sb3I6IHZhcigtLXdoaXRlKTtcXG4gICBib3JkZXI6IG5vbmU7XFxuICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZGFyayk7XFxufVxcblxcbnRhc2stZGV0YWlscyBmb3JtIFtuYW1lPSd0aXRsZS1pbnB1dCddIHtcXG4gICBmb250LXNpemU6IDEuNnJlbTtcXG4gICBmb250LWZhbWlseTogJ2dnIHNhbnMgbWVkaXVtJywgc2Fucy1zZXJpZjtcXG59XFxuXFxudGFzay1kZXRhaWxzIGZvcm0gW25hbWU9J2Rlc2NyaXB0aW9uLWlucHV0J10ge1xcbiAgIHJlc2l6ZTogbm9uZTtcXG4gICBtaW4taGVpZ2h0OiA4cmVtO1xcbiAgIGZvbnQtZmFtaWx5OiAnZ2cgc2FucyBub3JtYWwnLCBzYW5zLXNlcmlmO1xcbn1cXG5cXG50YXNrLWRldGFpbHMgLmhlYWRlciB7XFxuICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbn1cXG5cXG50YXNrLWRldGFpbHMgLmNsb3NlIHtcXG4gICBmb250LXNpemU6IDEuNXJlbTtcXG4gICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgcmlnaHQ6IDEuNXJlbTtcXG4gICBjb2xvcjogdmFyKC0tbGlnaHQpO1xcbiAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMCk7XFxufVxcblxcbnRhc2stZGV0YWlscyBmb3JtIFtuYW1lPSdzYXZlLXRhc2snXSB7XFxuICAgYWxpZ24tc2VsZjogZW5kO1xcbiAgIGp1c3RpZnktc2VsZjogZW5kO1xcbn1cXG5cXG50YXNrLWRldGFpbHMgZm9ybSAuc3VibWl0LWJ0bi1jb250YWluZXIge1xcbiAgIGRpc3BsYXk6IGZsZXg7XFxuICAgZmxleDogMTtcXG59XFxuXFxuQC13ZWJraXQta2V5ZnJhbWVzIHNoYWtlIHtcXG4gICAwJSB7XFxuICAgfVxcbiAgIDI1JSB7XFxuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDFyZW0pO1xcbiAgIH1cXG4gICA3NSUge1xcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMXJlbSk7XFxuICAgfVxcbiAgIDEwMCUge1xcbiAgIH1cXG59XFxuXFxuLm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQge1xcbiAgIGZvbnQtdmFyaWF0aW9uLXNldHRpbmdzOiAnRklMTCcgMCwgJ3dnaHQnIDQwMCwgJ0dSQUQnIDAsICdvcHN6JyA0ODtcXG59XFxuXFxudGFzay1saXN0IC5oZWFkZXIgLnRvZ2dsZS1zaWRlLWJhcixcXG5zaWRlLWJhciAuaGVhZGVyIC5jbG9zZS1zaWRlLWJhciB7XFxuICAgd2lkdGg6IDJyZW07XFxuICAgaGVpZ2h0OiAycmVtO1xcbiAgIGZvbnQtc2l6ZTogMS4xcmVtO1xcbiAgIGJvcmRlci1yYWRpdXM6IDAuMnJlbTtcXG4gICBjb2xvcjogdmFyKC0tbGlnaHRlc3QpO1xcbiAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWRhcmspO1xcbn1cXG5cXG5zaWRlLWJhciAuaGVhZGVyIC5jbG9zZS1zaWRlLWJhciB7XFxuICAgZm9udC1zaXplOiAxLjJyZW07XFxuICAgZGlzcGxheTogbm9uZTtcXG59XFxuXFxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA3MDBweCkge1xcbiAgIGFwcC1wYWdlIHtcXG4gICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDI1MHB4IDdmcjtcXG4gICB9XFxuXFxuICAgdGFzay1saXN0IC5oZWFkZXIgLnRvZ2dsZS1zaWRlLWJhciB7XFxuICAgICAgZGlzcGxheTogbm9uZTtcXG4gICB9XFxuXFxuICAgLm5leHQtcHJldmlvdXMtYnRucy1sYWJlbCB7XFxuICAgICAgZGlzcGxheTogYmxvY2s7XFxuICAgfVxcbn1cXG5cXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDcwMHB4KSB7XFxuICAgaHRtbCB7XFxuICAgICAgLW1zLW92ZXJmbG93LXN0eWxlOiBub25lO1xcbiAgICAgIC8qIElFIGFuZCBFZGdlICovXFxuICAgICAgc2Nyb2xsYmFyLXdpZHRoOiBub25lO1xcbiAgICAgIG1heC13aWR0aDogMTAwdncgIWltcG9ydGFudDtcXG4gICAgICBvdmVyZmxvdzogaGlkZGVuICFpbXBvcnRhbnQ7XFxuICAgICAgb3ZlcmZsb3cteTogYXV0byAhaW1wb3J0YW50O1xcbiAgIH1cXG5cXG4gICBodG1sIDo6LXdlYmtpdC1zY3JvbGxiYXIge1xcbiAgICAgIGRpc3BsYXk6IG5vbmU7XFxuICAgfVxcblxcbiAgIGFwcC1wYWdlIHtcXG4gICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDAgN2ZyO1xcbiAgIH1cXG5cXG4gICBhcHAtcGFnZVtzaWRlYmFyLW9wZW5dIHtcXG4gICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDdmcjtcXG4gICB9XFxuXFxuICAgYXBwLXBhZ2Vbc2lkZWJhci1vcGVuXSBzaWRlLWJhciB7XFxuICAgICAgcG9zaXRpb246IGZpeGVkO1xcbiAgICAgIHRvcDogMDtcXG4gICAgICBsZWZ0OiAwO1xcbiAgICAgIGhlaWdodDogMTAwdmg7XFxuICAgICAgei1pbmRleDogMjtcXG4gICAgICBib3gtc2hhZG93OiA1cHggMCA1cHggLTJweCByZ2JhKDAsIDAsIDAsIDAuNSk7XFxuICAgfVxcblxcbiAgIGFwcC1wYWdlW3NpZGViYXItb3Blbl0gLmNsb3NlLXNpZGUtYmFyIHtcXG4gICAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgICB6LWluZGV4OiAxMDA7XFxuICAgfVxcblxcbiAgIHRhc2stbGlzdCAuaGVhZGVyIC50b2dnbGUtc2lkZS1iYXIge1xcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgIH1cXG5cXG4gICAuY29udHJvbC1zZWN0aW9uIHtcXG4gICAgICBmbGV4LXdyYXA6IHdyYXA7XFxuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgfVxcblxcbiAgIC5uZXh0LXByZXZpb3VzLWJ0bnMtbGFiZWwge1xcbiAgICAgIGRpc3BsYXk6IG5vbmU7XFxuICAgfVxcblxcbiAgIC5zb3J0aW5nLWNvbnRyb2xzLFxcbiAgIC5uZXh0LXByZXZpb3VzLWJ0bnMge1xcbiAgICAgIGZsZXg6IDE7XFxuICAgICAganVzdGlmeS1jb250ZW50OiBzdGFydDtcXG4gICB9XFxuXFxuICAgLm5leHQtcHJldmlvdXMtYnRucyB7XFxuICAgICAgZmxleDogMTtcXG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICAgfVxcbn1cXG5cXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDUwMHB4KSB7XFxuICAgaHRtbCB7XFxuICAgICAgZm9udC1zaXplOiA5MCU7XFxuICAgfVxcbn1cXG5cXG46OnBsYWNlaG9sZGVyIHtcXG4gICBjb2xvcjogdmFyKC0tbGlnaHRlcik7XFxuICAgb3BhY2l0eTogMTtcXG59XFxuXFxuOi1tcy1pbnB1dC1wbGFjZWhvbGRlciB7XFxuICAgY29sb3I6IHZhcigtLWxpZ2h0ZXIpO1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFkZExlYWRpbmdaZXJvcyhudW1iZXIsIHRhcmdldExlbmd0aCkge1xuICB2YXIgc2lnbiA9IG51bWJlciA8IDAgPyAnLScgOiAnJztcbiAgdmFyIG91dHB1dCA9IE1hdGguYWJzKG51bWJlcikudG9TdHJpbmcoKTtcbiAgd2hpbGUgKG91dHB1dC5sZW5ndGggPCB0YXJnZXRMZW5ndGgpIHtcbiAgICBvdXRwdXQgPSAnMCcgKyBvdXRwdXQ7XG4gIH1cbiAgcmV0dXJuIHNpZ24gKyBvdXRwdXQ7XG59IiwiaW1wb3J0IGRlZmF1bHRMb2NhbGUgZnJvbSBcIi4uLy4uL2xvY2FsZS9lbi1VUy9pbmRleC5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZGVmYXVsdExvY2FsZTsiLCJ2YXIgZGVmYXVsdE9wdGlvbnMgPSB7fTtcbmV4cG9ydCBmdW5jdGlvbiBnZXREZWZhdWx0T3B0aW9ucygpIHtcbiAgcmV0dXJuIGRlZmF1bHRPcHRpb25zO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHNldERlZmF1bHRPcHRpb25zKG5ld09wdGlvbnMpIHtcbiAgZGVmYXVsdE9wdGlvbnMgPSBuZXdPcHRpb25zO1xufSIsImltcG9ydCBnZXRVVENEYXlPZlllYXIgZnJvbSBcIi4uLy4uLy4uL19saWIvZ2V0VVRDRGF5T2ZZZWFyL2luZGV4LmpzXCI7XG5pbXBvcnQgZ2V0VVRDSVNPV2VlayBmcm9tIFwiLi4vLi4vLi4vX2xpYi9nZXRVVENJU09XZWVrL2luZGV4LmpzXCI7XG5pbXBvcnQgZ2V0VVRDSVNPV2Vla1llYXIgZnJvbSBcIi4uLy4uLy4uL19saWIvZ2V0VVRDSVNPV2Vla1llYXIvaW5kZXguanNcIjtcbmltcG9ydCBnZXRVVENXZWVrIGZyb20gXCIuLi8uLi8uLi9fbGliL2dldFVUQ1dlZWsvaW5kZXguanNcIjtcbmltcG9ydCBnZXRVVENXZWVrWWVhciBmcm9tIFwiLi4vLi4vLi4vX2xpYi9nZXRVVENXZWVrWWVhci9pbmRleC5qc1wiO1xuaW1wb3J0IGFkZExlYWRpbmdaZXJvcyBmcm9tIFwiLi4vLi4vYWRkTGVhZGluZ1plcm9zL2luZGV4LmpzXCI7XG5pbXBvcnQgbGlnaHRGb3JtYXR0ZXJzIGZyb20gXCIuLi9saWdodEZvcm1hdHRlcnMvaW5kZXguanNcIjtcbnZhciBkYXlQZXJpb2RFbnVtID0ge1xuICBhbTogJ2FtJyxcbiAgcG06ICdwbScsXG4gIG1pZG5pZ2h0OiAnbWlkbmlnaHQnLFxuICBub29uOiAnbm9vbicsXG4gIG1vcm5pbmc6ICdtb3JuaW5nJyxcbiAgYWZ0ZXJub29uOiAnYWZ0ZXJub29uJyxcbiAgZXZlbmluZzogJ2V2ZW5pbmcnLFxuICBuaWdodDogJ25pZ2h0J1xufTtcbi8qXG4gKiB8ICAgICB8IFVuaXQgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICB8IFVuaXQgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8LS0tLS18LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS18LS0tLS18LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS18XG4gKiB8ICBhICB8IEFNLCBQTSAgICAgICAgICAgICAgICAgICAgICAgICB8ICBBKiB8IE1pbGxpc2Vjb25kcyBpbiBkYXkgICAgICAgICAgICB8XG4gKiB8ICBiICB8IEFNLCBQTSwgbm9vbiwgbWlkbmlnaHQgICAgICAgICB8ICBCICB8IEZsZXhpYmxlIGRheSBwZXJpb2QgICAgICAgICAgICB8XG4gKiB8ICBjICB8IFN0YW5kLWFsb25lIGxvY2FsIGRheSBvZiB3ZWVrICB8ICBDKiB8IExvY2FsaXplZCBob3VyIHcvIGRheSBwZXJpb2QgICB8XG4gKiB8ICBkICB8IERheSBvZiBtb250aCAgICAgICAgICAgICAgICAgICB8ICBEICB8IERheSBvZiB5ZWFyICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICBlICB8IExvY2FsIGRheSBvZiB3ZWVrICAgICAgICAgICAgICB8ICBFICB8IERheSBvZiB3ZWVrICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICBmICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICBGKiB8IERheSBvZiB3ZWVrIGluIG1vbnRoICAgICAgICAgICB8XG4gKiB8ICBnKiB8IE1vZGlmaWVkIEp1bGlhbiBkYXkgICAgICAgICAgICB8ICBHICB8IEVyYSAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICBoICB8IEhvdXIgWzEtMTJdICAgICAgICAgICAgICAgICAgICB8ICBIICB8IEhvdXIgWzAtMjNdICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICBpISB8IElTTyBkYXkgb2Ygd2VlayAgICAgICAgICAgICAgICB8ICBJISB8IElTTyB3ZWVrIG9mIHllYXIgICAgICAgICAgICAgICB8XG4gKiB8ICBqKiB8IExvY2FsaXplZCBob3VyIHcvIGRheSBwZXJpb2QgICB8ICBKKiB8IExvY2FsaXplZCBob3VyIHcvbyBkYXkgcGVyaW9kICB8XG4gKiB8ICBrICB8IEhvdXIgWzEtMjRdICAgICAgICAgICAgICAgICAgICB8ICBLICB8IEhvdXIgWzAtMTFdICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICBsKiB8IChkZXByZWNhdGVkKSAgICAgICAgICAgICAgICAgICB8ICBMICB8IFN0YW5kLWFsb25lIG1vbnRoICAgICAgICAgICAgICB8XG4gKiB8ICBtICB8IE1pbnV0ZSAgICAgICAgICAgICAgICAgICAgICAgICB8ICBNICB8IE1vbnRoICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICBuICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICBOICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICBvISB8IE9yZGluYWwgbnVtYmVyIG1vZGlmaWVyICAgICAgICB8ICBPICB8IFRpbWV6b25lIChHTVQpICAgICAgICAgICAgICAgICB8XG4gKiB8ICBwISB8IExvbmcgbG9jYWxpemVkIHRpbWUgICAgICAgICAgICB8ICBQISB8IExvbmcgbG9jYWxpemVkIGRhdGUgICAgICAgICAgICB8XG4gKiB8ICBxICB8IFN0YW5kLWFsb25lIHF1YXJ0ZXIgICAgICAgICAgICB8ICBRICB8IFF1YXJ0ZXIgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICByKiB8IFJlbGF0ZWQgR3JlZ29yaWFuIHllYXIgICAgICAgICB8ICBSISB8IElTTyB3ZWVrLW51bWJlcmluZyB5ZWFyICAgICAgICB8XG4gKiB8ICBzICB8IFNlY29uZCAgICAgICAgICAgICAgICAgICAgICAgICB8ICBTICB8IEZyYWN0aW9uIG9mIHNlY29uZCAgICAgICAgICAgICB8XG4gKiB8ICB0ISB8IFNlY29uZHMgdGltZXN0YW1wICAgICAgICAgICAgICB8ICBUISB8IE1pbGxpc2Vjb25kcyB0aW1lc3RhbXAgICAgICAgICB8XG4gKiB8ICB1ICB8IEV4dGVuZGVkIHllYXIgICAgICAgICAgICAgICAgICB8ICBVKiB8IEN5Y2xpYyB5ZWFyICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICB2KiB8IFRpbWV6b25lIChnZW5lcmljIG5vbi1sb2NhdC4pICB8ICBWKiB8IFRpbWV6b25lIChsb2NhdGlvbikgICAgICAgICAgICB8XG4gKiB8ICB3ICB8IExvY2FsIHdlZWsgb2YgeWVhciAgICAgICAgICAgICB8ICBXKiB8IFdlZWsgb2YgbW9udGggICAgICAgICAgICAgICAgICB8XG4gKiB8ICB4ICB8IFRpbWV6b25lIChJU08tODYwMSB3L28gWikgICAgICB8ICBYICB8IFRpbWV6b25lIChJU08tODYwMSkgICAgICAgICAgICB8XG4gKiB8ICB5ICB8IFllYXIgKGFicykgICAgICAgICAgICAgICAgICAgICB8ICBZICB8IExvY2FsIHdlZWstbnVtYmVyaW5nIHllYXIgICAgICB8XG4gKiB8ICB6ICB8IFRpbWV6b25lIChzcGVjaWZpYyBub24tbG9jYXQuKSB8ICBaKiB8IFRpbWV6b25lIChhbGlhc2VzKSAgICAgICAgICAgICB8XG4gKlxuICogTGV0dGVycyBtYXJrZWQgYnkgKiBhcmUgbm90IGltcGxlbWVudGVkIGJ1dCByZXNlcnZlZCBieSBVbmljb2RlIHN0YW5kYXJkLlxuICpcbiAqIExldHRlcnMgbWFya2VkIGJ5ICEgYXJlIG5vbi1zdGFuZGFyZCwgYnV0IGltcGxlbWVudGVkIGJ5IGRhdGUtZm5zOlxuICogLSBgb2AgbW9kaWZpZXMgdGhlIHByZXZpb3VzIHRva2VuIHRvIHR1cm4gaXQgaW50byBhbiBvcmRpbmFsIChzZWUgYGZvcm1hdGAgZG9jcylcbiAqIC0gYGlgIGlzIElTTyBkYXkgb2Ygd2Vlay4gRm9yIGBpYCBhbmQgYGlpYCBpcyByZXR1cm5zIG51bWVyaWMgSVNPIHdlZWsgZGF5cyxcbiAqICAgaS5lLiA3IGZvciBTdW5kYXksIDEgZm9yIE1vbmRheSwgZXRjLlxuICogLSBgSWAgaXMgSVNPIHdlZWsgb2YgeWVhciwgYXMgb3Bwb3NlZCB0byBgd2Agd2hpY2ggaXMgbG9jYWwgd2VlayBvZiB5ZWFyLlxuICogLSBgUmAgaXMgSVNPIHdlZWstbnVtYmVyaW5nIHllYXIsIGFzIG9wcG9zZWQgdG8gYFlgIHdoaWNoIGlzIGxvY2FsIHdlZWstbnVtYmVyaW5nIHllYXIuXG4gKiAgIGBSYCBpcyBzdXBwb3NlZCB0byBiZSB1c2VkIGluIGNvbmp1bmN0aW9uIHdpdGggYElgIGFuZCBgaWBcbiAqICAgZm9yIHVuaXZlcnNhbCBJU08gd2Vlay1udW1iZXJpbmcgZGF0ZSwgd2hlcmVhc1xuICogICBgWWAgaXMgc3VwcG9zZWQgdG8gYmUgdXNlZCBpbiBjb25qdW5jdGlvbiB3aXRoIGB3YCBhbmQgYGVgXG4gKiAgIGZvciB3ZWVrLW51bWJlcmluZyBkYXRlIHNwZWNpZmljIHRvIHRoZSBsb2NhbGUuXG4gKiAtIGBQYCBpcyBsb25nIGxvY2FsaXplZCBkYXRlIGZvcm1hdFxuICogLSBgcGAgaXMgbG9uZyBsb2NhbGl6ZWQgdGltZSBmb3JtYXRcbiAqL1xuXG52YXIgZm9ybWF0dGVycyA9IHtcbiAgLy8gRXJhXG4gIEc6IGZ1bmN0aW9uIEcoZGF0ZSwgdG9rZW4sIGxvY2FsaXplKSB7XG4gICAgdmFyIGVyYSA9IGRhdGUuZ2V0VVRDRnVsbFllYXIoKSA+IDAgPyAxIDogMDtcbiAgICBzd2l0Y2ggKHRva2VuKSB7XG4gICAgICAvLyBBRCwgQkNcbiAgICAgIGNhc2UgJ0cnOlxuICAgICAgY2FzZSAnR0cnOlxuICAgICAgY2FzZSAnR0dHJzpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmVyYShlcmEsIHtcbiAgICAgICAgICB3aWR0aDogJ2FiYnJldmlhdGVkJ1xuICAgICAgICB9KTtcbiAgICAgIC8vIEEsIEJcbiAgICAgIGNhc2UgJ0dHR0dHJzpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmVyYShlcmEsIHtcbiAgICAgICAgICB3aWR0aDogJ25hcnJvdydcbiAgICAgICAgfSk7XG4gICAgICAvLyBBbm5vIERvbWluaSwgQmVmb3JlIENocmlzdFxuICAgICAgY2FzZSAnR0dHRyc6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZXJhKGVyYSwge1xuICAgICAgICAgIHdpZHRoOiAnd2lkZSdcbiAgICAgICAgfSk7XG4gICAgfVxuICB9LFxuICAvLyBZZWFyXG4gIHk6IGZ1bmN0aW9uIHkoZGF0ZSwgdG9rZW4sIGxvY2FsaXplKSB7XG4gICAgLy8gT3JkaW5hbCBudW1iZXJcbiAgICBpZiAodG9rZW4gPT09ICd5bycpIHtcbiAgICAgIHZhciBzaWduZWRZZWFyID0gZGF0ZS5nZXRVVENGdWxsWWVhcigpO1xuICAgICAgLy8gUmV0dXJucyAxIGZvciAxIEJDICh3aGljaCBpcyB5ZWFyIDAgaW4gSmF2YVNjcmlwdClcbiAgICAgIHZhciB5ZWFyID0gc2lnbmVkWWVhciA+IDAgPyBzaWduZWRZZWFyIDogMSAtIHNpZ25lZFllYXI7XG4gICAgICByZXR1cm4gbG9jYWxpemUub3JkaW5hbE51bWJlcih5ZWFyLCB7XG4gICAgICAgIHVuaXQ6ICd5ZWFyJ1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBsaWdodEZvcm1hdHRlcnMueShkYXRlLCB0b2tlbik7XG4gIH0sXG4gIC8vIExvY2FsIHdlZWstbnVtYmVyaW5nIHllYXJcbiAgWTogZnVuY3Rpb24gWShkYXRlLCB0b2tlbiwgbG9jYWxpemUsIG9wdGlvbnMpIHtcbiAgICB2YXIgc2lnbmVkV2Vla1llYXIgPSBnZXRVVENXZWVrWWVhcihkYXRlLCBvcHRpb25zKTtcbiAgICAvLyBSZXR1cm5zIDEgZm9yIDEgQkMgKHdoaWNoIGlzIHllYXIgMCBpbiBKYXZhU2NyaXB0KVxuICAgIHZhciB3ZWVrWWVhciA9IHNpZ25lZFdlZWtZZWFyID4gMCA/IHNpZ25lZFdlZWtZZWFyIDogMSAtIHNpZ25lZFdlZWtZZWFyO1xuXG4gICAgLy8gVHdvIGRpZ2l0IHllYXJcbiAgICBpZiAodG9rZW4gPT09ICdZWScpIHtcbiAgICAgIHZhciB0d29EaWdpdFllYXIgPSB3ZWVrWWVhciAlIDEwMDtcbiAgICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3ModHdvRGlnaXRZZWFyLCAyKTtcbiAgICB9XG5cbiAgICAvLyBPcmRpbmFsIG51bWJlclxuICAgIGlmICh0b2tlbiA9PT0gJ1lvJykge1xuICAgICAgcmV0dXJuIGxvY2FsaXplLm9yZGluYWxOdW1iZXIod2Vla1llYXIsIHtcbiAgICAgICAgdW5pdDogJ3llYXInXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBQYWRkaW5nXG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyh3ZWVrWWVhciwgdG9rZW4ubGVuZ3RoKTtcbiAgfSxcbiAgLy8gSVNPIHdlZWstbnVtYmVyaW5nIHllYXJcbiAgUjogZnVuY3Rpb24gUihkYXRlLCB0b2tlbikge1xuICAgIHZhciBpc29XZWVrWWVhciA9IGdldFVUQ0lTT1dlZWtZZWFyKGRhdGUpO1xuXG4gICAgLy8gUGFkZGluZ1xuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MoaXNvV2Vla1llYXIsIHRva2VuLmxlbmd0aCk7XG4gIH0sXG4gIC8vIEV4dGVuZGVkIHllYXIuIFRoaXMgaXMgYSBzaW5nbGUgbnVtYmVyIGRlc2lnbmF0aW5nIHRoZSB5ZWFyIG9mIHRoaXMgY2FsZW5kYXIgc3lzdGVtLlxuICAvLyBUaGUgbWFpbiBkaWZmZXJlbmNlIGJldHdlZW4gYHlgIGFuZCBgdWAgbG9jYWxpemVycyBhcmUgQi5DLiB5ZWFyczpcbiAgLy8gfCBZZWFyIHwgYHlgIHwgYHVgIHxcbiAgLy8gfC0tLS0tLXwtLS0tLXwtLS0tLXxcbiAgLy8gfCBBQyAxIHwgICAxIHwgICAxIHxcbiAgLy8gfCBCQyAxIHwgICAxIHwgICAwIHxcbiAgLy8gfCBCQyAyIHwgICAyIHwgIC0xIHxcbiAgLy8gQWxzbyBgeXlgIGFsd2F5cyByZXR1cm5zIHRoZSBsYXN0IHR3byBkaWdpdHMgb2YgYSB5ZWFyLFxuICAvLyB3aGlsZSBgdXVgIHBhZHMgc2luZ2xlIGRpZ2l0IHllYXJzIHRvIDIgY2hhcmFjdGVycyBhbmQgcmV0dXJucyBvdGhlciB5ZWFycyB1bmNoYW5nZWQuXG4gIHU6IGZ1bmN0aW9uIHUoZGF0ZSwgdG9rZW4pIHtcbiAgICB2YXIgeWVhciA9IGRhdGUuZ2V0VVRDRnVsbFllYXIoKTtcbiAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKHllYXIsIHRva2VuLmxlbmd0aCk7XG4gIH0sXG4gIC8vIFF1YXJ0ZXJcbiAgUTogZnVuY3Rpb24gUShkYXRlLCB0b2tlbiwgbG9jYWxpemUpIHtcbiAgICB2YXIgcXVhcnRlciA9IE1hdGguY2VpbCgoZGF0ZS5nZXRVVENNb250aCgpICsgMSkgLyAzKTtcbiAgICBzd2l0Y2ggKHRva2VuKSB7XG4gICAgICAvLyAxLCAyLCAzLCA0XG4gICAgICBjYXNlICdRJzpcbiAgICAgICAgcmV0dXJuIFN0cmluZyhxdWFydGVyKTtcbiAgICAgIC8vIDAxLCAwMiwgMDMsIDA0XG4gICAgICBjYXNlICdRUSc6XG4gICAgICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MocXVhcnRlciwgMik7XG4gICAgICAvLyAxc3QsIDJuZCwgM3JkLCA0dGhcbiAgICAgIGNhc2UgJ1FvJzpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLm9yZGluYWxOdW1iZXIocXVhcnRlciwge1xuICAgICAgICAgIHVuaXQ6ICdxdWFydGVyJ1xuICAgICAgICB9KTtcbiAgICAgIC8vIFExLCBRMiwgUTMsIFE0XG4gICAgICBjYXNlICdRUVEnOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUucXVhcnRlcihxdWFydGVyLCB7XG4gICAgICAgICAgd2lkdGg6ICdhYmJyZXZpYXRlZCcsXG4gICAgICAgICAgY29udGV4dDogJ2Zvcm1hdHRpbmcnXG4gICAgICAgIH0pO1xuICAgICAgLy8gMSwgMiwgMywgNCAobmFycm93IHF1YXJ0ZXI7IGNvdWxkIGJlIG5vdCBudW1lcmljYWwpXG4gICAgICBjYXNlICdRUVFRUSc6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5xdWFydGVyKHF1YXJ0ZXIsIHtcbiAgICAgICAgICB3aWR0aDogJ25hcnJvdycsXG4gICAgICAgICAgY29udGV4dDogJ2Zvcm1hdHRpbmcnXG4gICAgICAgIH0pO1xuICAgICAgLy8gMXN0IHF1YXJ0ZXIsIDJuZCBxdWFydGVyLCAuLi5cbiAgICAgIGNhc2UgJ1FRUVEnOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLnF1YXJ0ZXIocXVhcnRlciwge1xuICAgICAgICAgIHdpZHRoOiAnd2lkZScsXG4gICAgICAgICAgY29udGV4dDogJ2Zvcm1hdHRpbmcnXG4gICAgICAgIH0pO1xuICAgIH1cbiAgfSxcbiAgLy8gU3RhbmQtYWxvbmUgcXVhcnRlclxuICBxOiBmdW5jdGlvbiBxKGRhdGUsIHRva2VuLCBsb2NhbGl6ZSkge1xuICAgIHZhciBxdWFydGVyID0gTWF0aC5jZWlsKChkYXRlLmdldFVUQ01vbnRoKCkgKyAxKSAvIDMpO1xuICAgIHN3aXRjaCAodG9rZW4pIHtcbiAgICAgIC8vIDEsIDIsIDMsIDRcbiAgICAgIGNhc2UgJ3EnOlxuICAgICAgICByZXR1cm4gU3RyaW5nKHF1YXJ0ZXIpO1xuICAgICAgLy8gMDEsIDAyLCAwMywgMDRcbiAgICAgIGNhc2UgJ3FxJzpcbiAgICAgICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyhxdWFydGVyLCAyKTtcbiAgICAgIC8vIDFzdCwgMm5kLCAzcmQsIDR0aFxuICAgICAgY2FzZSAncW8nOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUub3JkaW5hbE51bWJlcihxdWFydGVyLCB7XG4gICAgICAgICAgdW5pdDogJ3F1YXJ0ZXInXG4gICAgICAgIH0pO1xuICAgICAgLy8gUTEsIFEyLCBRMywgUTRcbiAgICAgIGNhc2UgJ3FxcSc6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5xdWFydGVyKHF1YXJ0ZXIsIHtcbiAgICAgICAgICB3aWR0aDogJ2FiYnJldmlhdGVkJyxcbiAgICAgICAgICBjb250ZXh0OiAnc3RhbmRhbG9uZSdcbiAgICAgICAgfSk7XG4gICAgICAvLyAxLCAyLCAzLCA0IChuYXJyb3cgcXVhcnRlcjsgY291bGQgYmUgbm90IG51bWVyaWNhbClcbiAgICAgIGNhc2UgJ3FxcXFxJzpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLnF1YXJ0ZXIocXVhcnRlciwge1xuICAgICAgICAgIHdpZHRoOiAnbmFycm93JyxcbiAgICAgICAgICBjb250ZXh0OiAnc3RhbmRhbG9uZSdcbiAgICAgICAgfSk7XG4gICAgICAvLyAxc3QgcXVhcnRlciwgMm5kIHF1YXJ0ZXIsIC4uLlxuICAgICAgY2FzZSAncXFxcSc6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gbG9jYWxpemUucXVhcnRlcihxdWFydGVyLCB7XG4gICAgICAgICAgd2lkdGg6ICd3aWRlJyxcbiAgICAgICAgICBjb250ZXh0OiAnc3RhbmRhbG9uZSdcbiAgICAgICAgfSk7XG4gICAgfVxuICB9LFxuICAvLyBNb250aFxuICBNOiBmdW5jdGlvbiBNKGRhdGUsIHRva2VuLCBsb2NhbGl6ZSkge1xuICAgIHZhciBtb250aCA9IGRhdGUuZ2V0VVRDTW9udGgoKTtcbiAgICBzd2l0Y2ggKHRva2VuKSB7XG4gICAgICBjYXNlICdNJzpcbiAgICAgIGNhc2UgJ01NJzpcbiAgICAgICAgcmV0dXJuIGxpZ2h0Rm9ybWF0dGVycy5NKGRhdGUsIHRva2VuKTtcbiAgICAgIC8vIDFzdCwgMm5kLCAuLi4sIDEydGhcbiAgICAgIGNhc2UgJ01vJzpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLm9yZGluYWxOdW1iZXIobW9udGggKyAxLCB7XG4gICAgICAgICAgdW5pdDogJ21vbnRoJ1xuICAgICAgICB9KTtcbiAgICAgIC8vIEphbiwgRmViLCAuLi4sIERlY1xuICAgICAgY2FzZSAnTU1NJzpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLm1vbnRoKG1vbnRoLCB7XG4gICAgICAgICAgd2lkdGg6ICdhYmJyZXZpYXRlZCcsXG4gICAgICAgICAgY29udGV4dDogJ2Zvcm1hdHRpbmcnXG4gICAgICAgIH0pO1xuICAgICAgLy8gSiwgRiwgLi4uLCBEXG4gICAgICBjYXNlICdNTU1NTSc6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5tb250aChtb250aCwge1xuICAgICAgICAgIHdpZHRoOiAnbmFycm93JyxcbiAgICAgICAgICBjb250ZXh0OiAnZm9ybWF0dGluZydcbiAgICAgICAgfSk7XG4gICAgICAvLyBKYW51YXJ5LCBGZWJydWFyeSwgLi4uLCBEZWNlbWJlclxuICAgICAgY2FzZSAnTU1NTSc6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gbG9jYWxpemUubW9udGgobW9udGgsIHtcbiAgICAgICAgICB3aWR0aDogJ3dpZGUnLFxuICAgICAgICAgIGNvbnRleHQ6ICdmb3JtYXR0aW5nJ1xuICAgICAgICB9KTtcbiAgICB9XG4gIH0sXG4gIC8vIFN0YW5kLWFsb25lIG1vbnRoXG4gIEw6IGZ1bmN0aW9uIEwoZGF0ZSwgdG9rZW4sIGxvY2FsaXplKSB7XG4gICAgdmFyIG1vbnRoID0gZGF0ZS5nZXRVVENNb250aCgpO1xuICAgIHN3aXRjaCAodG9rZW4pIHtcbiAgICAgIC8vIDEsIDIsIC4uLiwgMTJcbiAgICAgIGNhc2UgJ0wnOlxuICAgICAgICByZXR1cm4gU3RyaW5nKG1vbnRoICsgMSk7XG4gICAgICAvLyAwMSwgMDIsIC4uLiwgMTJcbiAgICAgIGNhc2UgJ0xMJzpcbiAgICAgICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyhtb250aCArIDEsIDIpO1xuICAgICAgLy8gMXN0LCAybmQsIC4uLiwgMTJ0aFxuICAgICAgY2FzZSAnTG8nOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUub3JkaW5hbE51bWJlcihtb250aCArIDEsIHtcbiAgICAgICAgICB1bml0OiAnbW9udGgnXG4gICAgICAgIH0pO1xuICAgICAgLy8gSmFuLCBGZWIsIC4uLiwgRGVjXG4gICAgICBjYXNlICdMTEwnOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUubW9udGgobW9udGgsIHtcbiAgICAgICAgICB3aWR0aDogJ2FiYnJldmlhdGVkJyxcbiAgICAgICAgICBjb250ZXh0OiAnc3RhbmRhbG9uZSdcbiAgICAgICAgfSk7XG4gICAgICAvLyBKLCBGLCAuLi4sIERcbiAgICAgIGNhc2UgJ0xMTExMJzpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLm1vbnRoKG1vbnRoLCB7XG4gICAgICAgICAgd2lkdGg6ICduYXJyb3cnLFxuICAgICAgICAgIGNvbnRleHQ6ICdzdGFuZGFsb25lJ1xuICAgICAgICB9KTtcbiAgICAgIC8vIEphbnVhcnksIEZlYnJ1YXJ5LCAuLi4sIERlY2VtYmVyXG4gICAgICBjYXNlICdMTExMJzpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5tb250aChtb250aCwge1xuICAgICAgICAgIHdpZHRoOiAnd2lkZScsXG4gICAgICAgICAgY29udGV4dDogJ3N0YW5kYWxvbmUnXG4gICAgICAgIH0pO1xuICAgIH1cbiAgfSxcbiAgLy8gTG9jYWwgd2VlayBvZiB5ZWFyXG4gIHc6IGZ1bmN0aW9uIHcoZGF0ZSwgdG9rZW4sIGxvY2FsaXplLCBvcHRpb25zKSB7XG4gICAgdmFyIHdlZWsgPSBnZXRVVENXZWVrKGRhdGUsIG9wdGlvbnMpO1xuICAgIGlmICh0b2tlbiA9PT0gJ3dvJykge1xuICAgICAgcmV0dXJuIGxvY2FsaXplLm9yZGluYWxOdW1iZXIod2Vlaywge1xuICAgICAgICB1bml0OiAnd2VlaydcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKHdlZWssIHRva2VuLmxlbmd0aCk7XG4gIH0sXG4gIC8vIElTTyB3ZWVrIG9mIHllYXJcbiAgSTogZnVuY3Rpb24gSShkYXRlLCB0b2tlbiwgbG9jYWxpemUpIHtcbiAgICB2YXIgaXNvV2VlayA9IGdldFVUQ0lTT1dlZWsoZGF0ZSk7XG4gICAgaWYgKHRva2VuID09PSAnSW8nKSB7XG4gICAgICByZXR1cm4gbG9jYWxpemUub3JkaW5hbE51bWJlcihpc29XZWVrLCB7XG4gICAgICAgIHVuaXQ6ICd3ZWVrJ1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MoaXNvV2VlaywgdG9rZW4ubGVuZ3RoKTtcbiAgfSxcbiAgLy8gRGF5IG9mIHRoZSBtb250aFxuICBkOiBmdW5jdGlvbiBkKGRhdGUsIHRva2VuLCBsb2NhbGl6ZSkge1xuICAgIGlmICh0b2tlbiA9PT0gJ2RvJykge1xuICAgICAgcmV0dXJuIGxvY2FsaXplLm9yZGluYWxOdW1iZXIoZGF0ZS5nZXRVVENEYXRlKCksIHtcbiAgICAgICAgdW5pdDogJ2RhdGUnXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGxpZ2h0Rm9ybWF0dGVycy5kKGRhdGUsIHRva2VuKTtcbiAgfSxcbiAgLy8gRGF5IG9mIHllYXJcbiAgRDogZnVuY3Rpb24gRChkYXRlLCB0b2tlbiwgbG9jYWxpemUpIHtcbiAgICB2YXIgZGF5T2ZZZWFyID0gZ2V0VVRDRGF5T2ZZZWFyKGRhdGUpO1xuICAgIGlmICh0b2tlbiA9PT0gJ0RvJykge1xuICAgICAgcmV0dXJuIGxvY2FsaXplLm9yZGluYWxOdW1iZXIoZGF5T2ZZZWFyLCB7XG4gICAgICAgIHVuaXQ6ICdkYXlPZlllYXInXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyhkYXlPZlllYXIsIHRva2VuLmxlbmd0aCk7XG4gIH0sXG4gIC8vIERheSBvZiB3ZWVrXG4gIEU6IGZ1bmN0aW9uIEUoZGF0ZSwgdG9rZW4sIGxvY2FsaXplKSB7XG4gICAgdmFyIGRheU9mV2VlayA9IGRhdGUuZ2V0VVRDRGF5KCk7XG4gICAgc3dpdGNoICh0b2tlbikge1xuICAgICAgLy8gVHVlXG4gICAgICBjYXNlICdFJzpcbiAgICAgIGNhc2UgJ0VFJzpcbiAgICAgIGNhc2UgJ0VFRSc6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXkoZGF5T2ZXZWVrLCB7XG4gICAgICAgICAgd2lkdGg6ICdhYmJyZXZpYXRlZCcsXG4gICAgICAgICAgY29udGV4dDogJ2Zvcm1hdHRpbmcnXG4gICAgICAgIH0pO1xuICAgICAgLy8gVFxuICAgICAgY2FzZSAnRUVFRUUnOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5KGRheU9mV2Vlaywge1xuICAgICAgICAgIHdpZHRoOiAnbmFycm93JyxcbiAgICAgICAgICBjb250ZXh0OiAnZm9ybWF0dGluZydcbiAgICAgICAgfSk7XG4gICAgICAvLyBUdVxuICAgICAgY2FzZSAnRUVFRUVFJzpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheShkYXlPZldlZWssIHtcbiAgICAgICAgICB3aWR0aDogJ3Nob3J0JyxcbiAgICAgICAgICBjb250ZXh0OiAnZm9ybWF0dGluZydcbiAgICAgICAgfSk7XG4gICAgICAvLyBUdWVzZGF5XG4gICAgICBjYXNlICdFRUVFJzpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXkoZGF5T2ZXZWVrLCB7XG4gICAgICAgICAgd2lkdGg6ICd3aWRlJyxcbiAgICAgICAgICBjb250ZXh0OiAnZm9ybWF0dGluZydcbiAgICAgICAgfSk7XG4gICAgfVxuICB9LFxuICAvLyBMb2NhbCBkYXkgb2Ygd2Vla1xuICBlOiBmdW5jdGlvbiBlKGRhdGUsIHRva2VuLCBsb2NhbGl6ZSwgb3B0aW9ucykge1xuICAgIHZhciBkYXlPZldlZWsgPSBkYXRlLmdldFVUQ0RheSgpO1xuICAgIHZhciBsb2NhbERheU9mV2VlayA9IChkYXlPZldlZWsgLSBvcHRpb25zLndlZWtTdGFydHNPbiArIDgpICUgNyB8fCA3O1xuICAgIHN3aXRjaCAodG9rZW4pIHtcbiAgICAgIC8vIE51bWVyaWNhbCB2YWx1ZSAoTnRoIGRheSBvZiB3ZWVrIHdpdGggY3VycmVudCBsb2NhbGUgb3Igd2Vla1N0YXJ0c09uKVxuICAgICAgY2FzZSAnZSc6XG4gICAgICAgIHJldHVybiBTdHJpbmcobG9jYWxEYXlPZldlZWspO1xuICAgICAgLy8gUGFkZGVkIG51bWVyaWNhbCB2YWx1ZVxuICAgICAgY2FzZSAnZWUnOlxuICAgICAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKGxvY2FsRGF5T2ZXZWVrLCAyKTtcbiAgICAgIC8vIDFzdCwgMm5kLCAuLi4sIDd0aFxuICAgICAgY2FzZSAnZW8nOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUub3JkaW5hbE51bWJlcihsb2NhbERheU9mV2Vlaywge1xuICAgICAgICAgIHVuaXQ6ICdkYXknXG4gICAgICAgIH0pO1xuICAgICAgY2FzZSAnZWVlJzpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheShkYXlPZldlZWssIHtcbiAgICAgICAgICB3aWR0aDogJ2FiYnJldmlhdGVkJyxcbiAgICAgICAgICBjb250ZXh0OiAnZm9ybWF0dGluZydcbiAgICAgICAgfSk7XG4gICAgICAvLyBUXG4gICAgICBjYXNlICdlZWVlZSc6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXkoZGF5T2ZXZWVrLCB7XG4gICAgICAgICAgd2lkdGg6ICduYXJyb3cnLFxuICAgICAgICAgIGNvbnRleHQ6ICdmb3JtYXR0aW5nJ1xuICAgICAgICB9KTtcbiAgICAgIC8vIFR1XG4gICAgICBjYXNlICdlZWVlZWUnOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5KGRheU9mV2Vlaywge1xuICAgICAgICAgIHdpZHRoOiAnc2hvcnQnLFxuICAgICAgICAgIGNvbnRleHQ6ICdmb3JtYXR0aW5nJ1xuICAgICAgICB9KTtcbiAgICAgIC8vIFR1ZXNkYXlcbiAgICAgIGNhc2UgJ2VlZWUnOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheShkYXlPZldlZWssIHtcbiAgICAgICAgICB3aWR0aDogJ3dpZGUnLFxuICAgICAgICAgIGNvbnRleHQ6ICdmb3JtYXR0aW5nJ1xuICAgICAgICB9KTtcbiAgICB9XG4gIH0sXG4gIC8vIFN0YW5kLWFsb25lIGxvY2FsIGRheSBvZiB3ZWVrXG4gIGM6IGZ1bmN0aW9uIGMoZGF0ZSwgdG9rZW4sIGxvY2FsaXplLCBvcHRpb25zKSB7XG4gICAgdmFyIGRheU9mV2VlayA9IGRhdGUuZ2V0VVRDRGF5KCk7XG4gICAgdmFyIGxvY2FsRGF5T2ZXZWVrID0gKGRheU9mV2VlayAtIG9wdGlvbnMud2Vla1N0YXJ0c09uICsgOCkgJSA3IHx8IDc7XG4gICAgc3dpdGNoICh0b2tlbikge1xuICAgICAgLy8gTnVtZXJpY2FsIHZhbHVlIChzYW1lIGFzIGluIGBlYClcbiAgICAgIGNhc2UgJ2MnOlxuICAgICAgICByZXR1cm4gU3RyaW5nKGxvY2FsRGF5T2ZXZWVrKTtcbiAgICAgIC8vIFBhZGRlZCBudW1lcmljYWwgdmFsdWVcbiAgICAgIGNhc2UgJ2NjJzpcbiAgICAgICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyhsb2NhbERheU9mV2VlaywgdG9rZW4ubGVuZ3RoKTtcbiAgICAgIC8vIDFzdCwgMm5kLCAuLi4sIDd0aFxuICAgICAgY2FzZSAnY28nOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUub3JkaW5hbE51bWJlcihsb2NhbERheU9mV2Vlaywge1xuICAgICAgICAgIHVuaXQ6ICdkYXknXG4gICAgICAgIH0pO1xuICAgICAgY2FzZSAnY2NjJzpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheShkYXlPZldlZWssIHtcbiAgICAgICAgICB3aWR0aDogJ2FiYnJldmlhdGVkJyxcbiAgICAgICAgICBjb250ZXh0OiAnc3RhbmRhbG9uZSdcbiAgICAgICAgfSk7XG4gICAgICAvLyBUXG4gICAgICBjYXNlICdjY2NjYyc6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXkoZGF5T2ZXZWVrLCB7XG4gICAgICAgICAgd2lkdGg6ICduYXJyb3cnLFxuICAgICAgICAgIGNvbnRleHQ6ICdzdGFuZGFsb25lJ1xuICAgICAgICB9KTtcbiAgICAgIC8vIFR1XG4gICAgICBjYXNlICdjY2NjY2MnOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5KGRheU9mV2Vlaywge1xuICAgICAgICAgIHdpZHRoOiAnc2hvcnQnLFxuICAgICAgICAgIGNvbnRleHQ6ICdzdGFuZGFsb25lJ1xuICAgICAgICB9KTtcbiAgICAgIC8vIFR1ZXNkYXlcbiAgICAgIGNhc2UgJ2NjY2MnOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheShkYXlPZldlZWssIHtcbiAgICAgICAgICB3aWR0aDogJ3dpZGUnLFxuICAgICAgICAgIGNvbnRleHQ6ICdzdGFuZGFsb25lJ1xuICAgICAgICB9KTtcbiAgICB9XG4gIH0sXG4gIC8vIElTTyBkYXkgb2Ygd2Vla1xuICBpOiBmdW5jdGlvbiBpKGRhdGUsIHRva2VuLCBsb2NhbGl6ZSkge1xuICAgIHZhciBkYXlPZldlZWsgPSBkYXRlLmdldFVUQ0RheSgpO1xuICAgIHZhciBpc29EYXlPZldlZWsgPSBkYXlPZldlZWsgPT09IDAgPyA3IDogZGF5T2ZXZWVrO1xuICAgIHN3aXRjaCAodG9rZW4pIHtcbiAgICAgIC8vIDJcbiAgICAgIGNhc2UgJ2knOlxuICAgICAgICByZXR1cm4gU3RyaW5nKGlzb0RheU9mV2Vlayk7XG4gICAgICAvLyAwMlxuICAgICAgY2FzZSAnaWknOlxuICAgICAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKGlzb0RheU9mV2VlaywgdG9rZW4ubGVuZ3RoKTtcbiAgICAgIC8vIDJuZFxuICAgICAgY2FzZSAnaW8nOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUub3JkaW5hbE51bWJlcihpc29EYXlPZldlZWssIHtcbiAgICAgICAgICB1bml0OiAnZGF5J1xuICAgICAgICB9KTtcbiAgICAgIC8vIFR1ZVxuICAgICAgY2FzZSAnaWlpJzpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheShkYXlPZldlZWssIHtcbiAgICAgICAgICB3aWR0aDogJ2FiYnJldmlhdGVkJyxcbiAgICAgICAgICBjb250ZXh0OiAnZm9ybWF0dGluZydcbiAgICAgICAgfSk7XG4gICAgICAvLyBUXG4gICAgICBjYXNlICdpaWlpaSc6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXkoZGF5T2ZXZWVrLCB7XG4gICAgICAgICAgd2lkdGg6ICduYXJyb3cnLFxuICAgICAgICAgIGNvbnRleHQ6ICdmb3JtYXR0aW5nJ1xuICAgICAgICB9KTtcbiAgICAgIC8vIFR1XG4gICAgICBjYXNlICdpaWlpaWknOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5KGRheU9mV2Vlaywge1xuICAgICAgICAgIHdpZHRoOiAnc2hvcnQnLFxuICAgICAgICAgIGNvbnRleHQ6ICdmb3JtYXR0aW5nJ1xuICAgICAgICB9KTtcbiAgICAgIC8vIFR1ZXNkYXlcbiAgICAgIGNhc2UgJ2lpaWknOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheShkYXlPZldlZWssIHtcbiAgICAgICAgICB3aWR0aDogJ3dpZGUnLFxuICAgICAgICAgIGNvbnRleHQ6ICdmb3JtYXR0aW5nJ1xuICAgICAgICB9KTtcbiAgICB9XG4gIH0sXG4gIC8vIEFNIG9yIFBNXG4gIGE6IGZ1bmN0aW9uIGEoZGF0ZSwgdG9rZW4sIGxvY2FsaXplKSB7XG4gICAgdmFyIGhvdXJzID0gZGF0ZS5nZXRVVENIb3VycygpO1xuICAgIHZhciBkYXlQZXJpb2RFbnVtVmFsdWUgPSBob3VycyAvIDEyID49IDEgPyAncG0nIDogJ2FtJztcbiAgICBzd2l0Y2ggKHRva2VuKSB7XG4gICAgICBjYXNlICdhJzpcbiAgICAgIGNhc2UgJ2FhJzpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheVBlcmlvZChkYXlQZXJpb2RFbnVtVmFsdWUsIHtcbiAgICAgICAgICB3aWR0aDogJ2FiYnJldmlhdGVkJyxcbiAgICAgICAgICBjb250ZXh0OiAnZm9ybWF0dGluZydcbiAgICAgICAgfSk7XG4gICAgICBjYXNlICdhYWEnOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5UGVyaW9kKGRheVBlcmlvZEVudW1WYWx1ZSwge1xuICAgICAgICAgIHdpZHRoOiAnYWJicmV2aWF0ZWQnLFxuICAgICAgICAgIGNvbnRleHQ6ICdmb3JtYXR0aW5nJ1xuICAgICAgICB9KS50b0xvd2VyQ2FzZSgpO1xuICAgICAgY2FzZSAnYWFhYWEnOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5UGVyaW9kKGRheVBlcmlvZEVudW1WYWx1ZSwge1xuICAgICAgICAgIHdpZHRoOiAnbmFycm93JyxcbiAgICAgICAgICBjb250ZXh0OiAnZm9ybWF0dGluZydcbiAgICAgICAgfSk7XG4gICAgICBjYXNlICdhYWFhJzpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXlQZXJpb2QoZGF5UGVyaW9kRW51bVZhbHVlLCB7XG4gICAgICAgICAgd2lkdGg6ICd3aWRlJyxcbiAgICAgICAgICBjb250ZXh0OiAnZm9ybWF0dGluZydcbiAgICAgICAgfSk7XG4gICAgfVxuICB9LFxuICAvLyBBTSwgUE0sIG1pZG5pZ2h0LCBub29uXG4gIGI6IGZ1bmN0aW9uIGIoZGF0ZSwgdG9rZW4sIGxvY2FsaXplKSB7XG4gICAgdmFyIGhvdXJzID0gZGF0ZS5nZXRVVENIb3VycygpO1xuICAgIHZhciBkYXlQZXJpb2RFbnVtVmFsdWU7XG4gICAgaWYgKGhvdXJzID09PSAxMikge1xuICAgICAgZGF5UGVyaW9kRW51bVZhbHVlID0gZGF5UGVyaW9kRW51bS5ub29uO1xuICAgIH0gZWxzZSBpZiAoaG91cnMgPT09IDApIHtcbiAgICAgIGRheVBlcmlvZEVudW1WYWx1ZSA9IGRheVBlcmlvZEVudW0ubWlkbmlnaHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRheVBlcmlvZEVudW1WYWx1ZSA9IGhvdXJzIC8gMTIgPj0gMSA/ICdwbScgOiAnYW0nO1xuICAgIH1cbiAgICBzd2l0Y2ggKHRva2VuKSB7XG4gICAgICBjYXNlICdiJzpcbiAgICAgIGNhc2UgJ2JiJzpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheVBlcmlvZChkYXlQZXJpb2RFbnVtVmFsdWUsIHtcbiAgICAgICAgICB3aWR0aDogJ2FiYnJldmlhdGVkJyxcbiAgICAgICAgICBjb250ZXh0OiAnZm9ybWF0dGluZydcbiAgICAgICAgfSk7XG4gICAgICBjYXNlICdiYmInOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5UGVyaW9kKGRheVBlcmlvZEVudW1WYWx1ZSwge1xuICAgICAgICAgIHdpZHRoOiAnYWJicmV2aWF0ZWQnLFxuICAgICAgICAgIGNvbnRleHQ6ICdmb3JtYXR0aW5nJ1xuICAgICAgICB9KS50b0xvd2VyQ2FzZSgpO1xuICAgICAgY2FzZSAnYmJiYmInOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5UGVyaW9kKGRheVBlcmlvZEVudW1WYWx1ZSwge1xuICAgICAgICAgIHdpZHRoOiAnbmFycm93JyxcbiAgICAgICAgICBjb250ZXh0OiAnZm9ybWF0dGluZydcbiAgICAgICAgfSk7XG4gICAgICBjYXNlICdiYmJiJzpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXlQZXJpb2QoZGF5UGVyaW9kRW51bVZhbHVlLCB7XG4gICAgICAgICAgd2lkdGg6ICd3aWRlJyxcbiAgICAgICAgICBjb250ZXh0OiAnZm9ybWF0dGluZydcbiAgICAgICAgfSk7XG4gICAgfVxuICB9LFxuICAvLyBpbiB0aGUgbW9ybmluZywgaW4gdGhlIGFmdGVybm9vbiwgaW4gdGhlIGV2ZW5pbmcsIGF0IG5pZ2h0XG4gIEI6IGZ1bmN0aW9uIEIoZGF0ZSwgdG9rZW4sIGxvY2FsaXplKSB7XG4gICAgdmFyIGhvdXJzID0gZGF0ZS5nZXRVVENIb3VycygpO1xuICAgIHZhciBkYXlQZXJpb2RFbnVtVmFsdWU7XG4gICAgaWYgKGhvdXJzID49IDE3KSB7XG4gICAgICBkYXlQZXJpb2RFbnVtVmFsdWUgPSBkYXlQZXJpb2RFbnVtLmV2ZW5pbmc7XG4gICAgfSBlbHNlIGlmIChob3VycyA+PSAxMikge1xuICAgICAgZGF5UGVyaW9kRW51bVZhbHVlID0gZGF5UGVyaW9kRW51bS5hZnRlcm5vb247XG4gICAgfSBlbHNlIGlmIChob3VycyA+PSA0KSB7XG4gICAgICBkYXlQZXJpb2RFbnVtVmFsdWUgPSBkYXlQZXJpb2RFbnVtLm1vcm5pbmc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRheVBlcmlvZEVudW1WYWx1ZSA9IGRheVBlcmlvZEVudW0ubmlnaHQ7XG4gICAgfVxuICAgIHN3aXRjaCAodG9rZW4pIHtcbiAgICAgIGNhc2UgJ0InOlxuICAgICAgY2FzZSAnQkInOlxuICAgICAgY2FzZSAnQkJCJzpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheVBlcmlvZChkYXlQZXJpb2RFbnVtVmFsdWUsIHtcbiAgICAgICAgICB3aWR0aDogJ2FiYnJldmlhdGVkJyxcbiAgICAgICAgICBjb250ZXh0OiAnZm9ybWF0dGluZydcbiAgICAgICAgfSk7XG4gICAgICBjYXNlICdCQkJCQic6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXlQZXJpb2QoZGF5UGVyaW9kRW51bVZhbHVlLCB7XG4gICAgICAgICAgd2lkdGg6ICduYXJyb3cnLFxuICAgICAgICAgIGNvbnRleHQ6ICdmb3JtYXR0aW5nJ1xuICAgICAgICB9KTtcbiAgICAgIGNhc2UgJ0JCQkInOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheVBlcmlvZChkYXlQZXJpb2RFbnVtVmFsdWUsIHtcbiAgICAgICAgICB3aWR0aDogJ3dpZGUnLFxuICAgICAgICAgIGNvbnRleHQ6ICdmb3JtYXR0aW5nJ1xuICAgICAgICB9KTtcbiAgICB9XG4gIH0sXG4gIC8vIEhvdXIgWzEtMTJdXG4gIGg6IGZ1bmN0aW9uIGgoZGF0ZSwgdG9rZW4sIGxvY2FsaXplKSB7XG4gICAgaWYgKHRva2VuID09PSAnaG8nKSB7XG4gICAgICB2YXIgaG91cnMgPSBkYXRlLmdldFVUQ0hvdXJzKCkgJSAxMjtcbiAgICAgIGlmIChob3VycyA9PT0gMCkgaG91cnMgPSAxMjtcbiAgICAgIHJldHVybiBsb2NhbGl6ZS5vcmRpbmFsTnVtYmVyKGhvdXJzLCB7XG4gICAgICAgIHVuaXQ6ICdob3VyJ1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBsaWdodEZvcm1hdHRlcnMuaChkYXRlLCB0b2tlbik7XG4gIH0sXG4gIC8vIEhvdXIgWzAtMjNdXG4gIEg6IGZ1bmN0aW9uIEgoZGF0ZSwgdG9rZW4sIGxvY2FsaXplKSB7XG4gICAgaWYgKHRva2VuID09PSAnSG8nKSB7XG4gICAgICByZXR1cm4gbG9jYWxpemUub3JkaW5hbE51bWJlcihkYXRlLmdldFVUQ0hvdXJzKCksIHtcbiAgICAgICAgdW5pdDogJ2hvdXInXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGxpZ2h0Rm9ybWF0dGVycy5IKGRhdGUsIHRva2VuKTtcbiAgfSxcbiAgLy8gSG91ciBbMC0xMV1cbiAgSzogZnVuY3Rpb24gSyhkYXRlLCB0b2tlbiwgbG9jYWxpemUpIHtcbiAgICB2YXIgaG91cnMgPSBkYXRlLmdldFVUQ0hvdXJzKCkgJSAxMjtcbiAgICBpZiAodG9rZW4gPT09ICdLbycpIHtcbiAgICAgIHJldHVybiBsb2NhbGl6ZS5vcmRpbmFsTnVtYmVyKGhvdXJzLCB7XG4gICAgICAgIHVuaXQ6ICdob3VyJ1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MoaG91cnMsIHRva2VuLmxlbmd0aCk7XG4gIH0sXG4gIC8vIEhvdXIgWzEtMjRdXG4gIGs6IGZ1bmN0aW9uIGsoZGF0ZSwgdG9rZW4sIGxvY2FsaXplKSB7XG4gICAgdmFyIGhvdXJzID0gZGF0ZS5nZXRVVENIb3VycygpO1xuICAgIGlmIChob3VycyA9PT0gMCkgaG91cnMgPSAyNDtcbiAgICBpZiAodG9rZW4gPT09ICdrbycpIHtcbiAgICAgIHJldHVybiBsb2NhbGl6ZS5vcmRpbmFsTnVtYmVyKGhvdXJzLCB7XG4gICAgICAgIHVuaXQ6ICdob3VyJ1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MoaG91cnMsIHRva2VuLmxlbmd0aCk7XG4gIH0sXG4gIC8vIE1pbnV0ZVxuICBtOiBmdW5jdGlvbiBtKGRhdGUsIHRva2VuLCBsb2NhbGl6ZSkge1xuICAgIGlmICh0b2tlbiA9PT0gJ21vJykge1xuICAgICAgcmV0dXJuIGxvY2FsaXplLm9yZGluYWxOdW1iZXIoZGF0ZS5nZXRVVENNaW51dGVzKCksIHtcbiAgICAgICAgdW5pdDogJ21pbnV0ZSdcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gbGlnaHRGb3JtYXR0ZXJzLm0oZGF0ZSwgdG9rZW4pO1xuICB9LFxuICAvLyBTZWNvbmRcbiAgczogZnVuY3Rpb24gcyhkYXRlLCB0b2tlbiwgbG9jYWxpemUpIHtcbiAgICBpZiAodG9rZW4gPT09ICdzbycpIHtcbiAgICAgIHJldHVybiBsb2NhbGl6ZS5vcmRpbmFsTnVtYmVyKGRhdGUuZ2V0VVRDU2Vjb25kcygpLCB7XG4gICAgICAgIHVuaXQ6ICdzZWNvbmQnXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGxpZ2h0Rm9ybWF0dGVycy5zKGRhdGUsIHRva2VuKTtcbiAgfSxcbiAgLy8gRnJhY3Rpb24gb2Ygc2Vjb25kXG4gIFM6IGZ1bmN0aW9uIFMoZGF0ZSwgdG9rZW4pIHtcbiAgICByZXR1cm4gbGlnaHRGb3JtYXR0ZXJzLlMoZGF0ZSwgdG9rZW4pO1xuICB9LFxuICAvLyBUaW1lem9uZSAoSVNPLTg2MDEuIElmIG9mZnNldCBpcyAwLCBvdXRwdXQgaXMgYWx3YXlzIGAnWidgKVxuICBYOiBmdW5jdGlvbiBYKGRhdGUsIHRva2VuLCBfbG9jYWxpemUsIG9wdGlvbnMpIHtcbiAgICB2YXIgb3JpZ2luYWxEYXRlID0gb3B0aW9ucy5fb3JpZ2luYWxEYXRlIHx8IGRhdGU7XG4gICAgdmFyIHRpbWV6b25lT2Zmc2V0ID0gb3JpZ2luYWxEYXRlLmdldFRpbWV6b25lT2Zmc2V0KCk7XG4gICAgaWYgKHRpbWV6b25lT2Zmc2V0ID09PSAwKSB7XG4gICAgICByZXR1cm4gJ1onO1xuICAgIH1cbiAgICBzd2l0Y2ggKHRva2VuKSB7XG4gICAgICAvLyBIb3VycyBhbmQgb3B0aW9uYWwgbWludXRlc1xuICAgICAgY2FzZSAnWCc6XG4gICAgICAgIHJldHVybiBmb3JtYXRUaW1lem9uZVdpdGhPcHRpb25hbE1pbnV0ZXModGltZXpvbmVPZmZzZXQpO1xuXG4gICAgICAvLyBIb3VycywgbWludXRlcyBhbmQgb3B0aW9uYWwgc2Vjb25kcyB3aXRob3V0IGA6YCBkZWxpbWl0ZXJcbiAgICAgIC8vIE5vdGU6IG5laXRoZXIgSVNPLTg2MDEgbm9yIEphdmFTY3JpcHQgc3VwcG9ydHMgc2Vjb25kcyBpbiB0aW1lem9uZSBvZmZzZXRzXG4gICAgICAvLyBzbyB0aGlzIHRva2VuIGFsd2F5cyBoYXMgdGhlIHNhbWUgb3V0cHV0IGFzIGBYWGBcbiAgICAgIGNhc2UgJ1hYWFgnOlxuICAgICAgY2FzZSAnWFgnOlxuICAgICAgICAvLyBIb3VycyBhbmQgbWludXRlcyB3aXRob3V0IGA6YCBkZWxpbWl0ZXJcbiAgICAgICAgcmV0dXJuIGZvcm1hdFRpbWV6b25lKHRpbWV6b25lT2Zmc2V0KTtcblxuICAgICAgLy8gSG91cnMsIG1pbnV0ZXMgYW5kIG9wdGlvbmFsIHNlY29uZHMgd2l0aCBgOmAgZGVsaW1pdGVyXG4gICAgICAvLyBOb3RlOiBuZWl0aGVyIElTTy04NjAxIG5vciBKYXZhU2NyaXB0IHN1cHBvcnRzIHNlY29uZHMgaW4gdGltZXpvbmUgb2Zmc2V0c1xuICAgICAgLy8gc28gdGhpcyB0b2tlbiBhbHdheXMgaGFzIHRoZSBzYW1lIG91dHB1dCBhcyBgWFhYYFxuICAgICAgY2FzZSAnWFhYWFgnOlxuICAgICAgY2FzZSAnWFhYJzogLy8gSG91cnMgYW5kIG1pbnV0ZXMgd2l0aCBgOmAgZGVsaW1pdGVyXG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gZm9ybWF0VGltZXpvbmUodGltZXpvbmVPZmZzZXQsICc6Jyk7XG4gICAgfVxuICB9LFxuICAvLyBUaW1lem9uZSAoSVNPLTg2MDEuIElmIG9mZnNldCBpcyAwLCBvdXRwdXQgaXMgYCcrMDA6MDAnYCBvciBlcXVpdmFsZW50KVxuICB4OiBmdW5jdGlvbiB4KGRhdGUsIHRva2VuLCBfbG9jYWxpemUsIG9wdGlvbnMpIHtcbiAgICB2YXIgb3JpZ2luYWxEYXRlID0gb3B0aW9ucy5fb3JpZ2luYWxEYXRlIHx8IGRhdGU7XG4gICAgdmFyIHRpbWV6b25lT2Zmc2V0ID0gb3JpZ2luYWxEYXRlLmdldFRpbWV6b25lT2Zmc2V0KCk7XG4gICAgc3dpdGNoICh0b2tlbikge1xuICAgICAgLy8gSG91cnMgYW5kIG9wdGlvbmFsIG1pbnV0ZXNcbiAgICAgIGNhc2UgJ3gnOlxuICAgICAgICByZXR1cm4gZm9ybWF0VGltZXpvbmVXaXRoT3B0aW9uYWxNaW51dGVzKHRpbWV6b25lT2Zmc2V0KTtcblxuICAgICAgLy8gSG91cnMsIG1pbnV0ZXMgYW5kIG9wdGlvbmFsIHNlY29uZHMgd2l0aG91dCBgOmAgZGVsaW1pdGVyXG4gICAgICAvLyBOb3RlOiBuZWl0aGVyIElTTy04NjAxIG5vciBKYXZhU2NyaXB0IHN1cHBvcnRzIHNlY29uZHMgaW4gdGltZXpvbmUgb2Zmc2V0c1xuICAgICAgLy8gc28gdGhpcyB0b2tlbiBhbHdheXMgaGFzIHRoZSBzYW1lIG91dHB1dCBhcyBgeHhgXG4gICAgICBjYXNlICd4eHh4JzpcbiAgICAgIGNhc2UgJ3h4JzpcbiAgICAgICAgLy8gSG91cnMgYW5kIG1pbnV0ZXMgd2l0aG91dCBgOmAgZGVsaW1pdGVyXG4gICAgICAgIHJldHVybiBmb3JtYXRUaW1lem9uZSh0aW1lem9uZU9mZnNldCk7XG5cbiAgICAgIC8vIEhvdXJzLCBtaW51dGVzIGFuZCBvcHRpb25hbCBzZWNvbmRzIHdpdGggYDpgIGRlbGltaXRlclxuICAgICAgLy8gTm90ZTogbmVpdGhlciBJU08tODYwMSBub3IgSmF2YVNjcmlwdCBzdXBwb3J0cyBzZWNvbmRzIGluIHRpbWV6b25lIG9mZnNldHNcbiAgICAgIC8vIHNvIHRoaXMgdG9rZW4gYWx3YXlzIGhhcyB0aGUgc2FtZSBvdXRwdXQgYXMgYHh4eGBcbiAgICAgIGNhc2UgJ3h4eHh4JzpcbiAgICAgIGNhc2UgJ3h4eCc6IC8vIEhvdXJzIGFuZCBtaW51dGVzIHdpdGggYDpgIGRlbGltaXRlclxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGZvcm1hdFRpbWV6b25lKHRpbWV6b25lT2Zmc2V0LCAnOicpO1xuICAgIH1cbiAgfSxcbiAgLy8gVGltZXpvbmUgKEdNVClcbiAgTzogZnVuY3Rpb24gTyhkYXRlLCB0b2tlbiwgX2xvY2FsaXplLCBvcHRpb25zKSB7XG4gICAgdmFyIG9yaWdpbmFsRGF0ZSA9IG9wdGlvbnMuX29yaWdpbmFsRGF0ZSB8fCBkYXRlO1xuICAgIHZhciB0aW1lem9uZU9mZnNldCA9IG9yaWdpbmFsRGF0ZS5nZXRUaW1lem9uZU9mZnNldCgpO1xuICAgIHN3aXRjaCAodG9rZW4pIHtcbiAgICAgIC8vIFNob3J0XG4gICAgICBjYXNlICdPJzpcbiAgICAgIGNhc2UgJ09PJzpcbiAgICAgIGNhc2UgJ09PTyc6XG4gICAgICAgIHJldHVybiAnR01UJyArIGZvcm1hdFRpbWV6b25lU2hvcnQodGltZXpvbmVPZmZzZXQsICc6Jyk7XG4gICAgICAvLyBMb25nXG4gICAgICBjYXNlICdPT09PJzpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiAnR01UJyArIGZvcm1hdFRpbWV6b25lKHRpbWV6b25lT2Zmc2V0LCAnOicpO1xuICAgIH1cbiAgfSxcbiAgLy8gVGltZXpvbmUgKHNwZWNpZmljIG5vbi1sb2NhdGlvbilcbiAgejogZnVuY3Rpb24geihkYXRlLCB0b2tlbiwgX2xvY2FsaXplLCBvcHRpb25zKSB7XG4gICAgdmFyIG9yaWdpbmFsRGF0ZSA9IG9wdGlvbnMuX29yaWdpbmFsRGF0ZSB8fCBkYXRlO1xuICAgIHZhciB0aW1lem9uZU9mZnNldCA9IG9yaWdpbmFsRGF0ZS5nZXRUaW1lem9uZU9mZnNldCgpO1xuICAgIHN3aXRjaCAodG9rZW4pIHtcbiAgICAgIC8vIFNob3J0XG4gICAgICBjYXNlICd6JzpcbiAgICAgIGNhc2UgJ3p6JzpcbiAgICAgIGNhc2UgJ3p6eic6XG4gICAgICAgIHJldHVybiAnR01UJyArIGZvcm1hdFRpbWV6b25lU2hvcnQodGltZXpvbmVPZmZzZXQsICc6Jyk7XG4gICAgICAvLyBMb25nXG4gICAgICBjYXNlICd6enp6JzpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiAnR01UJyArIGZvcm1hdFRpbWV6b25lKHRpbWV6b25lT2Zmc2V0LCAnOicpO1xuICAgIH1cbiAgfSxcbiAgLy8gU2Vjb25kcyB0aW1lc3RhbXBcbiAgdDogZnVuY3Rpb24gdChkYXRlLCB0b2tlbiwgX2xvY2FsaXplLCBvcHRpb25zKSB7XG4gICAgdmFyIG9yaWdpbmFsRGF0ZSA9IG9wdGlvbnMuX29yaWdpbmFsRGF0ZSB8fCBkYXRlO1xuICAgIHZhciB0aW1lc3RhbXAgPSBNYXRoLmZsb29yKG9yaWdpbmFsRGF0ZS5nZXRUaW1lKCkgLyAxMDAwKTtcbiAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKHRpbWVzdGFtcCwgdG9rZW4ubGVuZ3RoKTtcbiAgfSxcbiAgLy8gTWlsbGlzZWNvbmRzIHRpbWVzdGFtcFxuICBUOiBmdW5jdGlvbiBUKGRhdGUsIHRva2VuLCBfbG9jYWxpemUsIG9wdGlvbnMpIHtcbiAgICB2YXIgb3JpZ2luYWxEYXRlID0gb3B0aW9ucy5fb3JpZ2luYWxEYXRlIHx8IGRhdGU7XG4gICAgdmFyIHRpbWVzdGFtcCA9IG9yaWdpbmFsRGF0ZS5nZXRUaW1lKCk7XG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyh0aW1lc3RhbXAsIHRva2VuLmxlbmd0aCk7XG4gIH1cbn07XG5mdW5jdGlvbiBmb3JtYXRUaW1lem9uZVNob3J0KG9mZnNldCwgZGlydHlEZWxpbWl0ZXIpIHtcbiAgdmFyIHNpZ24gPSBvZmZzZXQgPiAwID8gJy0nIDogJysnO1xuICB2YXIgYWJzT2Zmc2V0ID0gTWF0aC5hYnMob2Zmc2V0KTtcbiAgdmFyIGhvdXJzID0gTWF0aC5mbG9vcihhYnNPZmZzZXQgLyA2MCk7XG4gIHZhciBtaW51dGVzID0gYWJzT2Zmc2V0ICUgNjA7XG4gIGlmIChtaW51dGVzID09PSAwKSB7XG4gICAgcmV0dXJuIHNpZ24gKyBTdHJpbmcoaG91cnMpO1xuICB9XG4gIHZhciBkZWxpbWl0ZXIgPSBkaXJ0eURlbGltaXRlciB8fCAnJztcbiAgcmV0dXJuIHNpZ24gKyBTdHJpbmcoaG91cnMpICsgZGVsaW1pdGVyICsgYWRkTGVhZGluZ1plcm9zKG1pbnV0ZXMsIDIpO1xufVxuZnVuY3Rpb24gZm9ybWF0VGltZXpvbmVXaXRoT3B0aW9uYWxNaW51dGVzKG9mZnNldCwgZGlydHlEZWxpbWl0ZXIpIHtcbiAgaWYgKG9mZnNldCAlIDYwID09PSAwKSB7XG4gICAgdmFyIHNpZ24gPSBvZmZzZXQgPiAwID8gJy0nIDogJysnO1xuICAgIHJldHVybiBzaWduICsgYWRkTGVhZGluZ1plcm9zKE1hdGguYWJzKG9mZnNldCkgLyA2MCwgMik7XG4gIH1cbiAgcmV0dXJuIGZvcm1hdFRpbWV6b25lKG9mZnNldCwgZGlydHlEZWxpbWl0ZXIpO1xufVxuZnVuY3Rpb24gZm9ybWF0VGltZXpvbmUob2Zmc2V0LCBkaXJ0eURlbGltaXRlcikge1xuICB2YXIgZGVsaW1pdGVyID0gZGlydHlEZWxpbWl0ZXIgfHwgJyc7XG4gIHZhciBzaWduID0gb2Zmc2V0ID4gMCA/ICctJyA6ICcrJztcbiAgdmFyIGFic09mZnNldCA9IE1hdGguYWJzKG9mZnNldCk7XG4gIHZhciBob3VycyA9IGFkZExlYWRpbmdaZXJvcyhNYXRoLmZsb29yKGFic09mZnNldCAvIDYwKSwgMik7XG4gIHZhciBtaW51dGVzID0gYWRkTGVhZGluZ1plcm9zKGFic09mZnNldCAlIDYwLCAyKTtcbiAgcmV0dXJuIHNpZ24gKyBob3VycyArIGRlbGltaXRlciArIG1pbnV0ZXM7XG59XG5leHBvcnQgZGVmYXVsdCBmb3JtYXR0ZXJzOyIsImltcG9ydCBhZGRMZWFkaW5nWmVyb3MgZnJvbSBcIi4uLy4uL2FkZExlYWRpbmdaZXJvcy9pbmRleC5qc1wiO1xuLypcbiAqIHwgICAgIHwgVW5pdCAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgIHwgVW5pdCAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwtLS0tLXwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLXwtLS0tLXwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLXxcbiAqIHwgIGEgIHwgQU0sIFBNICAgICAgICAgICAgICAgICAgICAgICAgIHwgIEEqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgIGQgIHwgRGF5IG9mIG1vbnRoICAgICAgICAgICAgICAgICAgIHwgIEQgIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgIGggIHwgSG91ciBbMS0xMl0gICAgICAgICAgICAgICAgICAgIHwgIEggIHwgSG91ciBbMC0yM10gICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgIG0gIHwgTWludXRlICAgICAgICAgICAgICAgICAgICAgICAgIHwgIE0gIHwgTW9udGggICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgIHMgIHwgU2Vjb25kICAgICAgICAgICAgICAgICAgICAgICAgIHwgIFMgIHwgRnJhY3Rpb24gb2Ygc2Vjb25kICAgICAgICAgICAgIHxcbiAqIHwgIHkgIHwgWWVhciAoYWJzKSAgICAgICAgICAgICAgICAgICAgIHwgIFkgIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqXG4gKiBMZXR0ZXJzIG1hcmtlZCBieSAqIGFyZSBub3QgaW1wbGVtZW50ZWQgYnV0IHJlc2VydmVkIGJ5IFVuaWNvZGUgc3RhbmRhcmQuXG4gKi9cbnZhciBmb3JtYXR0ZXJzID0ge1xuICAvLyBZZWFyXG4gIHk6IGZ1bmN0aW9uIHkoZGF0ZSwgdG9rZW4pIHtcbiAgICAvLyBGcm9tIGh0dHA6Ly93d3cudW5pY29kZS5vcmcvcmVwb3J0cy90cjM1L3RyMzUtMzEvdHIzNS1kYXRlcy5odG1sI0RhdGVfRm9ybWF0X3Rva2Vuc1xuICAgIC8vIHwgWWVhciAgICAgfCAgICAgeSB8IHl5IHwgICB5eXkgfCAgeXl5eSB8IHl5eXl5IHxcbiAgICAvLyB8LS0tLS0tLS0tLXwtLS0tLS0tfC0tLS18LS0tLS0tLXwtLS0tLS0tfC0tLS0tLS18XG4gICAgLy8gfCBBRCAxICAgICB8ICAgICAxIHwgMDEgfCAgIDAwMSB8ICAwMDAxIHwgMDAwMDEgfFxuICAgIC8vIHwgQUQgMTIgICAgfCAgICAxMiB8IDEyIHwgICAwMTIgfCAgMDAxMiB8IDAwMDEyIHxcbiAgICAvLyB8IEFEIDEyMyAgIHwgICAxMjMgfCAyMyB8ICAgMTIzIHwgIDAxMjMgfCAwMDEyMyB8XG4gICAgLy8gfCBBRCAxMjM0ICB8ICAxMjM0IHwgMzQgfCAgMTIzNCB8ICAxMjM0IHwgMDEyMzQgfFxuICAgIC8vIHwgQUQgMTIzNDUgfCAxMjM0NSB8IDQ1IHwgMTIzNDUgfCAxMjM0NSB8IDEyMzQ1IHxcblxuICAgIHZhciBzaWduZWRZZWFyID0gZGF0ZS5nZXRVVENGdWxsWWVhcigpO1xuICAgIC8vIFJldHVybnMgMSBmb3IgMSBCQyAod2hpY2ggaXMgeWVhciAwIGluIEphdmFTY3JpcHQpXG4gICAgdmFyIHllYXIgPSBzaWduZWRZZWFyID4gMCA/IHNpZ25lZFllYXIgOiAxIC0gc2lnbmVkWWVhcjtcbiAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKHRva2VuID09PSAneXknID8geWVhciAlIDEwMCA6IHllYXIsIHRva2VuLmxlbmd0aCk7XG4gIH0sXG4gIC8vIE1vbnRoXG4gIE06IGZ1bmN0aW9uIE0oZGF0ZSwgdG9rZW4pIHtcbiAgICB2YXIgbW9udGggPSBkYXRlLmdldFVUQ01vbnRoKCk7XG4gICAgcmV0dXJuIHRva2VuID09PSAnTScgPyBTdHJpbmcobW9udGggKyAxKSA6IGFkZExlYWRpbmdaZXJvcyhtb250aCArIDEsIDIpO1xuICB9LFxuICAvLyBEYXkgb2YgdGhlIG1vbnRoXG4gIGQ6IGZ1bmN0aW9uIGQoZGF0ZSwgdG9rZW4pIHtcbiAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKGRhdGUuZ2V0VVRDRGF0ZSgpLCB0b2tlbi5sZW5ndGgpO1xuICB9LFxuICAvLyBBTSBvciBQTVxuICBhOiBmdW5jdGlvbiBhKGRhdGUsIHRva2VuKSB7XG4gICAgdmFyIGRheVBlcmlvZEVudW1WYWx1ZSA9IGRhdGUuZ2V0VVRDSG91cnMoKSAvIDEyID49IDEgPyAncG0nIDogJ2FtJztcbiAgICBzd2l0Y2ggKHRva2VuKSB7XG4gICAgICBjYXNlICdhJzpcbiAgICAgIGNhc2UgJ2FhJzpcbiAgICAgICAgcmV0dXJuIGRheVBlcmlvZEVudW1WYWx1ZS50b1VwcGVyQ2FzZSgpO1xuICAgICAgY2FzZSAnYWFhJzpcbiAgICAgICAgcmV0dXJuIGRheVBlcmlvZEVudW1WYWx1ZTtcbiAgICAgIGNhc2UgJ2FhYWFhJzpcbiAgICAgICAgcmV0dXJuIGRheVBlcmlvZEVudW1WYWx1ZVswXTtcbiAgICAgIGNhc2UgJ2FhYWEnOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGRheVBlcmlvZEVudW1WYWx1ZSA9PT0gJ2FtJyA/ICdhLm0uJyA6ICdwLm0uJztcbiAgICB9XG4gIH0sXG4gIC8vIEhvdXIgWzEtMTJdXG4gIGg6IGZ1bmN0aW9uIGgoZGF0ZSwgdG9rZW4pIHtcbiAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKGRhdGUuZ2V0VVRDSG91cnMoKSAlIDEyIHx8IDEyLCB0b2tlbi5sZW5ndGgpO1xuICB9LFxuICAvLyBIb3VyIFswLTIzXVxuICBIOiBmdW5jdGlvbiBIKGRhdGUsIHRva2VuKSB7XG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyhkYXRlLmdldFVUQ0hvdXJzKCksIHRva2VuLmxlbmd0aCk7XG4gIH0sXG4gIC8vIE1pbnV0ZVxuICBtOiBmdW5jdGlvbiBtKGRhdGUsIHRva2VuKSB7XG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyhkYXRlLmdldFVUQ01pbnV0ZXMoKSwgdG9rZW4ubGVuZ3RoKTtcbiAgfSxcbiAgLy8gU2Vjb25kXG4gIHM6IGZ1bmN0aW9uIHMoZGF0ZSwgdG9rZW4pIHtcbiAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKGRhdGUuZ2V0VVRDU2Vjb25kcygpLCB0b2tlbi5sZW5ndGgpO1xuICB9LFxuICAvLyBGcmFjdGlvbiBvZiBzZWNvbmRcbiAgUzogZnVuY3Rpb24gUyhkYXRlLCB0b2tlbikge1xuICAgIHZhciBudW1iZXJPZkRpZ2l0cyA9IHRva2VuLmxlbmd0aDtcbiAgICB2YXIgbWlsbGlzZWNvbmRzID0gZGF0ZS5nZXRVVENNaWxsaXNlY29uZHMoKTtcbiAgICB2YXIgZnJhY3Rpb25hbFNlY29uZHMgPSBNYXRoLmZsb29yKG1pbGxpc2Vjb25kcyAqIE1hdGgucG93KDEwLCBudW1iZXJPZkRpZ2l0cyAtIDMpKTtcbiAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKGZyYWN0aW9uYWxTZWNvbmRzLCB0b2tlbi5sZW5ndGgpO1xuICB9XG59O1xuZXhwb3J0IGRlZmF1bHQgZm9ybWF0dGVyczsiLCJ2YXIgZGF0ZUxvbmdGb3JtYXR0ZXIgPSBmdW5jdGlvbiBkYXRlTG9uZ0Zvcm1hdHRlcihwYXR0ZXJuLCBmb3JtYXRMb25nKSB7XG4gIHN3aXRjaCAocGF0dGVybikge1xuICAgIGNhc2UgJ1AnOlxuICAgICAgcmV0dXJuIGZvcm1hdExvbmcuZGF0ZSh7XG4gICAgICAgIHdpZHRoOiAnc2hvcnQnXG4gICAgICB9KTtcbiAgICBjYXNlICdQUCc6XG4gICAgICByZXR1cm4gZm9ybWF0TG9uZy5kYXRlKHtcbiAgICAgICAgd2lkdGg6ICdtZWRpdW0nXG4gICAgICB9KTtcbiAgICBjYXNlICdQUFAnOlxuICAgICAgcmV0dXJuIGZvcm1hdExvbmcuZGF0ZSh7XG4gICAgICAgIHdpZHRoOiAnbG9uZydcbiAgICAgIH0pO1xuICAgIGNhc2UgJ1BQUFAnOlxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZm9ybWF0TG9uZy5kYXRlKHtcbiAgICAgICAgd2lkdGg6ICdmdWxsJ1xuICAgICAgfSk7XG4gIH1cbn07XG52YXIgdGltZUxvbmdGb3JtYXR0ZXIgPSBmdW5jdGlvbiB0aW1lTG9uZ0Zvcm1hdHRlcihwYXR0ZXJuLCBmb3JtYXRMb25nKSB7XG4gIHN3aXRjaCAocGF0dGVybikge1xuICAgIGNhc2UgJ3AnOlxuICAgICAgcmV0dXJuIGZvcm1hdExvbmcudGltZSh7XG4gICAgICAgIHdpZHRoOiAnc2hvcnQnXG4gICAgICB9KTtcbiAgICBjYXNlICdwcCc6XG4gICAgICByZXR1cm4gZm9ybWF0TG9uZy50aW1lKHtcbiAgICAgICAgd2lkdGg6ICdtZWRpdW0nXG4gICAgICB9KTtcbiAgICBjYXNlICdwcHAnOlxuICAgICAgcmV0dXJuIGZvcm1hdExvbmcudGltZSh7XG4gICAgICAgIHdpZHRoOiAnbG9uZydcbiAgICAgIH0pO1xuICAgIGNhc2UgJ3BwcHAnOlxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZm9ybWF0TG9uZy50aW1lKHtcbiAgICAgICAgd2lkdGg6ICdmdWxsJ1xuICAgICAgfSk7XG4gIH1cbn07XG52YXIgZGF0ZVRpbWVMb25nRm9ybWF0dGVyID0gZnVuY3Rpb24gZGF0ZVRpbWVMb25nRm9ybWF0dGVyKHBhdHRlcm4sIGZvcm1hdExvbmcpIHtcbiAgdmFyIG1hdGNoUmVzdWx0ID0gcGF0dGVybi5tYXRjaCgvKFArKShwKyk/LykgfHwgW107XG4gIHZhciBkYXRlUGF0dGVybiA9IG1hdGNoUmVzdWx0WzFdO1xuICB2YXIgdGltZVBhdHRlcm4gPSBtYXRjaFJlc3VsdFsyXTtcbiAgaWYgKCF0aW1lUGF0dGVybikge1xuICAgIHJldHVybiBkYXRlTG9uZ0Zvcm1hdHRlcihwYXR0ZXJuLCBmb3JtYXRMb25nKTtcbiAgfVxuICB2YXIgZGF0ZVRpbWVGb3JtYXQ7XG4gIHN3aXRjaCAoZGF0ZVBhdHRlcm4pIHtcbiAgICBjYXNlICdQJzpcbiAgICAgIGRhdGVUaW1lRm9ybWF0ID0gZm9ybWF0TG9uZy5kYXRlVGltZSh7XG4gICAgICAgIHdpZHRoOiAnc2hvcnQnXG4gICAgICB9KTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ1BQJzpcbiAgICAgIGRhdGVUaW1lRm9ybWF0ID0gZm9ybWF0TG9uZy5kYXRlVGltZSh7XG4gICAgICAgIHdpZHRoOiAnbWVkaXVtJ1xuICAgICAgfSk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdQUFAnOlxuICAgICAgZGF0ZVRpbWVGb3JtYXQgPSBmb3JtYXRMb25nLmRhdGVUaW1lKHtcbiAgICAgICAgd2lkdGg6ICdsb25nJ1xuICAgICAgfSk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdQUFBQJzpcbiAgICBkZWZhdWx0OlxuICAgICAgZGF0ZVRpbWVGb3JtYXQgPSBmb3JtYXRMb25nLmRhdGVUaW1lKHtcbiAgICAgICAgd2lkdGg6ICdmdWxsJ1xuICAgICAgfSk7XG4gICAgICBicmVhaztcbiAgfVxuICByZXR1cm4gZGF0ZVRpbWVGb3JtYXQucmVwbGFjZSgne3tkYXRlfX0nLCBkYXRlTG9uZ0Zvcm1hdHRlcihkYXRlUGF0dGVybiwgZm9ybWF0TG9uZykpLnJlcGxhY2UoJ3t7dGltZX19JywgdGltZUxvbmdGb3JtYXR0ZXIodGltZVBhdHRlcm4sIGZvcm1hdExvbmcpKTtcbn07XG52YXIgbG9uZ0Zvcm1hdHRlcnMgPSB7XG4gIHA6IHRpbWVMb25nRm9ybWF0dGVyLFxuICBQOiBkYXRlVGltZUxvbmdGb3JtYXR0ZXJcbn07XG5leHBvcnQgZGVmYXVsdCBsb25nRm9ybWF0dGVyczsiLCIvKipcbiAqIEdvb2dsZSBDaHJvbWUgYXMgb2YgNjcuMC4zMzk2Ljg3IGludHJvZHVjZWQgdGltZXpvbmVzIHdpdGggb2Zmc2V0IHRoYXQgaW5jbHVkZXMgc2Vjb25kcy5cbiAqIFRoZXkgdXN1YWxseSBhcHBlYXIgZm9yIGRhdGVzIHRoYXQgZGVub3RlIHRpbWUgYmVmb3JlIHRoZSB0aW1lem9uZXMgd2VyZSBpbnRyb2R1Y2VkXG4gKiAoZS5nLiBmb3IgJ0V1cm9wZS9QcmFndWUnIHRpbWV6b25lIHRoZSBvZmZzZXQgaXMgR01UKzAwOjU3OjQ0IGJlZm9yZSAxIE9jdG9iZXIgMTg5MVxuICogYW5kIEdNVCswMTowMDowMCBhZnRlciB0aGF0IGRhdGUpXG4gKlxuICogRGF0ZSNnZXRUaW1lem9uZU9mZnNldCByZXR1cm5zIHRoZSBvZmZzZXQgaW4gbWludXRlcyBhbmQgd291bGQgcmV0dXJuIDU3IGZvciB0aGUgZXhhbXBsZSBhYm92ZSxcbiAqIHdoaWNoIHdvdWxkIGxlYWQgdG8gaW5jb3JyZWN0IGNhbGN1bGF0aW9ucy5cbiAqXG4gKiBUaGlzIGZ1bmN0aW9uIHJldHVybnMgdGhlIHRpbWV6b25lIG9mZnNldCBpbiBtaWxsaXNlY29uZHMgdGhhdCB0YWtlcyBzZWNvbmRzIGluIGFjY291bnQuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFRpbWV6b25lT2Zmc2V0SW5NaWxsaXNlY29uZHMoZGF0ZSkge1xuICB2YXIgdXRjRGF0ZSA9IG5ldyBEYXRlKERhdGUuVVRDKGRhdGUuZ2V0RnVsbFllYXIoKSwgZGF0ZS5nZXRNb250aCgpLCBkYXRlLmdldERhdGUoKSwgZGF0ZS5nZXRIb3VycygpLCBkYXRlLmdldE1pbnV0ZXMoKSwgZGF0ZS5nZXRTZWNvbmRzKCksIGRhdGUuZ2V0TWlsbGlzZWNvbmRzKCkpKTtcbiAgdXRjRGF0ZS5zZXRVVENGdWxsWWVhcihkYXRlLmdldEZ1bGxZZWFyKCkpO1xuICByZXR1cm4gZGF0ZS5nZXRUaW1lKCkgLSB1dGNEYXRlLmdldFRpbWUoKTtcbn0iLCJpbXBvcnQgdG9EYXRlIGZyb20gXCIuLi8uLi90b0RhdGUvaW5kZXguanNcIjtcbmltcG9ydCByZXF1aXJlZEFyZ3MgZnJvbSBcIi4uL3JlcXVpcmVkQXJncy9pbmRleC5qc1wiO1xudmFyIE1JTExJU0VDT05EU19JTl9EQVkgPSA4NjQwMDAwMDtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFVUQ0RheU9mWWVhcihkaXJ0eURhdGUpIHtcbiAgcmVxdWlyZWRBcmdzKDEsIGFyZ3VtZW50cyk7XG4gIHZhciBkYXRlID0gdG9EYXRlKGRpcnR5RGF0ZSk7XG4gIHZhciB0aW1lc3RhbXAgPSBkYXRlLmdldFRpbWUoKTtcbiAgZGF0ZS5zZXRVVENNb250aCgwLCAxKTtcbiAgZGF0ZS5zZXRVVENIb3VycygwLCAwLCAwLCAwKTtcbiAgdmFyIHN0YXJ0T2ZZZWFyVGltZXN0YW1wID0gZGF0ZS5nZXRUaW1lKCk7XG4gIHZhciBkaWZmZXJlbmNlID0gdGltZXN0YW1wIC0gc3RhcnRPZlllYXJUaW1lc3RhbXA7XG4gIHJldHVybiBNYXRoLmZsb29yKGRpZmZlcmVuY2UgLyBNSUxMSVNFQ09ORFNfSU5fREFZKSArIDE7XG59IiwiaW1wb3J0IHRvRGF0ZSBmcm9tIFwiLi4vLi4vdG9EYXRlL2luZGV4LmpzXCI7XG5pbXBvcnQgc3RhcnRPZlVUQ0lTT1dlZWsgZnJvbSBcIi4uL3N0YXJ0T2ZVVENJU09XZWVrL2luZGV4LmpzXCI7XG5pbXBvcnQgc3RhcnRPZlVUQ0lTT1dlZWtZZWFyIGZyb20gXCIuLi9zdGFydE9mVVRDSVNPV2Vla1llYXIvaW5kZXguanNcIjtcbmltcG9ydCByZXF1aXJlZEFyZ3MgZnJvbSBcIi4uL3JlcXVpcmVkQXJncy9pbmRleC5qc1wiO1xudmFyIE1JTExJU0VDT05EU19JTl9XRUVLID0gNjA0ODAwMDAwO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0VVRDSVNPV2VlayhkaXJ0eURhdGUpIHtcbiAgcmVxdWlyZWRBcmdzKDEsIGFyZ3VtZW50cyk7XG4gIHZhciBkYXRlID0gdG9EYXRlKGRpcnR5RGF0ZSk7XG4gIHZhciBkaWZmID0gc3RhcnRPZlVUQ0lTT1dlZWsoZGF0ZSkuZ2V0VGltZSgpIC0gc3RhcnRPZlVUQ0lTT1dlZWtZZWFyKGRhdGUpLmdldFRpbWUoKTtcblxuICAvLyBSb3VuZCB0aGUgbnVtYmVyIG9mIGRheXMgdG8gdGhlIG5lYXJlc3QgaW50ZWdlclxuICAvLyBiZWNhdXNlIHRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIGluIGEgd2VlayBpcyBub3QgY29uc3RhbnRcbiAgLy8gKGUuZy4gaXQncyBkaWZmZXJlbnQgaW4gdGhlIHdlZWsgb2YgdGhlIGRheWxpZ2h0IHNhdmluZyB0aW1lIGNsb2NrIHNoaWZ0KVxuICByZXR1cm4gTWF0aC5yb3VuZChkaWZmIC8gTUlMTElTRUNPTkRTX0lOX1dFRUspICsgMTtcbn0iLCJpbXBvcnQgdG9EYXRlIGZyb20gXCIuLi8uLi90b0RhdGUvaW5kZXguanNcIjtcbmltcG9ydCByZXF1aXJlZEFyZ3MgZnJvbSBcIi4uL3JlcXVpcmVkQXJncy9pbmRleC5qc1wiO1xuaW1wb3J0IHN0YXJ0T2ZVVENJU09XZWVrIGZyb20gXCIuLi9zdGFydE9mVVRDSVNPV2Vlay9pbmRleC5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0VVRDSVNPV2Vla1llYXIoZGlydHlEYXRlKSB7XG4gIHJlcXVpcmVkQXJncygxLCBhcmd1bWVudHMpO1xuICB2YXIgZGF0ZSA9IHRvRGF0ZShkaXJ0eURhdGUpO1xuICB2YXIgeWVhciA9IGRhdGUuZ2V0VVRDRnVsbFllYXIoKTtcbiAgdmFyIGZvdXJ0aE9mSmFudWFyeU9mTmV4dFllYXIgPSBuZXcgRGF0ZSgwKTtcbiAgZm91cnRoT2ZKYW51YXJ5T2ZOZXh0WWVhci5zZXRVVENGdWxsWWVhcih5ZWFyICsgMSwgMCwgNCk7XG4gIGZvdXJ0aE9mSmFudWFyeU9mTmV4dFllYXIuc2V0VVRDSG91cnMoMCwgMCwgMCwgMCk7XG4gIHZhciBzdGFydE9mTmV4dFllYXIgPSBzdGFydE9mVVRDSVNPV2Vlayhmb3VydGhPZkphbnVhcnlPZk5leHRZZWFyKTtcbiAgdmFyIGZvdXJ0aE9mSmFudWFyeU9mVGhpc1llYXIgPSBuZXcgRGF0ZSgwKTtcbiAgZm91cnRoT2ZKYW51YXJ5T2ZUaGlzWWVhci5zZXRVVENGdWxsWWVhcih5ZWFyLCAwLCA0KTtcbiAgZm91cnRoT2ZKYW51YXJ5T2ZUaGlzWWVhci5zZXRVVENIb3VycygwLCAwLCAwLCAwKTtcbiAgdmFyIHN0YXJ0T2ZUaGlzWWVhciA9IHN0YXJ0T2ZVVENJU09XZWVrKGZvdXJ0aE9mSmFudWFyeU9mVGhpc1llYXIpO1xuICBpZiAoZGF0ZS5nZXRUaW1lKCkgPj0gc3RhcnRPZk5leHRZZWFyLmdldFRpbWUoKSkge1xuICAgIHJldHVybiB5ZWFyICsgMTtcbiAgfSBlbHNlIGlmIChkYXRlLmdldFRpbWUoKSA+PSBzdGFydE9mVGhpc1llYXIuZ2V0VGltZSgpKSB7XG4gICAgcmV0dXJuIHllYXI7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHllYXIgLSAxO1xuICB9XG59IiwiaW1wb3J0IHRvRGF0ZSBmcm9tIFwiLi4vLi4vdG9EYXRlL2luZGV4LmpzXCI7XG5pbXBvcnQgc3RhcnRPZlVUQ1dlZWsgZnJvbSBcIi4uL3N0YXJ0T2ZVVENXZWVrL2luZGV4LmpzXCI7XG5pbXBvcnQgc3RhcnRPZlVUQ1dlZWtZZWFyIGZyb20gXCIuLi9zdGFydE9mVVRDV2Vla1llYXIvaW5kZXguanNcIjtcbmltcG9ydCByZXF1aXJlZEFyZ3MgZnJvbSBcIi4uL3JlcXVpcmVkQXJncy9pbmRleC5qc1wiO1xudmFyIE1JTExJU0VDT05EU19JTl9XRUVLID0gNjA0ODAwMDAwO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0VVRDV2VlayhkaXJ0eURhdGUsIG9wdGlvbnMpIHtcbiAgcmVxdWlyZWRBcmdzKDEsIGFyZ3VtZW50cyk7XG4gIHZhciBkYXRlID0gdG9EYXRlKGRpcnR5RGF0ZSk7XG4gIHZhciBkaWZmID0gc3RhcnRPZlVUQ1dlZWsoZGF0ZSwgb3B0aW9ucykuZ2V0VGltZSgpIC0gc3RhcnRPZlVUQ1dlZWtZZWFyKGRhdGUsIG9wdGlvbnMpLmdldFRpbWUoKTtcblxuICAvLyBSb3VuZCB0aGUgbnVtYmVyIG9mIGRheXMgdG8gdGhlIG5lYXJlc3QgaW50ZWdlclxuICAvLyBiZWNhdXNlIHRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIGluIGEgd2VlayBpcyBub3QgY29uc3RhbnRcbiAgLy8gKGUuZy4gaXQncyBkaWZmZXJlbnQgaW4gdGhlIHdlZWsgb2YgdGhlIGRheWxpZ2h0IHNhdmluZyB0aW1lIGNsb2NrIHNoaWZ0KVxuICByZXR1cm4gTWF0aC5yb3VuZChkaWZmIC8gTUlMTElTRUNPTkRTX0lOX1dFRUspICsgMTtcbn0iLCJpbXBvcnQgdG9EYXRlIGZyb20gXCIuLi8uLi90b0RhdGUvaW5kZXguanNcIjtcbmltcG9ydCByZXF1aXJlZEFyZ3MgZnJvbSBcIi4uL3JlcXVpcmVkQXJncy9pbmRleC5qc1wiO1xuaW1wb3J0IHN0YXJ0T2ZVVENXZWVrIGZyb20gXCIuLi9zdGFydE9mVVRDV2Vlay9pbmRleC5qc1wiO1xuaW1wb3J0IHRvSW50ZWdlciBmcm9tIFwiLi4vdG9JbnRlZ2VyL2luZGV4LmpzXCI7XG5pbXBvcnQgeyBnZXREZWZhdWx0T3B0aW9ucyB9IGZyb20gXCIuLi9kZWZhdWx0T3B0aW9ucy9pbmRleC5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0VVRDV2Vla1llYXIoZGlydHlEYXRlLCBvcHRpb25zKSB7XG4gIHZhciBfcmVmLCBfcmVmMiwgX3JlZjMsIF9vcHRpb25zJGZpcnN0V2Vla0NvbiwgX29wdGlvbnMkbG9jYWxlLCBfb3B0aW9ucyRsb2NhbGUkb3B0aW8sIF9kZWZhdWx0T3B0aW9ucyRsb2NhbCwgX2RlZmF1bHRPcHRpb25zJGxvY2FsMjtcbiAgcmVxdWlyZWRBcmdzKDEsIGFyZ3VtZW50cyk7XG4gIHZhciBkYXRlID0gdG9EYXRlKGRpcnR5RGF0ZSk7XG4gIHZhciB5ZWFyID0gZGF0ZS5nZXRVVENGdWxsWWVhcigpO1xuICB2YXIgZGVmYXVsdE9wdGlvbnMgPSBnZXREZWZhdWx0T3B0aW9ucygpO1xuICB2YXIgZmlyc3RXZWVrQ29udGFpbnNEYXRlID0gdG9JbnRlZ2VyKChfcmVmID0gKF9yZWYyID0gKF9yZWYzID0gKF9vcHRpb25zJGZpcnN0V2Vla0NvbiA9IG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5maXJzdFdlZWtDb250YWluc0RhdGUpICE9PSBudWxsICYmIF9vcHRpb25zJGZpcnN0V2Vla0NvbiAhPT0gdm9pZCAwID8gX29wdGlvbnMkZmlyc3RXZWVrQ29uIDogb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiAoX29wdGlvbnMkbG9jYWxlID0gb3B0aW9ucy5sb2NhbGUpID09PSBudWxsIHx8IF9vcHRpb25zJGxvY2FsZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogKF9vcHRpb25zJGxvY2FsZSRvcHRpbyA9IF9vcHRpb25zJGxvY2FsZS5vcHRpb25zKSA9PT0gbnVsbCB8fCBfb3B0aW9ucyRsb2NhbGUkb3B0aW8gPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9vcHRpb25zJGxvY2FsZSRvcHRpby5maXJzdFdlZWtDb250YWluc0RhdGUpICE9PSBudWxsICYmIF9yZWYzICE9PSB2b2lkIDAgPyBfcmVmMyA6IGRlZmF1bHRPcHRpb25zLmZpcnN0V2Vla0NvbnRhaW5zRGF0ZSkgIT09IG51bGwgJiYgX3JlZjIgIT09IHZvaWQgMCA/IF9yZWYyIDogKF9kZWZhdWx0T3B0aW9ucyRsb2NhbCA9IGRlZmF1bHRPcHRpb25zLmxvY2FsZSkgPT09IG51bGwgfHwgX2RlZmF1bHRPcHRpb25zJGxvY2FsID09PSB2b2lkIDAgPyB2b2lkIDAgOiAoX2RlZmF1bHRPcHRpb25zJGxvY2FsMiA9IF9kZWZhdWx0T3B0aW9ucyRsb2NhbC5vcHRpb25zKSA9PT0gbnVsbCB8fCBfZGVmYXVsdE9wdGlvbnMkbG9jYWwyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZGVmYXVsdE9wdGlvbnMkbG9jYWwyLmZpcnN0V2Vla0NvbnRhaW5zRGF0ZSkgIT09IG51bGwgJiYgX3JlZiAhPT0gdm9pZCAwID8gX3JlZiA6IDEpO1xuXG4gIC8vIFRlc3QgaWYgd2Vla1N0YXJ0c09uIGlzIGJldHdlZW4gMSBhbmQgNyBfYW5kXyBpcyBub3QgTmFOXG4gIGlmICghKGZpcnN0V2Vla0NvbnRhaW5zRGF0ZSA+PSAxICYmIGZpcnN0V2Vla0NvbnRhaW5zRGF0ZSA8PSA3KSkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdmaXJzdFdlZWtDb250YWluc0RhdGUgbXVzdCBiZSBiZXR3ZWVuIDEgYW5kIDcgaW5jbHVzaXZlbHknKTtcbiAgfVxuICB2YXIgZmlyc3RXZWVrT2ZOZXh0WWVhciA9IG5ldyBEYXRlKDApO1xuICBmaXJzdFdlZWtPZk5leHRZZWFyLnNldFVUQ0Z1bGxZZWFyKHllYXIgKyAxLCAwLCBmaXJzdFdlZWtDb250YWluc0RhdGUpO1xuICBmaXJzdFdlZWtPZk5leHRZZWFyLnNldFVUQ0hvdXJzKDAsIDAsIDAsIDApO1xuICB2YXIgc3RhcnRPZk5leHRZZWFyID0gc3RhcnRPZlVUQ1dlZWsoZmlyc3RXZWVrT2ZOZXh0WWVhciwgb3B0aW9ucyk7XG4gIHZhciBmaXJzdFdlZWtPZlRoaXNZZWFyID0gbmV3IERhdGUoMCk7XG4gIGZpcnN0V2Vla09mVGhpc1llYXIuc2V0VVRDRnVsbFllYXIoeWVhciwgMCwgZmlyc3RXZWVrQ29udGFpbnNEYXRlKTtcbiAgZmlyc3RXZWVrT2ZUaGlzWWVhci5zZXRVVENIb3VycygwLCAwLCAwLCAwKTtcbiAgdmFyIHN0YXJ0T2ZUaGlzWWVhciA9IHN0YXJ0T2ZVVENXZWVrKGZpcnN0V2Vla09mVGhpc1llYXIsIG9wdGlvbnMpO1xuICBpZiAoZGF0ZS5nZXRUaW1lKCkgPj0gc3RhcnRPZk5leHRZZWFyLmdldFRpbWUoKSkge1xuICAgIHJldHVybiB5ZWFyICsgMTtcbiAgfSBlbHNlIGlmIChkYXRlLmdldFRpbWUoKSA+PSBzdGFydE9mVGhpc1llYXIuZ2V0VGltZSgpKSB7XG4gICAgcmV0dXJuIHllYXI7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHllYXIgLSAxO1xuICB9XG59IiwidmFyIHByb3RlY3RlZERheU9mWWVhclRva2VucyA9IFsnRCcsICdERCddO1xudmFyIHByb3RlY3RlZFdlZWtZZWFyVG9rZW5zID0gWydZWScsICdZWVlZJ107XG5leHBvcnQgZnVuY3Rpb24gaXNQcm90ZWN0ZWREYXlPZlllYXJUb2tlbih0b2tlbikge1xuICByZXR1cm4gcHJvdGVjdGVkRGF5T2ZZZWFyVG9rZW5zLmluZGV4T2YodG9rZW4pICE9PSAtMTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc1Byb3RlY3RlZFdlZWtZZWFyVG9rZW4odG9rZW4pIHtcbiAgcmV0dXJuIHByb3RlY3RlZFdlZWtZZWFyVG9rZW5zLmluZGV4T2YodG9rZW4pICE9PSAtMTtcbn1cbmV4cG9ydCBmdW5jdGlvbiB0aHJvd1Byb3RlY3RlZEVycm9yKHRva2VuLCBmb3JtYXQsIGlucHV0KSB7XG4gIGlmICh0b2tlbiA9PT0gJ1lZWVknKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoXCJVc2UgYHl5eXlgIGluc3RlYWQgb2YgYFlZWVlgIChpbiBgXCIuY29uY2F0KGZvcm1hdCwgXCJgKSBmb3IgZm9ybWF0dGluZyB5ZWFycyB0byB0aGUgaW5wdXQgYFwiKS5jb25jYXQoaW5wdXQsIFwiYDsgc2VlOiBodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvZGF0ZS1mbnMvYmxvYi9tYXN0ZXIvZG9jcy91bmljb2RlVG9rZW5zLm1kXCIpKTtcbiAgfSBlbHNlIGlmICh0b2tlbiA9PT0gJ1lZJykge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKFwiVXNlIGB5eWAgaW5zdGVhZCBvZiBgWVlgIChpbiBgXCIuY29uY2F0KGZvcm1hdCwgXCJgKSBmb3IgZm9ybWF0dGluZyB5ZWFycyB0byB0aGUgaW5wdXQgYFwiKS5jb25jYXQoaW5wdXQsIFwiYDsgc2VlOiBodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvZGF0ZS1mbnMvYmxvYi9tYXN0ZXIvZG9jcy91bmljb2RlVG9rZW5zLm1kXCIpKTtcbiAgfSBlbHNlIGlmICh0b2tlbiA9PT0gJ0QnKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoXCJVc2UgYGRgIGluc3RlYWQgb2YgYERgIChpbiBgXCIuY29uY2F0KGZvcm1hdCwgXCJgKSBmb3IgZm9ybWF0dGluZyBkYXlzIG9mIHRoZSBtb250aCB0byB0aGUgaW5wdXQgYFwiKS5jb25jYXQoaW5wdXQsIFwiYDsgc2VlOiBodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvZGF0ZS1mbnMvYmxvYi9tYXN0ZXIvZG9jcy91bmljb2RlVG9rZW5zLm1kXCIpKTtcbiAgfSBlbHNlIGlmICh0b2tlbiA9PT0gJ0REJykge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKFwiVXNlIGBkZGAgaW5zdGVhZCBvZiBgRERgIChpbiBgXCIuY29uY2F0KGZvcm1hdCwgXCJgKSBmb3IgZm9ybWF0dGluZyBkYXlzIG9mIHRoZSBtb250aCB0byB0aGUgaW5wdXQgYFwiKS5jb25jYXQoaW5wdXQsIFwiYDsgc2VlOiBodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvZGF0ZS1mbnMvYmxvYi9tYXN0ZXIvZG9jcy91bmljb2RlVG9rZW5zLm1kXCIpKTtcbiAgfVxufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlcXVpcmVkQXJncyhyZXF1aXJlZCwgYXJncykge1xuICBpZiAoYXJncy5sZW5ndGggPCByZXF1aXJlZCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IocmVxdWlyZWQgKyAnIGFyZ3VtZW50JyArIChyZXF1aXJlZCA+IDEgPyAncycgOiAnJykgKyAnIHJlcXVpcmVkLCBidXQgb25seSAnICsgYXJncy5sZW5ndGggKyAnIHByZXNlbnQnKTtcbiAgfVxufSIsImltcG9ydCB0b0RhdGUgZnJvbSBcIi4uLy4uL3RvRGF0ZS9pbmRleC5qc1wiO1xuaW1wb3J0IHJlcXVpcmVkQXJncyBmcm9tIFwiLi4vcmVxdWlyZWRBcmdzL2luZGV4LmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzdGFydE9mVVRDSVNPV2VlayhkaXJ0eURhdGUpIHtcbiAgcmVxdWlyZWRBcmdzKDEsIGFyZ3VtZW50cyk7XG4gIHZhciB3ZWVrU3RhcnRzT24gPSAxO1xuICB2YXIgZGF0ZSA9IHRvRGF0ZShkaXJ0eURhdGUpO1xuICB2YXIgZGF5ID0gZGF0ZS5nZXRVVENEYXkoKTtcbiAgdmFyIGRpZmYgPSAoZGF5IDwgd2Vla1N0YXJ0c09uID8gNyA6IDApICsgZGF5IC0gd2Vla1N0YXJ0c09uO1xuICBkYXRlLnNldFVUQ0RhdGUoZGF0ZS5nZXRVVENEYXRlKCkgLSBkaWZmKTtcbiAgZGF0ZS5zZXRVVENIb3VycygwLCAwLCAwLCAwKTtcbiAgcmV0dXJuIGRhdGU7XG59IiwiaW1wb3J0IGdldFVUQ0lTT1dlZWtZZWFyIGZyb20gXCIuLi9nZXRVVENJU09XZWVrWWVhci9pbmRleC5qc1wiO1xuaW1wb3J0IHN0YXJ0T2ZVVENJU09XZWVrIGZyb20gXCIuLi9zdGFydE9mVVRDSVNPV2Vlay9pbmRleC5qc1wiO1xuaW1wb3J0IHJlcXVpcmVkQXJncyBmcm9tIFwiLi4vcmVxdWlyZWRBcmdzL2luZGV4LmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzdGFydE9mVVRDSVNPV2Vla1llYXIoZGlydHlEYXRlKSB7XG4gIHJlcXVpcmVkQXJncygxLCBhcmd1bWVudHMpO1xuICB2YXIgeWVhciA9IGdldFVUQ0lTT1dlZWtZZWFyKGRpcnR5RGF0ZSk7XG4gIHZhciBmb3VydGhPZkphbnVhcnkgPSBuZXcgRGF0ZSgwKTtcbiAgZm91cnRoT2ZKYW51YXJ5LnNldFVUQ0Z1bGxZZWFyKHllYXIsIDAsIDQpO1xuICBmb3VydGhPZkphbnVhcnkuc2V0VVRDSG91cnMoMCwgMCwgMCwgMCk7XG4gIHZhciBkYXRlID0gc3RhcnRPZlVUQ0lTT1dlZWsoZm91cnRoT2ZKYW51YXJ5KTtcbiAgcmV0dXJuIGRhdGU7XG59IiwiaW1wb3J0IHRvRGF0ZSBmcm9tIFwiLi4vLi4vdG9EYXRlL2luZGV4LmpzXCI7XG5pbXBvcnQgcmVxdWlyZWRBcmdzIGZyb20gXCIuLi9yZXF1aXJlZEFyZ3MvaW5kZXguanNcIjtcbmltcG9ydCB0b0ludGVnZXIgZnJvbSBcIi4uL3RvSW50ZWdlci9pbmRleC5qc1wiO1xuaW1wb3J0IHsgZ2V0RGVmYXVsdE9wdGlvbnMgfSBmcm9tIFwiLi4vZGVmYXVsdE9wdGlvbnMvaW5kZXguanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHN0YXJ0T2ZVVENXZWVrKGRpcnR5RGF0ZSwgb3B0aW9ucykge1xuICB2YXIgX3JlZiwgX3JlZjIsIF9yZWYzLCBfb3B0aW9ucyR3ZWVrU3RhcnRzT24sIF9vcHRpb25zJGxvY2FsZSwgX29wdGlvbnMkbG9jYWxlJG9wdGlvLCBfZGVmYXVsdE9wdGlvbnMkbG9jYWwsIF9kZWZhdWx0T3B0aW9ucyRsb2NhbDI7XG4gIHJlcXVpcmVkQXJncygxLCBhcmd1bWVudHMpO1xuICB2YXIgZGVmYXVsdE9wdGlvbnMgPSBnZXREZWZhdWx0T3B0aW9ucygpO1xuICB2YXIgd2Vla1N0YXJ0c09uID0gdG9JbnRlZ2VyKChfcmVmID0gKF9yZWYyID0gKF9yZWYzID0gKF9vcHRpb25zJHdlZWtTdGFydHNPbiA9IG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy53ZWVrU3RhcnRzT24pICE9PSBudWxsICYmIF9vcHRpb25zJHdlZWtTdGFydHNPbiAhPT0gdm9pZCAwID8gX29wdGlvbnMkd2Vla1N0YXJ0c09uIDogb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiAoX29wdGlvbnMkbG9jYWxlID0gb3B0aW9ucy5sb2NhbGUpID09PSBudWxsIHx8IF9vcHRpb25zJGxvY2FsZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogKF9vcHRpb25zJGxvY2FsZSRvcHRpbyA9IF9vcHRpb25zJGxvY2FsZS5vcHRpb25zKSA9PT0gbnVsbCB8fCBfb3B0aW9ucyRsb2NhbGUkb3B0aW8gPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9vcHRpb25zJGxvY2FsZSRvcHRpby53ZWVrU3RhcnRzT24pICE9PSBudWxsICYmIF9yZWYzICE9PSB2b2lkIDAgPyBfcmVmMyA6IGRlZmF1bHRPcHRpb25zLndlZWtTdGFydHNPbikgIT09IG51bGwgJiYgX3JlZjIgIT09IHZvaWQgMCA/IF9yZWYyIDogKF9kZWZhdWx0T3B0aW9ucyRsb2NhbCA9IGRlZmF1bHRPcHRpb25zLmxvY2FsZSkgPT09IG51bGwgfHwgX2RlZmF1bHRPcHRpb25zJGxvY2FsID09PSB2b2lkIDAgPyB2b2lkIDAgOiAoX2RlZmF1bHRPcHRpb25zJGxvY2FsMiA9IF9kZWZhdWx0T3B0aW9ucyRsb2NhbC5vcHRpb25zKSA9PT0gbnVsbCB8fCBfZGVmYXVsdE9wdGlvbnMkbG9jYWwyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZGVmYXVsdE9wdGlvbnMkbG9jYWwyLndlZWtTdGFydHNPbikgIT09IG51bGwgJiYgX3JlZiAhPT0gdm9pZCAwID8gX3JlZiA6IDApO1xuXG4gIC8vIFRlc3QgaWYgd2Vla1N0YXJ0c09uIGlzIGJldHdlZW4gMCBhbmQgNiBfYW5kXyBpcyBub3QgTmFOXG4gIGlmICghKHdlZWtTdGFydHNPbiA+PSAwICYmIHdlZWtTdGFydHNPbiA8PSA2KSkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCd3ZWVrU3RhcnRzT24gbXVzdCBiZSBiZXR3ZWVuIDAgYW5kIDYgaW5jbHVzaXZlbHknKTtcbiAgfVxuICB2YXIgZGF0ZSA9IHRvRGF0ZShkaXJ0eURhdGUpO1xuICB2YXIgZGF5ID0gZGF0ZS5nZXRVVENEYXkoKTtcbiAgdmFyIGRpZmYgPSAoZGF5IDwgd2Vla1N0YXJ0c09uID8gNyA6IDApICsgZGF5IC0gd2Vla1N0YXJ0c09uO1xuICBkYXRlLnNldFVUQ0RhdGUoZGF0ZS5nZXRVVENEYXRlKCkgLSBkaWZmKTtcbiAgZGF0ZS5zZXRVVENIb3VycygwLCAwLCAwLCAwKTtcbiAgcmV0dXJuIGRhdGU7XG59IiwiaW1wb3J0IGdldFVUQ1dlZWtZZWFyIGZyb20gXCIuLi9nZXRVVENXZWVrWWVhci9pbmRleC5qc1wiO1xuaW1wb3J0IHJlcXVpcmVkQXJncyBmcm9tIFwiLi4vcmVxdWlyZWRBcmdzL2luZGV4LmpzXCI7XG5pbXBvcnQgc3RhcnRPZlVUQ1dlZWsgZnJvbSBcIi4uL3N0YXJ0T2ZVVENXZWVrL2luZGV4LmpzXCI7XG5pbXBvcnQgdG9JbnRlZ2VyIGZyb20gXCIuLi90b0ludGVnZXIvaW5kZXguanNcIjtcbmltcG9ydCB7IGdldERlZmF1bHRPcHRpb25zIH0gZnJvbSBcIi4uL2RlZmF1bHRPcHRpb25zL2luZGV4LmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzdGFydE9mVVRDV2Vla1llYXIoZGlydHlEYXRlLCBvcHRpb25zKSB7XG4gIHZhciBfcmVmLCBfcmVmMiwgX3JlZjMsIF9vcHRpb25zJGZpcnN0V2Vla0NvbiwgX29wdGlvbnMkbG9jYWxlLCBfb3B0aW9ucyRsb2NhbGUkb3B0aW8sIF9kZWZhdWx0T3B0aW9ucyRsb2NhbCwgX2RlZmF1bHRPcHRpb25zJGxvY2FsMjtcbiAgcmVxdWlyZWRBcmdzKDEsIGFyZ3VtZW50cyk7XG4gIHZhciBkZWZhdWx0T3B0aW9ucyA9IGdldERlZmF1bHRPcHRpb25zKCk7XG4gIHZhciBmaXJzdFdlZWtDb250YWluc0RhdGUgPSB0b0ludGVnZXIoKF9yZWYgPSAoX3JlZjIgPSAoX3JlZjMgPSAoX29wdGlvbnMkZmlyc3RXZWVrQ29uID0gb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmZpcnN0V2Vla0NvbnRhaW5zRGF0ZSkgIT09IG51bGwgJiYgX29wdGlvbnMkZmlyc3RXZWVrQ29uICE9PSB2b2lkIDAgPyBfb3B0aW9ucyRmaXJzdFdlZWtDb24gOiBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IChfb3B0aW9ucyRsb2NhbGUgPSBvcHRpb25zLmxvY2FsZSkgPT09IG51bGwgfHwgX29wdGlvbnMkbG9jYWxlID09PSB2b2lkIDAgPyB2b2lkIDAgOiAoX29wdGlvbnMkbG9jYWxlJG9wdGlvID0gX29wdGlvbnMkbG9jYWxlLm9wdGlvbnMpID09PSBudWxsIHx8IF9vcHRpb25zJGxvY2FsZSRvcHRpbyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX29wdGlvbnMkbG9jYWxlJG9wdGlvLmZpcnN0V2Vla0NvbnRhaW5zRGF0ZSkgIT09IG51bGwgJiYgX3JlZjMgIT09IHZvaWQgMCA/IF9yZWYzIDogZGVmYXVsdE9wdGlvbnMuZmlyc3RXZWVrQ29udGFpbnNEYXRlKSAhPT0gbnVsbCAmJiBfcmVmMiAhPT0gdm9pZCAwID8gX3JlZjIgOiAoX2RlZmF1bHRPcHRpb25zJGxvY2FsID0gZGVmYXVsdE9wdGlvbnMubG9jYWxlKSA9PT0gbnVsbCB8fCBfZGVmYXVsdE9wdGlvbnMkbG9jYWwgPT09IHZvaWQgMCA/IHZvaWQgMCA6IChfZGVmYXVsdE9wdGlvbnMkbG9jYWwyID0gX2RlZmF1bHRPcHRpb25zJGxvY2FsLm9wdGlvbnMpID09PSBudWxsIHx8IF9kZWZhdWx0T3B0aW9ucyRsb2NhbDIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9kZWZhdWx0T3B0aW9ucyRsb2NhbDIuZmlyc3RXZWVrQ29udGFpbnNEYXRlKSAhPT0gbnVsbCAmJiBfcmVmICE9PSB2b2lkIDAgPyBfcmVmIDogMSk7XG4gIHZhciB5ZWFyID0gZ2V0VVRDV2Vla1llYXIoZGlydHlEYXRlLCBvcHRpb25zKTtcbiAgdmFyIGZpcnN0V2VlayA9IG5ldyBEYXRlKDApO1xuICBmaXJzdFdlZWsuc2V0VVRDRnVsbFllYXIoeWVhciwgMCwgZmlyc3RXZWVrQ29udGFpbnNEYXRlKTtcbiAgZmlyc3RXZWVrLnNldFVUQ0hvdXJzKDAsIDAsIDAsIDApO1xuICB2YXIgZGF0ZSA9IHN0YXJ0T2ZVVENXZWVrKGZpcnN0V2Vlaywgb3B0aW9ucyk7XG4gIHJldHVybiBkYXRlO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRvSW50ZWdlcihkaXJ0eU51bWJlcikge1xuICBpZiAoZGlydHlOdW1iZXIgPT09IG51bGwgfHwgZGlydHlOdW1iZXIgPT09IHRydWUgfHwgZGlydHlOdW1iZXIgPT09IGZhbHNlKSB7XG4gICAgcmV0dXJuIE5hTjtcbiAgfVxuICB2YXIgbnVtYmVyID0gTnVtYmVyKGRpcnR5TnVtYmVyKTtcbiAgaWYgKGlzTmFOKG51bWJlcikpIHtcbiAgICByZXR1cm4gbnVtYmVyO1xuICB9XG4gIHJldHVybiBudW1iZXIgPCAwID8gTWF0aC5jZWlsKG51bWJlcikgOiBNYXRoLmZsb29yKG51bWJlcik7XG59IiwiaW1wb3J0IHRvSW50ZWdlciBmcm9tIFwiLi4vX2xpYi90b0ludGVnZXIvaW5kZXguanNcIjtcbmltcG9ydCB0b0RhdGUgZnJvbSBcIi4uL3RvRGF0ZS9pbmRleC5qc1wiO1xuaW1wb3J0IHJlcXVpcmVkQXJncyBmcm9tIFwiLi4vX2xpYi9yZXF1aXJlZEFyZ3MvaW5kZXguanNcIjtcbi8qKlxuICogQG5hbWUgYWRkTWlsbGlzZWNvbmRzXG4gKiBAY2F0ZWdvcnkgTWlsbGlzZWNvbmQgSGVscGVyc1xuICogQHN1bW1hcnkgQWRkIHRoZSBzcGVjaWZpZWQgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0byB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEFkZCB0aGUgc3BlY2lmaWVkIG51bWJlciBvZiBtaWxsaXNlY29uZHMgdG8gdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQHBhcmFtIHtEYXRlfE51bWJlcn0gZGF0ZSAtIHRoZSBkYXRlIHRvIGJlIGNoYW5nZWRcbiAqIEBwYXJhbSB7TnVtYmVyfSBhbW91bnQgLSB0aGUgYW1vdW50IG9mIG1pbGxpc2Vjb25kcyB0byBiZSBhZGRlZC4gUG9zaXRpdmUgZGVjaW1hbHMgd2lsbCBiZSByb3VuZGVkIHVzaW5nIGBNYXRoLmZsb29yYCwgZGVjaW1hbHMgbGVzcyB0aGFuIHplcm8gd2lsbCBiZSByb3VuZGVkIHVzaW5nIGBNYXRoLmNlaWxgLlxuICogQHJldHVybnMge0RhdGV9IHRoZSBuZXcgZGF0ZSB3aXRoIHRoZSBtaWxsaXNlY29uZHMgYWRkZWRcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gMiBhcmd1bWVudHMgcmVxdWlyZWRcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gQWRkIDc1MCBtaWxsaXNlY29uZHMgdG8gMTAgSnVseSAyMDE0IDEyOjQ1OjMwLjAwMDpcbiAqIGNvbnN0IHJlc3VsdCA9IGFkZE1pbGxpc2Vjb25kcyhuZXcgRGF0ZSgyMDE0LCA2LCAxMCwgMTIsIDQ1LCAzMCwgMCksIDc1MClcbiAqIC8vPT4gVGh1IEp1bCAxMCAyMDE0IDEyOjQ1OjMwLjc1MFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhZGRNaWxsaXNlY29uZHMoZGlydHlEYXRlLCBkaXJ0eUFtb3VudCkge1xuICByZXF1aXJlZEFyZ3MoMiwgYXJndW1lbnRzKTtcbiAgdmFyIHRpbWVzdGFtcCA9IHRvRGF0ZShkaXJ0eURhdGUpLmdldFRpbWUoKTtcbiAgdmFyIGFtb3VudCA9IHRvSW50ZWdlcihkaXJ0eUFtb3VudCk7XG4gIHJldHVybiBuZXcgRGF0ZSh0aW1lc3RhbXAgKyBhbW91bnQpO1xufSIsImltcG9ydCB7IGdldERlZmF1bHRPcHRpb25zIH0gZnJvbSBcIi4uL19saWIvZGVmYXVsdE9wdGlvbnMvaW5kZXguanNcIjtcbmltcG9ydCB0b0RhdGUgZnJvbSBcIi4uL3RvRGF0ZS9pbmRleC5qc1wiO1xuaW1wb3J0IHRvSW50ZWdlciBmcm9tIFwiLi4vX2xpYi90b0ludGVnZXIvaW5kZXguanNcIjtcbmltcG9ydCByZXF1aXJlZEFyZ3MgZnJvbSBcIi4uL19saWIvcmVxdWlyZWRBcmdzL2luZGV4LmpzXCI7XG4vKipcbiAqIEBuYW1lIGVuZE9mV2Vla1xuICogQGNhdGVnb3J5IFdlZWsgSGVscGVyc1xuICogQHN1bW1hcnkgUmV0dXJuIHRoZSBlbmQgb2YgYSB3ZWVrIGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybiB0aGUgZW5kIG9mIGEgd2VlayBmb3IgdGhlIGdpdmVuIGRhdGUuXG4gKiBUaGUgcmVzdWx0IHdpbGwgYmUgaW4gdGhlIGxvY2FsIHRpbWV6b25lLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxOdW1iZXJ9IGRhdGUgLSB0aGUgb3JpZ2luYWwgZGF0ZVxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAtIGFuIG9iamVjdCB3aXRoIG9wdGlvbnMuXG4gKiBAcGFyYW0ge0xvY2FsZX0gW29wdGlvbnMubG9jYWxlPWRlZmF1bHRMb2NhbGVdIC0gdGhlIGxvY2FsZSBvYmplY3QuIFNlZSBbTG9jYWxlXXtAbGluayBodHRwczovL2RhdGUtZm5zLm9yZy9kb2NzL0xvY2FsZX1cbiAqIEBwYXJhbSB7MHwxfDJ8M3w0fDV8Nn0gW29wdGlvbnMud2Vla1N0YXJ0c09uPTBdIC0gdGhlIGluZGV4IG9mIHRoZSBmaXJzdCBkYXkgb2YgdGhlIHdlZWsgKDAgLSBTdW5kYXkpXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIGVuZCBvZiBhIHdlZWtcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gMSBhcmd1bWVudCByZXF1aXJlZFxuICogQHRocm93cyB7UmFuZ2VFcnJvcn0gYG9wdGlvbnMud2Vla1N0YXJ0c09uYCBtdXN0IGJlIGJldHdlZW4gMCBhbmQgNlxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBUaGUgZW5kIG9mIGEgd2VlayBmb3IgMiBTZXB0ZW1iZXIgMjAxNCAxMTo1NTowMDpcbiAqIGNvbnN0IHJlc3VsdCA9IGVuZE9mV2VlayhuZXcgRGF0ZSgyMDE0LCA4LCAyLCAxMSwgNTUsIDApKVxuICogLy89PiBTYXQgU2VwIDA2IDIwMTQgMjM6NTk6NTkuOTk5XG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIElmIHRoZSB3ZWVrIHN0YXJ0cyBvbiBNb25kYXksIHRoZSBlbmQgb2YgdGhlIHdlZWsgZm9yIDIgU2VwdGVtYmVyIDIwMTQgMTE6NTU6MDA6XG4gKiBjb25zdCByZXN1bHQgPSBlbmRPZldlZWsobmV3IERhdGUoMjAxNCwgOCwgMiwgMTEsIDU1LCAwKSwgeyB3ZWVrU3RhcnRzT246IDEgfSlcbiAqIC8vPT4gU3VuIFNlcCAwNyAyMDE0IDIzOjU5OjU5Ljk5OVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBlbmRPZldlZWsoZGlydHlEYXRlLCBvcHRpb25zKSB7XG4gIHZhciBfcmVmLCBfcmVmMiwgX3JlZjMsIF9vcHRpb25zJHdlZWtTdGFydHNPbiwgX29wdGlvbnMkbG9jYWxlLCBfb3B0aW9ucyRsb2NhbGUkb3B0aW8sIF9kZWZhdWx0T3B0aW9ucyRsb2NhbCwgX2RlZmF1bHRPcHRpb25zJGxvY2FsMjtcbiAgcmVxdWlyZWRBcmdzKDEsIGFyZ3VtZW50cyk7XG4gIHZhciBkZWZhdWx0T3B0aW9ucyA9IGdldERlZmF1bHRPcHRpb25zKCk7XG4gIHZhciB3ZWVrU3RhcnRzT24gPSB0b0ludGVnZXIoKF9yZWYgPSAoX3JlZjIgPSAoX3JlZjMgPSAoX29wdGlvbnMkd2Vla1N0YXJ0c09uID0gb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLndlZWtTdGFydHNPbikgIT09IG51bGwgJiYgX29wdGlvbnMkd2Vla1N0YXJ0c09uICE9PSB2b2lkIDAgPyBfb3B0aW9ucyR3ZWVrU3RhcnRzT24gOiBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IChfb3B0aW9ucyRsb2NhbGUgPSBvcHRpb25zLmxvY2FsZSkgPT09IG51bGwgfHwgX29wdGlvbnMkbG9jYWxlID09PSB2b2lkIDAgPyB2b2lkIDAgOiAoX29wdGlvbnMkbG9jYWxlJG9wdGlvID0gX29wdGlvbnMkbG9jYWxlLm9wdGlvbnMpID09PSBudWxsIHx8IF9vcHRpb25zJGxvY2FsZSRvcHRpbyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX29wdGlvbnMkbG9jYWxlJG9wdGlvLndlZWtTdGFydHNPbikgIT09IG51bGwgJiYgX3JlZjMgIT09IHZvaWQgMCA/IF9yZWYzIDogZGVmYXVsdE9wdGlvbnMud2Vla1N0YXJ0c09uKSAhPT0gbnVsbCAmJiBfcmVmMiAhPT0gdm9pZCAwID8gX3JlZjIgOiAoX2RlZmF1bHRPcHRpb25zJGxvY2FsID0gZGVmYXVsdE9wdGlvbnMubG9jYWxlKSA9PT0gbnVsbCB8fCBfZGVmYXVsdE9wdGlvbnMkbG9jYWwgPT09IHZvaWQgMCA/IHZvaWQgMCA6IChfZGVmYXVsdE9wdGlvbnMkbG9jYWwyID0gX2RlZmF1bHRPcHRpb25zJGxvY2FsLm9wdGlvbnMpID09PSBudWxsIHx8IF9kZWZhdWx0T3B0aW9ucyRsb2NhbDIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9kZWZhdWx0T3B0aW9ucyRsb2NhbDIud2Vla1N0YXJ0c09uKSAhPT0gbnVsbCAmJiBfcmVmICE9PSB2b2lkIDAgPyBfcmVmIDogMCk7XG5cbiAgLy8gVGVzdCBpZiB3ZWVrU3RhcnRzT24gaXMgYmV0d2VlbiAwIGFuZCA2IF9hbmRfIGlzIG5vdCBOYU5cbiAgaWYgKCEod2Vla1N0YXJ0c09uID49IDAgJiYgd2Vla1N0YXJ0c09uIDw9IDYpKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ3dlZWtTdGFydHNPbiBtdXN0IGJlIGJldHdlZW4gMCBhbmQgNiBpbmNsdXNpdmVseScpO1xuICB9XG4gIHZhciBkYXRlID0gdG9EYXRlKGRpcnR5RGF0ZSk7XG4gIHZhciBkYXkgPSBkYXRlLmdldERheSgpO1xuICB2YXIgZGlmZiA9IChkYXkgPCB3ZWVrU3RhcnRzT24gPyAtNyA6IDApICsgNiAtIChkYXkgLSB3ZWVrU3RhcnRzT24pO1xuICBkYXRlLnNldERhdGUoZGF0ZS5nZXREYXRlKCkgKyBkaWZmKTtcbiAgZGF0ZS5zZXRIb3VycygyMywgNTksIDU5LCA5OTkpO1xuICByZXR1cm4gZGF0ZTtcbn0iLCJpbXBvcnQgaXNWYWxpZCBmcm9tIFwiLi4vaXNWYWxpZC9pbmRleC5qc1wiO1xuaW1wb3J0IHN1Yk1pbGxpc2Vjb25kcyBmcm9tIFwiLi4vc3ViTWlsbGlzZWNvbmRzL2luZGV4LmpzXCI7XG5pbXBvcnQgdG9EYXRlIGZyb20gXCIuLi90b0RhdGUvaW5kZXguanNcIjtcbmltcG9ydCBmb3JtYXR0ZXJzIGZyb20gXCIuLi9fbGliL2Zvcm1hdC9mb3JtYXR0ZXJzL2luZGV4LmpzXCI7XG5pbXBvcnQgbG9uZ0Zvcm1hdHRlcnMgZnJvbSBcIi4uL19saWIvZm9ybWF0L2xvbmdGb3JtYXR0ZXJzL2luZGV4LmpzXCI7XG5pbXBvcnQgZ2V0VGltZXpvbmVPZmZzZXRJbk1pbGxpc2Vjb25kcyBmcm9tIFwiLi4vX2xpYi9nZXRUaW1lem9uZU9mZnNldEluTWlsbGlzZWNvbmRzL2luZGV4LmpzXCI7XG5pbXBvcnQgeyBpc1Byb3RlY3RlZERheU9mWWVhclRva2VuLCBpc1Byb3RlY3RlZFdlZWtZZWFyVG9rZW4sIHRocm93UHJvdGVjdGVkRXJyb3IgfSBmcm9tIFwiLi4vX2xpYi9wcm90ZWN0ZWRUb2tlbnMvaW5kZXguanNcIjtcbmltcG9ydCB0b0ludGVnZXIgZnJvbSBcIi4uL19saWIvdG9JbnRlZ2VyL2luZGV4LmpzXCI7XG5pbXBvcnQgcmVxdWlyZWRBcmdzIGZyb20gXCIuLi9fbGliL3JlcXVpcmVkQXJncy9pbmRleC5qc1wiO1xuaW1wb3J0IHsgZ2V0RGVmYXVsdE9wdGlvbnMgfSBmcm9tIFwiLi4vX2xpYi9kZWZhdWx0T3B0aW9ucy9pbmRleC5qc1wiO1xuaW1wb3J0IGRlZmF1bHRMb2NhbGUgZnJvbSBcIi4uL19saWIvZGVmYXVsdExvY2FsZS9pbmRleC5qc1wiOyAvLyBUaGlzIFJlZ0V4cCBjb25zaXN0cyBvZiB0aHJlZSBwYXJ0cyBzZXBhcmF0ZWQgYnkgYHxgOlxuLy8gLSBbeVlRcU1Md0lkRGVjaWhIS2ttc11vIG1hdGNoZXMgYW55IGF2YWlsYWJsZSBvcmRpbmFsIG51bWJlciB0b2tlblxuLy8gICAob25lIG9mIHRoZSBjZXJ0YWluIGxldHRlcnMgZm9sbG93ZWQgYnkgYG9gKVxuLy8gLSAoXFx3KVxcMSogbWF0Y2hlcyBhbnkgc2VxdWVuY2VzIG9mIHRoZSBzYW1lIGxldHRlclxuLy8gLSAnJyBtYXRjaGVzIHR3byBxdW90ZSBjaGFyYWN0ZXJzIGluIGEgcm93XG4vLyAtICcoJyd8W14nXSkrKCd8JCkgbWF0Y2hlcyBhbnl0aGluZyBzdXJyb3VuZGVkIGJ5IHR3byBxdW90ZSBjaGFyYWN0ZXJzICgnKSxcbi8vICAgZXhjZXB0IGEgc2luZ2xlIHF1b3RlIHN5bWJvbCwgd2hpY2ggZW5kcyB0aGUgc2VxdWVuY2UuXG4vLyAgIFR3byBxdW90ZSBjaGFyYWN0ZXJzIGRvIG5vdCBlbmQgdGhlIHNlcXVlbmNlLlxuLy8gICBJZiB0aGVyZSBpcyBubyBtYXRjaGluZyBzaW5nbGUgcXVvdGVcbi8vICAgdGhlbiB0aGUgc2VxdWVuY2Ugd2lsbCBjb250aW51ZSB1bnRpbCB0aGUgZW5kIG9mIHRoZSBzdHJpbmcuXG4vLyAtIC4gbWF0Y2hlcyBhbnkgc2luZ2xlIGNoYXJhY3RlciB1bm1hdGNoZWQgYnkgcHJldmlvdXMgcGFydHMgb2YgdGhlIFJlZ0V4cHNcbnZhciBmb3JtYXR0aW5nVG9rZW5zUmVnRXhwID0gL1t5WVFxTUx3SWREZWNpaEhLa21zXW98KFxcdylcXDEqfCcnfCcoJyd8W14nXSkrKCd8JCl8Li9nO1xuXG4vLyBUaGlzIFJlZ0V4cCBjYXRjaGVzIHN5bWJvbHMgZXNjYXBlZCBieSBxdW90ZXMsIGFuZCBhbHNvXG4vLyBzZXF1ZW5jZXMgb2Ygc3ltYm9scyBQLCBwLCBhbmQgdGhlIGNvbWJpbmF0aW9ucyBsaWtlIGBQUFBQUFBQcHBwcHBgXG52YXIgbG9uZ0Zvcm1hdHRpbmdUb2tlbnNSZWdFeHAgPSAvUCtwK3xQK3xwK3wnJ3wnKCcnfFteJ10pKygnfCQpfC4vZztcbnZhciBlc2NhcGVkU3RyaW5nUmVnRXhwID0gL14nKFteXSo/KSc/JC87XG52YXIgZG91YmxlUXVvdGVSZWdFeHAgPSAvJycvZztcbnZhciB1bmVzY2FwZWRMYXRpbkNoYXJhY3RlclJlZ0V4cCA9IC9bYS16QS1aXS87XG5cbi8qKlxuICogQG5hbWUgZm9ybWF0XG4gKiBAY2F0ZWdvcnkgQ29tbW9uIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEZvcm1hdCB0aGUgZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybiB0aGUgZm9ybWF0dGVkIGRhdGUgc3RyaW5nIGluIHRoZSBnaXZlbiBmb3JtYXQuIFRoZSByZXN1bHQgbWF5IHZhcnkgYnkgbG9jYWxlLlxuICpcbiAqID4g4pqg77iPIFBsZWFzZSBub3RlIHRoYXQgdGhlIGBmb3JtYXRgIHRva2VucyBkaWZmZXIgZnJvbSBNb21lbnQuanMgYW5kIG90aGVyIGxpYnJhcmllcy5cbiAqID4gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvZGF0ZS1mbnMvYmxvYi9tYXN0ZXIvZG9jcy91bmljb2RlVG9rZW5zLm1kXG4gKlxuICogVGhlIGNoYXJhY3RlcnMgd3JhcHBlZCBiZXR3ZWVuIHR3byBzaW5nbGUgcXVvdGVzIGNoYXJhY3RlcnMgKCcpIGFyZSBlc2NhcGVkLlxuICogVHdvIHNpbmdsZSBxdW90ZXMgaW4gYSByb3csIHdoZXRoZXIgaW5zaWRlIG9yIG91dHNpZGUgYSBxdW90ZWQgc2VxdWVuY2UsIHJlcHJlc2VudCBhICdyZWFsJyBzaW5nbGUgcXVvdGUuXG4gKiAoc2VlIHRoZSBsYXN0IGV4YW1wbGUpXG4gKlxuICogRm9ybWF0IG9mIHRoZSBzdHJpbmcgaXMgYmFzZWQgb24gVW5pY29kZSBUZWNobmljYWwgU3RhbmRhcmQgIzM1OlxuICogaHR0cHM6Ly93d3cudW5pY29kZS5vcmcvcmVwb3J0cy90cjM1L3RyMzUtZGF0ZXMuaHRtbCNEYXRlX0ZpZWxkX1N5bWJvbF9UYWJsZVxuICogd2l0aCBhIGZldyBhZGRpdGlvbnMgKHNlZSBub3RlIDcgYmVsb3cgdGhlIHRhYmxlKS5cbiAqXG4gKiBBY2NlcHRlZCBwYXR0ZXJuczpcbiAqIHwgVW5pdCAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFBhdHRlcm4gfCBSZXN1bHQgZXhhbXBsZXMgICAgICAgICAgICAgICAgICAgfCBOb3RlcyB8XG4gKiB8LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tfC0tLS0tLS0tLXwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLXwtLS0tLS0tfFxuICogfCBFcmEgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgRy4uR0dHICB8IEFELCBCQyAgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IEdHR0cgICAgfCBBbm5vIERvbWluaSwgQmVmb3JlIENocmlzdCAgICAgICAgfCAyICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBHR0dHRyAgIHwgQSwgQiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCBDYWxlbmRhciB5ZWFyICAgICAgICAgICAgICAgICAgIHwgeSAgICAgICB8IDQ0LCAxLCAxOTAwLCAyMDE3ICAgICAgICAgICAgICAgICB8IDUgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHlvICAgICAgfCA0NHRoLCAxc3QsIDB0aCwgMTd0aCAgICAgICAgICAgICAgfCA1LDcgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCB5eSAgICAgIHwgNDQsIDAxLCAwMCwgMTcgICAgICAgICAgICAgICAgICAgIHwgNSAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgeXl5ICAgICB8IDA0NCwgMDAxLCAxOTAwLCAyMDE3ICAgICAgICAgICAgICB8IDUgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHl5eXkgICAgfCAwMDQ0LCAwMDAxLCAxOTAwLCAyMDE3ICAgICAgICAgICAgfCA1ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCB5eXl5eSAgIHwgLi4uICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgMyw1ICAgfFxuICogfCBMb2NhbCB3ZWVrLW51bWJlcmluZyB5ZWFyICAgICAgIHwgWSAgICAgICB8IDQ0LCAxLCAxOTAwLCAyMDE3ICAgICAgICAgICAgICAgICB8IDUgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFlvICAgICAgfCA0NHRoLCAxc3QsIDE5MDB0aCwgMjAxN3RoICAgICAgICAgfCA1LDcgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBZWSAgICAgIHwgNDQsIDAxLCAwMCwgMTcgICAgICAgICAgICAgICAgICAgIHwgNSw4ICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgWVlZICAgICB8IDA0NCwgMDAxLCAxOTAwLCAyMDE3ICAgICAgICAgICAgICB8IDUgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFlZWVkgICAgfCAwMDQ0LCAwMDAxLCAxOTAwLCAyMDE3ICAgICAgICAgICAgfCA1LDggICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBZWVlZWSAgIHwgLi4uICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgMyw1ICAgfFxuICogfCBJU08gd2Vlay1udW1iZXJpbmcgeWVhciAgICAgICAgIHwgUiAgICAgICB8IC00MywgMCwgMSwgMTkwMCwgMjAxNyAgICAgICAgICAgICB8IDUsNyAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFJSICAgICAgfCAtNDMsIDAwLCAwMSwgMTkwMCwgMjAxNyAgICAgICAgICAgfCA1LDcgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBSUlIgICAgIHwgLTA0MywgMDAwLCAwMDEsIDE5MDAsIDIwMTcgICAgICAgIHwgNSw3ICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgUlJSUiAgICB8IC0wMDQzLCAwMDAwLCAwMDAxLCAxOTAwLCAyMDE3ICAgICB8IDUsNyAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFJSUlJSICAgfCAuLi4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAzLDUsNyB8XG4gKiB8IEV4dGVuZGVkIHllYXIgICAgICAgICAgICAgICAgICAgfCB1ICAgICAgIHwgLTQzLCAwLCAxLCAxOTAwLCAyMDE3ICAgICAgICAgICAgIHwgNSAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgdXUgICAgICB8IC00MywgMDEsIDE5MDAsIDIwMTcgICAgICAgICAgICAgICB8IDUgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHV1dSAgICAgfCAtMDQzLCAwMDEsIDE5MDAsIDIwMTcgICAgICAgICAgICAgfCA1ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCB1dXV1ICAgIHwgLTAwNDMsIDAwMDEsIDE5MDAsIDIwMTcgICAgICAgICAgIHwgNSAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgdXV1dXUgICB8IC4uLiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IDMsNSAgIHxcbiAqIHwgUXVhcnRlciAoZm9ybWF0dGluZykgICAgICAgICAgICB8IFEgICAgICAgfCAxLCAyLCAzLCA0ICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBRbyAgICAgIHwgMXN0LCAybmQsIDNyZCwgNHRoICAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgUVEgICAgICB8IDAxLCAwMiwgMDMsIDA0ICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFFRUSAgICAgfCBRMSwgUTIsIFEzLCBRNCAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBRUVFRICAgIHwgMXN0IHF1YXJ0ZXIsIDJuZCBxdWFydGVyLCAuLi4gICAgIHwgMiAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgUVFRUVEgICB8IDEsIDIsIDMsIDQgICAgICAgICAgICAgICAgICAgICAgICB8IDQgICAgIHxcbiAqIHwgUXVhcnRlciAoc3RhbmQtYWxvbmUpICAgICAgICAgICB8IHEgICAgICAgfCAxLCAyLCAzLCA0ICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBxbyAgICAgIHwgMXN0LCAybmQsIDNyZCwgNHRoICAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgcXEgICAgICB8IDAxLCAwMiwgMDMsIDA0ICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHFxcSAgICAgfCBRMSwgUTIsIFEzLCBRNCAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBxcXFxICAgIHwgMXN0IHF1YXJ0ZXIsIDJuZCBxdWFydGVyLCAuLi4gICAgIHwgMiAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgcXFxcXEgICB8IDEsIDIsIDMsIDQgICAgICAgICAgICAgICAgICAgICAgICB8IDQgICAgIHxcbiAqIHwgTW9udGggKGZvcm1hdHRpbmcpICAgICAgICAgICAgICB8IE0gICAgICAgfCAxLCAyLCAuLi4sIDEyICAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBNbyAgICAgIHwgMXN0LCAybmQsIC4uLiwgMTJ0aCAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgTU0gICAgICB8IDAxLCAwMiwgLi4uLCAxMiAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IE1NTSAgICAgfCBKYW4sIEZlYiwgLi4uLCBEZWMgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBNTU1NICAgIHwgSmFudWFyeSwgRmVicnVhcnksIC4uLiwgRGVjZW1iZXIgIHwgMiAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgTU1NTU0gICB8IEosIEYsIC4uLiwgRCAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgTW9udGggKHN0YW5kLWFsb25lKSAgICAgICAgICAgICB8IEwgICAgICAgfCAxLCAyLCAuLi4sIDEyICAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBMbyAgICAgIHwgMXN0LCAybmQsIC4uLiwgMTJ0aCAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgTEwgICAgICB8IDAxLCAwMiwgLi4uLCAxMiAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IExMTCAgICAgfCBKYW4sIEZlYiwgLi4uLCBEZWMgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBMTExMICAgIHwgSmFudWFyeSwgRmVicnVhcnksIC4uLiwgRGVjZW1iZXIgIHwgMiAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgTExMTEwgICB8IEosIEYsIC4uLiwgRCAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgTG9jYWwgd2VlayBvZiB5ZWFyICAgICAgICAgICAgICB8IHcgICAgICAgfCAxLCAyLCAuLi4sIDUzICAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCB3byAgICAgIHwgMXN0LCAybmQsIC4uLiwgNTN0aCAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgd3cgICAgICB8IDAxLCAwMiwgLi4uLCA1MyAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgSVNPIHdlZWsgb2YgeWVhciAgICAgICAgICAgICAgICB8IEkgICAgICAgfCAxLCAyLCAuLi4sIDUzICAgICAgICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBJbyAgICAgIHwgMXN0LCAybmQsIC4uLiwgNTN0aCAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgSUkgICAgICB8IDAxLCAwMiwgLi4uLCA1MyAgICAgICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgRGF5IG9mIG1vbnRoICAgICAgICAgICAgICAgICAgICB8IGQgICAgICAgfCAxLCAyLCAuLi4sIDMxICAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBkbyAgICAgIHwgMXN0LCAybmQsIC4uLiwgMzFzdCAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgZGQgICAgICB8IDAxLCAwMiwgLi4uLCAzMSAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgRGF5IG9mIHllYXIgICAgICAgICAgICAgICAgICAgICB8IEQgICAgICAgfCAxLCAyLCAuLi4sIDM2NSwgMzY2ICAgICAgICAgICAgICAgfCA5ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBEbyAgICAgIHwgMXN0LCAybmQsIC4uLiwgMzY1dGgsIDM2NnRoICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgREQgICAgICB8IDAxLCAwMiwgLi4uLCAzNjUsIDM2NiAgICAgICAgICAgICB8IDkgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IERERCAgICAgfCAwMDEsIDAwMiwgLi4uLCAzNjUsIDM2NiAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBEREREICAgIHwgLi4uICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgMyAgICAgfFxuICogfCBEYXkgb2Ygd2VlayAoZm9ybWF0dGluZykgICAgICAgIHwgRS4uRUVFICB8IE1vbiwgVHVlLCBXZWQsIC4uLiwgU3VuICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IEVFRUUgICAgfCBNb25kYXksIFR1ZXNkYXksIC4uLiwgU3VuZGF5ICAgICAgfCAyICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBFRUVFRSAgIHwgTSwgVCwgVywgVCwgRiwgUywgUyAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgRUVFRUVFICB8IE1vLCBUdSwgV2UsIFRoLCBGciwgU2EsIFN1ICAgICAgICB8ICAgICAgIHxcbiAqIHwgSVNPIGRheSBvZiB3ZWVrIChmb3JtYXR0aW5nKSAgICB8IGkgICAgICAgfCAxLCAyLCAzLCAuLi4sIDcgICAgICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBpbyAgICAgIHwgMXN0LCAybmQsIC4uLiwgN3RoICAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgaWkgICAgICB8IDAxLCAwMiwgLi4uLCAwNyAgICAgICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGlpaSAgICAgfCBNb24sIFR1ZSwgV2VkLCAuLi4sIFN1biAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBpaWlpICAgIHwgTW9uZGF5LCBUdWVzZGF5LCAuLi4sIFN1bmRheSAgICAgIHwgMiw3ICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgaWlpaWkgICB8IE0sIFQsIFcsIFQsIEYsIFMsIFMgICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGlpaWlpaSAgfCBNbywgVHUsIFdlLCBUaCwgRnIsIFNhLCBTdSAgICAgICAgfCA3ICAgICB8XG4gKiB8IExvY2FsIGRheSBvZiB3ZWVrIChmb3JtYXR0aW5nKSAgfCBlICAgICAgIHwgMiwgMywgNCwgLi4uLCAxICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgZW8gICAgICB8IDJuZCwgM3JkLCAuLi4sIDFzdCAgICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGVlICAgICAgfCAwMiwgMDMsIC4uLiwgMDEgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBlZWUgICAgIHwgTW9uLCBUdWUsIFdlZCwgLi4uLCBTdW4gICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgZWVlZSAgICB8IE1vbmRheSwgVHVlc2RheSwgLi4uLCBTdW5kYXkgICAgICB8IDIgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGVlZWVlICAgfCBNLCBULCBXLCBULCBGLCBTLCBTICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBlZWVlZWUgIHwgTW8sIFR1LCBXZSwgVGgsIEZyLCBTYSwgU3UgICAgICAgIHwgICAgICAgfFxuICogfCBMb2NhbCBkYXkgb2Ygd2VlayAoc3RhbmQtYWxvbmUpIHwgYyAgICAgICB8IDIsIDMsIDQsIC4uLiwgMSAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGNvICAgICAgfCAybmQsIDNyZCwgLi4uLCAxc3QgICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBjYyAgICAgIHwgMDIsIDAzLCAuLi4sIDAxICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgY2NjICAgICB8IE1vbiwgVHVlLCBXZWQsIC4uLiwgU3VuICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGNjY2MgICAgfCBNb25kYXksIFR1ZXNkYXksIC4uLiwgU3VuZGF5ICAgICAgfCAyICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBjY2NjYyAgIHwgTSwgVCwgVywgVCwgRiwgUywgUyAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgY2NjY2NjICB8IE1vLCBUdSwgV2UsIFRoLCBGciwgU2EsIFN1ICAgICAgICB8ICAgICAgIHxcbiAqIHwgQU0sIFBNICAgICAgICAgICAgICAgICAgICAgICAgICB8IGEuLmFhICAgfCBBTSwgUE0gICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBhYWEgICAgIHwgYW0sIHBtICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgYWFhYSAgICB8IGEubS4sIHAubS4gICAgICAgICAgICAgICAgICAgICAgICB8IDIgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGFhYWFhICAgfCBhLCBwICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8IEFNLCBQTSwgbm9vbiwgbWlkbmlnaHQgICAgICAgICAgfCBiLi5iYiAgIHwgQU0sIFBNLCBub29uLCBtaWRuaWdodCAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgYmJiICAgICB8IGFtLCBwbSwgbm9vbiwgbWlkbmlnaHQgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGJiYmIgICAgfCBhLm0uLCBwLm0uLCBub29uLCBtaWRuaWdodCAgICAgICAgfCAyICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBiYmJiYiAgIHwgYSwgcCwgbiwgbWkgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCBGbGV4aWJsZSBkYXkgcGVyaW9kICAgICAgICAgICAgIHwgQi4uQkJCICB8IGF0IG5pZ2h0LCBpbiB0aGUgbW9ybmluZywgLi4uICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IEJCQkIgICAgfCBhdCBuaWdodCwgaW4gdGhlIG1vcm5pbmcsIC4uLiAgICAgfCAyICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBCQkJCQiAgIHwgYXQgbmlnaHQsIGluIHRoZSBtb3JuaW5nLCAuLi4gICAgIHwgICAgICAgfFxuICogfCBIb3VyIFsxLTEyXSAgICAgICAgICAgICAgICAgICAgIHwgaCAgICAgICB8IDEsIDIsIC4uLiwgMTEsIDEyICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGhvICAgICAgfCAxc3QsIDJuZCwgLi4uLCAxMXRoLCAxMnRoICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBoaCAgICAgIHwgMDEsIDAyLCAuLi4sIDExLCAxMiAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCBIb3VyIFswLTIzXSAgICAgICAgICAgICAgICAgICAgIHwgSCAgICAgICB8IDAsIDEsIDIsIC4uLiwgMjMgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IEhvICAgICAgfCAwdGgsIDFzdCwgMm5kLCAuLi4sIDIzcmQgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBISCAgICAgIHwgMDAsIDAxLCAwMiwgLi4uLCAyMyAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCBIb3VyIFswLTExXSAgICAgICAgICAgICAgICAgICAgIHwgSyAgICAgICB8IDEsIDIsIC4uLiwgMTEsIDAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IEtvICAgICAgfCAxc3QsIDJuZCwgLi4uLCAxMXRoLCAwdGggICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBLSyAgICAgIHwgMDEsIDAyLCAuLi4sIDExLCAwMCAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCBIb3VyIFsxLTI0XSAgICAgICAgICAgICAgICAgICAgIHwgayAgICAgICB8IDI0LCAxLCAyLCAuLi4sIDIzICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGtvICAgICAgfCAyNHRoLCAxc3QsIDJuZCwgLi4uLCAyM3JkICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBrayAgICAgIHwgMjQsIDAxLCAwMiwgLi4uLCAyMyAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCBNaW51dGUgICAgICAgICAgICAgICAgICAgICAgICAgIHwgbSAgICAgICB8IDAsIDEsIC4uLiwgNTkgICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IG1vICAgICAgfCAwdGgsIDFzdCwgLi4uLCA1OXRoICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBtbSAgICAgIHwgMDAsIDAxLCAuLi4sIDU5ICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCBTZWNvbmQgICAgICAgICAgICAgICAgICAgICAgICAgIHwgcyAgICAgICB8IDAsIDEsIC4uLiwgNTkgICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHNvICAgICAgfCAwdGgsIDFzdCwgLi4uLCA1OXRoICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBzcyAgICAgIHwgMDAsIDAxLCAuLi4sIDU5ICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCBGcmFjdGlvbiBvZiBzZWNvbmQgICAgICAgICAgICAgIHwgUyAgICAgICB8IDAsIDEsIC4uLiwgOSAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFNTICAgICAgfCAwMCwgMDEsIC4uLiwgOTkgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBTU1MgICAgIHwgMDAwLCAwMDEsIC4uLiwgOTk5ICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgU1NTUyAgICB8IC4uLiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IDMgICAgIHxcbiAqIHwgVGltZXpvbmUgKElTTy04NjAxIHcvIFopICAgICAgICB8IFggICAgICAgfCAtMDgsICswNTMwLCBaICAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBYWCAgICAgIHwgLTA4MDAsICswNTMwLCBaICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgWFhYICAgICB8IC0wODowMCwgKzA1OjMwLCBaICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFhYWFggICAgfCAtMDgwMCwgKzA1MzAsIFosICsxMjM0NTYgICAgICAgICAgfCAyICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBYWFhYWCAgIHwgLTA4OjAwLCArMDU6MzAsIFosICsxMjozNDo1NiAgICAgIHwgICAgICAgfFxuICogfCBUaW1lem9uZSAoSVNPLTg2MDEgdy9vIFopICAgICAgIHwgeCAgICAgICB8IC0wOCwgKzA1MzAsICswMCAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHh4ICAgICAgfCAtMDgwMCwgKzA1MzAsICswMDAwICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCB4eHggICAgIHwgLTA4OjAwLCArMDU6MzAsICswMDowMCAgICAgICAgICAgIHwgMiAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgeHh4eCAgICB8IC0wODAwLCArMDUzMCwgKzAwMDAsICsxMjM0NTYgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHh4eHh4ICAgfCAtMDg6MDAsICswNTozMCwgKzAwOjAwLCArMTI6MzQ6NTYgfCAgICAgICB8XG4gKiB8IFRpbWV6b25lIChHTVQpICAgICAgICAgICAgICAgICAgfCBPLi4uT09PIHwgR01ULTgsIEdNVCs1OjMwLCBHTVQrMCAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgT09PTyAgICB8IEdNVC0wODowMCwgR01UKzA1OjMwLCBHTVQrMDA6MDAgICB8IDIgICAgIHxcbiAqIHwgVGltZXpvbmUgKHNwZWNpZmljIG5vbi1sb2NhdC4pICB8IHouLi56enogfCBHTVQtOCwgR01UKzU6MzAsIEdNVCswICAgICAgICAgICAgfCA2ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCB6enp6ICAgIHwgR01ULTA4OjAwLCBHTVQrMDU6MzAsIEdNVCswMDowMCAgIHwgMiw2ICAgfFxuICogfCBTZWNvbmRzIHRpbWVzdGFtcCAgICAgICAgICAgICAgIHwgdCAgICAgICB8IDUxMjk2OTUyMCAgICAgICAgICAgICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHR0ICAgICAgfCAuLi4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAzLDcgICB8XG4gKiB8IE1pbGxpc2Vjb25kcyB0aW1lc3RhbXAgICAgICAgICAgfCBUICAgICAgIHwgNTEyOTY5NTIwOTAwICAgICAgICAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgVFQgICAgICB8IC4uLiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IDMsNyAgIHxcbiAqIHwgTG9uZyBsb2NhbGl6ZWQgZGF0ZSAgICAgICAgICAgICB8IFAgICAgICAgfCAwNC8yOS8xNDUzICAgICAgICAgICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBQUCAgICAgIHwgQXByIDI5LCAxNDUzICAgICAgICAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgUFBQICAgICB8IEFwcmlsIDI5dGgsIDE0NTMgICAgICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFBQUFAgICAgfCBGcmlkYXksIEFwcmlsIDI5dGgsIDE0NTMgICAgICAgICAgfCAyLDcgICB8XG4gKiB8IExvbmcgbG9jYWxpemVkIHRpbWUgICAgICAgICAgICAgfCBwICAgICAgIHwgMTI6MDAgQU0gICAgICAgICAgICAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgcHAgICAgICB8IDEyOjAwOjAwIEFNICAgICAgICAgICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHBwcCAgICAgfCAxMjowMDowMCBBTSBHTVQrMiAgICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBwcHBwICAgIHwgMTI6MDA6MDAgQU0gR01UKzAyOjAwICAgICAgICAgICAgIHwgMiw3ICAgfFxuICogfCBDb21iaW5hdGlvbiBvZiBkYXRlIGFuZCB0aW1lICAgIHwgUHAgICAgICB8IDA0LzI5LzE0NTMsIDEyOjAwIEFNICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFBQcHAgICAgfCBBcHIgMjksIDE0NTMsIDEyOjAwOjAwIEFNICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBQUFBwcHAgIHwgQXByaWwgMjl0aCwgMTQ1MyBhdCAuLi4gICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgUFBQUHBwcHB8IEZyaWRheSwgQXByaWwgMjl0aCwgMTQ1MyBhdCAuLi4gICB8IDIsNyAgIHxcbiAqIE5vdGVzOlxuICogMS4gXCJGb3JtYXR0aW5nXCIgdW5pdHMgKGUuZy4gZm9ybWF0dGluZyBxdWFydGVyKSBpbiB0aGUgZGVmYXVsdCBlbi1VUyBsb2NhbGVcbiAqICAgIGFyZSB0aGUgc2FtZSBhcyBcInN0YW5kLWFsb25lXCIgdW5pdHMsIGJ1dCBhcmUgZGlmZmVyZW50IGluIHNvbWUgbGFuZ3VhZ2VzLlxuICogICAgXCJGb3JtYXR0aW5nXCIgdW5pdHMgYXJlIGRlY2xpbmVkIGFjY29yZGluZyB0byB0aGUgcnVsZXMgb2YgdGhlIGxhbmd1YWdlXG4gKiAgICBpbiB0aGUgY29udGV4dCBvZiBhIGRhdGUuIFwiU3RhbmQtYWxvbmVcIiB1bml0cyBhcmUgYWx3YXlzIG5vbWluYXRpdmUgc2luZ3VsYXI6XG4gKlxuICogICAgYGZvcm1hdChuZXcgRGF0ZSgyMDE3LCAxMCwgNiksICdkbyBMTExMJywge2xvY2FsZTogY3N9KSAvLz0+ICc2LiBsaXN0b3BhZCdgXG4gKlxuICogICAgYGZvcm1hdChuZXcgRGF0ZSgyMDE3LCAxMCwgNiksICdkbyBNTU1NJywge2xvY2FsZTogY3N9KSAvLz0+ICc2LiBsaXN0b3BhZHUnYFxuICpcbiAqIDIuIEFueSBzZXF1ZW5jZSBvZiB0aGUgaWRlbnRpY2FsIGxldHRlcnMgaXMgYSBwYXR0ZXJuLCB1bmxlc3MgaXQgaXMgZXNjYXBlZCBieVxuICogICAgdGhlIHNpbmdsZSBxdW90ZSBjaGFyYWN0ZXJzIChzZWUgYmVsb3cpLlxuICogICAgSWYgdGhlIHNlcXVlbmNlIGlzIGxvbmdlciB0aGFuIGxpc3RlZCBpbiB0YWJsZSAoZS5nLiBgRUVFRUVFRUVFRUVgKVxuICogICAgdGhlIG91dHB1dCB3aWxsIGJlIHRoZSBzYW1lIGFzIGRlZmF1bHQgcGF0dGVybiBmb3IgdGhpcyB1bml0LCB1c3VhbGx5XG4gKiAgICB0aGUgbG9uZ2VzdCBvbmUgKGluIGNhc2Ugb2YgSVNPIHdlZWtkYXlzLCBgRUVFRWApLiBEZWZhdWx0IHBhdHRlcm5zIGZvciB1bml0c1xuICogICAgYXJlIG1hcmtlZCB3aXRoIFwiMlwiIGluIHRoZSBsYXN0IGNvbHVtbiBvZiB0aGUgdGFibGUuXG4gKlxuICogICAgYGZvcm1hdChuZXcgRGF0ZSgyMDE3LCAxMCwgNiksICdNTU0nKSAvLz0+ICdOb3YnYFxuICpcbiAqICAgIGBmb3JtYXQobmV3IERhdGUoMjAxNywgMTAsIDYpLCAnTU1NTScpIC8vPT4gJ05vdmVtYmVyJ2BcbiAqXG4gKiAgICBgZm9ybWF0KG5ldyBEYXRlKDIwMTcsIDEwLCA2KSwgJ01NTU1NJykgLy89PiAnTidgXG4gKlxuICogICAgYGZvcm1hdChuZXcgRGF0ZSgyMDE3LCAxMCwgNiksICdNTU1NTU0nKSAvLz0+ICdOb3ZlbWJlcidgXG4gKlxuICogICAgYGZvcm1hdChuZXcgRGF0ZSgyMDE3LCAxMCwgNiksICdNTU1NTU1NJykgLy89PiAnTm92ZW1iZXInYFxuICpcbiAqIDMuIFNvbWUgcGF0dGVybnMgY291bGQgYmUgdW5saW1pdGVkIGxlbmd0aCAoc3VjaCBhcyBgeXl5eXl5eXlgKS5cbiAqICAgIFRoZSBvdXRwdXQgd2lsbCBiZSBwYWRkZWQgd2l0aCB6ZXJvcyB0byBtYXRjaCB0aGUgbGVuZ3RoIG9mIHRoZSBwYXR0ZXJuLlxuICpcbiAqICAgIGBmb3JtYXQobmV3IERhdGUoMjAxNywgMTAsIDYpLCAneXl5eXl5eXknKSAvLz0+ICcwMDAwMjAxNydgXG4gKlxuICogNC4gYFFRUVFRYCBhbmQgYHFxcXFxYCBjb3VsZCBiZSBub3Qgc3RyaWN0bHkgbnVtZXJpY2FsIGluIHNvbWUgbG9jYWxlcy5cbiAqICAgIFRoZXNlIHRva2VucyByZXByZXNlbnQgdGhlIHNob3J0ZXN0IGZvcm0gb2YgdGhlIHF1YXJ0ZXIuXG4gKlxuICogNS4gVGhlIG1haW4gZGlmZmVyZW5jZSBiZXR3ZWVuIGB5YCBhbmQgYHVgIHBhdHRlcm5zIGFyZSBCLkMuIHllYXJzOlxuICpcbiAqICAgIHwgWWVhciB8IGB5YCB8IGB1YCB8XG4gKiAgICB8LS0tLS0tfC0tLS0tfC0tLS0tfFxuICogICAgfCBBQyAxIHwgICAxIHwgICAxIHxcbiAqICAgIHwgQkMgMSB8ICAgMSB8ICAgMCB8XG4gKiAgICB8IEJDIDIgfCAgIDIgfCAgLTEgfFxuICpcbiAqICAgIEFsc28gYHl5YCBhbHdheXMgcmV0dXJucyB0aGUgbGFzdCB0d28gZGlnaXRzIG9mIGEgeWVhcixcbiAqICAgIHdoaWxlIGB1dWAgcGFkcyBzaW5nbGUgZGlnaXQgeWVhcnMgdG8gMiBjaGFyYWN0ZXJzIGFuZCByZXR1cm5zIG90aGVyIHllYXJzIHVuY2hhbmdlZDpcbiAqXG4gKiAgICB8IFllYXIgfCBgeXlgIHwgYHV1YCB8XG4gKiAgICB8LS0tLS0tfC0tLS0tLXwtLS0tLS18XG4gKiAgICB8IDEgICAgfCAgIDAxIHwgICAwMSB8XG4gKiAgICB8IDE0ICAgfCAgIDE0IHwgICAxNCB8XG4gKiAgICB8IDM3NiAgfCAgIDc2IHwgIDM3NiB8XG4gKiAgICB8IDE0NTMgfCAgIDUzIHwgMTQ1MyB8XG4gKlxuICogICAgVGhlIHNhbWUgZGlmZmVyZW5jZSBpcyB0cnVlIGZvciBsb2NhbCBhbmQgSVNPIHdlZWstbnVtYmVyaW5nIHllYXJzIChgWWAgYW5kIGBSYCksXG4gKiAgICBleGNlcHQgbG9jYWwgd2Vlay1udW1iZXJpbmcgeWVhcnMgYXJlIGRlcGVuZGVudCBvbiBgb3B0aW9ucy53ZWVrU3RhcnRzT25gXG4gKiAgICBhbmQgYG9wdGlvbnMuZmlyc3RXZWVrQ29udGFpbnNEYXRlYCAoY29tcGFyZSBbZ2V0SVNPV2Vla1llYXJde0BsaW5rIGh0dHBzOi8vZGF0ZS1mbnMub3JnL2RvY3MvZ2V0SVNPV2Vla1llYXJ9XG4gKiAgICBhbmQgW2dldFdlZWtZZWFyXXtAbGluayBodHRwczovL2RhdGUtZm5zLm9yZy9kb2NzL2dldFdlZWtZZWFyfSkuXG4gKlxuICogNi4gU3BlY2lmaWMgbm9uLWxvY2F0aW9uIHRpbWV6b25lcyBhcmUgY3VycmVudGx5IHVuYXZhaWxhYmxlIGluIGBkYXRlLWZuc2AsXG4gKiAgICBzbyByaWdodCBub3cgdGhlc2UgdG9rZW5zIGZhbGwgYmFjayB0byBHTVQgdGltZXpvbmVzLlxuICpcbiAqIDcuIFRoZXNlIHBhdHRlcm5zIGFyZSBub3QgaW4gdGhlIFVuaWNvZGUgVGVjaG5pY2FsIFN0YW5kYXJkICMzNTpcbiAqICAgIC0gYGlgOiBJU08gZGF5IG9mIHdlZWtcbiAqICAgIC0gYElgOiBJU08gd2VlayBvZiB5ZWFyXG4gKiAgICAtIGBSYDogSVNPIHdlZWstbnVtYmVyaW5nIHllYXJcbiAqICAgIC0gYHRgOiBzZWNvbmRzIHRpbWVzdGFtcFxuICogICAgLSBgVGA6IG1pbGxpc2Vjb25kcyB0aW1lc3RhbXBcbiAqICAgIC0gYG9gOiBvcmRpbmFsIG51bWJlciBtb2RpZmllclxuICogICAgLSBgUGA6IGxvbmcgbG9jYWxpemVkIGRhdGVcbiAqICAgIC0gYHBgOiBsb25nIGxvY2FsaXplZCB0aW1lXG4gKlxuICogOC4gYFlZYCBhbmQgYFlZWVlgIHRva2VucyByZXByZXNlbnQgd2Vlay1udW1iZXJpbmcgeWVhcnMgYnV0IHRoZXkgYXJlIG9mdGVuIGNvbmZ1c2VkIHdpdGggeWVhcnMuXG4gKiAgICBZb3Ugc2hvdWxkIGVuYWJsZSBgb3B0aW9ucy51c2VBZGRpdGlvbmFsV2Vla1llYXJUb2tlbnNgIHRvIHVzZSB0aGVtLiBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy9kYXRlLWZucy9ibG9iL21hc3Rlci9kb2NzL3VuaWNvZGVUb2tlbnMubWRcbiAqXG4gKiA5LiBgRGAgYW5kIGBERGAgdG9rZW5zIHJlcHJlc2VudCBkYXlzIG9mIHRoZSB5ZWFyIGJ1dCB0aGV5IGFyZSBvZnRlbiBjb25mdXNlZCB3aXRoIGRheXMgb2YgdGhlIG1vbnRoLlxuICogICAgWW91IHNob3VsZCBlbmFibGUgYG9wdGlvbnMudXNlQWRkaXRpb25hbERheU9mWWVhclRva2Vuc2AgdG8gdXNlIHRoZW0uIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL2RhdGUtZm5zL2Jsb2IvbWFzdGVyL2RvY3MvdW5pY29kZVRva2Vucy5tZFxuICpcbiAqIEBwYXJhbSB7RGF0ZXxOdW1iZXJ9IGRhdGUgLSB0aGUgb3JpZ2luYWwgZGF0ZVxuICogQHBhcmFtIHtTdHJpbmd9IGZvcm1hdCAtIHRoZSBzdHJpbmcgb2YgdG9rZW5zXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gYW4gb2JqZWN0IHdpdGggb3B0aW9ucy5cbiAqIEBwYXJhbSB7TG9jYWxlfSBbb3B0aW9ucy5sb2NhbGU9ZGVmYXVsdExvY2FsZV0gLSB0aGUgbG9jYWxlIG9iamVjdC4gU2VlIFtMb2NhbGVde0BsaW5rIGh0dHBzOi8vZGF0ZS1mbnMub3JnL2RvY3MvTG9jYWxlfVxuICogQHBhcmFtIHswfDF8MnwzfDR8NXw2fSBbb3B0aW9ucy53ZWVrU3RhcnRzT249MF0gLSB0aGUgaW5kZXggb2YgdGhlIGZpcnN0IGRheSBvZiB0aGUgd2VlayAoMCAtIFN1bmRheSlcbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5maXJzdFdlZWtDb250YWluc0RhdGU9MV0gLSB0aGUgZGF5IG9mIEphbnVhcnksIHdoaWNoIGlzXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLnVzZUFkZGl0aW9uYWxXZWVrWWVhclRva2Vucz1mYWxzZV0gLSBpZiB0cnVlLCBhbGxvd3MgdXNhZ2Ugb2YgdGhlIHdlZWstbnVtYmVyaW5nIHllYXIgdG9rZW5zIGBZWWAgYW5kIGBZWVlZYDtcbiAqICAgc2VlOiBodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvZGF0ZS1mbnMvYmxvYi9tYXN0ZXIvZG9jcy91bmljb2RlVG9rZW5zLm1kXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLnVzZUFkZGl0aW9uYWxEYXlPZlllYXJUb2tlbnM9ZmFsc2VdIC0gaWYgdHJ1ZSwgYWxsb3dzIHVzYWdlIG9mIHRoZSBkYXkgb2YgeWVhciB0b2tlbnMgYERgIGFuZCBgRERgO1xuICogICBzZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy9kYXRlLWZucy9ibG9iL21hc3Rlci9kb2NzL3VuaWNvZGVUb2tlbnMubWRcbiAqIEByZXR1cm5zIHtTdHJpbmd9IHRoZSBmb3JtYXR0ZWQgZGF0ZSBzdHJpbmdcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gMiBhcmd1bWVudHMgcmVxdWlyZWRcbiAqIEB0aHJvd3Mge1JhbmdlRXJyb3J9IGBkYXRlYCBtdXN0IG5vdCBiZSBJbnZhbGlkIERhdGVcbiAqIEB0aHJvd3Mge1JhbmdlRXJyb3J9IGBvcHRpb25zLmxvY2FsZWAgbXVzdCBjb250YWluIGBsb2NhbGl6ZWAgcHJvcGVydHlcbiAqIEB0aHJvd3Mge1JhbmdlRXJyb3J9IGBvcHRpb25zLmxvY2FsZWAgbXVzdCBjb250YWluIGBmb3JtYXRMb25nYCBwcm9wZXJ0eVxuICogQHRocm93cyB7UmFuZ2VFcnJvcn0gYG9wdGlvbnMud2Vla1N0YXJ0c09uYCBtdXN0IGJlIGJldHdlZW4gMCBhbmQgNlxuICogQHRocm93cyB7UmFuZ2VFcnJvcn0gYG9wdGlvbnMuZmlyc3RXZWVrQ29udGFpbnNEYXRlYCBtdXN0IGJlIGJldHdlZW4gMSBhbmQgN1xuICogQHRocm93cyB7UmFuZ2VFcnJvcn0gdXNlIGB5eXl5YCBpbnN0ZWFkIG9mIGBZWVlZYCBmb3IgZm9ybWF0dGluZyB5ZWFycyB1c2luZyBbZm9ybWF0IHByb3ZpZGVkXSB0byB0aGUgaW5wdXQgW2lucHV0IHByb3ZpZGVkXTsgc2VlOiBodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvZGF0ZS1mbnMvYmxvYi9tYXN0ZXIvZG9jcy91bmljb2RlVG9rZW5zLm1kXG4gKiBAdGhyb3dzIHtSYW5nZUVycm9yfSB1c2UgYHl5YCBpbnN0ZWFkIG9mIGBZWWAgZm9yIGZvcm1hdHRpbmcgeWVhcnMgdXNpbmcgW2Zvcm1hdCBwcm92aWRlZF0gdG8gdGhlIGlucHV0IFtpbnB1dCBwcm92aWRlZF07IHNlZTogaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL2RhdGUtZm5zL2Jsb2IvbWFzdGVyL2RvY3MvdW5pY29kZVRva2Vucy5tZFxuICogQHRocm93cyB7UmFuZ2VFcnJvcn0gdXNlIGBkYCBpbnN0ZWFkIG9mIGBEYCBmb3IgZm9ybWF0dGluZyBkYXlzIG9mIHRoZSBtb250aCB1c2luZyBbZm9ybWF0IHByb3ZpZGVkXSB0byB0aGUgaW5wdXQgW2lucHV0IHByb3ZpZGVkXTsgc2VlOiBodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvZGF0ZS1mbnMvYmxvYi9tYXN0ZXIvZG9jcy91bmljb2RlVG9rZW5zLm1kXG4gKiBAdGhyb3dzIHtSYW5nZUVycm9yfSB1c2UgYGRkYCBpbnN0ZWFkIG9mIGBERGAgZm9yIGZvcm1hdHRpbmcgZGF5cyBvZiB0aGUgbW9udGggdXNpbmcgW2Zvcm1hdCBwcm92aWRlZF0gdG8gdGhlIGlucHV0IFtpbnB1dCBwcm92aWRlZF07IHNlZTogaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL2RhdGUtZm5zL2Jsb2IvbWFzdGVyL2RvY3MvdW5pY29kZVRva2Vucy5tZFxuICogQHRocm93cyB7UmFuZ2VFcnJvcn0gZm9ybWF0IHN0cmluZyBjb250YWlucyBhbiB1bmVzY2FwZWQgbGF0aW4gYWxwaGFiZXQgY2hhcmFjdGVyXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFJlcHJlc2VudCAxMSBGZWJydWFyeSAyMDE0IGluIG1pZGRsZS1lbmRpYW4gZm9ybWF0OlxuICogY29uc3QgcmVzdWx0ID0gZm9ybWF0KG5ldyBEYXRlKDIwMTQsIDEsIDExKSwgJ01NL2RkL3l5eXknKVxuICogLy89PiAnMDIvMTEvMjAxNCdcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gUmVwcmVzZW50IDIgSnVseSAyMDE0IGluIEVzcGVyYW50bzpcbiAqIGltcG9ydCB7IGVvTG9jYWxlIH0gZnJvbSAnZGF0ZS1mbnMvbG9jYWxlL2VvJ1xuICogY29uc3QgcmVzdWx0ID0gZm9ybWF0KG5ldyBEYXRlKDIwMTQsIDYsIDIpLCBcImRvICdkZScgTU1NTSB5eXl5XCIsIHtcbiAqICAgbG9jYWxlOiBlb0xvY2FsZVxuICogfSlcbiAqIC8vPT4gJzItYSBkZSBqdWxpbyAyMDE0J1xuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBFc2NhcGUgc3RyaW5nIGJ5IHNpbmdsZSBxdW90ZSBjaGFyYWN0ZXJzOlxuICogY29uc3QgcmVzdWx0ID0gZm9ybWF0KG5ldyBEYXRlKDIwMTQsIDYsIDIsIDE1KSwgXCJoICdvJydjbG9jaydcIilcbiAqIC8vPT4gXCIzIG8nY2xvY2tcIlxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGZvcm1hdChkaXJ0eURhdGUsIGRpcnR5Rm9ybWF0U3RyLCBvcHRpb25zKSB7XG4gIHZhciBfcmVmLCBfb3B0aW9ucyRsb2NhbGUsIF9yZWYyLCBfcmVmMywgX3JlZjQsIF9vcHRpb25zJGZpcnN0V2Vla0NvbiwgX29wdGlvbnMkbG9jYWxlMiwgX29wdGlvbnMkbG9jYWxlMiRvcHRpLCBfZGVmYXVsdE9wdGlvbnMkbG9jYWwsIF9kZWZhdWx0T3B0aW9ucyRsb2NhbDIsIF9yZWY1LCBfcmVmNiwgX3JlZjcsIF9vcHRpb25zJHdlZWtTdGFydHNPbiwgX29wdGlvbnMkbG9jYWxlMywgX29wdGlvbnMkbG9jYWxlMyRvcHRpLCBfZGVmYXVsdE9wdGlvbnMkbG9jYWwzLCBfZGVmYXVsdE9wdGlvbnMkbG9jYWw0O1xuICByZXF1aXJlZEFyZ3MoMiwgYXJndW1lbnRzKTtcbiAgdmFyIGZvcm1hdFN0ciA9IFN0cmluZyhkaXJ0eUZvcm1hdFN0cik7XG4gIHZhciBkZWZhdWx0T3B0aW9ucyA9IGdldERlZmF1bHRPcHRpb25zKCk7XG4gIHZhciBsb2NhbGUgPSAoX3JlZiA9IChfb3B0aW9ucyRsb2NhbGUgPSBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMubG9jYWxlKSAhPT0gbnVsbCAmJiBfb3B0aW9ucyRsb2NhbGUgIT09IHZvaWQgMCA/IF9vcHRpb25zJGxvY2FsZSA6IGRlZmF1bHRPcHRpb25zLmxvY2FsZSkgIT09IG51bGwgJiYgX3JlZiAhPT0gdm9pZCAwID8gX3JlZiA6IGRlZmF1bHRMb2NhbGU7XG4gIHZhciBmaXJzdFdlZWtDb250YWluc0RhdGUgPSB0b0ludGVnZXIoKF9yZWYyID0gKF9yZWYzID0gKF9yZWY0ID0gKF9vcHRpb25zJGZpcnN0V2Vla0NvbiA9IG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5maXJzdFdlZWtDb250YWluc0RhdGUpICE9PSBudWxsICYmIF9vcHRpb25zJGZpcnN0V2Vla0NvbiAhPT0gdm9pZCAwID8gX29wdGlvbnMkZmlyc3RXZWVrQ29uIDogb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiAoX29wdGlvbnMkbG9jYWxlMiA9IG9wdGlvbnMubG9jYWxlKSA9PT0gbnVsbCB8fCBfb3B0aW9ucyRsb2NhbGUyID09PSB2b2lkIDAgPyB2b2lkIDAgOiAoX29wdGlvbnMkbG9jYWxlMiRvcHRpID0gX29wdGlvbnMkbG9jYWxlMi5vcHRpb25zKSA9PT0gbnVsbCB8fCBfb3B0aW9ucyRsb2NhbGUyJG9wdGkgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9vcHRpb25zJGxvY2FsZTIkb3B0aS5maXJzdFdlZWtDb250YWluc0RhdGUpICE9PSBudWxsICYmIF9yZWY0ICE9PSB2b2lkIDAgPyBfcmVmNCA6IGRlZmF1bHRPcHRpb25zLmZpcnN0V2Vla0NvbnRhaW5zRGF0ZSkgIT09IG51bGwgJiYgX3JlZjMgIT09IHZvaWQgMCA/IF9yZWYzIDogKF9kZWZhdWx0T3B0aW9ucyRsb2NhbCA9IGRlZmF1bHRPcHRpb25zLmxvY2FsZSkgPT09IG51bGwgfHwgX2RlZmF1bHRPcHRpb25zJGxvY2FsID09PSB2b2lkIDAgPyB2b2lkIDAgOiAoX2RlZmF1bHRPcHRpb25zJGxvY2FsMiA9IF9kZWZhdWx0T3B0aW9ucyRsb2NhbC5vcHRpb25zKSA9PT0gbnVsbCB8fCBfZGVmYXVsdE9wdGlvbnMkbG9jYWwyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZGVmYXVsdE9wdGlvbnMkbG9jYWwyLmZpcnN0V2Vla0NvbnRhaW5zRGF0ZSkgIT09IG51bGwgJiYgX3JlZjIgIT09IHZvaWQgMCA/IF9yZWYyIDogMSk7XG5cbiAgLy8gVGVzdCBpZiB3ZWVrU3RhcnRzT24gaXMgYmV0d2VlbiAxIGFuZCA3IF9hbmRfIGlzIG5vdCBOYU5cbiAgaWYgKCEoZmlyc3RXZWVrQ29udGFpbnNEYXRlID49IDEgJiYgZmlyc3RXZWVrQ29udGFpbnNEYXRlIDw9IDcpKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ2ZpcnN0V2Vla0NvbnRhaW5zRGF0ZSBtdXN0IGJlIGJldHdlZW4gMSBhbmQgNyBpbmNsdXNpdmVseScpO1xuICB9XG4gIHZhciB3ZWVrU3RhcnRzT24gPSB0b0ludGVnZXIoKF9yZWY1ID0gKF9yZWY2ID0gKF9yZWY3ID0gKF9vcHRpb25zJHdlZWtTdGFydHNPbiA9IG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy53ZWVrU3RhcnRzT24pICE9PSBudWxsICYmIF9vcHRpb25zJHdlZWtTdGFydHNPbiAhPT0gdm9pZCAwID8gX29wdGlvbnMkd2Vla1N0YXJ0c09uIDogb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiAoX29wdGlvbnMkbG9jYWxlMyA9IG9wdGlvbnMubG9jYWxlKSA9PT0gbnVsbCB8fCBfb3B0aW9ucyRsb2NhbGUzID09PSB2b2lkIDAgPyB2b2lkIDAgOiAoX29wdGlvbnMkbG9jYWxlMyRvcHRpID0gX29wdGlvbnMkbG9jYWxlMy5vcHRpb25zKSA9PT0gbnVsbCB8fCBfb3B0aW9ucyRsb2NhbGUzJG9wdGkgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9vcHRpb25zJGxvY2FsZTMkb3B0aS53ZWVrU3RhcnRzT24pICE9PSBudWxsICYmIF9yZWY3ICE9PSB2b2lkIDAgPyBfcmVmNyA6IGRlZmF1bHRPcHRpb25zLndlZWtTdGFydHNPbikgIT09IG51bGwgJiYgX3JlZjYgIT09IHZvaWQgMCA/IF9yZWY2IDogKF9kZWZhdWx0T3B0aW9ucyRsb2NhbDMgPSBkZWZhdWx0T3B0aW9ucy5sb2NhbGUpID09PSBudWxsIHx8IF9kZWZhdWx0T3B0aW9ucyRsb2NhbDMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IChfZGVmYXVsdE9wdGlvbnMkbG9jYWw0ID0gX2RlZmF1bHRPcHRpb25zJGxvY2FsMy5vcHRpb25zKSA9PT0gbnVsbCB8fCBfZGVmYXVsdE9wdGlvbnMkbG9jYWw0ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZGVmYXVsdE9wdGlvbnMkbG9jYWw0LndlZWtTdGFydHNPbikgIT09IG51bGwgJiYgX3JlZjUgIT09IHZvaWQgMCA/IF9yZWY1IDogMCk7XG5cbiAgLy8gVGVzdCBpZiB3ZWVrU3RhcnRzT24gaXMgYmV0d2VlbiAwIGFuZCA2IF9hbmRfIGlzIG5vdCBOYU5cbiAgaWYgKCEod2Vla1N0YXJ0c09uID49IDAgJiYgd2Vla1N0YXJ0c09uIDw9IDYpKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ3dlZWtTdGFydHNPbiBtdXN0IGJlIGJldHdlZW4gMCBhbmQgNiBpbmNsdXNpdmVseScpO1xuICB9XG4gIGlmICghbG9jYWxlLmxvY2FsaXplKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ2xvY2FsZSBtdXN0IGNvbnRhaW4gbG9jYWxpemUgcHJvcGVydHknKTtcbiAgfVxuICBpZiAoIWxvY2FsZS5mb3JtYXRMb25nKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ2xvY2FsZSBtdXN0IGNvbnRhaW4gZm9ybWF0TG9uZyBwcm9wZXJ0eScpO1xuICB9XG4gIHZhciBvcmlnaW5hbERhdGUgPSB0b0RhdGUoZGlydHlEYXRlKTtcbiAgaWYgKCFpc1ZhbGlkKG9yaWdpbmFsRGF0ZSkpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW52YWxpZCB0aW1lIHZhbHVlJyk7XG4gIH1cblxuICAvLyBDb252ZXJ0IHRoZSBkYXRlIGluIHN5c3RlbSB0aW1lem9uZSB0byB0aGUgc2FtZSBkYXRlIGluIFVUQyswMDowMCB0aW1lem9uZS5cbiAgLy8gVGhpcyBlbnN1cmVzIHRoYXQgd2hlbiBVVEMgZnVuY3Rpb25zIHdpbGwgYmUgaW1wbGVtZW50ZWQsIGxvY2FsZXMgd2lsbCBiZSBjb21wYXRpYmxlIHdpdGggdGhlbS5cbiAgLy8gU2VlIGFuIGlzc3VlIGFib3V0IFVUQyBmdW5jdGlvbnM6IGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy9kYXRlLWZucy9pc3N1ZXMvMzc2XG4gIHZhciB0aW1lem9uZU9mZnNldCA9IGdldFRpbWV6b25lT2Zmc2V0SW5NaWxsaXNlY29uZHMob3JpZ2luYWxEYXRlKTtcbiAgdmFyIHV0Y0RhdGUgPSBzdWJNaWxsaXNlY29uZHMob3JpZ2luYWxEYXRlLCB0aW1lem9uZU9mZnNldCk7XG4gIHZhciBmb3JtYXR0ZXJPcHRpb25zID0ge1xuICAgIGZpcnN0V2Vla0NvbnRhaW5zRGF0ZTogZmlyc3RXZWVrQ29udGFpbnNEYXRlLFxuICAgIHdlZWtTdGFydHNPbjogd2Vla1N0YXJ0c09uLFxuICAgIGxvY2FsZTogbG9jYWxlLFxuICAgIF9vcmlnaW5hbERhdGU6IG9yaWdpbmFsRGF0ZVxuICB9O1xuICB2YXIgcmVzdWx0ID0gZm9ybWF0U3RyLm1hdGNoKGxvbmdGb3JtYXR0aW5nVG9rZW5zUmVnRXhwKS5tYXAoZnVuY3Rpb24gKHN1YnN0cmluZykge1xuICAgIHZhciBmaXJzdENoYXJhY3RlciA9IHN1YnN0cmluZ1swXTtcbiAgICBpZiAoZmlyc3RDaGFyYWN0ZXIgPT09ICdwJyB8fCBmaXJzdENoYXJhY3RlciA9PT0gJ1AnKSB7XG4gICAgICB2YXIgbG9uZ0Zvcm1hdHRlciA9IGxvbmdGb3JtYXR0ZXJzW2ZpcnN0Q2hhcmFjdGVyXTtcbiAgICAgIHJldHVybiBsb25nRm9ybWF0dGVyKHN1YnN0cmluZywgbG9jYWxlLmZvcm1hdExvbmcpO1xuICAgIH1cbiAgICByZXR1cm4gc3Vic3RyaW5nO1xuICB9KS5qb2luKCcnKS5tYXRjaChmb3JtYXR0aW5nVG9rZW5zUmVnRXhwKS5tYXAoZnVuY3Rpb24gKHN1YnN0cmluZykge1xuICAgIC8vIFJlcGxhY2UgdHdvIHNpbmdsZSBxdW90ZSBjaGFyYWN0ZXJzIHdpdGggb25lIHNpbmdsZSBxdW90ZSBjaGFyYWN0ZXJcbiAgICBpZiAoc3Vic3RyaW5nID09PSBcIicnXCIpIHtcbiAgICAgIHJldHVybiBcIidcIjtcbiAgICB9XG4gICAgdmFyIGZpcnN0Q2hhcmFjdGVyID0gc3Vic3RyaW5nWzBdO1xuICAgIGlmIChmaXJzdENoYXJhY3RlciA9PT0gXCInXCIpIHtcbiAgICAgIHJldHVybiBjbGVhbkVzY2FwZWRTdHJpbmcoc3Vic3RyaW5nKTtcbiAgICB9XG4gICAgdmFyIGZvcm1hdHRlciA9IGZvcm1hdHRlcnNbZmlyc3RDaGFyYWN0ZXJdO1xuICAgIGlmIChmb3JtYXR0ZXIpIHtcbiAgICAgIGlmICghKG9wdGlvbnMgIT09IG51bGwgJiYgb3B0aW9ucyAhPT0gdm9pZCAwICYmIG9wdGlvbnMudXNlQWRkaXRpb25hbFdlZWtZZWFyVG9rZW5zKSAmJiBpc1Byb3RlY3RlZFdlZWtZZWFyVG9rZW4oc3Vic3RyaW5nKSkge1xuICAgICAgICB0aHJvd1Byb3RlY3RlZEVycm9yKHN1YnN0cmluZywgZGlydHlGb3JtYXRTdHIsIFN0cmluZyhkaXJ0eURhdGUpKTtcbiAgICAgIH1cbiAgICAgIGlmICghKG9wdGlvbnMgIT09IG51bGwgJiYgb3B0aW9ucyAhPT0gdm9pZCAwICYmIG9wdGlvbnMudXNlQWRkaXRpb25hbERheU9mWWVhclRva2VucykgJiYgaXNQcm90ZWN0ZWREYXlPZlllYXJUb2tlbihzdWJzdHJpbmcpKSB7XG4gICAgICAgIHRocm93UHJvdGVjdGVkRXJyb3Ioc3Vic3RyaW5nLCBkaXJ0eUZvcm1hdFN0ciwgU3RyaW5nKGRpcnR5RGF0ZSkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZvcm1hdHRlcih1dGNEYXRlLCBzdWJzdHJpbmcsIGxvY2FsZS5sb2NhbGl6ZSwgZm9ybWF0dGVyT3B0aW9ucyk7XG4gICAgfVxuICAgIGlmIChmaXJzdENoYXJhY3Rlci5tYXRjaCh1bmVzY2FwZWRMYXRpbkNoYXJhY3RlclJlZ0V4cCkpIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdGb3JtYXQgc3RyaW5nIGNvbnRhaW5zIGFuIHVuZXNjYXBlZCBsYXRpbiBhbHBoYWJldCBjaGFyYWN0ZXIgYCcgKyBmaXJzdENoYXJhY3RlciArICdgJyk7XG4gICAgfVxuICAgIHJldHVybiBzdWJzdHJpbmc7XG4gIH0pLmpvaW4oJycpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gY2xlYW5Fc2NhcGVkU3RyaW5nKGlucHV0KSB7XG4gIHZhciBtYXRjaGVkID0gaW5wdXQubWF0Y2goZXNjYXBlZFN0cmluZ1JlZ0V4cCk7XG4gIGlmICghbWF0Y2hlZCkge1xuICAgIHJldHVybiBpbnB1dDtcbiAgfVxuICByZXR1cm4gbWF0Y2hlZFsxXS5yZXBsYWNlKGRvdWJsZVF1b3RlUmVnRXhwLCBcIidcIik7XG59IiwiaW1wb3J0IF90eXBlb2YgZnJvbSBcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3R5cGVvZlwiO1xuaW1wb3J0IHJlcXVpcmVkQXJncyBmcm9tIFwiLi4vX2xpYi9yZXF1aXJlZEFyZ3MvaW5kZXguanNcIjtcbi8qKlxuICogQG5hbWUgaXNEYXRlXG4gKiBAY2F0ZWdvcnkgQ29tbW9uIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IElzIHRoZSBnaXZlbiB2YWx1ZSBhIGRhdGU/XG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIGdpdmVuIHZhbHVlIGlzIGFuIGluc3RhbmNlIG9mIERhdGUuIFRoZSBmdW5jdGlvbiB3b3JrcyBmb3IgZGF0ZXMgdHJhbnNmZXJyZWQgYWNyb3NzIGlmcmFtZXMuXG4gKlxuICogQHBhcmFtIHsqfSB2YWx1ZSAtIHRoZSB2YWx1ZSB0byBjaGVja1xuICogQHJldHVybnMge2Jvb2xlYW59IHRydWUgaWYgdGhlIGdpdmVuIHZhbHVlIGlzIGEgZGF0ZVxuICogQHRocm93cyB7VHlwZUVycm9yfSAxIGFyZ3VtZW50cyByZXF1aXJlZFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBGb3IgYSB2YWxpZCBkYXRlOlxuICogY29uc3QgcmVzdWx0ID0gaXNEYXRlKG5ldyBEYXRlKCkpXG4gKiAvLz0+IHRydWVcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gRm9yIGFuIGludmFsaWQgZGF0ZTpcbiAqIGNvbnN0IHJlc3VsdCA9IGlzRGF0ZShuZXcgRGF0ZShOYU4pKVxuICogLy89PiB0cnVlXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEZvciBzb21lIHZhbHVlOlxuICogY29uc3QgcmVzdWx0ID0gaXNEYXRlKCcyMDE0LTAyLTMxJylcbiAqIC8vPT4gZmFsc2VcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gRm9yIGFuIG9iamVjdDpcbiAqIGNvbnN0IHJlc3VsdCA9IGlzRGF0ZSh7fSlcbiAqIC8vPT4gZmFsc2VcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNEYXRlKHZhbHVlKSB7XG4gIHJlcXVpcmVkQXJncygxLCBhcmd1bWVudHMpO1xuICByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBEYXRlIHx8IF90eXBlb2YodmFsdWUpID09PSAnb2JqZWN0JyAmJiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpID09PSAnW29iamVjdCBEYXRlXSc7XG59IiwiaW1wb3J0IHN0YXJ0T2ZEYXkgZnJvbSBcIi4uL3N0YXJ0T2ZEYXkvaW5kZXguanNcIjtcbmltcG9ydCByZXF1aXJlZEFyZ3MgZnJvbSBcIi4uL19saWIvcmVxdWlyZWRBcmdzL2luZGV4LmpzXCI7XG4vKipcbiAqIEBuYW1lIGlzU2FtZURheVxuICogQGNhdGVnb3J5IERheSBIZWxwZXJzXG4gKiBAc3VtbWFyeSBBcmUgdGhlIGdpdmVuIGRhdGVzIGluIHRoZSBzYW1lIGRheSAoYW5kIHllYXIgYW5kIG1vbnRoKT9cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEFyZSB0aGUgZ2l2ZW4gZGF0ZXMgaW4gdGhlIHNhbWUgZGF5IChhbmQgeWVhciBhbmQgbW9udGgpP1xuICpcbiAqIEBwYXJhbSB7RGF0ZXxOdW1iZXJ9IGRhdGVMZWZ0IC0gdGhlIGZpcnN0IGRhdGUgdG8gY2hlY2tcbiAqIEBwYXJhbSB7RGF0ZXxOdW1iZXJ9IGRhdGVSaWdodCAtIHRoZSBzZWNvbmQgZGF0ZSB0byBjaGVja1xuICogQHJldHVybnMge0Jvb2xlYW59IHRoZSBkYXRlcyBhcmUgaW4gdGhlIHNhbWUgZGF5IChhbmQgeWVhciBhbmQgbW9udGgpXG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IDIgYXJndW1lbnRzIHJlcXVpcmVkXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEFyZSA0IFNlcHRlbWJlciAwNjowMDowMCBhbmQgNCBTZXB0ZW1iZXIgMTg6MDA6MDAgaW4gdGhlIHNhbWUgZGF5P1xuICogY29uc3QgcmVzdWx0ID0gaXNTYW1lRGF5KG5ldyBEYXRlKDIwMTQsIDgsIDQsIDYsIDApLCBuZXcgRGF0ZSgyMDE0LCA4LCA0LCAxOCwgMCkpXG4gKiAvLz0+IHRydWVcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gQXJlIDQgU2VwdGVtYmVyIGFuZCA0IE9jdG9iZXIgaW4gdGhlIHNhbWUgZGF5P1xuICogY29uc3QgcmVzdWx0ID0gaXNTYW1lRGF5KG5ldyBEYXRlKDIwMTQsIDgsIDQpLCBuZXcgRGF0ZSgyMDE0LCA5LCA0KSlcbiAqIC8vPT4gZmFsc2VcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gQXJlIDQgU2VwdGVtYmVyLCAyMDE0IGFuZCA0IFNlcHRlbWJlciwgMjAxNSBpbiB0aGUgc2FtZSBkYXk/XG4gKiBjb25zdCByZXN1bHQgPSBpc1NhbWVEYXkobmV3IERhdGUoMjAxNCwgOCwgNCksIG5ldyBEYXRlKDIwMTUsIDgsIDQpKVxuICogLy89PiBmYWxzZVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpc1NhbWVEYXkoZGlydHlEYXRlTGVmdCwgZGlydHlEYXRlUmlnaHQpIHtcbiAgcmVxdWlyZWRBcmdzKDIsIGFyZ3VtZW50cyk7XG4gIHZhciBkYXRlTGVmdFN0YXJ0T2ZEYXkgPSBzdGFydE9mRGF5KGRpcnR5RGF0ZUxlZnQpO1xuICB2YXIgZGF0ZVJpZ2h0U3RhcnRPZkRheSA9IHN0YXJ0T2ZEYXkoZGlydHlEYXRlUmlnaHQpO1xuICByZXR1cm4gZGF0ZUxlZnRTdGFydE9mRGF5LmdldFRpbWUoKSA9PT0gZGF0ZVJpZ2h0U3RhcnRPZkRheS5nZXRUaW1lKCk7XG59IiwiaW1wb3J0IGlzRGF0ZSBmcm9tIFwiLi4vaXNEYXRlL2luZGV4LmpzXCI7XG5pbXBvcnQgdG9EYXRlIGZyb20gXCIuLi90b0RhdGUvaW5kZXguanNcIjtcbmltcG9ydCByZXF1aXJlZEFyZ3MgZnJvbSBcIi4uL19saWIvcmVxdWlyZWRBcmdzL2luZGV4LmpzXCI7XG4vKipcbiAqIEBuYW1lIGlzVmFsaWRcbiAqIEBjYXRlZ29yeSBDb21tb24gSGVscGVyc1xuICogQHN1bW1hcnkgSXMgdGhlIGdpdmVuIGRhdGUgdmFsaWQ/XG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBSZXR1cm5zIGZhbHNlIGlmIGFyZ3VtZW50IGlzIEludmFsaWQgRGF0ZSBhbmQgdHJ1ZSBvdGhlcndpc2UuXG4gKiBBcmd1bWVudCBpcyBjb252ZXJ0ZWQgdG8gRGF0ZSB1c2luZyBgdG9EYXRlYC4gU2VlIFt0b0RhdGVde0BsaW5rIGh0dHBzOi8vZGF0ZS1mbnMub3JnL2RvY3MvdG9EYXRlfVxuICogSW52YWxpZCBEYXRlIGlzIGEgRGF0ZSwgd2hvc2UgdGltZSB2YWx1ZSBpcyBOYU4uXG4gKlxuICogVGltZSB2YWx1ZSBvZiBEYXRlOiBodHRwOi8vZXM1LmdpdGh1Yi5pby8jeDE1LjkuMS4xXG4gKlxuICogQHBhcmFtIHsqfSBkYXRlIC0gdGhlIGRhdGUgdG8gY2hlY2tcbiAqIEByZXR1cm5zIHtCb29sZWFufSB0aGUgZGF0ZSBpcyB2YWxpZFxuICogQHRocm93cyB7VHlwZUVycm9yfSAxIGFyZ3VtZW50IHJlcXVpcmVkXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEZvciB0aGUgdmFsaWQgZGF0ZTpcbiAqIGNvbnN0IHJlc3VsdCA9IGlzVmFsaWQobmV3IERhdGUoMjAxNCwgMSwgMzEpKVxuICogLy89PiB0cnVlXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEZvciB0aGUgdmFsdWUsIGNvbnZlcnRhYmxlIGludG8gYSBkYXRlOlxuICogY29uc3QgcmVzdWx0ID0gaXNWYWxpZCgxMzkzODA0ODAwMDAwKVxuICogLy89PiB0cnVlXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEZvciB0aGUgaW52YWxpZCBkYXRlOlxuICogY29uc3QgcmVzdWx0ID0gaXNWYWxpZChuZXcgRGF0ZSgnJykpXG4gKiAvLz0+IGZhbHNlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzVmFsaWQoZGlydHlEYXRlKSB7XG4gIHJlcXVpcmVkQXJncygxLCBhcmd1bWVudHMpO1xuICBpZiAoIWlzRGF0ZShkaXJ0eURhdGUpICYmIHR5cGVvZiBkaXJ0eURhdGUgIT09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBkYXRlID0gdG9EYXRlKGRpcnR5RGF0ZSk7XG4gIHJldHVybiAhaXNOYU4oTnVtYmVyKGRhdGUpKTtcbn0iLCJpbXBvcnQgdG9EYXRlIGZyb20gXCIuLi90b0RhdGUvaW5kZXguanNcIjtcbmltcG9ydCByZXF1aXJlZEFyZ3MgZnJvbSBcIi4uL19saWIvcmVxdWlyZWRBcmdzL2luZGV4LmpzXCI7XG4vKipcbiAqIEBuYW1lIGlzV2l0aGluSW50ZXJ2YWxcbiAqIEBjYXRlZ29yeSBJbnRlcnZhbCBIZWxwZXJzXG4gKiBAc3VtbWFyeSBJcyB0aGUgZ2l2ZW4gZGF0ZSB3aXRoaW4gdGhlIGludGVydmFsP1xuICpcbiAqIEBkZXNjcmlwdGlvblxuICogSXMgdGhlIGdpdmVuIGRhdGUgd2l0aGluIHRoZSBpbnRlcnZhbD8gKEluY2x1ZGluZyBzdGFydCBhbmQgZW5kLilcbiAqXG4gKiBAcGFyYW0ge0RhdGV8TnVtYmVyfSBkYXRlIC0gdGhlIGRhdGUgdG8gY2hlY2tcbiAqIEBwYXJhbSB7SW50ZXJ2YWx9IGludGVydmFsIC0gdGhlIGludGVydmFsIHRvIGNoZWNrXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gdGhlIGRhdGUgaXMgd2l0aGluIHRoZSBpbnRlcnZhbFxuICogQHRocm93cyB7VHlwZUVycm9yfSAyIGFyZ3VtZW50cyByZXF1aXJlZFxuICogQHRocm93cyB7UmFuZ2VFcnJvcn0gVGhlIHN0YXJ0IG9mIGFuIGludGVydmFsIGNhbm5vdCBiZSBhZnRlciBpdHMgZW5kXG4gKiBAdGhyb3dzIHtSYW5nZUVycm9yfSBEYXRlIGluIGludGVydmFsIGNhbm5vdCBiZSBgSW52YWxpZCBEYXRlYFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBGb3IgdGhlIGRhdGUgd2l0aGluIHRoZSBpbnRlcnZhbDpcbiAqIGlzV2l0aGluSW50ZXJ2YWwobmV3IERhdGUoMjAxNCwgMCwgMyksIHtcbiAqICAgc3RhcnQ6IG5ldyBEYXRlKDIwMTQsIDAsIDEpLFxuICogICBlbmQ6IG5ldyBEYXRlKDIwMTQsIDAsIDcpXG4gKiB9KVxuICogLy89PiB0cnVlXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEZvciB0aGUgZGF0ZSBvdXRzaWRlIG9mIHRoZSBpbnRlcnZhbDpcbiAqIGlzV2l0aGluSW50ZXJ2YWwobmV3IERhdGUoMjAxNCwgMCwgMTApLCB7XG4gKiAgIHN0YXJ0OiBuZXcgRGF0ZSgyMDE0LCAwLCAxKSxcbiAqICAgZW5kOiBuZXcgRGF0ZSgyMDE0LCAwLCA3KVxuICogfSlcbiAqIC8vPT4gZmFsc2VcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gRm9yIGRhdGUgZXF1YWwgdG8gaW50ZXJ2YWwgc3RhcnQ6XG4gKiBpc1dpdGhpbkludGVydmFsKGRhdGUsIHsgc3RhcnQsIGVuZDogZGF0ZSB9KSAvLyA9PiB0cnVlXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEZvciBkYXRlIGVxdWFsIHRvIGludGVydmFsIGVuZDpcbiAqIGlzV2l0aGluSW50ZXJ2YWwoZGF0ZSwgeyBzdGFydDogZGF0ZSwgZW5kIH0pIC8vID0+IHRydWVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNXaXRoaW5JbnRlcnZhbChkaXJ0eURhdGUsIGludGVydmFsKSB7XG4gIHJlcXVpcmVkQXJncygyLCBhcmd1bWVudHMpO1xuICB2YXIgdGltZSA9IHRvRGF0ZShkaXJ0eURhdGUpLmdldFRpbWUoKTtcbiAgdmFyIHN0YXJ0VGltZSA9IHRvRGF0ZShpbnRlcnZhbC5zdGFydCkuZ2V0VGltZSgpO1xuICB2YXIgZW5kVGltZSA9IHRvRGF0ZShpbnRlcnZhbC5lbmQpLmdldFRpbWUoKTtcblxuICAvLyBUaHJvdyBhbiBleGNlcHRpb24gaWYgc3RhcnQgZGF0ZSBpcyBhZnRlciBlbmQgZGF0ZSBvciBpZiBhbnkgZGF0ZSBpcyBgSW52YWxpZCBEYXRlYFxuICBpZiAoIShzdGFydFRpbWUgPD0gZW5kVGltZSkpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW52YWxpZCBpbnRlcnZhbCcpO1xuICB9XG4gIHJldHVybiB0aW1lID49IHN0YXJ0VGltZSAmJiB0aW1lIDw9IGVuZFRpbWU7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYnVpbGRGb3JtYXRMb25nRm4oYXJncykge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB7fTtcbiAgICAvLyBUT0RPOiBSZW1vdmUgU3RyaW5nKClcbiAgICB2YXIgd2lkdGggPSBvcHRpb25zLndpZHRoID8gU3RyaW5nKG9wdGlvbnMud2lkdGgpIDogYXJncy5kZWZhdWx0V2lkdGg7XG4gICAgdmFyIGZvcm1hdCA9IGFyZ3MuZm9ybWF0c1t3aWR0aF0gfHwgYXJncy5mb3JtYXRzW2FyZ3MuZGVmYXVsdFdpZHRoXTtcbiAgICByZXR1cm4gZm9ybWF0O1xuICB9O1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkTG9jYWxpemVGbihhcmdzKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoZGlydHlJbmRleCwgb3B0aW9ucykge1xuICAgIHZhciBjb250ZXh0ID0gb3B0aW9ucyAhPT0gbnVsbCAmJiBvcHRpb25zICE9PSB2b2lkIDAgJiYgb3B0aW9ucy5jb250ZXh0ID8gU3RyaW5nKG9wdGlvbnMuY29udGV4dCkgOiAnc3RhbmRhbG9uZSc7XG4gICAgdmFyIHZhbHVlc0FycmF5O1xuICAgIGlmIChjb250ZXh0ID09PSAnZm9ybWF0dGluZycgJiYgYXJncy5mb3JtYXR0aW5nVmFsdWVzKSB7XG4gICAgICB2YXIgZGVmYXVsdFdpZHRoID0gYXJncy5kZWZhdWx0Rm9ybWF0dGluZ1dpZHRoIHx8IGFyZ3MuZGVmYXVsdFdpZHRoO1xuICAgICAgdmFyIHdpZHRoID0gb3B0aW9ucyAhPT0gbnVsbCAmJiBvcHRpb25zICE9PSB2b2lkIDAgJiYgb3B0aW9ucy53aWR0aCA/IFN0cmluZyhvcHRpb25zLndpZHRoKSA6IGRlZmF1bHRXaWR0aDtcbiAgICAgIHZhbHVlc0FycmF5ID0gYXJncy5mb3JtYXR0aW5nVmFsdWVzW3dpZHRoXSB8fCBhcmdzLmZvcm1hdHRpbmdWYWx1ZXNbZGVmYXVsdFdpZHRoXTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIF9kZWZhdWx0V2lkdGggPSBhcmdzLmRlZmF1bHRXaWR0aDtcbiAgICAgIHZhciBfd2lkdGggPSBvcHRpb25zICE9PSBudWxsICYmIG9wdGlvbnMgIT09IHZvaWQgMCAmJiBvcHRpb25zLndpZHRoID8gU3RyaW5nKG9wdGlvbnMud2lkdGgpIDogYXJncy5kZWZhdWx0V2lkdGg7XG4gICAgICB2YWx1ZXNBcnJheSA9IGFyZ3MudmFsdWVzW193aWR0aF0gfHwgYXJncy52YWx1ZXNbX2RlZmF1bHRXaWR0aF07XG4gICAgfVxuICAgIHZhciBpbmRleCA9IGFyZ3MuYXJndW1lbnRDYWxsYmFjayA/IGFyZ3MuYXJndW1lbnRDYWxsYmFjayhkaXJ0eUluZGV4KSA6IGRpcnR5SW5kZXg7XG4gICAgLy8gQHRzLWlnbm9yZTogRm9yIHNvbWUgcmVhc29uIFR5cGVTY3JpcHQganVzdCBkb24ndCB3YW50IHRvIG1hdGNoIGl0LCBubyBtYXR0ZXIgaG93IGhhcmQgd2UgdHJ5LiBJIGNoYWxsZW5nZSB5b3UgdG8gdHJ5IHRvIHJlbW92ZSBpdCFcbiAgICByZXR1cm4gdmFsdWVzQXJyYXlbaW5kZXhdO1xuICB9O1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkTWF0Y2hGbihhcmdzKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoc3RyaW5nKSB7XG4gICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuICAgIHZhciB3aWR0aCA9IG9wdGlvbnMud2lkdGg7XG4gICAgdmFyIG1hdGNoUGF0dGVybiA9IHdpZHRoICYmIGFyZ3MubWF0Y2hQYXR0ZXJuc1t3aWR0aF0gfHwgYXJncy5tYXRjaFBhdHRlcm5zW2FyZ3MuZGVmYXVsdE1hdGNoV2lkdGhdO1xuICAgIHZhciBtYXRjaFJlc3VsdCA9IHN0cmluZy5tYXRjaChtYXRjaFBhdHRlcm4pO1xuICAgIGlmICghbWF0Y2hSZXN1bHQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICB2YXIgbWF0Y2hlZFN0cmluZyA9IG1hdGNoUmVzdWx0WzBdO1xuICAgIHZhciBwYXJzZVBhdHRlcm5zID0gd2lkdGggJiYgYXJncy5wYXJzZVBhdHRlcm5zW3dpZHRoXSB8fCBhcmdzLnBhcnNlUGF0dGVybnNbYXJncy5kZWZhdWx0UGFyc2VXaWR0aF07XG4gICAgdmFyIGtleSA9IEFycmF5LmlzQXJyYXkocGFyc2VQYXR0ZXJucykgPyBmaW5kSW5kZXgocGFyc2VQYXR0ZXJucywgZnVuY3Rpb24gKHBhdHRlcm4pIHtcbiAgICAgIHJldHVybiBwYXR0ZXJuLnRlc3QobWF0Y2hlZFN0cmluZyk7XG4gICAgfSkgOiBmaW5kS2V5KHBhcnNlUGF0dGVybnMsIGZ1bmN0aW9uIChwYXR0ZXJuKSB7XG4gICAgICByZXR1cm4gcGF0dGVybi50ZXN0KG1hdGNoZWRTdHJpbmcpO1xuICAgIH0pO1xuICAgIHZhciB2YWx1ZTtcbiAgICB2YWx1ZSA9IGFyZ3MudmFsdWVDYWxsYmFjayA/IGFyZ3MudmFsdWVDYWxsYmFjayhrZXkpIDoga2V5O1xuICAgIHZhbHVlID0gb3B0aW9ucy52YWx1ZUNhbGxiYWNrID8gb3B0aW9ucy52YWx1ZUNhbGxiYWNrKHZhbHVlKSA6IHZhbHVlO1xuICAgIHZhciByZXN0ID0gc3RyaW5nLnNsaWNlKG1hdGNoZWRTdHJpbmcubGVuZ3RoKTtcbiAgICByZXR1cm4ge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgcmVzdDogcmVzdFxuICAgIH07XG4gIH07XG59XG5mdW5jdGlvbiBmaW5kS2V5KG9iamVjdCwgcHJlZGljYXRlKSB7XG4gIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICBpZiAob2JqZWN0Lmhhc093blByb3BlcnR5KGtleSkgJiYgcHJlZGljYXRlKG9iamVjdFtrZXldKSkge1xuICAgICAgcmV0dXJuIGtleTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cbmZ1bmN0aW9uIGZpbmRJbmRleChhcnJheSwgcHJlZGljYXRlKSB7XG4gIGZvciAodmFyIGtleSA9IDA7IGtleSA8IGFycmF5Lmxlbmd0aDsga2V5KyspIHtcbiAgICBpZiAocHJlZGljYXRlKGFycmF5W2tleV0pKSB7XG4gICAgICByZXR1cm4ga2V5O1xuICAgIH1cbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkTWF0Y2hQYXR0ZXJuRm4oYXJncykge1xuICByZXR1cm4gZnVuY3Rpb24gKHN0cmluZykge1xuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcbiAgICB2YXIgbWF0Y2hSZXN1bHQgPSBzdHJpbmcubWF0Y2goYXJncy5tYXRjaFBhdHRlcm4pO1xuICAgIGlmICghbWF0Y2hSZXN1bHQpIHJldHVybiBudWxsO1xuICAgIHZhciBtYXRjaGVkU3RyaW5nID0gbWF0Y2hSZXN1bHRbMF07XG4gICAgdmFyIHBhcnNlUmVzdWx0ID0gc3RyaW5nLm1hdGNoKGFyZ3MucGFyc2VQYXR0ZXJuKTtcbiAgICBpZiAoIXBhcnNlUmVzdWx0KSByZXR1cm4gbnVsbDtcbiAgICB2YXIgdmFsdWUgPSBhcmdzLnZhbHVlQ2FsbGJhY2sgPyBhcmdzLnZhbHVlQ2FsbGJhY2socGFyc2VSZXN1bHRbMF0pIDogcGFyc2VSZXN1bHRbMF07XG4gICAgdmFsdWUgPSBvcHRpb25zLnZhbHVlQ2FsbGJhY2sgPyBvcHRpb25zLnZhbHVlQ2FsbGJhY2sodmFsdWUpIDogdmFsdWU7XG4gICAgdmFyIHJlc3QgPSBzdHJpbmcuc2xpY2UobWF0Y2hlZFN0cmluZy5sZW5ndGgpO1xuICAgIHJldHVybiB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICByZXN0OiByZXN0XG4gICAgfTtcbiAgfTtcbn0iLCJ2YXIgZm9ybWF0RGlzdGFuY2VMb2NhbGUgPSB7XG4gIGxlc3NUaGFuWFNlY29uZHM6IHtcbiAgICBvbmU6ICdsZXNzIHRoYW4gYSBzZWNvbmQnLFxuICAgIG90aGVyOiAnbGVzcyB0aGFuIHt7Y291bnR9fSBzZWNvbmRzJ1xuICB9LFxuICB4U2Vjb25kczoge1xuICAgIG9uZTogJzEgc2Vjb25kJyxcbiAgICBvdGhlcjogJ3t7Y291bnR9fSBzZWNvbmRzJ1xuICB9LFxuICBoYWxmQU1pbnV0ZTogJ2hhbGYgYSBtaW51dGUnLFxuICBsZXNzVGhhblhNaW51dGVzOiB7XG4gICAgb25lOiAnbGVzcyB0aGFuIGEgbWludXRlJyxcbiAgICBvdGhlcjogJ2xlc3MgdGhhbiB7e2NvdW50fX0gbWludXRlcydcbiAgfSxcbiAgeE1pbnV0ZXM6IHtcbiAgICBvbmU6ICcxIG1pbnV0ZScsXG4gICAgb3RoZXI6ICd7e2NvdW50fX0gbWludXRlcydcbiAgfSxcbiAgYWJvdXRYSG91cnM6IHtcbiAgICBvbmU6ICdhYm91dCAxIGhvdXInLFxuICAgIG90aGVyOiAnYWJvdXQge3tjb3VudH19IGhvdXJzJ1xuICB9LFxuICB4SG91cnM6IHtcbiAgICBvbmU6ICcxIGhvdXInLFxuICAgIG90aGVyOiAne3tjb3VudH19IGhvdXJzJ1xuICB9LFxuICB4RGF5czoge1xuICAgIG9uZTogJzEgZGF5JyxcbiAgICBvdGhlcjogJ3t7Y291bnR9fSBkYXlzJ1xuICB9LFxuICBhYm91dFhXZWVrczoge1xuICAgIG9uZTogJ2Fib3V0IDEgd2VlaycsXG4gICAgb3RoZXI6ICdhYm91dCB7e2NvdW50fX0gd2Vla3MnXG4gIH0sXG4gIHhXZWVrczoge1xuICAgIG9uZTogJzEgd2VlaycsXG4gICAgb3RoZXI6ICd7e2NvdW50fX0gd2Vla3MnXG4gIH0sXG4gIGFib3V0WE1vbnRoczoge1xuICAgIG9uZTogJ2Fib3V0IDEgbW9udGgnLFxuICAgIG90aGVyOiAnYWJvdXQge3tjb3VudH19IG1vbnRocydcbiAgfSxcbiAgeE1vbnRoczoge1xuICAgIG9uZTogJzEgbW9udGgnLFxuICAgIG90aGVyOiAne3tjb3VudH19IG1vbnRocydcbiAgfSxcbiAgYWJvdXRYWWVhcnM6IHtcbiAgICBvbmU6ICdhYm91dCAxIHllYXInLFxuICAgIG90aGVyOiAnYWJvdXQge3tjb3VudH19IHllYXJzJ1xuICB9LFxuICB4WWVhcnM6IHtcbiAgICBvbmU6ICcxIHllYXInLFxuICAgIG90aGVyOiAne3tjb3VudH19IHllYXJzJ1xuICB9LFxuICBvdmVyWFllYXJzOiB7XG4gICAgb25lOiAnb3ZlciAxIHllYXInLFxuICAgIG90aGVyOiAnb3ZlciB7e2NvdW50fX0geWVhcnMnXG4gIH0sXG4gIGFsbW9zdFhZZWFyczoge1xuICAgIG9uZTogJ2FsbW9zdCAxIHllYXInLFxuICAgIG90aGVyOiAnYWxtb3N0IHt7Y291bnR9fSB5ZWFycydcbiAgfVxufTtcbnZhciBmb3JtYXREaXN0YW5jZSA9IGZ1bmN0aW9uIGZvcm1hdERpc3RhbmNlKHRva2VuLCBjb3VudCwgb3B0aW9ucykge1xuICB2YXIgcmVzdWx0O1xuICB2YXIgdG9rZW5WYWx1ZSA9IGZvcm1hdERpc3RhbmNlTG9jYWxlW3Rva2VuXTtcbiAgaWYgKHR5cGVvZiB0b2tlblZhbHVlID09PSAnc3RyaW5nJykge1xuICAgIHJlc3VsdCA9IHRva2VuVmFsdWU7XG4gIH0gZWxzZSBpZiAoY291bnQgPT09IDEpIHtcbiAgICByZXN1bHQgPSB0b2tlblZhbHVlLm9uZTtcbiAgfSBlbHNlIHtcbiAgICByZXN1bHQgPSB0b2tlblZhbHVlLm90aGVyLnJlcGxhY2UoJ3t7Y291bnR9fScsIGNvdW50LnRvU3RyaW5nKCkpO1xuICB9XG4gIGlmIChvcHRpb25zICE9PSBudWxsICYmIG9wdGlvbnMgIT09IHZvaWQgMCAmJiBvcHRpb25zLmFkZFN1ZmZpeCkge1xuICAgIGlmIChvcHRpb25zLmNvbXBhcmlzb24gJiYgb3B0aW9ucy5jb21wYXJpc29uID4gMCkge1xuICAgICAgcmV0dXJuICdpbiAnICsgcmVzdWx0O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcmVzdWx0ICsgJyBhZ28nO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcbmV4cG9ydCBkZWZhdWx0IGZvcm1hdERpc3RhbmNlOyIsImltcG9ydCBidWlsZEZvcm1hdExvbmdGbiBmcm9tIFwiLi4vLi4vLi4vX2xpYi9idWlsZEZvcm1hdExvbmdGbi9pbmRleC5qc1wiO1xudmFyIGRhdGVGb3JtYXRzID0ge1xuICBmdWxsOiAnRUVFRSwgTU1NTSBkbywgeScsXG4gIGxvbmc6ICdNTU1NIGRvLCB5JyxcbiAgbWVkaXVtOiAnTU1NIGQsIHknLFxuICBzaG9ydDogJ01NL2RkL3l5eXknXG59O1xudmFyIHRpbWVGb3JtYXRzID0ge1xuICBmdWxsOiAnaDptbTpzcyBhIHp6enonLFxuICBsb25nOiAnaDptbTpzcyBhIHonLFxuICBtZWRpdW06ICdoOm1tOnNzIGEnLFxuICBzaG9ydDogJ2g6bW0gYSdcbn07XG52YXIgZGF0ZVRpbWVGb3JtYXRzID0ge1xuICBmdWxsOiBcInt7ZGF0ZX19ICdhdCcge3t0aW1lfX1cIixcbiAgbG9uZzogXCJ7e2RhdGV9fSAnYXQnIHt7dGltZX19XCIsXG4gIG1lZGl1bTogJ3t7ZGF0ZX19LCB7e3RpbWV9fScsXG4gIHNob3J0OiAne3tkYXRlfX0sIHt7dGltZX19J1xufTtcbnZhciBmb3JtYXRMb25nID0ge1xuICBkYXRlOiBidWlsZEZvcm1hdExvbmdGbih7XG4gICAgZm9ybWF0czogZGF0ZUZvcm1hdHMsXG4gICAgZGVmYXVsdFdpZHRoOiAnZnVsbCdcbiAgfSksXG4gIHRpbWU6IGJ1aWxkRm9ybWF0TG9uZ0ZuKHtcbiAgICBmb3JtYXRzOiB0aW1lRm9ybWF0cyxcbiAgICBkZWZhdWx0V2lkdGg6ICdmdWxsJ1xuICB9KSxcbiAgZGF0ZVRpbWU6IGJ1aWxkRm9ybWF0TG9uZ0ZuKHtcbiAgICBmb3JtYXRzOiBkYXRlVGltZUZvcm1hdHMsXG4gICAgZGVmYXVsdFdpZHRoOiAnZnVsbCdcbiAgfSlcbn07XG5leHBvcnQgZGVmYXVsdCBmb3JtYXRMb25nOyIsInZhciBmb3JtYXRSZWxhdGl2ZUxvY2FsZSA9IHtcbiAgbGFzdFdlZWs6IFwiJ2xhc3QnIGVlZWUgJ2F0JyBwXCIsXG4gIHllc3RlcmRheTogXCIneWVzdGVyZGF5IGF0JyBwXCIsXG4gIHRvZGF5OiBcIid0b2RheSBhdCcgcFwiLFxuICB0b21vcnJvdzogXCIndG9tb3Jyb3cgYXQnIHBcIixcbiAgbmV4dFdlZWs6IFwiZWVlZSAnYXQnIHBcIixcbiAgb3RoZXI6ICdQJ1xufTtcbnZhciBmb3JtYXRSZWxhdGl2ZSA9IGZ1bmN0aW9uIGZvcm1hdFJlbGF0aXZlKHRva2VuLCBfZGF0ZSwgX2Jhc2VEYXRlLCBfb3B0aW9ucykge1xuICByZXR1cm4gZm9ybWF0UmVsYXRpdmVMb2NhbGVbdG9rZW5dO1xufTtcbmV4cG9ydCBkZWZhdWx0IGZvcm1hdFJlbGF0aXZlOyIsImltcG9ydCBidWlsZExvY2FsaXplRm4gZnJvbSBcIi4uLy4uLy4uL19saWIvYnVpbGRMb2NhbGl6ZUZuL2luZGV4LmpzXCI7XG52YXIgZXJhVmFsdWVzID0ge1xuICBuYXJyb3c6IFsnQicsICdBJ10sXG4gIGFiYnJldmlhdGVkOiBbJ0JDJywgJ0FEJ10sXG4gIHdpZGU6IFsnQmVmb3JlIENocmlzdCcsICdBbm5vIERvbWluaSddXG59O1xudmFyIHF1YXJ0ZXJWYWx1ZXMgPSB7XG4gIG5hcnJvdzogWycxJywgJzInLCAnMycsICc0J10sXG4gIGFiYnJldmlhdGVkOiBbJ1ExJywgJ1EyJywgJ1EzJywgJ1E0J10sXG4gIHdpZGU6IFsnMXN0IHF1YXJ0ZXInLCAnMm5kIHF1YXJ0ZXInLCAnM3JkIHF1YXJ0ZXInLCAnNHRoIHF1YXJ0ZXInXVxufTtcblxuLy8gTm90ZTogaW4gRW5nbGlzaCwgdGhlIG5hbWVzIG9mIGRheXMgb2YgdGhlIHdlZWsgYW5kIG1vbnRocyBhcmUgY2FwaXRhbGl6ZWQuXG4vLyBJZiB5b3UgYXJlIG1ha2luZyBhIG5ldyBsb2NhbGUgYmFzZWQgb24gdGhpcyBvbmUsIGNoZWNrIGlmIHRoZSBzYW1lIGlzIHRydWUgZm9yIHRoZSBsYW5ndWFnZSB5b3UncmUgd29ya2luZyBvbi5cbi8vIEdlbmVyYWxseSwgZm9ybWF0dGVkIGRhdGVzIHNob3VsZCBsb29rIGxpa2UgdGhleSBhcmUgaW4gdGhlIG1pZGRsZSBvZiBhIHNlbnRlbmNlLFxuLy8gZS5nLiBpbiBTcGFuaXNoIGxhbmd1YWdlIHRoZSB3ZWVrZGF5cyBhbmQgbW9udGhzIHNob3VsZCBiZSBpbiB0aGUgbG93ZXJjYXNlLlxudmFyIG1vbnRoVmFsdWVzID0ge1xuICBuYXJyb3c6IFsnSicsICdGJywgJ00nLCAnQScsICdNJywgJ0onLCAnSicsICdBJywgJ1MnLCAnTycsICdOJywgJ0QnXSxcbiAgYWJicmV2aWF0ZWQ6IFsnSmFuJywgJ0ZlYicsICdNYXInLCAnQXByJywgJ01heScsICdKdW4nLCAnSnVsJywgJ0F1ZycsICdTZXAnLCAnT2N0JywgJ05vdicsICdEZWMnXSxcbiAgd2lkZTogWydKYW51YXJ5JywgJ0ZlYnJ1YXJ5JywgJ01hcmNoJywgJ0FwcmlsJywgJ01heScsICdKdW5lJywgJ0p1bHknLCAnQXVndXN0JywgJ1NlcHRlbWJlcicsICdPY3RvYmVyJywgJ05vdmVtYmVyJywgJ0RlY2VtYmVyJ11cbn07XG52YXIgZGF5VmFsdWVzID0ge1xuICBuYXJyb3c6IFsnUycsICdNJywgJ1QnLCAnVycsICdUJywgJ0YnLCAnUyddLFxuICBzaG9ydDogWydTdScsICdNbycsICdUdScsICdXZScsICdUaCcsICdGcicsICdTYSddLFxuICBhYmJyZXZpYXRlZDogWydTdW4nLCAnTW9uJywgJ1R1ZScsICdXZWQnLCAnVGh1JywgJ0ZyaScsICdTYXQnXSxcbiAgd2lkZTogWydTdW5kYXknLCAnTW9uZGF5JywgJ1R1ZXNkYXknLCAnV2VkbmVzZGF5JywgJ1RodXJzZGF5JywgJ0ZyaWRheScsICdTYXR1cmRheSddXG59O1xudmFyIGRheVBlcmlvZFZhbHVlcyA9IHtcbiAgbmFycm93OiB7XG4gICAgYW06ICdhJyxcbiAgICBwbTogJ3AnLFxuICAgIG1pZG5pZ2h0OiAnbWknLFxuICAgIG5vb246ICduJyxcbiAgICBtb3JuaW5nOiAnbW9ybmluZycsXG4gICAgYWZ0ZXJub29uOiAnYWZ0ZXJub29uJyxcbiAgICBldmVuaW5nOiAnZXZlbmluZycsXG4gICAgbmlnaHQ6ICduaWdodCdcbiAgfSxcbiAgYWJicmV2aWF0ZWQ6IHtcbiAgICBhbTogJ0FNJyxcbiAgICBwbTogJ1BNJyxcbiAgICBtaWRuaWdodDogJ21pZG5pZ2h0JyxcbiAgICBub29uOiAnbm9vbicsXG4gICAgbW9ybmluZzogJ21vcm5pbmcnLFxuICAgIGFmdGVybm9vbjogJ2FmdGVybm9vbicsXG4gICAgZXZlbmluZzogJ2V2ZW5pbmcnLFxuICAgIG5pZ2h0OiAnbmlnaHQnXG4gIH0sXG4gIHdpZGU6IHtcbiAgICBhbTogJ2EubS4nLFxuICAgIHBtOiAncC5tLicsXG4gICAgbWlkbmlnaHQ6ICdtaWRuaWdodCcsXG4gICAgbm9vbjogJ25vb24nLFxuICAgIG1vcm5pbmc6ICdtb3JuaW5nJyxcbiAgICBhZnRlcm5vb246ICdhZnRlcm5vb24nLFxuICAgIGV2ZW5pbmc6ICdldmVuaW5nJyxcbiAgICBuaWdodDogJ25pZ2h0J1xuICB9XG59O1xudmFyIGZvcm1hdHRpbmdEYXlQZXJpb2RWYWx1ZXMgPSB7XG4gIG5hcnJvdzoge1xuICAgIGFtOiAnYScsXG4gICAgcG06ICdwJyxcbiAgICBtaWRuaWdodDogJ21pJyxcbiAgICBub29uOiAnbicsXG4gICAgbW9ybmluZzogJ2luIHRoZSBtb3JuaW5nJyxcbiAgICBhZnRlcm5vb246ICdpbiB0aGUgYWZ0ZXJub29uJyxcbiAgICBldmVuaW5nOiAnaW4gdGhlIGV2ZW5pbmcnLFxuICAgIG5pZ2h0OiAnYXQgbmlnaHQnXG4gIH0sXG4gIGFiYnJldmlhdGVkOiB7XG4gICAgYW06ICdBTScsXG4gICAgcG06ICdQTScsXG4gICAgbWlkbmlnaHQ6ICdtaWRuaWdodCcsXG4gICAgbm9vbjogJ25vb24nLFxuICAgIG1vcm5pbmc6ICdpbiB0aGUgbW9ybmluZycsXG4gICAgYWZ0ZXJub29uOiAnaW4gdGhlIGFmdGVybm9vbicsXG4gICAgZXZlbmluZzogJ2luIHRoZSBldmVuaW5nJyxcbiAgICBuaWdodDogJ2F0IG5pZ2h0J1xuICB9LFxuICB3aWRlOiB7XG4gICAgYW06ICdhLm0uJyxcbiAgICBwbTogJ3AubS4nLFxuICAgIG1pZG5pZ2h0OiAnbWlkbmlnaHQnLFxuICAgIG5vb246ICdub29uJyxcbiAgICBtb3JuaW5nOiAnaW4gdGhlIG1vcm5pbmcnLFxuICAgIGFmdGVybm9vbjogJ2luIHRoZSBhZnRlcm5vb24nLFxuICAgIGV2ZW5pbmc6ICdpbiB0aGUgZXZlbmluZycsXG4gICAgbmlnaHQ6ICdhdCBuaWdodCdcbiAgfVxufTtcbnZhciBvcmRpbmFsTnVtYmVyID0gZnVuY3Rpb24gb3JkaW5hbE51bWJlcihkaXJ0eU51bWJlciwgX29wdGlvbnMpIHtcbiAgdmFyIG51bWJlciA9IE51bWJlcihkaXJ0eU51bWJlcik7XG5cbiAgLy8gSWYgb3JkaW5hbCBudW1iZXJzIGRlcGVuZCBvbiBjb250ZXh0LCBmb3IgZXhhbXBsZSxcbiAgLy8gaWYgdGhleSBhcmUgZGlmZmVyZW50IGZvciBkaWZmZXJlbnQgZ3JhbW1hdGljYWwgZ2VuZGVycyxcbiAgLy8gdXNlIGBvcHRpb25zLnVuaXRgLlxuICAvL1xuICAvLyBgdW5pdGAgY2FuIGJlICd5ZWFyJywgJ3F1YXJ0ZXInLCAnbW9udGgnLCAnd2VlaycsICdkYXRlJywgJ2RheU9mWWVhcicsXG4gIC8vICdkYXknLCAnaG91cicsICdtaW51dGUnLCAnc2Vjb25kJy5cblxuICB2YXIgcmVtMTAwID0gbnVtYmVyICUgMTAwO1xuICBpZiAocmVtMTAwID4gMjAgfHwgcmVtMTAwIDwgMTApIHtcbiAgICBzd2l0Y2ggKHJlbTEwMCAlIDEwKSB7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIHJldHVybiBudW1iZXIgKyAnc3QnO1xuICAgICAgY2FzZSAyOlxuICAgICAgICByZXR1cm4gbnVtYmVyICsgJ25kJztcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgcmV0dXJuIG51bWJlciArICdyZCc7XG4gICAgfVxuICB9XG4gIHJldHVybiBudW1iZXIgKyAndGgnO1xufTtcbnZhciBsb2NhbGl6ZSA9IHtcbiAgb3JkaW5hbE51bWJlcjogb3JkaW5hbE51bWJlcixcbiAgZXJhOiBidWlsZExvY2FsaXplRm4oe1xuICAgIHZhbHVlczogZXJhVmFsdWVzLFxuICAgIGRlZmF1bHRXaWR0aDogJ3dpZGUnXG4gIH0pLFxuICBxdWFydGVyOiBidWlsZExvY2FsaXplRm4oe1xuICAgIHZhbHVlczogcXVhcnRlclZhbHVlcyxcbiAgICBkZWZhdWx0V2lkdGg6ICd3aWRlJyxcbiAgICBhcmd1bWVudENhbGxiYWNrOiBmdW5jdGlvbiBhcmd1bWVudENhbGxiYWNrKHF1YXJ0ZXIpIHtcbiAgICAgIHJldHVybiBxdWFydGVyIC0gMTtcbiAgICB9XG4gIH0pLFxuICBtb250aDogYnVpbGRMb2NhbGl6ZUZuKHtcbiAgICB2YWx1ZXM6IG1vbnRoVmFsdWVzLFxuICAgIGRlZmF1bHRXaWR0aDogJ3dpZGUnXG4gIH0pLFxuICBkYXk6IGJ1aWxkTG9jYWxpemVGbih7XG4gICAgdmFsdWVzOiBkYXlWYWx1ZXMsXG4gICAgZGVmYXVsdFdpZHRoOiAnd2lkZSdcbiAgfSksXG4gIGRheVBlcmlvZDogYnVpbGRMb2NhbGl6ZUZuKHtcbiAgICB2YWx1ZXM6IGRheVBlcmlvZFZhbHVlcyxcbiAgICBkZWZhdWx0V2lkdGg6ICd3aWRlJyxcbiAgICBmb3JtYXR0aW5nVmFsdWVzOiBmb3JtYXR0aW5nRGF5UGVyaW9kVmFsdWVzLFxuICAgIGRlZmF1bHRGb3JtYXR0aW5nV2lkdGg6ICd3aWRlJ1xuICB9KVxufTtcbmV4cG9ydCBkZWZhdWx0IGxvY2FsaXplOyIsImltcG9ydCBidWlsZE1hdGNoRm4gZnJvbSBcIi4uLy4uLy4uL19saWIvYnVpbGRNYXRjaEZuL2luZGV4LmpzXCI7XG5pbXBvcnQgYnVpbGRNYXRjaFBhdHRlcm5GbiBmcm9tIFwiLi4vLi4vLi4vX2xpYi9idWlsZE1hdGNoUGF0dGVybkZuL2luZGV4LmpzXCI7XG52YXIgbWF0Y2hPcmRpbmFsTnVtYmVyUGF0dGVybiA9IC9eKFxcZCspKHRofHN0fG5kfHJkKT8vaTtcbnZhciBwYXJzZU9yZGluYWxOdW1iZXJQYXR0ZXJuID0gL1xcZCsvaTtcbnZhciBtYXRjaEVyYVBhdHRlcm5zID0ge1xuICBuYXJyb3c6IC9eKGJ8YSkvaSxcbiAgYWJicmV2aWF0ZWQ6IC9eKGJcXC4/XFxzP2NcXC4/fGJcXC4/XFxzP2NcXC4/XFxzP2VcXC4/fGFcXC4/XFxzP2RcXC4/fGNcXC4/XFxzP2VcXC4/KS9pLFxuICB3aWRlOiAvXihiZWZvcmUgY2hyaXN0fGJlZm9yZSBjb21tb24gZXJhfGFubm8gZG9taW5pfGNvbW1vbiBlcmEpL2lcbn07XG52YXIgcGFyc2VFcmFQYXR0ZXJucyA9IHtcbiAgYW55OiBbL15iL2ksIC9eKGF8YykvaV1cbn07XG52YXIgbWF0Y2hRdWFydGVyUGF0dGVybnMgPSB7XG4gIG5hcnJvdzogL15bMTIzNF0vaSxcbiAgYWJicmV2aWF0ZWQ6IC9ecVsxMjM0XS9pLFxuICB3aWRlOiAvXlsxMjM0XSh0aHxzdHxuZHxyZCk/IHF1YXJ0ZXIvaVxufTtcbnZhciBwYXJzZVF1YXJ0ZXJQYXR0ZXJucyA9IHtcbiAgYW55OiBbLzEvaSwgLzIvaSwgLzMvaSwgLzQvaV1cbn07XG52YXIgbWF0Y2hNb250aFBhdHRlcm5zID0ge1xuICBuYXJyb3c6IC9eW2pmbWFzb25kXS9pLFxuICBhYmJyZXZpYXRlZDogL14oamFufGZlYnxtYXJ8YXByfG1heXxqdW58anVsfGF1Z3xzZXB8b2N0fG5vdnxkZWMpL2ksXG4gIHdpZGU6IC9eKGphbnVhcnl8ZmVicnVhcnl8bWFyY2h8YXByaWx8bWF5fGp1bmV8anVseXxhdWd1c3R8c2VwdGVtYmVyfG9jdG9iZXJ8bm92ZW1iZXJ8ZGVjZW1iZXIpL2lcbn07XG52YXIgcGFyc2VNb250aFBhdHRlcm5zID0ge1xuICBuYXJyb3c6IFsvXmovaSwgL15mL2ksIC9ebS9pLCAvXmEvaSwgL15tL2ksIC9eai9pLCAvXmovaSwgL15hL2ksIC9ecy9pLCAvXm8vaSwgL15uL2ksIC9eZC9pXSxcbiAgYW55OiBbL15qYS9pLCAvXmYvaSwgL15tYXIvaSwgL15hcC9pLCAvXm1heS9pLCAvXmp1bi9pLCAvXmp1bC9pLCAvXmF1L2ksIC9ecy9pLCAvXm8vaSwgL15uL2ksIC9eZC9pXVxufTtcbnZhciBtYXRjaERheVBhdHRlcm5zID0ge1xuICBuYXJyb3c6IC9eW3NtdHdmXS9pLFxuICBzaG9ydDogL14oc3V8bW98dHV8d2V8dGh8ZnJ8c2EpL2ksXG4gIGFiYnJldmlhdGVkOiAvXihzdW58bW9ufHR1ZXx3ZWR8dGh1fGZyaXxzYXQpL2ksXG4gIHdpZGU6IC9eKHN1bmRheXxtb25kYXl8dHVlc2RheXx3ZWRuZXNkYXl8dGh1cnNkYXl8ZnJpZGF5fHNhdHVyZGF5KS9pXG59O1xudmFyIHBhcnNlRGF5UGF0dGVybnMgPSB7XG4gIG5hcnJvdzogWy9ecy9pLCAvXm0vaSwgL150L2ksIC9edy9pLCAvXnQvaSwgL15mL2ksIC9ecy9pXSxcbiAgYW55OiBbL15zdS9pLCAvXm0vaSwgL150dS9pLCAvXncvaSwgL150aC9pLCAvXmYvaSwgL15zYS9pXVxufTtcbnZhciBtYXRjaERheVBlcmlvZFBhdHRlcm5zID0ge1xuICBuYXJyb3c6IC9eKGF8cHxtaXxufChpbiB0aGV8YXQpIChtb3JuaW5nfGFmdGVybm9vbnxldmVuaW5nfG5pZ2h0KSkvaSxcbiAgYW55OiAvXihbYXBdXFwuP1xccz9tXFwuP3xtaWRuaWdodHxub29ufChpbiB0aGV8YXQpIChtb3JuaW5nfGFmdGVybm9vbnxldmVuaW5nfG5pZ2h0KSkvaVxufTtcbnZhciBwYXJzZURheVBlcmlvZFBhdHRlcm5zID0ge1xuICBhbnk6IHtcbiAgICBhbTogL15hL2ksXG4gICAgcG06IC9ecC9pLFxuICAgIG1pZG5pZ2h0OiAvXm1pL2ksXG4gICAgbm9vbjogL15uby9pLFxuICAgIG1vcm5pbmc6IC9tb3JuaW5nL2ksXG4gICAgYWZ0ZXJub29uOiAvYWZ0ZXJub29uL2ksXG4gICAgZXZlbmluZzogL2V2ZW5pbmcvaSxcbiAgICBuaWdodDogL25pZ2h0L2lcbiAgfVxufTtcbnZhciBtYXRjaCA9IHtcbiAgb3JkaW5hbE51bWJlcjogYnVpbGRNYXRjaFBhdHRlcm5Gbih7XG4gICAgbWF0Y2hQYXR0ZXJuOiBtYXRjaE9yZGluYWxOdW1iZXJQYXR0ZXJuLFxuICAgIHBhcnNlUGF0dGVybjogcGFyc2VPcmRpbmFsTnVtYmVyUGF0dGVybixcbiAgICB2YWx1ZUNhbGxiYWNrOiBmdW5jdGlvbiB2YWx1ZUNhbGxiYWNrKHZhbHVlKSB7XG4gICAgICByZXR1cm4gcGFyc2VJbnQodmFsdWUsIDEwKTtcbiAgICB9XG4gIH0pLFxuICBlcmE6IGJ1aWxkTWF0Y2hGbih7XG4gICAgbWF0Y2hQYXR0ZXJuczogbWF0Y2hFcmFQYXR0ZXJucyxcbiAgICBkZWZhdWx0TWF0Y2hXaWR0aDogJ3dpZGUnLFxuICAgIHBhcnNlUGF0dGVybnM6IHBhcnNlRXJhUGF0dGVybnMsXG4gICAgZGVmYXVsdFBhcnNlV2lkdGg6ICdhbnknXG4gIH0pLFxuICBxdWFydGVyOiBidWlsZE1hdGNoRm4oe1xuICAgIG1hdGNoUGF0dGVybnM6IG1hdGNoUXVhcnRlclBhdHRlcm5zLFxuICAgIGRlZmF1bHRNYXRjaFdpZHRoOiAnd2lkZScsXG4gICAgcGFyc2VQYXR0ZXJuczogcGFyc2VRdWFydGVyUGF0dGVybnMsXG4gICAgZGVmYXVsdFBhcnNlV2lkdGg6ICdhbnknLFxuICAgIHZhbHVlQ2FsbGJhY2s6IGZ1bmN0aW9uIHZhbHVlQ2FsbGJhY2soaW5kZXgpIHtcbiAgICAgIHJldHVybiBpbmRleCArIDE7XG4gICAgfVxuICB9KSxcbiAgbW9udGg6IGJ1aWxkTWF0Y2hGbih7XG4gICAgbWF0Y2hQYXR0ZXJuczogbWF0Y2hNb250aFBhdHRlcm5zLFxuICAgIGRlZmF1bHRNYXRjaFdpZHRoOiAnd2lkZScsXG4gICAgcGFyc2VQYXR0ZXJuczogcGFyc2VNb250aFBhdHRlcm5zLFxuICAgIGRlZmF1bHRQYXJzZVdpZHRoOiAnYW55J1xuICB9KSxcbiAgZGF5OiBidWlsZE1hdGNoRm4oe1xuICAgIG1hdGNoUGF0dGVybnM6IG1hdGNoRGF5UGF0dGVybnMsXG4gICAgZGVmYXVsdE1hdGNoV2lkdGg6ICd3aWRlJyxcbiAgICBwYXJzZVBhdHRlcm5zOiBwYXJzZURheVBhdHRlcm5zLFxuICAgIGRlZmF1bHRQYXJzZVdpZHRoOiAnYW55J1xuICB9KSxcbiAgZGF5UGVyaW9kOiBidWlsZE1hdGNoRm4oe1xuICAgIG1hdGNoUGF0dGVybnM6IG1hdGNoRGF5UGVyaW9kUGF0dGVybnMsXG4gICAgZGVmYXVsdE1hdGNoV2lkdGg6ICdhbnknLFxuICAgIHBhcnNlUGF0dGVybnM6IHBhcnNlRGF5UGVyaW9kUGF0dGVybnMsXG4gICAgZGVmYXVsdFBhcnNlV2lkdGg6ICdhbnknXG4gIH0pXG59O1xuZXhwb3J0IGRlZmF1bHQgbWF0Y2g7IiwiaW1wb3J0IGZvcm1hdERpc3RhbmNlIGZyb20gXCIuL19saWIvZm9ybWF0RGlzdGFuY2UvaW5kZXguanNcIjtcbmltcG9ydCBmb3JtYXRMb25nIGZyb20gXCIuL19saWIvZm9ybWF0TG9uZy9pbmRleC5qc1wiO1xuaW1wb3J0IGZvcm1hdFJlbGF0aXZlIGZyb20gXCIuL19saWIvZm9ybWF0UmVsYXRpdmUvaW5kZXguanNcIjtcbmltcG9ydCBsb2NhbGl6ZSBmcm9tIFwiLi9fbGliL2xvY2FsaXplL2luZGV4LmpzXCI7XG5pbXBvcnQgbWF0Y2ggZnJvbSBcIi4vX2xpYi9tYXRjaC9pbmRleC5qc1wiO1xuLyoqXG4gKiBAdHlwZSB7TG9jYWxlfVxuICogQGNhdGVnb3J5IExvY2FsZXNcbiAqIEBzdW1tYXJ5IEVuZ2xpc2ggbG9jYWxlIChVbml0ZWQgU3RhdGVzKS5cbiAqIEBsYW5ndWFnZSBFbmdsaXNoXG4gKiBAaXNvLTYzOS0yIGVuZ1xuICogQGF1dGhvciBTYXNoYSBLb3NzIFtAa29zc25vY29ycF17QGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL2tvc3Nub2NvcnB9XG4gKiBAYXV0aG9yIExlc2hhIEtvc3MgW0BsZXNoYWtvc3Nde0BsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9sZXNoYWtvc3N9XG4gKi9cbnZhciBsb2NhbGUgPSB7XG4gIGNvZGU6ICdlbi1VUycsXG4gIGZvcm1hdERpc3RhbmNlOiBmb3JtYXREaXN0YW5jZSxcbiAgZm9ybWF0TG9uZzogZm9ybWF0TG9uZyxcbiAgZm9ybWF0UmVsYXRpdmU6IGZvcm1hdFJlbGF0aXZlLFxuICBsb2NhbGl6ZTogbG9jYWxpemUsXG4gIG1hdGNoOiBtYXRjaCxcbiAgb3B0aW9uczoge1xuICAgIHdlZWtTdGFydHNPbjogMCAvKiBTdW5kYXkgKi8sXG4gICAgZmlyc3RXZWVrQ29udGFpbnNEYXRlOiAxXG4gIH1cbn07XG5leHBvcnQgZGVmYXVsdCBsb2NhbGU7IiwiaW1wb3J0IHRvRGF0ZSBmcm9tIFwiLi4vdG9EYXRlL2luZGV4LmpzXCI7XG5pbXBvcnQgcmVxdWlyZWRBcmdzIGZyb20gXCIuLi9fbGliL3JlcXVpcmVkQXJncy9pbmRleC5qc1wiO1xuLyoqXG4gKiBAbmFtZSBzdGFydE9mRGF5XG4gKiBAY2F0ZWdvcnkgRGF5IEhlbHBlcnNcbiAqIEBzdW1tYXJ5IFJldHVybiB0aGUgc3RhcnQgb2YgYSBkYXkgZm9yIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogUmV0dXJuIHRoZSBzdGFydCBvZiBhIGRheSBmb3IgdGhlIGdpdmVuIGRhdGUuXG4gKiBUaGUgcmVzdWx0IHdpbGwgYmUgaW4gdGhlIGxvY2FsIHRpbWV6b25lLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxOdW1iZXJ9IGRhdGUgLSB0aGUgb3JpZ2luYWwgZGF0ZVxuICogQHJldHVybnMge0RhdGV9IHRoZSBzdGFydCBvZiBhIGRheVxuICogQHRocm93cyB7VHlwZUVycm9yfSAxIGFyZ3VtZW50IHJlcXVpcmVkXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFRoZSBzdGFydCBvZiBhIGRheSBmb3IgMiBTZXB0ZW1iZXIgMjAxNCAxMTo1NTowMDpcbiAqIGNvbnN0IHJlc3VsdCA9IHN0YXJ0T2ZEYXkobmV3IERhdGUoMjAxNCwgOCwgMiwgMTEsIDU1LCAwKSlcbiAqIC8vPT4gVHVlIFNlcCAwMiAyMDE0IDAwOjAwOjAwXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHN0YXJ0T2ZEYXkoZGlydHlEYXRlKSB7XG4gIHJlcXVpcmVkQXJncygxLCBhcmd1bWVudHMpO1xuICB2YXIgZGF0ZSA9IHRvRGF0ZShkaXJ0eURhdGUpO1xuICBkYXRlLnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICByZXR1cm4gZGF0ZTtcbn0iLCJpbXBvcnQgdG9EYXRlIGZyb20gXCIuLi90b0RhdGUvaW5kZXguanNcIjtcbmltcG9ydCB0b0ludGVnZXIgZnJvbSBcIi4uL19saWIvdG9JbnRlZ2VyL2luZGV4LmpzXCI7XG5pbXBvcnQgcmVxdWlyZWRBcmdzIGZyb20gXCIuLi9fbGliL3JlcXVpcmVkQXJncy9pbmRleC5qc1wiO1xuaW1wb3J0IHsgZ2V0RGVmYXVsdE9wdGlvbnMgfSBmcm9tIFwiLi4vX2xpYi9kZWZhdWx0T3B0aW9ucy9pbmRleC5qc1wiO1xuLyoqXG4gKiBAbmFtZSBzdGFydE9mV2Vla1xuICogQGNhdGVnb3J5IFdlZWsgSGVscGVyc1xuICogQHN1bW1hcnkgUmV0dXJuIHRoZSBzdGFydCBvZiBhIHdlZWsgZm9yIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogUmV0dXJuIHRoZSBzdGFydCBvZiBhIHdlZWsgZm9yIHRoZSBnaXZlbiBkYXRlLlxuICogVGhlIHJlc3VsdCB3aWxsIGJlIGluIHRoZSBsb2NhbCB0aW1lem9uZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8TnVtYmVyfSBkYXRlIC0gdGhlIG9yaWdpbmFsIGRhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBhbiBvYmplY3Qgd2l0aCBvcHRpb25zLlxuICogQHBhcmFtIHtMb2NhbGV9IFtvcHRpb25zLmxvY2FsZT1kZWZhdWx0TG9jYWxlXSAtIHRoZSBsb2NhbGUgb2JqZWN0LiBTZWUgW0xvY2FsZV17QGxpbmsgaHR0cHM6Ly9kYXRlLWZucy5vcmcvZG9jcy9Mb2NhbGV9XG4gKiBAcGFyYW0gezB8MXwyfDN8NHw1fDZ9IFtvcHRpb25zLndlZWtTdGFydHNPbj0wXSAtIHRoZSBpbmRleCBvZiB0aGUgZmlyc3QgZGF5IG9mIHRoZSB3ZWVrICgwIC0gU3VuZGF5KVxuICogQHJldHVybnMge0RhdGV9IHRoZSBzdGFydCBvZiBhIHdlZWtcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gMSBhcmd1bWVudCByZXF1aXJlZFxuICogQHRocm93cyB7UmFuZ2VFcnJvcn0gYG9wdGlvbnMud2Vla1N0YXJ0c09uYCBtdXN0IGJlIGJldHdlZW4gMCBhbmQgNlxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBUaGUgc3RhcnQgb2YgYSB3ZWVrIGZvciAyIFNlcHRlbWJlciAyMDE0IDExOjU1OjAwOlxuICogY29uc3QgcmVzdWx0ID0gc3RhcnRPZldlZWsobmV3IERhdGUoMjAxNCwgOCwgMiwgMTEsIDU1LCAwKSlcbiAqIC8vPT4gU3VuIEF1ZyAzMSAyMDE0IDAwOjAwOjAwXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIElmIHRoZSB3ZWVrIHN0YXJ0cyBvbiBNb25kYXksIHRoZSBzdGFydCBvZiB0aGUgd2VlayBmb3IgMiBTZXB0ZW1iZXIgMjAxNCAxMTo1NTowMDpcbiAqIGNvbnN0IHJlc3VsdCA9IHN0YXJ0T2ZXZWVrKG5ldyBEYXRlKDIwMTQsIDgsIDIsIDExLCA1NSwgMCksIHsgd2Vla1N0YXJ0c09uOiAxIH0pXG4gKiAvLz0+IE1vbiBTZXAgMDEgMjAxNCAwMDowMDowMFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzdGFydE9mV2VlayhkaXJ0eURhdGUsIG9wdGlvbnMpIHtcbiAgdmFyIF9yZWYsIF9yZWYyLCBfcmVmMywgX29wdGlvbnMkd2Vla1N0YXJ0c09uLCBfb3B0aW9ucyRsb2NhbGUsIF9vcHRpb25zJGxvY2FsZSRvcHRpbywgX2RlZmF1bHRPcHRpb25zJGxvY2FsLCBfZGVmYXVsdE9wdGlvbnMkbG9jYWwyO1xuICByZXF1aXJlZEFyZ3MoMSwgYXJndW1lbnRzKTtcbiAgdmFyIGRlZmF1bHRPcHRpb25zID0gZ2V0RGVmYXVsdE9wdGlvbnMoKTtcbiAgdmFyIHdlZWtTdGFydHNPbiA9IHRvSW50ZWdlcigoX3JlZiA9IChfcmVmMiA9IChfcmVmMyA9IChfb3B0aW9ucyR3ZWVrU3RhcnRzT24gPSBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMud2Vla1N0YXJ0c09uKSAhPT0gbnVsbCAmJiBfb3B0aW9ucyR3ZWVrU3RhcnRzT24gIT09IHZvaWQgMCA/IF9vcHRpb25zJHdlZWtTdGFydHNPbiA6IG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogKF9vcHRpb25zJGxvY2FsZSA9IG9wdGlvbnMubG9jYWxlKSA9PT0gbnVsbCB8fCBfb3B0aW9ucyRsb2NhbGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IChfb3B0aW9ucyRsb2NhbGUkb3B0aW8gPSBfb3B0aW9ucyRsb2NhbGUub3B0aW9ucykgPT09IG51bGwgfHwgX29wdGlvbnMkbG9jYWxlJG9wdGlvID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfb3B0aW9ucyRsb2NhbGUkb3B0aW8ud2Vla1N0YXJ0c09uKSAhPT0gbnVsbCAmJiBfcmVmMyAhPT0gdm9pZCAwID8gX3JlZjMgOiBkZWZhdWx0T3B0aW9ucy53ZWVrU3RhcnRzT24pICE9PSBudWxsICYmIF9yZWYyICE9PSB2b2lkIDAgPyBfcmVmMiA6IChfZGVmYXVsdE9wdGlvbnMkbG9jYWwgPSBkZWZhdWx0T3B0aW9ucy5sb2NhbGUpID09PSBudWxsIHx8IF9kZWZhdWx0T3B0aW9ucyRsb2NhbCA9PT0gdm9pZCAwID8gdm9pZCAwIDogKF9kZWZhdWx0T3B0aW9ucyRsb2NhbDIgPSBfZGVmYXVsdE9wdGlvbnMkbG9jYWwub3B0aW9ucykgPT09IG51bGwgfHwgX2RlZmF1bHRPcHRpb25zJGxvY2FsMiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2RlZmF1bHRPcHRpb25zJGxvY2FsMi53ZWVrU3RhcnRzT24pICE9PSBudWxsICYmIF9yZWYgIT09IHZvaWQgMCA/IF9yZWYgOiAwKTtcblxuICAvLyBUZXN0IGlmIHdlZWtTdGFydHNPbiBpcyBiZXR3ZWVuIDAgYW5kIDYgX2FuZF8gaXMgbm90IE5hTlxuICBpZiAoISh3ZWVrU3RhcnRzT24gPj0gMCAmJiB3ZWVrU3RhcnRzT24gPD0gNikpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignd2Vla1N0YXJ0c09uIG11c3QgYmUgYmV0d2VlbiAwIGFuZCA2IGluY2x1c2l2ZWx5Jyk7XG4gIH1cbiAgdmFyIGRhdGUgPSB0b0RhdGUoZGlydHlEYXRlKTtcbiAgdmFyIGRheSA9IGRhdGUuZ2V0RGF5KCk7XG4gIHZhciBkaWZmID0gKGRheSA8IHdlZWtTdGFydHNPbiA/IDcgOiAwKSArIGRheSAtIHdlZWtTdGFydHNPbjtcbiAgZGF0ZS5zZXREYXRlKGRhdGUuZ2V0RGF0ZSgpIC0gZGlmZik7XG4gIGRhdGUuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gIHJldHVybiBkYXRlO1xufSIsImltcG9ydCBhZGRNaWxsaXNlY29uZHMgZnJvbSBcIi4uL2FkZE1pbGxpc2Vjb25kcy9pbmRleC5qc1wiO1xuaW1wb3J0IHJlcXVpcmVkQXJncyBmcm9tIFwiLi4vX2xpYi9yZXF1aXJlZEFyZ3MvaW5kZXguanNcIjtcbmltcG9ydCB0b0ludGVnZXIgZnJvbSBcIi4uL19saWIvdG9JbnRlZ2VyL2luZGV4LmpzXCI7XG4vKipcbiAqIEBuYW1lIHN1Yk1pbGxpc2Vjb25kc1xuICogQGNhdGVnb3J5IE1pbGxpc2Vjb25kIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IFN1YnRyYWN0IHRoZSBzcGVjaWZpZWQgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyBmcm9tIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogU3VidHJhY3QgdGhlIHNwZWNpZmllZCBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIGZyb20gdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQHBhcmFtIHtEYXRlfE51bWJlcn0gZGF0ZSAtIHRoZSBkYXRlIHRvIGJlIGNoYW5nZWRcbiAqIEBwYXJhbSB7TnVtYmVyfSBhbW91bnQgLSB0aGUgYW1vdW50IG9mIG1pbGxpc2Vjb25kcyB0byBiZSBzdWJ0cmFjdGVkLiBQb3NpdGl2ZSBkZWNpbWFscyB3aWxsIGJlIHJvdW5kZWQgdXNpbmcgYE1hdGguZmxvb3JgLCBkZWNpbWFscyBsZXNzIHRoYW4gemVybyB3aWxsIGJlIHJvdW5kZWQgdXNpbmcgYE1hdGguY2VpbGAuXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIG5ldyBkYXRlIHdpdGggdGhlIG1pbGxpc2Vjb25kcyBzdWJ0cmFjdGVkXG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IDIgYXJndW1lbnRzIHJlcXVpcmVkXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFN1YnRyYWN0IDc1MCBtaWxsaXNlY29uZHMgZnJvbSAxMCBKdWx5IDIwMTQgMTI6NDU6MzAuMDAwOlxuICogY29uc3QgcmVzdWx0ID0gc3ViTWlsbGlzZWNvbmRzKG5ldyBEYXRlKDIwMTQsIDYsIDEwLCAxMiwgNDUsIDMwLCAwKSwgNzUwKVxuICogLy89PiBUaHUgSnVsIDEwIDIwMTQgMTI6NDU6MjkuMjUwXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHN1Yk1pbGxpc2Vjb25kcyhkaXJ0eURhdGUsIGRpcnR5QW1vdW50KSB7XG4gIHJlcXVpcmVkQXJncygyLCBhcmd1bWVudHMpO1xuICB2YXIgYW1vdW50ID0gdG9JbnRlZ2VyKGRpcnR5QW1vdW50KTtcbiAgcmV0dXJuIGFkZE1pbGxpc2Vjb25kcyhkaXJ0eURhdGUsIC1hbW91bnQpO1xufSIsImltcG9ydCBfdHlwZW9mIGZyb20gXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS90eXBlb2ZcIjtcbmltcG9ydCByZXF1aXJlZEFyZ3MgZnJvbSBcIi4uL19saWIvcmVxdWlyZWRBcmdzL2luZGV4LmpzXCI7XG4vKipcbiAqIEBuYW1lIHRvRGF0ZVxuICogQGNhdGVnb3J5IENvbW1vbiBIZWxwZXJzXG4gKiBAc3VtbWFyeSBDb252ZXJ0IHRoZSBnaXZlbiBhcmd1bWVudCB0byBhbiBpbnN0YW5jZSBvZiBEYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogQ29udmVydCB0aGUgZ2l2ZW4gYXJndW1lbnQgdG8gYW4gaW5zdGFuY2Ugb2YgRGF0ZS5cbiAqXG4gKiBJZiB0aGUgYXJndW1lbnQgaXMgYW4gaW5zdGFuY2Ugb2YgRGF0ZSwgdGhlIGZ1bmN0aW9uIHJldHVybnMgaXRzIGNsb25lLlxuICpcbiAqIElmIHRoZSBhcmd1bWVudCBpcyBhIG51bWJlciwgaXQgaXMgdHJlYXRlZCBhcyBhIHRpbWVzdGFtcC5cbiAqXG4gKiBJZiB0aGUgYXJndW1lbnQgaXMgbm9uZSBvZiB0aGUgYWJvdmUsIHRoZSBmdW5jdGlvbiByZXR1cm5zIEludmFsaWQgRGF0ZS5cbiAqXG4gKiAqKk5vdGUqKjogKmFsbCogRGF0ZSBhcmd1bWVudHMgcGFzc2VkIHRvIGFueSAqZGF0ZS1mbnMqIGZ1bmN0aW9uIGlzIHByb2Nlc3NlZCBieSBgdG9EYXRlYC5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8TnVtYmVyfSBhcmd1bWVudCAtIHRoZSB2YWx1ZSB0byBjb252ZXJ0XG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIHBhcnNlZCBkYXRlIGluIHRoZSBsb2NhbCB0aW1lIHpvbmVcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gMSBhcmd1bWVudCByZXF1aXJlZFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBDbG9uZSB0aGUgZGF0ZTpcbiAqIGNvbnN0IHJlc3VsdCA9IHRvRGF0ZShuZXcgRGF0ZSgyMDE0LCAxLCAxMSwgMTEsIDMwLCAzMCkpXG4gKiAvLz0+IFR1ZSBGZWIgMTEgMjAxNCAxMTozMDozMFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBDb252ZXJ0IHRoZSB0aW1lc3RhbXAgdG8gZGF0ZTpcbiAqIGNvbnN0IHJlc3VsdCA9IHRvRGF0ZSgxMzkyMDk4NDMwMDAwKVxuICogLy89PiBUdWUgRmViIDExIDIwMTQgMTE6MzA6MzBcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdG9EYXRlKGFyZ3VtZW50KSB7XG4gIHJlcXVpcmVkQXJncygxLCBhcmd1bWVudHMpO1xuICB2YXIgYXJnU3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFyZ3VtZW50KTtcblxuICAvLyBDbG9uZSB0aGUgZGF0ZVxuICBpZiAoYXJndW1lbnQgaW5zdGFuY2VvZiBEYXRlIHx8IF90eXBlb2YoYXJndW1lbnQpID09PSAnb2JqZWN0JyAmJiBhcmdTdHIgPT09ICdbb2JqZWN0IERhdGVdJykge1xuICAgIC8vIFByZXZlbnQgdGhlIGRhdGUgdG8gbG9zZSB0aGUgbWlsbGlzZWNvbmRzIHdoZW4gcGFzc2VkIHRvIG5ldyBEYXRlKCkgaW4gSUUxMFxuICAgIHJldHVybiBuZXcgRGF0ZShhcmd1bWVudC5nZXRUaW1lKCkpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBhcmd1bWVudCA9PT0gJ251bWJlcicgfHwgYXJnU3RyID09PSAnW29iamVjdCBOdW1iZXJdJykge1xuICAgIHJldHVybiBuZXcgRGF0ZShhcmd1bWVudCk7XG4gIH0gZWxzZSB7XG4gICAgaWYgKCh0eXBlb2YgYXJndW1lbnQgPT09ICdzdHJpbmcnIHx8IGFyZ1N0ciA9PT0gJ1tvYmplY3QgU3RyaW5nXScpICYmIHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgIGNvbnNvbGUud2FybihcIlN0YXJ0aW5nIHdpdGggdjIuMC4wLWJldGEuMSBkYXRlLWZucyBkb2Vzbid0IGFjY2VwdCBzdHJpbmdzIGFzIGRhdGUgYXJndW1lbnRzLiBQbGVhc2UgdXNlIGBwYXJzZUlTT2AgdG8gcGFyc2Ugc3RyaW5ncy4gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvZGF0ZS1mbnMvYmxvYi9tYXN0ZXIvZG9jcy91cGdyYWRlR3VpZGUubWQjc3RyaW5nLWFyZ3VtZW50c1wiKTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICBjb25zb2xlLndhcm4obmV3IEVycm9yKCkuc3RhY2spO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IERhdGUoTmFOKTtcbiAgfVxufSIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9yZXNldC5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3Jlc2V0LmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiY29uc3QgcmFuZG9tVVVJRCA9IHR5cGVvZiBjcnlwdG8gIT09ICd1bmRlZmluZWQnICYmIGNyeXB0by5yYW5kb21VVUlEICYmIGNyeXB0by5yYW5kb21VVUlELmJpbmQoY3J5cHRvKTtcbmV4cG9ydCBkZWZhdWx0IHtcbiAgcmFuZG9tVVVJRFxufTsiLCJleHBvcnQgZGVmYXVsdCAvXig/OlswLTlhLWZdezh9LVswLTlhLWZdezR9LVsxLTVdWzAtOWEtZl17M30tWzg5YWJdWzAtOWEtZl17M30tWzAtOWEtZl17MTJ9fDAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCkkL2k7IiwiLy8gVW5pcXVlIElEIGNyZWF0aW9uIHJlcXVpcmVzIGEgaGlnaCBxdWFsaXR5IHJhbmRvbSAjIGdlbmVyYXRvci4gSW4gdGhlIGJyb3dzZXIgd2UgdGhlcmVmb3JlXG4vLyByZXF1aXJlIHRoZSBjcnlwdG8gQVBJIGFuZCBkbyBub3Qgc3VwcG9ydCBidWlsdC1pbiBmYWxsYmFjayB0byBsb3dlciBxdWFsaXR5IHJhbmRvbSBudW1iZXJcbi8vIGdlbmVyYXRvcnMgKGxpa2UgTWF0aC5yYW5kb20oKSkuXG5sZXQgZ2V0UmFuZG9tVmFsdWVzO1xuY29uc3Qgcm5kczggPSBuZXcgVWludDhBcnJheSgxNik7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBybmcoKSB7XG4gIC8vIGxhenkgbG9hZCBzbyB0aGF0IGVudmlyb25tZW50cyB0aGF0IG5lZWQgdG8gcG9seWZpbGwgaGF2ZSBhIGNoYW5jZSB0byBkbyBzb1xuICBpZiAoIWdldFJhbmRvbVZhbHVlcykge1xuICAgIC8vIGdldFJhbmRvbVZhbHVlcyBuZWVkcyB0byBiZSBpbnZva2VkIGluIGEgY29udGV4dCB3aGVyZSBcInRoaXNcIiBpcyBhIENyeXB0byBpbXBsZW1lbnRhdGlvbi5cbiAgICBnZXRSYW5kb21WYWx1ZXMgPSB0eXBlb2YgY3J5cHRvICE9PSAndW5kZWZpbmVkJyAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzICYmIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMuYmluZChjcnlwdG8pO1xuXG4gICAgaWYgKCFnZXRSYW5kb21WYWx1ZXMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignY3J5cHRvLmdldFJhbmRvbVZhbHVlcygpIG5vdCBzdXBwb3J0ZWQuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdXVpZGpzL3V1aWQjZ2V0cmFuZG9tdmFsdWVzLW5vdC1zdXBwb3J0ZWQnKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZ2V0UmFuZG9tVmFsdWVzKHJuZHM4KTtcbn0iLCJpbXBvcnQgdmFsaWRhdGUgZnJvbSAnLi92YWxpZGF0ZS5qcyc7XG4vKipcbiAqIENvbnZlcnQgYXJyYXkgb2YgMTYgYnl0ZSB2YWx1ZXMgdG8gVVVJRCBzdHJpbmcgZm9ybWF0IG9mIHRoZSBmb3JtOlxuICogWFhYWFhYWFgtWFhYWC1YWFhYLVhYWFgtWFhYWFhYWFhYWFhYXG4gKi9cblxuY29uc3QgYnl0ZVRvSGV4ID0gW107XG5cbmZvciAobGV0IGkgPSAwOyBpIDwgMjU2OyArK2kpIHtcbiAgYnl0ZVRvSGV4LnB1c2goKGkgKyAweDEwMCkudG9TdHJpbmcoMTYpLnNsaWNlKDEpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVuc2FmZVN0cmluZ2lmeShhcnIsIG9mZnNldCA9IDApIHtcbiAgLy8gTm90ZTogQmUgY2FyZWZ1bCBlZGl0aW5nIHRoaXMgY29kZSEgIEl0J3MgYmVlbiB0dW5lZCBmb3IgcGVyZm9ybWFuY2VcbiAgLy8gYW5kIHdvcmtzIGluIHdheXMgeW91IG1heSBub3QgZXhwZWN0LiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3V1aWRqcy91dWlkL3B1bGwvNDM0XG4gIHJldHVybiAoYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAwXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDFdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMl1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAzXV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDRdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgNV1dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA2XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDddXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgOF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA5XV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEwXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDExXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEyXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEzXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDE0XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDE1XV0pLnRvTG93ZXJDYXNlKCk7XG59XG5cbmZ1bmN0aW9uIHN0cmluZ2lmeShhcnIsIG9mZnNldCA9IDApIHtcbiAgY29uc3QgdXVpZCA9IHVuc2FmZVN0cmluZ2lmeShhcnIsIG9mZnNldCk7IC8vIENvbnNpc3RlbmN5IGNoZWNrIGZvciB2YWxpZCBVVUlELiAgSWYgdGhpcyB0aHJvd3MsIGl0J3MgbGlrZWx5IGR1ZSB0byBvbmVcbiAgLy8gb2YgdGhlIGZvbGxvd2luZzpcbiAgLy8gLSBPbmUgb3IgbW9yZSBpbnB1dCBhcnJheSB2YWx1ZXMgZG9uJ3QgbWFwIHRvIGEgaGV4IG9jdGV0IChsZWFkaW5nIHRvXG4gIC8vIFwidW5kZWZpbmVkXCIgaW4gdGhlIHV1aWQpXG4gIC8vIC0gSW52YWxpZCBpbnB1dCB2YWx1ZXMgZm9yIHRoZSBSRkMgYHZlcnNpb25gIG9yIGB2YXJpYW50YCBmaWVsZHNcblxuICBpZiAoIXZhbGlkYXRlKHV1aWQpKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKCdTdHJpbmdpZmllZCBVVUlEIGlzIGludmFsaWQnKTtcbiAgfVxuXG4gIHJldHVybiB1dWlkO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzdHJpbmdpZnk7IiwiaW1wb3J0IG5hdGl2ZSBmcm9tICcuL25hdGl2ZS5qcyc7XG5pbXBvcnQgcm5nIGZyb20gJy4vcm5nLmpzJztcbmltcG9ydCB7IHVuc2FmZVN0cmluZ2lmeSB9IGZyb20gJy4vc3RyaW5naWZ5LmpzJztcblxuZnVuY3Rpb24gdjQob3B0aW9ucywgYnVmLCBvZmZzZXQpIHtcbiAgaWYgKG5hdGl2ZS5yYW5kb21VVUlEICYmICFidWYgJiYgIW9wdGlvbnMpIHtcbiAgICByZXR1cm4gbmF0aXZlLnJhbmRvbVVVSUQoKTtcbiAgfVxuXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBjb25zdCBybmRzID0gb3B0aW9ucy5yYW5kb20gfHwgKG9wdGlvbnMucm5nIHx8IHJuZykoKTsgLy8gUGVyIDQuNCwgc2V0IGJpdHMgZm9yIHZlcnNpb24gYW5kIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYFxuXG4gIHJuZHNbNl0gPSBybmRzWzZdICYgMHgwZiB8IDB4NDA7XG4gIHJuZHNbOF0gPSBybmRzWzhdICYgMHgzZiB8IDB4ODA7IC8vIENvcHkgYnl0ZXMgdG8gYnVmZmVyLCBpZiBwcm92aWRlZFxuXG4gIGlmIChidWYpIHtcbiAgICBvZmZzZXQgPSBvZmZzZXQgfHwgMDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTY7ICsraSkge1xuICAgICAgYnVmW29mZnNldCArIGldID0gcm5kc1tpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYnVmO1xuICB9XG5cbiAgcmV0dXJuIHVuc2FmZVN0cmluZ2lmeShybmRzKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdjQ7IiwiaW1wb3J0IFJFR0VYIGZyb20gJy4vcmVnZXguanMnO1xuXG5mdW5jdGlvbiB2YWxpZGF0ZSh1dWlkKSB7XG4gIHJldHVybiB0eXBlb2YgdXVpZCA9PT0gJ3N0cmluZycgJiYgUkVHRVgudGVzdCh1dWlkKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdmFsaWRhdGU7IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgXCJAYmFiZWwvaGVscGVycyAtIHR5cGVvZlwiO1xuXG4gIHJldHVybiBfdHlwZW9mID0gXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgJiYgXCJzeW1ib2xcIiA9PSB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID8gZnVuY3Rpb24gKG9iaikge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqO1xuICB9IDogZnVuY3Rpb24gKG9iaikge1xuICAgIHJldHVybiBvYmogJiYgXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7XG4gIH0sIF90eXBlb2Yob2JqKTtcbn0iLCIvKipcbiAqIEEgc2V0IG9mIGFsbCB0aGUgcGFyZW50cyBjdXJyZW50bHkgYmVpbmcgb2JzZXJ2ZS4gVGhpcyBpcyB0aGUgb25seSBub24gd2Vha1xuICogcmVnaXN0cnkuXG4gKi9cbmNvbnN0IHBhcmVudHMgPSBuZXcgU2V0KCk7XG4vKipcbiAqIEVsZW1lbnQgY29vcmRpbmF0ZXMgdGhhdCBpcyBjb25zdGFudGx5IGtlcHQgdXAgdG8gZGF0ZS5cbiAqL1xuY29uc3QgY29vcmRzID0gbmV3IFdlYWtNYXAoKTtcbi8qKlxuICogU2libGluZ3Mgb2YgZWxlbWVudHMgdGhhdCBoYXZlIGJlZW4gcmVtb3ZlZCBmcm9tIHRoZSBkb20uXG4gKi9cbmNvbnN0IHNpYmxpbmdzID0gbmV3IFdlYWtNYXAoKTtcbi8qKlxuICogQW5pbWF0aW9ucyB0aGF0IGFyZSBjdXJyZW50bHkgcnVubmluZy5cbiAqL1xuY29uc3QgYW5pbWF0aW9ucyA9IG5ldyBXZWFrTWFwKCk7XG4vKipcbiAqIEEgbWFwIG9mIGV4aXN0aW5nIGludGVyc2VjdGlvbiBvYnNlcnZlcnMgdXNlZCB0byB0cmFjayBlbGVtZW50IG1vdmVtZW50cy5cbiAqL1xuY29uc3QgaW50ZXJzZWN0aW9ucyA9IG5ldyBXZWFrTWFwKCk7XG4vKipcbiAqIEludGVydmFscyBmb3IgYXV0b21hdGljYWxseSBjaGVja2luZyB0aGUgcG9zaXRpb24gb2YgZWxlbWVudHMgb2NjYXNpb25hbGx5LlxuICovXG5jb25zdCBpbnRlcnZhbHMgPSBuZXcgV2Vha01hcCgpO1xuLyoqXG4gKiBUaGUgY29uZmlndXJhdGlvbiBvcHRpb25zIGZvciBlYWNoIGdyb3VwIG9mIGVsZW1lbnRzLlxuICovXG5jb25zdCBvcHRpb25zID0gbmV3IFdlYWtNYXAoKTtcbi8qKlxuICogRGVib3VuY2UgY291bnRlcnMgYnkgaWQsIHVzZWQgdG8gZGVib3VuY2UgY2FsbHMgdG8gdXBkYXRlIHBvc2l0aW9ucy5cbiAqL1xuY29uc3QgZGVib3VuY2VzID0gbmV3IFdlYWtNYXAoKTtcbi8qKlxuICogQWxsIHBhcmVudHMgdGhhdCBhcmUgY3VycmVudGx5IGVuYWJsZWQgYXJlIHRyYWNrZWQgaGVyZS5cbiAqL1xuY29uc3QgZW5hYmxlZCA9IG5ldyBXZWFrU2V0KCk7XG4vKipcbiAqIFRoZSBkb2N1bWVudCB1c2VkIHRvIGNhbGN1bGF0ZSB0cmFuc2l0aW9ucy5cbiAqL1xubGV0IHJvb3Q7XG4vKipcbiAqIFVzZWQgdG8gc2lnbiBhbiBlbGVtZW50IGFzIHRoZSB0YXJnZXQuXG4gKi9cbmNvbnN0IFRHVCA9IFwiX19hYV90Z3RcIjtcbi8qKlxuICogVXNlZCB0byBzaWduIGFuIGVsZW1lbnQgYXMgYmVpbmcgcGFydCBvZiBhIHJlbW92YWwuXG4gKi9cbmNvbnN0IERFTCA9IFwiX19hYV9kZWxcIjtcbi8qKlxuICogQ2FsbGJhY2sgZm9yIGhhbmRsaW5nIGFsbCBtdXRhdGlvbnMuXG4gKiBAcGFyYW0gbXV0YXRpb25zIC0gQSBtdXRhdGlvbiBsaXN0XG4gKi9cbmNvbnN0IGhhbmRsZU11dGF0aW9ucyA9IChtdXRhdGlvbnMpID0+IHtcbiAgICBjb25zdCBlbGVtZW50cyA9IGdldEVsZW1lbnRzKG11dGF0aW9ucyk7XG4gICAgLy8gSWYgZWxlbWVudHMgaXMgXCJmYWxzZVwiIHRoYXQgbWVhbnMgdGhpcyBtdXRhdGlvbiB0aGF0IHNob3VsZCBiZSBpZ25vcmVkLlxuICAgIGlmIChlbGVtZW50cykge1xuICAgICAgICBlbGVtZW50cy5mb3JFYWNoKChlbCkgPT4gYW5pbWF0ZShlbCkpO1xuICAgIH1cbn07XG4vKipcbiAqXG4gKiBAcGFyYW0gZW50cmllcyAtIEVsZW1lbnRzIHRoYXQgaGF2ZSBiZWVuIHJlc2l6ZWQuXG4gKi9cbmNvbnN0IGhhbmRsZVJlc2l6ZXMgPSAoZW50cmllcykgPT4ge1xuICAgIGVudHJpZXMuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICAgICAgaWYgKGVudHJ5LnRhcmdldCA9PT0gcm9vdClcbiAgICAgICAgICAgIHVwZGF0ZUFsbFBvcygpO1xuICAgICAgICBpZiAoY29vcmRzLmhhcyhlbnRyeS50YXJnZXQpKVxuICAgICAgICAgICAgdXBkYXRlUG9zKGVudHJ5LnRhcmdldCk7XG4gICAgfSk7XG59O1xuLyoqXG4gKiBPYnNlcnZlIHRoaXMgZWxlbWVudHMgcG9zaXRpb24uXG4gKiBAcGFyYW0gZWwgLSBUaGUgZWxlbWVudCB0byBvYnNlcnZlIHRoZSBwb3NpdGlvbiBvZi5cbiAqL1xuZnVuY3Rpb24gb2JzZXJ2ZVBvc2l0aW9uKGVsKSB7XG4gICAgY29uc3Qgb2xkT2JzZXJ2ZXIgPSBpbnRlcnNlY3Rpb25zLmdldChlbCk7XG4gICAgb2xkT2JzZXJ2ZXIgPT09IG51bGwgfHwgb2xkT2JzZXJ2ZXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9sZE9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICBsZXQgcmVjdCA9IGNvb3Jkcy5nZXQoZWwpO1xuICAgIGxldCBpbnZvY2F0aW9ucyA9IDA7XG4gICAgY29uc3QgYnVmZmVyID0gNTtcbiAgICBpZiAoIXJlY3QpIHtcbiAgICAgICAgcmVjdCA9IGdldENvb3JkcyhlbCk7XG4gICAgICAgIGNvb3Jkcy5zZXQoZWwsIHJlY3QpO1xuICAgIH1cbiAgICBjb25zdCB7IG9mZnNldFdpZHRoLCBvZmZzZXRIZWlnaHQgfSA9IHJvb3Q7XG4gICAgY29uc3Qgcm9vdE1hcmdpbnMgPSBbXG4gICAgICAgIHJlY3QudG9wIC0gYnVmZmVyLFxuICAgICAgICBvZmZzZXRXaWR0aCAtIChyZWN0LmxlZnQgKyBidWZmZXIgKyByZWN0LndpZHRoKSxcbiAgICAgICAgb2Zmc2V0SGVpZ2h0IC0gKHJlY3QudG9wICsgYnVmZmVyICsgcmVjdC5oZWlnaHQpLFxuICAgICAgICByZWN0LmxlZnQgLSBidWZmZXIsXG4gICAgXTtcbiAgICBjb25zdCByb290TWFyZ2luID0gcm9vdE1hcmdpbnNcbiAgICAgICAgLm1hcCgocHgpID0+IGAkey0xICogTWF0aC5mbG9vcihweCl9cHhgKVxuICAgICAgICAuam9pbihcIiBcIik7XG4gICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xuICAgICAgICArK2ludm9jYXRpb25zID4gMSAmJiB1cGRhdGVQb3MoZWwpO1xuICAgIH0sIHtcbiAgICAgICAgcm9vdCxcbiAgICAgICAgdGhyZXNob2xkOiAxLFxuICAgICAgICByb290TWFyZ2luLFxuICAgIH0pO1xuICAgIG9ic2VydmVyLm9ic2VydmUoZWwpO1xuICAgIGludGVyc2VjdGlvbnMuc2V0KGVsLCBvYnNlcnZlcik7XG59XG4vKipcbiAqIFVwZGF0ZSB0aGUgZXhhY3QgcG9zaXRpb24gb2YgYSBnaXZlbiBlbGVtZW50LlxuICogQHBhcmFtIGVsIC0gQW4gZWxlbWVudCB0byB1cGRhdGUgdGhlIHBvc2l0aW9uIG9mLlxuICovXG5mdW5jdGlvbiB1cGRhdGVQb3MoZWwpIHtcbiAgICBjbGVhclRpbWVvdXQoZGVib3VuY2VzLmdldChlbCkpO1xuICAgIGNvbnN0IG9wdGlvbnNPclBsdWdpbiA9IGdldE9wdGlvbnMoZWwpO1xuICAgIGNvbnN0IGRlbGF5ID0gdHlwZW9mIG9wdGlvbnNPclBsdWdpbiA9PT0gXCJmdW5jdGlvblwiID8gNTAwIDogb3B0aW9uc09yUGx1Z2luLmR1cmF0aW9uO1xuICAgIGRlYm91bmNlcy5zZXQoZWwsIHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xuICAgICAgICBjb25zdCBjdXJyZW50QW5pbWF0aW9uID0gYW5pbWF0aW9ucy5nZXQoZWwpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgYXdhaXQgKGN1cnJlbnRBbmltYXRpb24gPT09IG51bGwgfHwgY3VycmVudEFuaW1hdGlvbiA9PT0gdm9pZCAwID8gdm9pZCAwIDogY3VycmVudEFuaW1hdGlvbi5maW5pc2hlZCk7XG4gICAgICAgICAgICBjb29yZHMuc2V0KGVsLCBnZXRDb29yZHMoZWwpKTtcbiAgICAgICAgICAgIG9ic2VydmVQb3NpdGlvbihlbCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2gge1xuICAgICAgICAgICAgLy8gaWdub3JlIGVycm9ycyBhcyB0aGUgYC5maW5pc2hlZGAgcHJvbWlzZSBpcyByZWplY3RlZCB3aGVuIGFuaW1hdGlvbnMgd2VyZSBjYW5jZWxsZWRcbiAgICAgICAgfVxuICAgIH0sIGRlbGF5KSk7XG59XG4vKipcbiAqIFVwZGF0ZXMgYWxsIHBvc2l0aW9ucyB0aGF0IGFyZSBjdXJyZW50bHkgYmVpbmcgdHJhY2tlZC5cbiAqL1xuZnVuY3Rpb24gdXBkYXRlQWxsUG9zKCkge1xuICAgIGNsZWFyVGltZW91dChkZWJvdW5jZXMuZ2V0KHJvb3QpKTtcbiAgICBkZWJvdW5jZXMuc2V0KHJvb3QsIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBwYXJlbnRzLmZvckVhY2goKHBhcmVudCkgPT4gZm9yRWFjaChwYXJlbnQsIChlbCkgPT4gbG93UHJpb3JpdHkoKCkgPT4gdXBkYXRlUG9zKGVsKSkpKTtcbiAgICB9LCAxMDApKTtcbn1cbi8qKlxuICogSXRzIHBvc3NpYmxlIGZvciBhIHF1aWNrIHNjcm9sbCBvciBvdGhlciBmYXN0IGV2ZW50cyB0byBnZXQgcGFzdCB0aGVcbiAqIGludGVyc2VjdGlvbiBvYnNlcnZlciwgc28gb2NjYXNpb25hbGx5IHdlIG5lZWQgd2FudCBcImNvbGQtcG9sbFwiIGZvciB0aGVcbiAqIGxhdGVzdHMgYW5kIGdyZWF0ZXN0IHBvc2l0aW9uLiBXZSB0cnkgdG8gZG8gdGhpcyBpbiB0aGUgbW9zdCBub24tZGlzcnVwdGl2ZVxuICogZmFzaGlvbiBwb3NzaWJsZS4gRmlyc3Qgd2Ugb25seSBkbyB0aGlzIGV2ZXIgY291cGxlIHNlY29uZHMsIHN0YWdnYXJkIGJ5IGFcbiAqIHJhbmRvbSBvZmZzZXQuXG4gKiBAcGFyYW0gZWwgLSBFbGVtZW50XG4gKi9cbmZ1bmN0aW9uIHBvbGwoZWwpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgaW50ZXJ2YWxzLnNldChlbCwgc2V0SW50ZXJ2YWwoKCkgPT4gbG93UHJpb3JpdHkodXBkYXRlUG9zLmJpbmQobnVsbCwgZWwpKSwgMjAwMCkpO1xuICAgIH0sIE1hdGgucm91bmQoMjAwMCAqIE1hdGgucmFuZG9tKCkpKTtcbn1cbi8qKlxuICogUGVyZm9ybSBzb21lIG9wZXJhdGlvbiB0aGF0IGlzIG5vbiBjcml0aWNhbCBhdCBzb21lIHBvaW50LlxuICogQHBhcmFtIGNhbGxiYWNrXG4gKi9cbmZ1bmN0aW9uIGxvd1ByaW9yaXR5KGNhbGxiYWNrKSB7XG4gICAgaWYgKHR5cGVvZiByZXF1ZXN0SWRsZUNhbGxiYWNrID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgcmVxdWVzdElkbGVDYWxsYmFjaygoKSA9PiBjYWxsYmFjaygpKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiBjYWxsYmFjaygpKTtcbiAgICB9XG59XG4vKipcbiAqIFRoZSBtdXRhdGlvbiBvYnNlcnZlciByZXNwb25zaWJsZSBmb3Igd2F0Y2hpbmcgZWFjaCByb290IGVsZW1lbnQuXG4gKi9cbmxldCBtdXRhdGlvbnM7XG4vKipcbiAqIEEgcmVzaXplIG9ic2VydmVyLCByZXNwb25zaWJsZSBmb3IgcmVjYWxjdWxhdGluZyBlbGVtZW50cyBvbiByZXNpemUuXG4gKi9cbmxldCByZXNpemU7XG4vKipcbiAqIElmIHRoaXMgaXMgaW4gYSBicm93c2VyLCBpbml0aWFsaXplIG91ciBXZWIgQVBJc1xuICovXG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJvb3QgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gICAgbXV0YXRpb25zID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoaGFuZGxlTXV0YXRpb25zKTtcbiAgICByZXNpemUgPSBuZXcgUmVzaXplT2JzZXJ2ZXIoaGFuZGxlUmVzaXplcyk7XG4gICAgcmVzaXplLm9ic2VydmUocm9vdCk7XG59XG4vKipcbiAqIFJldHJpZXZlcyBhbGwgdGhlIGVsZW1lbnRzIHRoYXQgbWF5IGhhdmUgYmVlbiBhZmZlY3RlZCBieSB0aGUgbGFzdCBtdXRhdGlvblxuICogaW5jbHVkaW5nIG9uZXMgdGhhdCBoYXZlIGJlZW4gcmVtb3ZlZCBhbmQgYXJlIG5vIGxvbmdlciBpbiB0aGUgRE9NLlxuICogQHBhcmFtIG11dGF0aW9ucyAtIEEgbXV0YXRpb24gbGlzdC5cbiAqIEByZXR1cm5zXG4gKi9cbmZ1bmN0aW9uIGdldEVsZW1lbnRzKG11dGF0aW9ucykge1xuICAgIGNvbnN0IG9ic2VydmVkTm9kZXMgPSBtdXRhdGlvbnMucmVkdWNlKChub2RlcywgbXV0YXRpb24pID0+IHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIC4uLm5vZGVzLFxuICAgICAgICAgICAgLi4uQXJyYXkuZnJvbShtdXRhdGlvbi5hZGRlZE5vZGVzKSxcbiAgICAgICAgICAgIC4uLkFycmF5LmZyb20obXV0YXRpb24ucmVtb3ZlZE5vZGVzKSxcbiAgICAgICAgXTtcbiAgICB9LCBbXSk7XG4gICAgLy8gU2hvcnQgY2lyY3VpdCBpZiBfb25seV8gY29tbWVudCBub2RlcyBhcmUgb2JzZXJ2ZWRcbiAgICBjb25zdCBvbmx5Q29tbWVudE5vZGVzT2JzZXJ2ZWQgPSBvYnNlcnZlZE5vZGVzLmV2ZXJ5KChub2RlKSA9PiBub2RlLm5vZGVOYW1lID09PSBcIiNjb21tZW50XCIpO1xuICAgIGlmIChvbmx5Q29tbWVudE5vZGVzT2JzZXJ2ZWQpXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gbXV0YXRpb25zLnJlZHVjZSgoZWxlbWVudHMsIG11dGF0aW9uKSA9PiB7XG4gICAgICAgIC8vIFNob3J0IGNpcmN1aXQgaWYgd2UgZmluZCBhIHB1cnBvc2VmdWxseSBkZWxldGVkIG5vZGUuXG4gICAgICAgIGlmIChlbGVtZW50cyA9PT0gZmFsc2UpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmIChtdXRhdGlvbi50YXJnZXQgaW5zdGFuY2VvZiBFbGVtZW50KSB7XG4gICAgICAgICAgICB0YXJnZXQobXV0YXRpb24udGFyZ2V0KTtcbiAgICAgICAgICAgIGlmICghZWxlbWVudHMuaGFzKG11dGF0aW9uLnRhcmdldCkpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50cy5hZGQobXV0YXRpb24udGFyZ2V0KTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG11dGF0aW9uLnRhcmdldC5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjaGlsZCA9IG11dGF0aW9uLnRhcmdldC5jaGlsZHJlbi5pdGVtKGkpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWNoaWxkKVxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIGlmIChERUwgaW4gY2hpbGQpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldChtdXRhdGlvbi50YXJnZXQsIGNoaWxkKTtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudHMuYWRkKGNoaWxkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobXV0YXRpb24ucmVtb3ZlZE5vZGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbXV0YXRpb24ucmVtb3ZlZE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNoaWxkID0gbXV0YXRpb24ucmVtb3ZlZE5vZGVzW2ldO1xuICAgICAgICAgICAgICAgICAgICBpZiAoREVMIGluIGNoaWxkKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50cy5hZGQoY2hpbGQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0KG11dGF0aW9uLnRhcmdldCwgY2hpbGQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2libGluZ3Muc2V0KGNoaWxkLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbXV0YXRpb24ucHJldmlvdXNTaWJsaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG11dGF0aW9uLm5leHRTaWJsaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsZW1lbnRzO1xuICAgIH0sIG5ldyBTZXQoKSk7XG59XG4vKipcbiAqIEFzc2lnbiB0aGUgdGFyZ2V0IHRvIGFuIGVsZW1lbnQuXG4gKiBAcGFyYW0gZWwgLSBUaGUgcm9vdCBlbGVtZW50XG4gKiBAcGFyYW0gY2hpbGRcbiAqL1xuZnVuY3Rpb24gdGFyZ2V0KGVsLCBjaGlsZCkge1xuICAgIGlmICghY2hpbGQgJiYgIShUR1QgaW4gZWwpKVxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZWwsIFRHVCwgeyB2YWx1ZTogZWwgfSk7XG4gICAgZWxzZSBpZiAoY2hpbGQgJiYgIShUR1QgaW4gY2hpbGQpKVxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY2hpbGQsIFRHVCwgeyB2YWx1ZTogZWwgfSk7XG59XG4vKipcbiAqIERldGVybWluZXMgd2hhdCBraW5kIG9mIGNoYW5nZSB0b29rIHBsYWNlIG9uIHRoZSBnaXZlbiBlbGVtZW50IGFuZCB0aGVuXG4gKiBwZXJmb3JtcyB0aGUgcHJvcGVyIGFuaW1hdGlvbiBiYXNlZCBvbiB0aGF0LlxuICogQHBhcmFtIGVsIC0gVGhlIHNwZWNpZmljIGVsZW1lbnQgdG8gYW5pbWF0ZS5cbiAqL1xuZnVuY3Rpb24gYW5pbWF0ZShlbCkge1xuICAgIHZhciBfYTtcbiAgICBjb25zdCBpc01vdW50ZWQgPSBlbC5pc0Nvbm5lY3RlZDtcbiAgICBjb25zdCBwcmVFeGlzdGluZyA9IGNvb3Jkcy5oYXMoZWwpO1xuICAgIGlmIChpc01vdW50ZWQgJiYgc2libGluZ3MuaGFzKGVsKSlcbiAgICAgICAgc2libGluZ3MuZGVsZXRlKGVsKTtcbiAgICBpZiAoYW5pbWF0aW9ucy5oYXMoZWwpKSB7XG4gICAgICAgIChfYSA9IGFuaW1hdGlvbnMuZ2V0KGVsKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmNhbmNlbCgpO1xuICAgIH1cbiAgICBpZiAocHJlRXhpc3RpbmcgJiYgaXNNb3VudGVkKSB7XG4gICAgICAgIHJlbWFpbihlbCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHByZUV4aXN0aW5nICYmICFpc01vdW50ZWQpIHtcbiAgICAgICAgcmVtb3ZlKGVsKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGFkZChlbCk7XG4gICAgfVxufVxuLyoqXG4gKiBSZW1vdmVzIGFsbCBub24tZGlnaXRzIGZyb20gYSBzdHJpbmcgYW5kIGNhc3RzIHRvIGEgbnVtYmVyLlxuICogQHBhcmFtIHN0ciAtIEEgc3RyaW5nIGNvbnRhaW5pbmcgYSBwaXhlbCB2YWx1ZS5cbiAqIEByZXR1cm5zXG4gKi9cbmZ1bmN0aW9uIHJhdyhzdHIpIHtcbiAgICByZXR1cm4gTnVtYmVyKHN0ci5yZXBsYWNlKC9bXjAtOS5cXC1dL2csIFwiXCIpKTtcbn1cbi8qKlxuICogR2V0IHRoZSBzY3JvbGwgb2Zmc2V0IG9mIGVsZW1lbnRzXG4gKiBAcGFyYW0gZWwgLSBFbGVtZW50XG4gKiBAcmV0dXJuc1xuICovXG5mdW5jdGlvbiBnZXRTY3JvbGxPZmZzZXQoZWwpIHtcbiAgICBsZXQgcCA9IGVsLnBhcmVudEVsZW1lbnQ7XG4gICAgd2hpbGUgKHApIHtcbiAgICAgICAgaWYgKHAuc2Nyb2xsTGVmdCB8fCBwLnNjcm9sbFRvcCkge1xuICAgICAgICAgICAgcmV0dXJuIHsgeDogcC5zY3JvbGxMZWZ0LCB5OiBwLnNjcm9sbFRvcCB9O1xuICAgICAgICB9XG4gICAgICAgIHAgPSBwLnBhcmVudEVsZW1lbnQ7XG4gICAgfVxuICAgIHJldHVybiB7IHg6IDAsIHk6IDAgfTtcbn1cbi8qKlxuICogR2V0IHRoZSBjb29yZGluYXRlcyBvZiBlbGVtZW50cyBhZGp1c3RlZCBmb3Igc2Nyb2xsIHBvc2l0aW9uLlxuICogQHBhcmFtIGVsIC0gRWxlbWVudFxuICogQHJldHVybnNcbiAqL1xuZnVuY3Rpb24gZ2V0Q29vcmRzKGVsKSB7XG4gICAgY29uc3QgcmVjdCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IHsgeCwgeSB9ID0gZ2V0U2Nyb2xsT2Zmc2V0KGVsKTtcbiAgICByZXR1cm4ge1xuICAgICAgICB0b3A6IHJlY3QudG9wICsgeSxcbiAgICAgICAgbGVmdDogcmVjdC5sZWZ0ICsgeCxcbiAgICAgICAgd2lkdGg6IHJlY3Qud2lkdGgsXG4gICAgICAgIGhlaWdodDogcmVjdC5oZWlnaHQsXG4gICAgfTtcbn1cbi8qKlxuICogUmV0dXJucyB0aGUgd2lkdGgvaGVpZ2h0IHRoYXQgdGhlIGVsZW1lbnQgc2hvdWxkIGJlIHRyYW5zaXRpb25lZCBiZXR3ZWVuLlxuICogVGhpcyB0YWtlcyBpbnRvIGFjY291bnQgYm94LXNpemluZy5cbiAqIEBwYXJhbSBlbCAtIEVsZW1lbnQgYmVpbmcgYW5pbWF0ZWRcbiAqIEBwYXJhbSBvbGRDb29yZHMgLSBPbGQgc2V0IG9mIENvb3JkaW5hdGVzIGNvb3JkaW5hdGVzXG4gKiBAcGFyYW0gbmV3Q29vcmRzIC0gTmV3IHNldCBvZiBDb29yZGluYXRlcyBjb29yZGluYXRlc1xuICogQHJldHVybnNcbiAqL1xuZnVuY3Rpb24gZ2V0VHJhbnNpdGlvblNpemVzKGVsLCBvbGRDb29yZHMsIG5ld0Nvb3Jkcykge1xuICAgIGxldCB3aWR0aEZyb20gPSBvbGRDb29yZHMud2lkdGg7XG4gICAgbGV0IGhlaWdodEZyb20gPSBvbGRDb29yZHMuaGVpZ2h0O1xuICAgIGxldCB3aWR0aFRvID0gbmV3Q29vcmRzLndpZHRoO1xuICAgIGxldCBoZWlnaHRUbyA9IG5ld0Nvb3Jkcy5oZWlnaHQ7XG4gICAgY29uc3Qgc3R5bGVzID0gZ2V0Q29tcHV0ZWRTdHlsZShlbCk7XG4gICAgY29uc3Qgc2l6aW5nID0gc3R5bGVzLmdldFByb3BlcnR5VmFsdWUoXCJib3gtc2l6aW5nXCIpO1xuICAgIGlmIChzaXppbmcgPT09IFwiY29udGVudC1ib3hcIikge1xuICAgICAgICBjb25zdCBwYWRkaW5nWSA9IHJhdyhzdHlsZXMucGFkZGluZ1RvcCkgK1xuICAgICAgICAgICAgcmF3KHN0eWxlcy5wYWRkaW5nQm90dG9tKSArXG4gICAgICAgICAgICByYXcoc3R5bGVzLmJvcmRlclRvcFdpZHRoKSArXG4gICAgICAgICAgICByYXcoc3R5bGVzLmJvcmRlckJvdHRvbVdpZHRoKTtcbiAgICAgICAgY29uc3QgcGFkZGluZ1ggPSByYXcoc3R5bGVzLnBhZGRpbmdMZWZ0KSArXG4gICAgICAgICAgICByYXcoc3R5bGVzLnBhZGRpbmdSaWdodCkgK1xuICAgICAgICAgICAgcmF3KHN0eWxlcy5ib3JkZXJSaWdodFdpZHRoKSArXG4gICAgICAgICAgICByYXcoc3R5bGVzLmJvcmRlckxlZnRXaWR0aCk7XG4gICAgICAgIHdpZHRoRnJvbSAtPSBwYWRkaW5nWDtcbiAgICAgICAgd2lkdGhUbyAtPSBwYWRkaW5nWDtcbiAgICAgICAgaGVpZ2h0RnJvbSAtPSBwYWRkaW5nWTtcbiAgICAgICAgaGVpZ2h0VG8gLT0gcGFkZGluZ1k7XG4gICAgfVxuICAgIHJldHVybiBbd2lkdGhGcm9tLCB3aWR0aFRvLCBoZWlnaHRGcm9tLCBoZWlnaHRUb10ubWFwKE1hdGgucm91bmQpO1xufVxuLyoqXG4gKiBSZXRyaWV2ZXMgYW5pbWF0aW9uIG9wdGlvbnMgZm9yIHRoZSBjdXJyZW50IGVsZW1lbnQuXG4gKiBAcGFyYW0gZWwgLSBFbGVtZW50IHRvIHJldHJpZXZlIG9wdGlvbnMgZm9yLlxuICogQHJldHVybnNcbiAqL1xuZnVuY3Rpb24gZ2V0T3B0aW9ucyhlbCkge1xuICAgIHJldHVybiBUR1QgaW4gZWwgJiYgb3B0aW9ucy5oYXMoZWxbVEdUXSlcbiAgICAgICAgPyBvcHRpb25zLmdldChlbFtUR1RdKVxuICAgICAgICA6IHsgZHVyYXRpb246IDI1MCwgZWFzaW5nOiBcImVhc2UtaW4tb3V0XCIgfTtcbn1cbi8qKlxuICogUmV0dXJucyB0aGUgdGFyZ2V0IG9mIGEgZ2l2ZW4gYW5pbWF0aW9uIChnZW5lcmFsbHkgdGhlIHBhcmVudCkuXG4gKiBAcGFyYW0gZWwgLSBBbiBlbGVtZW50IHRvIGNoZWNrIGZvciBhIHRhcmdldFxuICogQHJldHVybnNcbiAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KGVsKSB7XG4gICAgaWYgKFRHVCBpbiBlbClcbiAgICAgICAgcmV0dXJuIGVsW1RHVF07XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cbi8qKlxuICogQ2hlY2tzIGlmIGFuaW1hdGlvbnMgYXJlIGVuYWJsZWQgb3IgZGlzYWJsZWQgZm9yIGEgZ2l2ZW4gZWxlbWVudC5cbiAqIEBwYXJhbSBlbCAtIEFueSBlbGVtZW50XG4gKiBAcmV0dXJuc1xuICovXG5mdW5jdGlvbiBpc0VuYWJsZWQoZWwpIHtcbiAgICBjb25zdCB0YXJnZXQgPSBnZXRUYXJnZXQoZWwpO1xuICAgIHJldHVybiB0YXJnZXQgPyBlbmFibGVkLmhhcyh0YXJnZXQpIDogZmFsc2U7XG59XG4vKipcbiAqIEl0ZXJhdGUgb3ZlciB0aGUgY2hpbGRyZW4gb2YgYSBnaXZlbiBwYXJlbnQuXG4gKiBAcGFyYW0gcGFyZW50IC0gQSBwYXJlbnQgZWxlbWVudFxuICogQHBhcmFtIGNhbGxiYWNrIC0gQSBjYWxsYmFja1xuICovXG5mdW5jdGlvbiBmb3JFYWNoKHBhcmVudCwgLi4uY2FsbGJhY2tzKSB7XG4gICAgY2FsbGJhY2tzLmZvckVhY2goKGNhbGxiYWNrKSA9PiBjYWxsYmFjayhwYXJlbnQsIG9wdGlvbnMuaGFzKHBhcmVudCkpKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhcmVudC5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBjaGlsZCA9IHBhcmVudC5jaGlsZHJlbi5pdGVtKGkpO1xuICAgICAgICBpZiAoY2hpbGQpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrcy5mb3JFYWNoKChjYWxsYmFjaykgPT4gY2FsbGJhY2soY2hpbGQsIG9wdGlvbnMuaGFzKGNoaWxkKSkpO1xuICAgICAgICB9XG4gICAgfVxufVxuLyoqXG4gKiBUaGUgZWxlbWVudCBpbiBxdWVzdGlvbiBpcyByZW1haW5pbmcgaW4gdGhlIERPTS5cbiAqIEBwYXJhbSBlbCAtIEVsZW1lbnQgdG8gZmxpcFxuICogQHJldHVybnNcbiAqL1xuZnVuY3Rpb24gcmVtYWluKGVsKSB7XG4gICAgY29uc3Qgb2xkQ29vcmRzID0gY29vcmRzLmdldChlbCk7XG4gICAgY29uc3QgbmV3Q29vcmRzID0gZ2V0Q29vcmRzKGVsKTtcbiAgICBpZiAoIWlzRW5hYmxlZChlbCkpXG4gICAgICAgIHJldHVybiBjb29yZHMuc2V0KGVsLCBuZXdDb29yZHMpO1xuICAgIGxldCBhbmltYXRpb247XG4gICAgaWYgKCFvbGRDb29yZHMpXG4gICAgICAgIHJldHVybjtcbiAgICBjb25zdCBwbHVnaW5Pck9wdGlvbnMgPSBnZXRPcHRpb25zKGVsKTtcbiAgICBpZiAodHlwZW9mIHBsdWdpbk9yT3B0aW9ucyAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGNvbnN0IGRlbHRhWCA9IG9sZENvb3Jkcy5sZWZ0IC0gbmV3Q29vcmRzLmxlZnQ7XG4gICAgICAgIGNvbnN0IGRlbHRhWSA9IG9sZENvb3Jkcy50b3AgLSBuZXdDb29yZHMudG9wO1xuICAgICAgICBjb25zdCBbd2lkdGhGcm9tLCB3aWR0aFRvLCBoZWlnaHRGcm9tLCBoZWlnaHRUb10gPSBnZXRUcmFuc2l0aW9uU2l6ZXMoZWwsIG9sZENvb3JkcywgbmV3Q29vcmRzKTtcbiAgICAgICAgY29uc3Qgc3RhcnQgPSB7XG4gICAgICAgICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGUoJHtkZWx0YVh9cHgsICR7ZGVsdGFZfXB4KWAsXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGVuZCA9IHtcbiAgICAgICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZSgwLCAwKWAsXG4gICAgICAgIH07XG4gICAgICAgIGlmICh3aWR0aEZyb20gIT09IHdpZHRoVG8pIHtcbiAgICAgICAgICAgIHN0YXJ0LndpZHRoID0gYCR7d2lkdGhGcm9tfXB4YDtcbiAgICAgICAgICAgIGVuZC53aWR0aCA9IGAke3dpZHRoVG99cHhgO1xuICAgICAgICB9XG4gICAgICAgIGlmIChoZWlnaHRGcm9tICE9PSBoZWlnaHRUbykge1xuICAgICAgICAgICAgc3RhcnQuaGVpZ2h0ID0gYCR7aGVpZ2h0RnJvbX1weGA7XG4gICAgICAgICAgICBlbmQuaGVpZ2h0ID0gYCR7aGVpZ2h0VG99cHhgO1xuICAgICAgICB9XG4gICAgICAgIGFuaW1hdGlvbiA9IGVsLmFuaW1hdGUoW3N0YXJ0LCBlbmRdLCB7XG4gICAgICAgICAgICBkdXJhdGlvbjogcGx1Z2luT3JPcHRpb25zLmR1cmF0aW9uLFxuICAgICAgICAgICAgZWFzaW5nOiBwbHVnaW5Pck9wdGlvbnMuZWFzaW5nLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGFuaW1hdGlvbiA9IG5ldyBBbmltYXRpb24ocGx1Z2luT3JPcHRpb25zKGVsLCBcInJlbWFpblwiLCBvbGRDb29yZHMsIG5ld0Nvb3JkcykpO1xuICAgICAgICBhbmltYXRpb24ucGxheSgpO1xuICAgIH1cbiAgICBhbmltYXRpb25zLnNldChlbCwgYW5pbWF0aW9uKTtcbiAgICBjb29yZHMuc2V0KGVsLCBuZXdDb29yZHMpO1xuICAgIGFuaW1hdGlvbi5hZGRFdmVudExpc3RlbmVyKFwiZmluaXNoXCIsIHVwZGF0ZVBvcy5iaW5kKG51bGwsIGVsKSk7XG59XG4vKipcbiAqIEFkZHMgdGhlIGVsZW1lbnQgd2l0aCBhIHRyYW5zaXRpb24uXG4gKiBAcGFyYW0gZWwgLSBBbmltYXRlcyB0aGUgZWxlbWVudCBiZWluZyBhZGRlZC5cbiAqL1xuZnVuY3Rpb24gYWRkKGVsKSB7XG4gICAgY29uc3QgbmV3Q29vcmRzID0gZ2V0Q29vcmRzKGVsKTtcbiAgICBjb29yZHMuc2V0KGVsLCBuZXdDb29yZHMpO1xuICAgIGNvbnN0IHBsdWdpbk9yT3B0aW9ucyA9IGdldE9wdGlvbnMoZWwpO1xuICAgIGlmICghaXNFbmFibGVkKGVsKSlcbiAgICAgICAgcmV0dXJuO1xuICAgIGxldCBhbmltYXRpb247XG4gICAgaWYgKHR5cGVvZiBwbHVnaW5Pck9wdGlvbnMgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBhbmltYXRpb24gPSBlbC5hbmltYXRlKFtcbiAgICAgICAgICAgIHsgdHJhbnNmb3JtOiBcInNjYWxlKC45OClcIiwgb3BhY2l0eTogMCB9LFxuICAgICAgICAgICAgeyB0cmFuc2Zvcm06IFwic2NhbGUoMC45OClcIiwgb3BhY2l0eTogMCwgb2Zmc2V0OiAwLjUgfSxcbiAgICAgICAgICAgIHsgdHJhbnNmb3JtOiBcInNjYWxlKDEpXCIsIG9wYWNpdHk6IDEgfSxcbiAgICAgICAgXSwge1xuICAgICAgICAgICAgZHVyYXRpb246IHBsdWdpbk9yT3B0aW9ucy5kdXJhdGlvbiAqIDEuNSxcbiAgICAgICAgICAgIGVhc2luZzogXCJlYXNlLWluXCIsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgYW5pbWF0aW9uID0gbmV3IEFuaW1hdGlvbihwbHVnaW5Pck9wdGlvbnMoZWwsIFwiYWRkXCIsIG5ld0Nvb3JkcykpO1xuICAgICAgICBhbmltYXRpb24ucGxheSgpO1xuICAgIH1cbiAgICBhbmltYXRpb25zLnNldChlbCwgYW5pbWF0aW9uKTtcbiAgICBhbmltYXRpb24uYWRkRXZlbnRMaXN0ZW5lcihcImZpbmlzaFwiLCB1cGRhdGVQb3MuYmluZChudWxsLCBlbCkpO1xufVxuLyoqXG4gKiBBbmltYXRlcyB0aGUgcmVtb3ZhbCBvZiBhbiBlbGVtZW50LlxuICogQHBhcmFtIGVsIC0gRWxlbWVudCB0byByZW1vdmVcbiAqL1xuZnVuY3Rpb24gcmVtb3ZlKGVsKSB7XG4gICAgdmFyIF9hO1xuICAgIGlmICghc2libGluZ3MuaGFzKGVsKSB8fCAhY29vcmRzLmhhcyhlbCkpXG4gICAgICAgIHJldHVybjtcbiAgICBjb25zdCBbcHJldiwgbmV4dF0gPSBzaWJsaW5ncy5nZXQoZWwpO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlbCwgREVMLCB7IHZhbHVlOiB0cnVlIH0pO1xuICAgIGlmIChuZXh0ICYmIG5leHQucGFyZW50Tm9kZSAmJiBuZXh0LnBhcmVudE5vZGUgaW5zdGFuY2VvZiBFbGVtZW50KSB7XG4gICAgICAgIG5leHQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoZWwsIG5leHQpO1xuICAgIH1cbiAgICBlbHNlIGlmIChwcmV2ICYmIHByZXYucGFyZW50Tm9kZSkge1xuICAgICAgICBwcmV2LnBhcmVudE5vZGUuYXBwZW5kQ2hpbGQoZWwpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgKF9hID0gZ2V0VGFyZ2V0KGVsKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmFwcGVuZENoaWxkKGVsKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY2xlYW5VcCgpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBlbC5yZW1vdmUoKTtcbiAgICAgICAgY29vcmRzLmRlbGV0ZShlbCk7XG4gICAgICAgIHNpYmxpbmdzLmRlbGV0ZShlbCk7XG4gICAgICAgIGFuaW1hdGlvbnMuZGVsZXRlKGVsKTtcbiAgICAgICAgKF9hID0gaW50ZXJzZWN0aW9ucy5nZXQoZWwpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZGlzY29ubmVjdCgpO1xuICAgIH1cbiAgICBpZiAoIWlzRW5hYmxlZChlbCkpXG4gICAgICAgIHJldHVybiBjbGVhblVwKCk7XG4gICAgY29uc3QgW3RvcCwgbGVmdCwgd2lkdGgsIGhlaWdodF0gPSBkZWxldGVQb3NpdGlvbihlbCk7XG4gICAgY29uc3Qgb3B0aW9uc09yUGx1Z2luID0gZ2V0T3B0aW9ucyhlbCk7XG4gICAgY29uc3Qgb2xkQ29vcmRzID0gY29vcmRzLmdldChlbCk7XG4gICAgbGV0IGFuaW1hdGlvbjtcbiAgICBPYmplY3QuYXNzaWduKGVsLnN0eWxlLCB7XG4gICAgICAgIHBvc2l0aW9uOiBcImFic29sdXRlXCIsXG4gICAgICAgIHRvcDogYCR7dG9wfXB4YCxcbiAgICAgICAgbGVmdDogYCR7bGVmdH1weGAsXG4gICAgICAgIHdpZHRoOiBgJHt3aWR0aH1weGAsXG4gICAgICAgIGhlaWdodDogYCR7aGVpZ2h0fXB4YCxcbiAgICAgICAgbWFyZ2luOiAwLFxuICAgICAgICBwb2ludGVyRXZlbnRzOiBcIm5vbmVcIixcbiAgICAgICAgdHJhbnNmb3JtT3JpZ2luOiBcImNlbnRlclwiLFxuICAgICAgICB6SW5kZXg6IDEwMCxcbiAgICB9KTtcbiAgICBpZiAodHlwZW9mIG9wdGlvbnNPclBsdWdpbiAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGFuaW1hdGlvbiA9IGVsLmFuaW1hdGUoW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogXCJzY2FsZSgxKVwiLFxuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogXCJzY2FsZSguOTgpXCIsXG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF0sIHsgZHVyYXRpb246IG9wdGlvbnNPclBsdWdpbi5kdXJhdGlvbiwgZWFzaW5nOiBcImVhc2Utb3V0XCIgfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBhbmltYXRpb24gPSBuZXcgQW5pbWF0aW9uKG9wdGlvbnNPclBsdWdpbihlbCwgXCJyZW1vdmVcIiwgb2xkQ29vcmRzKSk7XG4gICAgICAgIGFuaW1hdGlvbi5wbGF5KCk7XG4gICAgfVxuICAgIGFuaW1hdGlvbnMuc2V0KGVsLCBhbmltYXRpb24pO1xuICAgIGFuaW1hdGlvbi5hZGRFdmVudExpc3RlbmVyKFwiZmluaXNoXCIsIGNsZWFuVXApO1xufVxuZnVuY3Rpb24gZGVsZXRlUG9zaXRpb24oZWwpIHtcbiAgICBjb25zdCBvbGRDb29yZHMgPSBjb29yZHMuZ2V0KGVsKTtcbiAgICBjb25zdCBbd2lkdGgsICwgaGVpZ2h0XSA9IGdldFRyYW5zaXRpb25TaXplcyhlbCwgb2xkQ29vcmRzLCBnZXRDb29yZHMoZWwpKTtcbiAgICBsZXQgb2Zmc2V0UGFyZW50ID0gZWwucGFyZW50RWxlbWVudDtcbiAgICB3aGlsZSAob2Zmc2V0UGFyZW50ICYmXG4gICAgICAgIChnZXRDb21wdXRlZFN0eWxlKG9mZnNldFBhcmVudCkucG9zaXRpb24gPT09IFwic3RhdGljXCIgfHxcbiAgICAgICAgICAgIG9mZnNldFBhcmVudCBpbnN0YW5jZW9mIEhUTUxCb2R5RWxlbWVudCkpIHtcbiAgICAgICAgb2Zmc2V0UGFyZW50ID0gb2Zmc2V0UGFyZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgfVxuICAgIGlmICghb2Zmc2V0UGFyZW50KVxuICAgICAgICBvZmZzZXRQYXJlbnQgPSBkb2N1bWVudC5ib2R5O1xuICAgIGNvbnN0IHBhcmVudFN0eWxlcyA9IGdldENvbXB1dGVkU3R5bGUob2Zmc2V0UGFyZW50KTtcbiAgICBjb25zdCBwYXJlbnRDb29yZHMgPSBjb29yZHMuZ2V0KG9mZnNldFBhcmVudCkgfHwgZ2V0Q29vcmRzKG9mZnNldFBhcmVudCk7XG4gICAgY29uc3QgdG9wID0gTWF0aC5yb3VuZChvbGRDb29yZHMudG9wIC0gcGFyZW50Q29vcmRzLnRvcCkgLVxuICAgICAgICByYXcocGFyZW50U3R5bGVzLmJvcmRlclRvcFdpZHRoKTtcbiAgICBjb25zdCBsZWZ0ID0gTWF0aC5yb3VuZChvbGRDb29yZHMubGVmdCAtIHBhcmVudENvb3Jkcy5sZWZ0KSAtXG4gICAgICAgIHJhdyhwYXJlbnRTdHlsZXMuYm9yZGVyTGVmdFdpZHRoKTtcbiAgICByZXR1cm4gW3RvcCwgbGVmdCwgd2lkdGgsIGhlaWdodF07XG59XG4vKipcbiAqIEEgZnVuY3Rpb24gdGhhdCBhdXRvbWF0aWNhbGx5IGFkZHMgYW5pbWF0aW9uIGVmZmVjdHMgdG8gaXRzZWxmIGFuZCBpdHNcbiAqIGltbWVkaWF0ZSBjaGlsZHJlbi4gU3BlY2lmaWNhbGx5IGl0IGFkZHMgZWZmZWN0cyBmb3IgYWRkaW5nLCBtb3ZpbmcsIGFuZFxuICogcmVtb3ZpbmcgRE9NIGVsZW1lbnRzLlxuICogQHBhcmFtIGVsIC0gQSBwYXJlbnQgZWxlbWVudCB0byBhZGQgYW5pbWF0aW9ucyB0by5cbiAqIEBwYXJhbSBvcHRpb25zIC0gQW4gb3B0aW9uYWwgb2JqZWN0IG9mIG9wdGlvbnMuXG4gKi9cbmZ1bmN0aW9uIGF1dG9BbmltYXRlKGVsLCBjb25maWcgPSB7fSkge1xuICAgIGlmIChtdXRhdGlvbnMgJiYgcmVzaXplKSB7XG4gICAgICAgIGNvbnN0IG1lZGlhUXVlcnkgPSB3aW5kb3cubWF0Y2hNZWRpYShcIihwcmVmZXJzLXJlZHVjZWQtbW90aW9uOiByZWR1Y2UpXCIpO1xuICAgICAgICBjb25zdCBpc0Rpc2FibGVkRHVlVG9SZWR1Y2VNb3Rpb24gPSBtZWRpYVF1ZXJ5Lm1hdGNoZXMgJiZcbiAgICAgICAgICAgIHR5cGVvZiBjb25maWcgIT09IFwiZnVuY3Rpb25cIiAmJlxuICAgICAgICAgICAgIWNvbmZpZy5kaXNyZXNwZWN0VXNlck1vdGlvblByZWZlcmVuY2U7XG4gICAgICAgIGlmICghaXNEaXNhYmxlZER1ZVRvUmVkdWNlTW90aW9uKSB7XG4gICAgICAgICAgICBlbmFibGVkLmFkZChlbCk7XG4gICAgICAgICAgICBpZiAoZ2V0Q29tcHV0ZWRTdHlsZShlbCkucG9zaXRpb24gPT09IFwic3RhdGljXCIpIHtcbiAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKGVsLnN0eWxlLCB7IHBvc2l0aW9uOiBcInJlbGF0aXZlXCIgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3JFYWNoKGVsLCB1cGRhdGVQb3MsIHBvbGwsIChlbGVtZW50KSA9PiByZXNpemUgPT09IG51bGwgfHwgcmVzaXplID09PSB2b2lkIDAgPyB2b2lkIDAgOiByZXNpemUub2JzZXJ2ZShlbGVtZW50KSk7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5zZXQoZWwsIGNvbmZpZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zLnNldChlbCwgeyBkdXJhdGlvbjogMjUwLCBlYXNpbmc6IFwiZWFzZS1pbi1vdXRcIiwgLi4uY29uZmlnIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbXV0YXRpb25zLm9ic2VydmUoZWwsIHsgY2hpbGRMaXN0OiB0cnVlIH0pO1xuICAgICAgICAgICAgcGFyZW50cy5hZGQoZWwpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBPYmplY3QuZnJlZXplKHtcbiAgICAgICAgcGFyZW50OiBlbCxcbiAgICAgICAgZW5hYmxlOiAoKSA9PiB7XG4gICAgICAgICAgICBlbmFibGVkLmFkZChlbCk7XG4gICAgICAgIH0sXG4gICAgICAgIGRpc2FibGU6ICgpID0+IHtcbiAgICAgICAgICAgIGVuYWJsZWQuZGVsZXRlKGVsKTtcbiAgICAgICAgfSxcbiAgICAgICAgaXNFbmFibGVkOiAoKSA9PiBlbmFibGVkLmhhcyhlbCksXG4gICAgfSk7XG59XG4vKipcbiAqIFRoZSB2dWUgZGlyZWN0aXZlLlxuICovXG5jb25zdCB2QXV0b0FuaW1hdGUgPSB7XG4gICAgbW91bnRlZDogKGVsLCBiaW5kaW5nKSA9PiB7XG4gICAgICAgIGF1dG9BbmltYXRlKGVsLCBiaW5kaW5nLnZhbHVlIHx8IHt9KTtcbiAgICB9LFxufTtcblxuZXhwb3J0IHsgYXV0b0FuaW1hdGUgYXMgZGVmYXVsdCwgZ2V0VHJhbnNpdGlvblNpemVzLCB2QXV0b0FuaW1hdGUgfTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsImltcG9ydCAnLi9hc3NldHMvY3NzL3Jlc2V0LmNzcyc7XG5pbXBvcnQgJy4vYXNzZXRzL2Nzcy9zdHlsZS5jc3MnO1xuaW1wb3J0IGluaXRpYWxpemVBcHAgZnJvbSAnLi9jb21wb3NpdGlvblJvb3QnO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICAgY29uc3QgYXBwQ29udHJvbGxlciA9IGluaXRpYWxpemVBcHAoKTtcbiAgIGFwcENvbnRyb2xsZXIubGF1bmNoKCk7XG59KTtcbiJdLCJuYW1lcyI6WyJUYXNrQ29udHJvbGxlciIsIlByb2plY3RDb250cm9sbGVyIiwiQ2F0ZWdvcnlDb250cm9sbGVyIiwiVGFza01vZGVsIiwiUHJvamVjdE1vZGVsIiwiQ2F0ZWdvcnlNb2RlbCIsIlRhc2tMaXN0IiwiUHJvamVjdExpc3QiLCJBcHBQYWdlIiwiY3JlYXRlRWxlbWVudCIsIkFwcENvbnRyb2xsZXIiLCJGaWx0ZXIiLCJTb3J0ZXIiLCJpbml0aWFsaXplQXBwIiwiY2F0ZWdvcnlNb2RlbCIsInByb2plY3RNb2RlbCIsInRhc2tNb2RlbCIsImZpbHRlciIsInNvcnRlciIsInRhc2tMaXN0IiwicHJvamVjdExpc3QiLCJhcHBQYWdlIiwidGFza0NvbnRyb2xsZXIiLCJwcm9qZWN0Q29udHJvbGxlciIsImNhdGVnb3J5Q29udHJvbGxlciIsImFwcENvbnRyb2xsZXIiLCJwdWJzdWIiLCJzaWRlQmFyQ29tcG9uZW50IiwiY29uc3RydWN0b3IiLCJ2aWV3IiwiaW5pdGlhbGl6ZUxpc3RlbmVycyIsImxhdW5jaCIsInNldHVwRmlyc3RMb2FkIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImFwcGVuZENoaWxkIiwiY2F0ZWdvcmllcyIsIm1vZGVsIiwiZ2V0QWxsSXRlbXMiLCJwcm9qZWN0cyIsImJ1aWxkVmlld1N0YXRlIiwic2lkZUJhciIsImFwcGVuZENoaWxkcmVuIiwic3Vic2NyaWJlIiwib3BlblRhc2tFZGl0IiwiYmluZCIsInRvZ2dsZVNpZGVCYXIiLCJ0YXNrSWQiLCJ0YXNrIiwiZ2V0SXRlbUJ5SWQiLCJvcGVuVGFza0RldGFpbHMiLCJoYW5kbGVBZGRDYXRlZ29yeSIsImhhbmRsZVVwZGF0ZUNhdGVnb3J5IiwiaGFuZGxlRGVsZXRlQ2F0ZWdvcnkiLCJuZXdDYXRlZ29yeUxpIiwiYWRkSXRlbSIsImdldFN0YXRlIiwibmV3Q2F0ZWdvcnkiLCJnZXRMYXN0QWRkZWRJdGVtIiwicGFyZW50RWxlbWVudCIsInNldFN0YXRlIiwiaGVhZGVyIiwiaXRlbXMiLCJ0eXBlIiwibGlzdCIsInB1Ymxpc2giLCJjYXRlZ29yeUxpIiwidXBkYXRlSXRlbSIsImdldEF0dHJpYnV0ZSIsImVkaXRlZENhdGVnb3J5IiwiZGVsZXRlSXRlbSIsInJlbW92ZSIsInF1ZXJ5U2VsZWN0b3IiLCJjbGljayIsInZpZXdTdGF0ZSIsImhhbmRsZUFkZFByb2plY3QiLCJoYW5kbGVVcGRhdGVQcm9qZWN0IiwiaGFuZGxlRGVsZXRlUHJvamVjdCIsImhhbmRsZUNhdGVnb3J5RGVsZXRlIiwibmV3UHJvamVjdExpIiwiZGF0YSIsIk9iamVjdCIsImFzc2lnbiIsImNhdGVnb3J5SWQiLCJuZXdQcm9qZWN0IiwicHJvamVjdExpIiwicHJvamVjdENhdGVnb3J5TGkiLCJjbG9zZXN0IiwiZmlyc3RDaGlsZCIsImhhc0F0dHJpYnV0ZSIsIm5ld0ZpbHRlckRhdGEiLCJ0aXRsZSIsImlkIiwidmFsdWUiLCJoaWdobGlnaHRDdXJyZW50RmlsdGVyIiwiZWRpdGVkUHJvamVjdCIsImZvckVhY2giLCJwcm9qZWN0IiwiY2xlYXJOb25DYXRlZ29yaXplZFByb2plY3RzIiwiZXh0ZXJuYWxEYXRhIiwicHJvamVjdENhdGVnb3J5IiwiZmluZCIsImNhdGVnb3J5IiwidGFza1ZpZXciLCJjdXJyZW50U29ydCIsImN1cnJlbnRGaWx0ZXIiLCJoYW5kbGVBZGRUYXNrIiwiaGFuZGxlVXBkYXRlVGFzayIsImhhbmRsZURlbGV0ZVRhc2siLCJoYW5kbGVQcm9qZWN0RGVsZXRlZCIsImhhbmRsZUZpbHRlckNoYW5nZSIsImhhbmRsZVNvcnRpbmdDaGFuZ2VkIiwidGFza3MiLCJnZXRDdXJyZW50RmlsdGVyVGFza3MiLCJkZWxldGVDYXJkIiwibmV3VGFza0RhdGEiLCJlZGl0ZWRUYXNrIiwidXBkYXRlQ2FyZCIsInByb2plY3RJZCIsImRlbGV0ZUl0ZW1zQnlQcm9wZXJ0eSIsImZpbHRlckJ5IiwiZmlsdGVyRGF0YSIsInNvcnRpbmdUeXBlIiwic29ydGVkVGFza3MiLCJzb3J0QnkiLCJPYmplY3RCdWlsZGVyIiwiZHVtbXlEYXRhIiwiQmFzZU1vZGVsIiwiY29sbGVjdGlvbk5hbWUiLCJzZXREdW1teUNvbnRlbnQiLCJyZXRyaWV2ZUZyb21Mb2NhbFN0b3JhZ2UiLCJpdGVtc0RhdGEiLCJBcnJheSIsImZyb20iLCJKU09OIiwicGFyc2UiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiaXRlbSIsIm9iamVjdCIsInB1c2giLCJzYXZlVG9Mb2NhbFN0b3JhZ2UiLCJzZXRJdGVtIiwic3RyaW5naWZ5IiwibmV3SXRlbSIsInNsaWNlIiwiaXRlbVRvRWRpdCIsInVwZGF0ZVByb3BlcnRpZXMiLCJpbmRleCIsImZpbmRJbmRleCIsInNwbGljZSIsInByb3BlcnR5IiwiaXNTYW1lRGF5IiwiaXNXaXRoaW5JbnRlcnZhbCIsImZpbHRlcmluZ1N0cmF0ZWdpZXMiLCJkYXRlIiwiRGF0ZSIsImRhdGVSYW5nZSIsInN0cmF0ZWdpZXMiLCJNYXAiLCJhZGRTdHJhdGVnaWVzIiwic3RyYXRlZ3kiLCJzZXQiLCJmaWx0ZXJWYWx1ZSIsImdldCIsInNvcnRpbmdTdHJhdGVnaWVzIiwic29ydCIsImEiLCJiIiwiTnVtYmVyIiwicHJpb3JpdHkiLCJkYXRhVHlwZSIsImNvbXBsZXRlZCIsImRlc2NyaXB0aW9uIiwidGFza1Byb2plY3QiLCJjaGVja2xpc3QiLCJjaGVja2VkIiwidGFnIiwiZWxlbWVudCIsImVsZW1lbnRNaXhpbiIsInNldEF0dHJpYnV0ZXMiLCJhdHRyaWJ1dGVzIiwiZW50cmllcyIsIl9yZWYiLCJrZXkiLCJpc0FycmF5Iiwic2V0QXR0cmlidXRlIiwiam9pbiIsInN0YXRlIiwiaXNDb25uZWN0ZWQiLCJjbGVhciIsInJlbmRlciIsImNoZWNrRm9yT3RoZXJBY3RpdmVFbG0iLCJldiIsImFjdGl2ZUVsbSIsInNob3dFcnJvciIsInByZXZlbnREZWZhdWx0IiwiY2xhc3NMaXN0IiwiYWRkIiwic2V0VGltZW91dCIsImZvY3VzIiwic2V0Q29udGVudCIsImNvbnRlbnQiLCJ0ZXh0Q29udGVudCIsImNoaWxkRWxlbWVudHMiLCJjaGlsZCIsInJlbW92ZUNoaWxkIiwiYXBwZW5kVG8iLCJwYXJlbnQiLCJwcmVwZW5kVG8iLCJwcmVwZW5kIiwiYXBwZW5kSWNvbiIsImljb24iLCJjbGFzcyIsInByZXBlbmRJY29uIiwiY2FwaXRhbEZpcnN0TGV0dGVyIiwiY2hhckF0IiwidG9VcHBlckNhc2UiLCJ2NCIsInV1aWR2NCIsImNyZWF0ZU5ld0lEIiwidG9TdHJpbmciLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJ1bmRlZmluZWQiLCJ2YWxpZGF0ZVRpdGxlIiwic2V0UHJvcGVydGllcyIsIkVycm9yIiwia2V5cyIsImdldFByb3BlcnR5IiwiZWRpdFByb3BlcnR5IiwibmV3VmFsdWUiLCJldmVudHMiLCJzdWJzY3JpcHRpb25zSWQiLCJldmVudCIsInN1YnNjcmlwdGlvbiIsImZ1bmMiLCJ0b2tlbiIsInVuc3Vic2NyaWJlIiwiZm91bmQiLCJzb21lIiwiYXJlRXF1YWwiLCJBZGRUYXNrRm9ybSIsIkhUTUxGb3JtRWxlbWVudCIsImNvbm5lY3RlZENhbGxiYWNrIiwiYWRkRXZlbnRMaXN0ZW5lcnMiLCJjbG9zZUZvcm1CdG4iLCJuYW1lIiwidGl0bGVJbnB1dCIsInBsYWNlaG9sZGVyIiwibWF4bGVuZ3RoIiwibWlubGVuZ3RoIiwicmVxdWlyZWQiLCJvcGVuRm9ybUJ0biIsImhpZGRlbklucHV0cyIsImRlc2NyaXB0aW9uSW5wdXQiLCJyb3dzIiwic2VsZWN0aW9uSW5wdXRzIiwiZGF0ZUlucHV0IiwibWluIiwidG9JU09TdHJpbmciLCJzcGxpdCIsInNlbGVjdFByb2plY3QiLCJzZWxlY3RQcmlvcml0eSIsInN1Ym1pdEJ0biIsInNldHVwU2VsZWN0UHJvamVjdExpc3QiLCJzZXRVcFByaW9yaXRpZXMiLCJleHBhbmQiLCJjb250cmFjdCIsInJlbW92ZUF0dHJpYnV0ZSIsInJlc2V0Iiwibm9Qcm9qZWN0T3B0aW9uIiwic2VsZWN0ZWQiLCJvcHRHcnAiLCJsYWJlbCIsImNhdGVnb3J5UHJvamVjdHMiLCJvcHRpb24iLCJwcmlvcml0aWVzIiwiYWRkRXZlbnRMaXN0ZW5lciIsInBhc3NEYXRhIiwidGFyZ2V0IiwiY29udGFpbnMiLCJlbGVtZW50cyIsImZvcm1EYXRhIiwib3B0aW9ucyIsInNlbGVjdGVkSW5kZXgiLCJjdXN0b21FbGVtZW50cyIsImRlZmluZSIsImV4dGVuZHMiLCJMaXN0SXRlbSIsIkhUTUxFbGVtZW50IiwiYnV0dG9ucyIsImVkaXRCdG4iLCJkZWxldGVCdG4iLCJzYXZlQnRuIiwiY2FuY2VsQnRuIiwic3RhcnRFZGl0SXRlbSIsInNhdmVJdGVtIiwiY2FuY2VsQ2hhbmdlcyIsImlucHV0IiwiYWN0aXZlIiwiZW5kRWRpdEl0ZW0iLCJhdXRvQW5pbWF0ZSIsIkV4cGFuZGFibGVMaXN0IiwibGlzdEhlYWRlciIsImxpc3RVbCIsIml0ZW1MSSIsImFkZEl0ZW1CdG4iLCJ0b2dnbGVMaXN0IiwidG9nZ2xlQXR0cmlidXRlIiwiaXRlbXNMaXN0IiwiaXRlbVR5cGUiLCJidWlsZFByb2plY3RzTGlzdCIsImFkZENhdGVnb3J5QnRuIiwiYXBwZW5kIiwiY3JlYXRlQ2F0ZWdvcnlMaXN0IiwibGFzdENoaWxkIiwicGFyZW50Tm9kZSIsImZpbHRlckVsbSIsInN0YXJ0T2ZXZWVrIiwiZW5kT2ZXZWVrIiwiU2lkZUJhciIsInRvZGF5Iiwid2VlayIsInN0YXJ0IiwiZW5kIiwiZGVmYXVsdEZpbHRlcnMiLCJkZWZhdWx0RmlsdGVyc1VsIiwiZmlsdGVyTGkiLCJjbG9zZVNpZGVCYXIiLCJUYXNrQ2FyZCIsInRhZ3MiLCJ0aXRsZUxpbmUiLCJzdGF0dXNEaXYiLCJjaGVja2JveENvbnRhaW5lciIsInNldFN0YXR1cyIsImNoZWNrYm94IiwiY2hlY2ttYXJrIiwiY2hlY2tib3hMYWJlbCIsInNldEhvdXJzIiwidGFza0RhdGUiLCJUYXNrRGV0YWlscyIsImZvcm0iLCJQbGFjZWhvbGRlciIsInNldHVwQ2hlY2tsaXN0Iiwic3VibWl0QnRuQ29udGFpbmVyIiwiY2xvc2VCdG4iLCJjaGVja2xpc3RJdGVtcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJpdGVtRGF0YSIsImZvcm1hdCIsImFkZFRhc2tGb3JtIiwiY29udHJvbFNlY3Rpb24iLCJzZXR1cENvbnRyb2xzIiwidGFza3NDb250YWluZXIiLCJ0YXNrQ2FyZCIsIm1ha2VUYXNrQ2FyZCIsInNpZGVCYXJUb2dnbGUiLCJmaXhlZEJ0bkNvbnRhaW5lciIsImZpeGVkQWRkVGFza0J0biIsIm1hdGNoZXMiLCJzY3JvbGxUbyIsImZpeGVkQnRuIiwic2Nyb2xsVG9wIiwic3R5bGUiLCJkaXNwbGF5IiwidXBkYXRlZENhcmQiLCJleGlzdGluZ0NhcmQiLCJyZXBsYWNlQ2hpbGQiLCJuZXdDYXJkIiwiY2FyZCIsInNvcnRpbmdPcHRpb25zIiwic29ydGluZ0N0cmwiLCJjb250YWluZXIiLCJjaG9pY2VJbnB1dCIsImZvciIsIm5leHRQcmV2aW91c0J0bnMiLCJzZXREYXRlIiwiZ2V0RGF0ZSIsInRhc2tFZGl0U3RhdGUiLCJ0YXNrRGV0YWlscyIsIndpbmRvdyIsIm9mZnNldFdpZHRoIl0sInNvdXJjZVJvb3QiOiIifQ==