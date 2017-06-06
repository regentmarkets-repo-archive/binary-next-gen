export default () => ({
    load() {
        return Promise.resolve(Object.keys(localStorage).reduce((acc, key) => {
            if (localStorage.getItem(key) !== 'undefined') {
                try {
                    acc[key] = JSON.parse(localStorage.getItem(key));
                } catch (e) {
                    //  suppress any data parsing
                }
             }
            return acc;
        }, {}));
    },
    save(state) {
        Object.keys(state).forEach(key => {
            if (state[key]) {
                localStorage.setItem(key, JSON.stringify(state[key]));
            }
        });
        return Promise.resolve();
    },
});
