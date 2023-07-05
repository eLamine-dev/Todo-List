import createElement from '../../utils/ElementBuilder';
import pubsub from '../../utils/PubSub';

class SideBar extends HTMLElement {
   connectedCallback() {
      this.render();
      this.addEventListeners();
   }

   render() {
      const defaultFilters = [
         { type: 'all', value: 'inbox' },
         { type: 'date', value: 'today' },
         { type: 'date-range', value: 'UpComing' },
      ];
      const defaultFiltersUl = createElement('ul');
      defaultFilters.forEach((filter) => {
         const filterLi = createElement('li')
            .setContent(filter.value)
            .setAttributes({
               'filter-type': filter.type,
               class: 'default-filter',
               id: filter.value,
            });
         defaultFiltersUl.appendChild(filterLi);
      });
      this.prepend(defaultFiltersUl);
   }

   addEventListeners() {
      this.addEventListener('click', (ev) => {
         if (ev.target.classList.contains('default-filter')) {
            const data = {
               type: ev.target.getAttribute('filter-type'),
               value: ev.target.getAttribute('id'),
            };

            pubsub.publish('filter:changed', data);
         }
      });
   }
}

customElements.define('side-bar', SideBar);

export default SideBar;
