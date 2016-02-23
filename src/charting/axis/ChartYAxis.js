import { currencyFormatter } from '../formatters';

export default ({ theme }) => ({
    type: 'value',
    scale: true,
    position: 'right',
    boundaryGap: ['10%', '30%'],
    axisLabel: {
        margin: 4,
        show: true,
        formatter: currencyFormatter,
        textStyle: {
            color: theme.text,
            fontFamily: 'Roboto',
            fontSize: 10,
        },
    },
    splitNumber: 4,
    splitLine: {
        show: true,
        lineStyle: {
            color: theme.grid,
            width: 1,
        },
    },
});
