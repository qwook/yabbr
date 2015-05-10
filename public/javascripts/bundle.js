(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

// Let's talk about NodeJS.

/* You might know from Java or C++ the `import` and `#include` keywords
 Those keywords will import the file.
 In NodeJS, the equivalent of that is "require"
 "require" will actually run the file.

 Unlike in Java and C++, you don't have to call `require` at the top.
 To keep the flow of the code, I've used the `require` inside functions
 and when defining controllers and views.
 */

"use strict";

var angular = (window.angular);

var app = angular.module("calculatorApp", []);

// Let's talk about angular for a bit.
// Angular handles all three of the M-V-C.
// The way it does it is kind of confusing, but I'll try my best to explain.

// The "View" in angular is described by a "Directive"
/* A "Directive" will describe the view, how you can use it,
 what data you can pass to the view, and the html/jade file used
 to render it.

 You will see in the directives folder that there is
*/

// define directives
app.directive("calculator", function () {
  return require("./directives/calculator.js");
});
app.directive("numberButton", function () {
  return require("./directives/numberButton.js");
});
app.directive("decimalButton", function () {
  return require("./directives/decimalButton.js");
});
app.directive("operatorButton", function () {
  return require("./directives/operatorButton.js");
});
app.directive("equateButton", function () {
  return require("./directives/equateButton.js");
});
app.directive("mutationButton", function () {
  return require("./directives/mutationButton.js");
});
app.directive("numberView", function () {
  return require("./directives/numberView.js");
});

// define controllers
app.controller("CalculatorController", require("./controllers/CalculatorController.js"));

},{"./controllers/CalculatorController.js":2,"./directives/calculator.js":3,"./directives/decimalButton.js":4,"./directives/equateButton.js":5,"./directives/mutationButton.js":6,"./directives/numberButton.js":7,"./directives/numberView.js":8,"./directives/operatorButton.js":9}],2:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var CalculatorModel = require('../models/CalculatorModel.js');

/**
 * Calculator Controller
 * ----------------
 * Calculator controller for MVC
 *
 **/

module.exports = (function () {
	function CalculatorController() {
		_classCallCheck(this, CalculatorController);

		// Define instance variables
		this.model = new CalculatorModel();
		this.insertingDecimal = false;
	}

	_createClass(CalculatorController, [{
		key: 'resetModel',
		value: function resetModel() {
			this.model = new CalculatorModel();
			this.insertingDecimal = false;
		}
	}, {
		key: 'insertNumber',
		value: function insertNumber(number) {
			if (this.model.left != '' && this.model.right == '' && this.model.operator == '') {
				this.resetModel();
			}

			if (this.model.right == '0') {
				this.model.right = '';
			}

			this.model.right += number.toString();
		}
	}, {
		key: 'insertDecimal',
		value: function insertDecimal() {
			if (this.insertingDecimal) {
				return;
			}

			if (this.model.left != '' && this.model.right == '' && this.model.operator == '') {
				this.resetModel();
			}

			this.model.right += '.';

			this.insertingDecimal = true;
		}
	}, {
		key: 'insertOperator',
		value: function insertOperator(operator) {
			this.equate();

			if (this.model.left == '' && this.model.operator == '' && this.model.right != '') {
				this.model.left = this.model.right;
				this.model.right = '';
			}

			if (this.model.left == '') {
				return;
			}

			this.model.operator = operator;
		}
	}, {
		key: 'equate',

		// Calculate the current operation.
		value: function equate() {

			// We have operands, now equate for the corresponding operator.
			if (this.model.left != '' && this.model.right != '') {
				var left = parseFloat(this.model.left);
				var right = parseFloat(this.model.right);
				if (this.model.operator == '+') {
					this.resetModel();
					this.model.right = (left + right).toString();
				} else if (this.model.operator == '-') {
					this.resetModel();
					this.model.right = (left - right).toString();
				} else if (this.model.operator == 'x') {
					this.resetModel();
					this.model.right = (left * right).toString();
				} else if (this.model.operator == '/') {
					this.resetModel();
					this.model.right = (left / right).toString();
				}
			}

			this.insertingDecimal = false;
		}
	}, {
		key: 'mutatorSin',
		value: function mutatorSin() {
			this.equate();

			if (this.model.right == '') return;

			this.model.right = Math.sin(parseFloat(this.model.right)).toString();
		}
	}, {
		key: 'mutatorCos',
		value: function mutatorCos() {
			this.equate();

			if (this.model.right == '') return;

			this.model.right = Math.cos(parseFloat(this.model.right)).toString();
		}
	}, {
		key: 'flipSign',
		value: function flipSign() {
			if (this.model.right == '') return;

			this.model.right = (-1 * parseFloat(this.model.right)).toString();
		}
	}]);

	return CalculatorController;
})();

},{"../models/CalculatorModel.js":17}],3:[function(require,module,exports){

// Directives "describe" the view and link to it.
'use strict';

module.exports = {
	restrict: 'E',
	template: require('./views/calculator.jade')(),
	link: function link(scope, element, attrs) {
		// Keypresses emulate the button presses and calls the controller.
		angular.element(document).bind('keydown', function (event) {
			scope.$apply(function () {
				switch (event.which) {
					case 48:
						scope.calculatorController.insertNumber('0');
						break;
					case 49:
						scope.calculatorController.insertNumber('1');
						break;
					case 50:
						scope.calculatorController.insertNumber('2');
						break;
					case 51:
						scope.calculatorController.insertNumber('3');
						break;
					case 52:
						scope.calculatorController.insertNumber('4');
						break;
					case 53:
						scope.calculatorController.insertNumber('5');
						break;
					case 54:
						scope.calculatorController.insertNumber('6');
						break;
					case 55:
						scope.calculatorController.insertNumber('7');
						break;
					case 56:
						if (event.shiftKey) {
							scope.calculatorController.insertOperator('x');
							break;
						}
						scope.calculatorController.insertNumber('8');
						break;
					case 57:
						scope.calculatorController.insertNumber('9');
						break;
					case 190:
						scope.calculatorController.insertDecimal();
						break;
					case 8:
						if (!event.shiftKey) {
							scope.calculatorController.resetModel();
							event.preventDefault();
						}
						break;
					case 13:
						scope.calculatorController.equate();
						event.preventDefault();
						break;
					case 187:
						if (event.shiftKey) {
							scope.calculatorController.insertOperator('+');
						}
						break;
					case 189:
						scope.calculatorController.insertOperator('-');
						break;
					case 191:
						scope.calculatorController.insertOperator('/');
						break;
				}
			});
		});
	}
};

},{"./views/calculator.jade":10}],4:[function(require,module,exports){

// Directives "describe" the view and link to it.
'use strict';

module.exports = {
	restrict: 'E',
	template: require('./views/decimalButton.jade')()
};

},{"./views/decimalButton.jade":11}],5:[function(require,module,exports){

// Directives "describe" the view and link to it.
'use strict';

module.exports = {
	restrict: 'E',
	template: require('./views/equateButton.jade')()
};

},{"./views/equateButton.jade":12}],6:[function(require,module,exports){

// Directives "describe" the view and link to it.
'use strict';

module.exports = {
	restrict: 'E',
	scope: {
		name: '@',
		mutator: '&'
	},
	template: require('./views/mutationButton.jade')()
};

},{"./views/mutationButton.jade":13}],7:[function(require,module,exports){

// Directives "describe" the view and link to it.
'use strict';

module.exports = {
	restrict: 'E',
	scope: {
		number: '@'
	},
	template: require('./views/numberButton.jade')()
};

},{"./views/numberButton.jade":14}],8:[function(require,module,exports){

// Directives "describe" the view and link to it.
'use strict';

module.exports = {
	restrict: 'E',
	scope: {
		model: '='
	},
	template: require('./views/numberView.jade')()
};

},{"./views/numberView.jade":15}],9:[function(require,module,exports){

// Directives "describe" the view and link to it.
'use strict';

module.exports = {
	restrict: 'E',
	scope: {
		operator: '@'
	},
	template: require('./views/operatorButton.jade')()
};

},{"./views/operatorButton.jade":16}],10:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<number-view model=\"calculatorController.model\"></number-view><div class=\"row\"><div class=\"six columns\"><div class=\"row\"><div class=\"four columns\"><number-button number=\"1\"></number-button></div><div class=\"four columns\"><number-button number=\"2\"></number-button></div><div class=\"four columns\"><number-button number=\"3\"></number-button></div></div><div class=\"row\"><div class=\"four columns\"><number-button number=\"4\"></number-button></div><div class=\"four columns\"><number-button number=\"5\"></number-button></div><div class=\"four columns\"><number-button number=\"6\"></number-button></div></div><div class=\"row\"><div class=\"four columns\"><number-button number=\"7\"></number-button></div><div class=\"four columns\"><number-button number=\"8\"></number-button></div><div class=\"four columns\"><number-button number=\"9\"></number-button></div></div><div class=\"row\"><div class=\"four columns\"><decimal-button></decimal-button></div><div class=\"four columns\"><number-button number=\"0\"></number-button></div><div class=\"four columns\"><equate-button></equate-button></div></div></div><div class=\"two columns\"><operator-button operator=\"+\"></operator-button><operator-button operator=\"-\"></operator-button><operator-button operator=\"x\"></operator-button><operator-button operator=\"/\"></operator-button></div><div class=\"four columns\"><mutation-button name=\"Clear\" mutator=\"calculatorController.resetModel()\"></mutation-button><mutation-button name=\"Sin\" mutator=\"calculatorController.mutatorSin()\"></mutation-button><mutation-button name=\"Cos\" mutator=\"calculatorController.mutatorCos()\"></mutation-button><mutation-button name=\"+/-\" mutator=\"calculatorController.flipSign()\"></mutation-button></div></div>");;return buf.join("");
};
},{"jade/runtime":19}],11:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<a ng-click=\"calculatorController.insertDecimal()\" class=\"button button-primary u-full-width no-padding\">.</a>");;return buf.join("");
};
},{"jade/runtime":19}],12:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<a ng-click=\"calculatorController.equate()\" class=\"button button-primary u-full-width no-padding\">=</a>");;return buf.join("");
};
},{"jade/runtime":19}],13:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<a ng-click=\"mutator()\" class=\"button u-full-width no-padding\">{{ name }}</a>");;return buf.join("");
};
},{"jade/runtime":19}],14:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<a ng-click=\"$parent.calculatorController.insertNumber(number)\" class=\"button u-full-width no-padding\">{{ number }}</a>");;return buf.join("");
};
},{"jade/runtime":19}],15:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("{{model.left}} {{model.operator}} {{model.right}}");;return buf.join("");
};
},{"jade/runtime":19}],16:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<a ng-click=\"$parent.calculatorController.insertOperator(operator)\" class=\"button u-full-width no-padding\">{{ operator }}</a>");;return buf.join("");
};
},{"jade/runtime":19}],17:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

/**
 * Calculator Model
 * ----------------
 * Simple calculator model for MVC
 *
 **/

module.exports = function CalculatorModel() {
  _classCallCheck(this, CalculatorModel);

  this.left = '';
  this.right = '';
  this.operator = '';
};

},{}],18:[function(require,module,exports){

},{}],19:[function(require,module,exports){
(function (global){
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.jade=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/**
 * Merge two attribute objects giving precedence
 * to values in object `b`. Classes are special-cased
 * allowing for arrays and merging/joining appropriately
 * resulting in a string.
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object} a
 * @api private
 */

exports.merge = function merge(a, b) {
  if (arguments.length === 1) {
    var attrs = a[0];
    for (var i = 1; i < a.length; i++) {
      attrs = merge(attrs, a[i]);
    }
    return attrs;
  }
  var ac = a['class'];
  var bc = b['class'];

  if (ac || bc) {
    ac = ac || [];
    bc = bc || [];
    if (!Array.isArray(ac)) ac = [ac];
    if (!Array.isArray(bc)) bc = [bc];
    a['class'] = ac.concat(bc).filter(nulls);
  }

  for (var key in b) {
    if (key != 'class') {
      a[key] = b[key];
    }
  }

  return a;
};

/**
 * Filter null `val`s.
 *
 * @param {*} val
 * @return {Boolean}
 * @api private
 */

function nulls(val) {
  return val != null && val !== '';
}

/**
 * join array as classes.
 *
 * @param {*} val
 * @return {String}
 */
exports.joinClasses = joinClasses;
function joinClasses(val) {
  return (Array.isArray(val) ? val.map(joinClasses) :
    (val && typeof val === 'object') ? Object.keys(val).filter(function (key) { return val[key]; }) :
    [val]).filter(nulls).join(' ');
}

/**
 * Render the given classes.
 *
 * @param {Array} classes
 * @param {Array.<Boolean>} escaped
 * @return {String}
 */
exports.cls = function cls(classes, escaped) {
  var buf = [];
  for (var i = 0; i < classes.length; i++) {
    if (escaped && escaped[i]) {
      buf.push(exports.escape(joinClasses([classes[i]])));
    } else {
      buf.push(joinClasses(classes[i]));
    }
  }
  var text = joinClasses(buf);
  if (text.length) {
    return ' class="' + text + '"';
  } else {
    return '';
  }
};


exports.style = function (val) {
  if (val && typeof val === 'object') {
    return Object.keys(val).map(function (style) {
      return style + ':' + val[style];
    }).join(';');
  } else {
    return val;
  }
};
/**
 * Render the given attribute.
 *
 * @param {String} key
 * @param {String} val
 * @param {Boolean} escaped
 * @param {Boolean} terse
 * @return {String}
 */
exports.attr = function attr(key, val, escaped, terse) {
  if (key === 'style') {
    val = exports.style(val);
  }
  if ('boolean' == typeof val || null == val) {
    if (val) {
      return ' ' + (terse ? key : key + '="' + key + '"');
    } else {
      return '';
    }
  } else if (0 == key.indexOf('data') && 'string' != typeof val) {
    if (JSON.stringify(val).indexOf('&') !== -1) {
      console.warn('Since Jade 2.0.0, ampersands (`&`) in data attributes ' +
                   'will be escaped to `&amp;`');
    };
    if (val && typeof val.toISOString === 'function') {
      console.warn('Jade will eliminate the double quotes around dates in ' +
                   'ISO form after 2.0.0');
    }
    return ' ' + key + "='" + JSON.stringify(val).replace(/'/g, '&apos;') + "'";
  } else if (escaped) {
    if (val && typeof val.toISOString === 'function') {
      console.warn('Jade will stringify dates in ISO form after 2.0.0');
    }
    return ' ' + key + '="' + exports.escape(val) + '"';
  } else {
    if (val && typeof val.toISOString === 'function') {
      console.warn('Jade will stringify dates in ISO form after 2.0.0');
    }
    return ' ' + key + '="' + val + '"';
  }
};

/**
 * Render the given attributes object.
 *
 * @param {Object} obj
 * @param {Object} escaped
 * @return {String}
 */
exports.attrs = function attrs(obj, terse){
  var buf = [];

  var keys = Object.keys(obj);

  if (keys.length) {
    for (var i = 0; i < keys.length; ++i) {
      var key = keys[i]
        , val = obj[key];

      if ('class' == key) {
        if (val = joinClasses(val)) {
          buf.push(' ' + key + '="' + val + '"');
        }
      } else {
        buf.push(exports.attr(key, val, false, terse));
      }
    }
  }

  return buf.join('');
};

/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @api private
 */

exports.escape = function escape(html){
  var result = String(html)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
  if (result === '' + html) return html;
  else return result;
};

/**
 * Re-throw the given `err` in context to the
 * the jade in `filename` at the given `lineno`.
 *
 * @param {Error} err
 * @param {String} filename
 * @param {String} lineno
 * @api private
 */

exports.rethrow = function rethrow(err, filename, lineno, str){
  if (!(err instanceof Error)) throw err;
  if ((typeof window != 'undefined' || !filename) && !str) {
    err.message += ' on line ' + lineno;
    throw err;
  }
  try {
    str = str || require('fs').readFileSync(filename, 'utf8')
  } catch (ex) {
    rethrow(err, null, lineno)
  }
  var context = 3
    , lines = str.split('\n')
    , start = Math.max(lineno - context, 0)
    , end = Math.min(lines.length, lineno + context);

  // Error context
  var context = lines.slice(start, end).map(function(line, i){
    var curr = i + start + 1;
    return (curr == lineno ? '  > ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'Jade') + ':' + lineno
    + '\n' + context + '\n\n' + err.message;
  throw err;
};

},{"fs":2}],2:[function(require,module,exports){

},{}]},{},[1])(1)
});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"fs":18}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVm9sdW1lcy9TdXBlck5vdmEvUGVyc29uYWxQcm9qZWN0cy9BcHBzL3lhYmJyL2NsaWVudC9tYWluLmpzIiwiL1ZvbHVtZXMvU3VwZXJOb3ZhL1BlcnNvbmFsUHJvamVjdHMvQXBwcy95YWJici9jbGllbnQvY29udHJvbGxlcnMvQ2FsY3VsYXRvckNvbnRyb2xsZXIuanMiLCIvVm9sdW1lcy9TdXBlck5vdmEvUGVyc29uYWxQcm9qZWN0cy9BcHBzL3lhYmJyL2NsaWVudC9kaXJlY3RpdmVzL2NhbGN1bGF0b3IuanMiLCIvVm9sdW1lcy9TdXBlck5vdmEvUGVyc29uYWxQcm9qZWN0cy9BcHBzL3lhYmJyL2NsaWVudC9kaXJlY3RpdmVzL2RlY2ltYWxCdXR0b24uanMiLCIvVm9sdW1lcy9TdXBlck5vdmEvUGVyc29uYWxQcm9qZWN0cy9BcHBzL3lhYmJyL2NsaWVudC9kaXJlY3RpdmVzL2VxdWF0ZUJ1dHRvbi5qcyIsIi9Wb2x1bWVzL1N1cGVyTm92YS9QZXJzb25hbFByb2plY3RzL0FwcHMveWFiYnIvY2xpZW50L2RpcmVjdGl2ZXMvbXV0YXRpb25CdXR0b24uanMiLCIvVm9sdW1lcy9TdXBlck5vdmEvUGVyc29uYWxQcm9qZWN0cy9BcHBzL3lhYmJyL2NsaWVudC9kaXJlY3RpdmVzL251bWJlckJ1dHRvbi5qcyIsIi9Wb2x1bWVzL1N1cGVyTm92YS9QZXJzb25hbFByb2plY3RzL0FwcHMveWFiYnIvY2xpZW50L2RpcmVjdGl2ZXMvbnVtYmVyVmlldy5qcyIsIi9Wb2x1bWVzL1N1cGVyTm92YS9QZXJzb25hbFByb2plY3RzL0FwcHMveWFiYnIvY2xpZW50L2RpcmVjdGl2ZXMvb3BlcmF0b3JCdXR0b24uanMiLCJjbGllbnQvZGlyZWN0aXZlcy92aWV3cy9jYWxjdWxhdG9yLmphZGUiLCJjbGllbnQvZGlyZWN0aXZlcy92aWV3cy9kZWNpbWFsQnV0dG9uLmphZGUiLCJjbGllbnQvZGlyZWN0aXZlcy92aWV3cy9lcXVhdGVCdXR0b24uamFkZSIsImNsaWVudC9kaXJlY3RpdmVzL3ZpZXdzL211dGF0aW9uQnV0dG9uLmphZGUiLCJjbGllbnQvZGlyZWN0aXZlcy92aWV3cy9udW1iZXJCdXR0b24uamFkZSIsImNsaWVudC9kaXJlY3RpdmVzL3ZpZXdzL251bWJlclZpZXcuamFkZSIsImNsaWVudC9kaXJlY3RpdmVzL3ZpZXdzL29wZXJhdG9yQnV0dG9uLmphZGUiLCIvVm9sdW1lcy9TdXBlck5vdmEvUGVyc29uYWxQcm9qZWN0cy9BcHBzL3lhYmJyL2NsaWVudC9tb2RlbHMvQ2FsY3VsYXRvck1vZGVsLmpzIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcmVzb2x2ZS9lbXB0eS5qcyIsIm5vZGVfbW9kdWxlcy9qYWRlL3J1bnRpbWUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7QUNhQSxJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7O0FBRWpDLElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLEVBQUUsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUFlOUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsWUFBVztBQUN0QyxTQUFPLE9BQU8sQ0FBQyw0QkFBNEIsQ0FBQyxDQUFBO0NBQzVDLENBQUMsQ0FBQztBQUNILEdBQUcsQ0FBQyxTQUFTLENBQUMsY0FBYyxFQUFFLFlBQVc7QUFDeEMsU0FBTyxPQUFPLENBQUMsOEJBQThCLENBQUMsQ0FBQTtDQUM5QyxDQUFDLENBQUM7QUFDSCxHQUFHLENBQUMsU0FBUyxDQUFDLGVBQWUsRUFBRSxZQUFXO0FBQ3pDLFNBQU8sT0FBTyxDQUFDLCtCQUErQixDQUFDLENBQUE7Q0FDL0MsQ0FBQyxDQUFDO0FBQ0gsR0FBRyxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsRUFB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QUVELE9BQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztHQUMvQjs7Ozs7U0FHSyxrQkFBRzs7O0FBR1IsT0FBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxFQUFFLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksRUFBRSxFQUFFO0FBQ3BELFFBQUksSUFBSSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3ZDLFFBQUksS0FBSyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3pDLFFBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLElBQUksR0FBRyxFQUFFO0FBQy9CLFNBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztBQUNsQixTQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUEsQ0FBRSxRQUFRLEVBQUUsQ0FBQztLQUM3QyxNQUFNLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLElBQUksR0FBRyxFQUFFO0FBQ3RDLFNBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztBQUNsQixTQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUEsQ0FBRSxRQUFRLEVBQUUsQ0FBQztLQUM3QyxNQUFNLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLElBQUksR0FBRyxFQUFFO0FBQ3RDLFNBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztBQUNsQixTQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUEsQ0FBRSxRQUFRLEVBQUUsQ0FBQztLQUM3QyxNQUFNLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLElBQUksR0FBRyxFQUFFO0FBQ3RDLFNBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztBQUNsQixTQUFJLENBQUMsS0FBSyxDQUFD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O0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDQUEsTUFBTSxDQUFDLE9BQU8sR0FDRixTQURXLGVBQWUsR0FDdkI7d0JBRFEsZUFBZTs7QUFFcEMsTUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUE7QUFDZCxNQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQTtBQUNmLE1BQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFBO0NBQ2xCLEFBQ0QsQ0FBQTs7O0FDZEQ7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlxuLy8gTGV0J3MgdGFsayBhYm91dCBOb2RlSlMuXG5cbi8qIFlvdSBtaWdodCBrbm93IGZyb20gSmF2YSBvciBDKysgdGhlIGBpbXBvcnRgIGFuZCBgI2luY2x1ZGVgIGtleXdvcmRzXG4gVGhvc2Uga2V5d29yZHMgd2lsbCBpbXBvcnQgdGhlIGZpbGUuXG4gSW4gTm9kZUpTLCB0aGUgZXF1aXZhbGVudCBvZiB0aGF0IGlzIFwicmVxdWlyZVwiXG4gXCJyZXF1aXJlXCIgd2lsbCBhY3R1YWxseSBydW4gdGhlIGZpbGUuXG5cbiBVbmxpa2UgaW4gSmF2YSBhbmQgQysrLCB5b3UgZG9uJ3QgaGF2ZSB0byBjYWxsIGByZXF1aXJlYCBhdCB0aGUgdG9wLlxuIFRvIGtlZXAgdGhlIGZsb3cgb2YgdGhlIGNvZGUsIEkndmUgdXNlZCB0aGUgYHJlcXVpcmVgIGluc2lkZSBmdW5jdGlvbnNcbiBhbmQgd2hlbiBkZWZpbmluZyBjb250cm9sbGVycyBhbmQgdmlld3MuXG4gKi9cblxudmFyIGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XG5cbnZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZShcImNhbGN1bGF0b3JBcHBcIiwgW10pO1xuXG4vLyBMZXQncyB0YWxrIGFib3V0IGFuZ3VsYXIgZm9yIGEgYml0LlxuLy8gQW5ndWxhciBoYW5kbGVzIGFsbCB0aHJlZSBvZiB0aGUgTS1WLUMuXG4vLyBUaGUgd2F5IGl0IGRvZXMgaXQgaXMga2luZCBvZiBjb25mdXNpbmcsIGJ1dCBJJ2xsIHRyeSBteSBiZXN0IHRvIGV4cGxhaW4uXG5cbi8vIFRoZSBcIlZpZXdcIiBpbiBhbmd1bGFyIGlzIGRlc2NyaWJlZCBieSBhIFwiRGlyZWN0aXZlXCJcbi8qIEEgXCJEaXJlY3RpdmVcIiB3aWxsIGRlc2NyaWJlIHRoZSB2aWV3LCBob3cgeW91IGNhbiB1c2UgaXQsXG4gd2hhdCBkYXRhIHlvdSBjYW4gcGFzcyB0byB0aGUgdmlldywgYW5kIHRoZSBodG1sL2phZGUgZmlsZSB1c2VkXG4gdG8gcmVuZGVyIGl0LlxuXG4gWW91IHdpbGwgc2VlIGluIHRoZSBkaXJlY3RpdmVzIGZvbGRlciB0aGF0IHRoZXJlIGlzXG4qL1xuXG4vLyBkZWZpbmUgZGlyZWN0aXZlc1xuYXBwLmRpcmVjdGl2ZShcImNhbGN1bGF0b3JcIiwgZnVuY3Rpb24oKSB7XG5cdHJldHVybiByZXF1aXJlKCcuL2RpcmVjdGl2ZXMvY2FsY3VsYXRvci5qcycpXG59KTtcbmFwcC5kaXJlY3RpdmUoXCJudW1iZXJCdXR0b25cIiwgZnVuY3Rpb24oKSB7XG5cdHJldHVybiByZXF1aXJlKCcuL2RpcmVjdGl2ZXMvbnVtYmVyQnV0dG9uLmpzJylcbn0pO1xuYXBwLmRpcmVjdGl2ZShcImRlY2ltYWxCdXR0b25cIiwgZnVuY3Rpb24oKSB7XG5cdHJldHVybiByZXF1aXJlKCcuL2RpcmVjdGl2ZXMvZGVjaW1hbEJ1dHRvbi5qcycpXG59KTtcbmFwcC5kaXJlY3RpdmUoXCJvcGVyYXRvckJ1dHRvblwiLCBmdW5jdGlvbigpIHtcblx0cmV0dXJuIHJlcXVpcmUoJy4vZGlyZWN0aXZlcy9vcGVyYXRvckJ1dHRvbi5qcycpXG59KTtcbmFwcC5kaXJlY3RpdmUoXCJlcXVhdGVCdXR0b25cIiwgZnVuY3Rpb24oKSB7XG5cdHJldHVybiByZXF1aXJlKCcuL2RpcmVjdGl2ZXMvZXF1YXRlQnV0dG9uLmpzJylcbn0pO1xuYXBwLmRpcmVjdGl2ZShcIm11dGF0aW9uQnV0dG9uXCIsIGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gcmVxdWlyZSgnLi9kaXJlY3RpdmVzL211dGF0aW9uQnV0dG9uLmpzJylcbn0pO1xuYXBwLmRpcmVjdGl2ZShcIm51bWJlclZpZXdcIiwgZnVuY3Rpb24oKSB7XG5cdHJldHVybiByZXF1aXJlKCcuL2RpcmVjdGl2ZXMvbnVtYmVyVmlldy5qcycpXG59KTtcblxuLy8gZGVmaW5lIGNvbnRyb2xsZXJzXG5hcHAuY29udHJvbGxlcihcIkNhbGN1bGF0b3JDb250cm9sbGVyXCIsXG5cdHJlcXVpcmUoJy4vY29udHJvbGxlcnMvQ2FsY3VsYXRvckNvbnRyb2xsZXIuanMnKVxuKTtcbiIsIlxudmFyIENhbGN1bGF0b3JNb2RlbCA9IHJlcXVpcmUoJy4uL21vZGVscy9DYWxjdWxhdG9yTW9kZWwuanMnKTtcblxuLyoqXG4gKiBDYWxjdWxhdG9yIENvbnRyb2xsZXJcbiAqIC0tLS0tLS0tLS0tLS0tLS1cbiAqIENhbGN1bGF0b3IgY29udHJvbGxlciBmb3IgTVZDXG4gKlxuICoqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNsYXNzIENhbGN1bGF0b3JDb250cm9sbGVyIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0Ly8gRGVmaW5lIGluc3RhbmNlIHZhcmlhYmxlc1xuXHRcdHRoaXMubW9kZWwgPSBuZXcgQ2FsY3VsYXRvck1vZGVsKCk7XG5cdFx0dGhpcy5pbnNlcnRpbmdEZWNpbWFsID0gZmFsc2Vcblx0fVxuXG5cdHJlc2V0TW9kZWwoKSB7XG5cdFx0dGhpcy5tb2RlbCA9IG5ldyBDYWxjdWxhdG9yTW9kZWwoKTtcblx0XHR0aGlzLmluc2VydGluZ0RlY2ltYWwgPSBmYWxzZTtcblx0fVxuXG5cdGluc2VydE51bWJlcihudW1iZXIpIHtcblx0XHRpZiAodGhpcy5tb2RlbC5sZWZ0ICE9ICcnICYmIHRoaXMubW9kZWwucmlnaHQgPT0gJycgJiYgdGhpcy5tb2RlbC5vcGVyYXRvciA9PSAnJykge1xuXHRcdFx0dGhpcy5yZXNldE1vZGVsKCk7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMubW9kZWwucmlnaHQgPT0gJzAnKSB7XG5cdFx0XHR0aGlzLm1vZGVsLnJpZ2h0ID0gJyc7XG5cdFx0fVxuXG5cdFx0dGhpcy5tb2RlbC5yaWdodCArPSBudW1iZXIudG9TdHJpbmcoKTtcblx0fVxuXG5cdGluc2VydERlY2ltYWwoKSB7XG5cdFx0aWYgKHRoaXMuaW5zZXJ0aW5nRGVjaW1hbCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLm1vZGVsLmxlZnQgIT0gJycgJiYgdGhpcy5tb2RlbC5yaWdodCA9PSAnJyAmJiB0aGlzLm1vZGVsLm9wZXJhdG9yID09ICcnKSB7XG5cdFx0XHR0aGlzLnJlc2V0TW9kZWwoKTtcblx0XHR9XG5cblx0XHR0aGlzLm1vZGVsLnJpZ2h0ICs9ICcuJztcblxuXHRcdHRoaXMuaW5zZXJ0aW5nRGVjaW1hbCA9IHRydWU7XG5cdH1cblxuXHRpbnNlcnRPcGVyYXRvcihvcGVyYXRvcikge1xuXHRcdHRoaXMuZXF1YXRlKCk7XG5cblx0XHRpZiAodGhpcy5tb2RlbC5sZWZ0ID09ICcnICYmIHRoaXMubW9kZWwub3BlcmF0b3IgPT0gJycgJiYgdGhpcy5tb2RlbC5yaWdodCAhPSAnJykge1xuXHRcdFx0dGhpcy5tb2RlbC5sZWZ0ID0gdGhpcy5tb2RlbC5yaWdodDtcblx0XHRcdHRoaXMubW9kZWwucmlnaHQgPSAnJztcblx0XHR9XG5cblx0XHRpZiAodGhpcy5tb2RlbC5sZWZ0ID09ICcnKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0dGhpcy5tb2RlbC5vcGVyYXRvciA9IG9wZXJhdG9yO1xuXHR9XG5cblx0Ly8gQ2FsY3VsYXRlIHRoZSBjdXJyZW50IG9wZXJhdGlvbi5cblx0ZXF1YXRlKCkge1xuXG5cdFx0Ly8gV2UgaGF2ZSBvcGVyYW5kcywgbm93IGVxdWF0ZSBmb3IgdGhlIGNvcnJlc3BvbmRpbmcgb3BlcmF0b3IuXG5cdFx0aWYgKHRoaXMubW9kZWwubGVmdCAhPSAnJyAmJiB0aGlzLm1vZGVsLnJpZ2h0ICE9ICcnKSB7XG5cdFx0XHR2YXIgbGVmdCA9IHBhcnNlRmxvYXQodGhpcy5tb2RlbC5sZWZ0KTtcblx0XHRcdHZhciByaWdodCA9IHBhcnNlRmxvYXQodGhpcy5tb2RlbC5yaWdodCk7XG5cdFx0XHRpZiAodGhpcy5tb2RlbC5vcGVyYXRvciA9PSAnKycpIHtcblx0XHRcdFx0dGhpcy5yZXNldE1vZGVsKCk7XG5cdFx0XHRcdHRoaXMubW9kZWwucmlnaHQgPSAobGVmdCArIHJpZ2h0KS50b1N0cmluZygpO1xuXHRcdFx0fSBlbHNlIGlmICh0aGlzLm1vZGVsLm9wZXJhdG9yID09ICctJykge1xuXHRcdFx0XHR0aGlzLnJlc2V0TW9kZWwoKTtcblx0XHRcdFx0dGhpcy5tb2RlbC5yaWdodCA9IChsZWZ0IC0gcmlnaHQpLnRvU3RyaW5nKCk7XG5cdFx0XHR9IGVsc2UgaWYgKHRoaXMubW9kZWwub3BlcmF0b3IgPT0gJ3gnKSB7XG5cdFx0XHRcdHRoaXMucmVzZXRNb2RlbCgpO1xuXHRcdFx0XHR0aGlzLm1vZGVsLnJpZ2h0ID0gKGxlZnQgKiByaWdodCkudG9TdHJpbmcoKTtcblx0XHRcdH0gZWxzZSBpZiAodGhpcy5tb2RlbC5vcGVyYXRvciA9PSAnLycpIHtcblx0XHRcdFx0dGhpcy5yZXNldE1vZGVsKCk7XG5cdFx0XHRcdHRoaXMubW9kZWwucmlnaHQgPSAobGVmdCAvIHJpZ2h0KS50b1N0cmluZygpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHRoaXMuaW5zZXJ0aW5nRGVjaW1hbCA9IGZhbHNlO1xuXHR9XG5cblx0bXV0YXRvclNpbigpIHtcblx0XHR0aGlzLmVxdWF0ZSgpO1xuXG5cdFx0aWYgKHRoaXMubW9kZWwucmlnaHQgPT0gJycpIHJldHVybjtcblxuXHRcdHRoaXMubW9kZWwucmlnaHQgPSBNYXRoLnNpbihwYXJzZUZsb2F0KHRoaXMubW9kZWwucmlnaHQpKS50b1N0cmluZygpO1xuXHR9XG5cblx0bXV0YXRvckNvcygpIHtcblx0XHR0aGlzLmVxdWF0ZSgpO1xuXG5cdFx0aWYgKHRoaXMubW9kZWwucmlnaHQgPT0gJycpIHJldHVybjtcblxuXHRcdHRoaXMubW9kZWwucmlnaHQgPSBNYXRoLmNvcyhwYXJzZUZsb2F0KHRoaXMubW9kZWwucmlnaHQpKS50b1N0cmluZygpO1xuXHR9XG5cblx0ZmxpcFNpZ24oKSB7XG5cdFx0aWYgKHRoaXMubW9kZWwucmlnaHQgPT0gJycpIHJldHVybjtcblxuXHRcdHRoaXMubW9kZWwucmlnaHQgPSAoLTEgKiBwYXJzZUZsb2F0KHRoaXMubW9kZWwucmlnaHQpKS50b1N0cmluZygpO1xuXHR9XG5cbn07XG4iLCJcbi8vIERpcmVjdGl2ZXMgXCJkZXNjcmliZVwiIHRoZSB2aWV3IGFuZCBsaW5rIHRvIGl0LlxubW9kdWxlLmV4cG9ydHMgPSB7XG5cdHJlc3RyaWN0OiAnRScsXG5cdHRlbXBsYXRlOiByZXF1aXJlKCcuL3ZpZXdzL2NhbGN1bGF0b3IuamFkZScpKCksXG5cdGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuXHRcdC8vIEtleXByZXNzZXMgZW11bGF0ZSB0aGUgYnV0dG9uIHByZXNzZXMgYW5kIGNhbGxzIHRoZSBjb250cm9sbGVyLlxuXHRcdGFuZ3VsYXIuZWxlbWVudChkb2N1bWVudCkuYmluZCgna2V5ZG93bicsIGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0XHRzY29wZS4kYXBwbHkoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHN3aXRjaCAoZXZlbnQud2hpY2gpIHtcblx0XHRcdFx0XHRjYXNlIDQ4OlxuXHRcdFx0XHRcdFx0c2NvcGUuY2FsY3VsYXRvckNvbnRyb2xsZXIuaW5zZXJ0TnVtYmVyKCcwJyk7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlIDQ5OlxuXHRcdFx0XHRcdFx0c2NvcGUuY2FsY3VsYXRvckNvbnRyb2xsZXIuaW5zZXJ0TnVtYmVyKCcxJyk7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlIDUwOlxuXHRcdFx0XHRcdFx0c2NvcGUuY2FsY3VsYXRvckNvbnRyb2xsZXIuaW5zZXJ0TnVtYmVyKCcyJyk7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlIDUxOlxuXHRcdFx0XHRcdFx0c2NvcGUuY2FsY3VsYXRvckNvbnRyb2xsZXIuaW5zZXJ0TnVtYmVyKCczJyk7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlIDUyOlxuXHRcdFx0XHRcdFx0c2NvcGUuY2FsY3VsYXRvckNvbnRyb2xsZXIuaW5zZXJ0TnVtYmVyKCc0Jyk7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlIDUzOlxuXHRcdFx0XHRcdFx0c2NvcGUuY2FsY3VsYXRvckNvbnRyb2xsZXIuaW5zZXJ0TnVtYmVyKCc1Jyk7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlIDU0OlxuXHRcdFx0XHRcdFx0c2NvcGUuY2FsY3VsYXRvckNvbnRyb2xsZXIuaW5zZXJ0TnVtYmVyKCc2Jyk7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlIDU1OlxuXHRcdFx0XHRcdFx0c2NvcGUuY2FsY3VsYXRvckNvbnRyb2xsZXIuaW5zZXJ0TnVtYmVyKCc3Jyk7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlIDU2OlxuXHRcdFx0XHRcdFx0aWYgKGV2ZW50LnNoaWZ0S2V5KSB7XG5cdFx0XHRcdFx0XHRcdHNjb3BlLmNhbGN1bGF0b3JDb250cm9sbGVyLmluc2VydE9wZXJhdG9yKCd4Jylcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRzY29wZS5jYWxjdWxhdG9yQ29udHJvbGxlci5pbnNlcnROdW1iZXIoJzgnKTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgNTc6XG5cdFx0XHRcdFx0XHRzY29wZS5jYWxjdWxhdG9yQ29udHJvbGxlci5pbnNlcnROdW1iZXIoJzknKTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgMTkwOlxuXHRcdFx0XHRcdFx0c2NvcGUuY2FsY3VsYXRvckNvbnRyb2xsZXIuaW5zZXJ0RGVjaW1hbCgpO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSA4OlxuXHRcdFx0XHRcdFx0aWYgKCFldmVudC5zaGlmdEtleSkge1xuXHRcdFx0XHRcdFx0XHRzY29wZS5jYWxjdWxhdG9yQ29udHJvbGxlci5yZXNldE1vZGVsKCk7XG5cdFx0XHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlIDEzOlxuXHRcdFx0XHRcdFx0c2NvcGUuY2FsY3VsYXRvckNvbnRyb2xsZXIuZXF1YXRlKCk7XG5cdFx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSAxODc6XG5cdFx0XHRcdFx0XHRpZiAoZXZlbnQuc2hpZnRLZXkpIHtcblx0XHRcdFx0XHRcdFx0c2NvcGUuY2FsY3VsYXRvckNvbnRyb2xsZXIuaW5zZXJ0T3BlcmF0b3IoJysnKVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSAxODk6XG5cdFx0XHRcdFx0XHRzY29wZS5jYWxjdWxhdG9yQ29udHJvbGxlci5pbnNlcnRPcGVyYXRvcignLScpXG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlIDE5MTpcblx0XHRcdFx0XHRcdHNjb3BlLmNhbGN1bGF0b3JDb250cm9sbGVyLmluc2VydE9wZXJhdG9yKCcvJylcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9KVxuXHRcdH0pXG5cdH1cbn07XG4iLCJcbi8vIERpcmVjdGl2ZXMgXCJkZXNjcmliZVwiIHRoZSB2aWV3IGFuZCBsaW5rIHRvIGl0LlxubW9kdWxlLmV4cG9ydHMgPSB7XG5cdHJlc3RyaWN0OiAnRScsXG5cdHRlbXBsYXRlOiByZXF1aXJlKCcuL3ZpZXdzL2RlY2ltYWxCdXR0b24uamFkZScpKClcbn07XG4iLCJcbi8vIERpcmVjdGl2ZXMgXCJkZXNjcmliZVwiIHRoZSB2aWV3IGFuZCBsaW5rIHRvIGl0LlxubW9kdWxlLmV4cG9ydHMgPSB7XG5cdHJlc3RyaWN0OiAnRScsXG5cdHRlbXBsYXRlOiByZXF1aXJlKCcuL3ZpZXdzL2VxdWF0ZUJ1dHRvbi5qYWRlJykoKVxufTtcbiIsIlxuLy8gRGlyZWN0aXZlcyBcImRlc2NyaWJlXCIgdGhlIHZpZXcgYW5kIGxpbmsgdG8gaXQuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0cmVzdHJpY3Q6ICdFJyxcblx0c2NvcGU6IHtcblx0XHRuYW1lOiAnQCcsXG5cdFx0bXV0YXRvcjogJyYnXG5cdH0sXG5cdHRlbXBsYXRlOiByZXF1aXJlKCcuL3ZpZXdzL211dGF0aW9uQnV0dG9uLmphZGUnKSgpXG59O1xuIiwiXG4vLyBEaXJlY3RpdmVzIFwiZGVzY3JpYmVcIiB0aGUgdmlldyBhbmQgbGluayB0byBpdC5cbm1vZHVsZS5leHBvcnRzID0ge1xuXHRyZXN0cmljdDogJ0UnLFxuXHRzY29wZToge1xuXHRcdG51bWJlcjogJ0AnXG5cdH0sXG5cdHRlbXBsYXRlOiByZXF1aXJlKCcuL3ZpZXdzL251bWJlckJ1dHRvbi5qYWRlJykoKVxufTtcbiIsIlxuLy8gRGlyZWN0aXZlcyBcImRlc2NyaWJlXCIgdGhlIHZpZXcgYW5kIGxpbmsgdG8gaXQuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0cmVzdHJpY3Q6ICdFJyxcblx0c2NvcGU6IHtcblx0XHRtb2RlbDogJz0nXG5cdH0sXG5cdHRlbXBsYXRlOiByZXF1aXJlKCcuL3ZpZXdzL251bWJlclZpZXcuamFkZScpKClcbn07XG4iLCJcbi8vIERpcmVjdGl2ZXMgXCJkZXNjcmliZVwiIHRoZSB2aWV3IGFuZCBsaW5rIHRvIGl0LlxubW9kdWxlLmV4cG9ydHMgPSB7XG5cdHJlc3RyaWN0OiAnRScsXG5cdHNjb3BlOiB7XG5cdFx0b3BlcmF0b3I6ICdAJ1xuXHR9LFxuXHR0ZW1wbGF0ZTogcmVxdWlyZSgnLi92aWV3cy9vcGVyYXRvckJ1dHRvbi5qYWRlJykoKVxufTtcbiIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuXG5idWYucHVzaChcIjxudW1iZXItdmlldyBtb2RlbD1cXFwiY2FsY3VsYXRvckNvbnRyb2xsZXIubW9kZWxcXFwiPjwvbnVtYmVyLXZpZXc+PGRpdiBjbGFzcz1cXFwicm93XFxcIj48ZGl2IGNsYXNzPVxcXCJzaXggY29sdW1uc1xcXCI+PGRpdiBjbGFzcz1cXFwicm93XFxcIj48ZGl2IGNsYXNzPVxcXCJmb3VyIGNvbHVtbnNcXFwiPjxudW1iZXItYnV0dG9uIG51bWJlcj1cXFwiMVxcXCI+PC9udW1iZXItYnV0dG9uPjwvZGl2PjxkaXYgY2xhc3M9XFxcImZvdXIgY29sdW1uc1xcXCI+PG51bWJlci1idXR0b24gbnVtYmVyPVxcXCIyXFxcIj48L251bWJlci1idXR0b24+PC9kaXY+PGRpdiBjbGFzcz1cXFwiZm91ciBjb2x1bW5zXFxcIj48bnVtYmVyLWJ1dHRvbiBudW1iZXI9XFxcIjNcXFwiPjwvbnVtYmVyLWJ1dHRvbj48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPjxkaXYgY2xhc3M9XFxcImZvdXIgY29sdW1uc1xcXCI+PG51bWJlci1idXR0b24gbnVtYmVyPVxcXCI0XFxcIj48L251bWJlci1idXR0b24+PC9kaXY+PGRpdiBjbGFzcz1cXFwiZm91ciBjb2x1bW5zXFxcIj48bnVtYmVyLWJ1dHRvbiBudW1iZXI9XFxcIjVcXFwiPjwvbnVtYmVyLWJ1dHRvbj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJmb3VyIGNvbHVtbnNcXFwiPjxudW1iZXItYnV0dG9uIG51bWJlcj1cXFwiNlxcXCI+PC9udW1iZXItYnV0dG9uPjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9XFxcInJvd1xcXCI+PGRpdiBjbGFzcz1cXFwiZm91ciBjb2x1bW5zXFxcIj48bnVtYmVyLWJ1dHRvbiBudW1iZXI9XFxcIjdcXFwiPjwvbnVtYmVyLWJ1dHRvbj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJmb3VyIGNvbHVtbnNcXFwiPjxudW1iZXItYnV0dG9uIG51bWJlcj1cXFwiOFxcXCI+PC9udW1iZXItYnV0dG9uPjwvZGl2PjxkaXYgY2xhc3M9XFxcImZvdXIgY29sdW1uc1xcXCI+PG51bWJlci1idXR0b24gbnVtYmVyPVxcXCI5XFxcIj48L251bWJlci1idXR0b24+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz1cXFwicm93XFxcIj48ZGl2IGNsYXNzPVxcXCJmb3VyIGNvbHVtbnNcXFwiPjxkZWNpbWFsLWJ1dHRvbj48L2RlY2ltYWwtYnV0dG9uPjwvZGl2PjxkaXYgY2xhc3M9XFxcImZvdXIgY29sdW1uc1xcXCI+PG51bWJlci1idXR0b24gbnVtYmVyPVxcXCIwXFxcIj48L251bWJlci1idXR0b24+PC9kaXY+PGRpdiBjbGFzcz1cXFwiZm91ciBjb2x1bW5zXFxcIj48ZXF1YXRlLWJ1dHRvbj48L2VxdWF0ZS1idXR0b24+PC9kaXY+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz1cXFwidHdvIGNvbHVtbnNcXFwiPjxvcGVyYXRvci1idXR0b24gb3BlcmF0b3I9XFxcIitcXFwiPjwvb3BlcmF0b3ItYnV0dG9uPjxvcGVyYXRvci1idXR0b24gb3BlcmF0b3I9XFxcIi1cXFwiPjwvb3BlcmF0b3ItYnV0dG9uPjxvcGVyYXRvci1idXR0b24gb3BlcmF0b3I9XFxcInhcXFwiPjwvb3BlcmF0b3ItYnV0dG9uPjxvcGVyYXRvci1idXR0b24gb3BlcmF0b3I9XFxcIi9cXFwiPjwvb3BlcmF0b3ItYnV0dG9uPjwvZGl2PjxkaXYgY2xhc3M9XFxcImZvdXIgY29sdW1uc1xcXCI+PG11dGF0aW9uLWJ1dHRvbiBuYW1lPVxcXCJDbGVhclxcXCIgbXV0YXRvcj1cXFwiY2FsY3VsYXRvckNvbnRyb2xsZXIucmVzZXRNb2RlbCgpXFxcIj48L211dGF0aW9uLWJ1dHRvbj48bXV0YXRpb24tYnV0dG9uIG5hbWU9XFxcIlNpblxcXCIgbXV0YXRvcj1cXFwiY2FsY3VsYXRvckNvbnRyb2xsZXIubXV0YXRvclNpbigpXFxcIj48L211dGF0aW9uLWJ1dHRvbj48bXV0YXRpb24tYnV0dG9uIG5hbWU9XFxcIkNvc1xcXCIgbXV0YXRvcj1cXFwiY2FsY3VsYXRvckNvbnRyb2xsZXIubXV0YXRvckNvcygpXFxcIj48L211dGF0aW9uLWJ1dHRvbj48bXV0YXRpb24tYnV0dG9uIG5hbWU9XFxcIisvLVxcXCIgbXV0YXRvcj1cXFwiY2FsY3VsYXRvckNvbnRyb2xsZXIuZmxpcFNpZ24oKVxcXCI+PC9tdXRhdGlvbi1idXR0b24+PC9kaXY+PC9kaXY+XCIpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuXG5idWYucHVzaChcIjxhIG5nLWNsaWNrPVxcXCJjYWxjdWxhdG9yQ29udHJvbGxlci5pbnNlcnREZWNpbWFsKClcXFwiIGNsYXNzPVxcXCJidXR0b24gYnV0dG9uLXByaW1hcnkgdS1mdWxsLXdpZHRoIG5vLXBhZGRpbmdcXFwiPi48L2E+XCIpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuXG5idWYucHVzaChcIjxhIG5nLWNsaWNrPVxcXCJjYWxjdWxhdG9yQ29udHJvbGxlci5lcXVhdGUoKVxcXCIgY2xhc3M9XFxcImJ1dHRvbiBidXR0b24tcHJpbWFyeSB1LWZ1bGwtd2lkdGggbm8tcGFkZGluZ1xcXCI+PTwvYT5cIik7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG5cbmJ1Zi5wdXNoKFwiPGEgbmctY2xpY2s9XFxcIm11dGF0b3IoKVxcXCIgY2xhc3M9XFxcImJ1dHRvbiB1LWZ1bGwtd2lkdGggbm8tcGFkZGluZ1xcXCI+e3sgbmFtZSB9fTwvYT5cIik7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG5cbmJ1Zi5wdXNoKFwiPGEgbmctY2xpY2s9XFxcIiRwYXJlbnQuY2FsY3VsYXRvckNvbnRyb2xsZXIuaW5zZXJ0TnVtYmVyKG51bWJlcilcXFwiIGNsYXNzPVxcXCJidXR0b24gdS1mdWxsLXdpZHRoIG5vLXBhZGRpbmdcXFwiPnt7IG51bWJlciB9fTwvYT5cIik7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG5cbmJ1Zi5wdXNoKFwie3ttb2RlbC5sZWZ0fX0ge3ttb2RlbC5vcGVyYXRvcn19IHt7bW9kZWwucmlnaHR9fVwiKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcblxuYnVmLnB1c2goXCI8YSBuZy1jbGljaz1cXFwiJHBhcmVudC5jYWxjdWxhdG9yQ29udHJvbGxlci5pbnNlcnRPcGVyYXRvcihvcGVyYXRvcilcXFwiIGNsYXNzPVxcXCJidXR0b24gdS1mdWxsLXdpZHRoIG5vLXBhZGRpbmdcXFwiPnt7IG9wZXJhdG9yIH19PC9hPlwiKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJcbi8qKlxuICogQ2FsY3VsYXRvciBNb2RlbFxuICogLS0tLS0tLS0tLS0tLS0tLVxuICogU2ltcGxlIGNhbGN1bGF0b3IgbW9kZWwgZm9yIE1WQ1xuICpcbiAqKi9cblxubW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBDYWxjdWxhdG9yTW9kZWwge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHR0aGlzLmxlZnQgPSAnJ1xuXHRcdHRoaXMucmlnaHQgPSAnJ1xuXHRcdHRoaXMub3BlcmF0b3IgPSAnJ1xuXHR9XG59IixudWxsLCIhZnVuY3Rpb24oZSl7aWYoXCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHMmJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBtb2R1bGUpbW9kdWxlLmV4cG9ydHM9ZSgpO2Vsc2UgaWYoXCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kKWRlZmluZShbXSxlKTtlbHNle3ZhciBmO1widW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/Zj13aW5kb3c6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIGdsb2JhbD9mPWdsb2JhbDpcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZiYmKGY9c2VsZiksZi5qYWRlPWUoKX19KGZ1bmN0aW9uKCl7dmFyIGRlZmluZSxtb2R1bGUsZXhwb3J0cztyZXR1cm4gKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkoezE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIE1lcmdlIHR3byBhdHRyaWJ1dGUgb2JqZWN0cyBnaXZpbmcgcHJlY2VkZW5jZVxuICogdG8gdmFsdWVzIGluIG9iamVjdCBgYmAuIENsYXNzZXMgYXJlIHNwZWNpYWwtY2FzZWRcbiAqIGFsbG93aW5nIGZvciBhcnJheXMgYW5kIG1lcmdpbmcvam9pbmluZyBhcHByb3ByaWF0ZWx5XG4gKiByZXN1bHRpbmcgaW4gYSBzdHJpbmcuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGFcbiAqIEBwYXJhbSB7T2JqZWN0fSBiXG4gKiBAcmV0dXJuIHtPYmplY3R9IGFcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMubWVyZ2UgPSBmdW5jdGlvbiBtZXJnZShhLCBiKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgdmFyIGF0dHJzID0gYVswXTtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGEubGVuZ3RoOyBpKyspIHtcbiAgICAgIGF0dHJzID0gbWVyZ2UoYXR0cnMsIGFbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gYXR0cnM7XG4gIH1cbiAgdmFyIGFjID0gYVsnY2xhc3MnXTtcbiAgdmFyIGJjID0gYlsnY2xhc3MnXTtcblxuICBpZiAoYWMgfHwgYmMpIHtcbiAgICBhYyA9IGFjIHx8IFtdO1xuICAgIGJjID0gYmMgfHwgW107XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGFjKSkgYWMgPSBbYWNdO1xuICAgIGlmICghQXJyYXkuaXNBcnJheShiYykpIGJjID0gW2JjXTtcbiAgICBhWydjbGFzcyddID0gYWMuY29uY2F0KGJjKS5maWx0ZXIobnVsbHMpO1xuICB9XG5cbiAgZm9yICh2YXIga2V5IGluIGIpIHtcbiAgICBpZiAoa2V5ICE9ICdjbGFzcycpIHtcbiAgICAgIGFba2V5XSA9IGJba2V5XTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYTtcbn07XG5cbi8qKlxuICogRmlsdGVyIG51bGwgYHZhbGBzLlxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gbnVsbHModmFsKSB7XG4gIHJldHVybiB2YWwgIT0gbnVsbCAmJiB2YWwgIT09ICcnO1xufVxuXG4vKipcbiAqIGpvaW4gYXJyYXkgYXMgY2xhc3Nlcy5cbiAqXG4gKiBAcGFyYW0geyp9IHZhbFxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmpvaW5DbGFzc2VzID0gam9pbkNsYXNzZXM7XG5mdW5jdGlvbiBqb2luQ2xhc3Nlcyh2YWwpIHtcbiAgcmV0dXJuIChBcnJheS5pc0FycmF5KHZhbCkgPyB2YWwubWFwKGpvaW5DbGFzc2VzKSA6XG4gICAgKHZhbCAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0JykgPyBPYmplY3Qua2V5cyh2YWwpLmZpbHRlcihmdW5jdGlvbiAoa2V5KSB7IHJldHVybiB2YWxba2V5XTsgfSkgOlxuICAgIFt2YWxdKS5maWx0ZXIobnVsbHMpLmpvaW4oJyAnKTtcbn1cblxuLyoqXG4gKiBSZW5kZXIgdGhlIGdpdmVuIGNsYXNzZXMuXG4gKlxuICogQHBhcmFtIHtBcnJheX0gY2xhc3Nlc1xuICogQHBhcmFtIHtBcnJheS48Qm9vbGVhbj59IGVzY2FwZWRcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0cy5jbHMgPSBmdW5jdGlvbiBjbHMoY2xhc3NlcywgZXNjYXBlZCkge1xuICB2YXIgYnVmID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY2xhc3Nlcy5sZW5ndGg7IGkrKykge1xuICAgIGlmIChlc2NhcGVkICYmIGVzY2FwZWRbaV0pIHtcbiAgICAgIGJ1Zi5wdXNoKGV4cG9ydHMuZXNjYXBlKGpvaW5DbGFzc2VzKFtjbGFzc2VzW2ldXSkpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYnVmLnB1c2goam9pbkNsYXNzZXMoY2xhc3Nlc1tpXSkpO1xuICAgIH1cbiAgfVxuICB2YXIgdGV4dCA9IGpvaW5DbGFzc2VzKGJ1Zik7XG4gIGlmICh0ZXh0Lmxlbmd0aCkge1xuICAgIHJldHVybiAnIGNsYXNzPVwiJyArIHRleHQgKyAnXCInO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAnJztcbiAgfVxufTtcblxuXG5leHBvcnRzLnN0eWxlID0gZnVuY3Rpb24gKHZhbCkge1xuICBpZiAodmFsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHZhbCkubWFwKGZ1bmN0aW9uIChzdHlsZSkge1xuICAgICAgcmV0dXJuIHN0eWxlICsgJzonICsgdmFsW3N0eWxlXTtcbiAgICB9KS5qb2luKCc7Jyk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHZhbDtcbiAgfVxufTtcbi8qKlxuICogUmVuZGVyIHRoZSBnaXZlbiBhdHRyaWJ1dGUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGtleVxuICogQHBhcmFtIHtTdHJpbmd9IHZhbFxuICogQHBhcmFtIHtCb29sZWFufSBlc2NhcGVkXG4gKiBAcGFyYW0ge0Jvb2xlYW59IHRlcnNlXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydHMuYXR0ciA9IGZ1bmN0aW9uIGF0dHIoa2V5LCB2YWwsIGVzY2FwZWQsIHRlcnNlKSB7XG4gIGlmIChrZXkgPT09ICdzdHlsZScpIHtcbiAgICB2YWwgPSBleHBvcnRzLnN0eWxlKHZhbCk7XG4gIH1cbiAgaWYgKCdib29sZWFuJyA9PSB0eXBlb2YgdmFsIHx8IG51bGwgPT0gdmFsKSB7XG4gICAgaWYgKHZhbCkge1xuICAgICAgcmV0dXJuICcgJyArICh0ZXJzZSA/IGtleSA6IGtleSArICc9XCInICsga2V5ICsgJ1wiJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gIH0gZWxzZSBpZiAoMCA9PSBrZXkuaW5kZXhPZignZGF0YScpICYmICdzdHJpbmcnICE9IHR5cGVvZiB2YWwpIHtcbiAgICBpZiAoSlNPTi5zdHJpbmdpZnkodmFsKS5pbmRleE9mKCcmJykgIT09IC0xKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ1NpbmNlIEphZGUgMi4wLjAsIGFtcGVyc2FuZHMgKGAmYCkgaW4gZGF0YSBhdHRyaWJ1dGVzICcgK1xuICAgICAgICAgICAgICAgICAgICd3aWxsIGJlIGVzY2FwZWQgdG8gYCZhbXA7YCcpO1xuICAgIH07XG4gICAgaWYgKHZhbCAmJiB0eXBlb2YgdmFsLnRvSVNPU3RyaW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0phZGUgd2lsbCBlbGltaW5hdGUgdGhlIGRvdWJsZSBxdW90ZXMgYXJvdW5kIGRhdGVzIGluICcgK1xuICAgICAgICAgICAgICAgICAgICdJU08gZm9ybSBhZnRlciAyLjAuMCcpO1xuICAgIH1cbiAgICByZXR1cm4gJyAnICsga2V5ICsgXCI9J1wiICsgSlNPTi5zdHJpbmdpZnkodmFsKS5yZXBsYWNlKC8nL2csICcmYXBvczsnKSArIFwiJ1wiO1xuICB9IGVsc2UgaWYgKGVzY2FwZWQpIHtcbiAgICBpZiAodmFsICYmIHR5cGVvZiB2YWwudG9JU09TdHJpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNvbnNvbGUud2FybignSmFkZSB3aWxsIHN0cmluZ2lmeSBkYXRlcyBpbiBJU08gZm9ybSBhZnRlciAyLjAuMCcpO1xuICAgIH1cbiAgICByZXR1cm4gJyAnICsga2V5ICsgJz1cIicgKyBleHBvcnRzLmVzY2FwZSh2YWwpICsgJ1wiJztcbiAgfSBlbHNlIHtcbiAgICBpZiAodmFsICYmIHR5cGVvZiB2YWwudG9JU09TdHJpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNvbnNvbGUud2FybignSmFkZSB3aWxsIHN0cmluZ2lmeSBkYXRlcyBpbiBJU08gZm9ybSBhZnRlciAyLjAuMCcpO1xuICAgIH1cbiAgICByZXR1cm4gJyAnICsga2V5ICsgJz1cIicgKyB2YWwgKyAnXCInO1xuICB9XG59O1xuXG4vKipcbiAqIFJlbmRlciB0aGUgZ2l2ZW4gYXR0cmlidXRlcyBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHBhcmFtIHtPYmplY3R9IGVzY2FwZWRcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0cy5hdHRycyA9IGZ1bmN0aW9uIGF0dHJzKG9iaiwgdGVyc2Upe1xuICB2YXIgYnVmID0gW107XG5cbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuXG4gIGlmIChrZXlzLmxlbmd0aCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgdmFyIGtleSA9IGtleXNbaV1cbiAgICAgICAgLCB2YWwgPSBvYmpba2V5XTtcblxuICAgICAgaWYgKCdjbGFzcycgPT0ga2V5KSB7XG4gICAgICAgIGlmICh2YWwgPSBqb2luQ2xhc3Nlcyh2YWwpKSB7XG4gICAgICAgICAgYnVmLnB1c2goJyAnICsga2V5ICsgJz1cIicgKyB2YWwgKyAnXCInKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnVmLnB1c2goZXhwb3J0cy5hdHRyKGtleSwgdmFsLCBmYWxzZSwgdGVyc2UpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gYnVmLmpvaW4oJycpO1xufTtcblxuLyoqXG4gKiBFc2NhcGUgdGhlIGdpdmVuIHN0cmluZyBvZiBgaHRtbGAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGh0bWxcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMuZXNjYXBlID0gZnVuY3Rpb24gZXNjYXBlKGh0bWwpe1xuICB2YXIgcmVzdWx0ID0gU3RyaW5nKGh0bWwpXG4gICAgLnJlcGxhY2UoLyYvZywgJyZhbXA7JylcbiAgICAucmVwbGFjZSgvPC9nLCAnJmx0OycpXG4gICAgLnJlcGxhY2UoLz4vZywgJyZndDsnKVxuICAgIC5yZXBsYWNlKC9cIi9nLCAnJnF1b3Q7Jyk7XG4gIGlmIChyZXN1bHQgPT09ICcnICsgaHRtbCkgcmV0dXJuIGh0bWw7XG4gIGVsc2UgcmV0dXJuIHJlc3VsdDtcbn07XG5cbi8qKlxuICogUmUtdGhyb3cgdGhlIGdpdmVuIGBlcnJgIGluIGNvbnRleHQgdG8gdGhlXG4gKiB0aGUgamFkZSBpbiBgZmlsZW5hbWVgIGF0IHRoZSBnaXZlbiBgbGluZW5vYC5cbiAqXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnJcbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWxlbmFtZVxuICogQHBhcmFtIHtTdHJpbmd9IGxpbmVub1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5yZXRocm93ID0gZnVuY3Rpb24gcmV0aHJvdyhlcnIsIGZpbGVuYW1lLCBsaW5lbm8sIHN0cil7XG4gIGlmICghKGVyciBpbnN0YW5jZW9mIEVycm9yKSkgdGhyb3cgZXJyO1xuICBpZiAoKHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgfHwgIWZpbGVuYW1lKSAmJiAhc3RyKSB7XG4gICAgZXJyLm1lc3NhZ2UgKz0gJyBvbiBsaW5lICcgKyBsaW5lbm87XG4gICAgdGhyb3cgZXJyO1xuICB9XG4gIHRyeSB7XG4gICAgc3RyID0gc3RyIHx8IHJlcXVpcmUoJ2ZzJykucmVhZEZpbGVTeW5jKGZpbGVuYW1lLCAndXRmOCcpXG4gIH0gY2F0Y2ggKGV4KSB7XG4gICAgcmV0aHJvdyhlcnIsIG51bGwsIGxpbmVubylcbiAgfVxuICB2YXIgY29udGV4dCA9IDNcbiAgICAsIGxpbmVzID0gc3RyLnNwbGl0KCdcXG4nKVxuICAgICwgc3RhcnQgPSBNYXRoLm1heChsaW5lbm8gLSBjb250ZXh0LCAwKVxuICAgICwgZW5kID0gTWF0aC5taW4obGluZXMubGVuZ3RoLCBsaW5lbm8gKyBjb250ZXh0KTtcblxuICAvLyBFcnJvciBjb250ZXh0XG4gIHZhciBjb250ZXh0ID0gbGluZXMuc2xpY2Uoc3RhcnQsIGVuZCkubWFwKGZ1bmN0aW9uKGxpbmUsIGkpe1xuICAgIHZhciBjdXJyID0gaSArIHN0YXJ0ICsgMTtcbiAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gJyAgPiAnIDogJyAgICAnKVxuICAgICAgKyBjdXJyXG4gICAgICArICd8ICdcbiAgICAgICsgbGluZTtcbiAgfSkuam9pbignXFxuJyk7XG5cbiAgLy8gQWx0ZXIgZXhjZXB0aW9uIG1lc3NhZ2VcbiAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgJ0phZGUnKSArICc6JyArIGxpbmVub1xuICAgICsgJ1xcbicgKyBjb250ZXh0ICsgJ1xcblxcbicgKyBlcnIubWVzc2FnZTtcbiAgdGhyb3cgZXJyO1xufTtcblxufSx7XCJmc1wiOjJ9XSwyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxufSx7fV19LHt9LFsxXSkoMSlcbn0pOyJdfQ==
