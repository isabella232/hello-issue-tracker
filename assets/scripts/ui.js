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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.plugin = undefined;

var _settings = __webpack_require__(3);

var settings = _interopRequireWildcard(_settings);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var pluginObject = settings;
for (var attrname in NhsNotesVars) {
	pluginObject[attrname] = NhsNotesVars[attrname];
}

var plugin = exports.plugin = pluginObject;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(2);
module.exports = __webpack_require__(4);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _settings = __webpack_require__(0);

(function ($) {
	$(function () {});
})(jQuery);

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = {}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _settings = __webpack_require__(0);

(function ($) {
	$(function () {
		var $notes = $('table span[class*="note"]');

		$notes.each(function () {

			var $note = $(this);
			var innerHtml = $note.html();
			var noteNumber = getNoteId(innerHtml.trim());
			if (noteNumber === '&nbsp;') {
				$note.hide();
				return true;
			} else if (noteNumber === 'Note') {
				return true;
			}

			var categoryUrl = _settings.plugin.matchedCategoryUrl;
			if (!categoryUrl) {
				return true;
			}

			/**
    * Set Up Notes Links
    */

			// Notes if more than one Number/Note is in the trigger
			var values = '';
			var separator = '';
			if (innerHtml.indexOf('/') !== -1) {
				values = innerHtml.split('/');
				separator = '/';
			} else {
				values = innerHtml.split(',');
				separator = ',';
			}

			var resolvedNotes = [];
			for (var i = 0; i < values.length; i++) {
				var url = _settings.plugin.AjaxURL + '?action=' + _settings.plugin.ajaxAction + '&link=' + categoryUrl + '&note=' + values[i].trim();
				var note = values[i].trim();
				resolvedNotes.push('<a data-href="' + url + '" class="note__link">' + note + '</a>');
			}
			resolvedNotes.join(separator);
			$note.html(resolvedNotes);
		});
	});

	/**
  * Fancybox
  */

	$(document).on('click', '.note__link', function (e, element) {
		$.fancybox.open({
			src: $(this).attr('data-href'),
			type: 'ajax'
		});
		return false;
	});

	function getNoteId(string) {
		var output = '';
		output = string.replace(".", "\\.");
		output = output.replace("(", "");
		output = output.replace(")", "");
		return output;
	}
})(jQuery);

/***/ })
/******/ ]);