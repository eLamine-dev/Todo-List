import { compareAsc, format, getWeek, startOfWeek, endOfWeek } from 'date-fns';
import createElement from '../../utils/ElementBuilder';
import pubsub from '../../utils/PubSub';

class SideBar extends HTMLElement {
   connectedCallback() {
      this.render();
      this.addEventListeners();
   }

   render() {
      const today = new Date();
      const week = { start: startOfWeek(today), end: endOfWeek(today) };
      const defaultFilters = [
         { id: 'all', type: 'all', value: 'all' },
         { id: 'today', type: 'date', value: format(today, 'yyyy-MM-dd') },
         { id: 'upcoming', type: 'date-range', value: week },
      ];

      const defaultFiltersUl = createElement('ul');
      defaultFilters.forEach((filter) => {
         const filterLi = createElement('li')
            .setState(filter)
            .setContent(filter.id.charAt(0).toUpperCase() + filter.id.slice(1))
            .setAttributes({
               'filter-type': filter.type,
               class: 'default-filter',
               id: filter.id,
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
               value: ev.target.getState().value,
            };

            pubsub.publish('filter:changed', data);
         }
      });
   }
}

customElements.define('side-bar', SideBar);

export default SideBar;
