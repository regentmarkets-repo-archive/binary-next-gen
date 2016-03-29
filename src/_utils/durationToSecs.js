export default (duration, unit) => {
    switch (unit) {
        case 's': return 1 * duration;
        case 'm': return 60 * duration;
        case 'h': return 3600 * duration;
        case 'd': return 86400 * duration;
        default: return undefined;
    }
};
