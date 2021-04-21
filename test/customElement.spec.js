const o = require("ospec");
const { document, customElements } = require("basichtml").init({});

o.spec("CustomElement", () => {

    const customElement = require("../cjs/customElement.js").customElement;

    o("Should create basic, generic custom element", () => {
        let i = 0;

        const elHammer = customElement("el-hammer", {
            postConstruct: function() {
                i++;
            },
            connectedCallback: function() {
                i++;
            }
        });

        document.body.append(elHammer({}));

        // variable i should be 2)
        o(i).equals(2);
    });
});