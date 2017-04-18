import { serverToInternalTradeType } from './TradeTypeAdapter';

export const tradeGrouping = [
    ['risefall', 'higherlower', 'endsinout', 'staysinout', 'touchnotouch'],
    ['digits'],
    ['spreads', 'asian'],
];

export const hasBasic = contract =>
    Object.keys(contract).find(c => tradeGrouping[0].includes(c));

export const hasDigits = contract =>
    Object.keys(contract).find(c => tradeGrouping[1].includes(c));

export const hasAdvanced = contract =>
    Object.keys(contract).find(c => tradeGrouping[2].includes(c));

export const typesForCategory = (contract, category) => {
    if (contract[category]) {
        return Object.keys(contract[category]).map(type =>
            serverToInternalTradeType(category, type),
        );
    }
    return [];
};

export const typesForCategories = (contract, categories) =>
    categories.reduce((a, b) => a.concat(typesForCategory(contract, b)), []);

export const findCategoryForType = (contract, type) => {
    switch (type) {
        case 'CALL':
            return 'risefall';
        case 'PUT':
            return 'risefall';
        case 'HIGHER':
            return 'higherlower';
        case 'LOWER':
            return 'higherlower';
        default:
            return Object.keys(contract).find(cat =>
                Object.keys(contract[cat]).includes(type),
            );
    }
};

export const pairUpTypes = types => {
    const paired = [];
    types.forEach((t, idx) => {
        if (idx % 2 === 0) {
            paired.push([t, types[idx + 1]]);
        }
    });
    return paired;
};
