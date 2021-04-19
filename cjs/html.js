"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.customElement = exports.define = exports.extract = exports.createElement = exports.AttributeHandler = exports.appendChild = exports.attachAttribute = exports.Blueprint = void 0;

var _appenders = require("./appenders.js");

var _ref = _interopRequireDefault(require("./ref.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

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

var attachAttribute = function attachAttribute(name, value, element) {
  switch (true) {
    case Object.keys(AttributeHandler).includes(name):
      break;

    case name === "shadowRoot":
      element.attachShadow(value);

      if (value.stylesheets) {
        value.stylesheets.forEach(function (style) {
          return element.shadowRoot.append(style);
        });
      }

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
  if (child) {
    var appendTo = element;

    if (element.shadowRoot && element.shadowRoot.mode === "open") {
      appendTo = element.shadowRoot;
    }

    if (Array.isArray(child)) {
      child.forEach(function (_) {
        return appendChild(_, appendTo, object);
      });
    } else if (child instanceof HTMLElement || child.constructor.name === "Comment") {
      appendTo.append(child);
    } else if (child instanceof _appenders.ChildAppender) {
      child.append(appendTo);
    } else if (typeof child === "function") {
      appendChild(object ? child(object) : child(), appendTo, object);
    } else {
      appendTo.append(document.createTextNode(child.toString()));
    }
  }
};

exports.appendChild = appendChild;
var AttributeHandler = Object.freeze({
  $for: function $for(attributeValue) {
    var blueprints = [];

    if (!attributeValue || !Array.isArray(attributeValue)) {
      blueprints.push(new Blueprint());
    } else {
      attributeValue.forEach(function (o) {
        return blueprints.push(new Blueprint(null, o));
      });
    }

    return blueprints;
  },
  $if: function $if(attributeValue, callbackInput) {
    return attributeValue === null || attributeValue === undefined ? true : typeof attributeValue === "function" ? attributeValue(callbackInput) : !!attributeValue;
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
    var isObject = parts[0].constructor.name === "Object";

    if (parts.length > 1) {
      if (isObject) {
        attributes = parts[0];
        children = parts.slice(1);
      } else {
        children = parts;
      }
    } else if (parts.length === 1) {
      if (!isObject) {
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

var customElement = function customElement(name, impl) {
  var reserved = ["constructor", "connectedCallback", "disconnectedCallback", "attributeChangedCallback", "adoptedCallback"];

  var CustomElement = /*#__PURE__*/function (_HTMLElement) {
    _inherits(CustomElement, _HTMLElement);

    var _super = _createSuper(CustomElement);

    function CustomElement() {
      var _this;

      _classCallCheck(this, CustomElement);

      _this = _super.call(this);
      impl.constructor();
      return _this;
    }

    return CustomElement;
  }( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

  Object.defineProperties(CustomElement.prototype, {
    connectedCallback: {
      value: impl.connectedCallback
    },
    disconnectedCallback: {
      value: impl.disconnectedCallback
    },
    attributeChangedCallback: {
      value: impl.attributeChangedCallback
    },
    adoptedCallback: {
      value: impl.adoptedCallback
    }
  });
  Object.defineProperties(CustomElement, {
    observedAttributes: {
      value: impl.observedAttributes
    }
  });
  Object.keys(impl).filter(function (key) {
    return /[A-Z]/.test(key.charAt(0)) && typeof impl[key] === "function";
  }).forEach(function (key) {
    return Object.defineProperty(CustomElement.prototype, key, {
      value: impl[key]
    });
  });
  Object.keys(impl).filter(function (key) {
    return typeof impl[key] !== "function" && !reserved.includes(impl[key]);
  }).forEach(function (key) {
    if (impl.observedAttributes.includes(key)) {
      Object.defineProperty(CustomElement.prototype, key, {
        get: function get() {
          return this.getAttribute(key);
        },
        set: function set(newVal) {
          this.setAttribute(key, newVal);
        }
      });
    } else {
      var val = impl[key];

      if (/[A-Z]/.test(key.charAt(0))) {
        Object.defineProperty(CustomElement.prototype, key, {
          get: function get() {
            return val;
          },
          set: function set(newVal) {
            val = newVal;
          }
        });
      } else {
        Object.defineProperty(CustomElement.prototype, key, {
          get: function get() {
            return val;
          }
        });
      }
    }
  });
  customElements.define(name, CustomElement);
  return define(name);
};

exports.customElement = customElement;

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