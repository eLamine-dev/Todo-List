class AppStateModel {
   constructor() {
      this.state = {
         data: {},
         defaultFilter: 'today',
         currentFilter: this.defaultFilter,
         selectedProject: '',
         selectedTask: '',
      };
   }

   setGlobalState(categories, projects, tasks) {
      this.state.data = { categories, projects, tasks };
   }

   categorizeProjects(projects, categories) {
      categories.forEach((category) => {
         const categoryProjects = projects.filter(
            (project) => project.categoryId === category.id
         );
         this.categorizeProjects.push({ category, categoryProjects });
      });
   }

   getState() {
      return this.appState;
   }
}

export default AppStateModel;
