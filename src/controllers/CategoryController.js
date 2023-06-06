import pubsub from '../utils/PubSub';
import createElement from '../utils/ElementBuilder';
import CategoryModel from '../models/CategoryModel';
import CategoryList from '../views/components/CategoryList';

class CategoryController {
   constructor() {
      this.model = new CategoryModel();
      [
         { title: 'personal', id: '01' },
         { title: 'education', id: '02' },
         { title: 'work', id: '03' },
      ].forEach((category) => {
         this.model.addItem(category);
      });

      this.view = createElement('category-list')
         .setState(this.model.getAllItems())
         .build();

      pubsub.subscribe('Category:add', this.handleAddCategory.bind(this));
      pubsub.subscribe('Category:remove', this.handleRemoveCategory.bind(this));
   }

   handleAddCategory(data) {
      const newCategory = CategoryModel.createItem(data);
      this.model.addItem(newCategory);
      this.view.addCategory(newCategory);
   }

   handleRemoveCategory(CategoryId) {
      this.model.deleteItem(CategoryId);
      // this.view.addTask(newTask);
   }

   handleUpdateCategory(CategoryId, newData) {
      this.model.updateItem(CategoryId, newData);
   }
}

export default CategoryController;
