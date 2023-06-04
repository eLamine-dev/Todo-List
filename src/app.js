import './assets/css/reset.css';
import './assets/css/style.css';
import FrontController from './controllers/FrontController';

document.addEventListener('DOMContentLoaded', () => {
   const frontController = new FrontController();
   document.getElementById('app-container').appendChild(frontController.view);
});
