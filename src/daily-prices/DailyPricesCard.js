import React, { Component, PropTypes } from 'react';
import DailyPricesTable from './DailyPricesTable';

export default class DailyPricesCard extends Component {

    static propTypes = {
        dailyPrices: PropTypes.array.isRequired,
    };

    render() {
        const { dailyPrices } = this.props;

        return (
            <DailyPricesTable dailyPrices={dailyPrices} />
        );
    }
}
