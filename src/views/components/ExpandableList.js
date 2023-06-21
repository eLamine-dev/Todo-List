import createElement from '../../utils/ElementBuilder';
import pubsub from '../../utils/PubSub';
import ListItem from './EditableListItem';

class ExpandableList extends HTMLElement {
   connectedCallback() {
      this.render();
      this.addEventListeners();
   }

   render() {
      const listHeader = createElement('editable-li')
         .setAttributes({ 'data-type': this.state.header.type })
         .setState(this.state.header.data);

      const listUl = createElement('ul').setAttributes({
         class: 'items-list',
         'items-type': this.state.items.type,
      });

      this.state.items.data.forEach((item) => {
         const itemLI = createElement('editable-li').setState(item);

         listUl.appendChild(itemLI);
      });
      this.appendChild(listHeader);
      this.appendChild(listUl);

      const addItemBtn = createElement('button')
         .setAttributes({
            class: 'add-item',
         })
         .setContent('+')
         .appendTo(listHeader);
   }

   addEventListeners() {
      this.addEventListener('click', (ev) => {
         ev.preventDefault();
         if (ev.target.classList.contains('add-item')) {
            this.addItem();
         }
      });
   }

   addItem() {
      const newItem = createElement('editable-li').setContent('New...');
      const itemsList = this.querySelector('.items-list');
      itemsList.appendChild(newItem);
      newItem.editItem();
      newItem.focus();
   }
}

customElements.define('exp-list', ExpandableList);

export default ExpandableList;
