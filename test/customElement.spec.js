const o = require('ospec');
const { document } = require('basichtml').init({});

o.spec('CustomElement', () => {
  const customElement =
    require('../cjs/customElement.js').customElement;

  o('Should create basic, generic custom element', () => {
    const elHammer = customElement('el-hammer1', {
      Count: 0,
      postConstruct: function () {
        this.Count = 1;
      },
      connectedCallback: function () {
        this.Count = 2;
      },
      CountState() {
        return this.Count;
      }
    });

    let instance = elHammer({});
    document.body.append(instance);

    // variable count should be 2)
    o(instance.CountState()).equals(2);
  });

  o(
    'Should use default property value when reflecting attribute',
    () => {
      const elHammer = customElement('el-hammer2', {
        count: 0,
        observedAttributes: ['count'],
        postConstruct: function () {
          this.count = 1;
        },
        connectedCallback: function () {
          this.count = 2;
        },
        attributeChangedCallback(n, ov, nv) {},
        CountState() {
          return this.count;
        }
      });

      let instance = elHammer({});
      document.body.append(instance);

      o(instance.CountState()).equals(2);

      instance.setAttribute('count', 3);

      o(instance.CountState()).equals(3);
    }
  );

  o(
    'Should assign primitive, function, class or object correctly',
    () => {
      const elHammer = customElement('el-hammer3', {
        postConstruct: function () {
          class A {
            constructor() {
              this.id = 1;
            }
          }
          this.p = 1;
          this.o = { id: 1 };
          this.c = new A();
          this.f = () => 1;
        },
        connectedCallback() {}
      });

      let instance = elHammer({});
      document.body.append(instance);

      o(instance.p).equals(1);
      o(instance.o.id).equals(1);
      o(instance.c.id).equals(1);
      o(instance.f()).equals(1);
    }
  );
});
