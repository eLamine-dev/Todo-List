import createElement from '../../utils/ElementBuilder';
import pubsub from '../../utils/PubSub';
import ProjectList from './ProjectList';

class CategoryList extends HTMLElement {
   connectedCallback() {
      this.render();
      this.addEventListeners();
   }

   render() {
      createElement('h3').setContent('Projects').appendTo(this);
      this.state.forEach((category) => {
         const categoryLi = createElement('li')
            .setState(category)
            .setAttributes({ class: 'category' })
            .setContent(category.title);

         createElement('button')
            .setContent('+')
            .setAttributes({ class: 'addProjectBtn' })
            .appendTo(categoryLi);

         this.appendChild(categoryLi);
      });

      createElement('button')
         .setAttributes({ id: 'addCategoryBtn' })
         .setContent('+')
         .appendTo(this);
   }

   showAddProjectForm(category) {
      const addProjectInput = createElement('input').setAttributes({
         type: 'text',
         name: 'title-input',
      });

      const saveBtn = createElement('button')
         .setContent('save')
         .setAttributes({ type: 'submit' });

      const addProjectForm = createElement('form')
         .setAttributes({
            id: 'addProject',
         })
         .appendChildren([addProjectInput, saveBtn]);
      category.appendChild(addProjectForm);

      console.log(addProjectForm);

      addProjectForm.addEventListener('submit', (ev) => {
         ev.preventDefault();
         const projectTitle = addProjectInput.elements['title-input'].value;
         console.log(projectTitle);
         pubsub.publish('project:add', {
            title: projectTitle,
            category: category.title,
         });
      });
   }

   addEventListeners() {
      this.childNodes.forEach((categoryLi) => {
         categoryLi.addEventListener('click', (event) => {
            if (event.target.classList.contains('addProjectBtn')) {
               if (categoryLi.querySelector('#addProject')) return;
               this.showAddProjectForm(categoryLi);
            } else {
               event.preventDefault();
               if (categoryLi.querySelector('project-list')) return;
               pubsub.publish('category:load', categoryLi);
            }
         });
      });
   }
}

customElements.define('category-list', CategoryList);

export default CategoryList;
