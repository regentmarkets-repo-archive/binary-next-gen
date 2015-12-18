export default () => ({
    large: true,
    symbol: 'arrow',
    symbolSize: [10, 10],
    itemStyle: {
       normal: {
           color: 'green',
           lineStyle: 'solid',
           borderWidth: 5,
           borderColor: 'red',
           barBorderColor: 'yellow',
           barBorderWidth: 5,
       },
    },
    data: [
        {
            type: 'average',
            name: '最大值',
            itemStyle: {
                normal: {
                    color: 'pink',
                    borderColor: 'red',
                    borderRadius: 10,
                },
            },
        },
    ],
});
