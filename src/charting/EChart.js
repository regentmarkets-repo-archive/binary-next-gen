import React from 'react';
import echarts from 'echarts';
import 'echarts/chart/line';
// import 'echarts/coord/Axis';
import chartOptions from './ChartOptionsLine1';

const WordCloudChart = React.createClass({
    componentDidMount() {
        const mychart = echarts.init(document.getElementById('chart'));
        mychart.setOption(chartOptions);
    },

    render() {
        return <div id="chart" style = {{ width: '80%', height: '600px' }} />;
    },
});

export default WordCloudChart;
