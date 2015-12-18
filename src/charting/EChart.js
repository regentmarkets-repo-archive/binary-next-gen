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
        const mychart = echarts.init(node);
        const { options } = this.props;
        mychart.setOption(options);
    }

    render() {
        return <div {...this.props} />;
    }
}
