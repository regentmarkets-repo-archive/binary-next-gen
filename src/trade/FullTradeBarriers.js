import React, { PropTypes, Component } from 'react';
import BarrierInput from './BarrierInput';

export default class FullTradeBarriers extends Component {
    static propTypes = {
        barrier1: PropTypes.shape({
            name: PropTypes.string.isRequired,
            defaultValue: PropTypes.number.isRequired,
        }),
        barrier2: PropTypes.shape({
            name: PropTypes.string.isRequired,
            defaultValue: PropTypes.number.isRequired,
        }),
        id: PropTypes.string,
        onBarrier1Change: PropTypes.func,
        onBarrier2Change: PropTypes.func,
    };

    render() {
        const { barrier1, barrier2, onBarrier1Change, onBarrier2Change } = this.props;
        return (
            <div className="row">
                {barrier1 && <BarrierInput {...barrier1} onChange={onBarrier1Change} />}
                {barrier2 && <BarrierInput {...barrier2} onChange={onBarrier2Change} />}
            </div>
        );
    }
}
