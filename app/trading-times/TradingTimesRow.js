import React from 'react';

const TradingTimesRow = (props) => {
    const { symbol } = props;
    const eventStrs = symbol.events.map(e => e.descrip + ':' + e.dates);

    return (
        <tr>
            <td>{symbol.name}</td>
            <td>{symbol.times.open}</td>
            <td>{symbol.times.close}</td>
            <td>{symbol.times.settlement}</td>
            <td>{eventStrs.join(', ')}</td>
        </tr>
    );
};

TradingTimesRow.propTypes = {
    symbol: React.PropTypes.object.isRequired,
};

export default TradingTimesRow;
