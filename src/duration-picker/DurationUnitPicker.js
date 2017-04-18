import React, { PureComponent } from 'react';
import { M, Option } from 'binary-components';

export default class DurationUnitPicker extends PureComponent {
    props: {
        durationUnit: string,
        unitOptions: any[],
        onChange: (e: SyntheticEvent) => void,
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
                {unitOptions.map(o => (
                    <Option key={o.value} value={o.value} text={o.text} />
                ))}
            </select>
        );
    }
}
