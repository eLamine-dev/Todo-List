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
         .setState(this.state.header)
         .appendIcon('fa-solid fa-chevron-down')
         .setAttributes({
            class: 'list-header',
         });

      const listUl = createElement('ul').setAttributes({
         'list-id': this.state.header.id || null,
         class: 'items-list',
         'items-type': this.state.items.type,
      });

      if (this.state.items.list) {
         this.state.items.list.forEach((item) => {
            const itemLI = createElement('editable-li').setState(item);
            listUl.appendChild(itemLI);
         });
      }

      this.appendChild(listHeader);
      this.appendChild(listUl);

      const addItemBtn = createElement('button')
         .setAttributes({
            class: 'add-item',
         })
         .appendIcon('fa-solid fa-plus');

      listHeader.querySelector('.item-buttons').prepend(addItemBtn);
   }

   toggleList() {}

   addEventListeners() {
      this.addEventListener('click', (ev) => {
         ev.preventDefault();
         if (
            !document.querySelector(`editable-li[edit=true]`) &&
            ev.target.classList.contains('add-item')
         ) {
            this.addItem();
         }

         if (ev.target.classList.contains('list-header')) {
            this.toggleList();
         }
      });
   }

   addItem() {
      const itemsList = this.querySelector('.items-list');
      const itemType = itemsList.getAttribute('items-type');
      const newItem = createElement('editable-li').setState({
         dataType: itemType,
      });
      itemsList.appendChild(newItem);
      newItem.startEditItem();
   }
}

customElements.define('exp-list', ExpandableList);

export default ExpandableList;
