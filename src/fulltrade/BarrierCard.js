import React, { PropTypes, Component } from 'react';
import BarrierInput from './BarrierInput';

export default class BarrierCard extends Component {
    static propTypes = {
        barrier: PropTypes.number,
        barrier2: PropTypes.number,
        barrier1Info: PropTypes.shape({
            name: PropTypes.string.isRequired,
            value: PropTypes.any.isRequired,
        }),
        barrier2Info: PropTypes.shape({
            name: PropTypes.string.isRequired,
            value: PropTypes.any.isRequired,
        }),
        onBarrier1Change: PropTypes.func,
        onBarrier2Change: PropTypes.func,
        spot: PropTypes.number,
    };

    render() {
        const { barrier, barrier2, barrier1Info, barrier2Info, onBarrier1Change, onBarrier2Change, spot } = this.props;

        return (
            <div>
                {barrier1Info &&
                    <div>
                        <BarrierInput {...barrier1Info} onChange={onBarrier1Change} />
                        <p>{barrier2Info ? `High spot: ${spot + barrier}` : `Target spot: ${spot + barrier}`}</p>
                    </div>}
                {barrier2Info &&
                    <div>
                        <BarrierInput {...barrier2Info} onChange={onBarrier2Change} />
                        <p>{`Low spot: ${spot + barrier2}`}</p>
                    </div>}
            </div>
        );
    }
}
