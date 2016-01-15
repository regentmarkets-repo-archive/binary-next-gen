import React, { PropTypes, Component } from 'react';
import { InputGroup, SelectGroup } from '../_common';
import { durationText } from '../_utils/TradeUtils';

export default class FullTradeDuration extends Component {
    static propTypes = {
        durationUnit: PropTypes.string,
        duration: PropTypes.number,
        forwardStartingOptions: PropTypes.array,
        min: PropTypes.number.isRequired,
        max: PropTypes.number.isRequired,
        onValueChange: PropTypes.func,
        onUnitChange: PropTypes.func,
        unitOptions: PropTypes.array.isRequired,
    };

    guardedValueUpdate(e) {
        const { min, max, onValueChange } = this.props;
        const val = e.target.value;
        if (!val) {
            onValueChange(undefined);
            return;
        }

        if (val > max) {
            onValueChange(max);
            return;
        }

        if (val < min) {
            onValueChange(min);
            return;
        }

        onValueChange(val);
    }

    render() {
        const { min, max, duration, durationUnit, onUnitChange, unitOptions } = this.props;
        const availableUnits = unitOptions.map(u => ({ value: u, text: durationText(u) }));

        return (
            <div className="row">
                <InputGroup
                    type="number"
                    hint="Duration of contract"
                    min={min}
                    max={max}
                    value={duration}
                    onChange={::this.guardedValueUpdate}
                />
                <SelectGroup
                    options={availableUnits}
                    onChange={e => onUnitChange(e.target.value)}
                    value={durationUnit}
                />
            </div>
        );
    }
}
