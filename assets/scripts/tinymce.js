/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./.build/assets/scripts/tinymce/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./.build/assets/scripts/tinymce/hitimage.js":
/*!***************************************************!*\
  !*** ./.build/assets/scripts/tinymce/hitimage.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("(function ($) {\n  var frame;\n  var vars = HelloIssueTrackerTinyMCEVars.hitimage;\n  tinymce.create('tinymce.plugins.hitimage', {\n    init: function init(ed, url) {\n      //spacer\n      ed.addButton('hitimage', {\n        title: vars.texts.title,\n        image: vars.image,\n        onclick: function onclick() {\n          frame = wp.media({\n            title: vars.texts.selectOrUpload,\n            button: {\n              text: vars.texts.select\n            },\n            multiple: false\n          });\n          frame.on('select', function () {\n            var img = frame.state().get('selection').first().toJSON();\n            var imgUrl = img.url;\n\n            if ('large' in img.sizes) {\n              imgUrl = img.sizes.large.url;\n            }\n\n            ed.selection.setContent(\"<img alt=\\\"\".concat(img.name, \"\\\" src=\\\"\").concat(imgUrl, \"\\\" />\"));\n          });\n          frame.open();\n        }\n      });\n    },\n    createControl: function createControl(n, cm) {\n      return null;\n    }\n  });\n  tinymce.PluginManager.add('hitimage', tinymce.plugins.hitimage);\n})(jQuery);\n\n//# sourceURL=webpack:///./.build/assets/scripts/tinymce/hitimage.js?");

/***/ }),

/***/ "./.build/assets/scripts/tinymce/index.js":
/*!************************************************!*\
  !*** ./.build/assets/scripts/tinymce/index.js ***!
  \************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _hitimage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hitimage */ \"./.build/assets/scripts/tinymce/hitimage.js\");\n/* harmony import */ var _hitimage__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_hitimage__WEBPACK_IMPORTED_MODULE_0__);\n\n\n//# sourceURL=webpack:///./.build/assets/scripts/tinymce/index.js?");

/***/ })

/******/ });