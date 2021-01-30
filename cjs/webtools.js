"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.comment = exports.app = void 0;

var _html = _interopRequireDefault(require("./html.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var div = _html["default"].div;
/**
 * Generates application's root element and appends it to the document.body.
 * @param  {...any} elements Elements to be appended to the root element.
 */

var app = function app() {
  for (var _len = arguments.length, elements = new Array(_len), _key = 0; _key < _len; _key++) {
    elements[_key] = arguments[_key];
  }

  return document.body.append(div.apply(void 0, [{
    id: "root"
  }].concat(elements)));
};
/**
 * A convenient function which creates Comment element.
 * @param {*} comment Comment's text
 */


exports.app = app;

var comment = function comment(_comment) {
  return document.createComment(_comment);
};

exports.comment = comment;