import { dualFormatter } from '../formatters';

export default () => ({
    trigger: 'axis',
    axisPointer: {
        crossStyle: {
            type: 'dotted',
        },
        type: 'line',
    },
    formatter: dualFormatter,
    borderColor: 'red',
});
