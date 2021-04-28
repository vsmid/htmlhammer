## 3.2.4
Minor change about how attributes are attached.

## 3.2.3
Fixed bug where boolean attributes were not set correctly.

## 3.2.2
Fixed bug where properties defined in provider were shared across each instance of custom element.

## 3.2.1
Fixed bug where zero value(e.g. number 0) was not appended to parent element.

## 3.2.0
Experimental support for custom elements.

## 3.1.0

This version contains minor internal code upgrades such as:
* removed typefunction from html module
* applied new prettier code format
* upgraded dependencies


## 3.0.0
* Removed webtools module - not exactly what this lib is about
* Added prettierrc

## 2.4.0
Created separate module(webtools.js) for web development. It will contain helper functions.
First two helper functions:
* app - Generates root element and appends it to the body. Function takes child elements to be appended to the root element.
* comment - creates Comment element