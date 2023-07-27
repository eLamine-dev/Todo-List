import pubsub from '../utils/PubSub';

class CategoryController {
   constructor(categoryModel) {
      this.model = categoryModel;
      this.initializeListeners();
   }

   initializeListeners() {
      pubsub.subscribe('category:add', this.handleAddCategory.bind(this));
      pubsub.subscribe('category:update', this.handleUpdateCategory.bind(this));
      pubsub.subscribe('category:delete', this.handleDeleteCategory.bind(this));
   }

   handleAddCategory(newCategoryLi) {
      this.model.addItem(newCategoryLi.getState());
      const newCategory = this.model.getLastAddedItem();
      newCategoryLi.parentElement.setState({
         header: newCategory,
         items: { type: 'project', list: null },
      });

      pubsub.publish('categories:updated', {
         categories: this.model.getAllItems(),
      });
   }

   handleUpdateCategory(categoryLi) {
      this.model.updateItem(
         categoryLi.getAttribute('id'),
         categoryLi.getState()
      );

      const editedCategory = this.model.getItemById(
         categoryLi.getAttribute('id')
      );
      categoryLi.parentElement.setState({ header: editedCategory });

      pubsub.publish('categories:updated', {
         categories: this.model.getAllItems(),
      });
   }

   handleDeleteCategory(categoryLi) {
      this.model.deleteItem(categoryLi.getAttribute('id'));
      categoryLi.parentElement.remove();
      pubsub.publish('category:deleted', categoryLi.getAttribute('id'));
      document.querySelector(`.default-filter[id=all]`).click();
   }
}

export default CategoryController;
