class AppStateModel {
   constructor() {
      this.state = {
         currentFilter: '',
         selectedProject: '',
         selectedTask: '',
      };
   }

   getState() {
      return this.state;
   }
}

export default AppStateModel;
