# htmlhammer
Write HTML with JavaScript using real HTML tag names.

## Why?
* String literals tend to get messy and unreadable
* Maybe you don't want or need JSX 
* HyperScript is ok but you would like to avoid manually writing HTML tag names
* Make writing HTML in JavaScript feel almost like writing it in .html file 
* Make writing HTML in JavaScript dead simple and intuitive but keeping all of the JavaScript's power 

## Install

### NPM
* Latest version:
`npm install git+https://github.com/vsmid/htmlhammer.git --save`

* Specific version:
`npm install git+https://github.com/vsmid/htmlhammer.git\#1.0.0 --save`

### Manual download
* Download latest single JavaScript file:
[htmlhammer.js](./htmlhammer.js)

* Download latest minified single JavaScript file:
[htmlhammer.min.js](./htmlhammer.min.js)

For other, specific versions look under tags.

## Including htmlhammer

### Script tag
```html
<script src="./htmlhammer.js"></script>
<!-- script src="./htmlhammer.min.js"></script -->
<script>
  const {div, a, h1} = htmlhammer;
</script>
```

### Import as cjs
```javascript
import {div, a, h1} from "htmlhammer";
```

### Import as esm
```html
<script type="module">
  import {div, a, h1} from "./node_modules/htmlhammer/esm/index.js";
</script>
```

## Using htmlhammer

## Supported HTML tags/elements
See the list on [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element).
Tags/elements marked as obsolete/deprecated are not supported.

## Signature
```javascript
// Function name htmltagname is one of supported HTML tag/elements, e.g. div, a, h1, table etc.
htmltagname(attributes = {}, ...children)
```
Parameters:
* attributes - JSON object where key is the name of the element's attribute and value is the new attribute value. See **reserved attributes**.
* children - element or elements to be appended to parent element. Can be string, number, another HTMLElement created in a regular way or by **htmlhammer**, function returning one of the previously stated types etc.

Returns:
* An array of HTMLElement or a single HTMLElement.

### How it looks?
```javascript
let items = [{value: 1}, {value: 2}];

document.body.append(
  div({style: { color: "red" }},
    h1({}, "I am the title"),
    a({href: "#"}, "Click me!"),
    table({},
      tr({$for: items}, item => 
        td({}, item.value)
      )
    )
  )
);
```

For more complex and complete example check [index.html](./index.html).

### Reserved element attributes

#### `$for` - creating multiple elements of the same type
```javascript
// Creates three elements of type div, <div>1</div>, <div>2</div>, <div>3</div>
div({$for: [1, 2, 3]}, item => item);
```

#### `$if` - conditionally create element
```javascript
div({$if: true}, "I am created");
div({$if: () => true}, "I am created");

// Create only items whith value > 2
div({$for: [1, 2, 3], $if: item => item > 2}, item => item);
```

#### `$ref` - reference created element
A key under which element will be stored must be an object!
```javascript
const {div, ref, setRef} = htmlhammer;

// Reference by object
let obj = {};

let element = div({ $ref: setRef(obj)}, "Hello World!");

console.log(ref(obj) === element);

// Manually assigning id if the same object is used for multiple references
let person = new Person("Lena", 0);

div({ $ref: setRef(person, "name")}, person.name);
div({ $ref: setRef(person, "age")}, person.age);

console.log(ref(person)["name"]);
console.log(ref(person)["age"]);

// If used in combination with $for do not set object reference manually because it will automatically be set to the list item value
element = div({ $for: [{v: 1}, {v: 2}, {v: 3}], $ref: setRef}, "Hello World!");
```

### Setting on-event actions
Event names are case sensitive. For each event use corresponding element's attribute name.
```javascript
a({onclick: e => alert("Clicked!")}, "Click me");
```

### Setting inline CSS
Inline CSS is given in the form of JSON object.
```javascript
div({style: {color: "red", fontSize: "12px"}}, "Hello World!");
```

## Project's NPM scripts

### `test` - run tests
```script 
npm test
```

### `coverage` - create and print test coverage report to console
```script
npm run coverage
```

### `coverage:file` - create and print test coverage report to test-coverage.txt file
```script
npm run coverage
```

### `build` - build project
```script
npm run build
```

## [Current version test coverage report](./test-coverage.txt)
