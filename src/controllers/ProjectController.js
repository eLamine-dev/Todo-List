import pubsub from '../utils/PubSub';
import createElement from '../utils/ElementBuilder';

class ProjectController {
   constructor(projectModel, projectList) {
      this.model = projectModel;
      this.view = projectList;
      this.viewState = {};
      [
         {
            dataType: 'project',
            title: 'project01',
            id: '001',
            categoryId: '01',
         },
         {
            dataType: 'project',
            title: 'project02',
            id: '002',
            categoryId: '02',
         },
         {
            dataType: 'project',
            title: 'project03',
            id: '003',
            categoryId: '01',
         },
         {
            dataType: 'project',
            title: 'project04',
            id: '004',
            categoryId: '02',
         },
         {
            dataType: 'project',
            title: 'project05',
            id: '005',
            categoryId: '03',
         },
      ].forEach((project) => {
         this.model.addItem(project);
      });

      this.initializeListeners();
   }

   initializeListeners() {
      pubsub.subscribe('categories:update', this.setUpViewState.bind(this));
   }

   setUpViewState(externalData) {
      const internalData = { projects: this.model.getAllItems() };
      Object.assign(this.viewState, internalData, externalData);
      this.buildProjectsList();
   }

   buildProjectsList() {
      this.viewState.categories.forEach((category) => {
         const categoryProjects = this.viewState.projects.filter(
            (project) => project.categoryId === category.id
         );
         this.view.createListForCategory(category, categoryProjects);
      });
   }

   getCategoryProjects(category) {
      const categoryProjects = this.model
         .getAllItems()
         .filter((project) => project.categoryId === category.id);
      return categoryProjects;
   }

   createProjectsList(category) {
      const categoryProjects = this.getCategoryProjects(category);
      this.view.setState({ category, categoryProjects });
      // .setUpList();
   }

   handleAddProject(data) {
      const newProject = ProjectController.createItem(data);
      this.model.addItem(newProject);
      this.view.addProject(data);
   }

   handleRemoveProject(projectId) {
      this.model.deleteItem(projectId);
      // this.view.addTask(newTask);
   }

   handleUpdateProject(projectId, newData) {
      this.model.updateItem(projectId, newData);
   }
}

export default ProjectController;
