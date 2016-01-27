import React, { PropTypes, Component } from 'react';
import BarrierInput from './RelativeBarrierInput';
import CollapsibleFormSnippet from '../../_common/CollapsibleFormSnippet';

export default class BarrierCard extends Component {
    static propTypes = {
        barrier: PropTypes.number,
        barrier2: PropTypes.number,
        barrierInfo: PropTypes.object,
        barrierType: PropTypes.oneOf(['relative', 'absolute']),
        isIntraDay: PropTypes.bool,
        onBarrier1Change: PropTypes.func,
        onBarrier2Change: PropTypes.func,
        onBarrierTypeChange: PropTypes.func,
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
            onBarrierTypeChange,
            spot,
            } = this.props;
        const expiryType = isIntraDay ? 'intraday' : 'daily';
        const barrier1Info = barrierInfo[expiryType] && barrierInfo[expiryType][0];
        const barrier2Info = barrierInfo[expiryType] && barrierInfo[expiryType][1];
        const toggleMsg = barrierType === 'relative' ?
            (!isIntraDay && 'Absolute barrier available') :
            'Relative barrier';
        return (
            <CollapsibleFormSnippet label="Barriers" show>
                {barrier1Info &&
                    <div>
                        <BarrierInput
                            {...barrier1Info}
                            barrierType={barrierType}
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
                            barrierType={barrierType}
                            onChange={onBarrier2Change}
                            isIntraDay={isIntraDay}
                            value={barrier2}
                            spot={spot}
                        />
                    </div>}
                <a onClick={() => onBarrierTypeChange(barrierType === 'relative' ? 'absolute' : 'relative')}>
                    {toggleMsg}
                </a>
            </CollapsibleFormSnippet>
        );
    }
}
