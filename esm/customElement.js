import { define } from './html.js';

const { defineProperty, defineProperties } = Object;
const reserved = [
  'postConstruct',
  'connectedCallback',
  'disconnectedCallback',
  'attributeChangedCallback',
  'adoptedCallback',
  'observedAttributes'
];
const isUppercase = member => /[A-Z]/.test(member.charAt(0));
const isFunction = member => typeof member === 'function';
const isObserved = (member, observed) =>
  observed.includes(member.toLowerCase());
const members = provider =>
  Object.keys(provider).filter(
    member => !reserved.includes(member)
  );
const bindMembers = (provider, instance) => {
  members(provider)
    .filter(
      member =>
        !reserved.includes(member) &&
        isFunction(provider[member]) &&
        isUppercase(member)
    )
    .forEach(member => {
      instance[member] = provider[member].bind(instance);
    });
};
const assignMembers = (provider, instance) => {
  members(provider)
    .filter(member => !reserved.includes(member))
    .forEach(member => {
      let propertyValue = isFunction(provider[member])
        ? provider[member]
        : structuredClone(provider[member]);
      switch (true) {
        case isObserved(
          member,
          provider.observedAttributes || []
        ):
          defineProperty(instance, member, {
            get() {
              let attributeValue = this.getAttribute(member);
              // If there is no attribute value yet, try property value
              return attributeValue
                ? attributeValue
                : propertyValue;
            },
            set(newVal) {
              this.setAttribute(member, newVal);
            }
          });
          break;
        case isUppercase(member):
          defineProperty(instance, member, {
            get() {
              return propertyValue;
            },
            set(newVal) {
              propertyValue = newVal;
            }
          });
          break;
        case !isUppercase(member):
          defineProperty(instance, member, {
            get() {
              return propertyValue;
            }
          });
          break;
        default:
          break;
      }
    });
};

const build = (provider, type) => {
  let htmlElement = type ? type().constructor : HTMLElement;

  // Provide default attributeChangedCallback function if not set by the provider
  // to prevent 'el.attributeChangedCallback is not a function' error
  // when observedAtrtibutes are defined
  if (provider.observedAttributes) {
    defineProperty(provider, 'attributeChangedCallback', {
      value:
        provider.attributeChangedCallback ??
        function (a, b, c) {}
    });
  }

  const CustomElement = class extends htmlElement {
    constructor() {
      super();
      if (provider.postConstruct) {
        provider.postConstruct();
      }
      // Assign properties
      assignMembers(provider, this);
      // Bind uppercase functions
      bindMembers(provider, this);
    }
  };

  const prototype = {};

  reserved
    .filter(member => member !== 'observedAttributes')
    .forEach(
      member => (prototype[member] = { value: provider[member] })
    );

  defineProperties(CustomElement.prototype, prototype);
  defineProperties(CustomElement, {
    observedAttributes: {
      value: provider.observedAttributes || []
    }
  });

  return CustomElement;
};

export const customElement = (name, provider, type) => {
  const CustomElement = build(provider, type);
  let options = type ? { extends: type().localName } : {};
  customElements.define(name, CustomElement, options);
  return define(name);
};
