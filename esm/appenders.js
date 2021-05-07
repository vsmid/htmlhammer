export class ChildAppender {
    constructor(element) {
        this.element = element;
    }
    append(parentElement) {
        // Implement this method in classes extending ChildAppender
    }
}

export class HtmlString extends ChildAppender {
    constructor(element, ...params) {
        super(typeof element === "function" ? element(...params) : element);
    }

    append(parentElement) {
        if (this.element) {
            parentElement.insertAdjacentHTML(
                "beforeend",
                typeof this.element === "string"
                    ? this.element
                    : this.element.toString()
            );
        }
    }
}
