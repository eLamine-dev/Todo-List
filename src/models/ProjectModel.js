import BaseModel from './BaseModel';
import CategoryModel from './CategoryModel';

class ProjectModel extends BaseModel {
   constructor() {
      super('projects');
   }
}

export default ProjectModel;
