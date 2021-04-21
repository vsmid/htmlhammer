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

export const attachAttribute = (name, value, element) => {
    switch (true) {
        case Object.keys(AttributeHandler).includes(name):
            break;
        case name === "shadowRoot":
            element.attachShadow(value);
            if (value.stylesheets) {
                value.stylesheets.forEach(style => element.shadowRoot.append(style));
            }
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
    if (child) {
        let appendTo = element;
        if (element.shadowRoot && element.shadowRoot.mode === "open") {
            appendTo = element.shadowRoot;
        }
        if (Array.isArray(child)) {
            child.forEach((_) => appendChild(_, appendTo, object));
        } else if (
            child instanceof HTMLElement ||
            child.constructor.name === "Comment"
        ) {
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

export const AttributeHandler = Object.freeze({
    $for: (attributeValue) => {
        let blueprints = [];
        if (!attributeValue || !Array.isArray(attributeValue)) {
            blueprints.push(new Blueprint());
        } else {
            attributeValue.forEach((o) =>
                blueprints.push(new Blueprint(null, o))
            );
        }
        return blueprints;
    },
    $if: (attributeValue, callbackInput) =>
        attributeValue === null || attributeValue === undefined
            ? true
            : typeof attributeValue === "function"
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
    }
});

export const createElement = (blueprint) => {
    let options = {};
    if(blueprint.attributes.is){
        options["is"] = blueprint.attributes.is;
    }
    let element = document.createElement(blueprint.tag, options);
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
        let isObject = parts[0].constructor.name === "Object";
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
        "template"
    ].forEach((tag) => {
        tags[tag] = define(tag);
    });
    return tags;
})();
