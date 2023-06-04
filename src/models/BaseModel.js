import ObjectBuilder from '../utils/ObjectBuilder';

class BaseModel {
   constructor(collectionName) {
      this.collectionName = collectionName;
      this[collectionName] = [];
   }

   static createItem(data) {
      return new ObjectBuilder(data);
   }

   addItem(newItem) {
      this[this.collectionName].push(newItem);
   }

   getAllItems() {
      return this[this.collectionName];
   }

   getLastItem() {
      return this[this.collectionName].slice(-1)[0];
   }

   getItemById(id) {
      this[this.collectionName].find((item) => item.id === id);
   }

   updateItem(id, data) {
      const itemToEdit = this[this.collectionName].find(
         (item) => item.id === id
      );
      itemToEdit.editProperties(data);
   }

   deleteItem(id) {
      const index = this[this.collectionName].findIndex(
         (item) => item.id === id
      );
      if (index !== -1) {
         this.items.splice(index, 1);
      }
   }
}

export default BaseModel;
