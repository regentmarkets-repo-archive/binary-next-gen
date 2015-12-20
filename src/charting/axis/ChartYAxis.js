export default ({ color, textColor }) => [{
    type: 'value',
    scale: true,
    position: 'right',
    axisLabel: {
        show: true,
        formatter: '$ {value}',
        textStyle: {
            color: textColor,
            fontFamily: 'Roboto',
            fontSize: 15,
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
