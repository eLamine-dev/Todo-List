import createElement from '../../utils/ElementBuilder';
import pubsub from '../../utils/PubSub';
import ListItem from './EditableListItem';

class ProjectList extends HTMLElement {
   connectedCallback() {
      this.render();
      this.addEventListeners();
   }

   render() {
      // const projectList = createElement('ul');
      this.state.forEach((project) => {
         const projectLI = createElement('editable-li')
            .setAttributes({ 'data-type': 'project' })
            .setContent(project.title)
            .setState(project);

         this.appendChild(projectLI);
      });
      // this.appendChild(projectList);
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
