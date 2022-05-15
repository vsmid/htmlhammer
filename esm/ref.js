export default (() => {
    const refs = new WeakMap();
    return {
        ref: (o, id) => {
            let val = id ? refs.get(o)[id] : refs.get(o);
            return o ? val : null;
        },
        setRef: (o, id) => (e) => {
            if (!o) {
                return;
            }

            if (refs.has(o)) {
                if (id) {
                    refs.get(o)[id] = e;
                } else {
                    refs.set(o, [...refs.get(o), e]);
                }
            } else {
                let val = {};
                if (id) {
                    val[id] = e;
                } else {
                    val = [e];
                }
                refs.set(o, val);
            }
        },
    };
})();
