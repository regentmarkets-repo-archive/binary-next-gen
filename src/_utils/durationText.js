export default unit => {
    switch (unit) {
        case 't': return 'Ticks';
        case 's': return 'Seconds';
        case 'm': return 'Minutes';
        case 'h': return 'Hours';
        case 'd': return 'Days';
        default: return undefined;
    }
};
