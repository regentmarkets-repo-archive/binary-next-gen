import { currencyFormatterValue } from '../formatters';

export default (currentSpot, length) => ({
    name: 'Current Spot',
    type: 'line',
    showLegendSymbol: false,
    symbol: 'none',
    smooth: true,
    data: Array(length).fill(currentSpot),
    lineStyle: {
        normal: {
            color: 'rgb(220,20,60)',
            type: 'solid',
            width: 1,
        },
    },
    markPoint: {
        symbol: 'rect',
        symbolSize: [50, 15],
        symbolOffset: [30, 0],
        data: [{
            name: 'Spot',
            type: 'min',
        }],
        label: {
            normal: {
                formatter: currencyFormatterValue,
                textStyle: {
                    fontFamily: 'Roboto',
                    fontSize: 11,
                },
            },
        },
        itemStyle: {
            normal: {
                color: 'rgb(220,20,60)',
                opacity: 0.7,
            },
        },
    },
});
