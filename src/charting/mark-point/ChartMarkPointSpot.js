export default (history) => ({
    itemStyle: {
       normal: {
           color: 'red',
       },
    },
    data: [
        {
            name: 'Spot',
            value: history[history.length - 1].quote,
            xAxis: history[history.length - 1].echo,
            yAxis: history[history.length - 1].quote,
        },
    ],
});
