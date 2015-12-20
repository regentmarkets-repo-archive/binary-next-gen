import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import echarts from 'echarts';
import 'echarts/chart/line';
import 'echarts/chart/k';

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
        // console.log('shouldComponentUpdate', this.echart, nextProps);

        this.echart.setOption(nextProps.options);
        return false;
        //
        // this.echart.addData([
        //     0,        // Series Index
        //     Math.round(Math.random() * 1000), // New data
        //     true,     // Whether the new data is inserted from the head of the queue
        //     false,    // Whether to increase the queue length , false then delete the original custom data , the team head insertion puncturing the tail , the tail insertion puncturing team head
        // ]);
        // return false;
    }

    render() {
        return <div {...this.props} />;
    }
}
