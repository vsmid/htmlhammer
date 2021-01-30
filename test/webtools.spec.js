const o = require("ospec");
const { Comment } = require("basichtml");
const { document } = require("basichtml").init({});

o.spec("web", () => {

    o.spec("app", () => {
        const { app } = require("../cjs/webtools.js");

        o.beforeEach(function () {
            document.body.innerHTML = "";
        })

        o("Should create root div element with id='root'", () => {
            app();

            o(document.body.innerHTML).equals('<div id="root"></div>');
        });

        o("Should create root div element with id='root' and children", () => {
            app(document.createElement("span"));

            o(document.body.innerHTML).equals('<div id="root"><span></span></div>');
        });
    })

    o.spec("comment", () => {
        const { comment } = require("../cjs/webtools.js");

        o("Should create comment element", () => {
            let cmt = comment("Hello!");

            o(cmt instanceof Comment).equals(true);
            o(cmt.textContent).equals("Hello!");
        });
    });

});