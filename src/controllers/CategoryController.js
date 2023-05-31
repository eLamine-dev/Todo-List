// import pubsub from '../utils/PubSub';
// import CategoryModel from '../models/CategoryModel';

// import createElement from '../utils/ElementBuilder';

// class CategoryController {
//    constructor() {
//       this.model = new CategoryModel();
//       this.view = createElement('').setState(this.model.getAllItems()).build();

//       pubsub.subscribe('Category:add', this.handleAddCategory.bind(this));
//       pubsub.subscribe('Category:remove', this.handleRemoveCategory.bind(this));
//    }

//    handleAddCategory(data) {
//       const newCategory = CategoryModel.createItem(data);
//       this.model.addItem(newCategory);
//       this.view.addCategory(newCategory);
//    }

//    handleRemoveCategory(CategoryId) {
//       this.model.deleteItem(CategoryId);
//       // this.view.addTask(newTask);
//    }

//    handleUpdateTask(CategoryId, newData) {
//       this.model.updateItem(CategoryId, newData);
//    }
// }

// export default CategoryController;
