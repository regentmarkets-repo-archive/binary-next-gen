import get from 'lodash.get';
import isFunction from 'lodash.isfunction';
import isObject from 'lodash.isobject';
import set from 'lodash.set';
import unset from 'lodash.unset';

export default (engine, whitelist = [], blacklist = []) => {
    whitelist = whitelist || []; // eslint-disable-line no-param-reassign

    return {
        ...engine,

        save(state) {
            let saveState = {};

            // Copy the whole state if we're about to blacklist only
            if (whitelist.length === 0 && blacklist.length > 0) {
                saveState = { ...state };
            }

            whitelist.forEach((key) => {
                let value = state;

                // Support strings for one-level paths
                if (typeof key === 'string') {
                    key = [key]; // eslint-disable-line no-param-reassign
                }

                key.forEach((keyPart) => {
                    // Support immutable structures
                    if (isFunction(value.has) && isFunction(value.get)) {
                        if (!value.has(keyPart)) {
                            // No value stored
                            return;
                        }

                        value = value.get(keyPart);
                    } else if (value.hasOwnProperty(keyPart)) {
                        value = value[keyPart];
                    } else {
                        // No value stored
                        return;
                    }

                    set(saveState, key, value);
                });
            });

            blacklist.forEach((key) => {
                // Support strings for one-level paths
                if (typeof key === 'string') {
                    key = [key]; // eslint-disable-line no-param-reassign
                }

                // Support immutable structures
                const value = state[key[0]];
                const blacklistedState = saveState[key[0]] || value;

                if (blacklistedState && isFunction(blacklistedState.deleteIn)) {
                    // Handle multiple blacklist path with same key
                    saveState[key[0]] = blacklistedState.deleteIn(key.slice(1));
                    return;
                }

                // If we're a nested path ...
                if (key.length > 1) {
                    // ... and inside a object ...
                    const myKey = key.slice(0, -1);
                    const subValue = get(saveState, myKey);
                    if (isObject(subValue)) {
                        // ... clone it, as we don't want to change the state!
                        set(saveState, myKey, { ...subValue });
                    }
                }
                unset(saveState, key);
            });

            return engine.save(saveState);
        },
    };
};

