// @ts-nocheck
import { customElement } from "../../esm/index.js";
var HHJSXCmp = customElement('hh-jsx-cmp', {
  connectedCallback: function connectedCallback() {
    this.appendChild(hhjsx("div", null, hhjsx("h2", null, "HHJSX WebComponent Component"), hhjsx("button", {
      onclick: function onclick() {
        return alert('Hello!');
      }
    }, "Click me!")));
  }
});

var HtmlHammerJSXComponent = function HtmlHammerJSXComponent(props) {
  for (var _len = arguments.length, children = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    children[_key - 1] = arguments[_key];
  }

  return (// Instead React's <>
    hhjsx("fragment", null, hhjsx("h1", null, "JSX & Htmlhammer Example"), hhjsx("a", {
      name: "foo"
    }, hhjsx("div", {
      nn: "NN attribute"
    }, hhjsx("ul", null, hhjsx("li", null, hhjsx("a", null, "1")), hhjsx("li", null, hhjsx("a", null, "2")))), hhjsx("div", {
      aa: "AA attribute"
    }, "Some div Content"), children !== null && children !== void 0 ? children : map(function (child) {
      return hhjsx("child", null);
    })))
  );
};

document.body.append(hhjsx(HtmlHammerJSXComponent, null, hhjsx("h1", null, "I am a child"), hhjsx(HHJSXCmp, null)));