import React, { Component, PropTypes } from 'react';
import DigitStatsChart from 'binary-components/lib/DigitStatsChart';
import DigitStatsFilter from './DigitStatsFilter';

export default class DigitStatsCard extends Component {
    static propTypes = {
        actions: PropTypes.object.isRequired,
        symbol: PropTypes.string.isRequired,
        filter: PropTypes.number,
        stats: PropTypes.array,
    };

    componentDidMount() {
        const { actions, symbol, filter, stats } = this.props;

        if (stats && stats.length > 0 && stats.length < filter) {
            actions.getTicksByCount(symbol, filter);
        }
    }

    updateFilter(e) {
        const newFilter = e.target.value;
        const { actions, symbol } = this.props;
        actions.updateDigitStatFilter(+newFilter);
        actions.getTicksByCount(symbol, +newFilter);
    }

    render() {
        const { filter, stats } = this.props;

        if (stats.length === 0) return null;

        return (
            <div className="digit-stats-card">
                <DigitStatsFilter value={filter} onChange={::this.updateFilter} />
                <DigitStatsChart stats={stats} orientation="vertical" />
            </div>
        );
    }
}
