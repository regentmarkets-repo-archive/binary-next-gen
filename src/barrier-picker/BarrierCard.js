import React, { PropTypes, Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import BarrierInput from './BarrierInput';
import M from '../_common/M';

export default class BarrierCard extends Component {

    shouldComponentUpdate = shouldPureComponentUpdate;

    static propTypes = {
        barrier: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
        barrier2: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
        barrierInfo: PropTypes.object,
        barrierType: PropTypes.oneOf(['relative', 'absolute']),
        isIntraDay: PropTypes.bool,
        onBarrier1Change: PropTypes.func,
        onBarrier2Change: PropTypes.func,
        onBarrierTypeChange: PropTypes.func,
        pipSize: PropTypes.number,
        spot: PropTypes.number,
    };

    render() {
        const {
            barrier,
            barrier2,
            barrierInfo,
            barrierType,
            isIntraDay,
            onBarrier1Change,
            onBarrier2Change,
            pipSize,
            spot,
            } = this.props;
        const expiryType = isIntraDay ? 'intraday' : 'daily';
        const barrier1Info = barrierInfo[expiryType] && barrierInfo[expiryType][0];
        const barrier2Info = barrierInfo[expiryType] && barrierInfo[expiryType][1];
        const toggleMsg = barrierType === 'relative' ?
            'Relative barrier' :
            'Absolute barrier';

        if (!barrier1Info) return null;

        return (
            <div>
                <p id="barrier-type-msg"><M m={toggleMsg} /></p>
                <BarrierInput
                    {...barrier1Info}
                    barrierType={barrierType}
                    expiryType={expiryType}
                    onChange={onBarrier1Change}
                    isIntraDay={isIntraDay}
                    pipSize={pipSize}
                    value={barrier}
                    spot={spot}
                />
                {barrier2Info &&
                    <BarrierInput
                        {...barrierInfo[expiryType][1]}
                        barrierType={barrierType}
                        expiryType={expiryType}
                        onChange={onBarrier2Change}
                        pipSize={pipSize}
                        isIntraDay={isIntraDay}
                        value={barrier2}
                        spot={spot}
                    />
                }
            </div>
        );
    }
}
