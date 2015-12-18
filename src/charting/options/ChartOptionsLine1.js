export default {
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
        markPoint: {
            data: [{
                type: 'max',
                name: '最大值',
            }, {
                type: 'min',
                name: '最小值',
            },
        ],
        },
        markLine: {
            data: [[
        { name: 'start of markLine1', value: 100, x: 50, y: 20 },
        { name: 'end of markLine1', x: 150, y: 120 },
    ]],
        },
    }],
};
