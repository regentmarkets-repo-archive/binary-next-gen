const getLineFromStartToEnd = (history) => {
    const fromEpoch = history[0].epoch;
    const toEpoch = history[history.length - 1].epoch;
    const spot = history[history.length - 1].quote;
    return [
        { name: 'From ', xAxis: fromEpoch, yAxis: spot },
        { name: 'To Spot', value: spot, xAxis: toEpoch, yAxis: spot },
    ];
};

export default (history) => ({
    symbolSize: [0, 0],
    itemStyle: {
       normal: {
           color: 'red',
           lineStyle: 'dashed',
           borderWidth: 1,
           borderColor: 'red',
           barBorderColor: 'yellow',
           barBorderWidth: 5,
           label: {
               show: true,
               position: 'inner',
           },
       },
    },
    data: [
        getLineFromStartToEnd(history),
    ],
});
