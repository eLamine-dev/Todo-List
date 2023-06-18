import createElement from '../../utils/ElementBuilder';
import pubsub from '../../utils/PubSub';
import ProjectList from './ProjectList';

class CategoryList extends HTMLElement {
   connectedCallback() {
      this.render();
      this.addEventListeners();
   }

   render() {
      createElement('h3').setContent('Projects').appendTo(this);
      this.state.forEach((category) => {
         const categoryLi = createElement('li')
            .setState(category)
            .setAttributes({ class: 'category' })
            .setContent(category.title);

         this.appendChild(categoryLi);

         const addProjectToCategory = createElement('button')
            .setContent('+')
            .setAttributes({ class: 'addProjectBtn' })
            .appendTo(categoryLi);
      });

      createElement('button')
         .setAttributes({ id: 'addCategoryBtn' })
         .setContent('+')
         .appendTo(this);
   }

   addEventListeners() {
      this.childNodes.forEach((categoryLi) => {
         categoryLi.addEventListener('click', (event) => {
            if (categoryLi.querySelector('project-list')) return;
            pubsub.publish('category:load', categoryLi);
         });
      });
   }
}

customElements.define('category-list', CategoryList);

export default CategoryList;
