import React, { PropTypes, PureComponent } from 'react';
import { Label, NumericInput } from 'binary-components';
import debounce from 'lodash.debounce';
import { actions } from '../_store';

const debouncedReqBarrierChange = debounce(actions.reqBarrierChange, 400);

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
        expiryType: PropTypes.string,
        index: PropTypes.number.isRequired,
        pipSize: PropTypes.number,
        spot: PropTypes.number,
    };

    updateBarrier1 = (newBarrier1: number) => {
        const { index, barrier2, pipSize, expiryType } = this.props;
        debouncedReqBarrierChange(index, [newBarrier1, barrier2], pipSize, expiryType);
    }

    updateBarrier2 = (newBarrier2: number) => {
        const { barrier, index, pipSize, expiryType } = this.props;
        debouncedReqBarrierChange(index, [barrier, newBarrier2], pipSize, expiryType);
    }

    render() {
        const {
            barrier,
            barrier2,
            barrierInfo,
            barrierType,
            expiryType,
            pipSize,
            spot,
            } = this.props;
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
