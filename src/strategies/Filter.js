const filteringStrategies = [
   {
      type: 'date',
      filter: function filter(tasks, date) {
         return tasks.filter((task) => task.date === date);
      },
   },

   {
      type: 'project',
      filter: function filter(tasks, projectId) {
         return tasks.filter((task) => task.projectId === projectId);
      },
   },
];

class Filter {
   constructor() {
      this.strategies = new Map();
      this.addStrategies(filteringStrategies);
   }

   addStrategies(strategies) {
      strategies.forEach((strategy) => {
         this.strategies.set(strategy.type, strategy.filter);
      });
   }

   filterBy(type, tasks, filterValue) {
      const filter = this.strategies.get(type);
      if (filter) {
         return filter(tasks, filterValue);
      }

      return tasks;
   }
}

export default Filter;
