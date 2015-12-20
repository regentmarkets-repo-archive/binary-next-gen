export default ({ data, markLine }) => [{
    name: 'SERIES NAME',
    type: 'line',
    clickable: false,
    showLegendSymbol: false,
    data,
    itemStyle: {
        normal: {
            lineStyle: {
                color: 'rgba(42, 48, 82, 0.8)',
                width: 2,
            },
            areaStyle: {
                type: 'default',
                color: 'rgba(42, 48, 82, 0.2)',
            },
        },
    },
    markLine,
}];
