export default () => ({
    large: true,
    symbol: 'arrow',
    symbolSize: [10, 10],
    itemStyle: {
       normal: {
           color: 'green',
           lineStyle: 'dashed',
           borderWidth: 1,
           borderColor: 'red',
           barBorderColor: 'yellow',
           barBorderWidth: 5,
       },
    },
    data: [
        [
            { name: 'From Start Time', value: 'Start', xAxis: '10:15:25', yAxis: 0 },
            { name: 'To Start Time', xAxis: '10:15:25', yAxis: 5 },
        ],
        [
            { name: 'From Spot', value: 'Start', xAxis: '10:15:25', yAxis: 3 },
            { name: 'To Spot', xAxis: '10:15:31', yAxis: 3 },
        ],
    ],
});
