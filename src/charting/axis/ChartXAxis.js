export default ({ color, data }) => [{
    type: 'category',
    data,
    axisLabel: {
        show: true,
        interval: 'auto',
        rotate: 45,
        margin: 8,
        formatter: '{value}月',
        textStyle: {
            color: 'blue',
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
