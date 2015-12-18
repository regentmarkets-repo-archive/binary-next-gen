import createXAxis from '../axis/ChartXAxis';
import createYAxis from '../axis/ChartYAxis';
import createTooltip from '../tooltip/ChartTooltip';
import createSeries from '../series/ChartSeries';
import createGrid from '../grid/ChartGrid';

const data = [1, 4, 2, 5, 3, 2, 0, 1, 4, 2, 5, 3, 2, 0];
const dataLabels = ['10:15:25', '10:15:26', '10:15:27', '10:15:28', '10:15:29', '10:15:30', '10:15:31'];

const theme = {
    gridColor: 'green',
};

export default {
    tooltip: createTooltip(),
    calculable: true,
    grid: createGrid({ color: theme.gridColor }),
    xAxis: createXAxis({ color: theme.gridColor, data: dataLabels }),
    yAxis: createYAxis({ color: theme.gridColor }),
    series: createSeries(data),
};
