import { isEqual, isWithinInterval } from 'date-fns';

const filteringStrategies = [
   {
      type: 'all',
      filter: function filter(tasks) {
         return tasks;
      },
   },

   {
      type: 'date',
      filter: function filter(tasks, date) {
         return tasks.filter((task) =>
            isEqual(new Date(task.date), new Date(date))
         );
      },
   },

   {
      type: 'date-range',
      filter: function filter(tasks, dateRange) {
         return tasks.filter((task) =>
            isWithinInterval(new Date(task.date), dateRange)
         );
      },
   },

   {
      type: 'project',
      filter: function filter(tasks, projectId) {
         return tasks.filter((task) => task.projectId === projectId);
      },
   },

   {
      type: 'category',
      filter: function filter(tasks, categoryId) {
         return tasks.filter((task) => task.categoryId === categoryId);
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
