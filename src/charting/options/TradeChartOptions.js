import createXAxis from '../axis/ChartXAxis';
import createYAxis from '../axis/ChartYAxis';
import createSeries from '../series/LineChartSeries';
import createGrid from '../grid/TradeChartGrid';
import createMarkLineSpot from '../mark-line/ChartMarkLineSpot';
import createDataZoom from '../data-zoom/MobileDataZoom';
import createTooltip from '../tooltip/LineChartTooltip';
import createMarkPointSpot from '../mark-point/ChartMarkPointSpot';

export default ({ history, theme }) => ({
    tooltip: createTooltip(),
    grid: createGrid({ theme }),
    xAxis: createXAxis({ theme, data: history.length > 0 ? history.map(x => x.epoch) : [0] }),
    yAxis: createYAxis({ theme }),
    series: createSeries({
        data: history.map(x => x.quote),
        markLine: createMarkLineSpot(history),
        markPoint: createMarkPointSpot(history),
    }),
    dataZoom: createDataZoom({ theme }),
});
