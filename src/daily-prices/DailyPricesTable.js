import React, { Component, PropTypes } from 'react';
import Th from 'binary-components/lib/Th';
import DailyPricesRow from './DailyPricesRow';

export default class DailyPricesTable extends Component {

    static propTypes = {
        dailyPrices: PropTypes.array.isRequired,
    };

    render() {
        const { dailyPrices } = this.props;

        return (
            <table>
                <thead>
                    <tr>
                        <Th text="Date" />
                        <Th text="Open" />
                        <Th text="High" />
                        <Th text="Low" />
                        <Th text="Close" />
                    </tr>
                </thead>
                <tbody>
                    {dailyPrices.map(x =>
                        <DailyPricesRow key={x.date} {...x} />
                    )}
                </tbody>
            </table>
        );
    }
}
