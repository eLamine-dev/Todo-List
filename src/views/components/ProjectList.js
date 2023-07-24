import createElement from '../../utils/ElementBuilder';
import pubsub from '../../utils/PubSub';
import ExpandableList from './ExpandableList';

class ProjectList extends HTMLElement {
   connectedCallback() {
      this.render();
      this.addEventListeners();
   }

   render() {
      this.setAttribute('id', 'projects-list');
      const header = createElement('h3')
         .setContent('Projects')
         .prependIcon('fa-solid fa-bars-progress')
         .setAttributes({ class: 'projects-list-header' });
      this.prepend(header);

      this.buildProjectsList();

      const addCategoryBtn = createElement('button')
         .setAttributes({ class: 'add-category-btn' })
         .setContent('New projects list...')
         .prependIcon('fa-solid fa-square-plus');

      this.append(addCategoryBtn);
   }

   buildProjectsList() {
      this.state.categories.forEach((category) => {
         const categoryProjects = this.state.projects.filter(
            (project) => project.categoryId === category.id
         );
         this.createCategoryList(category, categoryProjects);
      });
   }

   createCategoryList(category, categoryProjects) {
      const list = createElement('exp-list').setState({
         header: category,
         items: { type: 'project', list: categoryProjects },
      });
      this.append(list);
   }

   // highlightCurrentFilter(filterElm) {
   //    if (document.querySelector(`[current-filter]`)) {
   //       document
   //          .querySelector(`[current-filter]`)
   //          .removeAttribute('current-filter');
   //    }

   //    filterElm.setAttribute('current-filter', '');
   // }

   addEventListeners() {
      this.addEventListener('click', (ev) => {
         if (document.querySelector(`[active]`)) return;

         if (ev.target.classList.contains('add-category-btn')) {
            this.createCategoryList({ dataType: 'category' }, null);
            this.lastChild.firstChild.startEditItem();
         } else if (
            ev.target.closest('editable-li') &&
            !ev.target.parentNode.classList.contains('item-buttons') &&
            !ev.target.closest('editable-li').hasAttribute('active')
         ) {
            const filterElm = ev.target.closest('editable-li');
            const data = {
               id: filterElm.getAttribute('id'),
               type: filterElm.getAttribute('data-type'),
               value: filterElm.getAttribute('id'),
            };

            if (filterElm.classList.contains('list-header')) {
               if (
                  !filterElm.hasAttribute('current-filter') &&
                  filterElm.closest('exp-list').hasAttribute('expanded')
               ) {
                  // this.highlightCurrentFilter(filterElm);
                  pubsub.publish('filter:changed', data);
                  return;
               }
               filterElm.closest('exp-list').toggleList();
            }

            // this.highlightCurrentFilter(filterElm);
            pubsub.publish('filter:changed', data);
         }
      });
   }
}

customElements.define('project-list', ProjectList);

export default ProjectList;
