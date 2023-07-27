import ObjectBuilder from '../utils/ObjectBuilder';
import dummyData from '../utils/DummyContent';
import { th } from 'date-fns/locale';

class BaseModel {
   constructor(collectionName) {
      this.collectionName = collectionName;
      this[collectionName] = [];
      this.setDummyContent();
      this.retrieveFromLocalStorage();
   }

   retrieveFromLocalStorage() {
      const itemsData = Array.from(
         JSON.parse(localStorage.getItem(this.collectionName))
      );

      itemsData.forEach((item) => {
         const object = new ObjectBuilder(item);
         this[this.collectionName].push(object);
      });
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

   deleteItemsByProperty(property, value) {
      this[this.collectionName] = this[this.collectionName].filter(
         (item) => item[property] !== value
      );
      this.saveToLocalStorage();
   }

   setDummyContent() {
      if (
         JSON.parse(
            localStorage.getItem(`${this.collectionName}-dummy-content`)
         ) === null
      ) {
         localStorage.setItem(
            this.collectionName,
            JSON.stringify(dummyData[this.collectionName])
         );
         localStorage.setItem(
            `${this.collectionName}-dummy-content`,
            JSON.stringify(true)
         );
      }
   }
}

export default BaseModel;
