const sortingStrategies = [
   {
      type: 'priority',
      sort: (tasks) =>
         tasks.sort((a, b) => Number(a.priority) - Number(b.priority)),
   },

   {
      type: 'date',
      sort: (tasks) => tasks.sort((a, b) => b.date - a.date),
   },
];

class Sorter {
   constructor() {
      this.strategies = new Map();
      this.addStrategies(sortingStrategies);
   }

   addStrategies(strategies) {
      strategies.forEach((strategy) => {
         this.strategies.set(strategy.type, strategy.sort);
      });
   }

   sortBy(type, tasks) {
      const sort = this.strategies.get(type);

      if (sort) {
         return sort(tasks);
      }

      return tasks;
   }
}

export default Sorter;
