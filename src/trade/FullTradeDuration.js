import React, { PropTypes, Component } from 'react';
import { InputGroup, SelectGroup } from '../_common';

const durationUnit = ['t', 'm', 'h', 'd'];       // this is an assumption, should verify with quants (ticks, minutes, hours, days)
const durationText = unit => {
    switch (unit) {
        case 't': return 'Ticks';
        case 'm': return 'Minutes';
        case 'h': return 'Hours';
        case 'd': return 'Days';
        default: return null;
    }
};
const durationTypes = (min, max) => {
    const minUnit = min.slice(-1)[0];
    const maxUnit = max.slice(-1)[0];

    const minIdx = durationUnit.indexOf(minUnit);
    const maxIdx = durationUnit.indexOf(maxUnit);

    return durationUnit.slice(minIdx, maxIdx + 1);
};

const durationLarger = (a, b) => {
    const aUnit = a.slice(-1)[0];
    const bUnit = b.slice(-1)[0];
    const aUnitOrder = durationUnit.indexOf(aUnit);
    const bUnitOrder = durationUnit.indexOf(bUnit);
    const aValue = a.slice(0, -1);
    const bValue = b.slice(0, -1);

    if (aUnitOrder > bUnitOrder) {
        return true;
    }
    if (aUnitOrder < bUnitOrder) {
        return false;
    }

    return aValue > bValue;
};

const durationLesser = (a, b) => {
    return (a !== b) && (durationLarger(a, b) === false);
};

export default class FullTradeDuration extends Component {
    static propTypes = {
        min: PropTypes.string.isRequired,
        max: PropTypes.string.isRequired,
        unit: PropTypes.string,
        duration: PropTypes.number,
        forwardStartingOptions: PropTypes.array,
        onValueChange: PropTypes.func,
        onUnitChange: PropTypes.func,
    };

    guardedValueUpdate(e) {
        const { min, max, unit, onValueChange } = this.props;
        const val = e.target.value + unit;

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
            <div>
                <InputGroup type="number" hint="Duration of contract" value={duration} onChange={::this.guardedValueUpdate} />
                <SelectGroup options={availableTypes} onChange={e => onUnitChange(e.target.value)} />
            </div>
        );
    }
}
