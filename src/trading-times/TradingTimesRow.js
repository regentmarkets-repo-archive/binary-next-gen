import React, { PureComponent } from 'react';

export default class TradingTimesRow extends PureComponent {
    props: {
        assetName: string,
        compact: boolean,
        times: object,
        events: any[],
    };

    static defaultProps = {
        times: {
            open: [],
            close: [],
        },
        events: [],
    };

    render() {
        const { assetName, compact, times, events } = this.props;

        return (
            <tr>
                {assetName && <td className="textual row-id">{assetName}</td>}
                <td className="date">
                    {times.open.map(openTime => (
                        <div key={openTime}>{openTime}</div>
                    ))}
                </td>
                <td className="date">
                    {times.close.map(closeTime => (
                        <div key={closeTime}>{closeTime}</div>
                    ))}
                </td>
                <td className="date">
                    {times.settlement}
                </td>
                {!compact &&
                    <td className="textual">
                        {events.map((event, i) => (
                            <div key={i}>
                                {event.descrip}: {event.dates}
                            </div>
                        ))}
                    </td>}
            </tr>
        );
    }
}
