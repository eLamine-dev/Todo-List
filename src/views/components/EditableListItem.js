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
         .setAttributes({ class: 'edit-item', type: 'button' })
         .appendTo(buttons);

      const deleteBtn = createElement('button')
         .appendIcon('fa-regular fa-trash-can')
         .setAttributes({
            class: 'delete-item',
            type: 'button',
         })
         .appendTo(buttons);

      const saveBtn = createElement('button')
         .appendIcon('fa-solid fa-check')
         .setAttributes({ class: 'save-item', type: 'button' })
         .appendTo(buttons);

      const cancelBtn = createElement('button')
         .appendIcon('fa-solid fa-xmark')
         .setAttributes({ class: 'cancel-editing' })
         .appendTo(buttons);
   }

   addEventListeners() {
      this.addEventListener('click', (ev) => {
         if (
            document.querySelector(`[active]`) &&
            document.querySelector(`[active]`) !== this &&
            !this.closest('exp-list').classList.contains('checklist')
         ) {
            document.querySelector(`[active]`).showError();
            ev.preventDefault();
            return;
         }
         if (ev.target.classList.contains('edit-item')) this.startEditItem();
         else if (ev.target.classList.contains('delete-item'))
            this.deleteItem();

         if (ev.target.classList.contains('save-item')) this.saveItem();
         if (ev.target.classList.contains('cancel-editing'))
            this.cancelChanges();
      });

      document.addEventListener('mousedown', (ev) => {
         if (!this.hasAttribute('active')) return;
         if (
            this.hasAttribute('active') &&
            ev.target.closest('editable-li') !== this
         ) {
            this.showError();
         }
      });
   }

   // showError() {
   //    this.classList.add('error');
   //    setTimeout(() => {
   //       this.querySelector('input').focus();
   //       this.classList.remove('error');
   //    }, 1400);
   // }

   startEditItem() {
      const input = createElement('input')
         .setAttributes({
            minlength: '4',
            maxlength: '30',
            placeholder: `New ${this.getAttribute('data-type')}`,
            value: this.state.title || '',
            type: 'text',
            class: 'editing-input',
         })
         .appendTo(this);

      input.focus();
      this.setAttributes({ active: '' });
   }

   endEditItem() {
      const input = this.querySelector('input');
      this.removeAttribute('active');

      input.remove();
   }

   cancelChanges() {
      if (!this.getAttribute('id')) {
         if (this.classList.contains('list-header'))
            this.parentElement.remove();
         else this.remove();
         return;
      }
      const title = this.querySelector('.item-title');
      title.textContent = this.state.title;
      title.capitalFirstLetter();
      this.endEditItem();
      this.removeAttribute('active');
   }

   deleteItem() {
      pubsub.publish(`${this.getAttribute('data-type')}:delete`, this);
      this.remove();
   }

   saveItem() {
      const input = this.querySelector('input');
      const title = this.querySelector('.item-title');

      if (!input.value || input.value.length < 4 || input.value.length > 30) {
         this.showError();
         return;
      }

      title.textContent = input.value;
      title.capitalFirstLetter();
      this.setAttribute(
         'parent-list',
         this.parentElement.getAttribute('list-id')
      );
      this.state.title = input.value;
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
