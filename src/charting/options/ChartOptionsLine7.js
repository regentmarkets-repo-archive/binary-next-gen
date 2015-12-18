export default {
    calculable: true,
    xAxis: [{
        type: 'value',
    }],
    yAxis: [{
        type: 'value',
        axisLine: {
            lineStyle: {
                color: '#dc143c',
            },
        },
    }],
    series: [{
        name: '数据1',
        type: 'line',
        data: [
            [1.5, 10],
            [5, 7],
            [8, 8],
            [12, 6],
            [11, 12],
            [16, 9],
            [14, 6],
            [17, 4],
            [19, 9],
        ],
        markPoint: {
            data: [
                // 纵轴，默认
                {
                    type: 'max',
                    name: '最大值',
                    symbol: 'emptyCircle',
                    itemStyle: {
                        normal: {
                            color: '#dc143c',
                            label: {
                                position: 'top',
                            },
                        },
                    },
                }, {
                    type: 'min',
                    name: '最小值',
                    symbol: 'emptyCircle',
                    itemStyle: {
                        normal: {
                            color: '#dc143c',
                            label: {
                                position: 'bottom',
                            },
                        },
                    },
                },
                // 横轴
                {
                    type: 'max',
                    name: '最大值',
                    valueIndex: 0,
                    symbol: 'emptyCircle',
                    itemStyle: {
                        normal: {
                            color: '#1e90ff',
                            label: {
                                position: 'right',
                            },
                        },
                    },
                }, {
                    type: 'min',
                    name: '最小值',
                    valueIndex: 0,
                    symbol: 'emptyCircle',
                    itemStyle: {
                        normal: {
                            color: '#1e90ff',
                            label: {
                                position: 'left',
                            },
                        },
                    },
                },
            ],
        },
        markLine: {
            data: [
                // 纵轴，默认
                {
                    type: 'max',
                    name: '最大值',
                    itemStyle: {
                        normal: {
                            color: '#dc143c',
                        },
                    },
                }, {
                    type: 'min',
                    name: '最小值',
                    itemStyle: {
                        normal: {
                            color: '#dc143c',
                        },
                    },
                }, {
                    type: 'average',
                    name: '平均值',
                    itemStyle: {
                        normal: {
                            color: '#dc143c',
                        },
                    },
                },
                // 横轴
                {
                    type: 'max',
                    name: '最大值',
                    valueIndex: 0,
                    itemStyle: {
                        normal: {
                            color: '#1e90ff',
                        },
                    },
                }, {
                    type: 'min',
                    name: '最小值',
                    valueIndex: 0,
                    itemStyle: {
                        normal: {
                            color: '#1e90ff',
                        },
                    },
                }, {
                    type: 'average',
                    name: '平均值',
                    valueIndex: 0,
                    itemStyle: {
                        normal: {
                            color: '#1e90ff',
                        },
                    },
                },
            ],
        },
    }],
};
