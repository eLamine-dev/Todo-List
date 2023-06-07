import createElement from '../../utils/ElementBuilder';
import ProjectList from './ProjectList';

class CategoryList extends HTMLElement {
   connectedCallback() {
      this.render();
      // this.addEventListeners();
   }

   render() {
      console.log('from categorylist');
      this.state.forEach((category) => {
         const projectsListSlot = createElement('slot').setAttributes({
            name: 'projects',
         });

         const categoryLi = createElement('li')
            .setState(category)
            .setContent(category.title)
            .appendChildren(projectsListSlot);

         this.appendChild(categoryLi);
      });
   }
}

customElements.define('category-list', CategoryList);
