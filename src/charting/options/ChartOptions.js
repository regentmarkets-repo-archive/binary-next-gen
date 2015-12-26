export default ({ createTooltip, createGrid, createXAxis, createYAxis, createSeries, createDataZoom, createMarkPointSpot, history, theme }) => ({
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
