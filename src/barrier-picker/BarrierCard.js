import React, { PropTypes, PureComponent } from 'react';
import Label from 'binary-components/lib/Label';
import NumericInput from 'binary-components/lib/NumericInput';
import { changeBarrier1, changeBarrier2 } from '../trade-params/TradeParamsCascadingUpdates';
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
        onUpdateTradeParams: PropTypes.func,
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
        const error = this.validateBarrier(newBarrier1);
        this.onBarrierError(error);
        this.onBarrier1Change(e);
    }

    updateBarrier2 = e => {
        const newBarrier2 = e.target.value;
        const error = this.validateBarrier(newBarrier2);
        this.onBarrierError(error);
        this.onBarrier2Change(e);
    }

    onBarrierError = err => {
        const { index } = this.props;
        actions.updateTradeError(index, 'barrierError', err);
    }

    onBarrier1Change = e => {
        const { onUpdateTradeParams } = this.props;
        const inputValue = e.target.value;
        const updatedBarrier1 = changeBarrier1(inputValue);
        onUpdateTradeParams(updatedBarrier1);
    }
    onBarrier2Change = e => {
        const { onUpdateTradeParams } = this.props;
        const inputValue = e.target.value;
        const updatedBarrier2 = changeBarrier2(inputValue);
        onUpdateTradeParams(updatedBarrier2);
    }

    render() {
        const {
            barrier,
            barrier2,
            barrierInfo,
            barrierType,
            isIntraDay,
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
                        value={+barrierVal}
                        step={1}
                    />
                </div>
                {barrier2Info &&
                    <div className="param-row">
                        <Label text={barrier2Info.name} />
                        <NumericInput
                            className="numeric-input param-field"
                            onChange={this.updateBarrier2}
                            value={+barrier2Val}
                            step={1}
                        />
                    </div>
                }
            </div>
        );
    }
}
