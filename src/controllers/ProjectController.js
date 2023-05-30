import pubsub from '../utils/PubSub';
import ProjectModel from '../models/ProjectModel';
import TaskList from '../views/components/TaskList';
import createElement from '../utils/ElementBuilder';

class ProjectController {
   constructor() {
      this.model = new ProjectModel();
      this.view = createElement('').setState(this.model.getAllItems()).build();

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

   handleUpdateTask(projectId, newDta) {
      this.model.updateItem(projectId, newDta);
   }
}

export default ProjectController;
