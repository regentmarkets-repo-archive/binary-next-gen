import React, { PropTypes, Component } from 'react';
import BarrierInput from './RelativeBarrierInput';

export default class BarrierCard extends Component {
    static propTypes = {
        barrier: PropTypes.number,
        barrier2: PropTypes.number,
        barrierInfo: PropTypes.object,
        isIntraDay: PropTypes.bool,
        onBarrier1Change: PropTypes.func,
        onBarrier2Change: PropTypes.func,
        spot: PropTypes.number,
    };

    render() {
        const {
            barrier,
            barrier2,
            barrierInfo,
            isIntraDay,
            onBarrier1Change,
            onBarrier2Change,
            spot,
            } = this.props;
        const expiryType = isIntraDay ? 'intraday' : 'daily';
        const barrier1Info = barrierInfo[expiryType] && barrierInfo[expiryType][0];
        const barrier2Info = barrierInfo[expiryType] && barrierInfo[expiryType][1];
        return (
            <div>
                {barrier1Info &&
                    <div>
                        <BarrierInput
                            {...barrier1Info}
                            onChange={onBarrier1Change}
                            isIntraDay={isIntraDay}
                            value={barrier}
                            spot={spot}
                        />
                    </div>}
                {barrier2Info &&
                    <div>
                        <BarrierInput
                            {...barrierInfo[expiryType][1]}
                            onChange={onBarrier2Change}
                            isIntraDay={isIntraDay}
                            value={barrier2}
                            spot={spot}
                        />
                    </div>}
            </div>
        );
    }
}
