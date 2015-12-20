export default ({ color, textColor, data }) => [{
    type: 'category',
    scale: true,
    data,
    boundaryGap: false,
    axisLabel: {
        show: true,
        formatter: '{value}月',
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
