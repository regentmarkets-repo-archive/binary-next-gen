import { timeFormatter } from '../formatters';

export default ({ theme }) => ({
    type: 'value',
    scale: true,
    min: 'dataMin',
    max: 'dataMax',
    boundaryGap: ['0%', '0%'],
    axisLabel: {
        margin: 2,
        formatter: timeFormatter,
        interval: 'auto',
        textStyle: {
            color: theme.text,
            fontFamily: 'Roboto',
            fontSize: 10,
        },
    },
    splitNumber: 8,
    splitLine: {
        show: true,
        lineStyle: {
            color: theme.grid,
            width: 1,
        },
    },
});
