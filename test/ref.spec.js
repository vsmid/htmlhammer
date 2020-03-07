const o = require("ospec");
const { document } = require("basichtml").init({});

o.spec("Ref", () => {

    o.spec("#setRef & #ref", () => {

        const { ref, setRef } = require("../cjs/ref.js").default;

        o("Should set ref without id", () => {
            let ob = {};
            let el = document.createElement("div");

            setRef(ob)(el);

            o(ref(ob)).equals(el);
        });

        o("Should set ref with id", () => {
            let ob = {};
            let el = document.createElement("div");

            setRef(ob, "dummy")(el);

            o(ref(ob, "dummy")).equals(el);
        });

        o("Should return null if object is null", () => {
            o(ref(null)).equals(null);
        });

        o("Should return null if trying to set value for key === null", () => {
            o(setRef(null)(document.createElement("div"))).equals(null);
        });

        o("Should override value for existing key", () => {
            let ob = {};
            let el1 = document.createElement("div");
            let el2 = document.createElement("div");

            setRef(ob)(el1);
            setRef(ob)(el2);

            o(ref(ob)).equals(el2);
        });

        o("Should override value for existing key and id", () => {
            let ob = {};
            let el1 = document.createElement("div");
            let el2 = document.createElement("div");

            setRef(ob, "id")(el1);
            o(ref(ob, "id")).equals(el1);

            setRef(ob, "id")(el2);
            o(ref(ob, "id")).equals(el2);
        });

    });
});