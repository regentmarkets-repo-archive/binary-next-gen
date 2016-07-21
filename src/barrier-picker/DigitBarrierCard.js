import React, { PropTypes, PureComponent } from 'react';
import Label from 'binary-components/lib/Label';
import RadioGroup from '../trade/workaround/CustomRadioGroup';
import { changeBarrier1 } from '../trade-params/TradeParamsCascadingUpdates';
export default class DigitBarrierCard extends PureComponent {

    static propTypes = {
        barrier: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
        barrierInfo: PropTypes.object,
        index: PropTypes.number,
        onUpdateTradeParams: PropTypes.func,
    };

    onBarrier1Change = e => {
        const { onUpdateTradeParams } = this.props;
        const inputValue = e.target.value;
        const updatedBarrier1 = changeBarrier1(inputValue);
        onUpdateTradeParams(updatedBarrier1);
    }

    render() {
        const { barrier, barrierInfo, index } = this.props;

        if (!barrierInfo) return null;

        const options = barrierInfo.values.map(b => ({ text: b, value: b }));

        return (
            <div className="param-row">
                <Label text={barrierInfo.name} />
                <RadioGroup
                    className="param-field"
                    name={'digit-selections' + index}
                    options={options}
                    value={barrier}
                    onChange={this.onBarrier1Change}
                />
            </div>
        );
    }
}
