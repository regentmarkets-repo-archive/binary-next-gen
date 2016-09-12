import React, { PropTypes, PureComponent } from 'react';
import { BinaryChart } from 'binary-charts';
import { helpers } from 'binary-live-api';
import { actions } from '../_store';
import { fetch1000Candles, fetch1000Ticks } from '../_data/utils';

const chartToDataType = {
    area: 'ticks',
    line: 'ticks',
    candlestick: 'candles',
    ohlc: 'candles',
};

export default class ContractChart extends PureComponent {

    static contextTypes = {
        theme: PropTypes.string.isRequired,
    };

    static propTypes = {
        contract: PropTypes.object.isRequired,
        chartData: PropTypes.shape({
            ticks: PropTypes.array,
            candles: PropTypes.array,
        }),
        pipSize: PropTypes.number,
    };

    constructor(props) {
        super(props);
        this.state = {
            chartType: 'area',
            dataType: 'ticks',
        };
    }

    fetchData = (s, e, type, interval) => {
        const { contract } = this.props;
        const toStream = !contract.sell_time;

        const { start, end } = helpers.computeStartEndForContract(contract);

        const result = type === 'ticks' ? fetch1000Ticks(symbol, end) : fetch1000Candles(symbol, end, interval);
        return result.then(data => {
            if (+data[0].epoch > +start) {
                return this.fetchInBatches(start, +data[0].epoch, type);
            }
            return data;
        });
    }

    changeChartType = (type: ChartType) => {
        const { chartType } = this.state;

        const allowCandle = !contract.tick_count;
        const newDataType = chartToDataType[type];

        if ((!allowCandle && newDataType === 'candles') || chartType === type) {
            return;
        }

        if (newDataType === this.state.dataType) {
            this.setState({ chartType: type });
            return;
        }

        this.setState({ chartType: type, dataType: newDataType });
    }

    render() {
        const { contract, chartData, pipSize } = this.props;
        const { theme } = this.context;
        const { date_start, exit_tick_time, sell_spot_time } = contract;
        const { chartType, dataType } = this.state;
        const data = chartData[dataType];
        const endTime = exit_tick_time || sell_spot_time;

        // handle edge case where contract ends before it starts, show No data available message on chart
        const hasNoData = (+date_start > +endTime);

        return (
            <BinaryChart
                className="contract-chart"
                defaultRange={6}
                showAllRangeSelector={false}
                contract={contract}
                ticks={hasNoData ? undefined : data}
                type={chartType}
                theme={theme}
                noData={hasNoData}
                pipSize={pipSize}
                onTypeChange={!hasNoData ? this.changeChartType : undefined}
            />
        );
    }
}
