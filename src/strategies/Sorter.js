const sortingStrategies = [
   {
      type: 'date',
      sort: function sort(tasks) {
         return tasks.Filter((a, b) => a.date - b.date);
      },
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
