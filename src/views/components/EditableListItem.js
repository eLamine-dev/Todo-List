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
         .capitalFirstLetter()
         .appendTo(this);

      this.setAttribute('data-type', this.state.dataType);
      if (this.state.id) this.setAttribute('id', this.state.id);

      const buttons = createElement('div')
         .setAttributes({ class: 'item-buttons' })
         .appendTo(this);

      const editBtn = createElement('button')
         .appendIcon('fa-solid fa-pen')
         .setAttributes({ class: 'edit-item' })
         .appendTo(buttons);

      const deleteBtn = createElement('button')
         .appendIcon('fa-regular fa-trash-can')
         .setAttributes({
            class: 'delete-item',
         })
         .appendTo(buttons);

      const saveBtn = createElement('button')
         .appendIcon('fa-solid fa-check')
         .setAttributes({ class: 'save-item' })
         .appendTo(buttons);

      const cancelBtn = createElement('button')
         .appendIcon('fa-solid fa-xmark')
         .setAttributes({ class: 'cancel-editing' })
         .appendTo(buttons);
   }

   addEventListeners() {
      this.addEventListener('click', (ev) => {
         if (!document.querySelector('[edit=true]')) {
            if (ev.target.classList.contains('edit-item')) this.startEditItem();
            else if (ev.target.classList.contains('delete-item'))
               this.deleteItem();
         }
         if (ev.target.classList.contains('save-item')) this.saveItem();
         if (ev.target.classList.contains('cancel-editing'))
            this.cancelChanges();
      });
   }

   startEditItem() {
      this.setAttributes({ edit: true });
      const input = createElement('input')
         .setAttributes({
            maxlength: '25',
            placeholder: `New ${this.getAttribute('data-type')}`,
            value: this.state.title || '',
            type: 'text',
            class: 'editing-input',
         })
         .appendTo(this);

      input.focus();
      input.addEventListener('blur', () => {
         this.classList.add('error');
         setTimeout(() => {
            this.classList.remove('error');
            input.focus();
         }, 1000);
      });
   }

   endEditItem() {
      const input = this.querySelector('input');
      this.setAttributes({ edit: false });
      this.querySelector('.item-title').textContent = input.value;
      input.remove();
   }

   cancelChanges() {
      if (!this.getAttribute('id')) {
         this.remove();
         return;
      }
      this.setAttributes({ edit: false });
      this.clear();
      this.render();
   }

   deleteItem() {
      pubsub.publish(`${this.getAttribute('data-type')}:delete`, this);
      this.remove();
   }

   saveItem() {
      const title = this.querySelector('input').value;
      if (!title || title.length < 4 || title.length > 25) return;
      this.setAttribute(
         'parent-list',
         this.parentElement.getAttribute('list-id')
      );
      this.state.title = title;
      this.endEditItem();
      if (this.getAttribute('id')) {
         pubsub.publish(`${this.getAttribute('data-type')}:update`, this);
      } else {
         pubsub.publish(`${this.getAttribute('data-type')}:add`, this);
      }
   }
}
customElements.define('editable-li', ListItem);
export default ListItem;
