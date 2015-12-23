import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import echarts from 'echarts';
import 'echarts/chart/line';
import 'echarts/chart/k';

const getNewData = () => [];


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
        console.log(nextProps.options.series[0].data);

        const newData = getNewData(nextProps.options.series[0].data, nextProps.options.series[0].data);
        console.log(newData);
        this.echart.addData([
            [
                0,        // Series Index
                nextProps.options.series[0].data[19],  // New data
                true,     // Whether the new data is inserted from the head of the queue
                true,    // Whether to increase the queue length , false then delete the original custom data , the team head insertion puncturing the tail , the tail insertion puncturing team head
            ],
        ]);

        if (nextProps.style !== this.props.style) {
            this.echart.resize();
        }

        return false;
    }

    render() {
        return <div {...this.props} />;
    }
}
