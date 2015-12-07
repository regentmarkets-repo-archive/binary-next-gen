import React from 'react';

const TradingTimesRow = ({ asset }) => {
    const eventStrs = asset.events.map(e => e.descrip + ': ' + e.dates);

    return (
        <tr>
            <td>{asset.name}</td>
            <td>{asset.times.open.map(openTime => <div key={openTime}>{openTime}</div>)}</td>
            <td>{asset.times.close.map(closeTime => <div key={closeTime}>{closeTime}</div>)}</td>
            <td>{asset.times.settlement}</td>
            <td>{eventStrs.map((event, i) => <div key={i}>{event}</div>)}</td>
        </tr>
    );
};

TradingTimesRow.propTypes = {
    asset: React.PropTypes.object.isRequired,
};

export default TradingTimesRow;
