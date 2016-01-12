import React, { PropTypes, Component } from 'react';
import BarrierInput from './BarrierInput';

export default class FullTradeBarriers extends Component {
    static propTypes = {
        barrier1: PropTypes.shape({
            name: PropTypes.string.isRequired,
            defaultValue: PropTypes.number.isRequired,
            onChange: PropTypes.func,
        }),
        barrier2: PropTypes.shape({
            name: PropTypes.string.isRequired,
            defaultValue: PropTypes.number.isRequired,
            onChange: PropTypes.func,
        }),
    };

    render() {
        const { barrier1, barrier2 } = this.props;
        return (
            <div className="row">
                {barrier1 && <BarrierInput {...barrier1} />}
                {barrier2 && <BarrierInput {...barrier2} />}
            </div>
        );
    }
}
