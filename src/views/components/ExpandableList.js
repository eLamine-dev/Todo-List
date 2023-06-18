import createElement from '../../utils/ElementBuilder';
import pubsub from '../../utils/PubSub';
import ListItem from './EditableListItem';

class ProjectList extends HTMLElement {
   connectedCallback() {
      this.render();
      this.addEventListeners();
   }

   render() {
      const listHeader = createElement('h3')
         .setAttributes({
            class: 'header',
         })
         .appendTo(this);

      this.state.forEach((item) => {
         const itemLI = createElement('editable-li')
            .setAttributes({ 'data-type': 'project' })
            .setState(item);

         this.appendChild(itemLI);
      });

      const addItemBtn = createElement('button')
         .setAttributes({
            class: 'add-item',
         })
         .appendTo(this);
   }

   addEventListeners() {
      this.addEventListener('click', (ev) => {
         ev.preventDefault();
         if (ev.target.getAttribute('data-type') === 'project') {
            pubsub.publish('filter:changed', {
               type: ev.target.getAttribute('data-type'),
               value: ev.target.state.id,
            });
         }
      });
   }
}

customElements.define('project-list', ProjectList);

export default ProjectList;
