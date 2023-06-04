import BaseModel from './BaseModel';
import CategoryModel from './CategoryModel';

class ProjectModel extends BaseModel {
   constructor() {
      super('projects');
   }

   getProjectsByCategory(categories) {
      categories.forEach((category) => {
         category.projects = this.projects.filter(
            (project) => project.categoryId === category.id
         );
      });
      return categories;
   }
}

export default ProjectModel;
