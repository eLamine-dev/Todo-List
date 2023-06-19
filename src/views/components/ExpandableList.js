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
         .setContent(this.state.title)
         .appendTo(this);

      this.state.items.forEach((item) => {
         const itemLI = createElement('editable-li')
            .setAttributes({ 'data-type': 'project' })
            .setState(item);

         this.appendChild(itemLI);
      });

      const addItemBtn = createElement('button')
         .setAttributes({
            class: 'add-item',
         })
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
