import pubsub from '../utils/PubSub';

class CategoryController {
   constructor(categoryModel) {
      this.model = categoryModel;
      [
         { dataType: 'category', title: 'personal', id: '01' },
         { dataType: 'category', title: 'education', id: '02' },
         { dataType: 'category', title: 'work', id: '03' },
      ].forEach((category) => {
         this.model.addItem(category);
      });
      this.initializeListeners();
   }

   initializeListeners() {
      pubsub.subscribe('category:add', this.handleAddCategory.bind(this));
      pubsub.subscribe('category:update', this.handleUpdateCategory.bind(this));
      pubsub.subscribe('category:delete', this.handleDeleteCategory.bind(this));
   }

   handleAddCategory(data) {
      this.model.addItem(data);
   }

   handleDeleteCategory(CategoryId) {
      this.model.deleteItem(CategoryId);
   }

   handleUpdateCategory(CategoryId, newData) {
      this.model.updateItem(CategoryId, newData);
   }
}

export default CategoryController;
