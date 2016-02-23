import createXAxis from '../axis/ChartXAxis';
import createYAxis from '../axis/ChartYAxis';
import createDataLine from '../series/LineChartSeries';
import createCurrentSpotLine from '../series/CurrentSpotSeries';
import createGrid from '../grid/MobileChartGrid';
import createDataZoom from '../data-zoom/MobileDataZoom';
import createTooltip from '../tooltip/LineChartTooltip';

// refer to space between chart line and YAxis, in terms of no of data
const extendMargin = 5;

// to let chart line have space between most recent spot and Y axis
const extendXAxisData = (data, n = extendMargin) => {
    const dataLen = data.length;
    const speculativeDiff = data[dataLen - 1] - data[dataLen - 2];
    const extension = [data[dataLen - 1] + speculativeDiff];

    for (let i = 1; i < n; i ++) {
        extension[i] = extension[i - 1] + speculativeDiff;
    }
    return data.concat(extension);
};

const extendSeriesData = (data, n = extendMargin) => {
    const extension = [];

    for (let i = 0; i < n; i ++) {
        extension[i] = undefined;
    }
    return data.concat(extension);
};

const extendCurrentSpotLine = (data, n = 5) => {
    const extension = [];

    for (let i = 0; i < n; i ++) {
        extension[i] = data[0];
    }
    return data.concat(extension);
};

export default ({ history, theme }) => ({
    animation: true,
    grid: createGrid({ theme }),
    xAxis: createXAxis({
        theme,
        data: extendXAxisData(history.map(x => x.epoch)),
    }),
    yAxis: createYAxis({ theme }),
    series: [
        createDataLine({
            theme,
            data: history.map(x => x.quote),
        }),
        createCurrentSpotLine(history[history.length - 1].quote, history.length + extendMargin),
    ],
    dataZoom: createDataZoom({ theme }),
    tooltip: createTooltip(),
});
