export class Blueprint {
    constructor(tag = null, object = null, attributes = {}, children = []) {
        this.tag = tag;
        this.object = object;
        this.attributes = attributes;
        this.children = children;
    }
}

export const type = (v) =>
    (v === undefined ? 'undefined'
        : v === null ? 'null'
            : v instanceof HTMLElement ? 'HTMLElement'
                : v.constructor.name).toLowerCase();

export const attachAttribute = (name, value, element) => {
    switch (true) {
        case Object.keys(AttributeHandler).includes(name):
            break;
        case name === 'style':
            Object.keys(value).forEach(key => {
                element.style[key] = value[key];
            });
            break;
        case (name.startsWith('on') && element[name] === null):
            element[name] = value;
            break;
        default:
            element.setAttribute(name, value);
            break;
    }
};

export const appendChild = (child, element, object) => {
    switch (type(child)) {
        case 'array':
            child.forEach(_ => appendChild(_, element, object));
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

export const AttributeHandler = {
    $for: (value) => {
        let blueprints = [];
        if (!value || type(value) !== 'array') {
            blueprints.push(new Blueprint());
        } else {
            value.forEach(o => blueprints.push(new Blueprint(null, o)));
        }
        return blueprints;
    },
    $if: (value, object) =>
        value === null || value === undefined ? true
            : type(value) === 'function' ? value(object)
                : !!value
    ,
    $ref: (value, object, element) => {
        if (value) {
            if (object) {
                value(object)(element);
            } else {
                value(element);
            }
        }
    }
};

export const createElement = (blueprint) => {
    let element = document.createElement(blueprint.tag);
    Object.keys(blueprint.attributes).forEach(name => attachAttribute(name, blueprint.attributes[name], element));
    blueprint.children.forEach(child => appendChild(child, element, blueprint.object));
    return element;
};

export const define = (tag) => (attributes = {}, ...children) => {
    let { $for, $if, $ref } = attributes;

    let elements = AttributeHandler
        .$for($for)
        .filter(bp => AttributeHandler.$if($if, bp.object))
        .map(bp => {
            bp.tag = tag;
            Object.assign(bp.attributes, attributes);
            if (children) {
                bp.children.push(...children);
            }
            let e = createElement(bp);
            AttributeHandler.$ref($ref, bp.object, e);
            return e;
        });

    return elements.length === 1 ? elements[0] : elements;
};

export default (() => {
    let tags = {};
    [
        // Main root
        'html',
        // Document metadata
        'base', 'head', 'link', 'meta', 'style',
        'title',
        // Sectioning root
        'body',
        // Content sectioning
        'address', 'article', 'aside', 'footer', 'header',
        'h1', 'h2', 'h3', 'h4', 'h5',
        'h6', 'hggroup', 'main', 'nav', 'section',
        // Text content
        'blockquote', 'dd', 'div', 'dl', 'dt',
        'figcaption', 'figure', 'hr', 'li', 'ol',
        'p', 'pre', 'ul',
        // Inline text semantics
        'a', 'abbr', 'b', 'bdi', 'bdo',
        'br', 'cite', 'code', 'data', 'dfn',
        'em', 'i', 'kbd', 'mark', 'q',
        'rb', 'rp', 'rt', 'rtc', 'ruby',
        's', 'samp', 'small', 'span', 'strong', 'sub', 'sup',
        'time', 'u', 'variable', 'wbr',
        // Image and multimedia
        'area', 'audio', 'img', 'map', 'track',
        'video',
        // Embedded content
        'embed', 'iframe', 'object', 'param', 'picture',
        'source',
        // Scripting
        'canvas', 'noscript', 'script',
        // Demarcating edits
        'del', 'ins',
        // Table content
        'caption', 'col', 'colgroup', 'table', 'tbody',
        'td', 'tfoot', 'th', 'thead', 'tr',
        // Forms
        'button', 'datalist', 'fieldset', 'form', 'input',
        'label', 'legend', 'meter', 'oprgroup', 'option',
        'output', 'progress', 'select', 'textarea',
        // Interactive elements
        'details', 'dialog', 'menu', 'summary',
        // Web Components
        'slot', 'template'
    ].forEach(tag => {
        tags[tag] = define(tag);
    });
    return tags;
})();