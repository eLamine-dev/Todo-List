import BaseModel from './BaseModel';
import CategoryModel from './CategoryModel';

class ProjectModel extends BaseModel {
   constructor() {
      super();

      this.categories = new CategoryModel();
      [
         { title: 'personal', id: '01' },
         { title: 'education', id: '02' },
      ].forEach((category) => {
         this.categories.addItem(category);
      });
   }

   getState() {
      const categories = this.categories.getAllItems();
      console.log(categories);
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
