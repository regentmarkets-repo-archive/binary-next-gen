import createXAxis from '../axis/ChartXAxis';
import createYAxis from '../axis/ChartYAxis';
import createTooltip from '../tooltip/ChartTooltip';
import createSeries from '../series/ChartSeries';

const data = [1, 4, 2, 5, 3, 2, 0, 1, 4, 2, 5, 3, 2, 0];
const dataLabels = ['10:15:25', '10:15:26', '10:15:27', '10:15:28', '10:15:29', '10:15:30', '10:15:31'];

export default {
    tooltip: createTooltip(),
    calculable: true,
    xAxis: createXAxis(dataLabels),
    yAxis: createYAxis(),
    series: createSeries(data),
};
