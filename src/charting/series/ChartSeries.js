export default ({ data, markLine }) => [{
    name: 'SERIES NAME',
    type: 'line',
    data,
    itemStyle: {
        normal: {
            areaStyle: {
                type: 'default',
            },
        },
    },
    markLine,
}];
