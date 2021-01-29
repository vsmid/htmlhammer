"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.define = exports.extract = exports.createElement = exports.AttributeHandler = exports.appendChild = exports.attachAttribute = exports.type = exports.Blueprint = void 0;

var _appenders = require("./appenders.js");

var _ref = _interopRequireDefault(require("./ref.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Blueprint = function Blueprint() {
  var tag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var object = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var attributes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var children = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

  _classCallCheck(this, Blueprint);

  this.tag = tag;
  this.object = object;
  this.attributes = attributes;
  this.children = children;
};

exports.Blueprint = Blueprint;

var type = function type(value) {
  return (value === undefined ? "undefined" : value === null ? "null" : value instanceof HTMLElement ? "HTMLElement" : value instanceof _appenders.ChildAppender ? "ChildAppender" : value.constructor.name).toLowerCase();
};

exports.type = type;

var attachAttribute = function attachAttribute(name, value, element) {
  switch (true) {
    case Object.keys(AttributeHandler).includes(name):
      break;

    case name === "style":
      Object.keys(value).forEach(function (key) {
        element.style[key] = value[key];
      });
      break;

    case name.startsWith("on") && element[name] === null:
      element[name] = value;
      break;

    default:
      element.setAttribute(name, value);
      break;
  }
};

exports.attachAttribute = attachAttribute;

var appendChild = function appendChild(child, element, object) {
  switch (type(child)) {
    case "array":
      child.forEach(function (_) {
        return appendChild(_, element, object);
      });
      break;

    case "null":
    case "undefined":
      break;

    case "htmlelement":
      element.append(child);
      break;

    case "childappender":
      child.append(element);
      break;

    case "function":
      appendChild(object ? child(object) : child(), element, object);
      break;

    default:
      element.append(document.createTextNode(child.toString()));
      break;
  }
};

exports.appendChild = appendChild;
var AttributeHandler = Object.freeze({
  $for: function $for(attributeValue) {
    var blueprints = [];

    if (!attributeValue || type(attributeValue) !== "array") {
      blueprints.push(new Blueprint());
    } else {
      attributeValue.forEach(function (o) {
        return blueprints.push(new Blueprint(null, o));
      });
    }

    return blueprints;
  },
  $if: function $if(attributeValue, callbackInput) {
    return attributeValue === null || attributeValue === undefined ? true : type(attributeValue) === "function" ? attributeValue(callbackInput) : !!attributeValue;
  },
  $ref: function $ref(attributeValue, callbackInput, element) {
    if (typeof attributeValue === "function") {
      if (callbackInput) {
        attributeValue(callbackInput)(element);
      } else {
        attributeValue(element);
      }
    } else {
      _ref["default"].setRef(attributeValue)(element);
    }
  },
  $apply: function $apply(element, applyCallback) {
    if (applyCallback) {
      if (Array.isArray(applyCallback)) {
        applyCallback.filter(Boolean).forEach(function (t) {
          return t(element);
        });
      } else {
        applyCallback(element);
      }
    }
  }
});
exports.AttributeHandler = AttributeHandler;

var createElement = function createElement(blueprint) {
  var element = document.createElement(blueprint.tag);
  Object.keys(blueprint.attributes).forEach(function (name) {
    return attachAttribute(name, blueprint.attributes[name], element);
  });
  blueprint.children.forEach(function (child) {
    return appendChild(child, element, blueprint.object);
  });
  return element;
};

exports.createElement = createElement;

var extract = function extract() {
  var attributes = {};
  var children = [];

  for (var _len = arguments.length, parts = new Array(_len), _key = 0; _key < _len; _key++) {
    parts[_key] = arguments[_key];
  }

  if (parts && parts.length > 0) {
    if (parts.length > 1) {
      if (type(parts[0]) === "object") {
        attributes = parts[0];
        children = parts.slice(1);
      } else {
        children = parts;
      }
    } else if (parts.length === 1) {
      if (type(parts[0]) !== "object") {
        children = parts;
      } else {
        attributes = parts[0];
      }
    }
  }

  return {
    attributes: attributes,
    children: children
  };
};

exports.extract = extract;

var define = function define(tag) {
  return function () {
    var _extract = extract.apply(void 0, arguments),
        attributes = _extract.attributes,
        children = _extract.children;

    var $for = attributes.$for,
        $if = attributes.$if,
        $ref = attributes.$ref,
        $apply = attributes.$apply;
    var elements = AttributeHandler.$for($for).filter(function (bp) {
      return AttributeHandler.$if($if, bp.object);
    }).map(function (bp) {
      bp.tag = tag;
      Object.assign(bp.attributes, attributes);

      if (children) {
        bp.children.push(_toConsumableArray(children));
      }

      var e = createElement(bp);
      AttributeHandler.$apply(e, $apply);
      AttributeHandler.$ref($ref, bp.object, e);
      return e;
    });
    return elements.length === 1 ? elements[0] : elements;
  };
};

exports.define = define;

var _default = function () {
  var tags = {};
  [// Main root
  "html", // Document metadata
  "base", "head", "link", "meta", "style", "title", // Sectioning root
  "body", // Content sectioning
  "address", "article", "aside", "footer", "header", "h1", "h2", "h3", "h4", "h5", "h6", "hggroup", "main", "nav", "section", // Text content
  "blockquote", "dd", "div", "dl", "dt", "figcaption", "figure", "hr", "li", "ol", "p", "pre", "ul", // Inline text semantics
  "a", "abbr", "b", "bdi", "bdo", "br", "cite", "code", "data", "dfn", "em", "i", "kbd", "mark", "q", "rb", "rp", "rt", "rtc", "ruby", "s", "samp", "small", "span", "strong", "sub", "sup", "time", "u", "variable", "wbr", // Image and multimedia
  "area", "audio", "img", "map", "track", "video", // Embedded content
  "embed", "iframe", "object", "param", "picture", "source", // Scripting
  "canvas", "noscript", "script", // Demarcating edits
  "del", "ins", // Table content
  "caption", "col", "colgroup", "table", "tbody", "td", "tfoot", "th", "thead", "tr", // Forms
  "button", "datalist", "fieldset", "form", "input", "label", "legend", "meter", "oprgroup", "option", "output", "progress", "select", "textarea", // Interactive elements
  "details", "dialog", "menu", "summary", // Web Components
  "slot", "template"].forEach(function (tag) {
    tags[tag] = define(tag);
  });
  return tags;
}();

exports["default"] = _default;