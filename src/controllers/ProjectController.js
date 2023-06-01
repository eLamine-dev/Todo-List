import pubsub from '../utils/PubSub';
import ProjectModel from '../models/ProjectModel';
import CategoryModel from '../models/CategoryModel';
import createElement from '../utils/ElementBuilder';
import SideBar from '../views/components/SideBar';

class ProjectController {
   constructor() {
      this.projectsModel = new ProjectModel();
      this.categoriesModel = new CategoryModel();

      [
         { title: 'project01', id: '56565', categoryId: '01' },
         { title: 'project02', id: '44444', categoryId: '02' },
         { title: 'project03', id: '56566', categoryId: '01' },
         { title: 'project04', id: '25568', categoryId: '02' },
         { title: 'project05', id: '25568', categoryId: '03' },
      ].forEach((project) => {
         this.projectsModel.addItem(project);
      });

      [
         { title: 'personal', id: '01' },
         { title: 'education', id: '02' },
         { title: 'work', id: '03' },
      ].forEach((category) => {
         this.categoriesModel.addItem(category);
      });

      this.view = createElement('side-bar')
         .setState(
            this.projectsModel.getProjectsByCategory(
               this.categoriesModel.getAllItems()
            )
         )
         .build();

      pubsub.subscribe('project:add', this.handleAddProject.bind(this));
      pubsub.subscribe('project:remove', this.handleRemoveProject.bind(this));
      pubsub.subscribe('project:update', this.handleUpdateProject.bind(this));
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
