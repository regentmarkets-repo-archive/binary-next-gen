import React, { PureComponent } from 'react';
import { DigitStatsChart } from 'binary-components';
import EmptySlate from '../containers/EmptySlate';
import { actions } from '../_store';
import DigitStatsFilter from './DigitStatsFilter';

export default class DigitStatsCard extends PureComponent {

    props: {
        symbol: string,
        filter: number,
        stats: any[],
    };

    componentDidMount() {
        const { symbol, filter, stats } = this.props;

        if (stats && stats.length > 0 && stats.length < filter) {
            actions.getTicksByCount(symbol, filter);
        }
    }

    updateFilter = (e: SyntheticEvent) => {
        const newFilter = e.target.value;
        const { symbol } = this.props;
        actions.updateDigitStatFilter(+newFilter);
        actions.getTicksByCount(symbol, +newFilter);
    }

    render() {
        const { filter, stats } = this.props;

        if (!stats) {
            return (
                <EmptySlate
					img="img/barchart.svg"
					text="No digit trades for this asset"
                />
            );
        }

        return (
            <div className="digit-stats-card">
                <DigitStatsFilter value={filter} onChange={this.updateFilter} />
                <DigitStatsChart stats={stats} orientation="vertical" />
            </div>
        );
    }
}
