import set from 'lodash.set';
import unset from 'lodash.unset';
import isFunction from 'lodash.isfunction';

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

                const value = state[key[0]];

                if (value && isFunction(value.deleteIn)) {
                    saveState[key[0]] = value.deleteIn(key.slice(1));
                } else {
                    unset(saveState, key);
                }
            });

            return engine.save(saveState);
        },
    };
};
