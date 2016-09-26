import React, { PureComponent } from 'react';
import { isMobile } from 'binary-utils';
import { BinaryChart } from 'binary-charts';
import {
    internalTradeModelToChartTradeModel,
    serverContractModelToChartContractModel,
} from '../adapters/TradeObjectAdapter';
import { chartApi } from '../../_data/LiveData';
import { mergeTicks } from '../../_reducers/TickReducer';
import { mergeCandles } from '../../_reducers/OHLCReducer';
import { chartToDataType, getDataWithErrorHandling } from '../../_chart-utils/Utils';

const zoomInTo = (ratio) => (ev, chart) => {
    const { dataMax, dataMin } = chart.xAxis[0].getExtremes();
    const range = (dataMax - dataMin) * ratio;
    chart.xAxis[0].setExtremes(dataMax - range, dataMax);
};

const zoomInMax = (ev, chart) => {
    const { dataMax } = chart.xAxis[0].getExtremes();
    const { minRange } = chart.xAxis[0].options;
    chart.xAxis[0].setExtremes(dataMax - minRange, dataMax);
};

const defaultState = {
    dataType: 'ticks',
    chartType: 'area',
    ticks: [],
    candles: [],
};

export default class TradeViewChart extends PureComponent {

    static contextTypes = {
        theme: () => undefined,
    };

    props: {
        contractForChart: object,
        index: number,
        events: any[],
        feedLicense: string,
        pipSize: number,
        tradeForChart: object,
        tradingTime: object,
    };

    static defaultProps = {
        type: 'full',
        feedLicense: '',
        events: [
            {
                type: 'zoom-in-to',
                handler: zoomInTo(1 / 16),
            },
            {
                type: 'zoom-in-max',
                handler: zoomInMax,
            },
        ],
        tradingTime: {},
    };

    constructor(props) {
        super(props);
        this.state = defaultState;

        this.api = chartApi(props.index + 1);
    }

    componentWillMount() {
        this.api.events.on('tick', data => {
            const { tradeForChart } = this.props;

            // ignored delayed tick from previous subscription
            if (tradeForChart && data.tick.symbol !== tradeForChart.symbol) return;

            const old = this.state.ticks;
            const newTick = {
                epoch: +data.tick.epoch,
                quote: +data.tick.quote,
            };
            this.setState({ ticks: old.concat([newTick]) });
            this.ticksId = data.tick.id;
        });
        this.api.events.on('ohlc', data => {
            const { tradeForChart } = this.props;

            // ignore delayed tick from previous subscription
            if (tradeForChart && data.ohlc.symbol !== tradeForChart.symbol) return;

            const old = this.state.candles;

            // list of candles might be received later than candles stream due to size
            // do not process single candle that arrived before list of candles
            if (old.length < 3) {
                return;
            }

            const ohlc = data.ohlc;
            const newOHLC = {
                epoch: +(ohlc.open_time || ohlc.epoch),
                open: +ohlc.open,
                high: +ohlc.high,
                low: +ohlc.low,
                close: +ohlc.close,
            };
            const last1 = old[old.length - 1];
            const last2 = old[old.length - 2];
            const last3 = old[old.length - 3];
            const interval = last2.epoch - last3.epoch;
            const diff = newOHLC.epoch - last1.epoch;

            if (diff < interval) {
                const newOHLCArr = old.slice(0, -1);
                newOHLCArr.push(newOHLC);
                this.setState({ candles: newOHLCArr });
            } else {
                this.setState({ candles: old.concat([newOHLC]) });
            }
            this.ohlcId = data.ohlc.id;
        });
    }

    componentDidMount() {
        const { tradeForChart, index } = this.props;

        if (!tradeForChart) return;

        const { symbol } = tradeForChart;
        this.subscribeToTicks(symbol).then(() => {
            const chartDiv = document.getElementById(`trade-chart${index}`);
            if (chartDiv) {
                chartDiv.dispatchEvent(new Event('zoom-in-to'));
            }
        });
        this.subscribeToOHLC(symbol);
    }

    componentWillReceiveProps(nextProps) {
        if (
            (this.props.tradeForChart && nextProps.tradeForChart) &&
            (this.props.tradeForChart.symbol !== nextProps.tradeForChart.symbol)
        ) {
            this.setState(defaultState);
            this.unsubscribe();
            this.subscribeToTicks(nextProps.tradeForChart.symbol).then(() => {
                const chartDiv = document.getElementById(`trade-chart${nextProps.index}`);
                if (chartDiv) {
                    chartDiv.dispatchEvent(new Event('zoom-in-to'));
                }
            });
            this.subscribeToOHLC(nextProps.tradeForChart.symbol);
        }
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.contractForChart && this.props.contractForChart) {
            const index = this.props.index;
            const chartDiv = document.getElementById(`trade-chart${index}`);
            if (chartDiv) {
                chartDiv.dispatchEvent(new Event('zoom-in-max'));
            }
        }
    }

    componentWillUnmount() {
        this.unsubscribe();
        this.api.events.ignoreAll('tick');
        this.api.events.ignoreAll('ohlc');
    }

    unsubscribe = () => {
        if (this.ticksId) this.api.unsubscribeByID(this.ticksId);
        if (this.ohlcId) this.api.unsubscribeByID(this.ohlcId);
    }

    updateData = (data, type) => {
        if (type === 'ticks') {
            const { times, prices } = data.history;
            const newTicks = times.map((t, idx) => {
                const quote = prices[idx];
                return { epoch: +t, quote: +quote };
            });

            const ticks = mergeTicks(this.state.ticks, newTicks);
            this.setState({ ticks });
            return ticks;
        }

        const candles = mergeCandles(this.state.candles, data.candles);
        this.setState({ candles });
        return candles;
    }

    fetchData = (start: number, end: number, type: ChartType, interval: number): Promise => {
        const { tradeForChart, feedLicense } = this.props;

        if (feedLicense === 'chartonly') return Promise.resolve();

        const { symbol } = tradeForChart;
        const count = type === 'ticks' ? 1000 : 500;

        // no need to handle error as not calling with subscribe
        return this.api
            .getTickHistory(symbol, { count, end, style: type, granularity: interval, adjust_start_time: 1 })
            .then(r => this.updateData(r, type));
    }

    subscribeToTicks = (symbol, count = 2000): Promise => {
        const { feedLicense } = this.props;
        if (feedLicense === 'chartonly') {
            return Promise.resolve();
        }

        const callDependOnErr = (err) =>
            this.api.getTickHistory(symbol, {
                count,
                end: 'latest',
                subscribe: err ? undefined : 1,
            });

        return getDataWithErrorHandling(callDependOnErr).then(r => this.updateData(r, 'ticks'));
    }

    subscribeToOHLC = (symbol, count = 500, interval = 60): Promise => {
        const { feedLicense } = this.props;
        if (feedLicense === 'chartonly') {
            return Promise.resolve();
        }

        const callDependOnErr = (err) =>
            this.api.getTickHistory(symbol, {
                    count,
                    end: 'latest',
                    subscribe: err ? undefined : 1,
                    style: 'candles',
                    granularity: interval,
                });

        return getDataWithErrorHandling(callDependOnErr).then(r => this.updateData(r, 'candles'));
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

    render() {
        const { contractForChart, index, events,
            feedLicense, pipSize, tradeForChart } = this.props;
        const { theme } = this.context;
        const { chartType, ticks, dataType } = this.state;

        const noData = feedLicense === 'chartonly';

        return (
            <BinaryChart
                id={`trade-chart${index}`}
                className="trade-chart"
                contract={contractForChart && serverContractModelToChartContractModel(contractForChart)}
                events={events}
                noData={noData}
                pipSize={pipSize}
                shiftMode={contractForChart ? 'dynamic' : 'fixed'}
                symbol={tradeForChart && tradeForChart.symbol}
                assetName={tradeForChart && tradeForChart.symbolName}
                ticks={contractForChart ? ticks : this.state[dataType]}
                theme={theme}
                showTooltips={!isMobile()}
                hideZoomControls={isMobile()}
                type={contractForChart ? 'area' : chartType}
                trade={tradeForChart && internalTradeModelToChartTradeModel(tradeForChart)}
                // tradingTimes={tradingTime.times}
                getData={contractForChart || noData ? undefined : this.fetchData}
                onTypeChange={contractForChart || noData ? undefined : this.changeChartType}   // do not allow change type when there's contract
            />
        );
    }
}
