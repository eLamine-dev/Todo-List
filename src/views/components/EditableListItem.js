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

      const cancelBtn = createElement('button')
         .setContent('c')
         .setAttributes({ class: 'cancel-editing' })
         .appendTo(buttons);
   }

   addEventListeners() {
      this.addEventListener('click', (ev) => {
         if (!document.querySelector('editable-li [edit=true]')) {
            if (ev.target.classList.contains('edit-item')) this.startEditItem();
            else if (ev.target.classList.contains('delete-item'))
               this.deleteItem();
            // else {
            //    const data = {
            //       type: this.getAttribute('data-type'),
            //       value: this.getAttribute('id'),
            //    };
            //    pubsub.publish('filter:changed', data);
            // }
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
         input.classList.add('error');
         setTimeout(() => {
            input.classList.remove('error');
            input.focus();
         }, 1000);
      });
   }

   endEditItem() {
      this.setAttributes({ edit: false });
      this.querySelector('.item-title').textContent =
         this.querySelector('input').value;
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
      this.remove();
      pubsub.publish(
         `${this.getAttribute('data-type')}:delete`,
         this.getAttribute('id')
      );
   }

   saveItem() {
      const title = this.querySelector('input').value;
      if (!title || title.length < 4 || title.length > 25) return;
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
