export class ChildAppender {
  constructor(element) {
    this.element = element;
  }
  append(parentElement) { }
}

export class HtmlString extends ChildAppender {
  constructor(element, ...params) {
    super(element.constructor.name === "Function" ? element(...params) : element);
  }
  append(parentElement) {
    if (this.element) {
      parentElement.insertAdjacentHTML(
        "beforeend",
        this.element.constructor.name === "String" ? this.element : this.element.toString()
      );
    }
  }
}
