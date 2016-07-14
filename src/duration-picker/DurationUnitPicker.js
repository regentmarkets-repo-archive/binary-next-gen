import React, { PureComponent, PropTypes } from 'react';

export default class DurationUnitPicker extends PureComponent {

    static propTypes = {
        durationUnit: PropTypes.string.isRequired,
        unitOptions: PropTypes.array.isRequired,
        onChange: PropTypes.func.isRequired,
    };

    render() {
        const { durationUnit, unitOptions, onChange } = this.props;

        if (unitOptions.length === 1) {
            return (
                <div className="duration-text">
                    {unitOptions[0].text}
                </div>
            );
        }

        return (
            <select value={durationUnit} onChange={onChange}>
                {unitOptions.map(o =>
                    <option key={o.value} value={o.value}>{o.text}</option>
                )}
            </select>
        );
    }
}
