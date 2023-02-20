"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.customElement = void 0;

var _html = require("./html.js");

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var defineProperty = Object.defineProperty,
    defineProperties = Object.defineProperties;
var reserved = ['postConstruct', 'connectedCallback', 'disconnectedCallback', 'attributeChangedCallback', 'adoptedCallback', 'observedAttributes'];

var isUppercase = function isUppercase(member) {
  return /[A-Z]/.test(member.charAt(0));
};

var isFunction = function isFunction(member) {
  return typeof member === 'function';
};

var isObserved = function isObserved(member, observed) {
  return observed.includes(member.toLowerCase());
};

var members = function members(provider) {
  return Object.keys(provider).filter(function (member) {
    return !reserved.includes(member);
  });
};

var bindMembers = function bindMembers(provider, instance) {
  members(provider).filter(function (member) {
    return !reserved.includes(member) && isFunction(provider[member]) && isUppercase(member);
  }).forEach(function (member) {
    instance[member] = provider[member].bind(instance);
  });
};

var assignMembers = function assignMembers(provider, instance) {
  members(provider).filter(function (member) {
    return !reserved.includes(member);
  }).forEach(function (member) {
    var propertyValue = isFunction(provider[member]) ? provider[member] : structuredClone(provider[member]);

    switch (true) {
      case isObserved(member, provider.observedAttributes || []):
        defineProperty(instance, member, {
          get: function get() {
            var attributeValue = this.getAttribute(member); // If there is no attribute value yet, try property value

            return attributeValue ? attributeValue : propertyValue;
          },
          set: function set(newVal) {
            this.setAttribute(member, newVal);
          }
        });
        break;

      case isUppercase(member):
        defineProperty(instance, member, {
          get: function get() {
            return propertyValue;
          },
          set: function set(newVal) {
            propertyValue = newVal;
          }
        });
        break;

      case !isUppercase(member):
        defineProperty(instance, member, {
          get: function get() {
            return propertyValue;
          }
        });
        break;

      default:
        break;
    }
  });
};

var build = function build(provider, type) {
  var htmlElement = type ? type().constructor : HTMLElement; // Provide default attributeChangedCallback function if not set by the provider
  // to prevent 'el.attributeChangedCallback is not a function' error
  // when observedAtrtibutes are defined

  if (provider.observedAttributes) {
    var _provider$attributeCh;

    defineProperty(provider, 'attributeChangedCallback', {
      value: (_provider$attributeCh = provider.attributeChangedCallback) !== null && _provider$attributeCh !== void 0 ? _provider$attributeCh : function (a, b, c) {}
    });
  }

  var CustomElement = /*#__PURE__*/function (_htmlElement) {
    _inherits(CustomElement, _htmlElement);

    var _super = _createSuper(CustomElement);

    function CustomElement() {
      var _this;

      _classCallCheck(this, CustomElement);

      _this = _super.call(this);

      if (provider.postConstruct) {
        provider.postConstruct();
      } // Assign properties


      assignMembers(provider, _assertThisInitialized(_this)); // Bind uppercase functions

      bindMembers(provider, _assertThisInitialized(_this));
      return _this;
    }

    return _createClass(CustomElement);
  }(htmlElement);

  var prototype = {};
  reserved.filter(function (member) {
    return member !== 'observedAttributes';
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
  var CustomElement = build(provider, type);
  var options = type ? {
    "extends": type().localName
  } : {};
  customElements.define(name, CustomElement, options);
  return (0, _html.define)(name);
};

exports.customElement = customElement;