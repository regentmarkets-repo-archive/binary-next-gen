import React, { PureComponent } from 'react';
import { Label } from 'binary-components';
import RadioGroup from '../trade/workaround/CustomRadioGroup';
import { actions } from '../_store';

export default class DigitBarrierCard extends PureComponent {
    props: {
        barrier: string | number,
        digitOptions: string[],
        index: number,
    };

    onBarrier1Change = (e: SyntheticEvent) => {
        const { index } = this.props;
        const inputValue = e.target.value;
        actions.reqBarrierChange(index, [inputValue], 0, 'tick'); // only ticks available for digit
    };

    render() {
        const { barrier, digitOptions, index } = this.props;

        if (!digitOptions) return null;

        const options = digitOptions.map(b => ({ text: b, value: b }));

        return (
            <div className="param-row">
                <Label text="Digit" />
                <RadioGroup
                    className="param-field"
                    name={'digit-selections' + index}
                    options={options}
                    defaultValue={barrier}
                    onChange={this.onBarrier1Change}
                />
            </div>
        );
    }
}
