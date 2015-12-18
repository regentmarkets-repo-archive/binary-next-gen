export default {
    tooltip: {
        trigger: 'axis',
    },
    calculable: true,
    xAxis: [{
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    }],
    yAxis: [{
        type: 'value',
        axisLabel: {
            formatter: '{value} °C',
        },
    }],
    series: [{
        name: '最高气温',
        type: 'line',
        data: [11, 11, 15, 13, 12, 13, 10],
        markLine: {
            data: [{
                type: 'average',
                name: '平均值',
            }],
        },
    }],
};
