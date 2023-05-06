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



const todoList = {
   state: [],

   createTask: () => {
      _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe('taskSubmitted', todoList.add);
   },

   add: (formData) => {
      const newTask = (0,_task__WEBPACK_IMPORTED_MODULE_1__.Task)(formData);
      todoList.state.push(newTask);
      _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].publish('stateUpdate', todoList.state);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7O0FBRUE7QUFDQSxJQUFJO0FBQ0o7O0FBRUEsaUVBQWUsTUFBTSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUM1Q3RCO0FBQ0EsWUFBWTtBQUNaOztBQUVnQjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNKYztBQUNBOztBQUU5QjtBQUNBOztBQUVBO0FBQ0EsTUFBTSx5REFBZ0I7QUFDdEIsSUFBSTs7QUFFSjtBQUNBLHNCQUFzQiwyQ0FBSTtBQUMxQjtBQUNBLE1BQU0sdURBQWM7QUFDcEIsSUFBSTtBQUNKOztBQUVBLHlEQUFnQjs7QUFFSTs7Ozs7Ozs7Ozs7Ozs7OztBQ25CVzs7QUFFL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0EsbUJBQW1COztBQUVuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSx1REFBYztBQUNwQixJQUFJO0FBQ0o7O0FBRUEsaUVBQWUsUUFBUSxFQUFDOzs7Ozs7O1VDcEJ4QjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTjhCOztBQUVBOztBQUVVOztBQUVGOztBQUV0Qyx5REFBZ0I7O0FBRWhCO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9wdWJTdWIuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3Rhc2suanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3RvZG9MaXN0LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy92aWV3cy90YXNrRm9ybS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgcHVic3ViID0ge1xuICAgZXZlbnRzOiB7fSxcbiAgIHN1YnNjcmlwdGlvbnNJZDogLTEsXG5cbiAgIHB1Ymxpc2goZXZlbnQsIGRhdGEpIHtcbiAgICAgIGlmICghdGhpcy5ldmVudHNbZXZlbnRdKSB7XG4gICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZXZlbnRzW2V2ZW50XS5mb3JFYWNoKChzdWJzY3JpcHRpb24pID0+IHtcbiAgICAgICAgIHN1YnNjcmlwdGlvbi5mdW5jKGRhdGEpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgIH0sXG5cbiAgIHN1YnNjcmliZShldmVudCwgZnVuYykge1xuICAgICAgaWYgKCF0aGlzLmV2ZW50c1tldmVudF0pIHtcbiAgICAgICAgIHRoaXMuZXZlbnRzW2V2ZW50XSA9IFtdO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbnNJZCArPSAxO1xuICAgICAgY29uc3QgdG9rZW4gPSB0aGlzLnN1YnNjcmlwdGlvbnNJZC50b1N0cmluZygpO1xuICAgICAgdGhpcy5ldmVudHNbZXZlbnRdLnB1c2goe1xuICAgICAgICAgdG9rZW4sXG4gICAgICAgICBmdW5jLFxuICAgICAgfSk7XG4gICAgICByZXR1cm4gdG9rZW47XG4gICB9LFxuXG4gICB1bnN1YnNjcmliZSh0b2tlbikge1xuICAgICAgY29uc3QgZm91bmQgPSBPYmplY3Qua2V5cyh0aGlzLmV2ZW50cykuc29tZSgoZXZlbnQpID0+XG4gICAgICAgICB0aGlzLmV2ZW50c1tldmVudF0uc29tZSgoc3Vic2NyaXB0aW9uLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgYXJlRXF1YWwgPSBzdWJzY3JpcHRpb24udG9rZW4gPT09IHRva2VuLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICBpZiAoYXJlRXF1YWwpIHtcbiAgICAgICAgICAgICAgIHRoaXMuZXZlbnRzW2V2ZW50XS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGFyZUVxdWFsO1xuICAgICAgICAgfSlcbiAgICAgICk7XG5cbiAgICAgIHJldHVybiBmb3VuZCA/IHRva2VuIDogbnVsbDtcbiAgIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBwdWJzdWI7XG4iLCJmdW5jdGlvbiBUYXNrKGRhdGEpIHtcbiAgIHJldHVybiB7IC4uLmRhdGEgfTtcbn1cblxuZXhwb3J0IHsgVGFzayB9O1xuIiwiaW1wb3J0IHB1YnN1YiBmcm9tICcuL3B1YlN1Yic7XG5pbXBvcnQgeyBUYXNrIH0gZnJvbSAnLi90YXNrJztcblxuY29uc3QgdG9kb0xpc3QgPSB7XG4gICBzdGF0ZTogW10sXG5cbiAgIGNyZWF0ZVRhc2s6ICgpID0+IHtcbiAgICAgIHB1YnN1Yi5zdWJzY3JpYmUoJ3Rhc2tTdWJtaXR0ZWQnLCB0b2RvTGlzdC5hZGQpO1xuICAgfSxcblxuICAgYWRkOiAoZm9ybURhdGEpID0+IHtcbiAgICAgIGNvbnN0IG5ld1Rhc2sgPSBUYXNrKGZvcm1EYXRhKTtcbiAgICAgIHRvZG9MaXN0LnN0YXRlLnB1c2gobmV3VGFzayk7XG4gICAgICBwdWJzdWIucHVibGlzaCgnc3RhdGVVcGRhdGUnLCB0b2RvTGlzdC5zdGF0ZSk7XG4gICB9LFxufTtcblxucHVic3ViLnN1YnNjcmliZSgndGFza1N1Ym1pdHRlZCcsIHRvZG9MaXN0LmFkZCk7XG5cbmV4cG9ydCB7IHRvZG9MaXN0IH07XG4iLCJpbXBvcnQgcHVic3ViIGZyb20gJy4uL3B1YlN1Yic7XG5cbmNvbnN0IGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9ybScpO1xuZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZXYpID0+IHtcbiAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICB0YXNrRm9ybS5uZXdUYXNrKGZvcm0pO1xufSk7XG5cbmNvbnN0IHRhc2tGb3JtID0ge1xuICAgbGlzdGVuOiAoKSA9PiB7fSxcblxuICAgbmV3VGFzazogKGZvcm0pID0+IHtcbiAgICAgIGNvbnN0IGZvcm1EYXRhID0ge1xuICAgICAgICAgbmFtZTogZm9ybS5lbGVtZW50cy50aXRsZS52YWx1ZSxcbiAgICAgICAgIGRhdGU6IGZvcm0uZWxlbWVudHMuZGF0ZS52YWx1ZSxcbiAgICAgIH07XG4gICAgICBwdWJzdWIucHVibGlzaCgndGFza1N1Ym1pdHRlZCcsIGZvcm1EYXRhKTtcbiAgIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCB0YXNrRm9ybTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgVGFzayB9IGZyb20gJy4vdGFzayc7XG5cbmltcG9ydCBwdWJzdWIgZnJvbSAnLi9wdWJTdWInO1xuXG5pbXBvcnQgdGFza0Zvcm0gZnJvbSAnLi92aWV3cy90YXNrRm9ybSc7XG5cbmltcG9ydCB7IHRvZG9MaXN0IH0gZnJvbSAnLi90b2RvTGlzdCc7XG5cbnB1YnN1Yi5zdWJzY3JpYmUoJ3N0YXRlVXBkYXRlJywgbmV3U3RhdGUpO1xuXG5mdW5jdGlvbiBuZXdTdGF0ZShzdGF0ZSkge1xuICAgY29uc29sZS5sb2coc3RhdGUpO1xufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9