const o = require("ospec");
const { document } = require("basichtml").init({});

o.spec("CustomElement", () => {
    const customElement = require("../cjs/customElement.js").customElement;

    o("Should create basic, generic custom element", () => {
        const elHammer = customElement("el-hammer1", {
            Count: 0,
            postConstruct: function () {
                this.Count = 1;
            },
            connectedCallback: function () {
                this.Count = 2;
            },
            CountState() {
                return this.Count;
            },
        });

        let instance = elHammer({});
        document.body.append(instance);

        // variable count should be 2)
        o(instance.CountState()).equals(2);
    });

    o("Should use default property value when reflecting attribute", () => {
        const elHammer = customElement("el-hammer2", {
            count: 0,
            observedAttributes: ["count"],
            postConstruct: function () {
                this.count = 1;
            },
            connectedCallback: function () {
                this.count = 2;
            },
            attributeChangedCallback(n, ov, nv) {},
            CountState() {
                return this.count;
            },
        });

        let instance = elHammer({});
        document.body.append(instance);

        o(instance.CountState()).equals(2);

        instance.setAttribute("count", 3);

        o(instance.CountState()).equals(3);
    });
});
