import createElement from '../../utils/ElementBuilder';

class ProjectList extends HTMLElement {
   connectedCallback() {
      this.render();
      // this.addEventListeners();
   }

   render() {
      this.state.forEach((category) => {
         const categoryUl = createElement('ul').build();
         category.projects.forEach((project) => {
            const projectItem = createElement('li')
               .setContent(project.title)
               .build();
            categoryUl.appendChild(projectItem);
         });

         const categoryList = createElement('li')
            .setContent(category.title)
            .appendChildren(categoryUl)
            .build();
         this.appendChild(categoryList);
      });
   }
}

customElements.define('project-list', ProjectList);

export default ProjectList;
