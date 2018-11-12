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
for (var attrname in HelloIssueTrackerVars) {
	pluginObject[attrname] = HelloIssueTrackerVars[attrname];
}

var plugin = exports.plugin = pluginObject;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(2);
__webpack_require__(5);
module.exports = __webpack_require__(6);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _settings = __webpack_require__(0);

var _api = __webpack_require__(4);

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

(function ($) {
	$(function () {
		$('.hit-issues').each(function () {
			var load_issues = function () {
				var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
					var issues, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, value;

					return regeneratorRuntime.wrap(function _callee$(_context) {
						while (1) {
							switch (_context.prev = _context.next) {
								case 0:
									$loader.fadeIn(200);
									_context.next = 3;
									return (0, _api.get_issues)(options);

								case 3:
									issues = _context.sent;

									store = {};
									$list.html('');
									_iteratorNormalCompletion = true;
									_didIteratorError = false;
									_iteratorError = undefined;
									_context.prev = 9;
									for (_iterator = issues[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
										value = _step.value;

										store[value.iid] = (0, _api.parse_issue)(value);
										$list.append(issueTemplate(store[value.iid]));
									}
									_context.next = 17;
									break;

								case 13:
									_context.prev = 13;
									_context.t0 = _context['catch'](9);
									_didIteratorError = true;
									_iteratorError = _context.t0;

								case 17:
									_context.prev = 17;
									_context.prev = 18;

									if (!_iteratorNormalCompletion && _iterator.return) {
										_iterator.return();
									}

								case 20:
									_context.prev = 20;

									if (!_didIteratorError) {
										_context.next = 23;
										break;
									}

									throw _iteratorError;

								case 23:
									return _context.finish(20);

								case 24:
									return _context.finish(17);

								case 25:
									$loader.fadeOut(200);

								case 26:
								case 'end':
									return _context.stop();
							}
						}
					}, _callee, this, [[9, 13, 17, 25], [18,, 20, 24]]);
				}));

				return function load_issues() {
					return _ref.apply(this, arguments);
				};
			}();

			var $container = $(this);
			var $loader = $container.find('.hit-issues__loader');
			var $options = $container.find('.hit-issues__option select');
			var $list = $container.find('.hit-issues__list');
			var options = {};
			var store = {};

			$options.on('change', function () {
				set_options();
			});

			load_issues();

			function set_options() {
				$options.each(function () {
					options[$(this).attr('name')] = $(this).val();
				});
				load_issues();
			}
		});
	});

	function issueTemplate(issue) {
		return '<li>\n\t\t\t#' + issue.iid + ' ' + issue.title + '\n\t\t</li>';
	}
})(jQuery);

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = {}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.parse_issue = exports.get_issue = exports.get_issues = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _settings = __webpack_require__(0);

var apiBase = _settings.plugin.APIbase + 'api/v4/';

function get_api(path) {
	var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	if (!_settings.plugin.key) {
		return false;
	}
	return new Promise(function (resolve) {

		var urlParams = [];
		urlParams.push('private_token=' + _settings.plugin.key);
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = Object.entries(params)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var _ref = _step.value;

				var _ref2 = _slicedToArray(_ref, 2);

				var key = _ref2[0];
				var value = _ref2[1];

				urlParams.push(key + '=' + value);
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}

		var url = apiBase + path + '?' + urlParams.join('&');
		jQuery.getJSON(url, function (json) {
			resolve(json);
		});
	});
}

var get_issues = exports.get_issues = function get_issues(options) {
	if (!_settings.plugin.repo) {
		return false;
	}
	return get_api('projects/' + _settings.plugin.repo + '/issues', options);
};

var get_issue = exports.get_issue = function get_issue(issueID) {};

var parse_issue = exports.parse_issue = function parse_issue(obj) {
	obj['hit_label'] = {};
	var _iteratorNormalCompletion2 = true;
	var _didIteratorError2 = false;
	var _iteratorError2 = undefined;

	try {
		for (var _iterator2 = obj.labels[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
			var label = _step2.value;

			var regex = new RegExp(_settings.plugin.labelPrefix + '([a-z0-9]*): ');
			var match = regex.exec(label);
			if (match != null) {
				obj['hit_label'][match[1]] = label.replace(match[0], '');
			}
		}
	} catch (err) {
		_didIteratorError2 = true;
		_iteratorError2 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion2 && _iterator2.return) {
				_iterator2.return();
			}
		} finally {
			if (_didIteratorError2) {
				throw _iteratorError2;
			}
		}
	}

	return obj;
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _settings = __webpack_require__(0);

(function ($) {
	$(function () {
		$('#hit-credentials-form').on('submit', function (event) {

			event.preventDefault();

			var $form = $(this);
			var $button = $form.find('[type="submit"]');
			var $resp = $('.hit-options__response');
			var data = $form.serialize();

			$button.prop('disabled', true);
			$resp.slideUp(200);

			$.ajax({
				url: _settings.plugin['AjaxURL'],
				type: 'POST',
				dataType: 'json',
				data: data
			}).always(function (data) {

				if (data['type'] === null || data['type'] !== 'success') {

					/**
      * error
      */

					var msg_content = data['message'];
					if (msg_content === '' || msg_content === undefined) {
						msg_content = _settings.plugin['GeneralError'];
					}

					$resp.html(msg_content).slideDown(200);
				} else {

					/**
      * success
      */

					location.reload();
				}

				$button.prop('disabled', false);
			});
		});
	});
})(jQuery);

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _settings = __webpack_require__(0);

(function ($) {
	$(function () {
		$('.hello-issue-tracker .hit-options').each(function () {
			var $container = $(this);
			var $title = $(this).find('.hit-options__title');
			var $content = $(this).find('.hit-options__content');
			$content.css({
				'display': $container.attr('data-hidden') === 'true' ? 'none' : 'block'
			});

			$title.on('click', function () {
				$content.slideToggle(200);
				var attrValue = $container.attr('data-hidden') === 'true' ? 'false' : 'true';
				$container.attr('data-hidden', attrValue);
			});
		});
	});
})(jQuery);

/***/ })
/******/ ]);