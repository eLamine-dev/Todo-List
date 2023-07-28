import { startOfWeek, endOfWeek } from 'date-fns';
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
         { title: 'all', type: 'all', value: 'all', icon: 'fa-solid fa-inbox' },
         {
            title: 'today',
            type: 'date',
            value: today,
            icon: 'fa-solid fa-calendar-day',
         },
         {
            title: 'week',
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
            .setContent(filter.title)
            .capitalFirstLetter()
            .prependIcon(filter.icon)
            .setAttributes({
               'filter-type': filter.type,
               class: 'default-filter',
               id: filter.title,
            });
         if (filter.type === 'all') filterLi.setAttribute('current-filter', '');
         defaultFiltersUl.appendChild(filterLi);
      });
      this.prepend(defaultFiltersUl);

      const header = createElement('header')
         .setAttributes({ class: 'header' })
         .prependTo(this);

      const icon = createElement('div')
         .setContent('ToBe.')
         .setAttributes({ class: 'icon' })
         .prependIcon('fa-solid fa-fire')
         .prependTo(header);

      const closeSideBar = createElement('button')
         .appendIcon('fa-solid fa-square-caret-left')
         .setAttributes({ class: 'close-side-bar' })
         .appendTo(header);
   }

   highlightCurrentFilter(filterData) {
      if (document.querySelector(`[current-filter]`)) {
         document
            .querySelector(`[current-filter]`)
            .removeAttribute('current-filter');
      }
      this.querySelector(`[id=${filterData.id}]`).setAttribute(
         'current-filter',
         ''
      );
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
               title: ev.target.state.title,
               id: ev.target.getAttribute('id'),
               type: ev.target.getAttribute('filter-type'),
               value: ev.target.getState().value,
            };

            this.highlightCurrentFilter(ev.target);
            pubsub.publish('filter:changed', data);
         }

         if (ev.target.classList.contains('close-side-bar')) {
            this.parentElement.removeAttribute('sidebar-open');
         }
      });

      pubsub.subscribe('filter:changed', (data) => {
         if (this.querySelector(`.default-filter[id=${data.title}]`)) {
            this.highlightCurrentFilter(
               this.querySelector(`.default-filter[id=${data.title}]`)
            );
         }
      });
   }
}
customElements.define('side-bar', SideBar);

export default SideBar;
