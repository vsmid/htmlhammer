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
          this.s = 's';
          this.o = { id: 1 };
          this.c = new A();
          this.f = () => 1;
        },
        connectedCallback() {}
      });

      let instance = elHammer({});
      document.body.append(instance);

      o(instance.p).equals(1);
      o(instance.s).equals('s');
      o(instance.o.id).equals(1);
      o(instance.c.id).equals(1);
      o(instance.f()).equals(1);
    }
  );

  o(
    'Should prioritize provided observed attribute value when setting initial observed attribute value',
    () => {
      const elHammer = customElement('el-hammer4', {
        count: 1,
        observedAttributes: ['count'],
        connectedCallback: function () {},
        CountState() {
          return this.count;
        }
      });

      let instance = elHammer({ count: 6 });
      document.body.append(instance);

      o(instance.CountState()).equals(6);
    }
  );

  o(
    'Should create a new customElement instance with cloned properties (structuredClone)',
    () => {
      class P {}
      const elHammer = customElement('el-hammer5', {
        State: { v: 1 },
        Fn: function () {
          return this.State.v;
        },
        S1: new String('s'),
        S2: 's',
        N1: new Number(1),
        N2: 1,
        P: new P(),
        A: [1, 2, 3],
        connectedCallback: function () {}
      });

      let instance1 = elHammer({});
      let instance2 = elHammer({});

      o(instance1.State).notEquals(instance2.State);
      instance2.State.v += 1;
      o(instance1.Fn()).notEquals(instance2.Fn());

      o(instance1.S1).notEquals(instance2.S1);
      o(instance1.S2).equals(instance2.S2);

      o(instance1.N1).notEquals(instance2.N1);
      o(instance1.N2).equals(instance2.N2);

      o(instance1.P).notEquals(instance2.P);

      o(instance1.A).notEquals(instance2.A);
    }
  );
});
