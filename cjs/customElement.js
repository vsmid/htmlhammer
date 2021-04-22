"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.customElement = void 0;

var _html = require("./html.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var defineProperty = Object.defineProperty,
    defineProperties = Object.defineProperties;
var reserved = ["postConstruct", "connectedCallback", "disconnectedCallback", "attributeChangedCallback", "adoptedCallback", "observedAttributes"];

var isUppercase = function isUppercase(member) {
  return /[A-Z]/.test(member.charAt(0));
};

var isFunction = function isFunction(member) {
  return typeof member === "function";
};

var isProperty = function isProperty(member) {
  return !isFunction(member);
};

var isObserved = function isObserved(member, observed) {
  return observed.includes(member.toLowerCase());
};

var members = function members(provider) {
  return Object.keys(provider).filter(function (member) {
    return !reserved.includes(member);
  });
};

var bind = function bind(provider, instance) {
  members(provider).filter(function (member) {
    return !reserved.includes(member) && isFunction(provider[member]) && isUppercase(member);
  }).forEach(function (member) {
    instance[member] = instance[member].bind(instance);
  });
};

var buildBase = function buildBase(provider, type) {
  var htmlElement = type ? type().constructor : HTMLElement;

  var CustomElement = /*#__PURE__*/function (_htmlElement) {
    _inherits(CustomElement, _htmlElement);

    var _super = _createSuper(CustomElement);

    function CustomElement() {
      var _this;

      _classCallCheck(this, CustomElement);

      _this = _super.call(this);

      if (provider.postConstruct) {
        provider.postConstruct();
      } // Bind uppercase functions


      bind(provider, _assertThisInitialized(_this));
      return _this;
    }

    return CustomElement;
  }(htmlElement);

  var prototype = {};
  reserved.filter(function (member) {
    return member !== "observedAttributes";
  }).forEach(function (member) {
    return prototype[member] = {
      value: provider[member]
    };
  });
  defineProperties(CustomElement.prototype, prototype);
  defineProperties(CustomElement, {
    observedAttributes: {
      value: provider.observedAttributes || []
    }
  });
  return CustomElement;
};

var customElement = function customElement(name, provider, type) {
  var CustomElement = buildBase(provider, type);
  members(provider).filter(function (member) {
    return !reserved.includes(member);
  }).forEach(function (member) {
    switch (true) {
      case isFunction(provider[member]):
        defineProperty(CustomElement.prototype, member, {
          value: provider[member],
          writable: isUppercase(member)
        });
        break;

      case isProperty(provider[member]):
        var valueRef = provider[member];

        switch (true) {
          case isObserved(member, CustomElement.observedAttributes):
            defineProperty(CustomElement.prototype, member, {
              get: function get() {
                return this.getAttribute(member);
              },
              set: function set(newVal) {
                this.setAttribute(member, newVal);
              }
            });
            break;

          case isUppercase(member):
            defineProperty(CustomElement.prototype, member, {
              get: function get() {
                return valueRef;
              },
              set: function set(newVal) {
                valueRef = newVal;
              }
            });
            break;

          case !isUppercase(member):
            defineProperty(CustomElement.prototype, member, {
              get: function get() {
                return valueRef;
              }
            });
            break;

          default:
            break;
        }

        break;

      default:
        break;
    }
  });
  var options = type ? {
    "extends": type().localName
  } : {};
  customElements.define(name, CustomElement, options);
  return (0, _html.define)(name);
};

exports.customElement = customElement;