import createXAxis from '../axis/ChartXAxis';
import createYAxis from '../axis/ChartYAxis';
import createSeries from '../series/ChartSeries';
import createGrid from '../grid/MobileChartGrid';
import createMarkLineSpot from '../mark-line/ChartMarkLineSpot';
import createDataZoom from '../data-zoom/MobileDataZoom';
import createTooltip from '../tooltip/ChartTooltip';

export default ({ history, theme }) => ({
    animation: true,
    grid: createGrid({ theme }),
    xAxis: createXAxis({
        theme,
        data: history.map(x => x.epoch),
    }),
    yAxis: createYAxis({ theme }),
    series: createSeries({
        theme,
        data: history.map(x => x.quote),
        markLine: createMarkLineSpot(history),
    }),
    dataZoom: createDataZoom({ theme }),
    tooltip: createTooltip(),
});
