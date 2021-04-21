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
const buildBase = (provider, is) => {
    let el = is ? is().constructor : HTMLElement;
    const CustomElement = class extends el {
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
    defineProperties(CustomElement, {
        observedAttributes: { value: provider.observedAttributes }
    });

    return CustomElement;
};

export const customElement = (name, provider, is) => {

    const CustomElement = buildBase(provider, is);

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

    let options = is ? { extends: is().localName } : {};

    customElements.define(name, CustomElement, options);

    return define(name);
};