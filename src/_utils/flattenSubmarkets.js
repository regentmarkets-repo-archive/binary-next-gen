export const symbolsToArray = symbols =>
    Object.keys(symbols).map(v => ({
        text: symbols[v].display_name,
        value: v,
    }));

export const submarketsToSymbols = submarkets =>
    Object.keys(submarkets).reduce((r, v) =>
        r.concat(symbolsToArray(submarkets[v].symbols)),
        []
    );

export default markets =>
    Object.keys(markets).reduce((acc, m) => {
        acc[m] = submarketsToSymbols(markets[m].submarkets);
        return acc;
    }, {});
