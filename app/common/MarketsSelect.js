import React from 'react';

export default ({markets}) => (
    <select {...props}>
        {markets.map(market =>
            <optgroup label={market.name}>
                {market.submarkets.map(subm =>
                    <option value={subm.id}>{subm.name}</option>
                )}
            </optgroup>
        )}
    </select>
);
