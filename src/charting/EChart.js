import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import echarts from 'echarts';
import 'echarts/chart/line';
import 'echarts/chart/k';

// const getNewData = () => [];

const areArraysEqual = (ar1, ar2) =>
    ar1.filter((x, idx) => x !== ar2[idx]).length === 0;

export default class EChart extends React.Component {

    static propTypes = {
		options: PropTypes.object.isRequired,
		style: PropTypes.object,
    };

    componentDidMount() {
        const node = ReactDOM.findDOMNode(this);
        this.echart = echarts.init(node);
        const { options } = this.props;
        this.echart.setOption(options);
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.style !== this.props.style) {
            this.echart.resize();
        }

        const data = this.props.options.series[0].data;
        const newData = nextProps.options.series[0].data;

        if (areArraysEqual(data, newData)) return false;

        // const newData = getNewData(nextProps.options.series[0].data, nextProps.options.series[0].data);
        console.log(newData[19]);
        this.echart.addData([
            [
                0,        // Series Index
                newData[19],  // New data
                false,     // Whether the new data is inserted from the head of the queue
                false,    // Whether to increase the queue length , false then delete the original custom data , the team head insertion puncturing the tail , the tail insertion puncturing team head
            ],
        ]);

        return false;
    }

    render() {
        return <div {...this.props} />;
    }
}
