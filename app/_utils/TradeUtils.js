import tradeTypes from '../_constants/tradeTypes';

export const tradeTypeTextToCode = text => tradeTypes.find(x => x.text === text).code;
export const tradeTypeCodeToText = code => tradeTypes.find(x => x.value === code).text;
