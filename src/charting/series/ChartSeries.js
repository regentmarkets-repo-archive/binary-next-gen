import createMarkLineSpot from '../mark-line/ChartMarkLine';
import createMarkTest from '../mark-line/ChartMarkTest';

const data = [[1.5, 10], [5, 7], [8, 8], [12, 6], [11, 12], [16, 9], [14, 6], [17, 4], [19, 9]];

export default () => [{
    name: 'SERIES NAME',
    type: 'line',
    data,
    itemStyle: {
        normal: {
            areaStyle: {
                type: 'default',
            },
        },
    },
    markLine: createMarkTest([
        { name: 'start of markLine1', value: 3, x: 50, y: 20 },
        { name: 'end of markLine1', x: 150, y: 120 },
    ]),
    fake: createMarkLineSpot(),
}];
