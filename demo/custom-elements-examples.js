import { customElement, div, style } from "../esm/index.js";

export const YetiCustom = customElement("yeti-custom", {
    connectedCallback() {
        console.log("Generic custom element created!");
        // Set shadow only if not set via htmlhammer's element attribute
        // this.attachShadow({ mode: "open" });

        // Add styles to shadow
        this.shadowRoot.append(style(`:host { font-weight: bold;}`));
    },
    observedAttributes: ["age"],
    attributeChangedCallback(n, ov, nv) {
        console.log("Attribute value change: ", n, ov, nv);
    },
    Data: "ok", // Public get, set
    data: "ok", // Only public get
    age: 2, // Will reflect observed attribute
});

export const DefaultYetiCustom = YetiCustom(
    {
        style: { color: "red" },
        onclick: (e) => {
            alert(e.currentTarget.Data + " " + e.currentTarget.data);
        },
        shadowRoot: {
            mode: "open",
            stylesheets: [style(`:host {color: red;}`)],
        },
    },
    "Hello from Generic CustomElement"
);

// Extends HTMLDivElement
export const YetiDiv = customElement(
    "yeti-div",
    {
        connectedCallback() {
            console.log("Extended HTMLDivElement created!");
        },
    },
    div
);

export const DefaultExtendedNativeHTMLDivElement = div(
    { is: "yeti-div" },
    "Hello from extended HTMLDivElement"
);
