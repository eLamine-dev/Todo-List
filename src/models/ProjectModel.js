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

// projects = [
//    {
//       category: 'personal',
//       projects: [
//          {
//             id: '6s5d4f46',
//             title: 'project01',
//
//          },
//          {
//             id: '6s5d4f46',
//             title: 'project01',
//
//          },
//       ],
//    },
//    {
//       category: 'personal',
//       projects: [
//          {
//             id: '6s5d4f46',
//             title: 'project01',
//             description: 'long description',
//          },
//          {
//             id: '6s5d4f46',
//             title: 'project01',
//             description: 'long description',
//          },
//       ],
//    },
// ];
