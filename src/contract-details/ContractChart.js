import React, { PropTypes, PureComponent } from 'react';
import { BinaryChart } from 'binary-charts';
import { helpers } from 'binary-live-api';
import { chartApi } from '../_data/LiveData';

const chartToDataType = {
    area: 'ticks',
    line: 'ticks',
    candlestick: 'candles',
    ohlc: 'candles',
};

type Props = {
    contract: Contract,
    pipSize: number,
};

export default class ContractChart extends PureComponent {

    static contextTypes = {
        theme: PropTypes.string.isRequired,
    };

    props: Props;

    constructor(props: Props) {
        super(props);
        this.state = {
            chartType: 'area',
            dataType: 'ticks',
            ticks: [],
            candles: [],
        };
        this.api = chartApi[5];
        this.hasTick = true;
    }

    componentWillMount() {
        this.api.events.on('tick', data => {
            if (!this.hasTick) throw new Error('Not supposed to have tick stream!');

            this.ticksId = data.tick.id;            // problematic, sometimes it will both be ohlc stream, and screw u !!

            const old = this.state.ticks;
            const newTick = {
                epoch: +data.tick.epoch,
                quote: +data.tick.quote,
            };
            this.setState({ ticks: old.concat([newTick]) });
        });

        this.api.events.on('ohlc', data => {
            this.ohlcId = data.ohlc.id;

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

            // new candles might belong to the same interval of last candle
            // replace instead of append in that case
            if (diff < interval) {
                const newOHLCArr = old.slice(0, -1);
                newOHLCArr.push(newOHLC);

                if (!this.hasTick) {
                    const newTicks = newOHLCArr.map(c => ({ epoch: +c.epoch, quote: +c.close }));
                    this.setState({ ticks: newTicks, candles: newOHLCArr });
                } else {
                    this.setState({ candles: newOHLCArr });
                }
            } else {
                const newCandles = old.concat([newOHLC]);

                if (!this.hasTick) {
                    const newTicks = newCandles.map(c => ({ epoch: +c.epoch, quote: +c.close }));
                    this.setState({ ticks: newTicks, candles: newCandles });
                } else {
                    this.setState({ candles: newCandles });
                }
            }
        });

        this.prepareDataForChart();
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    unsubscribe = () => {
        if (this.ticksId) this.api.unsubscribeByID(this.ticksId);
        if (this.ohlcId) this.api.unsubscribeByID(this.ohlcId);
    }

    updateData = (data, type) => {
        if (type === 'ticks') {
            this.setState({ ticks: data });
        } else {
            this.setState({ candles: data });
        }

        return data;
    }

    prepareDataForChart = () => {
        const { contract } = this.props;
        const toStream = !contract.sell_time;

        const { start, end } = helpers.computeStartEndForContract(contract);
        const durationInSecs = end - start;

        // 1.5 hour = 90 minutes * 60 secs
        if (durationInSecs < 90 * 60) {
            this.hasTick = true;
            this.api
                .getTickHistory(contract.underlying, {
                    start,
                    end,
                    count: 4999,
                    adjust_start_time: 1,
                    subscribe: toStream ? 1 : undefined,
                })
                .then(r => {
                    const ticks = r.history.times.map((t, idx) => {
                        const quote = r.history.prices[idx];
                        return { epoch: +t, quote: +quote };
                    });
                    this.updateData(ticks, 'ticks');
                });
        } else {
            this.hasTick = false;
        }

        this.api
            .autoAdjustGetData(contract.underlying, start, end, 'candles', toStream)
            .then(r => {
                this.updateData(r.candles, 'candles');

                if (!this.hasTick) {
                    const ticksDerivedFromOHLC = r.candles.map(c => ({ epoch: +c.epoch, quote: +c.close }));
                    this.updateData(ticksDerivedFromOHLC, 'ticks');
                }
            });
    }

    fetchData = (s, e, type, interval) => {
        const { contract } = this.props;
        const symbol = contract.underlying;
        const count = 4999;

        const contractStart = helpers.computeStartEndForContract(contract).start;

        const fetchInBatches = (start, end) =>
            this.api
                .getTickHistory(symbol, { count, start, end, style: type, granularity: interval })
                .then((r) => {
                    const firstData = r[type][0];
                    if (!firstData) {
                        return [];           // no data with specific range
                    }

                    const smallestEpoch = firstData.epoch;
                    if (smallestEpoch > start) {
                        this.updateData(r, type);
                        return fetchInBatches(start, smallestEpoch);
                    }

                    return this.updateData(r, type);       // duplication for clarity, so that sequence dont matter
                });

        return fetchInBatches(Math.max(s, contractStart), e);
    }

    changeChartType = (type: ChartType) => {
        const { chartType } = this.state;
        const { contract } = this.props;

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
        const { contract, pipSize } = this.props;
        const { theme } = this.context;
        const { date_start, exit_tick_time, sell_spot_time } = contract;
        const { chartType, dataType } = this.state;
        const data = this.state[dataType];
        const endTime = exit_tick_time || sell_spot_time;

        // handle edge case where contract ends before it starts, show No data available message on chart
        const hasNoData = (+date_start > +endTime);

        return (
            <BinaryChart
                className="contract-chart"
                compactToolbar
                hiddenTimeFrame
                hiddenZoomControls
                showAllTimeFrame={false}
                contract={contract}
                symbol={contract.underlying}
                assetName={contract.symbolName}
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
