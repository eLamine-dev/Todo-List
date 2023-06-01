import createElement from '../../utils/ElementBuilder';

class CategoryList extends HTMLElement {
   connectedCallback() {
      this.render();
      // this.addEventListeners();
   }

   render() {
      this.state.forEach((category) => {
         const categoryProjects = createElement('ul')
            .setAttributes({ id: category.id })
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
