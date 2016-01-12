import React, { PropTypes, Component } from 'react';
import { InputGroup } from '../_common';

export default class BarrierInput extends Component {
    static propTypes = {
        min: PropTypes.number,
        max: PropTypes.number,
        name: PropTypes.string.isRequired,
        onBarrierChange: PropTypes.func,
    };

    guardedBarrierUpdate(e) {
        const { min, max, onBarrierChange } = this.props;
        const val = parseFloat(e.target.value);
        if (val > max) {
            onBarrierChange(max);
        } else if (val < min) {
            onBarrierChange(min);
        } else {
            onBarrierChange(val);
        }
    }

    render() {
        const { min, max, name } = this.props;
        return (
            <InputGroup
                label={name}
                min={min}
                max={max}
                type="number"
                onChange={::this.guardedBarrierUpdate}
            />
        );
    }
}
