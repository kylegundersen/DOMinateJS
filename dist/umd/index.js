(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index-exposed.ts":
/*!******************************!*\
  !*** ./src/index-exposed.ts ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var ___EXPOSE_LOADER_IMPORT___ = __webpack_require__(/*! -!../node_modules/ts-loader/index.js!./index.ts */ "./node_modules/ts-loader/index.js!./src/index.ts");
var ___EXPOSE_LOADER_GET_GLOBAL_THIS___ = __webpack_require__(/*! ../node_modules/expose-loader/dist/runtime/getGlobalThis.js */ "./node_modules/expose-loader/dist/runtime/getGlobalThis.js");
var ___EXPOSE_LOADER_GLOBAL_THIS___ = ___EXPOSE_LOADER_GET_GLOBAL_THIS___;
___EXPOSE_LOADER_GLOBAL_THIS___["DOM"] = ___EXPOSE_LOADER_IMPORT___;
module.exports = ___EXPOSE_LOADER_IMPORT___;


/***/ }),

/***/ "./node_modules/expose-loader/dist/runtime/getGlobalThis.js":
/*!******************************************************************!*\
  !*** ./node_modules/expose-loader/dist/runtime/getGlobalThis.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


// eslint-disable-next-line func-names
module.exports = function () {
  if (typeof globalThis === "object") {
    return globalThis;
  }

  var g;

  try {
    // This works if eval is allowed (see CSP)
    // eslint-disable-next-line no-new-func
    g = this || new Function("return this")();
  } catch (e) {
    // This works if the window reference is available
    if (typeof window === "object") {
      return window;
    } // This works if the self reference is available


    if (typeof self === "object") {
      return self;
    } // This works if the global reference is available


    if (typeof __webpack_require__.g !== "undefined") {
      return __webpack_require__.g;
    }
  }

  return g;
}();

/***/ }),

/***/ "./node_modules/ts-loader/index.js!./src/index.ts":
/*!********************************************************!*\
  !*** ./node_modules/ts-loader/index.js!./src/index.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DOM": () => (/* binding */ DOM)
/* harmony export */ });
/**
 * Document Object Model - helper functions
 * Helps you interact with the DOM safely and easily.
 *
 */
class DOM {
    /**
     * Adds an event listener that follows the event delegation pattern. The advantage is that you can add
     * elements at any depth inside the parent container without having to worry about the event being
     * applied. This solves having to add, remove, and manage events per element.
     * @param type - Event type, example: click, dblclick, mouseover, ect..
     * @param selector - Same as query selector. Element class denoted with period, id denoted with #, or element name.
     * @param callback - A callback function to perform when the event is triggered.
     * @param useCapture - Optionally use capture instead of event bubbling.
     * @param parent - Optionally where to add the listener. Defaults to the document.
     *
     * ```javascript
     *
     * // Example 1 - Adds click to ID unique-id inside of document.
     * DOM.addEventDelegate('click', "#unique-id", () => { console.log("FIRE!") });
     *
     * // Example 2 - Adds click to class .btn inside of document.
     * DOM.addEventDelegate('click', ".btn", () => { console.log("FIRE!") });
     *
     * // Example 3 - Adds click to button elements inside window via capture.
     * DOM.addEventDelegate('click', "button", () => { console.log("FIRE!") }, true, window);
     *
     *
     * ```
     */
    static addEventDelegate(type, selector, callback, useCapture = false, parent = document) {
        parent.addEventListener(type, (e) => {
            if (e.target.matches(selector))
                callback(e);
        }, useCapture);
    }
    /**
     * Create a complex DOM element with a single funciton.
     * @param element - Standard HTML element. Example: div, span, input, button, ect...
     * @param attributes - (Optional) Pass an object using this pattern. **{ attributeName : value }**.
     * - ```text``` You are able to pass a string as textContent.
     * - ```append``` Pass an element/node, or an array of elements/nodes to append.
     * - ```html``` You are able to pass a string as HTML. **Do not pass user changable data for obvious security reasons!**
     * - ```class``` You are able to pass multiple classes using a space as the delimiter.
     * @param events - (Optional) Pass an object using this pattern to add events. **{ eventType: callback }**. The eventType consists of standard javascript events.
     * @returns The new created element inferred from the ```element``` param.
     * ```javascript
     *
     * // Example 1 - <div id="unique-id" class="text-class"> Some call to action text! </div>
     * let newElement = DOM.create("div", { id: "unique-id", class: "text-class", text: "Some call to action text!"});
     *
     * // Example 2 - When clicked it prints out "Clicked!" to the console.
     * // <button id="unique-id-2" class="button-class">
     * //  <div id="unique-id" class="text-class"> Some call to action text! </div>
     * // </button>
     * DOM.create("button", { id: "unique-id-2", class: "button-class", text: newElement}, { click: () => console.log('Clicked!') });
     *
     *
     * ```
     */
    static create(element, attributes = null, events = null) {
        let elem = document.createElement(element);
        if (attributes !== null) {
            Object.keys(attributes).forEach(attributeName => {
                switch (attributeName) {
                    case "class":
                        (attributes[attributeName].trim().split(/\s+/)).forEach(attrClass => { elem.classList.add(attrClass); });
                        break;
                    case "text":
                    case "append":
                        if (typeof attributes[attributeName] === "string") {
                            elem.textContent = attributes[attributeName];
                        }
                        else {
                            if (attributes[attributeName].length) {
                                elem.append(...attributes[attributeName]);
                            }
                            else {
                                elem.append(attributes[attributeName]);
                            }
                        }
                        break;
                    case "html":
                        elem.innerHTML = attributes[attributeName];
                        break;
                    case "dataset":
                        Object.entries(attributes[attributeName]).forEach(([dataKey, dataValue]) => {
                            elem.dataset[dataKey] = dataValue;
                        });
                        break;
                    default: elem.setAttribute(attributeName, attributes[attributeName]);
                }
            });
        }
        if (events !== null) {
            let eventList = Object.keys(events);
            eventList.forEach(event => elem.addEventListener(event, events[event]));
        }
        return elem;
    }
    /**
     * Shorthand for the query selector
     * @param query - A query selector string, Example: ```".class"```
     * @param element - (Optional) Defaults to the document object
     * @return The first or only element
     */
    static select(query, parent = document) {
        return parent.querySelector(query);
    }
    /**
     * Shorthand for the query selector all with the added bonus of returning an array.
     * @param query - A query selector string, Example: ```".class"```
     * @param element - (Optional) Defaults to the document object
     * @return An array of elements
     */
    static selectAll(query, parent = document) {
        return Array.prototype.slice.call(parent.querySelectorAll(query));
    }
    /**
     * Detach and return an Element from the DOM
     * @param reference A query selector string or elem reference (Element, ect...)
     * @return The detached element
     */
    static detach(reference) {
        let elem = typeof reference === "string" ? this.select(reference) : reference;
        return elem.parentElement.removeChild(elem);
    }
    /**
     * Two-way data binding between an object's property and an Element's attribute.
     * @param object - The parent object where the property will be added.
     * @param objectProperty - Create a property that binds with an attribute.
     * @param element - The element or query selector of the element.
     * @param elementAttribute - The attribute to bind to the object's property.
     * ```javascript
     *
     * // Example - Binds Object Property "name" (dataObject.name) to an element's attribute value.
     * let dataObject = {};
     * DOM.bindAttribute(dataObject, "name", "#unique-id", 'value');
     *
     *
     * ```
     */
    static bindAttribute(object, objectProperty, element, elementAttribute) {
        let elem = typeof element === "string" ? this.select(element) : element;
        Object.defineProperty(object, objectProperty, {
            get() {
                return elem.getAttribute(elementAttribute);
            },
            set(value) {
                elem.setAttribute(elementAttribute, value);
            }
        });
    }
    /**
     * Get a route based on current location path name.
     * @param isArray - (Optional) This will return the path as an array ```['some', 'path', 'defined']```
     * otherwise it will default to a string ```'/some/path/defined'```.
     * @return - A string or array representing the current document.location.pathName
     *
     * ```javascript
     *
     * // Example 1 - Get path `/some/path/defined`
     * let currentRoute = DOM.getRoute();
     *
     * // Example 2 - Get path as array ['some', 'path', 'defined']
     * let currentRoute = DOM.getRoute(true);
     *
     * ```
     */
    static getRoute(isArray = false) {
        return isArray ? document.location.pathname.split("/").filter(n => n) : document.location.pathname;
    }
    /**
     * Get the routes query string as a string or an object
     * @param isObject - (Optional) Defaults to true and will return an object by default.
     * @return - A string or object representing the current document.location.search
     *
     * ```javascript
     *
     * // Example 1 - Get query string as object ```{ test : 1 }```
     * let currentRoute = DOM.getRouteData();
     *
     * // Example 2 - Get query string as string ```"?test=1"```
     * let currentRoute = DOM.getRouteData(false);
     *
     * ```
     */
    static getRouteData(isObject = true) {
        return isObject ? Object.fromEntries(new URLSearchParams(document.location.search)) : document.location.search;
    }
    /**
     * Set the browser url and update browser history without triggering a full page refresh.
     * @param route - The path location with an optional query string
     *
     * ```javascript
     *
     * // Example 1 - Set url localhost:4200/some/path/defined
     * DOM.setRoute('/some/path/defined');
     *
     * // Example 2 - Gets current route as array ['some', 'path', 'defined']
     * //             Sets new route localhost:4200/some/path/new
     * let currentRoute = DOM.getRoute(true);
     * DOM.setRoute(`/${currentRoute[0]}/${currentRoute[1]}/new`);
     *
     * ```
     */
    static setRoute(route) {
        window.history.pushState({}, "", route);
    }
}


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
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index-exposed.ts");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q3hCLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDNUMsQ0FBQztDQUVKOzs7Ozs7O1VDbk9EO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQ7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztVRU5BO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZG9taW5hdGlvbi1qcy93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vZG9taW5hdGlvbi1qcy8uL3NyYy9pbmRleC1leHBvc2VkLnRzIiwid2VicGFjazovL2RvbWluYXRpb24tanMvLi9ub2RlX21vZHVsZXMvZXhwb3NlLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0R2xvYmFsVGhpcy5qcyIsIndlYnBhY2s6Ly9kb21pbmF0aW9uLWpzLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovL2RvbWluYXRpb24tanMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZG9taW5hdGlvbi1qcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZG9taW5hdGlvbi1qcy93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2RvbWluYXRpb24tanMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9kb21pbmF0aW9uLWpzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZG9taW5hdGlvbi1qcy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2RvbWluYXRpb24tanMvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2RvbWluYXRpb24tanMvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSBmYWN0b3J5KCk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KShzZWxmLCAoKSA9PiB7XG5yZXR1cm4gIiwidmFyIF9fX0VYUE9TRV9MT0FERVJfSU1QT1JUX19fID0gcmVxdWlyZShcIi0hLi4vbm9kZV9tb2R1bGVzL3RzLWxvYWRlci9pbmRleC5qcyEuL2luZGV4LnRzXCIpO1xudmFyIF9fX0VYUE9TRV9MT0FERVJfR0VUX0dMT0JBTF9USElTX19fID0gcmVxdWlyZShcIi4uL25vZGVfbW9kdWxlcy9leHBvc2UtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRHbG9iYWxUaGlzLmpzXCIpO1xudmFyIF9fX0VYUE9TRV9MT0FERVJfR0xPQkFMX1RISVNfX18gPSBfX19FWFBPU0VfTE9BREVSX0dFVF9HTE9CQUxfVEhJU19fXztcbl9fX0VYUE9TRV9MT0FERVJfR0xPQkFMX1RISVNfX19bXCJET01cIl0gPSBfX19FWFBPU0VfTE9BREVSX0lNUE9SVF9fXztcbm1vZHVsZS5leHBvcnRzID0gX19fRVhQT1NFX0xPQURFUl9JTVBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuICBpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09IFwib2JqZWN0XCIpIHtcbiAgICByZXR1cm4gZ2xvYmFsVGhpcztcbiAgfVxuXG4gIHZhciBnO1xuXG4gIHRyeSB7XG4gICAgLy8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ldy1mdW5jXG4gICAgZyA9IHRoaXMgfHwgbmV3IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgIHJldHVybiB3aW5kb3c7XG4gICAgfSAvLyBUaGlzIHdvcmtzIGlmIHRoZSBzZWxmIHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcblxuXG4gICAgaWYgKHR5cGVvZiBzZWxmID09PSBcIm9iamVjdFwiKSB7XG4gICAgICByZXR1cm4gc2VsZjtcbiAgICB9IC8vIFRoaXMgd29ya3MgaWYgdGhlIGdsb2JhbCByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG5cblxuICAgIGlmICh0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICByZXR1cm4gZ2xvYmFsO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBnO1xufSgpOyIsImltcG9ydCB7IEpTRXZlbnRzIH0gZnJvbSBcIi4vbW9kZWxzL2pzLWV2ZW50c1wiO1xyXG5pbXBvcnQgeyBKU0V2ZW50c0VudW0gfSBmcm9tIFwiLi9lbnVtL2pzLWV2ZW50c1wiO1xyXG4vKipcclxuICogRG9jdW1lbnQgT2JqZWN0IE1vZGVsIC0gaGVscGVyIGZ1bmN0aW9uc1xyXG4gKiBIZWxwcyB5b3UgaW50ZXJhY3Qgd2l0aCB0aGUgRE9NIHNhZmVseSBhbmQgZWFzaWx5LlxyXG4gKiBcclxuICovXHJcbmV4cG9ydCBjbGFzcyBET00ge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhbiBldmVudCBsaXN0ZW5lciB0aGF0IGZvbGxvd3MgdGhlIGV2ZW50IGRlbGVnYXRpb24gcGF0dGVybi4gVGhlIGFkdmFudGFnZSBpcyB0aGF0IHlvdSBjYW4gYWRkIFxyXG4gICAgICogZWxlbWVudHMgYXQgYW55IGRlcHRoIGluc2lkZSB0aGUgcGFyZW50IGNvbnRhaW5lciB3aXRob3V0IGhhdmluZyB0byB3b3JyeSBhYm91dCB0aGUgZXZlbnQgYmVpbmcgXHJcbiAgICAgKiBhcHBsaWVkLiBUaGlzIHNvbHZlcyBoYXZpbmcgdG8gYWRkLCByZW1vdmUsIGFuZCBtYW5hZ2UgZXZlbnRzIHBlciBlbGVtZW50LlxyXG4gICAgICogQHBhcmFtIHR5cGUgLSBFdmVudCB0eXBlLCBleGFtcGxlOiBjbGljaywgZGJsY2xpY2ssIG1vdXNlb3ZlciwgZWN0Li5cclxuICAgICAqIEBwYXJhbSBzZWxlY3RvciAtIFNhbWUgYXMgcXVlcnkgc2VsZWN0b3IuIEVsZW1lbnQgY2xhc3MgZGVub3RlZCB3aXRoIHBlcmlvZCwgaWQgZGVub3RlZCB3aXRoICMsIG9yIGVsZW1lbnQgbmFtZS5cclxuICAgICAqIEBwYXJhbSBjYWxsYmFjayAtIEEgY2FsbGJhY2sgZnVuY3Rpb24gdG8gcGVyZm9ybSB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuXHJcbiAgICAgKiBAcGFyYW0gdXNlQ2FwdHVyZSAtIE9wdGlvbmFsbHkgdXNlIGNhcHR1cmUgaW5zdGVhZCBvZiBldmVudCBidWJibGluZy5cclxuICAgICAqIEBwYXJhbSBwYXJlbnQgLSBPcHRpb25hbGx5IHdoZXJlIHRvIGFkZCB0aGUgbGlzdGVuZXIuIERlZmF1bHRzIHRvIHRoZSBkb2N1bWVudC5cclxuICAgICAqIFxyXG4gICAgICogYGBgamF2YXNjcmlwdFxyXG4gICAgICogXHJcbiAgICAgKiAvLyBFeGFtcGxlIDEgLSBBZGRzIGNsaWNrIHRvIElEIHVuaXF1ZS1pZCBpbnNpZGUgb2YgZG9jdW1lbnQuXHJcbiAgICAgKiBET00uYWRkRXZlbnREZWxlZ2F0ZSgnY2xpY2snLCBcIiN1bmlxdWUtaWRcIiwgKCkgPT4geyBjb25zb2xlLmxvZyhcIkZJUkUhXCIpIH0pO1xyXG4gICAgICogXHJcbiAgICAgKiAvLyBFeGFtcGxlIDIgLSBBZGRzIGNsaWNrIHRvIGNsYXNzIC5idG4gaW5zaWRlIG9mIGRvY3VtZW50LlxyXG4gICAgICogRE9NLmFkZEV2ZW50RGVsZWdhdGUoJ2NsaWNrJywgXCIuYnRuXCIsICgpID0+IHsgY29uc29sZS5sb2coXCJGSVJFIVwiKSB9KTtcclxuICAgICAqIFxyXG4gICAgICogLy8gRXhhbXBsZSAzIC0gQWRkcyBjbGljayB0byBidXR0b24gZWxlbWVudHMgaW5zaWRlIHdpbmRvdyB2aWEgY2FwdHVyZS5cclxuICAgICAqIERPTS5hZGRFdmVudERlbGVnYXRlKCdjbGljaycsIFwiYnV0dG9uXCIsICgpID0+IHsgY29uc29sZS5sb2coXCJGSVJFIVwiKSB9LCB0cnVlLCB3aW5kb3cpO1xyXG4gICAgICogXHJcbiAgICAgKiBcclxuICAgICAqIGBgYFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGFkZEV2ZW50RGVsZWdhdGUodHlwZTogSlNFdmVudHNFbnVtIHwgc3RyaW5nLCBzZWxlY3Rvcjogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24sIHVzZUNhcHR1cmU6IGJvb2xlYW4gPSBmYWxzZSwgcGFyZW50OiBhbnkgPSBkb2N1bWVudCkge1xyXG4gICAgICAgIHBhcmVudC5hZGRFdmVudExpc3RlbmVyKHR5cGUsXHJcbiAgICAgICAgICAgIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZS50YXJnZXQubWF0Y2hlcyhzZWxlY3RvcikpIGNhbGxiYWNrKGUpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHVzZUNhcHR1cmVcclxuICAgICAgICApXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgYSBjb21wbGV4IERPTSBlbGVtZW50IHdpdGggYSBzaW5nbGUgZnVuY2l0b24uXHJcbiAgICAgKiBAcGFyYW0gZWxlbWVudCAtIFN0YW5kYXJkIEhUTUwgZWxlbWVudC4gRXhhbXBsZTogZGl2LCBzcGFuLCBpbnB1dCwgYnV0dG9uLCBlY3QuLi5cclxuICAgICAqIEBwYXJhbSBhdHRyaWJ1dGVzIC0gKE9wdGlvbmFsKSBQYXNzIGFuIG9iamVjdCB1c2luZyB0aGlzIHBhdHRlcm4uICoqeyBhdHRyaWJ1dGVOYW1lIDogdmFsdWUgfSoqLiBcclxuICAgICAqIC0gYGBgdGV4dGBgYCBZb3UgYXJlIGFibGUgdG8gcGFzcyBhIHN0cmluZyBhcyB0ZXh0Q29udGVudC5cclxuICAgICAqIC0gYGBgYXBwZW5kYGBgIFBhc3MgYW4gZWxlbWVudC9ub2RlLCBvciBhbiBhcnJheSBvZiBlbGVtZW50cy9ub2RlcyB0byBhcHBlbmQuXHJcbiAgICAgKiAtIGBgYGh0bWxgYGAgWW91IGFyZSBhYmxlIHRvIHBhc3MgYSBzdHJpbmcgYXMgSFRNTC4gKipEbyBub3QgcGFzcyB1c2VyIGNoYW5nYWJsZSBkYXRhIGZvciBvYnZpb3VzIHNlY3VyaXR5IHJlYXNvbnMhKipcclxuICAgICAqIC0gYGBgY2xhc3NgYGAgWW91IGFyZSBhYmxlIHRvIHBhc3MgbXVsdGlwbGUgY2xhc3NlcyB1c2luZyBhIHNwYWNlIGFzIHRoZSBkZWxpbWl0ZXIuXHJcbiAgICAgKiBAcGFyYW0gZXZlbnRzIC0gKE9wdGlvbmFsKSBQYXNzIGFuIG9iamVjdCB1c2luZyB0aGlzIHBhdHRlcm4gdG8gYWRkIGV2ZW50cy4gKip7IGV2ZW50VHlwZTogY2FsbGJhY2sgfSoqLiBUaGUgZXZlbnRUeXBlIGNvbnNpc3RzIG9mIHN0YW5kYXJkIGphdmFzY3JpcHQgZXZlbnRzLlxyXG4gICAgICogQHJldHVybnMgVGhlIG5ldyBjcmVhdGVkIGVsZW1lbnQgaW5mZXJyZWQgZnJvbSB0aGUgYGBgZWxlbWVudGBgYCBwYXJhbS5cclxuICAgICAqIGBgYGphdmFzY3JpcHRcclxuICAgICAqIFxyXG4gICAgICogLy8gRXhhbXBsZSAxIC0gPGRpdiBpZD1cInVuaXF1ZS1pZFwiIGNsYXNzPVwidGV4dC1jbGFzc1wiPiBTb21lIGNhbGwgdG8gYWN0aW9uIHRleHQhIDwvZGl2PlxyXG4gICAgICogbGV0IG5ld0VsZW1lbnQgPSBET00uY3JlYXRlKFwiZGl2XCIsIHsgaWQ6IFwidW5pcXVlLWlkXCIsIGNsYXNzOiBcInRleHQtY2xhc3NcIiwgdGV4dDogXCJTb21lIGNhbGwgdG8gYWN0aW9uIHRleHQhXCJ9KTtcclxuICAgICAqXHJcbiAgICAgKiAvLyBFeGFtcGxlIDIgLSBXaGVuIGNsaWNrZWQgaXQgcHJpbnRzIG91dCBcIkNsaWNrZWQhXCIgdG8gdGhlIGNvbnNvbGUuXHJcbiAgICAgKiAvLyA8YnV0dG9uIGlkPVwidW5pcXVlLWlkLTJcIiBjbGFzcz1cImJ1dHRvbi1jbGFzc1wiPlxyXG4gICAgICogLy8gIDxkaXYgaWQ9XCJ1bmlxdWUtaWRcIiBjbGFzcz1cInRleHQtY2xhc3NcIj4gU29tZSBjYWxsIHRvIGFjdGlvbiB0ZXh0ISA8L2Rpdj5cclxuICAgICAqIC8vIDwvYnV0dG9uPlxyXG4gICAgICogRE9NLmNyZWF0ZShcImJ1dHRvblwiLCB7IGlkOiBcInVuaXF1ZS1pZC0yXCIsIGNsYXNzOiBcImJ1dHRvbi1jbGFzc1wiLCB0ZXh0OiBuZXdFbGVtZW50fSwgeyBjbGljazogKCkgPT4gY29uc29sZS5sb2coJ0NsaWNrZWQhJykgfSk7XHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIGBgYFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZShlbGVtZW50OiBzdHJpbmcsIGF0dHJpYnV0ZXM6IGFueSA9IG51bGwsIGV2ZW50czogSlNFdmVudHMgPSBudWxsKTogYW55IHtcclxuXHJcbiAgICAgICAgbGV0IGVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnQpO1xyXG5cclxuICAgICAgICBpZiAoYXR0cmlidXRlcyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKS5mb3JFYWNoKGF0dHJpYnV0ZU5hbWUgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoYXR0cmlidXRlTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJjbGFzc1wiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoYXR0cmlidXRlc1thdHRyaWJ1dGVOYW1lXS50cmltKCkuc3BsaXQoL1xccysvKSkuZm9yRWFjaChhdHRyQ2xhc3MgPT4geyBlbGVtLmNsYXNzTGlzdC5hZGQoYXR0ckNsYXNzKSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcInRleHRcIjpcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiYXBwZW5kXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgYXR0cmlidXRlc1thdHRyaWJ1dGVOYW1lXSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS50ZXh0Q29udGVudCA9IGF0dHJpYnV0ZXNbYXR0cmlidXRlTmFtZV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihhdHRyaWJ1dGVzW2F0dHJpYnV0ZU5hbWVdLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS5hcHBlbmQoLi4uYXR0cmlidXRlc1thdHRyaWJ1dGVOYW1lXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0uYXBwZW5kKGF0dHJpYnV0ZXNbYXR0cmlidXRlTmFtZV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJodG1sXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0uaW5uZXJIVE1MID0gYXR0cmlidXRlc1thdHRyaWJ1dGVOYW1lXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImRhdGFzZXRcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmVudHJpZXMoYXR0cmlidXRlc1thdHRyaWJ1dGVOYW1lXSkuZm9yRWFjaCgoW2RhdGFLZXksIGRhdGFWYWx1ZV0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0uZGF0YXNldFtkYXRhS2V5XSA9IGRhdGFWYWx1ZSBhcyBzdHJpbmc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IGVsZW0uc2V0QXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUsIGF0dHJpYnV0ZXNbYXR0cmlidXRlTmFtZV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZXZlbnRzICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGxldCBldmVudExpc3Q6IEFycmF5PHN0cmluZz4gPSBPYmplY3Qua2V5cyhldmVudHMpO1xyXG4gICAgICAgICAgICBldmVudExpc3QuZm9yRWFjaChldmVudCA9PiBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGV2ZW50c1tldmVudF0pKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBlbGVtO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2hvcnRoYW5kIGZvciB0aGUgcXVlcnkgc2VsZWN0b3JcclxuICAgICAqIEBwYXJhbSBxdWVyeSAtIEEgcXVlcnkgc2VsZWN0b3Igc3RyaW5nLCBFeGFtcGxlOiBgYGBcIi5jbGFzc1wiYGBgXHJcbiAgICAgKiBAcGFyYW0gZWxlbWVudCAtIChPcHRpb25hbCkgRGVmYXVsdHMgdG8gdGhlIGRvY3VtZW50IG9iamVjdFxyXG4gICAgICogQHJldHVybiBUaGUgZmlyc3Qgb3Igb25seSBlbGVtZW50XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgc2VsZWN0KHF1ZXJ5OiBzdHJpbmcsIHBhcmVudDogYW55ID0gZG9jdW1lbnQpOiBFbGVtZW50IHtcclxuICAgICAgICByZXR1cm4gcGFyZW50LnF1ZXJ5U2VsZWN0b3IocXVlcnkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2hvcnRoYW5kIGZvciB0aGUgcXVlcnkgc2VsZWN0b3IgYWxsIHdpdGggdGhlIGFkZGVkIGJvbnVzIG9mIHJldHVybmluZyBhbiBhcnJheS5cclxuICAgICAqIEBwYXJhbSBxdWVyeSAtIEEgcXVlcnkgc2VsZWN0b3Igc3RyaW5nLCBFeGFtcGxlOiBgYGBcIi5jbGFzc1wiYGBgXHJcbiAgICAgKiBAcGFyYW0gZWxlbWVudCAtIChPcHRpb25hbCkgRGVmYXVsdHMgdG8gdGhlIGRvY3VtZW50IG9iamVjdFxyXG4gICAgICogQHJldHVybiBBbiBhcnJheSBvZiBlbGVtZW50c1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHNlbGVjdEFsbChxdWVyeTogc3RyaW5nLCBwYXJlbnQ6IGFueSA9IGRvY3VtZW50KTogQXJyYXk8RWxlbWVudD4ge1xyXG4gICAgICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChwYXJlbnQucXVlcnlTZWxlY3RvckFsbChxdWVyeSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGV0YWNoIGFuZCByZXR1cm4gYW4gRWxlbWVudCBmcm9tIHRoZSBET01cclxuICAgICAqIEBwYXJhbSByZWZlcmVuY2UgQSBxdWVyeSBzZWxlY3RvciBzdHJpbmcgb3IgZWxlbSByZWZlcmVuY2UgKEVsZW1lbnQsIGVjdC4uLilcclxuICAgICAqIEByZXR1cm4gVGhlIGRldGFjaGVkIGVsZW1lbnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBkZXRhY2gocmVmZXJlbmNlOiBzdHJpbmcgfCBFbGVtZW50KTogRWxlbWVudCB7XHJcbiAgICAgICAgbGV0IGVsZW06IEVsZW1lbnQgPSB0eXBlb2YgcmVmZXJlbmNlID09PSBcInN0cmluZ1wiID8gdGhpcy5zZWxlY3QocmVmZXJlbmNlKSA6IHJlZmVyZW5jZTtcclxuICAgICAgICByZXR1cm4gZWxlbS5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKGVsZW0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVHdvLXdheSBkYXRhIGJpbmRpbmcgYmV0d2VlbiBhbiBvYmplY3QncyBwcm9wZXJ0eSBhbmQgYW4gRWxlbWVudCdzIGF0dHJpYnV0ZS5cclxuICAgICAqIEBwYXJhbSBvYmplY3QgLSBUaGUgcGFyZW50IG9iamVjdCB3aGVyZSB0aGUgcHJvcGVydHkgd2lsbCBiZSBhZGRlZC5cclxuICAgICAqIEBwYXJhbSBvYmplY3RQcm9wZXJ0eSAtIENyZWF0ZSBhIHByb3BlcnR5IHRoYXQgYmluZHMgd2l0aCBhbiBhdHRyaWJ1dGUuXHJcbiAgICAgKiBAcGFyYW0gZWxlbWVudCAtIFRoZSBlbGVtZW50IG9yIHF1ZXJ5IHNlbGVjdG9yIG9mIHRoZSBlbGVtZW50LlxyXG4gICAgICogQHBhcmFtIGVsZW1lbnRBdHRyaWJ1dGUgLSBUaGUgYXR0cmlidXRlIHRvIGJpbmQgdG8gdGhlIG9iamVjdCdzIHByb3BlcnR5LlxyXG4gICAgICogYGBgamF2YXNjcmlwdFxyXG4gICAgICogXHJcbiAgICAgKiAvLyBFeGFtcGxlIC0gQmluZHMgT2JqZWN0IFByb3BlcnR5IFwibmFtZVwiIChkYXRhT2JqZWN0Lm5hbWUpIHRvIGFuIGVsZW1lbnQncyBhdHRyaWJ1dGUgdmFsdWUuIFxyXG4gICAgICogbGV0IGRhdGFPYmplY3QgPSB7fTtcclxuICAgICAqIERPTS5iaW5kQXR0cmlidXRlKGRhdGFPYmplY3QsIFwibmFtZVwiLCBcIiN1bmlxdWUtaWRcIiwgJ3ZhbHVlJyk7XHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqIGBgYFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGJpbmRBdHRyaWJ1dGUob2JqZWN0OiBhbnksIG9iamVjdFByb3BlcnR5OiBzdHJpbmcsIGVsZW1lbnQ6IEVsZW1lbnQgfCBzdHJpbmcsIGVsZW1lbnRBdHRyaWJ1dGU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGxldCBlbGVtOiBFbGVtZW50ID0gdHlwZW9mIGVsZW1lbnQgPT09IFwic3RyaW5nXCIgPyB0aGlzLnNlbGVjdChlbGVtZW50KSA6IGVsZW1lbnQ7XHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iamVjdCwgb2JqZWN0UHJvcGVydHksIHtcclxuICAgICAgICAgICAgZ2V0KCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsZW0uZ2V0QXR0cmlidXRlKGVsZW1lbnRBdHRyaWJ1dGUpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGVsZW0uc2V0QXR0cmlidXRlKGVsZW1lbnRBdHRyaWJ1dGUsIHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgYSByb3V0ZSBiYXNlZCBvbiBjdXJyZW50IGxvY2F0aW9uIHBhdGggbmFtZS5cclxuICAgICAqIEBwYXJhbSBpc0FycmF5IC0gKE9wdGlvbmFsKSBUaGlzIHdpbGwgcmV0dXJuIHRoZSBwYXRoIGFzIGFuIGFycmF5IGBgYFsnc29tZScsICdwYXRoJywgJ2RlZmluZWQnXWBgYCBcclxuICAgICAqIG90aGVyd2lzZSBpdCB3aWxsIGRlZmF1bHQgdG8gYSBzdHJpbmcgYGBgJy9zb21lL3BhdGgvZGVmaW5lZCdgYGAuXHJcbiAgICAgKiBAcmV0dXJuIC0gQSBzdHJpbmcgb3IgYXJyYXkgcmVwcmVzZW50aW5nIHRoZSBjdXJyZW50IGRvY3VtZW50LmxvY2F0aW9uLnBhdGhOYW1lXHJcbiAgICAgKiBcclxuICAgICAqIGBgYGphdmFzY3JpcHRcclxuICAgICAqIFxyXG4gICAgICogLy8gRXhhbXBsZSAxIC0gR2V0IHBhdGggYC9zb21lL3BhdGgvZGVmaW5lZGBcclxuICAgICAqIGxldCBjdXJyZW50Um91dGUgPSBET00uZ2V0Um91dGUoKTtcclxuICAgICAqIFxyXG4gICAgICogLy8gRXhhbXBsZSAyIC0gR2V0IHBhdGggYXMgYXJyYXkgWydzb21lJywgJ3BhdGgnLCAnZGVmaW5lZCddXHJcbiAgICAgKiBsZXQgY3VycmVudFJvdXRlID0gRE9NLmdldFJvdXRlKHRydWUpO1xyXG4gICAgICogXHJcbiAgICAgKiBgYGBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRSb3V0ZShpc0FycmF5OmJvb2xlYW4gPSBmYWxzZSkgOiBBcnJheTxzdHJpbmc+IHwgc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gaXNBcnJheSA/IGRvY3VtZW50LmxvY2F0aW9uLnBhdGhuYW1lLnNwbGl0KFwiL1wiKS5maWx0ZXIobiA9PiBuKSA6IGRvY3VtZW50LmxvY2F0aW9uLnBhdGhuYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHRoZSByb3V0ZXMgcXVlcnkgc3RyaW5nIGFzIGEgc3RyaW5nIG9yIGFuIG9iamVjdFxyXG4gICAgICogQHBhcmFtIGlzT2JqZWN0IC0gKE9wdGlvbmFsKSBEZWZhdWx0cyB0byB0cnVlIGFuZCB3aWxsIHJldHVybiBhbiBvYmplY3QgYnkgZGVmYXVsdC5cclxuICAgICAqIEByZXR1cm4gLSBBIHN0cmluZyBvciBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBjdXJyZW50IGRvY3VtZW50LmxvY2F0aW9uLnNlYXJjaFxyXG4gICAgICogXHJcbiAgICAgKiBgYGBqYXZhc2NyaXB0XHJcbiAgICAgKiBcclxuICAgICAqIC8vIEV4YW1wbGUgMSAtIEdldCBxdWVyeSBzdHJpbmcgYXMgb2JqZWN0IGBgYHsgdGVzdCA6IDEgfWBgYFxyXG4gICAgICogbGV0IGN1cnJlbnRSb3V0ZSA9IERPTS5nZXRSb3V0ZURhdGEoKTtcclxuICAgICAqIFxyXG4gICAgICogLy8gRXhhbXBsZSAyIC0gR2V0IHF1ZXJ5IHN0cmluZyBhcyBzdHJpbmcgYGBgXCI/dGVzdD0xXCJgYGBcclxuICAgICAqIGxldCBjdXJyZW50Um91dGUgPSBET00uZ2V0Um91dGVEYXRhKGZhbHNlKTtcclxuICAgICAqIFxyXG4gICAgICogYGBgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0Um91dGVEYXRhKGlzT2JqZWN0OmJvb2xlYW4gPSB0cnVlKSA6IGFueSB8IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIGlzT2JqZWN0ID8gT2JqZWN0LmZyb21FbnRyaWVzKG5ldyBVUkxTZWFyY2hQYXJhbXMoZG9jdW1lbnQubG9jYXRpb24uc2VhcmNoKSBhcyBhbnkpIDogZG9jdW1lbnQubG9jYXRpb24uc2VhcmNoO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHRoZSBicm93c2VyIHVybCBhbmQgdXBkYXRlIGJyb3dzZXIgaGlzdG9yeSB3aXRob3V0IHRyaWdnZXJpbmcgYSBmdWxsIHBhZ2UgcmVmcmVzaC4gXHJcbiAgICAgKiBAcGFyYW0gcm91dGUgLSBUaGUgcGF0aCBsb2NhdGlvbiB3aXRoIGFuIG9wdGlvbmFsIHF1ZXJ5IHN0cmluZ1xyXG4gICAgICogXHJcbiAgICAgKiBgYGBqYXZhc2NyaXB0XHJcbiAgICAgKiBcclxuICAgICAqIC8vIEV4YW1wbGUgMSAtIFNldCB1cmwgbG9jYWxob3N0OjQyMDAvc29tZS9wYXRoL2RlZmluZWRcclxuICAgICAqIERPTS5zZXRSb3V0ZSgnL3NvbWUvcGF0aC9kZWZpbmVkJyk7XHJcbiAgICAgKiBcclxuICAgICAqIC8vIEV4YW1wbGUgMiAtIEdldHMgY3VycmVudCByb3V0ZSBhcyBhcnJheSBbJ3NvbWUnLCAncGF0aCcsICdkZWZpbmVkJ11cclxuICAgICAqIC8vICAgICAgICAgICAgIFNldHMgbmV3IHJvdXRlIGxvY2FsaG9zdDo0MjAwL3NvbWUvcGF0aC9uZXdcclxuICAgICAqIGxldCBjdXJyZW50Um91dGUgPSBET00uZ2V0Um91dGUodHJ1ZSk7XHJcbiAgICAgKiBET00uc2V0Um91dGUoYC8ke2N1cnJlbnRSb3V0ZVswXX0vJHtjdXJyZW50Um91dGVbMV19L25ld2ApO1xyXG4gICAgICogXHJcbiAgICAgKiBgYGBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBzZXRSb3V0ZShyb3V0ZSkgOiB2b2lkIHtcclxuICAgICAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoe30sIFwiXCIsIHJvdXRlKTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC1leHBvc2VkLnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9