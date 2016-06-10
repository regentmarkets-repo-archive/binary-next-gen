import React, { Component, PropTypes } from 'react';
import { BinaryChart } from 'binary-charts';

const style = {
    container: {
        position: 'relative',
        width: 0,
        height: 0,
    },
    inner: {
        float: 'left',
        position: 'absolute',
        top: '40px',
        zIndex: '10',
    },
};

export default class TradeChart extends Component {
    static propTypes = {
        control: PropTypes.object.isRequired,
    };

    render() {
        const { control } = this.props;
        return (
            <div className="trade-chart-container">
                <div style={style.container}>
                    <div style={style.inner}>{control}</div>
                </div>
                <BinaryChart {...this.props} />
            </div>
        );
    }
}
