import React, { PropTypes, PureComponent } from 'react';
import { Label } from 'binary-components';
import RadioGroup from '../trade/workaround/CustomRadioGroup';
import { actions } from '../_store';
export default class DigitBarrierCard extends PureComponent {

    static propTypes = {
        barrier: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
        digitOptions: PropTypes.array,
        index: PropTypes.number,
    };

    onBarrier1Change = e => {
        const { index } = this.props;
        const inputValue = e.target.value;
        actions.reqBarrierChange(index, [inputValue]);
    }

    render() {
        const { barrier, digitOptions, index } = this.props;

        if (!digitOptions) return null;

        const options = digitOptions.map(b => ({ text: b, value: b }));

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
