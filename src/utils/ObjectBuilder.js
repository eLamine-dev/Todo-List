import createNewID from './IdGenerator';

class ObjectBuilder {
   constructor(data = {}) {
      this.validateTitle(data.title);
      if (!data.id || data.id === '')
         this.id = `${data.dataType ? data.dataType : 'id'}-${createNewID()}`;
      this.setProperties(data);
   }

   validateTitle(title) {
      if (!title || title === '') {
         throw new Error('Cannot create the object without a title');
      }
   }

   setProperties(data) {
      return Object.assign(this, data);
   }

   updateProperties(data) {
      Object.keys(data).forEach((key) => {
         this[key] = data[key];
      });
   }

   getProperty(property) {
      return this[property];
   }

   editProperty(property, newValue) {
      this[property] = newValue;
   }
}

export default ObjectBuilder;
