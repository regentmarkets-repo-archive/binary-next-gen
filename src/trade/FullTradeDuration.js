import React, { PropTypes, Component } from 'react';
import { InputGroup, SelectGroup } from '../_common';
import { durationLarger, durationLesser, durationText, durationTypes } from '../_utils/TradeUtils';

export default class FullTradeDuration extends Component {
    static propTypes = {
        min: PropTypes.string.isRequired,
        max: PropTypes.string.isRequired,
        durationUnit: PropTypes.string,
        duration: PropTypes.number,
        forwardStartingOptions: PropTypes.array,
        onValueChange: PropTypes.func,
        onUnitChange: PropTypes.func,
    };

    guardedValueUpdate(e) {
        const { min, max, durationUnit, onValueChange } = this.props;
        const val = e.target.value + durationUnit;

        if (durationLarger(val, max)) {
            onValueChange(max);
        }

        if (durationLesser(val, min)) {
            onValueChange(min);
        }
    }

    render() {
        const { min, max, duration, onUnitChange } = this.props;
        const availableTypes = durationTypes(min, max).map(u => ({ value: u, text: durationText(u) }));

        return (
            <div className="row">
                <InputGroup
                    type="number"
                    hint="Duration of contract"
                    value={duration}
                    onChange={::this.guardedValueUpdate}
                />
                <SelectGroup options={availableTypes} onChange={e => onUnitChange(e.target.value)} />
            </div>
        );
    }
}
