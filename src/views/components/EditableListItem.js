import createElement from '../../utils/ElementBuilder';
import pubsub from '../../utils/PubSub';

class ListItem extends HTMLElement {
   connectedCallback() {
      this.render();
      this.addEventListeners();
   }

   render() {
      const editBtn = createElement('button')
         .setContent('edit')
         .setAttributes({ class: 'edit' })
         .appendTo(this);
      const deleteBtn = createElement('button')
         .setContent('X')
         .setAttributes({
            class: 'delete',
         })
         .appendTo(this);
      const saveBtn = createElement('button')
         .setContent('save')
         .setAttributes({ class: 'save' })
         .appendTo(this);
   }

   addEventListeners() {
      this.addEventListener('click', (ev) => {
         if (ev.target.classList.contains('edit')) {
            this.editItem();
         } else if (ev.target.classList.contains('delete')) {
            this.deleteItem();
         } else if (ev.target.classList.contains('save')) {
            this.saveItem();
         }
      });
   }

   editItem() {
      this.contentEditable = true;
   }

   deleteItem() {
      this.remove();
      pubsub.publish(
         `${this.getAttribute('data-type')}:add`,
         this.getAttribute('id')
      );
   }

   saveItem() {
      pubsub.publish(
         `${this.getAttribute('data-type')}:save`,
         this.getAttribute('id')
      );
   }
}
customElements.define('editable-li', ListItem);
export default ListItem;
