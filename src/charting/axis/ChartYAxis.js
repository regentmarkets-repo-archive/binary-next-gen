export default ({ theme }) => ({
    type: 'value',
    scale: true,
    axisTick: {
        show: false,
    },
    boundaryGap: ['15%', '25%'],
    position: 'right',
    splitNumber: 3,
    axisLabel: {
        margin: 4,
        show: true,
        formatter: v => new Intl.NumberFormat(undefined, { minimumFractionDigits: 2 }).format(v),
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
