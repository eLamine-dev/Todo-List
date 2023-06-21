import pubsub from '../utils/PubSub';
import createElement from '../utils/ElementBuilder';

class ProjectController {
   constructor(projectModel, projectView) {
      this.model = projectModel;
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

      this.view = projectView;

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

   createProjectsList(category) {
      const categoryProjects = this.getCategoryProjects(category);
      // const categoryProjectsList = createElement('exp-list').setState({
      //    header: { type: 'category', data: category },
      //    items: { type: 'project', data: categoryProjects },
      // });

      this.view.setState({ category, categoryProjects }).addProjectsList();
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
