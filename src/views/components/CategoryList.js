import createElement from '../../utils/ElementBuilder';
import ProjectList from './ProjectList';

class CategoryList extends HTMLElement {
   connectedCallback() {
      this.render();
      // this.addEventListeners();
   }

   render() {
      this.setAttribute('slot', 'project-list');
      this.state.forEach((category) => {
         const categoryProjects = createElement('project-list').setState(
            category.projects
         );

         const categoryLi = createElement('li')
            .setContent(category.title)
            .appendChildren(categoryProjects);

         this.appendChild(categoryLi);
      });
   }
}

customElements.define('category-list', CategoryList);
