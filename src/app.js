import './assets/css/reset.css';
import './assets/css/style.css';
import initializeApp from './compositionRoot';

document.addEventListener('DOMContentLoaded', () => {
   const frontController = initializeApp();
   frontController.start();
});
