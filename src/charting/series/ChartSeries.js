export default ({ theme, data, markLine, markPoint }) => [{
    name: 'SERIES NAME',
    type: 'line',
    clickable: false,
    showLegendSymbol: false,
    animation: false,
    addDataAnimation: false,
    symbol: 'none',
    data,
    itemStyle: {
        normal: {
            lineStyle: {
                color: theme.line,
                width: 2,
            },
            areaStyle: {
                type: 'default',
                color: theme.fill,
            },
        },
    },
    markLine,
    markPoint,
}];
