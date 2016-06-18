import React, { PropTypes, Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import Label from 'binary-components/lib/Label';
import NumericInput from 'binary-components/lib/NumericInput';

export default class BarrierCard extends Component {

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

    shouldComponentUpdate = shouldPureComponentUpdate;

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
        const { onError, onBarrier1Change } = this.props;
        const newBarrier1 = e.target.value;
        const error = this.validateBarrier(newBarrier1);
        onError(error);
        onBarrier1Change(e);
    }

    updateBarrier2 = e => {
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
                    {/* <input
                        className="param-field"
                        type="number"
                        onChange={this.updateBarrier1}
                        defaultValue={barrierVal}
                        step={pipSizeToStepSize(pipSize)}
                    /> */}
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
                        {/* <input
                            className="param-field"
                            type="number"
                            onChange={this.updateBarrier2}
                            defaultValue={barrier2Val}
                            step={pipSizeToStepSize(pipSize)}
                        /> */}
                    </div>
                }
            </div>
        );
    }
}
