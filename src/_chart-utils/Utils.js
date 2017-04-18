export const chartToDataType = {
    area: 'ticks',
    line: 'ticks',
    candlestick: 'candles',
    ohlc: 'candles',
};

/**
 * @callback    getData
 * @param   {string} errCode
 * @return  {Promise.<T>|*}
 */

/**
 * Helper function to help handle known error from tick history call
 * @param {getData} tickHistoryCall               A function that perform data fetching call differently
 *                                            depends on presence of error, must return Promise
 * @returns {Promise.<T>|*}
 */
export function getDataWithErrorHandling(tickHistoryCall) {
    return tickHistoryCall().catch(err => {
        const errCode = err.error && err.error.error.code;

        if (
            errCode === 'MarketIsClosed' ||
            errCode === 'NoRealtimeQuotes' ||
            errCode === 'StreamingNotAllowed'
        ) {
            return tickHistoryCall(errCode);
        }

        throw err;
    });
}
