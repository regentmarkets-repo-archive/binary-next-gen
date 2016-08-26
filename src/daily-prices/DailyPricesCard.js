import React, { PureComponent, PropTypes } from 'react';
import DailyPricesTable from './DailyPricesTable';

export default class DailyPricesCard extends PureComponent {

    static propTypes = {
        dailyPrices: PropTypes.array.isRequired,
    };

    render() {
        const { dailyPrices } = this.props;

        return (
            <div className="daily-prices-card scrollable">
                <DailyPricesTable dailyPrices={dailyPrices} />
            </div>
        );
    }
}
