import pubsub from '../utils/PubSub';
import createElement from '../utils/ElementBuilder';

class ProjectController {
   constructor(projectModel) {
      this.model = projectModel;
      [
         { title: 'project01', id: '001', categoryId: '01' },
         { title: 'project02', id: '002', categoryId: '02' },
         { title: 'project03', id: '003', categoryId: '01' },
         { title: 'project04', id: '004', categoryId: '02' },
         { title: 'project05', id: '005', categoryId: '03' },
      ].forEach((project) => {
         this.model.addItem(project);
      });

      this.view = new Map();

      pubsub.subscribe('project:add', this.handleAddProject.bind(this));
      pubsub.subscribe('project:remove', this.handleRemoveProject.bind(this));
      pubsub.subscribe('project:update', this.handleUpdateProject.bind(this));
   }

   getCategoryProjects(category) {
      const categoryProjects = this.model
         .getAllItems()
         .filter((project) => project.categoryId === category.id);

      return categoryProjects;
   }

   createListForCategory(category) {
      const categoryProjects = this.getCategoryProjects(category);
      this.view.set(
         category.title,
         createElement('project-list').setState(categoryProjects)
      );
   }

   handleAddProject(data) {
      this.model.addItem(data);
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
