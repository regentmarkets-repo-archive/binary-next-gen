import React, { PropTypes, Component } from 'react';
import { RiseFallChart } from 'binary-charts/lib/binary-charts';
import * as rfAdapter from './adapters/RiseFallAdapter';

export default class TradeChart extends Component {
    static propTypes = {
        symbol: PropTypes.string.isRequired,
        history: PropTypes.array.isRequired,
        contracts: PropTypes.array,
    };

    render() {
        const { history, contracts, symbol } = this.props;
        const data = rfAdapter.ticksToDataArray(history);
        const adaptedContracts = contracts && rfAdapter.openContractsToContracts(contracts);

        const xOffset = 0.1;
        const yOffset = 0.5;

        return (
            <RiseFallChart
                className="test-chart"
                title={symbol}
                symbol={symbol}
                data={data}
                contracts={adaptedContracts}
                xOffsetPercentage={xOffset}
                yOffsetPercentage={yOffset}
            />
        );
    }
}
