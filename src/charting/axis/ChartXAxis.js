export default ({ color, textColor, data }) => [{
    type: 'category',
    scale: true,
    axisLine: false,
    axisTick: false,
    data,
    boundaryGap: false,
    axisLabel: {
        show: true,
        formatter: '{value}',
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
