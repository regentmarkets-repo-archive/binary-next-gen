import { createSelectorCreator, defaultMemoize } from 'reselect';
import Immutable from 'immutable';

function createSelectorForImmutable(...args) {
    return createSelectorCreator(defaultMemoize, (a, b) => a === b || Immutable.is(a, b))(...args);
}
export default createSelectorForImmutable;
