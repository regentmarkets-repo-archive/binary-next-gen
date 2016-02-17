export default () => ({
    load() {
        return Promise.resolve(Object.keys(localStorage).reduce((acc, key) => {
            acc[key] = JSON.parse(localStorage.getItem(key));
            return acc;
        }, {}));
    },
    save(state) {
        Object.keys(state).forEach(key =>
            localStorage.setItem(key, JSON.stringify(state[key]))
        );
        return Promise.resolve();
    },
});
