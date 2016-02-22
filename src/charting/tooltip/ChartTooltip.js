import { dualFormatter } from '../formatters';

export default () => ({
    trigger: 'axis',
    axisPointer: {
        backgroundColor: 'red',
        crossStyle: {
            type: 'dotted',
        },
        type: 'line',
    },
    formatter: dualFormatter,
    borderColor: 'red',
});
