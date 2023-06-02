import createElement from '../../utils/ElementBuilder';
import ProjectList from './ProjectList';

class CategoryList extends HTMLElement {
   connectedCallback() {
      this.render();
      // this.addEventListeners();
   }

   render() {
      this.state.forEach((category) => {
         const categoryProjects = createElement('project-list')
            .setState(category.projects)
            .build();

         const categoryLi = createElement('li')
            .setContent(category.title)
            .appendChildren(categoryProjects)
            .build();
         this.appendChild(categoryLi);
      });
   }
}

customElements.define('category-list', CategoryList);
