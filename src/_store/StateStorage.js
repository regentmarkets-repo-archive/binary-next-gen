export default class StateStorage {
    static get(key) {
        return localStorage.getItem(key);
    }

    static set(key, val) {
        return localStorage.setItem(key, val);
    }
}
