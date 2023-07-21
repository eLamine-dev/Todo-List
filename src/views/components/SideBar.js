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
         { id: 'all', type: 'all', value: 'all', icon: 'fa-solid fa-inbox' },
         {
            id: 'today',
            type: 'date',
            value: format(today, 'yyyy-MM-dd'),
            icon: 'fa-solid fa-calendar-day',
         },
         {
            id: 'upcoming',
            type: 'date-range',
            value: week,
            icon: 'fa-solid fa-calendar-week',
         },
      ];

      const defaultFiltersUl = createElement('ul').setAttributes({
         class: 'default-filters-ul',
      });
      defaultFilters.forEach((filter) => {
         const filterLi = createElement('li')
            .setState(filter)
            .setContent(filter.id)
            .capitalFirstLetter()
            .prependIcon(filter.icon)
            .setAttributes({
               'filter-type': filter.type,
               class: 'default-filter',
               id: filter.id,
            });
         if (filter.type === 'all') filterLi.setAttribute('current-filter', '');
         defaultFiltersUl.appendChild(filterLi);
      });
      this.prepend(defaultFiltersUl);

      const header = createElement('header')
         .setContent('ToDo')
         .setAttributes({ class: 'header' })
         .prependTo(this);
   }

   highlightCurrentFilter(filterElm) {
      if (document.querySelector(`[current-filter]`)) {
         document
            .querySelector(`[current-filter]`)
            .removeAttribute('current-filter');
      }
      filterElm.setAttribute('current-filter', '');
   }

   addEventListeners() {
      this.addEventListener('click', (ev) => {
         if (ev.target.classList.contains('default-filter')) {
            if (document.querySelector(`[active]`)) {
               document.querySelector(`[active]`).showError();
               ev.preventDefault();
               return;
            }
            const data = {
               type: ev.target.getAttribute('filter-type'),
               value: ev.target.getState().value,
            };
            this.highlightCurrentFilter(ev.target);
            pubsub.publish('filter:changed', data);
         }
      });
   }
}

customElements.define('side-bar', SideBar);

export default SideBar;
