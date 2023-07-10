import createElement from '../../utils/ElementBuilder';
import pubsub from '../../utils/PubSub';

class ListItem extends HTMLElement {
   connectedCallback() {
      this.render();
      this.addEventListeners();
   }

   render() {
      const title = createElement('div')
         .setContent(this.state.title)
         .setAttributes({ class: 'item-title' })
         .appendTo(this);

      this.setAttribute('data-type', this.state.dataType);
      if (this.state.id) this.setAttribute('id', this.state.id);

      const buttons = createElement('div')
         .setAttributes({ class: 'item-buttons' })
         .appendTo(this);

      const editBtn = createElement('button')
         .setContent('E')
         .setAttributes({ class: 'edit-item' })
         .appendTo(buttons);

      const deleteBtn = createElement('button')
         .setContent('D')
         .setAttributes({
            class: 'delete-item',
         })
         .appendTo(buttons);

      const saveBtn = createElement('button')
         .setContent('S')
         .setAttributes({ class: 'save-item' })
         .appendTo(buttons);
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
      createElement('input')
         .setAttributes({
            placeholder: `New ${this.getAttribute('data-type')}`,
            value: this.state.title || '',
            type: 'text',
         })
         .appendTo(this);
      this.querySelector('.item-title').style = 'display:none';
      this.querySelector('.save-item').style.display = 'block';
      this.querySelector('.edit-item').style.display = 'none';
      this.querySelector('.item-title').focus();
   }

   endEditItem() {
      this.querySelector('.item-title').textContent =
         this.querySelector('input').value;
      this.querySelector('.item-title').style = 'display:block';
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
      const title = this.querySelector('.item-title').textContent;
      this.state.title = title;
      if (this.getAttribute('id')) {
         pubsub.publish(`${this.getAttribute('data-type')}:update`, this);
      } else {
         pubsub.publish(`${this.getAttribute('data-type')}:add`, this);
      }
   }
}
customElements.define('editable-li', ListItem);
export default ListItem;
