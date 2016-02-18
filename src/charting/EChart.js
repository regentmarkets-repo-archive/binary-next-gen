import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import echarts from 'echarts';
import { arrayEqual } from '../_utils/ArrayUtils';

export default class EChart extends Component {

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

    componentDidUpdate(nextProps) {
        if (nextProps.style !== this.props.style) {
            this.echart.resize();
        }

        this.echart.setOption(nextProps.options);
    }

    shouldComponentUpdate(nextProps) {
        const data = this.props.options.series[0].data;
        const newData = nextProps.options.series[0].data;

        if (arrayEqual(data, newData)) return false;

        return true;
    }

    render() {
        return <div {...this.props} />;
    }
}
