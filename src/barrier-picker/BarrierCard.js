import React, { PropTypes, Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import BarrierInput from './BarrierInput';

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
        onError: PropTypes.func,
        pipSize: PropTypes.number,
        spot: PropTypes.number,
    };

    validateBarrier(barrier) {
        const { pipSize } = this.props;
        const barrierDecimals = barrier.toString().split('.')[1];
        const barrierExceedPipSize = barrierDecimals && (barrierDecimals.length > pipSize);

        if (barrierExceedPipSize) {
            return `Barriers input only allows ${pipSize} decimals, exceeded decimals will be ignored.`;
        }
        return undefined;
    }

    updateBarrier1(e) {
        const { onError, onBarrier1Change } = this.props;
        const newBarrier1 = e.target.value;
        const error = this.validateBarrier(newBarrier1);
        onError(error);
        onBarrier1Change(e);
    }

    updateBarrier2(e) {
        const { onError, onBarrier2Change } = this.props;
        const newBarrier2 = e.target.value;
        const error = this.validateBarrier(newBarrier2);
        onError(error);
        onBarrier2Change(e);
    }

    render() {
        const {
            barrier,
            barrier2,
            barrierInfo,
            barrierType,
            isIntraDay,
            pipSize,
            spot,
            } = this.props;
        const expiryType = isIntraDay ? 'intraday' : 'daily';
        const barrier1Info = barrierInfo[expiryType] && barrierInfo[expiryType][0];
        const barrier2Info = barrierInfo[expiryType] && barrierInfo[expiryType][1];

        if (!barrier1Info) return null;

        return (
            <div className="barrier-picker">
                <BarrierInput
                    {...barrier1Info}
                    barrierType={barrierType}
                    expiryType={expiryType}
                    onChange={::this.updateBarrier1}
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
                        onChange={::this.updateBarrier2}
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
