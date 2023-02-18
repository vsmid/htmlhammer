import {
  style,
  customElement,
  button,
  span
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

export const Counter = customElement('my-counter', {
  Count: 0,
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.append(
      counterStyle,
      button({ id: 'dec', onclick: this.Dec }, '-'),
      (this.CounterDisplay = span(this.Count)), // Cool way to set and assign html element
      button({ id: 'inc', onclick: this.Inc }, '+')
    );
  },
  observedAttributes: ['count'],
  attributeChangedCallback(n, ov, nv) {
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
  }
});
