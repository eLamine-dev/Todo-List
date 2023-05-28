import ObjectBuilder from '../utils/ObjectBuilder';

class BaseModel {
   constructor() {
      this.items = [];
   }

   static createItem(data) {
      return new ObjectBuilder(data);
   }

   addItem(newItem) {
      this.items.push(newItem);
   }

   getAllItems() {
      return this.items;
   }

   getLastItem() {
      return this.items.slice(-1)[0];
   }

   update(id, data) {
      const itemToEdit = this.items.find((item) => item.id === id);
      itemToEdit.editProperties(data);
   }

   delete(id) {
      const index = this.items.findIndex((item) => item.id === id);
      if (index !== -1) {
         this.items.splice(index, 1);
      }
   }
}

export default BaseModel;
