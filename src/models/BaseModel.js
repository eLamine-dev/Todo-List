import ObjectBuilder from '../utils/ObjectBuilder';

class BaseModel {
   constructor(collectionName) {
      this.collectionName = collectionName;
      this[collectionName] =
         Array.from(JSON.parse(localStorage.getItem(this.collectionName))) ||
         [];
   }

   saveToLocalStorage() {
      localStorage.setItem(
         this.collectionName,
         JSON.stringify(this[this.collectionName])
      );
   }

   addItem(data) {
      const newItem = new ObjectBuilder(data);
      this[this.collectionName].push(newItem);
      this.saveToLocalStorage();
   }

   getAllItems() {
      return this[this.collectionName];
   }

   getLastAddedItem() {
      return this[this.collectionName].slice(-1)[0];
   }

   getItemById(id) {
      return this[this.collectionName].find((item) => item.id === id);
   }

   updateItem(id, data) {
      const itemToEdit = this[this.collectionName].find(
         (item) => item.id === id
      );
      itemToEdit.updateProperties(data);
      this.saveToLocalStorage();
   }

   deleteItem(id) {
      const index = this[this.collectionName].findIndex(
         (item) => item.id === id
      );
      if (index !== -1) {
         this[this.collectionName].splice(index, 1);
      }
      this.saveToLocalStorage();
   }
}

export default BaseModel;
