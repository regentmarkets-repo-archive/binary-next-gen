import React, { PropTypes, Component } from 'react';
import { RadioGroup } from '../_common';

export default class DigitBarrierCard extends Component {
    static propTypes = {
        barrier: PropTypes.number,
        barrierInfo: PropTypes.object,
        onBarrierChange: PropTypes.func,
    };

    render() {
        const { barrier, barrierInfo, onBarrierChange } = this.props;
        return (
            barrierInfo ?
                <div>
                    <p>{barrierInfo.name}</p>
                    <RadioGroup
                        name="digit-selections"
                        options={barrierInfo.value.map(b => ({ text: b, value: b }))}
                        value={barrier}
                        onChange={onBarrierChange}
                    />
                </div> :
                <div/>
        );
    }
}
