import React, { PropTypes, Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import BarrierInput from './BarrierInput';
import WarningMsg from '../_common/WarningMsg';

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

        if (!barrier1Info) return null;

        const barrier1Decimals = barrier.toString().split('.')[1];
        const barrier1ExceedPipSize = barrier1Decimals && (barrier1Decimals.length > pipSize);

        const barrier2Decimals = barrier2 && barrier2.toString().split('.')[1];
        const barrier2ExceedPipSize = barrier2Decimals && (barrier2Decimals.length > pipSize);

        const warningText = `Barriers input only allows ${pipSize} decimals, exceeded decimals will be ignored.`;

        return (
            <div className="barrier-input">
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
                <WarningMsg
                    shown={barrier1ExceedPipSize || barrier2ExceedPipSize}
                    text={warningText}
                />
            </div>
        );
    }
}
