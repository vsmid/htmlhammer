const o = require("ospec");
const { document } = require("basichtml").init({});

o.spec("Ref", () => {
    o.spec("#setRef & #ref", () => {
        const { ref, setRef } = require("../cjs/ref.js").default;

        o("Should return ref in an array", () => {
            let ob = {};
            let el = document.createElement("div");

            setRef(ob)(el);

            o(Array.isArray(ref(ob))).equals(true);
        });

        o("Should store multiple objects for the same ref object", () => {
            let ob = {};
            let el1 = document.createElement("div");
            let el2 = document.createElement("div");

            setRef(ob)(el1);
            setRef(ob)(el2);

            o(Array.isArray(ref(ob))).equals(true);

            o(ref(ob)[0]).equals(el1);
            o(ref(ob)[1]).equals(el2);
        });

        o("Should set ref without id", () => {
            let ob = {};
            let el = document.createElement("div");

            setRef(ob)(el);

            o(ref(ob)[0]).equals(el);
        });

        o("Should set ref with id", () => {
            let ob = {};
            let el = document.createElement("div");

            setRef(ob, "dummy")(el);

            // When id is set, elements are stored in an object and not array
            o(ref(ob, "dummy")).equals(el);
        });

        o("Should return null if object is null", () => {
            o(ref(null)).equals(null);
        });

        o(
            "Should return undefined if trying to set value for key === null",
            () => {
                o(setRef(null)(document.createElement("div"))).equals(
                    undefined
                );
            }
        );

        o("Should override value for existing key", () => {
            let ob = {};
            let el1 = document.createElement("div");
            let el2 = document.createElement("div");

            setRef(ob)(el1);
            setRef(ob)(el2);

            o(ref(ob)[0]).equals(el1);
            o(ref(ob)[1]).equals(el2);
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
