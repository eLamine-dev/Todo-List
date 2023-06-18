import pubsub from '../../utils/PubSub';
import createElement from '../../utils/ElementBuilder';

class ProjectCard extends HTMLElement {
   connectedCallback() {
      this.render();
      this.addEventListeners();
   }

   render() {
      this.id = `${this.state.id}`;
      this.innerText = `${this.state.title}`;
   }

   addEventListeners() {
      this.addEventListener('click', (ev) => {
         if (ev.target.classList.contains('save-project')) this.passData();
      });
   }

   passData() {
      const formData = {
         title: this.elements['title-input'].value,
      };
      console.log(formData);
      pubsub.publish('project:add', formData);
   }
}
customElements.define('project-card', ProjectCard);
export default ProjectCard;
