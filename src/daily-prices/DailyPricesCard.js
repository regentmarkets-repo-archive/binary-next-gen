import React, { PureComponent } from 'react';
import DailyPricesTable from './DailyPricesTable';
import EmptySlate from '../containers/EmptySlate';

export default class DailyPricesCard extends PureComponent {
    props: {
        dailyPrices: any[],
    };

    render() {
        const { dailyPrices } = this.props;

        return (
            <div className="daily-prices-card scrollable">
                {dailyPrices.length === 0
                    ? <EmptySlate
                          img="img/daily-prices.svg"
                          text="Daily prices data not available"
                      />
                    : <DailyPricesTable dailyPrices={dailyPrices} />}
            </div>
        );
    }
}
