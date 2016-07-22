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

    constructor(props) {
        super(props);
        const { barrier, barrier2 } = props;

        this.state = {
            barrier,
            barrier2,
        };
    }

    componentWillReceiveProps(nextProps) {
        const { barrier, barrier2 } = this.state;
        if (barrier !== nextProps.barrier && barrier !== nextProps.barrier.toString()) {
            this.setState({ barrier: nextProps.barrier });
        }
        if (barrier2 !== nextProps.barrier2 && barrier2 !== nextProps.barrier2.toString()) {
            this.setState({ barrier2: nextProps.barrier2 });
        }
    }
    validateBarrier = barrier => {
        const { pipSize } = this.props;
        const barrierDecimals = barrier.toString().split('.')[1];
        const barrierExceedPipSize = barrierDecimals && (barrierDecimals.length > pipSize);

        if (barrierExceedPipSize) {
            return `Barriers input only allows ${pipSize} decimals, exceeded decimals will be ignored.`;
        }
        return undefined;
    }

    onBarrierError = err => {
        const { index } = this.props;
        actions.updateTradeError(index, 'barrierError', err);
    }

    onBarrier1Change = e => {
        const { onUpdateTradeParams, barrier } = this.props;
        const inputValue = e.target.value.toString().split('.')
                            .map(v => isNaN(parseInt(v, 10)) ? '' : parseInt(v, 10))
                            .join('.');
        if (barrier !== inputValue && barrier !== inputValue.toString()) {
            const error = this.validateBarrier(inputValue);
            this.onBarrierError(error);
            const updatedBarrier1 = changeBarrier1(inputValue);
            onUpdateTradeParams(updatedBarrier1);
            this.setState({ barrier: inputValue });
        }
    }

    onBarrier2Change = e => {
        const { onUpdateTradeParams, barrier2 } = this.props;
        const inputValue = e.target.value.toString().split('.')
                            .map(v => isNaN(parseInt(v, 10)) ? '' : parseInt(v, 10))
                            .join('.');
        if (barrier2 !== inputValue && barrier2 !== inputValue.toString()) {
            const error = this.validateBarrier(inputValue);
            this.onBarrierError(error);
            const updatedBarrier2 = changeBarrier2(inputValue);
            onUpdateTradeParams(updatedBarrier2);
            this.setState({ barrier2: inputValue });
        }
    }

    render() {
        const {
            barrierInfo,
            barrierType,
            isIntraDay,
            spot,
        } = this.props;

        const { barrier, barrier2 } = this.state;

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
                        onChange={this.onBarrier1Change}
                        value={barrierVal}
                        step={1}
                    />
                </div>
                {barrier2Info &&
                    <div className="param-row">
                        <Label text={barrier2Info.name} />
                        <NumericInput
                            className="numeric-input param-field"
                            onChange={this.onBarrier2Change}
                            value={barrier2Val}
                            step={1}
                        />
                    </div>
                }
            </div>
        );
    }
}
