const o = require("ospec");
const { document } = require("basichtml").init({});

o.spec("HTML", () => {
    o.spec("Exports", () => {
        const html = require("../cjs/html.js").default;

        o.spec("Main root non deprecated HTML tag creating functions", () => {
            o("html", () => {
                o(html.html().nodeName).equals("html");
            });
        });

        o.spec(
            "Document metadata non deprecated HTML tag creating functions",
            () => {
                o("base", () => {
                    o(html.base().nodeName).equals("base");
                });
                o("head", () => {
                    o(html.head().nodeName).equals("head");
                });
                o("link", () => {
                    o(html.link().nodeName).equals("link");
                });
                o("meta", () => {
                    o(html.meta().nodeName).equals("meta");
                });
                o("style", () => {
                    o(html.style().nodeName).equals("style");
                });
                o("title", () => {
                    o(html.title().nodeName).equals("title");
                });
            }
        );

        o.spec(
            "Sectioning root non deprecated HTML tag creating functions",
            () => {
                o("body", () => {
                    o(html.body().nodeName).equals("body");
                });
            }
        );

        o.spec(
            "Content sectioning non deprecated HTML tag creating functions",
            () => {
                o("address", () => {
                    o(html.address().nodeName).equals("address");
                });
                o("article", () => {
                    o(html.article().nodeName).equals("article");
                });
                o("aside", () => {
                    o(html.aside().nodeName).equals("aside");
                });
                o("footer", () => {
                    o(html.footer().nodeName).equals("footer");
                });
                o("header", () => {
                    o(html.header().nodeName).equals("header");
                });
                o("h1", () => {
                    o(html.h1().nodeName).equals("h1");
                });
                o("h2", () => {
                    o(html.h2().nodeName).equals("h2");
                });
                o("h3", () => {
                    o(html.h3().nodeName).equals("h3");
                });
                o("h4", () => {
                    o(html.h4().nodeName).equals("h4");
                });
                o("h5", () => {
                    o(html.h5().nodeName).equals("h5");
                });
                o("h6", () => {
                    o(html.h6().nodeName).equals("h6");
                });
                o("hggroup", () => {
                    o(html.hggroup().nodeName).equals("hggroup");
                });
                o("main", () => {
                    o(html.main().nodeName).equals("main");
                });
                o("nav", () => {
                    o(html.nav().nodeName).equals("nav");
                });
                o("section", () => {
                    o(html.section().nodeName).equals("section");
                });
            }
        );

        o.spec(
            "Text content non deprecated HTML tag creating functions",
            () => {
                o("blockquote", () => {
                    o(html.blockquote().nodeName).equals("blockquote");
                });
                o("dd", () => {
                    o(html.dd().nodeName).equals("dd");
                });
                o("div", () => {
                    o(html.div().nodeName).equals("div");
                });
                o("dl", () => {
                    o(html.dl().nodeName).equals("dl");
                });
                o("dt", () => {
                    o(html.dt().nodeName).equals("dt");
                });
                o("figcaption", () => {
                    o(html.figcaption().nodeName).equals("figcaption");
                });
                o("figure", () => {
                    o(html.figure().nodeName).equals("figure");
                });
                o("hr", () => {
                    o(html.hr().nodeName).equals("hr");
                });
                o("li", () => {
                    o(html.li().nodeName).equals("li");
                });
                o("ol", () => {
                    o(html.ol().nodeName).equals("ol");
                });
                o("p", () => {
                    o(html.p().nodeName).equals("p");
                });
                o("pre", () => {
                    o(html.pre().nodeName).equals("pre");
                });
                o("ul", () => {
                    o(html.ul().nodeName).equals("ul");
                });
            }
        );

        o.spec(
            "Inline text semantics non deprecated HTML tag creating functions",
            () => {
                o("a", () => {
                    o(html.a().nodeName).equals("a");
                });
                o("abbr", () => {
                    o(html.abbr().nodeName).equals("abbr");
                });
                o("b", () => {
                    o(html.b().nodeName).equals("b");
                });
                o("bdi", () => {
                    o(html.bdi().nodeName).equals("bdi");
                });
                o("bdo", () => {
                    o(html.bdo().nodeName).equals("bdo");
                });
                o("br", () => {
                    o(html.br().nodeName).equals("br");
                });
                o("cite", () => {
                    o(html.cite().nodeName).equals("cite");
                });
                o("code", () => {
                    o(html.code().nodeName).equals("code");
                });
                o("data", () => {
                    o(html.data().nodeName).equals("data");
                });
                o("dfn", () => {
                    o(html.dfn().nodeName).equals("dfn");
                });
                o("em", () => {
                    o(html.em().nodeName).equals("em");
                });
                o("i", () => {
                    o(html.i().nodeName).equals("i");
                });
                o("kbd", () => {
                    o(html.kbd().nodeName).equals("kbd");
                });
                o("mark", () => {
                    o(html.mark().nodeName).equals("mark");
                });
                o("q", () => {
                    o(html.q().nodeName).equals("q");
                });
                o("rb", () => {
                    o(html.rb().nodeName).equals("rb");
                });
                o("rp", () => {
                    o(html.rp().nodeName).equals("rp");
                });
                o("rt", () => {
                    o(html.rt().nodeName).equals("rt");
                });
                o("rtc", () => {
                    o(html.rtc().nodeName).equals("rtc");
                });
                o("ruby", () => {
                    o(html.ruby().nodeName).equals("ruby");
                });
                o("s", () => {
                    o(html.s().nodeName).equals("s");
                });
                o("samp", () => {
                    o(html.samp().nodeName).equals("samp");
                });
                o("small", () => {
                    o(html.small().nodeName).equals("small");
                });
                o("span", () => {
                    o(html.span().nodeName).equals("span");
                });
                o("strong", () => {
                    o(html.strong().nodeName).equals("strong");
                });
                o("sub", () => {
                    o(html.sub().nodeName).equals("sub");
                });
                o("sup", () => {
                    o(html.sup().nodeName).equals("sup");
                });
                o("time", () => {
                    o(html.time().nodeName).equals("time");
                });
                o("u", () => {
                    o(html.u().nodeName).equals("u");
                });
                o("variable", () => {
                    o(html.variable().nodeName).equals("variable");
                });
                o("wbr", () => {
                    o(html.wbr().nodeName).equals("wbr");
                });
            }
        );

        o.spec(
            "Image and multimedia non deprecated HTML tag creating functions",
            () => {
                o("area", () => {
                    o(html.area().nodeName).equals("area");
                });
                o("audio", () => {
                    o(html.audio().nodeName).equals("audio");
                });
                o("img", () => {
                    o(html.img().nodeName).equals("img");
                });
                o("map", () => {
                    o(html.map().nodeName).equals("map");
                });
                o("track", () => {
                    o(html.track().nodeName).equals("track");
                });
                o("video", () => {
                    o(html.video().nodeName).equals("video");
                });
            }
        );

        o.spec(
            "Embedded content non deprecated HTML tag creating functions",
            () => {
                o("embed", () => {
                    o(html.embed().nodeName).equals("embed");
                });
                o("iframe", () => {
                    o(html.iframe().nodeName).equals("iframe");
                });
                o("object", () => {
                    o(html.object().nodeName).equals("object");
                });
                o("param", () => {
                    o(html.param().nodeName).equals("param");
                });
                o("picture", () => {
                    o(html.picture().nodeName).equals("picture");
                });
                o("source", () => {
                    o(html.source().nodeName).equals("source");
                });
            }
        );

        o.spec("Scripting non deprecated HTML tag creating functions", () => {
            o("canvas", () => {
                o(html.canvas().nodeName).equals("canvas");
            });
            o("noscript", () => {
                o(html.noscript().nodeName).equals("noscript");
            });
            o("script", () => {
                o(html.script().nodeName).equals("script");
            });
        });

        o.spec(
            "Demarcating edits non deprecated HTML tag creating functions",
            () => {
                o("del", () => {
                    o(html.del().nodeName).equals("del");
                });
                o("ins", () => {
                    o(html.ins().nodeName).equals("ins");
                });
            }
        );

        o.spec(
            "Table content non deprecated HTML tag creating functions",
            () => {
                o("caption", () => {
                    o(html.caption().nodeName).equals("caption");
                });
                o("col", () => {
                    o(html.col().nodeName).equals("col");
                });
                o("colgroup", () => {
                    o(html.colgroup().nodeName).equals("colgroup");
                });
                o("table", () => {
                    o(html.table().nodeName).equals("table");
                });
                o("tbody", () => {
                    o(html.tbody().nodeName).equals("tbody");
                });
                o("td", () => {
                    o(html.td().nodeName).equals("td");
                });
                o("tfoot", () => {
                    o(html.tfoot().nodeName).equals("tfoot");
                });
                o("th", () => {
                    o(html.th().nodeName).equals("th");
                });
                o("thead", () => {
                    o(html.thead().nodeName).equals("thead");
                });
                o("tr", () => {
                    o(html.tr().nodeName).equals("tr");
                });
            }
        );

        o.spec("Forms non deprecated HTML tag creating functions", () => {
            o("button", () => {
                o(html.button().nodeName).equals("button");
            });
            o("datalist", () => {
                o(html.datalist().nodeName).equals("datalist");
            });
            o("fieldset", () => {
                o(html.fieldset().nodeName).equals("fieldset");
            });
            o("form", () => {
                o(html.form().nodeName).equals("form");
            });
            o("input", () => {
                o(html.input().nodeName).equals("input");
            });
            o("label", () => {
                o(html.label().nodeName).equals("label");
            });
            o("legend", () => {
                o(html.legend().nodeName).equals("legend");
            });
            o("meter", () => {
                o(html.meter().nodeName).equals("meter");
            });
            o("oprgroup", () => {
                o(html.oprgroup().nodeName).equals("oprgroup");
            });
            o("option", () => {
                o(html.option().nodeName).equals("option");
            });
            o("output", () => {
                o(html.output().nodeName).equals("output");
            });
            o("progress", () => {
                o(html.progress().nodeName).equals("progress");
            });
            o("select", () => {
                o(html.select().nodeName).equals("select");
            });
            o("textarea", () => {
                o(html.textarea().nodeName).equals("textarea");
            });
        });

        o.spec(
            "Interactive elements non deprecated HTML tag creating functions",
            () => {
                o("details", () => {
                    o(html.details().nodeName).equals("details");
                });
                o("dialog", () => {
                    o(html.dialog().nodeName).equals("dialog");
                });
                o("menu", () => {
                    o(html.menu().nodeName).equals("menu");
                });
                o("summary", () => {
                    o(html.summary().nodeName).equals("summary");
                });
            }
        );

        o.spec(
            "Web Components non deprecated HTML tag creating functions",
            () => {
                o("slot", () => {
                    o(html.slot().nodeName).equals("slot");
                });
                o("template", () => {
                    o(html.template().nodeName).equals("template");
                });
            }
        );
    });

    o.spec("Blueprint", () => {
        const Blueprint = require("../cjs/html.js").Blueprint;

        o("Should set default values", () => {
            let bp = new Blueprint();

            o(bp.tag).equals(null);
            o(bp.object).equals(null);
            o(JSON.stringify(bp.attributes)).equals("{}");
            o(JSON.stringify(bp.children)).equals("[]");
        });

        o("Should set given values", () => {
            let ob = { name: "Lena" };
            let attr = { id: 1 };
            let children = ["Hello"];

            let bp = new Blueprint("div", ob, attr, children);

            o(bp.tag).equals("div");
            o(bp.object).equals(ob);
            o(bp.attributes).equals(attr);
            o(bp.children).equals(children);
        });
    });

    o.spec("#attachAttribute", () => {
        const attachAttribute = require("../cjs/html").attachAttribute;
        const AttributeHandler = require("../cjs/html").AttributeHandler;

        let element;

        o.beforeEach(() => {
            element = document.createElement("div");
        });

        o("Should not attach reserved attributes from AttributeHandler", () => {
            Object.keys(AttributeHandler).forEach((key) => {
                attachAttribute(key, "", element);
                o(element.hasAttribute(key)).equals(false);
            });
        });

        o("Should handle style attribute as JSON", () => {
            attachAttribute(
                "style",
                { color: "red", fontSize: "10px" },
                element
            );

            o(element.getAttribute("style")).equals(
                "color:red;font-size:10px;"
            );
        });

        o(
            "Attribute names starting with 'on' and are defined on element are treated as events",
            () => {
                let counter = 0;

                o(element.onclick).equals(null);

                attachAttribute("onclick", (e) => counter++, element);

                o(typeof element.onclick).equals("function");
                element.onclick();

                o(counter).equals(1);
            }
        );

        o("Attribute names describing events are case sensitive", () => {
            let counter = 0;

            o(element.onHover).equals(undefined);

            attachAttribute("onMouseOver", (e) => counter++, element);

            o(element.onMouseOver).equals(undefined);
            // Attached as regular attribute
            o(element.hasAttribute("onMouseOver")).equals(true);

            attachAttribute("onmouseover", (e) => counter++, element);

            o(typeof element.onmouseover).equals("function");
        });

        o("Regular attributes are attached as-is", () => {
            attachAttribute("speed", 10, element);

            o(element.getAttribute("speed")).equals(10);
        });
    });

    o.spec("#appendChild", () => {
        const appendChild = require("../cjs/html.js").appendChild;
        const HtmlString = require("../cjs/appenders.js").HtmlString;

        o("Should not append null children", () => {
            let element = document.createElement("div");

            appendChild(null, element);

            o(element.childNodes.length).equals(0);
        });

        o("Should not append undefined children", () => {
            let element = document.createElement("div");

            appendChild(undefined, element);

            o(element.childNodes.length).equals(0);
        });

        o("Should append Comment", () => {
            let element = document.createElement("div");
            let child = document.createComment("Hello!");

            appendChild(child, element);

            o(element.childNodes.length).equals(1);
            o(element.childNodes[0]).equals(child);
        });

        o("Should append HTMLElement", () => {
            let element = document.createElement("div");
            let child = document.createElement("a");

            appendChild(child, element);

            o(element.childNodes.length).equals(1);
            o(element.childNodes[0]).equals(child);
        });

        o("Should append array of children", () => {
            let element = document.createElement("div");
            let child1 = document.createElement("a");
            let child2 = document.createElement("a");

            appendChild(() => [child1, child2], element);

            o(element.childNodes.length).equals(2);
            o(element.childNodes[0]).equals(child1);
            o(element.childNodes[1]).equals(child2);
        });

        o("Should append string as text node", () => {
            let element = document.createElement("div");

            appendChild("Hello", element);

            o(element.childNodes.length).equals(1);
            o(element.childNodes[0].nodeName).equals("#text");
            o(element.childNodes[0].textContent).equals("Hello");
        });

        o.spec("HtmlString", () => {
            o("Should append string as inner html", () => {
                let element = document.createElement("div");

                // Mock function
                let mock = o.spy();
                element.insertAdjacentHTML = mock;

                appendChild(new HtmlString("<h1>Hello!</h1>"), element);

                o(mock.callCount).equals(1);
                o(mock.args[0]).equals("beforeend");
                o(mock.args[1]).equals("<h1>Hello!</h1>");
            });

            o(
                "Should append string as inner html when given as function with arbitrary number of params",
                () => {
                    let element = document.createElement("div");

                    // Mock function
                    let mock = o.spy();
                    element.insertAdjacentHTML = mock;

                    appendChild(
                        new HtmlString(
                            (p1, p2) => `<h1>${p1} ${p2}!</h1>`,
                            "Hello",
                            "Lena"
                        ),
                        element
                    );

                    o(mock.callCount).equals(1);
                    o(mock.args[0]).equals("beforeend");
                    o(mock.args[1]).equals("<h1>Hello Lena!</h1>");
                }
            );

            o("Should append number as inner html", () => {
                let element = document.createElement("div");

                // Mock function
                let mock = o.spy();
                element.insertAdjacentHTML = mock;

                appendChild(new HtmlString(1), element);

                o(mock.callCount).equals(1);
                o(mock.args[0]).equals("beforeend");
                o(mock.args[1]).equals("1");
            });
        });

        o("Should append number as text node", () => {
            let element = document.createElement("div");

            appendChild(1, element);

            o(element.childNodes.length).equals(1);
            o(element.childNodes[0].nodeName).equals("#text");
            o(element.childNodes[0].textContent).equals("1");
        });

        o(
            "Should append all other types not tested above as text node by calling #toString() method",
            () => {
                let element = document.createElement("div");
                class Person {
                    toString() {
                        return "Lena";
                    }
                }

                let person = new Person();
                appendChild(person, element);

                let date = new Date();
                appendChild(new Date(), element);

                o(element.childNodes.length).equals(2);
                o(element.childNodes[0].nodeName).equals("#text");
                o(element.childNodes[0].textContent).equals("Lena");

                o(element.childNodes[1].nodeName).equals("#text");
                o(element.childNodes[1].textContent).equals(date.toString());
            }
        );

        o.spec("Should handle children given as function", () => {
            o("Function which returns null", () => {
                let element = document.createElement("div");

                appendChild(() => null, element);

                o(element.childNodes.length).equals(0);
            });

            o("Function which returns undefined", () => {
                let element = document.createElement("div");

                appendChild(() => undefined, element);

                o(element.childNodes.length).equals(0);
            });

            o("Function which returns single HTMLElement", () => {
                let element = document.createElement("div");
                let child = document.createElement("a");

                appendChild(() => child, element);

                o(element.childNodes.length).equals(1);
                o(element.childNodes[0]).equals(child);
            });

            o("Function which returns an array of children", () => {
                let element = document.createElement("div");
                let child1 = document.createElement("a");
                let child2 = document.createElement("a");

                appendChild(() => [child1, child2], element);

                o(element.childNodes.length).equals(2);
                o(element.childNodes[0]).equals(child1);
                o(element.childNodes[1]).equals(child2);
            });

            o("Function which returns string as inner html", () => {
                let element = document.createElement("div");

                let mock = o.spy();
                element.insertAdjacentHTML = mock;

                appendChild(() => new HtmlString("<h1>Hello!</h1>"), element);

                o(mock.callCount).equals(1);
                o(mock.args[0]).equals("beforeend");
                o(mock.args[1]).equals("<h1>Hello!</h1>");
            });

            o("Function which returns string as text node", () => {
                let element = document.createElement("div");

                appendChild(() => "Hello", element);

                o(element.childNodes.length).equals(1);
                o(element.childNodes[0].nodeName).equals("#text");
                o(element.childNodes[0].textContent).equals("Hello");
            });

            o("Function which returns number as text node", () => {
                let element = document.createElement("div");

                appendChild(() => 1, element);

                o(element.childNodes.length).equals(1);
                o(element.childNodes[0].nodeName).equals("#text");
                o(element.childNodes[0].textContent).equals("1");
            });

            o(
                "Function which returns any other type not tested above as text node by calling #toString() method",
                () => {
                    let element = document.createElement("div");
                    class Person {
                        toString() {
                            return "Lena";
                        }
                    }

                    let person = new Person();
                    appendChild(person, element);

                    let date = new Date();
                    appendChild(new Date(), element);

                    o(element.childNodes.length).equals(2);
                    o(element.childNodes[0].nodeName).equals("#text");
                    o(element.childNodes[0].textContent).equals("Lena");

                    o(element.childNodes[1].nodeName).equals("#text");
                    o(element.childNodes[1].textContent).equals(
                        date.toString()
                    );
                }
            );
        });
    });

    o.spec("AttributeHandler", () => {
        const AttributeHandler = require("../cjs/html.js").AttributeHandler;
        const Blueprint = require("../cjs/html.js").Blueprint;

        o.spec("$for", () => {
            o(
                "Should create sinle empty Blueprint if $for is not goven or not an array",
                () => {
                    let bps = AttributeHandler.$for(null);
                    o(bps.length).equals(1);
                    o(bps[0] instanceof Blueprint).equals(true);

                    bps = AttributeHandler.$for(undefined);
                    o(bps.length).equals(1);
                    o(bps[0] instanceof Blueprint).equals(true);

                    bps = AttributeHandler.$for("Hello");
                    o(bps.length).equals(1);
                    o(bps[0] instanceof Blueprint).equals(true);

                    bps = AttributeHandler.$for(2);
                    o(bps.length).equals(1);
                    o(bps[0] instanceof Blueprint).equals(true);
                }
            );

            o("Should create an array of Blueprint instances", () => {
                let items = [{ count: 1 }, { count: 2 }];
                let bps = AttributeHandler.$for(items);

                o(bps.length).equals(2);

                o(bps[0] instanceof Blueprint).equals(true);
                o(bps[0].tag).equals(null);
                o(bps[0].object).equals(items[0]);
                o(JSON.stringify(bps[0].attributes)).equals("{}");
                o(JSON.stringify(bps[0].children)).equals("[]");

                o(bps[1] instanceof Blueprint).equals(true);
                o(bps[1].tag).equals(null);
                o(bps[1].object).equals(items[1]);
                o(JSON.stringify(bps[0].attributes)).equals("{}");
                o(JSON.stringify(bps[0].children)).equals("[]");
            });
        });

        o.spec("$if", () => {
            o("If $if is null or undefined return true", () => {
                o(AttributeHandler.$if(null)).equals(true);
                o(AttributeHandler.$if(undefined)).equals(true);
            });

            o("Should return value as boolean", () => {
                o(AttributeHandler.$if(true)).equals(true);
                o(AttributeHandler.$if(1 == 1)).equals(true);
                o(AttributeHandler.$if(false)).equals(false);
                o(AttributeHandler.$if(1 == 2)).equals(false);

                o(AttributeHandler.$if("car")).equals(true);
            });
        });

        o.spec("$ref", () => {
            const { ref, setRef } = require("../cjs/ref.js").default;

            o("Should not reference given element", () => {
                let element = document.createElement("div");
                let ob = null;

                AttributeHandler.$ref(setRef(ob), null, element);

                o(ref(ob)).equals(null);
            });

            o("Should reference given element", () => {
                let element = document.createElement("div");
                let ob = {};

                AttributeHandler.$ref(setRef(ob), null, element);

                o(ref(ob)[0]).equals(element);
            });

            o("Should reference given element without using setRef", () => {
                let element = document.createElement("div");
                let ob = {};

                AttributeHandler.$ref(ob, null, element);

                o(ref(ob)[0]).equals(element);
            });

            o("Should reference given element by array object", () => {
                let element = document.createElement("div");
                let ob = {};

                AttributeHandler.$ref(setRef, ob, element);

                o(ref(ob)[0]).equals(element);
            });
        });

        o.spec("$apply", () => {
            o("Should apply custom function to the given element", () => {
                const el = document.createElement();
                const redText = (el) => (el.style.color = "red");

                AttributeHandler.$apply(el, redText);

                o(el.style.color).equals("red");
            });

            o(
                "Should apply an array of custom functions to the given element",
                () => {
                    const el = document.createElement();
                    const redText = (el) => (el.style.color = "red");
                    const textContent = (el) =>
                        (el.innerHTML = "<h1>Hello!</h1>");

                    AttributeHandler.$apply(el, [redText, textContent]);

                    o(el.style.color).equals("red");
                    o(el.innerHTML).equals("<h1>Hello!</h1>");
                }
            );
        });
    });

    o.spec("#createElement", () => {
        const createElement = require("../cjs/html.js").createElement;
        const Blueprint = require("../cjs/html.js").Blueprint;

        o("Should create basic element", () => {
            let bp = new Blueprint("div");

            let element = createElement(bp);

            o(element instanceof HTMLElement).equals(true);
            o(element.nodeName).equals("div");
        });

        o("Should create element based on Blueprint", () => {
            let bp = new Blueprint("div", null, { id: "myDiv" }, ["Hello!"]);

            let element = createElement(bp);

            o(element instanceof HTMLElement).equals(true);
            o(element.nodeName).equals("div");
            o(element.textContent).equals("Hello!");
            o(element.id).equals("myDiv");
        });

        o(
            "Should create element based on Blueprint which has object set",
            () => {
                let bp = new Blueprint(
                    "div",
                    { name: "Lena" },
                    { id: "myDiv" },
                    [(person) => person.name]
                );
                let element = createElement(bp);

                o(element instanceof HTMLElement).equals(true);
                o(element.nodeName).equals("div");
                o(element.textContent).equals("Lena");
                o(element.id).equals("myDiv");
            }
        );

        o("Should create element without children", () => {
            let bp = new Blueprint("div", null, {
                id: "myDiv",
            });

            let element = createElement(bp);

            o(element instanceof HTMLElement).equals(true);
            o(element.nodeName).equals("div");
            o(element.id).equals("myDiv");
        });
    });

    o.spec("#define", () => {
        const define = require("../cjs/html.js").define;
        const { ref, setRef } = require("../cjs/ref.js").default;

        o("Should create HTML element definition function", () => {
            o(typeof define("div")).equals("function");
        });

        o(
            "Should create single HTML element based on HTML element definition function",
            () => {
                let divFn = define("div");
                let element = divFn({ id: "myDiv" }, "text");

                o(element instanceof HTMLElement).equals(true);
                o(element.nodeName).equals("div");
                o(element.id).equals("myDiv");
                o(element.childNodes.length).equals(1);
                o(element.childNodes[0].textContent).equals("text");
            }
        );

        o(
            "Should create multiple HTML element based on HTML element definition function -> $for",
            () => {
                let divFn = define("div");
                let elements = divFn({ $for: [1, 2] }, (val) => val);

                o(Array.isArray(elements)).equals(true);
                o(elements[0].nodeName).equals("div");
                o(elements[0].childNodes[0].textContent).equals("1");
                o(elements[1].nodeName).equals("div");
                o(elements[1].childNodes[0].textContent).equals("2");
            }
        );

        o(
            "Should create single HTML element based on HTML element definition function -> $for & $if",
            () => {
                let divFn = define("div");
                let elements = divFn(
                    { $for: [1, 2], $if: (val) => val > 1 },
                    (val) => val
                );

                o(Array.isArray(elements)).equals(false);
                o(elements.nodeName).equals("div");
                o(elements.childNodes[0].textContent).equals("2");
            }
        );

        o(
            "Should create single HTML element based on HTML element definition function -> $for & $if & $ref",
            () => {
                let divFn = define("div");
                let items = [{ v: 1 }, { v: 2 }];
                let elements = divFn(
                    {
                        $for: items,
                        $if: (i) => i.v > 1,
                        $ref: setRef,
                    },
                    (i) => i.v
                );

                o(Array.isArray(elements)).equals(false);
                o(elements.nodeName).equals("div");
                o(elements.childNodes[0].textContent).equals("2");
                o(ref(items[1])[0]).equals(elements);
            }
        );

        o("Should create element without children", () => {
            let divFn = define("div");

            let elements = divFn({});

            o(elements.childNodes.length).equals(0);
        });
    });

    o.spec("#extract", () => {
        const extract = require("../cjs/html.js").extract;

        o("Should extract parts based on input", () => {
            let parts = extract();

            o(Object.keys(parts).length).equals(2);
            o(JSON.stringify(parts.attributes)).equals("{}");
            o(JSON.stringify(parts.children)).equals("[]");

            parts = extract({ id: 1 });

            o(Object.keys(parts).length).equals(2);
            o(JSON.stringify(parts.attributes)).equals('{"id":1}');
            o(JSON.stringify(parts.children)).equals("[]");

            parts = extract("1", 2);

            o(Object.keys(parts).length).equals(2);
            o(JSON.stringify(parts.attributes)).equals("{}");
            o(JSON.stringify(parts.children)).equals('["1",2]');

            parts = extract({ id: 1 }, "1", 2);

            o(Object.keys(parts).length).equals(2);
            o(JSON.stringify(parts.attributes)).equals('{"id":1}');
            o(JSON.stringify(parts.children)).equals('["1",2]');
        });
    });
});
