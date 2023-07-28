import autoAnimate from '@formkit/auto-animate';
import { format } from 'date-fns';
import TaskCard from './TaskCard';
import createElement from '../../utils/ElementBuilder';
import AddTaskForm from './AddTaskForm';
import pubsub from '../../utils/PubSub';

class TaskList extends HTMLElement {
   connectedCallback() {
      this.render();
      this.addEventListeners();
   }

   render() {
      const addTaskForm = new AddTaskForm({
         projects: this.state.projects,
         categories: this.state.categories,
         currentFilter: this.state.currentFilter,
      });
      this.prepend(addTaskForm);

      const controlSection = createElement('div')
         .setAttributes({ class: 'control-section' })
         .setContent('Sort by:')
         .appendTo(this);
      this.setupControls(controlSection);

      const tasksContainer = createElement('div')
         .setAttributes({ class: 'tasks-container' })
         .appendTo(this);

      this.state.tasks.forEach((task) => {
         const taskCard = this.makeTaskCard(task);
         if (!taskCard) {
            return;
         }
         tasksContainer.appendChild(taskCard);
      });

      autoAnimate(tasksContainer);

      const header = createElement('header')
         .setContent(`#Tasks-list`)
         .capitalFirstLetter()
         .setAttributes({ class: 'header' })
         .prependTo(this);

      if (document.querySelector('[current-filter]')) {
         header.setContent(
            `#${document.querySelector('[current-filter]').textContent}`
         );
      }

      const sideBarToggle = createElement('button')
         .setAttributes({ class: 'toggle-side-bar' })
         .appendIcon('fa-solid fa-bars')
         .prependTo(header);

      const fixedBtnContainer = createElement('div')
         .setAttributes({ class: 'fixed-btn-container' })
         .appendTo(this);

      const fixedAddTaskBtn = createElement('button')
         .setAttributes({ class: 'fixed-add-task-btn' })
         .appendIcon('fa-solid fa-plus')
         .appendTo(fixedBtnContainer);
   }

   addEventListeners() {
      this.addEventListener('click', (ev) => {
         if (ev.target.matches('.toggle-side-bar')) {
            pubsub.publish('side-bar:toggle');
         }
         if (ev.target.matches('.fixed-add-task-btn')) {
            this.querySelector('.open-form').click();
            this.scrollTo(0, 0);
         }
      });

      this.addEventListener('scroll', () => {
         const fixedBtn = this.querySelector('.fixed-add-task-btn');
         if (this.scrollTop > 30) {
            fixedBtn.style.display = 'block';
         } else {
            fixedBtn.style.display = 'none';
         }
      });
   }

   updateCard(task) {
      const updatedCard = this.makeTaskCard(task);
      const existingCard = this.querySelector(`task-card[task-id=${task.id}]`);

      this.replaceChild(updatedCard, existingCard);
   }

   makeTaskCard(task) {
      const taskProject = this.state.projects.find(
         (project) => project.id === task.projectId
      );
      if (taskProject) {
         const projectCategory = this.state.categories.find(
            (category) => category.id === taskProject.categoryId
         );

         Object.assign(task, {
            taskProject: taskProject.title,
            projectCategory: projectCategory.title,
         });
      } else {
         Object.assign(task, {
            taskProject: '',
            projectCategory: '',
         });
      }
      const newCard = createElement('task-card').setState(task);

      return newCard;
   }

   deleteCard(taskId) {
      const card = this.querySelector(`task-card[task-id=${taskId}]`);
      if (card) this.removeChild(card);
   }

   setupControls(controlSection) {
      const sortingOptions = ['priority', 'due date'];
      sortingOptions.forEach((option) => {
         const container = createElement('div').setAttributes({
            class: 'sorting-option',
         });

         const choiceInput = createElement('input')
            .setAttributes({
               type: 'radio',
               id: option,
               name: 'sorting-option',
               value: option,
            })
            .appendTo(container);

         choiceInput.addEventListener('change', (event) => {
            if (event.target.checked) {
               pubsub.publish('sorting:changed', event.target.value);
            }
         });

         if (choiceInput.value === this.state.currentSort) {
            choiceInput.checked = true;
         }

         createElement('label')
            .setAttributes({ for: option })
            .setContent(option)
            .capitalFirstLetter()
            .appendTo(container);

         controlSection.appendChild(container);
      });
      if (
         this.state.currentFilter.type === 'date' ||
         this.state.currentFilter.type === 'date-range'
      ) {
         const nextPreviousBtns = createElement('div')
            .setAttributes({ class: 'next-previous-btns' })
            .appendTo(controlSection);

         createElement('span')
            .setContent('Previous/Next')
            .setAttributes({ class: 'next-previous-btns-label' })
            .appendTo(nextPreviousBtns);

         createElement('button')
            .setAttributes({ class: 'previous-btn' })
            .appendIcon('fa-solid fa-angle-left')
            .appendTo(nextPreviousBtns);

         const label = createElement('div')
            .setAttributes({ class: 'dates' })
            .appendTo(nextPreviousBtns);
         if (this.state.currentFilter.type === 'date-range') {
            createElement('div')
               .setContent(
                  format(this.state.currentFilter.value.start, 'E, MMM dd yyyy')
               )
               .appendTo(label);
            createElement('div')
               .setContent(
                  format(this.state.currentFilter.value.end, 'E, MMM dd yyyy')
               )
               .appendTo(label);
         }
         if (this.state.currentFilter.type === 'date') {
            createElement('div')
               .setContent(
                  format(this.state.currentFilter.value, 'E, MMM dd yyyy')
               )
               .appendTo(label);
         }

         createElement('button')
            .setAttributes({ class: 'next-btn' })
            .appendIcon('fa-solid fa-angle-right')
            .appendTo(nextPreviousBtns);

         nextPreviousBtns.addEventListener('click', (event) => {
            if (event.target.classList.contains('next-btn')) {
               if (this.state.currentFilter.type === 'date-range') {
                  this.state.currentFilter.value.start.setDate(
                     this.state.currentFilter.value.start.getDate() + 7
                  );
                  this.state.currentFilter.value.end.setDate(
                     this.state.currentFilter.value.end.getDate() + 7
                  );
               }
               if (this.state.currentFilter.type === 'date') {
                  this.state.currentFilter.value.setDate(
                     this.state.currentFilter.value.getDate() + 1
                  );
               }
            }

            if (event.target.classList.contains('previous-btn')) {
               if (this.state.currentFilter.type === 'date-range') {
                  this.state.currentFilter.value.start.setDate(
                     this.state.currentFilter.value.start.getDate() - 7
                  );
                  this.state.currentFilter.value.end.setDate(
                     this.state.currentFilter.value.end.getDate() - 7
                  );
               }
               if (this.state.currentFilter.type === 'date') {
                  this.state.currentFilter.value.setDate(
                     this.state.currentFilter.value.getDate() - 1
                  );
               }
            }

            pubsub.publish('filter:changed', this.state.currentFilter);
         });
      }
   }
}
customElements.define('task-list', TaskList);

export default TaskList;
