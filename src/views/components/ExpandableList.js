import createElement from '../../utils/ElementBuilder';
import pubsub from '../../utils/PubSub';
import ListItem from './EditableListItem';

class ExpandableList extends HTMLElement {
   connectedCallback() {
      this.render();
      this.addEventListeners();
   }

   render() {
      const listHeader = createElement('editable-li').setState(
         this.state.header
      );

      const listUl = createElement('ul').setAttributes({
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
         .setContent('+');

      listHeader.querySelector('.item-buttons').prepend(addItemBtn);
   }

   addEventListeners() {
      this.addEventListener('click', (ev) => {
         ev.preventDefault();
         if (
            !document.querySelector(`[edit=true]`) &&
            ev.target.classList.contains('add-item')
         ) {
            this.addItem();
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
