import createElement from '../../utils/ElementBuilder';
import pubsub from '../../utils/PubSub';
import ExpandableList from './ExpandableList';

class ProjectList extends HTMLElement {
   connectedCallback() {
      this.render();
      this.addEventListeners();
   }

   render() {
      const header = createElement('h3').setContent('Projects');
      this.prepend(header);

      const addCategoryBtn = createElement('button')
         .setAttributes({ class: 'add-category-btn' })
         .setContent('Add category');

      this.append(addCategoryBtn);
   }

   addProjectsList() {
      const categoryProjectsList = createElement('exp-list').setState({
         header: { type: 'category', data: this.state.category },
         items: { type: 'project', data: this.state.categoryProjects },
      });

      this.append(categoryProjectsList);
   }

   addEventListeners() {
      this.addEventListener('click', (ev) => {
         ev.preventDefault();
         if (ev.target.classList.contains('add-category-btn')) {
            this.addProjectsList();
         }
      });
   }
}

customElements.define('project-list', ProjectList);

export default ProjectList;
