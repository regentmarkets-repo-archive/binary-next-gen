export function generatorWillEventually(gen, condition) {
    for (let v of gen()) {
        if (condition(v.value)) {
            return true;
        }
    }
    return false;
}
