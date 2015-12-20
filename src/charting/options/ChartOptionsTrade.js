import createXAxis from '../axis/ChartXAxis';
import createYAxis from '../axis/ChartYAxis';
// import createTooltip from '../tooltip/ChartTooltip';
import createSeries from '../series/ChartSeries';
import createGrid from '../grid/ChartGrid';
import createMarkLineSpot from '../mark-line/ChartMarkLine';

const dataLabels = ['10:15:25', '10:15:26', '10:15:27', '10:15:28', '10:15:29', '10:15:30', '10:15:31'];

export default ({ data, spot, theme }) => ({
    // tooltip: createTooltip(),
    grid: createGrid({ color: theme.gridColor }),
    xAxis: createXAxis({ color: theme.gridColor, data: dataLabels, textColor: theme.axisTextColor }),
    yAxis: createYAxis({ color: theme.gridColor, textColor: theme.axisTextColor }),
    series: createSeries({ data, markLine: createMarkLineSpot({ spot }) }),
});
