import { currencyFormatterValue } from '../formatters';

export const createCurrentSpotLine = (currentSpot, length) => ({
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

export const createDataLine = ({ theme, data, markLine, markPoint }) => ({
    name: 'Symbol data',
    type: 'line',
    clickable: false,
    showLegendSymbol: false,
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
});
