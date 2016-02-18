import React, { PropTypes, Component } from 'react';

export default class TradingTimesRow extends Component {

    static propTypes = {
        assetName: PropTypes.string,
        times: PropTypes.object.isRequired,
        events: PropTypes.array,
        compact: PropTypes.bool,
    };

    render() {
        const { assetName, times, events, compact } = this.props;

        return (
            <tr>
                {assetName && <td className="left row-id">{assetName}</td>}
                <td>{times.open.map(openTime => <div key={openTime}>{openTime}</div>)}</td>
                <td>{times.close.map(closeTime => <div key={closeTime}>{closeTime}</div>)}</td>
                <td>{times.settlement}</td>
                {!compact &&
                    <td>{events.map((event, i) =>
                            <div key={i}>
                                {event.descrip}: {event.dates}
                            </div>
                        )}
                    </td>
                }
            </tr>
        );
    }
}
