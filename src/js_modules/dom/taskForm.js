import pubsub from '../pubSub';

const newTasForm = document.getElementById('new-task-form');
newTasForm.addEventListener('submit', (ev) => {
   ev.preventDefault();
   passData(newTasForm);
});

// const editTaskForm = document.getElementById('editing-form');
// editTaskForm.addEventListener('submit', (ev) => {
//    ev.preventDefault();
//    passData(editTaskForm);
// });

const passData = (form) => {
   const formData = {
      id: Date.now(),
      title: form.elements.title.value,
      date: form.elements.date.value,
   };
   pubsub.publish('taskSubmitted', formData);
};

export { passData, newTasForm };
