import { timeFormatter } from '../formatters';

export default ({ theme }) => ({
    type: 'value',
    scale: true,
    boundaryGap: ['5%', '5%'],
    axisLabel: {
        margin: 2,
        formatter: timeFormatter,
        textStyle: {
            color: theme.text,
            fontFamily: 'Roboto',
            fontSize: 10,
        },
    },
    splitLine: {
        show: true,
        lineStyle: {
            color: theme.grid,
            width: 1,
        },
    },
});
