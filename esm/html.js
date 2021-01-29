import { ChildAppender } from "./appenders.js";
import REF from "./ref.js";

export class Blueprint {
  constructor(tag = null, object = null, attributes = {}, children = []) {
    this.tag = tag;
    this.object = object;
    this.attributes = attributes;
    this.children = children;
  }
}

export const type = (value) =>
  (value === undefined
    ? "undefined"
    : value === null
    ? "null"
    : value instanceof HTMLElement
    ? "HTMLElement"
    : value instanceof ChildAppender
    ? "ChildAppender"
    : value.constructor.name
  ).toLowerCase();

export const attachAttribute = (name, value, element) => {
  switch (true) {
    case Object.keys(AttributeHandler).includes(name):
      break;
    case name === "style":
      Object.keys(value).forEach((key) => {
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

export const appendChild = (child, element, object) => {
  switch (type(child)) {
    case "array":
      child.forEach((_) => appendChild(_, element, object));
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

export const AttributeHandler = Object.freeze({
  $for: (attributeValue) => {
    let blueprints = [];
    if (!attributeValue || type(attributeValue) !== "array") {
      blueprints.push(new Blueprint());
    } else {
      attributeValue.forEach((o) => blueprints.push(new Blueprint(null, o)));
    }
    return blueprints;
  },
  $if: (attributeValue, callbackInput) =>
    attributeValue === null || attributeValue === undefined
      ? true
      : type(attributeValue) === "function"
      ? attributeValue(callbackInput)
      : !!attributeValue,
  $ref: (attributeValue, callbackInput, element) => {
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
  $apply: (element, applyCallback) => {
    if (applyCallback) {
      if (Array.isArray(applyCallback)) {
        applyCallback.filter(Boolean).forEach((t) => t(element));
      } else {
        applyCallback(element);
      }
    }
  },
});

export const createElement = (blueprint) => {
  let element = document.createElement(blueprint.tag);
  Object.keys(blueprint.attributes).forEach((name) =>
    attachAttribute(name, blueprint.attributes[name], element)
  );
  blueprint.children.forEach((child) =>
    appendChild(child, element, blueprint.object)
  );
  return element;
};

export const extract = (...parts) => {
  let attributes = {};
  let children = [];

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
  return { attributes, children };
};

export const define = (tag) => (...parts) => {
  const { attributes, children } = extract(...parts);
  const { $for, $if, $ref, $apply } = attributes;

  let elements = AttributeHandler.$for($for)
    .filter((bp) => AttributeHandler.$if($if, bp.object))
    .map((bp) => {
      bp.tag = tag;
      Object.assign(bp.attributes, attributes);
      if (children) {
        bp.children.push([...children]);
      }
      let e = createElement(bp);
      AttributeHandler.$apply(e, $apply);
      AttributeHandler.$ref($ref, bp.object, e);
      return e;
    });

  return elements.length === 1 ? elements[0] : elements;
};

export default (() => {
  let tags = {};
  [
    // Main root
    "html",
    // Document metadata
    "base",
    "head",
    "link",
    "meta",
    "style",
    "title",
    // Sectioning root
    "body",
    // Content sectioning
    "address",
    "article",
    "aside",
    "footer",
    "header",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "hggroup",
    "main",
    "nav",
    "section",
    // Text content
    "blockquote",
    "dd",
    "div",
    "dl",
    "dt",
    "figcaption",
    "figure",
    "hr",
    "li",
    "ol",
    "p",
    "pre",
    "ul",
    // Inline text semantics
    "a",
    "abbr",
    "b",
    "bdi",
    "bdo",
    "br",
    "cite",
    "code",
    "data",
    "dfn",
    "em",
    "i",
    "kbd",
    "mark",
    "q",
    "rb",
    "rp",
    "rt",
    "rtc",
    "ruby",
    "s",
    "samp",
    "small",
    "span",
    "strong",
    "sub",
    "sup",
    "time",
    "u",
    "variable",
    "wbr",
    // Image and multimedia
    "area",
    "audio",
    "img",
    "map",
    "track",
    "video",
    // Embedded content
    "embed",
    "iframe",
    "object",
    "param",
    "picture",
    "source",
    // Scripting
    "canvas",
    "noscript",
    "script",
    // Demarcating edits
    "del",
    "ins",
    // Table content
    "caption",
    "col",
    "colgroup",
    "table",
    "tbody",
    "td",
    "tfoot",
    "th",
    "thead",
    "tr",
    // Forms
    "button",
    "datalist",
    "fieldset",
    "form",
    "input",
    "label",
    "legend",
    "meter",
    "oprgroup",
    "option",
    "output",
    "progress",
    "select",
    "textarea",
    // Interactive elements
    "details",
    "dialog",
    "menu",
    "summary",
    // Web Components
    "slot",
    "template",
  ].forEach((tag) => {
    tags[tag] = define(tag);
  });
  return tags;
})();
