import React, { PropTypes, PureComponent } from 'react';
import { BinaryChart } from 'binary-charts';
import { actions } from '../_store';

const chartToDataType = {
    area: 'ticks',
    line: 'ticks',
    ohlc: 'candles',
    candlestick: 'candles',
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

    changeChartType = (type: ChartType) => {
        const { contract } = this.props;
        const { chartType } = this.state;

        if (chartType === type) {
            return undefined;
        }

        const newDataType = chartToDataType[type];
        const toStream = !contract.sell_time;
        this.setState({ chartType: type, dataType: newDataType });

        return actions
            .getDataForContract(contract.contract_id, 1, 'all', newDataType, toStream)
            .catch(err => {
                const serverError = err.error.error;
                if (serverError.code === 'NoRealtimeQuotes' || serverError.code === 'MarketIsClosed') {
                    return actions
                        .getDataForContract(contract.contract_id, 1, 'all', newDataType, false)
                        .catch(err2 => {
                            if (err2.error.error.code === 'StreamingNotAllowed') {
                                return undefined;
                            }
                            return Promise.reject(err2);
                        });
                }
                throw new Error(serverError.message);
            });
    }

    render() {
        const { contract, chartData, pipSize } = this.props;
        const { theme } = this.context;
        const { date_start, exit_tick_time, sell_spot_time } = contract;
        const { chartType, dataType } = this.state;
        const data = chartData[dataType];
        const allowCandle = !contract.tick_count;
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
                onTypeChange={(allowCandle && !hasNoData) && this.changeChartType}
            />
        );
    }
}
