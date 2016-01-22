export default () => ({
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
});
