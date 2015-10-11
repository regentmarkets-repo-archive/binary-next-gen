import React from 'react';

export default ({minAvailableDuration}) => (
    <fieldset>
        <label>Duration</label>
        <input type="range" defaultValue={50} min={0} max={100} step={10} />
        <input type="number" size="4" maxLength="5" defaultValue="5" />
        <select>
            <option value="h">hours</option>
            <option value="m">minutes</option>
            <option value="s">seconds</option>
            <option value="t">ticks</option>
        </select>
    </fieldset>
);
