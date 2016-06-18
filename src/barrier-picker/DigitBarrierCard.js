import React, { PropTypes, Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import Label from 'binary-components/lib/Label';
import RadioGroup from '../trade/workaround/CustomRadioGroup';

export default class DigitBarrierCard extends Component {

    static propTypes = {
        barrier: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
        barrierInfo: PropTypes.object,
        index: PropTypes.number,
        onBarrierChange: PropTypes.func,
    };

    shouldComponentUpdate = shouldPureComponentUpdate;

    render() {
        const { barrier, barrierInfo, index, onBarrierChange } = this.props;

        if (!barrierInfo) return null;

        return (
            <div className="param-row">
                <Label text={barrierInfo.name} />
                <RadioGroup
                    className="param-field"
                    name={'digit-selections' + index}
                    options={barrierInfo.values.map(b => ({ text: b, value: b }))}
                    value={barrier}
                    onChange={onBarrierChange}
                />
            </div>
        );
    }
}
