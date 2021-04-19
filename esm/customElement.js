import { define } from "./html.js";

const { defineProperty, defineProperties } = Object;
const reserved = [
    "constructor",
    "connectedCallback",
    "disconnectedCallback",
    "attributeChangedCallback",
    "adoptedCallback",
    "observedAttributes"
];
const isUppercase = (member) => /[A-Z]/.test(member.charAt(0));
const isFunction = (member) => typeof member === "function";
const isProperty = (member) => !isFunction(member);
const isObserved = (member, observed) => observed.includes(member.toLowerCase());
const members = (provider) => Object.keys(provider).filter(member => !reserved.includes(member));
const buildBase = (provider) => {
    const CustomElement = class extends HTMLElement {
        constructor() {
            super();
            provider.constructor();
        }
    };

    const prototype = {};

    reserved
        .filter(member => member !== "observedAttributes")
        .forEach(member => prototype[member] = { value: provider[member] });

    defineProperties(CustomElement.prototype, prototype);

    const staticAccessors = {
        observedAttributes: { value: provider.observedAttributes }
    };

    defineProperties(CustomElement, staticAccessors);

    return CustomElement;
};

export const customElement = (name, provider) => {

    const CustomElement = buildBase(provider);

    members(provider).forEach(
        member => {
            switch (true) {
                case isUppercase(member) && isFunction(provider[member]):
                    defineProperty(
                        CustomElement.prototype,
                        member,
                        { value: provider[member] }
                    );
                    break;
                case isProperty(provider[member]):
                    let valueRef = provider[member];
                    switch (true) {
                        case isObserved(member, provider.observedAttributes):
                            defineProperty(
                                CustomElement.prototype,
                                member,
                                {
                                    get() {
                                        return this.getAttribute(member);
                                    },
                                    set(newVal) {
                                        this.setAttribute(member, newVal);
                                    }
                                });
                            break;
                        case isUppercase(member):
                            defineProperty(
                                CustomElement.prototype,
                                member, {
                                    get() {
                                        return valueRef;
                                    },
                                    set(newVal) {
                                        valueRef = newVal;
                                    }
                                });
                            break;
                        case !isUppercase(member):
                            defineProperty(
                                CustomElement.prototype,
                                member,
                                {
                                    get() {
                                        return valueRef;
                                    }
                                });
                            break;
                        default:
                            break;
                    }
                    break;
                default:
                    break;
            }
        }
    );

    customElements.define(name, CustomElement);

    return define(name);
};