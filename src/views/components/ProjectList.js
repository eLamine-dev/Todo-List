import createElement from '../../utils/ElementBuilder';
import pubsub from '../../utils/PubSub';
import ProjectCard from './ProjectCard';

class ProjectList extends HTMLElement {
   connectedCallback() {
      this.render();
      this.addEventListeners();
   }

   render() {
      const projectList = createElement('ul');
      this.state.forEach((project) => {
         const projectLI = createElement('project-card')
            .setAttributes({ 'data-type': 'project' })
            .setState(project);

         projectList.appendChild(projectLI);
      });
      this.appendChild(projectList);

      const addProjectToCategory = createElement('button')
         .setContent('+')
         .setAttributes({ class: 'addProjectBtn' })
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
