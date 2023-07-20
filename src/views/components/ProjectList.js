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
      const header = createElement('h3').setContent('Projects');
      this.prepend(header);

      this.buildProjectsList();

      const addCategoryBtn = createElement('button')
         .setAttributes({ class: 'add-category-btn' })
         .setContent('Add category');

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

   highlightCurrentFilter(filterElm) {
      document
         .querySelector('[current-filter]')
         .removeAttribute('current-filter');
      filterElm.setAttribute('current-filter', '');
   }

   addEventListeners() {
      this.addEventListener('click', (ev) => {
         if (document.querySelector(`[active]`)) return;
         if (ev.target.classList.contains('add-category-btn')) {
            this.createCategoryList({ dataType: 'category' }, null);
            this.lastChild.firstChild.startEditItem();
         } else if (
            ev.target.closest('editable-li') &&
            !ev.target.closest('.item-buttons')
         ) {
            const data = {
               type: ev.target.closest('editable-li').getAttribute('data-type'),
               value: ev.target.closest('editable-li').getAttribute('id'),
            };
            this.highlightCurrentFilter(ev.target.closest('editable-li'));
            pubsub.publish('filter:changed', data);
         }
      });
   }
}

customElements.define('project-list', ProjectList);

export default ProjectList;
