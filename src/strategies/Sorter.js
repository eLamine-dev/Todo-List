const sortingStrategies = [
   {
      type: 'priority',
      filter: (tasks) => tasks.sort((a, b) => b.priority - a.priority),
   },
];

class Sorter {
   constructor() {
      this.strategies = new Map();
      this.addStrategies(sortingStrategies);
   }

   addStrategies(strategies) {
      strategies.forEach((strategy) => {
         this.strategies.set(strategy.type, strategy.Filter);
      });
   }

   SortBy(type, tasks) {
      const strategy = this.strategies.get(type);
      if (strategy) {
         return strategy.sort(tasks);
      }

      return tasks;
   }
}

export default Sorter;
