class AppStateModel {
   constructor() {
      this.state = {
         tasks: [],
         projects: [],
         categories: [],
         currentFilter: {},
      };
   }

   updateState(data) {
      Object.assign(this.state, data);
   }

   setUpInitialState(tasks, projects, categories) {
      this.state.tasks = tasks;
      this.state.projects = projects;
      this.state.categories = categories;
      this.currentFilter = 'today';
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
