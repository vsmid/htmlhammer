"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function () {
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
}();

exports["default"] = _default;