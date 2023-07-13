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
      pubsub.subscribe('project:add', this.handleAddProject.bind(this));
      pubsub.subscribe('project:update', this.handleUpdateProject.bind(this));
      pubsub.subscribe('project:delete', this.handleDeleteProject.bind(this));
      pubsub.subscribe('categories:updated', this.buildViewState.bind(this));
   }

   handleAddProject(newProjectLi) {
      const data = newProjectLi.getState();
      Object.assign(data, {
         categoryId: newProjectLi.getAttribute('parent-list'),
      });
      this.model.addItem(data);
      const newProject = this.model.getLastAddedItem();
      newProjectLi.setState(newProject);
      pubsub.publish('projects:updated', {
         projects: this.model.getAllItems(),
      });
   }

   handleDeleteProject(projectLi) {
      this.model.deleteItem(projectLi.getAttribute('id'));
      pubsub.publish('projects:updated', {
         projects: this.model.getAllItems(),
      });
   }

   handleUpdateProject(projectLi) {
      this.model.updateItem(projectLi.getAttribute('id'), projectLi.getState());
      const editedProject = this.model.getItemById(
         projectLi.getAttribute('id')
      );

      projectLi.setState(editedProject);
      pubsub.publish('projects:updated', {
         projects: this.model.getAllItems(),
      });
   }

   buildViewState(externalData) {
      const internalData = { projects: this.model.getAllItems() };
      Object.assign(this.viewState, internalData, externalData);
      this.view.setState(this.viewState);
   }
}

export default ProjectController;
