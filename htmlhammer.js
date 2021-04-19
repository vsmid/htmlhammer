var htmlhammer = (function (exports) {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (_isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }

  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;

    _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !_isNativeFunction(Class)) return Class;

      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }

      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);

        _cache.set(Class, Wrapper);
      }

      function Wrapper() {
        return _construct(Class, arguments, _getPrototypeOf(this).constructor);
      }

      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return _setPrototypeOf(Wrapper, Class);
    };

    return _wrapNativeSuper(Class);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var ChildAppender = /*#__PURE__*/function () {
    function ChildAppender(element) {
      _classCallCheck(this, ChildAppender);

      this.element = element;
    }

    _createClass(ChildAppender, [{
      key: "append",
      value: function append(parentElement) {}
    }]);

    return ChildAppender;
  }();
  var HtmlString = /*#__PURE__*/function (_ChildAppender) {
    _inherits(HtmlString, _ChildAppender);

    var _super = _createSuper(HtmlString);

    function HtmlString(element) {
      _classCallCheck(this, HtmlString);

      for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        params[_key - 1] = arguments[_key];
      }

      return _super.call(this, typeof element === "function" ? element.apply(void 0, params) : element);
    }

    _createClass(HtmlString, [{
      key: "append",
      value: function append(parentElement) {
        if (this.element) {
          parentElement.insertAdjacentHTML("beforeend", typeof this.element === "string" ? this.element : this.element.toString());
        }
      }
    }]);

    return HtmlString;
  }(ChildAppender);

  var REF = (function () {
    var refs = new WeakMap();
    return {
      ref: function ref(o, id) {
        return o ? id ? refs.get(o)[id] : refs.get(o) : null;
      },
      setRef: function setRef(o, id) {
        return function (e) {
          if (o) {
            if (refs.has(o)) {
              if (id) {
                refs.get(o)[id] = e;
              } else {
                refs.set(o, [].concat(_toConsumableArray(refs.get(o)), [e]));
              }
            } else {
              var val = {};

              if (id) {
                val[id] = e;
              } else {
                val = [e];
              }

              refs.set(o, val);
            }
          } else {
            return null;
          }
        };
      }
    };
  })();

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
      } else if (child instanceof ChildAppender) {
        child.append(appendTo);
      } else if (typeof child === "function") {
        appendChild(object ? child(object) : child(), appendTo, object);
      } else {
        appendTo.append(document.createTextNode(child.toString()));
      }
    }
  };
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
        REF.setRef(attributeValue)(element);
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
  var HTML = (function () {
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
  })();

  var html = HTML.html,
      base = HTML.base,
      head = HTML.head,
      link = HTML.link,
      meta = HTML.meta,
      style = HTML.style,
      title = HTML.title,
      body = HTML.body,
      address = HTML.address,
      article = HTML.article,
      aside = HTML.aside,
      footer = HTML.footer,
      header = HTML.header,
      h1 = HTML.h1,
      h2 = HTML.h2,
      h3 = HTML.h3,
      h4 = HTML.h4,
      h5 = HTML.h5,
      h6 = HTML.h6,
      hggroup = HTML.hggroup,
      main = HTML.main,
      nav = HTML.nav,
      section = HTML.section,
      blockquote = HTML.blockquote,
      dd = HTML.dd,
      div = HTML.div,
      dl = HTML.dl,
      dt = HTML.dt,
      figcaption = HTML.figcaption,
      figure = HTML.figure,
      hr = HTML.hr,
      li = HTML.li,
      ol = HTML.ol,
      p = HTML.p,
      pre = HTML.pre,
      ul = HTML.ul,
      a = HTML.a,
      abbr = HTML.abbr,
      b = HTML.b,
      bdi = HTML.bdi,
      bdo = HTML.bdo,
      br = HTML.br,
      cite = HTML.cite,
      code = HTML.code,
      data = HTML.data,
      dfn = HTML.dfn,
      em = HTML.em,
      i = HTML.i,
      kbd = HTML.kbd,
      mark = HTML.mark,
      q = HTML.q,
      rb = HTML.rb,
      rp = HTML.rp,
      rt = HTML.rt,
      rtc = HTML.rtc,
      ruby = HTML.ruby,
      s = HTML.s,
      samp = HTML.samp,
      small = HTML.small,
      span = HTML.span,
      strong = HTML.strong,
      sub = HTML.sub,
      sup = HTML.sup,
      time = HTML.time,
      u = HTML.u,
      variable = HTML.variable,
      wbr = HTML.wbr,
      area = HTML.area,
      audio = HTML.audio,
      img = HTML.img,
      map = HTML.map,
      track = HTML.track,
      video = HTML.video,
      embed = HTML.embed,
      iframe = HTML.iframe,
      object = HTML.object,
      param = HTML.param,
      picture = HTML.picture,
      source = HTML.source,
      canvas = HTML.canvas,
      noscript = HTML.noscript,
      script = HTML.script,
      del = HTML.del,
      ins = HTML.ins,
      caption = HTML.caption,
      col = HTML.col,
      colgroup = HTML.colgroup,
      table = HTML.table,
      tbody = HTML.tbody,
      td = HTML.td,
      tfoot = HTML.tfoot,
      th = HTML.th,
      thead = HTML.thead,
      tr = HTML.tr,
      button = HTML.button,
      datalist = HTML.datalist,
      fieldset = HTML.fieldset,
      form = HTML.form,
      input = HTML.input,
      label = HTML.label,
      legend = HTML.legend,
      meter = HTML.meter,
      oprgroup = HTML.oprgroup,
      option = HTML.option,
      output = HTML.output,
      progress = HTML.progress,
      select = HTML.select,
      textarea = HTML.textarea,
      details = HTML.details,
      dialog = HTML.dialog,
      menu = HTML.menu,
      summary = HTML.summary,
      slot = HTML.slot,
      template = HTML.template;
  var ref = REF.ref,
      setRef = REF.setRef;

  exports.ChildAppender = ChildAppender;
  exports.HtmlString = HtmlString;
  exports.a = a;
  exports.abbr = abbr;
  exports.address = address;
  exports.area = area;
  exports.article = article;
  exports.aside = aside;
  exports.audio = audio;
  exports.b = b;
  exports.base = base;
  exports.bdi = bdi;
  exports.bdo = bdo;
  exports.blockquote = blockquote;
  exports.body = body;
  exports.br = br;
  exports.button = button;
  exports.canvas = canvas;
  exports.caption = caption;
  exports.cite = cite;
  exports.code = code;
  exports.col = col;
  exports.colgroup = colgroup;
  exports.customElement = customElement;
  exports.data = data;
  exports.datalist = datalist;
  exports.dd = dd;
  exports.del = del;
  exports.details = details;
  exports.dfn = dfn;
  exports.dialog = dialog;
  exports.div = div;
  exports.dl = dl;
  exports.dt = dt;
  exports.em = em;
  exports.embed = embed;
  exports.fieldset = fieldset;
  exports.figcaption = figcaption;
  exports.figure = figure;
  exports.footer = footer;
  exports.form = form;
  exports.h1 = h1;
  exports.h2 = h2;
  exports.h3 = h3;
  exports.h4 = h4;
  exports.h5 = h5;
  exports.h6 = h6;
  exports.head = head;
  exports.header = header;
  exports.hggroup = hggroup;
  exports.hr = hr;
  exports.html = html;
  exports.i = i;
  exports.iframe = iframe;
  exports.img = img;
  exports.input = input;
  exports.ins = ins;
  exports.kbd = kbd;
  exports.label = label;
  exports.legend = legend;
  exports.li = li;
  exports.link = link;
  exports.main = main;
  exports.map = map;
  exports.mark = mark;
  exports.menu = menu;
  exports.meta = meta;
  exports.meter = meter;
  exports.nav = nav;
  exports.noscript = noscript;
  exports.object = object;
  exports.ol = ol;
  exports.oprgroup = oprgroup;
  exports.option = option;
  exports.output = output;
  exports.p = p;
  exports.param = param;
  exports.picture = picture;
  exports.pre = pre;
  exports.progress = progress;
  exports.q = q;
  exports.rb = rb;
  exports.ref = ref;
  exports.rp = rp;
  exports.rt = rt;
  exports.rtc = rtc;
  exports.ruby = ruby;
  exports.s = s;
  exports.samp = samp;
  exports.script = script;
  exports.section = section;
  exports.select = select;
  exports.setRef = setRef;
  exports.slot = slot;
  exports.small = small;
  exports.source = source;
  exports.span = span;
  exports.strong = strong;
  exports.style = style;
  exports.sub = sub;
  exports.summary = summary;
  exports.sup = sup;
  exports.table = table;
  exports.tbody = tbody;
  exports.td = td;
  exports.template = template;
  exports.textarea = textarea;
  exports.tfoot = tfoot;
  exports.th = th;
  exports.thead = thead;
  exports.time = time;
  exports.title = title;
  exports.tr = tr;
  exports.track = track;
  exports.u = u;
  exports.ul = ul;
  exports.variable = variable;
  exports.video = video;
  exports.wbr = wbr;

  return exports;

}({}));
