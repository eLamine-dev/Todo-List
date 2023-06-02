import BaseModel from './BaseModel';
import CategoryModel from './CategoryModel';

class ProjectModel extends BaseModel {
   constructor() {
      super();
   }

   getProjectsByCategory(categories) {
      categories.forEach((category) => {
         category.projects = this.items.filter(
            (project) => project.categoryId === category.id
         );
      });
      return categories;
   }
}

export default ProjectModel;
