import {
  button,
  customElement,
  span,
  style
} from '../esm/index.js';

export const counterStyle = style(
  {},
  `
* {
    font-size: 200%;
}

span {
    width: 4rem;
    display: inline-block;
    text-align: center;
}

button {
    width: 4rem;
    height: 4rem;
    border: none;
    border-radius: 10px;
    background-color: #81B3DA;
    color: white;
}
`
);

export const Counter = customElement('my-counter-advanced', {
  Count: 0,
  observedAttributes: ['count'],
  attributeChangedCallback(attrName, ov, nv) {
    if (attrName === 'count') {
      this.CounterDisplay.textContent = this.Count;
    }
  },
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.append(
      counterStyle,
      button({ id: 'dec', onclick: () => --this.Count }, '-'),
      (this.CounterDisplay = span(this.Count)),
      button({ id: 'inc', onclick: () => ++this.Count }, '+')
    );
  }
});
