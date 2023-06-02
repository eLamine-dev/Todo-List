import createElement from '../../utils/ElementBuilder';

class ProjectList extends HTMLElement {
   connectedCallback() {
      this.render();
      // this.addEventListeners();
   }

   render() {
      this.state.forEach((project) => {
         const projectLI = createElement('li')
            .setContent(project.title)
            .build();
         this.appendChild(projectLI);
      });
   }
}

customElements.define('project-list', ProjectList);

export default ProjectList;
