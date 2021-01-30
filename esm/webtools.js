import HTML from "./html.js";

const { div } = HTML;

/**
 * Generates application's root element and appends it to the document.body.
 * @param  {...any} elements Elements to be appended to the root element.
 */
const app = (...elements) => document.body.append(div({ id: "root" }, ...elements));

/**
 * A convenient function which creates Comment element.
 * @param {*} comment Comment's text
 */
const comment = (comment) => document.createComment(comment)

export {
    app,
    comment
}

