import React, { PropTypes, PureComponent } from 'react';
import { Label, NumericInput } from 'binary-components';
import { actions } from '../_store';

export default class BarrierCard extends PureComponent {

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
        pipSize: PropTypes.number,
        spot: PropTypes.number,
    };

    validateBarrier = barrier => {
        const { pipSize } = this.props;
        const barrierDecimals = barrier.toString().split('.')[1];
        const barrierExceedPipSize = barrierDecimals && (barrierDecimals.length > pipSize);

        if (barrierExceedPipSize) {
            return `Barriers input only allows ${pipSize} decimals, exceeded decimals will be ignored.`;
        }
        return undefined;
    }

    updateBarrier1 = e => {
        const newBarrier1 = e.target.value;
        actions.reqBarrierChange([newBarrier1, this.props.barrier2]);
    }

    updateBarrier2 = e => {
        const newBarrier2 = e.target.value;
        actions.reqBarrierChange([this.props.barrier, newBarrier2]);
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

        let barrierVal;
        let barrier2Val;
        if (barrierType === 'relative') {
            barrierVal = expiryType === 'daily' ? spot && (+barrier - spot) : barrier;
            barrier2Val = expiryType === 'daily' ? spot && (+barrier2 - spot) : barrier2;
        } else {
            barrierVal = expiryType === 'daily' ? barrier : spot && (+barrier + spot);
            barrier2Val = expiryType === 'daily' ? barrier2 : spot && (+barrier2 + spot);
        }

        return (
            <div className="barrier-picker">
                <div className="param-row">
                    <Label text={barrier1Info.name} />
                    <NumericInput
                        className="numeric-input param-field"
                        onChange={this.updateBarrier1}
                        defaultValue={+barrierVal}
                        decimal={pipSize}
                        step={1}
                    />
                </div>
                {barrier2Info &&
                    <div className="param-row">
                        <Label text={barrier2Info.name} />
                        <NumericInput
                            className="numeric-input param-field"
                            onChange={this.updateBarrier2}
                            defaultValue={+barrier2Val}
                            step={1}
                            decimal={pipSize}
                        />
                    </div>
                }
            </div>
        );
    }
}
