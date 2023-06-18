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
   }
}

customElements.define('side-bar', SideBar);

export default SideBar;
