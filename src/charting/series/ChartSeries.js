import createMarkLineSpot from '../mark-line/ChartMarkLine';

const data = [1, 4, 2, 5, 3, 2, 0, 1, 4, 2, 5, 3, 2, 0];

console.log(createMarkLineSpot());

export default () => [{
    name: 'SERIES NAME',
    type: 'line',
    data,
    markLine: createMarkLineSpot(1),
}];
