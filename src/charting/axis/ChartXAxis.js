import { epochToTimeString } from '../../_utils/DateUtils';

export default ({ theme, data }) => [{
    type: 'category',
    scale: true,
    axisLine: false,
    axisTick: false,
    data,
    boundaryGap: false,
    splitNumber: 5,
    axisLabel: {
        show: true,
        formatter: v => epochToTimeString(v),
        textStyle: {
            color: theme.text,
            fontFamily: 'Roboto',
            fontSize: 10,
        },
    },
    splitLine: {
        show: true,
        lineStyle: {
            color: theme.grid,
            width: 1,
        },
    },
}];
