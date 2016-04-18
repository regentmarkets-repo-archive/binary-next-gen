import React, { PropTypes, Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import RadioGroup from '../fulltrade/workaround/CustomRadioGroup';

export default class DigitBarrierCard extends Component {

    shouldComponentUpdate = shouldPureComponentUpdate;

    static propTypes = {
        barrier: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
        barrierInfo: PropTypes.object,
        index: PropTypes.number,
        onBarrierChange: PropTypes.func,
    };

    render() {
        const { barrier, barrierInfo, index, onBarrierChange } = this.props;

        if (!barrierInfo) return null;

        return (
            <div>
                <p>{barrierInfo.name}</p>
                <RadioGroup
                    name={'digit-selections' + index}
                    options={barrierInfo.values.map(b => ({ text: b, value: b }))}
                    value={barrier}
                    onChange={onBarrierChange}
                />
            </div>
        );
    }
}
