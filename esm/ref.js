export default (() => {
    const refs = new WeakMap();
    return {
        ref: (o, id) => (o ? (id ? refs.get(o)[id] : refs.get(o)) : null),
        setRef: (o, id) => (e) => {
            if (o) {
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
            } else {
                return null;
            }
        }
    };
})();
