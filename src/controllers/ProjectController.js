import pubsub from '../utils/PubSub';
import ProjectModel from '../models/ProjectModel';
import ProjectList from '../views/components/ProjectList';
import createElement from '../utils/ElementBuilder';

class ProjectController {
   constructor() {
      this.model = new ProjectModel();

      [
         { title: 'project01', id: '56565', categoryId: '01' },
         { title: 'project02', id: '44444', categoryId: '02' },
         { title: 'project03', id: '56566', categoryId: '01' },
         { title: 'project04', id: '25568', categoryId: '02' },
      ].forEach((project) => {
         this.model.addItem(project);
      });

      this.view = createElement('project-list')
         .setState(this.model.getState())
         .build();

      pubsub.subscribe('project:add', this.handleAddProject.bind(this));
      pubsub.subscribe('project:remove', this.handleRemoveProject.bind(this));
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

   handleUpdateTask(projectId, newData) {
      this.model.updateItem(projectId, newData);
   }
}

export default ProjectController;
