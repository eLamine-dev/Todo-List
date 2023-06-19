import pubsub from '../utils/PubSub';

class CategoryController {
   constructor(categoryModel, CategoryView) {
      this.model = categoryModel;
      [
         { title: 'personal', id: '01' },
         { title: 'education', id: '02' },
         { title: 'work', id: '03' },
      ].forEach((category) => {
         this.model.addItem(category);
      });

      pubsub.subscribe('Category:add', this.handleAddCategory.bind(this));
      pubsub.subscribe('Category:remove', this.handleRemoveCategory.bind(this));
   }

   handleAddCategory(data) {
      const newCategory = this.categoryModel.createItem(data);
      this.model.addItem(newCategory);
   }

   handleRemoveCategory(CategoryId) {
      this.model.deleteItem(CategoryId);
   }

   handleUpdateCategory(CategoryId, newData) {
      this.model.updateItem(CategoryId, newData);
   }
}

export default CategoryController;
