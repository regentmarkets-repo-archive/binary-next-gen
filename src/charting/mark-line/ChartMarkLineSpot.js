const getLineFromStartToEnd = (history) => {
    const fromEpoch = history[0].epoch;
    const toEpoch = history[history.length - 1].epoch;
    const spot = history[history.length - 1].quote;
    return [
        { name: 'Current Spot ', xAxis: fromEpoch, yAxis: spot },
        { value: spot, xAxis: toEpoch, yAxis: spot },
    ];
};

export const createVerticalLine = (xVal, yMin, yMax, name = 'time') => ([
    { name: name, xAxis: xVal, yAxis: yMin },
    { xAxis: xVal, yAxis: yMax },
]);

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
