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

         createElement('button')
            .setContent('+')
            .setAttributes({ class: 'addProjectBtn' })
            .appendTo(categoryLi);

         this.appendChild(categoryLi);
      });
   }

   showAddProjectForm(category) {
      createElement('div').setContent('test').appendTo(category);
   }

   addEventListeners() {
      this.childNodes.forEach((categoryLi) => {
         categoryLi.addEventListener('click', (event) => {
            if (event.target.classList.contains('addProjectBtn')) {
               this.showAddProjectForm(categoryLi);
            } else {
               event.preventDefault();
               if (categoryLi.hasChildNodes()) return;
               pubsub.publish('category:load', categoryLi);
            }
         });
      });
   }
}

customElements.define('category-list', CategoryList);

export default CategoryList;
