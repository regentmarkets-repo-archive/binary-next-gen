export default ({ color, textColor }) => [{
    type: 'value',
    scale: true,
    axisLine: false,
    position: 'right',
    axisLabel: {
        show: true,
        formatter: '$ {value}',
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
