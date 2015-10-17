import React from 'react';
import { RangeGroup } from '../common';

export default () => (
    <fieldset>
        <RangeGroup label="Measure" min={0} max={3} items={['Ticks', 'Seconds', 'Minutes', 'Hours']} />
        <RangeGroup label="Duration" min={5} max={10} items={['5', '6', '7', '8', '9', '10']} />
    </fieldset>
);
