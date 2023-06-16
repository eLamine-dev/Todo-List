import createElement from '../../utils/ElementBuilder';
import categoryList from './CategoryList';

class SideBar extends HTMLElement {
   connectedCallback() {
      this.render();
      // this.addEventListeners();
   }

   render() {
      const defaultFilters = ['All', 'Today', 'Up-coming'];
      const defaultFiltersUl = createElement('ul');
      defaultFilters.forEach((filter) => {
         const filterLi = createElement('li').setContent(filter);
         defaultFiltersUl.appendChild(filterLi);
      });
      this.prepend(defaultFiltersUl);

      const projectList = createElement('ul')
         .setAttributes({
            id: 'projects-lists',
         })
         .setContent('projects');

      this.appendChild(projectList);
   }
}

customElements.define('side-bar', SideBar);

export default SideBar;
