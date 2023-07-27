import pubsub from '../utils/PubSub';
import createElement from '../utils/ElementBuilder';

class ProjectController {
   constructor(projectModel, projectList) {
      this.model = projectModel;
      this.view = projectList;
      this.viewState = {};
      this.initializeListeners();
   }

   initializeListeners() {
      pubsub.subscribe('project:add', this.handleAddProject.bind(this));
      pubsub.subscribe('project:update', this.handleUpdateProject.bind(this));
      pubsub.subscribe('project:delete', this.handleDeleteProject.bind(this));
      pubsub.subscribe(
         'category:deleted',
         this.handleCategoryDelete.bind(this)
      );
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
      const projectCategoryLi = projectLi.closest('exp-list').firstChild;
      if (projectLi.hasAttribute('current-filter')) {
         const newFilterData = {
            title: projectCategoryLi.getAttribute('data-title'),
            id: projectCategoryLi.getAttribute('id'),
            type: projectCategoryLi.getAttribute('data-type'),
            value: projectCategoryLi.getAttribute('id'),
         };
         pubsub.publish('filter:changed', newFilterData);
         this.view.highlightCurrentFilter(newFilterData);
      }

      this.model.deleteItem(projectLi.getAttribute('id'));
      pubsub.publish('project:deleted', projectLi.getAttribute('id'));
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

   handleCategoryDelete(categoryId) {
      this.model.getAllItems().forEach((project) => {
         if (project.categoryId === categoryId) {
            this.model.deleteItem(project.id);
            pubsub.publish('project:deleted', project.id);
         }
      });

      this.clearNonCategorizedProjects();
   }

   buildViewState(externalData) {
      this.viewState = { projects: this.model.getAllItems() };
      Object.assign(this.viewState, externalData);
      this.view.setState(this.viewState);
   }

   clearNonCategorizedProjects() {
      this.model.getAllItems().forEach((project) => {
         const projectCategory = this.viewState.categories.find(
            (category) => project.categoryId === category.id
         );
         if (!projectCategory) {
            this.model.deleteItem(project.id);
            pubsub.publish('projects:updated', {
               projects: this.model.getAllItems(),
            });
         }
      });
   }
}

export default ProjectController;
