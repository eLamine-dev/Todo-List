class AppStateModel {
   constructor(tasks, projects, categories) {
      this.appState = {
         currentFilter: '',
         selectedProject: '',
         selectedTask: '',
         categorizedProjects: [],
      };
      this.categorizeProjects(projects, categories);
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
