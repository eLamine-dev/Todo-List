/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/pubSub.js":
/*!***********************!*\
  !*** ./src/pubSub.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

/***/ "./src/taskModal.js":
/*!**************************!*\
  !*** ./src/taskModal.js ***!
  \**************************/
/***/ (() => {

function Task(data) {
   return { ...data };
}


/***/ }),

/***/ "./src/views/taskForm.js":
/*!*******************************!*\
  !*** ./src/views/taskForm.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _pubSub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../pubSub */ "./src/pubSub.js");


const taskForm = {
   listen: () => {
      const form = document.getElementById('form');
      form.addEventListener('submit', (ev) => {
         ev.preventDefault();
         taskForm.newTask(form);
      });
   },

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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _taskModal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./taskModal */ "./src/taskModal.js");
/* harmony import */ var _taskModal__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_taskModal__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _pubSub__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pubSub */ "./src/pubSub.js");
/* harmony import */ var _views_taskForm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./views/taskForm */ "./src/views/taskForm.js");






_views_taskForm__WEBPACK_IMPORTED_MODULE_2__["default"].listen();

_pubSub__WEBPACK_IMPORTED_MODULE_1__["default"].subscribe('taskSubmitted', createNewTask);

function createNewTask(formData) {
   console.log(formData);
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7O0FBRUE7QUFDQSxJQUFJO0FBQ0o7O0FBRUEsaUVBQWUsTUFBTSxFQUFDOzs7Ozs7Ozs7OztBQzVDdEI7QUFDQSxZQUFZO0FBQ1o7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDRitCOztBQUUvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSx1REFBYztBQUNwQixJQUFJO0FBQ0o7O0FBRUEsaUVBQWUsUUFBUSxFQUFDOzs7Ozs7O1VDcEJ4QjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7OztBQ04rQjs7QUFFRDs7QUFFVTs7QUFFeEMsOERBQWU7O0FBRWYseURBQWdCOztBQUVoQjtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvcHViU3ViLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy90YXNrTW9kYWwuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3ZpZXdzL3Rhc2tGb3JtLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgcHVic3ViID0ge1xuICAgZXZlbnRzOiB7fSxcbiAgIHN1YnNjcmlwdGlvbnNJZDogLTEsXG5cbiAgIHB1Ymxpc2goZXZlbnQsIGRhdGEpIHtcbiAgICAgIGlmICghdGhpcy5ldmVudHNbZXZlbnRdKSB7XG4gICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZXZlbnRzW2V2ZW50XS5mb3JFYWNoKChzdWJzY3JpcHRpb24pID0+IHtcbiAgICAgICAgIHN1YnNjcmlwdGlvbi5mdW5jKGRhdGEpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgIH0sXG5cbiAgIHN1YnNjcmliZShldmVudCwgZnVuYykge1xuICAgICAgaWYgKCF0aGlzLmV2ZW50c1tldmVudF0pIHtcbiAgICAgICAgIHRoaXMuZXZlbnRzW2V2ZW50XSA9IFtdO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbnNJZCArPSAxO1xuICAgICAgY29uc3QgdG9rZW4gPSB0aGlzLnN1YnNjcmlwdGlvbnNJZC50b1N0cmluZygpO1xuICAgICAgdGhpcy5ldmVudHNbZXZlbnRdLnB1c2goe1xuICAgICAgICAgdG9rZW4sXG4gICAgICAgICBmdW5jLFxuICAgICAgfSk7XG4gICAgICByZXR1cm4gdG9rZW47XG4gICB9LFxuXG4gICB1bnN1YnNjcmliZSh0b2tlbikge1xuICAgICAgY29uc3QgZm91bmQgPSBPYmplY3Qua2V5cyh0aGlzLmV2ZW50cykuc29tZSgoZXZlbnQpID0+XG4gICAgICAgICB0aGlzLmV2ZW50c1tldmVudF0uc29tZSgoc3Vic2NyaXB0aW9uLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgYXJlRXF1YWwgPSBzdWJzY3JpcHRpb24udG9rZW4gPT09IHRva2VuLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICBpZiAoYXJlRXF1YWwpIHtcbiAgICAgICAgICAgICAgIHRoaXMuZXZlbnRzW2V2ZW50XS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGFyZUVxdWFsO1xuICAgICAgICAgfSlcbiAgICAgICk7XG5cbiAgICAgIHJldHVybiBmb3VuZCA/IHRva2VuIDogbnVsbDtcbiAgIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBwdWJzdWI7XG4iLCJmdW5jdGlvbiBUYXNrKGRhdGEpIHtcbiAgIHJldHVybiB7IC4uLmRhdGEgfTtcbn1cbiIsImltcG9ydCBwdWJzdWIgZnJvbSAnLi4vcHViU3ViJztcblxuY29uc3QgdGFza0Zvcm0gPSB7XG4gICBsaXN0ZW46ICgpID0+IHtcbiAgICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9ybScpO1xuICAgICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZXYpID0+IHtcbiAgICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICB0YXNrRm9ybS5uZXdUYXNrKGZvcm0pO1xuICAgICAgfSk7XG4gICB9LFxuXG4gICBuZXdUYXNrOiAoZm9ybSkgPT4ge1xuICAgICAgY29uc3QgZm9ybURhdGEgPSB7XG4gICAgICAgICBuYW1lOiBmb3JtLmVsZW1lbnRzLnRpdGxlLnZhbHVlLFxuICAgICAgICAgZGF0ZTogZm9ybS5lbGVtZW50cy5kYXRlLnZhbHVlLFxuICAgICAgfTtcbiAgICAgIHB1YnN1Yi5wdWJsaXNoKCd0YXNrU3VibWl0dGVkJywgZm9ybURhdGEpO1xuICAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHRhc2tGb3JtO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBUYXNrIGZyb20gJy4vdGFza01vZGFsJztcblxuaW1wb3J0IHB1YnN1YiBmcm9tICcuL3B1YlN1Yic7XG5cbmltcG9ydCB0YXNrRm9ybSBmcm9tICcuL3ZpZXdzL3Rhc2tGb3JtJztcblxudGFza0Zvcm0ubGlzdGVuKCk7XG5cbnB1YnN1Yi5zdWJzY3JpYmUoJ3Rhc2tTdWJtaXR0ZWQnLCBjcmVhdGVOZXdUYXNrKTtcblxuZnVuY3Rpb24gY3JlYXRlTmV3VGFzayhmb3JtRGF0YSkge1xuICAgY29uc29sZS5sb2coZm9ybURhdGEpO1xufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9