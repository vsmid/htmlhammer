var htmlhammer = (function (exports) {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

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
  var type = function type(v) {
    return (v === undefined ? 'undefined' : v === null ? 'null' : v instanceof HTMLElement ? 'HTMLElement' : v.constructor.name).toLowerCase();
  };
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
  var HTML = (function () {
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
  })();

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
                refs.set(o, e);
              }
            } else {
              var val = {};

              if (id) {
                val[id] = e;
              } else {
                val = e;
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
  exports.source = source;
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
