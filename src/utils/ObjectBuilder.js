import createNewID from './IdGenerator';

class ObjectBuilder {
   constructor(data = {}) {
      this.validateTitle(data.title);
      this.id = createNewID();
      this.setProperties(data);
   }

   validateTitle(title) {
      if (!title || title === '') {
         throw new Error('Cannot create the object without a title');
      }
   }

   setProperties(data) {
      Object.assign(this, data);
   }

   editProperties(data) {
      Object.keys(data).forEach((key) => {
         if (this.hasOwnProperty(key)) this[key] = data[key];
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
