import pubsub from '../../utils/PubSub';

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
      title: form.elements.title.value,
      date: form.elements.date.value,
   };
   pubsub.publish('task:add', formData);
};

export { passData, newTasForm };
