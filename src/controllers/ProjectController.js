import pubsub from '../utils/PubSub';
import ProjectModel from '../models/ProjectModel';
import createElement from '../utils/ElementBuilder';
import ProjectList from '../views/components/ProjectList';

class ProjectController {
   constructor() {
      this.model = new ProjectModel();
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

   createListForCategories(categories) {
      categories.forEach((category) => {
         const categoryProjects = this.getCategoryProjects(category);
         this.view.set(
            category.title,
            createElement('project-list')
               .setContent(category.title)
               .setState(categoryProjects)
         );
      });
   }

   handleAddProject(data) {
      const newProject = ProjectModel.createItem(data);
      this.model.addItem(newProject);
      this.view.addProject(newProject);
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
