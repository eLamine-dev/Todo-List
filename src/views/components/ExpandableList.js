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
         .setAttributes({
            'data-type': this.state.header.type,
            class: 'list-header',
         })
         .setState(this.state.header.data);

      const listUl = createElement('ul').setAttributes({
         class: 'items-list',
         'items-type': this.state.items.type,
      });

      if (this.state.items.data) {
         this.state.items.data.forEach((item) => {
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
         .setContent('+')
         .appendTo(listHeader.querySelector('.item-buttons'));
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
      const itemsList = this.querySelector('.items-list');
      const itemType = itemsList.getAttribute('items-type');
      const newItem = createElement('editable-li').setState({
         dataType: itemType,
         title: `New ${itemType.toLowerCase()}`,
      });

      itemsList.appendChild(newItem);
      newItem.startEditItem();
   }
}

customElements.define('exp-list', ExpandableList);

export default ExpandableList;
