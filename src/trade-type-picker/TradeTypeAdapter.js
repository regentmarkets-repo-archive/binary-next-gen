/**
 * We have mismatch between server model and internal model on Trading type
 * Server treat rise/fall and higher/lower as CALL/PUT, differentiate by number of barrier
 * but we need to have them separated in UI
 */

export const serverToInternalTradeType = (category, type) => {
    switch (category) {
        case 'higherlower': {
            if (type === 'CALL') return 'HIGHER';
            if (type === 'PUT') return 'LOWER';
            return type;
        }
        default: return type;
    }
};

export const internalToServerTradeType = type => {
    switch (type) {
        case 'HIGHER': return 'CALL';
        case 'LOWER': return 'PUT';
        default: return type;
    }
};
