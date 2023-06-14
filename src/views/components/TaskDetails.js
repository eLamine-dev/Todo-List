import createElement from '../../utils/ElementBuilder';

class TaskDetails extends HTMLElement {
   connectedCallback() {
      this.render();
      this.addEventListeners();
   }

   render() {
      const title = createElement('h2')
         .setAttributes({
            type: 'text',
            name: 'title-input',
            contenteditable: true,
         })
         .setContent(this.state.title);

      const description = createElement('textarea').setAttributes({
         name: 'description',
         Placeholder: 'add task description...',
      });
      const date = createElement('input').setAttributes({
         type: 'date',
         name: 'date-input',
         value: `${this.state.date}`,
         // min: '',
      });
      this.id = 'task-details';

      [title, date, description].forEach((child) => {
         this.appendChild(child);
      });
   }

   addEventListeners() {
      this.addEventListener('submit', (ev) => {
         ev.preventDefault();
         this.passData();
      });
   }

   passData() {
      const formData = {
         title: this.elements['title-input'].value,
         date: this.elements['date-input'].value,
      };
   }
}

customElements.define('task-details', TaskDetails);
export default TaskDetails;
