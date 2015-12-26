import createXAxis from '../axis/ChartXAxis';
import createYAxis from '../axis/ChartYAxis';
import createSeries from '../series/ChartSeries';
import createGrid from '../grid/MobileChartGrid';
import createMarkLineSpot from '../mark-line/ChartMarkLineSpot';
import createDataZoom from '../data-zoom/MobileDataZoom';

export default ({ history, theme }) => ({
    animation: false,
    addDataAnimation: false,
    grid: createGrid({ theme }),
    xAxis: createXAxis({
        theme,
        data: history.length > 0 ? history.map(x => x.epoch) : [0],
    }),
    yAxis: createYAxis({ theme }),
    series: createSeries({
        theme,
        data: history.map(x => x.quote),
        markLine: createMarkLineSpot(history),
    }),
    dataZoom: createDataZoom({ theme }),
});
