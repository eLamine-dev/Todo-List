import pubsub from '../pubSub';

const taskForm = {
   listen: () => {
      const form = document.getElementById('form');
      form.addEventListener('submit', (ev) => {
         ev.preventDefault();
         taskForm.newTask(form);
      });
   },

   newTask: (form) => {
      const formData = {
         name: form.elements.title.value,
         date: form.elements.date.value,
      };
      pubsub.publish('taskSubmitted', formData);
   },
};

export default taskForm;
