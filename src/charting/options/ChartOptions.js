export default ({ createTooltip, createGrid, createXAxis, createYAxis, createSeries, createDataZoom, createMarkPointSpot, history, theme }) => ({
    tooltip: createTooltip(),
    grid: createGrid({ color: theme.gridColor }),
    xAxis: createXAxis({ color: theme.gridColor, data: history.length > 0 ? history.map(x => x.epoch) : [0], textColor: theme.axisTextColor }),
    yAxis: createYAxis({ color: theme.gridColor, textColor: theme.axisTextColor }),
    series: createSeries({
        data: history.map(x => x.quote),
        markLine: createMarkLineSpot(history),
        markPoint: createMarkPointSpot(history),
    }),
    dataZoom: {
        show: true,
        realtime: true,
        start: 50,
        end: 100,
    },
});
