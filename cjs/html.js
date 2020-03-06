"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.define = exports.createElement = exports.AttributeHandler = exports.appendChild = exports.attachAttribute = exports.type = exports.BluePrint = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BluePrint = function BluePrint() {
  var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var o = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var a = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var c = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

  _classCallCheck(this, BluePrint);

  this.t = t;
  this.o = o;
  this.a = a;
  this.c = c;
};

exports.BluePrint = BluePrint;

var type = function type(v) {
  return (v === undefined ? 'undefined' : v === null ? 'null' : v instanceof HTMLElement ? 'HTMLElement' : v.constructor.name).toLowerCase();
};

exports.type = type;

var attachAttribute = function attachAttribute(name, value, element) {
  switch (true) {
    case Object.keys(AttributeHandler).includes(name):
      break;

    case name === 'style':
      Object.keys(value).forEach(function (key) {
        element.style[key] = value[key];
      });
      break;

    case name.startsWith('on') && element[name] === null:
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
    case 'array':
      child.forEach(function (_) {
        return appendChild(_, element, object);
      });
      break;

    case 'null':
    case 'undefined':
      break;

    case 'htmlelement':
      element.append(child);
      break;

    case 'function':
      appendChild(object ? child(object) : child(), element, object);
      break;

    default:
      element.append(document.createTextNode(child.toString()));
      break;
  }
};

exports.appendChild = appendChild;
var AttributeHandler = {
  $for: function $for(value) {
    var blueprints = [];

    if (!value || type(value) !== 'array') {
      blueprints.push(new BluePrint());
    } else {
      value.forEach(function (o) {
        return blueprints.push(new BluePrint(null, o));
      });
    }

    return blueprints;
  },
  $if: function $if(value, object) {
    return value === null || value === undefined ? true : type(value) === 'function' ? value(object) : !!value;
  },
  $ref: function $ref(value, object, element) {
    if (value) {
      if (object) {
        value(object)(element);
      } else {
        value(element);
      }
    }
  }
};
exports.AttributeHandler = AttributeHandler;

var createElement = function createElement(blueprint) {
  var element = document.createElement(blueprint.t);
  Object.keys(blueprint.a).forEach(function (name) {
    return attachAttribute(name, blueprint.a[name], element);
  });
  blueprint.c.forEach(function (child) {
    return appendChild(child, element, blueprint.o);
  });
  return element;
};

exports.createElement = createElement;

var define = function define(tag) {
  return function () {
    var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    for (var _len = arguments.length, children = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      children[_key - 1] = arguments[_key];
    }

    var $for = attributes.$for,
        $if = attributes.$if,
        $ref = attributes.$ref;
    var elements = AttributeHandler.$for($for).filter(function (bp) {
      return AttributeHandler.$if($if, bp.o);
    }).map(function (bp) {
      bp.t = tag;
      Object.assign(bp.a, attributes);

      if (children) {
        var _bp$c;

        (_bp$c = bp.c).push.apply(_bp$c, children);
      }

      var e = createElement(bp);
      AttributeHandler.$ref($ref, bp.o, e);
      return e;
    });
    return elements.length === 1 ? elements[0] : elements;
  };
};

exports.define = define;

var _default = function () {
  var tags = {};
  [// Main root
  'html', // Document metadata
  'base', 'head', 'link', 'meta', 'style', 'title', // Sectioning root
  'body', // Content sectioning
  'address', 'article', 'aside', 'footer', 'header', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'hggroup', 'main', 'nav', 'section', // Text content
  'blockquote', 'dd', 'div', 'dl', 'dt', 'figcaption', 'figure', 'hr', 'li', 'ol', 'p', 'pre', 'ul', // Inline text semantics
  'a', 'abbr', 'b', 'bdi', 'bdo', 'br', 'cite', 'code', 'data', 'dfn', 'em', 'i', 'kbd', 'mark', 'q', 'rb', 'rp', 'rt', 'rtc', 'ruby', 's', 'samp', 'strong', 'sub', 'sup', 'time', 'u', 'variable', 'wbr', // Image and multimedia
  'area', 'audio', 'img', 'map', 'track', 'video', // Embedded content
  'embed', 'iframe', 'object', 'param', 'picture', 'source', // Scripting
  'canvas', 'noscript', 'script', // Demarcating edits
  'del', 'ins', // Table content
  'caption', 'col', 'colgroup', 'table', 'tbody', 'td', 'tfoot', 'th', 'thead', 'tr', // Forms
  'button', 'datalist', 'fieldset', 'form', 'input', 'label', 'legend', 'meter', 'oprgroup', 'option', 'output', 'progress', 'select', 'textarea', // Interactive elements
  'details', 'dialog', 'menu', 'summary', // Web Components
  'slot', 'template'].forEach(function (tag) {
    tags[tag] = define(tag);
  });
  return tags;
}();

exports["default"] = _default;