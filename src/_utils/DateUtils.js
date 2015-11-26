export const epochToDateString = (epoch) => {
    if (!epoch) {
        return 'YYYY-MM-DD';
    }
    const d = new Date(epoch * 1000);
    const s = d.toISOString().slice(0, 10);
    return s;
};
