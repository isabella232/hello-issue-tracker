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
/******/ 	return __webpack_require__(__webpack_require__.s = "./.build/assets/scripts/admin/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./.build/assets/scripts/admin/Components/Globals/Loader.jsx":
/*!*******************************************************************!*\
  !*** ./.build/assets/scripts/admin/Components/Globals/Loader.jsx ***!
  \*******************************************************************/
/*! exports provided: Loader, LoaderContainer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Loader\", function() { return Loader; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"LoaderContainer\", function() { return LoaderContainer; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\n\nvar LoaderSnippet = function LoaderSnippet(_ref) {\n  var className = _ref.className;\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: className + ' hit-loader'\n  });\n};\n\nvar Loader = LoaderSnippet;\nvar LoaderContainer = function LoaderContainer(_ref2) {\n  var className = _ref2.className;\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: className + ' hit-loader-container'\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(LoaderSnippet, null));\n};\nLoaderSnippet.defaultProps = {\n  className: ''\n};\nLoaderContainer.defaultProps = {\n  className: ''\n};\n\n//# sourceURL=webpack:///./.build/assets/scripts/admin/Components/Globals/Loader.jsx?");

/***/ }),

/***/ "./.build/assets/scripts/admin/Components/IssuesIssue.jsx":
/*!****************************************************************!*\
  !*** ./.build/assets/scripts/admin/Components/IssuesIssue.jsx ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _vendor_plugin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../vendor/plugin */ \"./.build/assets/scripts/admin/vendor/plugin.js\");\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\nvar IssuesIssue =\n/*#__PURE__*/\nfunction (_React$Component) {\n  _inherits(IssuesIssue, _React$Component);\n\n  function IssuesIssue() {\n    _classCallCheck(this, IssuesIssue);\n\n    return _possibleConstructorReturn(this, _getPrototypeOf(IssuesIssue).apply(this, arguments));\n  }\n\n  _createClass(IssuesIssue, [{\n    key: \"render\",\n    value: function render() {\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: this.props.className\n      }, \"issue\");\n    }\n  }]);\n\n  return IssuesIssue;\n}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);\n\n_defineProperty(IssuesIssue, \"defaultProps\", {\n  className: ''\n});\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (IssuesIssue);\n\n//# sourceURL=webpack:///./.build/assets/scripts/admin/Components/IssuesIssue.jsx?");

/***/ }),

/***/ "./.build/assets/scripts/admin/Components/IssuesList.jsx":
/*!***************************************************************!*\
  !*** ./.build/assets/scripts/admin/Components/IssuesList.jsx ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _vendor_plugin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../vendor/plugin */ \"./.build/assets/scripts/admin/vendor/plugin.js\");\n/* harmony import */ var _Globals_Loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Globals/Loader */ \"./.build/assets/scripts/admin/Components/Globals/Loader.jsx\");\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\n\nvar IssuesList =\n/*#__PURE__*/\nfunction (_React$Component) {\n  _inherits(IssuesList, _React$Component);\n\n  function IssuesList() {\n    var _getPrototypeOf2;\n\n    var _this;\n\n    _classCallCheck(this, IssuesList);\n\n    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {\n      args[_key] = arguments[_key];\n    }\n\n    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(IssuesList)).call.apply(_getPrototypeOf2, [this].concat(args)));\n\n    _defineProperty(_assertThisInitialized(_this), \"state\", {\n      states: _vendor_plugin__WEBPACK_IMPORTED_MODULE_1__[\"config\"].issueAttributes.states,\n      activeState: Object.keys(_vendor_plugin__WEBPACK_IMPORTED_MODULE_1__[\"config\"].issueAttributes.states)[1]\n    });\n\n    return _this;\n  }\n\n  _createClass(IssuesList, [{\n    key: \"render\",\n\n    /*\r\n    constructor() {\r\n        this.changeIssueStates = this.changeIssueStates.bind(this);\r\n    }\r\n      changeIssueStates(event) {\r\n        this.setState({\r\n            activeState: event.target.value\r\n        });\r\n    }\r\n    */\n    value: function render() {\n      var _this2 = this;\n\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: this.props.className + ' hit-issues'\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"hit-issues__header\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"form\", {\n        className: \"hit-issues__options\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"hit-issues__option\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\", {\n        for: \"hit-issues-option-state\"\n      }, Object(_vendor_plugin__WEBPACK_IMPORTED_MODULE_1__[\"strings\"])('state')), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"select\", {\n        name: \"state\",\n        id: \"hit-issues-option-state\",\n        value: this.state.activeState,\n        onChange: this.changeIssueStates\n      }, Object.keys(this.state.states).map(function (key) {\n        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"option\", {\n          value: key\n        }, _this2.state.states[key]);\n      })))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", {\n        className: \"hit-issues__add-issue button button-primary js-hit-create-issue\"\n      }, Object(_vendor_plugin__WEBPACK_IMPORTED_MODULE_1__[\"strings\"])('create-issue'))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"hit-issues__head hit-issue-list\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"hit-issue-list__item\"\n      }, Object(_vendor_plugin__WEBPACK_IMPORTED_MODULE_1__[\"strings\"])('id')), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"hit-issue-list__item\"\n      }, Object(_vendor_plugin__WEBPACK_IMPORTED_MODULE_1__[\"strings\"])('title')), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"hit-issue-list__item\"\n      }, Object(_vendor_plugin__WEBPACK_IMPORTED_MODULE_1__[\"strings\"])('type')), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"hit-issue-list__item\"\n      }, Object(_vendor_plugin__WEBPACK_IMPORTED_MODULE_1__[\"strings\"])('priority'))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Globals_Loader__WEBPACK_IMPORTED_MODULE_2__[\"LoaderContainer\"], {\n        className: \"hit-issues__loader\"\n      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"hit-issues__list\"\n      }));\n    }\n  }]);\n\n  return IssuesList;\n}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);\n\n_defineProperty(IssuesList, \"defaultProps\", {\n  className: ''\n});\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (IssuesList);\n\n//# sourceURL=webpack:///./.build/assets/scripts/admin/Components/IssuesList.jsx?");

/***/ }),

/***/ "./.build/assets/scripts/admin/app.jsx":
/*!*********************************************!*\
  !*** ./.build/assets/scripts/admin/app.jsx ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _vendor_plugin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vendor/plugin */ \"./.build/assets/scripts/admin/vendor/plugin.js\");\n/* harmony import */ var _Components_IssuesList_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Components/IssuesList.jsx */ \"./.build/assets/scripts/admin/Components/IssuesList.jsx\");\n/* harmony import */ var _Components_IssuesIssue_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Components/IssuesIssue.jsx */ \"./.build/assets/scripts/admin/Components/IssuesIssue.jsx\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\n\n\n\nvar App =\n/*#__PURE__*/\nfunction (_React$Component) {\n  _inherits(App, _React$Component);\n\n  function App() {\n    _classCallCheck(this, App);\n\n    return _possibleConstructorReturn(this, _getPrototypeOf(App).apply(this, arguments));\n  }\n\n  _createClass(App, [{\n    key: \"render\",\n    value: function render() {\n      if (_vendor_plugin__WEBPACK_IMPORTED_MODULE_0__[\"config\"].gitlab.repoUrl === '') {\n        return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"div\", {\n          className: \"hit-page\"\n        }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"div\", {\n          className: \"hit-notice hit-notice--error hit-notice--full-width\"\n        }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"p\", null, Object(_vendor_plugin__WEBPACK_IMPORTED_MODULE_0__[\"strings\"])('repo-url-not-set'))));\n      }\n\n      return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"div\", {\n        className: \"hit-page\"\n      }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_Components_IssuesList_jsx__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n        className: \"hit-page__side\"\n      }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_Components_IssuesIssue_jsx__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n        className: \"hit-page__main\"\n      }));\n    }\n  }]);\n\n  return App;\n}(react__WEBPACK_IMPORTED_MODULE_3___default.a.Component);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (App);\n\n//# sourceURL=webpack:///./.build/assets/scripts/admin/app.jsx?");

/***/ }),

/***/ "./.build/assets/scripts/admin/main.js":
/*!*********************************************!*\
  !*** ./.build/assets/scripts/admin/main.js ***!
  \*********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _main_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main.jsx */ \"./.build/assets/scripts/admin/main.jsx\");\n\n\n//# sourceURL=webpack:///./.build/assets/scripts/admin/main.js?");

/***/ }),

/***/ "./.build/assets/scripts/admin/main.jsx":
/*!**********************************************!*\
  !*** ./.build/assets/scripts/admin/main.jsx ***!
  \**********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-dom */ \"react-dom\");\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _app_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.jsx */ \"./.build/assets/scripts/admin/app.jsx\");\n\n\n\nvar $container = document.querySelector('#hello-issue-tracker');\n\nif ($container) {\n  react_dom__WEBPACK_IMPORTED_MODULE_0___default.a.render(react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_app_jsx__WEBPACK_IMPORTED_MODULE_2__[\"default\"], null), $container);\n}\n\n//# sourceURL=webpack:///./.build/assets/scripts/admin/main.jsx?");

/***/ }),

/***/ "./.build/assets/scripts/admin/vendor/helpers.js":
/*!*******************************************************!*\
  !*** ./.build/assets/scripts/admin/vendor/helpers.js ***!
  \*******************************************************/
/*! exports provided: snakeToCamel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"snakeToCamel\", function() { return snakeToCamel; });\nfunction snakeToCamel(s) {\n  return s.replace(/(\\-\\w)/g, function (m) {\n    return m[1].toUpperCase();\n  });\n}\n\n//# sourceURL=webpack:///./.build/assets/scripts/admin/vendor/helpers.js?");

/***/ }),

/***/ "./.build/assets/scripts/admin/vendor/plugin.js":
/*!******************************************************!*\
  !*** ./.build/assets/scripts/admin/vendor/plugin.js ***!
  \******************************************************/
/*! exports provided: strings, config */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"strings\", function() { return strings; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"config\", function() { return config; });\n/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers */ \"./.build/assets/scripts/admin/vendor/helpers.js\");\n\nvar pluginConfig = {};\nvar pluginStrings = {};\n\nif ('HelloIssueTrackerConfig' in window) {\n  Object.keys(window.HelloIssueTrackerConfig).forEach(function (key) {\n    if (key === 'strings') {\n      pluginStrings = window.HelloIssueTrackerConfig[key];\n    } else {\n      pluginConfig[Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"snakeToCamel\"])(key)] = window.HelloIssueTrackerConfig[key];\n    }\n  });\n}\n\nvar strings = function strings(key) {\n  if (key in pluginStrings) {\n    return pluginStrings[key];\n  }\n\n  console.warn(\"'\".concat(key, \"' not found in plugin strings\"));\n  return '';\n};\nvar config = pluginConfig;\n\n//# sourceURL=webpack:///./.build/assets/scripts/admin/vendor/plugin.js?");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = React;\n\n//# sourceURL=webpack:///external_%22React%22?");

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = ReactDOM;\n\n//# sourceURL=webpack:///external_%22ReactDOM%22?");

/***/ })

/******/ });