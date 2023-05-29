import BaseComponent from '../components/BaseComponent';
import SideBar from '../components/SideBar';
import createElement from '../../utils/ElementBuilder';

class AppPage extends HTMLElement {
   connectedCallback() {
      this.sideBar = createElement('side-bar');
   }
}

export default AppPage;
