export default () => ({
    trigger: 'axis',
    axis: 'y',
    formatter: v => new Intl.NumberFormat().format(v),
    axisPointer: {
        backgroundColor: 'red',
        crossStyle: {
            type: 'dotted',
        },
        type: 'cross',
    },
    borderColor: 'red',
});
