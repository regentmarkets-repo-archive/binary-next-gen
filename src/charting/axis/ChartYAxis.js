export default ({ theme }) => [{
    type: 'value',
    scale: true,
    axisLine: false,
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
    splitLine: {
        show: true,
        lineStyle: {
            color: theme.grid,
            width: 1,
        },
    },
}];
