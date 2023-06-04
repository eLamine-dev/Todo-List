import createElement from '../../utils/ElementBuilder';
import pubsub from '../../utils/PubSub';

class ProjectList extends HTMLElement {
   connectedCallback() {
      this.render();
      this.addEventListeners();
   }

   render() {
      this.state.forEach((project) => {
         const projectLI = createElement('li')
            .setAttributes({ 'data-type': 'project' })
            .setState(project)
            .setContent(project.title)
            .build();
         this.appendChild(projectLI);
      });
   }

   addEventListeners() {
      this.addEventListener('click', (ev) => {
         ev.preventDefault();
         if (ev.target.getAttribute('data-type') === 'project') {
            pubsub.publish('filter:changed', {
               type: ev.target.getAttribute('data-type'),
               id: ev.target.state.id,
            });
         }
      });
   }
}

customElements.define('project-list', ProjectList);

export default ProjectList;
