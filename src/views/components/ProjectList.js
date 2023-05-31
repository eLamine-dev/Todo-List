import createElement from '../../utils/ElementBuilder';

class ProjectList extends HTMLElement {
   connectedCallback() {
      this.render();
      // this.addEventListeners();
   }

   render() {
      this.state.forEach((category) => {
         console.log(category);
         const categoryList = createElement('li')
            .setContent(category.title)
            .build();
         this.appendChild(categoryList);
         category.projects.forEach((project) => {
            const projectItem = createElement('li')
               .setContent(project.title)
               .build();
            categoryList.appendChild(projectItem);
         });
      });
   }
}

customElements.define('project-list', ProjectList);

export default ProjectList;
