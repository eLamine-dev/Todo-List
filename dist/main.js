/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/pubSub.js":
/*!***********************!*\
  !*** ./src/pubSub.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const pubsub = {
   events: {},
   subscriptionsId: -1,

   publish(event, data) {
      if (!this.events[event]) {
         return false;
      }

      this.events[event].forEach((subscription) => {
         subscription.func(data);
      });
      return true;
   },

   subscribe(event, func) {
      if (!this.events[event]) {
         this.events[event] = [];
      }

      this.subscriptionsId += 1;
      const token = this.subscriptionsId.toString();
      this.events[event].push({
         token,
         func,
      });
      return token;
   },

   unsubscribe(token) {
      const found = Object.keys(this.events).some((event) =>
         this.events[event].some((subscription, index) => {
            const areEqual = subscription.token === token.toString();
            if (areEqual) {
               this.events[event].splice(index, 1);
            }
            return areEqual;
         })
      );

      return found ? token : null;
   },
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (pubsub);


/***/ }),

/***/ "./src/task.js":
/*!*********************!*\
  !*** ./src/task.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Task": () => (/* binding */ Task)
/* harmony export */ });
function Task(data) {
   return { ...data };
}




/***/ }),

/***/ "./src/todoList.js":
/*!*************************!*\
  !*** ./src/todoList.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "todoList": () => (/* binding */ todoList)
/* harmony export */ });
/* harmony import */ var _pubSub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pubSub */ "./src/pubSub.js");
/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./task */ "./src/task.js");



const state = [];
const todoList = {
   createTask: () => {
      _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe('taskSubmitted', todoList.add);
   },

   add: (formData) => {
      const newTask = (0,_task__WEBPACK_IMPORTED_MODULE_1__.Task)(formData);
      state.push(newTask);
      _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].publish('stateUpdate', state);
   },
};

_pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe('taskSubmitted', todoList.add);




/***/ }),

/***/ "./src/views/taskForm.js":
/*!*******************************!*\
  !*** ./src/views/taskForm.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _pubSub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../pubSub */ "./src/pubSub.js");


const form = document.getElementById('form');
form.addEventListener('submit', (ev) => {
   ev.preventDefault();
   taskForm.newTask(form);
});

const taskForm = {
   listen: () => {},

   newTask: (form) => {
      const formData = {
         name: form.elements.title.value,
         date: form.elements.date.value,
      };
      _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].publish('taskSubmitted', formData);
   },
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (taskForm);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./task */ "./src/task.js");
/* harmony import */ var _pubSub__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pubSub */ "./src/pubSub.js");
/* harmony import */ var _views_taskForm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./views/taskForm */ "./src/views/taskForm.js");
/* harmony import */ var _todoList__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./todoList */ "./src/todoList.js");








_pubSub__WEBPACK_IMPORTED_MODULE_1__["default"].subscribe('stateUpdate', newState);

function newState(state) {
   console.log(state);
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7O0FBRUE7QUFDQSxJQUFJO0FBQ0o7O0FBRUEsaUVBQWUsTUFBTSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUM1Q3RCO0FBQ0EsWUFBWTtBQUNaOztBQUVnQjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNKYztBQUNBOztBQUU5QjtBQUNBO0FBQ0E7QUFDQSxNQUFNLHlEQUFnQjtBQUN0QixJQUFJOztBQUVKO0FBQ0Esc0JBQXNCLDJDQUFJO0FBQzFCO0FBQ0EsTUFBTSx1REFBYztBQUNwQixJQUFJO0FBQ0o7O0FBRUEseURBQWdCOztBQUVJOzs7Ozs7Ozs7Ozs7Ozs7O0FDbEJXOztBQUUvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQSxtQkFBbUI7O0FBRW5CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLHVEQUFjO0FBQ3BCLElBQUk7QUFDSjs7QUFFQSxpRUFBZSxRQUFRLEVBQUM7Ozs7Ozs7VUNwQnhCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNOOEI7O0FBRUE7O0FBRVU7O0FBRUY7O0FBRXRDLHlEQUFnQjs7QUFFaEI7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3B1YlN1Yi5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvdGFzay5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvdG9kb0xpc3QuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3ZpZXdzL3Rhc2tGb3JtLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBwdWJzdWIgPSB7XG4gICBldmVudHM6IHt9LFxuICAgc3Vic2NyaXB0aW9uc0lkOiAtMSxcblxuICAgcHVibGlzaChldmVudCwgZGF0YSkge1xuICAgICAgaWYgKCF0aGlzLmV2ZW50c1tldmVudF0pIHtcbiAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5ldmVudHNbZXZlbnRdLmZvckVhY2goKHN1YnNjcmlwdGlvbikgPT4ge1xuICAgICAgICAgc3Vic2NyaXB0aW9uLmZ1bmMoZGF0YSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgfSxcblxuICAgc3Vic2NyaWJlKGV2ZW50LCBmdW5jKSB7XG4gICAgICBpZiAoIXRoaXMuZXZlbnRzW2V2ZW50XSkge1xuICAgICAgICAgdGhpcy5ldmVudHNbZXZlbnRdID0gW107XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9uc0lkICs9IDE7XG4gICAgICBjb25zdCB0b2tlbiA9IHRoaXMuc3Vic2NyaXB0aW9uc0lkLnRvU3RyaW5nKCk7XG4gICAgICB0aGlzLmV2ZW50c1tldmVudF0ucHVzaCh7XG4gICAgICAgICB0b2tlbixcbiAgICAgICAgIGZ1bmMsXG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0b2tlbjtcbiAgIH0sXG5cbiAgIHVuc3Vic2NyaWJlKHRva2VuKSB7XG4gICAgICBjb25zdCBmb3VuZCA9IE9iamVjdC5rZXlzKHRoaXMuZXZlbnRzKS5zb21lKChldmVudCkgPT5cbiAgICAgICAgIHRoaXMuZXZlbnRzW2V2ZW50XS5zb21lKChzdWJzY3JpcHRpb24sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBhcmVFcXVhbCA9IHN1YnNjcmlwdGlvbi50b2tlbiA9PT0gdG9rZW4udG9TdHJpbmcoKTtcbiAgICAgICAgICAgIGlmIChhcmVFcXVhbCkge1xuICAgICAgICAgICAgICAgdGhpcy5ldmVudHNbZXZlbnRdLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYXJlRXF1YWw7XG4gICAgICAgICB9KVxuICAgICAgKTtcblxuICAgICAgcmV0dXJuIGZvdW5kID8gdG9rZW4gOiBudWxsO1xuICAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHB1YnN1YjtcbiIsImZ1bmN0aW9uIFRhc2soZGF0YSkge1xuICAgcmV0dXJuIHsgLi4uZGF0YSB9O1xufVxuXG5leHBvcnQgeyBUYXNrIH07XG4iLCJpbXBvcnQgcHVic3ViIGZyb20gJy4vcHViU3ViJztcbmltcG9ydCB7IFRhc2sgfSBmcm9tICcuL3Rhc2snO1xuXG5jb25zdCBzdGF0ZSA9IFtdO1xuY29uc3QgdG9kb0xpc3QgPSB7XG4gICBjcmVhdGVUYXNrOiAoKSA9PiB7XG4gICAgICBwdWJzdWIuc3Vic2NyaWJlKCd0YXNrU3VibWl0dGVkJywgdG9kb0xpc3QuYWRkKTtcbiAgIH0sXG5cbiAgIGFkZDogKGZvcm1EYXRhKSA9PiB7XG4gICAgICBjb25zdCBuZXdUYXNrID0gVGFzayhmb3JtRGF0YSk7XG4gICAgICBzdGF0ZS5wdXNoKG5ld1Rhc2spO1xuICAgICAgcHVic3ViLnB1Ymxpc2goJ3N0YXRlVXBkYXRlJywgc3RhdGUpO1xuICAgfSxcbn07XG5cbnB1YnN1Yi5zdWJzY3JpYmUoJ3Rhc2tTdWJtaXR0ZWQnLCB0b2RvTGlzdC5hZGQpO1xuXG5leHBvcnQgeyB0b2RvTGlzdCB9O1xuIiwiaW1wb3J0IHB1YnN1YiBmcm9tICcuLi9wdWJTdWInO1xuXG5jb25zdCBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Zvcm0nKTtcbmZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGV2KSA9PiB7XG4gICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgdGFza0Zvcm0ubmV3VGFzayhmb3JtKTtcbn0pO1xuXG5jb25zdCB0YXNrRm9ybSA9IHtcbiAgIGxpc3RlbjogKCkgPT4ge30sXG5cbiAgIG5ld1Rhc2s6IChmb3JtKSA9PiB7XG4gICAgICBjb25zdCBmb3JtRGF0YSA9IHtcbiAgICAgICAgIG5hbWU6IGZvcm0uZWxlbWVudHMudGl0bGUudmFsdWUsXG4gICAgICAgICBkYXRlOiBmb3JtLmVsZW1lbnRzLmRhdGUudmFsdWUsXG4gICAgICB9O1xuICAgICAgcHVic3ViLnB1Ymxpc2goJ3Rhc2tTdWJtaXR0ZWQnLCBmb3JtRGF0YSk7XG4gICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgdGFza0Zvcm07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IFRhc2sgfSBmcm9tICcuL3Rhc2snO1xuXG5pbXBvcnQgcHVic3ViIGZyb20gJy4vcHViU3ViJztcblxuaW1wb3J0IHRhc2tGb3JtIGZyb20gJy4vdmlld3MvdGFza0Zvcm0nO1xuXG5pbXBvcnQgeyB0b2RvTGlzdCB9IGZyb20gJy4vdG9kb0xpc3QnO1xuXG5wdWJzdWIuc3Vic2NyaWJlKCdzdGF0ZVVwZGF0ZScsIG5ld1N0YXRlKTtcblxuZnVuY3Rpb24gbmV3U3RhdGUoc3RhdGUpIHtcbiAgIGNvbnNvbGUubG9nKHN0YXRlKTtcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==