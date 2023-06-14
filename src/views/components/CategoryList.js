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
            .setContent(category.title);

         this.appendChild(categoryLi);
      });
   }

   addEventListeners() {
      this.childNodes.forEach((categoryLi) => {
         categoryLi.addEventListener(
            'click',
            (event) => {
               event.preventDefault();
               pubsub.publish('category:load', categoryLi);
            },
            { once: true }
         );
      });
   }
}

customElements.define('category-list', CategoryList);

export default CategoryList;
