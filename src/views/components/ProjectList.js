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

      this.state.forEach((state) => {
         const newList = createElement('exp-list').setState({
            header: { type: 'category', data: state.category },
            items: { type: 'project', data: state.categoryProjects },
         });
         this.append(newList);
      });

      const addCategoryBtn = createElement('button')
         .setAttributes({ class: 'add-category-btn' })
         .setContent('Add category');

      this.append(addCategoryBtn);
   }

   // setUpList() {
   //    this.newList(this.state.category, this.state.categoryProjects);
   // }

   // newList(headerData, listData) {
   //    const newList = createElement('exp-list').setState({
   //       header: { type: 'category', data: headerData },
   //       items: { type: 'project', data: listData },
   //    });
   //    this.append(newList);
   // }

   addEventListeners() {
      this.addEventListener('click', (ev) => {
         ev.preventDefault();
         if (ev.target.classList.contains('add-category-btn')) {
            this.newList(null, null);
            this.lastChild.querySelector('.list-header').startEditItem();
         }
      });
   }
}

customElements.define('project-list', ProjectList);

export default ProjectList;
