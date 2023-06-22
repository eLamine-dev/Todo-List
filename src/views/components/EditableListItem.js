import createElement from '../../utils/ElementBuilder';
import pubsub from '../../utils/PubSub';

class ListItem extends HTMLElement {
   connectedCallback() {
      this.render();
      this.addEventListeners();
   }

   render() {
      this.innerText = 'Add New...';
      if (this.getState() !== null) {
         this.innerText = this.state.title;
         this.setAttribute('id', this.state.id || null);
      }

      const editBtn = createElement('button')
         .setContent('edit')
         .setAttributes({ class: 'edit-item' })
         .appendTo(this);
      const deleteBtn = createElement('button')
         .setContent('X')
         .setAttributes({
            class: 'delete-item',
         })
         .appendTo(this);
      const saveBtn = createElement('button')
         .setContent('save')
         .setAttributes({ class: 'save-item' })
         .appendTo(this);
   }

   addEventListeners() {
      this.addEventListener('click', (ev) => {
         if (ev.target.classList.contains('edit-item')) this.editItem();

         if (ev.target.classList.contains('delete-item')) this.deleteItem();

         if (ev.target.classList.contains('save-item')) this.saveItem();
      });
   }

   editItem() {
      this.contentEditable = true;
      this.querySelector('.edit-item').style.display = 'none';
      this.focus();
   }

   deleteItem() {
      this.remove();
      pubsub.publish(
         `${this.getAttribute('data-type')}:delete`,
         this.getAttribute('id')
      );
   }

   saveItem() {
      if (this.getAttribute('id')) {
         pubsub.publish(
            `${this.getAttribute('data-type')}:save`,
            this.getAttribute('id')
         );
      } else {
         pubsub.publish(`${this.getAttribute('data-type')}:add`);
      }
   }
}
customElements.define('editable-li', ListItem);
export default ListItem;