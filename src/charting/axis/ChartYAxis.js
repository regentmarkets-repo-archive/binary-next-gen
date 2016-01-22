export default ({ theme }) => ({
    type: 'value',
    scale: true,
    axisTick: {
        show: false,
    },
    position: 'right',
    splitNumber: 3,
    axisLabel: {
        show: true,
        formatter: v => new Intl.NumberFormat().format(v),
        textStyle: {
            color: theme.text,
            fontFamily: 'Roboto',
            fontSize: 10,
        },
    },
    axisLine: {
        show: true,
        lineStyle: {
            color: theme.grid,
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
