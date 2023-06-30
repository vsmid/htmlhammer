"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hhjsx = hhjsx;

var _html = require("./html.js");

function hhjsx(tag, props) {
  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  if (typeof tag === 'function') {
    return tag(tag !== null && tag !== void 0 ? tag : '', props, children);
  } else {
    return (0, _html.define)(tag)(props !== null && props !== void 0 ? props : {}, children);
  }
}