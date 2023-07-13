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

      const addCategoryBtn = createElement('button')
         .setAttributes({ class: 'add-category-btn' })
         .setContent('Add category');

      this.append(addCategoryBtn);
   }

   createListForCategory(category, categoryProjects) {
      const list = createElement('exp-list').setState({
         header: category,
         items: { type: 'project', list: categoryProjects },
      });
      this.append(list);
   }

   addEventListeners() {
      this.addEventListener('click', (ev) => {
         if (document.querySelector(`[edit=true]`)) return;
         if (ev.target.classList.contains('add-category-btn')) {
            this.createListForCategory({ dataType: 'category' }, null);
            this.lastChild.firstChild.startEditItem();
         } else if (
            ev.target.closest('editable-li') &&
            !ev.target.closest('.item-buttons')
         ) {
            const data = {
               type: ev.target.closest('editable-li').getAttribute('data-type'),
               value: ev.target.closest('editable-li').getAttribute('id'),
            };
            pubsub.publish('filter:changed', data);
         }
      });
   }
}

customElements.define('project-list', ProjectList);

export default ProjectList;
