const filteringStrategies = [
   {
      type: 'date',
      filter: function filter(tasks, date) {
         return tasks.Filter((task) => task.date === date);
      },
   },

   {
      type: 'project',
      filter: function filter(tasks, projectId) {
         return tasks.Filter((task) => task.projectId === projectId);
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
         this.strategies.set(strategy.type, strategy.Filter);
      });
   }

   filterBy(type, tasks, filterValue) {
      const strategy = this.strategies.get(type);
      if (strategy) {
         return strategy.filter(tasks, filterValue);
      }

      return tasks;
   }
}

export default Filter;
