<p align="center">
  <a href="https://badge.fury.io/js/htmlhammer.svg"><img src="https://badge.fury.io/js/htmlhammer.svg"/></a>
  <a href="https://github.com/vsmid/htmlhammer/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/license-ISC-green.svg" alt="htmlhammer is released under the ISC license." />
  </a>
</p>
<p align="center">
  <img alt="logo" src="https://github.com/vsmid/htmlhammer/blob/master/htmlhammer.png" height="100" width="200">
</p>
<p align="center">
  <a href="https://sonarcloud.io/dashboard?id=vsmid_htmlhammer"><img src="https://sonarcloud.io/api/project_badges/measure?project=vsmid_htmlhammer&metric=alert_status"/></a>
  <a href="https://sonarcloud.io/dashboard?id=vsmid_htmlhammer"><img src="https://sonarcloud.io/api/project_badges/measure?project=vsmid_htmlhammer&metric=sqale_rating"/></a>
  <a href="https://sonarcloud.io/dashboard?id=vsmid_htmlhammer"><img src="https://sonarcloud.io/api/project_badges/measure?project=vsmid_htmlhammer&metric=reliability_rating"/></a>
  <a href="https://sonarcloud.io/dashboard?id=vsmid_htmlhammer"><img src="https://sonarcloud.io/api/project_badges/measure?project=vsmid_htmlhammer&metric=security_rating"/></a>
</p>

# htmlhammer

-   Write HTML with JavaScript using real HTML tag names.
-   Unique way of writing WebComponents

## Why?

-   String literals tend to get messy and unreadable
-   Maybe you don't want or need JSX
-   HyperScript is ok, but you would like to avoid manually writing HTML tag names
-   Make writing HTML in JavaScript feel almost like writing it in .html file
-   Make writing HTML in JavaScript dead simple and intuitive but keeping all the JavaScript's power

## Install

### github

-   Latest version:
    `npm install git+https://github.com/vsmid/htmlhammer.git --save`

-   Specific version:
    `npm install git+https://github.com/vsmid/htmlhammer.git\#1.0.0 --save`

### npmjs

`npm i htmlhammer`

### unpkg

```html
<!-- Latest version CJS -->
<script src="https://unpkg.com/htmlhammer"></script>

<!-- Version 1.0.1 CJS -->
<script src="https://unpkg.com/htmlhammer@1.0.1"></script>

<!-- Latest version ESM -->
<script type="module">
    import { div } from "https://unpkg.com/htmlhammer?module";
</script>

<!-- Latest version single file IIFE -->
<script src="https://unpkg.com/htmlhammer/htmlhammer.js"></script>

<!-- Latest version minified single file IIFE -->
<script src="https://unpkg.com/htmlhammer/htmlhammer.min.js"></script>
```

For specific versions use url format: unpkg.com/:package@:version/:file. See [UNPKG](https://unpkg.com/) for more info.

## Importing and using htmlhammer

```javascript
// In html
<script src="./htmlhammer.js"></script>;
const { div } = htmlhammer;

// In modules
const { div, a, h1 } = require("htmlhammer").default;
import { div, a, h1 } from "htmlhammer";
```

## Using htmlhammer

## Supported HTML tags/elements

See the list on [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element). Tags/elements marked as
obsolete/deprecated are not supported.

## Signature

```javascript
// Function name htmltagname is one of supported HTML tag/elements, e.g. div, a, h1, table etc.
// Since version 2.3.0 attributesAndProperties parameter is optional
htmltagname((attributesAndProperties = {}), ...children);
```

Parameters:

-   attributesAndProperties - JSON object where key is the name of the element's attribute/property (e.g. id, name, style, onclick, or custom attribute/property etc. ) and value is the new attribute/property value.
    Difference between defining an attribute and property is that property value must always be one of function, instance of class, array or json object. This rule does not apply to [reserved element attributes/properties](#reserved-element-attributesproperties) and `style`.
-   children - element or elements to be appended to parent element. Can be string, number, another HTMLElement created regularly or by **htmlhammer**, function returning one of the previously stated types etc.

Returns:

-   An array of HTMLElement or a single HTMLElement.

### Code sample

```javascript
let items = [{ value: 1 }, { value: 2 }];

document.body.append(
    div(
        { style: { color: "red" } },
        h1("I am the title"),
        a({ href: "#" }, "Click me!"),
        table(tr({ $for: items }, (item) => td(item.value)))
    )
);
```

### String as HTML

If you have HTML in string format and you would like for it to be added to element as HTML you should wrap it
in `HtmlString` class. This is useful when you want to inject an already generated HTML in string format to an element (
e.g. HTML content received from REST service).

```javascript
import { div, HtmlString } from "./esm/index.js";

const html = "<h1>Hello World!</h1>";

document.body.append(
    div(new HtmlString(html)) // Without HTMLString wrapper, html content would be treated as text content hence text node would be created
);
```

Version 2.1.0 introduced a new attribute handler `$apply` which allows you to create inline element in any way you like.

```javascript
const RawHtml = (data) => (el) => (el.innerHTML = data);

document.body.append(div(span({ $apply: RawHtml("<h1>Hello World!</h1>") })));
```

For more complex and complete examples see [demo](https://github.com/vsmid/htmlhammer/tree/master/demo).

### Reserved element attributes/properties

#### `$for` - creating multiple elements of the same type

```javascript
// Creates three elements of type div, <div>1</div>, <div>2</div>, <div>3</div>
// index parameter is optional
// item = 1, index = 0
// item = 2, index = 1
// item = 3, index = 2
div({ $for: [1, 2, 3] }, (item, index) => item);
```

#### `$if` - conditionally create element

```javascript
div({ $if: true }, "I am created");
div({ $if: () => true }, "I am created");

// Create only items with value > 2
div({ $for: [1, 2, 3], $if: (item) => item > 2 }, (item) => item);
```

#### `$ref` - reference created element

A key under which element will be stored must be an object!

```javascript
const { div, ref, setRef } = htmlhammer;

// Reference by object
let obj = {};

// Prior to 2.2.0
let element = div({ $ref: setRef(obj) }, "Hello World!");

// Version 2.2.0 allows ref to be set just by passing an object reference
let element = div({ $ref: obj }, "Hello World!");

console.log(ref(obj) === element);

// Manually assigning id if the same object is used for multiple references
let person = new Person("Lena", 0);

div({ $ref: setRef(person, "name") }, person.name);
div({ $ref: setRef(person, "age") }, person.age);

console.log(ref(person, "name"));
console.log(ref(person, "age"));

// If used in combination with $for do not set object reference manually because it will automatically be set to the list item value
element = div(
    { $for: [{ v: 1 }, { v: 2 }, { v: 3 }], $ref: setRef },
    "Hello World!"
);
```

#### `$apply` - apply anything to an element

Use this attribute to apply anything to an element. This gives you the full power of JavaScript Element API mixed
within `htmlhammer's` inline element creation. This can also be ideal for sharing style, logic, event handlers etc.
across multiple components/elements. $apply can be given as a function which receives element or an array of such
functions.

```javascript
const RedText = (el) => (el.style.color = "red");

// Function which can replace new HtmlString("<h1>Hello</h1>")
const HTMLContent = (data) => (el) => (el.innerHTML = data);

// Valid usages
div({ $apply: RedText });
div({ $apply: [RedText, HTMLContent("<h1>Hello</h1>")] });
```

### Setting on-event actions

Event names are case-sensitive. For each event use corresponding element's event name.

```javascript
// Defines element's onclick event function
a({ onclick: (e) => alert("Clicked!") }, "Click me");
// Defines plain function on element, will not trigger on click
a({ onClick: (e) => alert("Clicked!") }, "Click me");
```

### Setting CSS

CSS is given in the form of JSON object when using element's style attribute or HTMLStyleElement when using HTML tag
style.

```javascript
// Global, using HTMLStyleElement
document.head.append(
    style(`
      body {
        font-size: 12px;
      }`)
);

// Inline, using style attribute
div({ style: { color: "red", fontSize: "12px" } }, "Hello World!");
```

When setting style attribute values, use corresponding JavaScript CSS property names.
See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Properties_Reference).

### Custom child appender

Version 2.0.0 introduced option to provide a custom way of how child element is appended to parent element. Use case for
this can be seen in `HtmlString` appender where raw html in the form of string needs to inserted to DOM element. For
this to happen, element's `insertAdjacentHTML` method is used instead of default `append` method. See how HtmlString
appender is implemented in [appenders.js](https://github.com/vsmid/htmlhammer/blob/master/esm/appenders.js).

## Custom elements

### Method signature

`customElement(tagName, provider, type)`

-   `tagName` - custom element tag name
-   `provider` - plain JS object with lifecycle functions and props implementations. See under [Lifecycle and reserved props](#lifecycle-and-reserved-props).
-   `type` - optional, function reference to one of htmlhammer's functions (e.q. div, a, table etc.). Use when you want to
    extend existing html element, e.q. HTMLDivElement.

### Lifecycle and reserved props

-   postConstruct
-   connectedCallback
-   disconnectedCallback
-   attributeChangedCallback
-   adoptedCallback
-   observedAttributes

Differences to the specification:

-   `postConstruct` - think of it as a constructor.
-   `observedAttributes` - an array of strings (names of the observed attributes)

### Create generic custom element

-   Using only htmlhammer

```javascript
const { customElement } = htmlhammer; // or use ES6 import

const yetiCustom = customElement("yeti-custom", {
    connectedCallback() {
        console.log("Generic custom element created!");
    },
});

document.body.append(yetiCustom());
```

-   Using htmlhammer and html

```html
<script>
    const { customElement } = htmlhammer; // or use ES6 import

    const yetiCustom = customElement("yeti-custom", {
        connectedCallback() {
            console.log("Generic custom element created!");
        },
    });
</script>

<yeti-custom></yeti-custom>
```

### Extending existing native element

Examples below show how to extend existing [HTMLDivElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDivElement)

-   Using only htmlhammer

```javascript
const { div, customElement } = htmlhammer; // or use ES6 import

const yetiDiv = customElement(
    "yeti-div",
    {
        connectedCallback() {
            console.log("Generic custom element created!");
        },
    },
    div
);

document.body.append(div({ is: "yeti-div" }));
```

-   Using htmlhammer and html

```html
<script>
    const { div, customElement } = htmlhammer; // or use ES6 import

    const yetiDiv = customElement(
        "yeti-div",
        {
            connectedCallback() {
                console.log("Generic custom element created!");
            },
        },
        div
    );
</script>

<div is="yeti-div"></div>
```

### Setting shadow dom

-   Inside custom element

```javascript
const { customElement } = htmlhammer; // or use ES6 import

const yetiCustom = customElement("yeti-custom", {
    connectedCallback() {
        this.attachShadow({ mode: "open" });
    },
});
```

-   As htmlhammer attribute

```javascript
yetiCustom(
    { shadowRoot: { mode: "open" } },
    "Hello from Generic CustomElement"
);
```

### Setting styles

-   Inside custom element

```javascript
const { style, customElement } = htmlhammer; // or use ES6 import

const yetiCustom = customElement("yeti-custom", {
    connectedCallback() {
        this.attachShadow({ mode: "open" });
        this.shadowRoot.append(style(`:host { font-weight: bold;}`));
    },
});
```

-   As htmlhammer attribute

```javascript
yetiCustom(
    {
        shadowRoot: {
            mode: "open",
            stylesheets: [style(`:host {color: red;}`)],
        },
    },
    "Hello from Generic CustomElement"
);
```

### Conventions

Conventions apply only to the provider(see under [Method signature](#method-signature)).

-   Function starting with capital letter - binds function to context (custom element instance)
-   Property starting with capital letter - receives get/set methods
-   Property not starting with capital letter - receives only get method
-   Property is named the same as observed attribute - property will reflect attribute

### Counter web component example

This example demonstrates how you can use this library to build web component with simple state management and a few action buttons. It also shows you a cool way of how you can set and assign any node you would like to reference at any time during component's life. This feature is basically a consequence of building html with javascript which htmlhammer is all about.

```javascript
// Simplified counter component example
export const Counter = customElement("yeti-counter", {
    Count: 0,
    connectedCallback() {
        this.append(
            button({ id: "dec", onclick: this.Dec }, "-"),
            (this.CounterDisplay = span(this.Count)), // Cool way to set and assign html element
            button({ id: "inc", onclick: this.Inc }, "+")
        );
    },
    observedAttributes: ["count"],
    attributeChangedCallback(n, ov, nv) {
        // Each time Count changes a new console log is written
        console.log(`Counter change: ${ov} -> ${nv}`);
    },
    Inc() {
        this.Update(++this.Count);
    },
    Dec() {
        this.Update(--this.Count);
    },
    Update(count) {
        this.CounterDisplay.textContent = count; // Assigned html element referenced
    },
});
```

See [complete counter web component example](https://github.com/vsmid/htmlhammer/blob/master/demo/counter-web-component-example.js).

### Demo

Demo is basically `index.html` file found in the root of the project served as a github page.

[Live demo](https://vsmid.github.io/htmlhammer/)

## Project's NPM scripts

### `test` - run tests

```script
npm test
```

### `coverage` - create and print test coverage report to console

```script
npm run coverage
```

### `coverage:file` - create and print test coverage report to test-coverage-report.txt file

```script
npm run coverage:file
```

### `build` - build project

```script
npm run build
```

## [Current version test coverage report](https://github.com/vsmid/htmlhammer/blob/master/test-coverage-report.txt)
