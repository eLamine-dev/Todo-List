import createElement from '../../utils/ElementBuilder';
import pubsub from '../../utils/PubSub';

class ListItem extends HTMLElement {
   connectedCallback() {
      this.render();
      this.addEventListeners();
   }

   render() {
      const title = createElement('h6')
         .setContent('Add new...')
         .setAttributes({ class: 'item-title' })
         .appendTo(this);

      if (this.getState() !== null) {
         title.setContent(this.state.title);
         this.setAttribute('id', this.state.id || null);
         this.setAttribute('data-type', this.state.dataType);
      }

      const editBtn = createElement('button')
         .setContent('edit')
         .setAttributes({ class: 'edit-item' })
         .appendTo(this);

      const deleteBtn = createElement('button')
         .setContent('d')
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
         if (ev.target.classList.contains('edit-item')) this.startEditItem();
         else if (ev.target.classList.contains('delete-item'))
            this.deleteItem();
         else if (ev.target.classList.contains('save-item')) this.saveItem();
         else {
            const data = {
               type: this.getAttribute('data-type'),
               value: this.getAttribute('id'),
            };
            pubsub.publish('filter:changed', data);
         }
      });
   }

   startEditItem() {
      this.querySelector('.item-title').contentEditable = true;
      this.querySelector('.save-item').style.display = 'block';
      this.querySelector('.edit-item').style.display = 'none';
      this.querySelector('.item-title').focus();
   }

   endEditItem() {
      this.querySelector('.item-title').contentEditable = false;
      this.querySelector('.save-item').style.display = 'none';
      this.querySelector('.edit-item').style.display = 'block';
   }

   cancelChanges() {
      this.clear();
      this.render();
      this.addEventListeners();
   }

   deleteItem() {
      this.remove();
      pubsub.publish(
         `${this.getAttribute('data-type')}:delete`,
         this.getAttribute('id')
      );
   }

   saveItem() {
      this.endEditItem();
      if (this.getAttribute('id')) {
         pubsub.publish(
            `${this.getAttribute('data-type')}:update`,
            this.getAttribute('id')
         );
      } else {
         pubsub.publish(`${this.getAttribute('data-type')}:add`, this);
      }
   }
}
customElements.define('editable-li', ListItem);
export default ListItem;
