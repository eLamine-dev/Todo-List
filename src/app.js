import './assets/css/reset.css';
import './assets/css/style.css';

import createElement from './utils/ElementBuilder';
import pubsub from './utils/PubSub';
import AppPage from './views/pages/AppPage';

document.addEventListener('DOMContentLoaded', () => {
   const appPage = new AppPage();
   document.getElementById('app-container').appendChild(appPage);
});
