export default ({ color, textColor }) => [{
    type: 'value',
    scale: true,
    axisLine: false,
    position: 'right',
    splitNumber: 3,
    axisLabel: {
        show: true,
        formatter: v => new Intl.NumberFormat().format(v),
        textStyle: {
            color: textColor,
            fontFamily: 'Roboto',
            fontSize: 10,
        },
    },
    splitLine: {
        show: true,
        lineStyle: {
            color,
            width: 1,
        },
    },
}];
