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
/* harmony export */   "TaskBuilder": () => (/* binding */ TaskBuilder)
/* harmony export */ });
function TaskBuilder(task, data = {}) {
   const newTask = Object.assign(task, data);

   return newTask;
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
   addTask: (formData) => {
      const newTask = (0,_task__WEBPACK_IMPORTED_MODULE_1__.TaskBuilder)({}, formData);
      state.push(newTask);
      _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].publish('stateUpdate', state);
   },

   editTask: (id, formData) => {
      const taskToEdit = state.find((task) => task.id === id);
      const editedTask = (0,_task__WEBPACK_IMPORTED_MODULE_1__.TaskBuilder)(taskToEdit, formData);

      _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].publish('stateUpdate', state);
   },
};

_pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe('taskSubmitted', todoList.addTask);




/***/ }),

/***/ "./src/views/taskForm.js":
/*!*******************************!*\
  !*** ./src/views/taskForm.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pubSub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../pubSub */ "./src/pubSub.js");


const newTasForm = document.getElementById('new-task-form');
newTasForm.addEventListener('submit', (ev) => {
   ev.preventDefault();
   passData(newTasForm);
});

const editTaskForm = document.getElementById('editing-form');
editTaskForm.addEventListener('submit', (ev) => {
   ev.preventDefault();
   passData(editTaskForm);
});

const passData = (form) => {
   const formData = {
      id: Date.now(),
      title: form.elements.title.value,
      date: form.elements.date.value,
   };
   _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].publish('taskSubmitted', formData);
};


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7O0FBRUE7QUFDQSxJQUFJO0FBQ0o7O0FBRUEsaUVBQWUsTUFBTSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUM1Q3RCLG9DQUFvQztBQUNwQzs7QUFFQTtBQUNBOztBQUV1Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOTztBQUNPOztBQUVyQzs7QUFFQTtBQUNBO0FBQ0Esc0JBQXNCLGtEQUFXLEdBQUc7QUFDcEM7QUFDQSxNQUFNLHVEQUFjO0FBQ3BCLElBQUk7O0FBRUo7QUFDQTtBQUNBLHlCQUF5QixrREFBVzs7QUFFcEMsTUFBTSx1REFBYztBQUNwQixJQUFJO0FBQ0o7O0FBRUEseURBQWdCOztBQUVJOzs7Ozs7Ozs7Ozs7O0FDdEJXOztBQUUvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUcsdURBQWM7QUFDakI7Ozs7Ozs7VUNyQkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ044Qjs7QUFFQTs7QUFFVTs7QUFFRjs7QUFFdEMseURBQWdCOztBQUVoQjtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvcHViU3ViLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy90YXNrLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy90b2RvTGlzdC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvdmlld3MvdGFza0Zvcm0uanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHB1YnN1YiA9IHtcbiAgIGV2ZW50czoge30sXG4gICBzdWJzY3JpcHRpb25zSWQ6IC0xLFxuXG4gICBwdWJsaXNoKGV2ZW50LCBkYXRhKSB7XG4gICAgICBpZiAoIXRoaXMuZXZlbnRzW2V2ZW50XSkge1xuICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmV2ZW50c1tldmVudF0uZm9yRWFjaCgoc3Vic2NyaXB0aW9uKSA9PiB7XG4gICAgICAgICBzdWJzY3JpcHRpb24uZnVuYyhkYXRhKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICB9LFxuXG4gICBzdWJzY3JpYmUoZXZlbnQsIGZ1bmMpIHtcbiAgICAgIGlmICghdGhpcy5ldmVudHNbZXZlbnRdKSB7XG4gICAgICAgICB0aGlzLmV2ZW50c1tldmVudF0gPSBbXTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zSWQgKz0gMTtcbiAgICAgIGNvbnN0IHRva2VuID0gdGhpcy5zdWJzY3JpcHRpb25zSWQudG9TdHJpbmcoKTtcbiAgICAgIHRoaXMuZXZlbnRzW2V2ZW50XS5wdXNoKHtcbiAgICAgICAgIHRva2VuLFxuICAgICAgICAgZnVuYyxcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRva2VuO1xuICAgfSxcblxuICAgdW5zdWJzY3JpYmUodG9rZW4pIHtcbiAgICAgIGNvbnN0IGZvdW5kID0gT2JqZWN0LmtleXModGhpcy5ldmVudHMpLnNvbWUoKGV2ZW50KSA9PlxuICAgICAgICAgdGhpcy5ldmVudHNbZXZlbnRdLnNvbWUoKHN1YnNjcmlwdGlvbiwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGFyZUVxdWFsID0gc3Vic2NyaXB0aW9uLnRva2VuID09PSB0b2tlbi50b1N0cmluZygpO1xuICAgICAgICAgICAgaWYgKGFyZUVxdWFsKSB7XG4gICAgICAgICAgICAgICB0aGlzLmV2ZW50c1tldmVudF0uc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBhcmVFcXVhbDtcbiAgICAgICAgIH0pXG4gICAgICApO1xuXG4gICAgICByZXR1cm4gZm91bmQgPyB0b2tlbiA6IG51bGw7XG4gICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgcHVic3ViO1xuIiwiZnVuY3Rpb24gVGFza0J1aWxkZXIodGFzaywgZGF0YSA9IHt9KSB7XG4gICBjb25zdCBuZXdUYXNrID0gT2JqZWN0LmFzc2lnbih0YXNrLCBkYXRhKTtcblxuICAgcmV0dXJuIG5ld1Rhc2s7XG59XG5cbmV4cG9ydCB7IFRhc2tCdWlsZGVyIH07XG4iLCJpbXBvcnQgcHVic3ViIGZyb20gJy4vcHViU3ViJztcbmltcG9ydCB7IFRhc2tCdWlsZGVyIH0gZnJvbSAnLi90YXNrJztcblxuY29uc3Qgc3RhdGUgPSBbXTtcblxuY29uc3QgdG9kb0xpc3QgPSB7XG4gICBhZGRUYXNrOiAoZm9ybURhdGEpID0+IHtcbiAgICAgIGNvbnN0IG5ld1Rhc2sgPSBUYXNrQnVpbGRlcih7fSwgZm9ybURhdGEpO1xuICAgICAgc3RhdGUucHVzaChuZXdUYXNrKTtcbiAgICAgIHB1YnN1Yi5wdWJsaXNoKCdzdGF0ZVVwZGF0ZScsIHN0YXRlKTtcbiAgIH0sXG5cbiAgIGVkaXRUYXNrOiAoaWQsIGZvcm1EYXRhKSA9PiB7XG4gICAgICBjb25zdCB0YXNrVG9FZGl0ID0gc3RhdGUuZmluZCgodGFzaykgPT4gdGFzay5pZCA9PT0gaWQpO1xuICAgICAgY29uc3QgZWRpdGVkVGFzayA9IFRhc2tCdWlsZGVyKHRhc2tUb0VkaXQsIGZvcm1EYXRhKTtcblxuICAgICAgcHVic3ViLnB1Ymxpc2goJ3N0YXRlVXBkYXRlJywgc3RhdGUpO1xuICAgfSxcbn07XG5cbnB1YnN1Yi5zdWJzY3JpYmUoJ3Rhc2tTdWJtaXR0ZWQnLCB0b2RvTGlzdC5hZGRUYXNrKTtcblxuZXhwb3J0IHsgdG9kb0xpc3QgfTtcbiIsImltcG9ydCBwdWJzdWIgZnJvbSAnLi4vcHViU3ViJztcblxuY29uc3QgbmV3VGFzRm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZXctdGFzay1mb3JtJyk7XG5uZXdUYXNGb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChldikgPT4ge1xuICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgIHBhc3NEYXRhKG5ld1Rhc0Zvcm0pO1xufSk7XG5cbmNvbnN0IGVkaXRUYXNrRm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlZGl0aW5nLWZvcm0nKTtcbmVkaXRUYXNrRm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZXYpID0+IHtcbiAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICBwYXNzRGF0YShlZGl0VGFza0Zvcm0pO1xufSk7XG5cbmNvbnN0IHBhc3NEYXRhID0gKGZvcm0pID0+IHtcbiAgIGNvbnN0IGZvcm1EYXRhID0ge1xuICAgICAgaWQ6IERhdGUubm93KCksXG4gICAgICB0aXRsZTogZm9ybS5lbGVtZW50cy50aXRsZS52YWx1ZSxcbiAgICAgIGRhdGU6IGZvcm0uZWxlbWVudHMuZGF0ZS52YWx1ZSxcbiAgIH07XG4gICBwdWJzdWIucHVibGlzaCgndGFza1N1Ym1pdHRlZCcsIGZvcm1EYXRhKTtcbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IFRhc2sgfSBmcm9tICcuL3Rhc2snO1xuXG5pbXBvcnQgcHVic3ViIGZyb20gJy4vcHViU3ViJztcblxuaW1wb3J0IHRhc2tGb3JtIGZyb20gJy4vdmlld3MvdGFza0Zvcm0nO1xuXG5pbXBvcnQgeyB0b2RvTGlzdCB9IGZyb20gJy4vdG9kb0xpc3QnO1xuXG5wdWJzdWIuc3Vic2NyaWJlKCdzdGF0ZVVwZGF0ZScsIG5ld1N0YXRlKTtcblxuZnVuY3Rpb24gbmV3U3RhdGUoc3RhdGUpIHtcbiAgIGNvbnNvbGUubG9nKHN0YXRlKTtcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==