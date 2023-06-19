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
            class: 'header',
         })
         .setContent(this.state.header)
         .appendTo(this);

      const listUl = createElement('ul');

      this.state.items.forEach((item) => {
         const itemLI = createElement('editable-li')
            .setAttributes({ 'data-type': 'project' })
            .setContent(item.title)
            .setState(item);

         listUl.appendChild(itemLI);
      });

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
      const newItem = createElement('editable-li');
      this.appendChild(newItem);
      newItem.focus();
   }
}

customElements.define('exp-list', ExpandableList);

export default ExpandableList;
