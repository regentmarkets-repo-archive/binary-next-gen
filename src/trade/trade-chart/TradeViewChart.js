import React, { PureComponent, PropTypes } from 'react';
import { BinaryChart } from 'binary-charts';
import {
    internalTradeModelToChartTradeModel,
    serverContractModelToChartContractModel,
} from '../adapters/TradeObjectAdapter';
import { api } from '../../_data/LiveData';

const zoomToLatest = (ev, chart) => {
    const { dataMax, dataMin } = chart.xAxis[0].getExtremes();
    const half = (dataMax - dataMin) * 0.5 + dataMin;
    chart.xAxis[0].setExtremes(half, dataMax);
};

const chartToDataType = {
    area: 'ticks',
    line: 'ticks',
    candlestick: 'candles',
    ohlc: 'candles',
};

const fetch1000Ticks = (symbol, end, count = 3000) =>
    api.getTickHistory(symbol, {
        count,
        end,
    }).then(r => {
        const { times, prices } = r.history;
        return times.map((t, idx) => {
            const quote = prices[idx];
            return { epoch: +t, quote: +quote };
        });
    });

const fetch1000Candles = (symbol, end, interval, count = 1000) =>
    api.getTickHistory(symbol, {
        count,
        end,
        style: 'candles',
        granularity: interval,
    }).then(r => r.candles);

export default class TradeViewChart extends PureComponent {

    static contextTypes = {
        theme: PropTypes.string,
    };

    static propTypes = {
        contractForChart: PropTypes.object,
        ticks: PropTypes.array.isRequired,
        ohlc: PropTypes.array.isRequired,
        index: PropTypes.number.isRequired,
        events: PropTypes.array.isRequired,
        feedLicense: PropTypes.string.isRequired,
        pipSize: PropTypes.number,
        tradeForChart: PropTypes.object,
        tradingTime: PropTypes.object.isRequired,
    };

    static defaultProps = {
        type: 'full',
        feedLicense: '',
        events: [{
            type: 'zoom-to-latest',
            handler: zoomToLatest,
        }],
        ticks: [],
        ohlc: [],
        tradingTime: {},
    };

    constructor(props) {
        super(props);
        this.state = {
            dataType: 'ticks',
            chartType: 'area',
        };
    }

    componentWillReceiveProps(nextProps) {
        if (
            (this.props.tradeForChart && nextProps.tradeForChart) &&
            (this.props.tradeForChart.symbol !== nextProps.tradeForChart.symbol)
        ) {
            this.setState({
                dataType: 'ticks',
                chartType: 'area',
            });
        }
    }

    fetchInBatches = (start, end, type, interval) => {
        const { tradeForChart } = this.props;
        const { symbol } = tradeForChart;

        const result = type === 'ticks' ? fetch1000Ticks(symbol, end) : fetch1000Candles(symbol, end, interval);
        return result.then(data => {
            if (+data[0].epoch > +start) {
                return this.fetchInBatches(start, +data[0].epoch, type);
            }
            return data;
        });
    }

    changeChartType = (type: ChartType) => {
        const { contractForChart, feedLicense } = this.props;
        const { chartType } = this.state;

        // TODO: provide a switch to disable type change control
        if (feedLicense === 'chartonly' || contractForChart || chartType === type) {
            return;
        }

        const newDataType = chartToDataType[type];
        if (newDataType === this.state.dataType) {
            this.setState({ chartType: type });
            return;
        }

        this.setState({ chartType: type, dataType: newDataType });
    }

    // changeChartInterval = (interval: number) => {
    //     const { symbol } = this.props.tradeForChart;
    //     const nowEpoch = nowAsEpoch();
    //     return api.getTickHistory(symbol, {
    //         end: nowEpoch,
    //         start: nowEpoch - duration,
    //         granularity: interval,
    //         style: 'candles',
    //     }).then(r => {
    //         this.setState({ chartType: 'candlestick', dataType: 'candles' });
    //         return r;
    //     });
    // }

    render() {
        const { contractForChart, index, ticks, ohlc, events,
            feedLicense, pipSize, tradeForChart, tradingTime } = this.props;
        const { theme } = this.context;
        const { chartType, dataType } = this.state;

        return (
            <BinaryChart
                id={`trade-chart${index}`}
                className="trade-chart"
                contract={contractForChart && serverContractModelToChartContractModel(contractForChart)}
                defaultRange={1} // TODO: figure out how to set this dynamically so it looks good despite of data size
                events={events}
                noData={feedLicense === 'chartonly'}
                pipSize={pipSize}
                shiftMode={contractForChart ? 'dynamic' : 'fixed'}
                symbol={tradeForChart && tradeForChart.symbolName}
                ticks={(dataType === 'ticks' || contractForChart) ? ticks : ohlc}
                theme={theme}
                type={contractForChart ? 'area' : chartType}
                trade={tradeForChart && internalTradeModelToChartTradeModel(tradeForChart)}
                tradingTimes={tradingTime.times}
//                onIntervalChange={this.changeChartInterval}
                getData={contractForChart ? undefined : this.fetchInBatches}
                onTypeChange={contractForChart ? undefined : this.changeChartType}   // do not allow change type when there's contract
            />
        );
    }
}
