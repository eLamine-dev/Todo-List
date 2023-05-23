import ObjectBuilder from '../utils/ObjectBuilder';

class BaseModel {
   constructor() {
      this.items = [];
   }

   addItem(data) {
      const newItem = new ObjectBuilder(data);
      this.push(newItem);
   }

   getAllItems() {
      return this.items;
   }

   update(id, data) {
      const itemToEdit = this.items.find((item) => item.id === id);
      itemToEdit.editProperties(data);
   }

   delete(id) {
      // Implement delete logic
   }
}

export default BaseModel;
