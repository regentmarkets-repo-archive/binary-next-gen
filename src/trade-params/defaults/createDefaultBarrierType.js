import { isIntraday } from 'binary-utils';

export default (duration, durationUnit, cat) => {
    if (cat === 'digits') {
        return undefined;
    }
    if (durationUnit === 't' || isIntraday(duration, durationUnit)) {
        return 'relative';
    }
    return 'absolute';         // did not use return directly as ESLint complain about it
};
