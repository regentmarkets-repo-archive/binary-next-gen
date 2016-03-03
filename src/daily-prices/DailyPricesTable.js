import React, { Component, PropTypes } from 'react';
import M from '../_common/M';
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
                        <th><M m="Date" /></th>
                        <th><M m="Open" /></th>
                        <th><M m="High" /></th>
                        <th><M m="Low" /></th>
                        <th><M m="Close" /></th>
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
