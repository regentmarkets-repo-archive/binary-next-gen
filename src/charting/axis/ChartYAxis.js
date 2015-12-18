export default ({ color }) => [{
    type: 'value',
    position: 'right',
    axisLabel: {
        formatter: '$ {value}',
    },
    splitLine: {
        show: true,
        lineStyle: {
            color,
            width: 1,
        },
    },
}];
