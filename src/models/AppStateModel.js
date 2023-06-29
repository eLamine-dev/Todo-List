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

   setGlobalState(tasks, projects, categories) {
      this.state.data = { tasks, projects, categories };
   }

   getGlobalState() {
      return this.state;
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
      return this.state;
   }
}

export default AppStateModel;
