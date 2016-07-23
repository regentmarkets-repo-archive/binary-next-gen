import React, { PureComponent, PropTypes } from 'react';
import M from 'binary-components/lib/M';
import Option from 'binary-components/lib/Option';

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
                    <M m={unitOptions[0].text} />
                </div>
            );
        }

        return (
            <select value={durationUnit} onChange={onChange}>
                {unitOptions.map(o =>
                    <Option key={o.value} value={o.value} text={o.text} />
                )}
            </select>
        );
    }
}
