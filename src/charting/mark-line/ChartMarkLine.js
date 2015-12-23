const getLineFromStartToEnd = (history) => {
    const fromEpoch = history[0].epoch;
    const toEpoch = history[history.length - 1].epoch;
    const spot = history[history.length - 1].quote;
    console.log(spot);
    return [
        { name: 'From ', value: 'Start', xAxis: fromEpoch, yAxis: spot },
        { name: 'To Spot', xAxis: toEpoch, yAxis: spot },
    ];
};

export default ({ history, spot }) => ({
    large: true,
    symbol: 'arrow',
    symbolSize: [10, 10],
    itemStyle: {
       normal: {
           color: 'red',
           lineStyle: 'dashed',
           borderWidth: 1,
           borderColor: 'red',
           barBorderColor: 'yellow',
           barBorderWidth: 5,
       },
    },
    data: [
        getLineFromStartToEnd(history, spot),
    ],
});
