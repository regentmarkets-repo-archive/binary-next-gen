import React from 'react';

export default ({minAvailableDuration}) => (
    <fieldset>
        <label>Duration</label>
        <br />
        <input type="range" defaultValue={50} min={0} max={100} step={10} />
        <br />
        <label>10s</label>|<label>15s</label>|<label>20s</label>|<label>30s</label>|<label>1m</label>|<label>5m</label>|<label>10m</label>|<label>15m</label>|<label>30m</label>|<label>60m</label>
        <br />
        <input type="number" size="4" maxLength="5" defaultValue="5" />
        <select>
            <option value="h">hours</option>
            <option value="m">minutes</option>
            <option value="s">seconds</option>
            <option value="t">ticks</option>
        </select>
    </fieldset>
);
