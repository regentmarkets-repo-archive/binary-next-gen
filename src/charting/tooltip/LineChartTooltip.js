import { dualFormatter } from '../formatters';

export default () => ({
    trigger: 'axis',
    axisPointer: {
        crossStyle: {
            color: 'rgb(147, 0, 69)',
            type: 'dotted',
            width: 2,
        },
        axis: 'x',
        type: 'line',
    },
    alwaysShowContent: true,
    transitionDuration: 0,
    formatter: dualFormatter,
    borderColor: 'red',
});
