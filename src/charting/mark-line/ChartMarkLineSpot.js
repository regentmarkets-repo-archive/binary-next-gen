const getLineFromStartToEnd = (history) => {
    const fromEpoch = history[0].epoch;
    const toEpoch = history[history.length - 1].epoch;
    const spot = history[history.length - 1].quote;
    return [
        { name: 'Current Spot ', xAxis: fromEpoch, yAxis: spot },
        { value: spot, xAxis: toEpoch, yAxis: spot },
    ];
};

export const createVerticalLine = (xVal, yMin, yMax, type) => ([
    {
        name: type === 'expire' ? 'Expire' : 'Entry',
        coord: [xVal, yMin],
        lineStyle: {
            normal: {
                color: type === 'expire' ? 'rgb(239, 121, 92)' : 'rgb(252, 225, 162)',
                width: 1,
                type: 'dotted',
            },
        },
    },
    {
        coord: [xVal, yMax],
        lineStyle: {
            normal: {
                color: type === 'expire' ? 'rgb(239, 121, 92)' : 'rgb(252, 225, 162)',
                width: 1,
                type: 'dotted',
            },
        },
    },
]);

/**
 *
 * @param line1 - {x, min, max, name}
 * @param line2 - {x, min, max, name}
 */
export const createTimeBoundary = (line1, line2) => {
    const line1Opt = line1 && createVerticalLine(...line1, 'entry');
    const line2Opt = line2 && createVerticalLine(...line2, 'expire');

    return {
        symbol: 'none',
        data: [
            line1Opt,
            line2Opt,
        ],
    };
};

export default (history) => ({
    symbolSize: [1, 1],
    // itemStyle: {
    //    normal: {
    //        color: 'red',
    //        lineStyle: 'dashed',
    //        borderWidth: 1,
    //        borderColor: 'red',
    //        barBorderColor: 'yellow',
    //        barBorderWidth: 5,
    //        label: {
    //            show: true,
    //            position: 'inner',
    //        },
    //    },
    // },
    data: [
        getLineFromStartToEnd(history),
    ],
});
