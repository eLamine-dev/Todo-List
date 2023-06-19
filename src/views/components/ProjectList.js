import createElement from '../../utils/ElementBuilder';
import pubsub from '../../utils/PubSub';
import ExpandableList from './ExpandableList';

class ProjectList extends HTMLElement {
   connectedCallback() {
      this.render();
      this.addEventListeners();
   }

   render() {
      const header = createElement('h3').setContent('Projects');
      this.prepend(header);
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
