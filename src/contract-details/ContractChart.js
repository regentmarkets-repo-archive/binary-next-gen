import React, { PropTypes, PureComponent } from 'react';
import { BinaryChart } from 'binary-charts';
import { isMobile, nowAsEpoch } from 'binary-utils';
import { helpers } from 'binary-live-api';
import { chartApi, api as CoreApi } from '../_data/LiveData';
import { chartToDataType, getDataWithErrorHandling } from '../_chart-utils/Utils';

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
            noData: false,
        };
        this.api = chartApi(0);
        this.hasTick = true;
        this.contractEnd = undefined;       // used to know when to unsubscribe
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

            // unsubscribe after contract ends
            if (this.contractEnd && newTick.epoch > this.contractEnd) {
                this.api.unsubscribeByID(data.tick.id);
            }
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

            // unsubscribe after contract ends
            if (this.contractEnd && newOHLC.epoch > this.contractEnd) {
                this.api.unsubscribeByID(data.ohlc.id);
            }
        });

        this.prepareDataForChart();
    }

    componentWillReceiveProps(nextProps) {
        const { contract } = nextProps;
        const { date_expiry, exit_tick_time } = contract;

        // for contract that was not ended when component mount
        // compute end time when it ended
        if (!this.contractEnd && (date_expiry || exit_tick_time)) {
            const { end } = helpers.computeStartEndForContract(contract);
            this.contractEnd = end;
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
            this.setState({ ticks: data });
        } else {
            this.setState({ candles: data });
        }

        return data;
    }

    prepareDataForChart = () => {
        const { contract } = this.props;
        const toStream = !contract.sell_time;

        if (toStream) {
            CoreApi.subscribeToOpenContract(contract.contract_id);
        }

        const { start, end } = helpers.computeStartEndForContract(contract);

        // escape earlier if contract not started
        if (start > nowAsEpoch()) {
            this.setState({ noData: true });
            return;
        }

        if (contract.sell_time) {
            this.contractEnd = end;
        }


        const durationInSecs = end - start;

        // 1.5 hour = 90 minutes * 60 secs
        if (durationInSecs < 90 * 60) {
            this.hasTick = true;

            const getDataCall = (errCode) => {
                if (errCode === 'StreamingNotAllowed') {
                    this.setState({ noData: true });
                    return Promise.resolve();
                }

                return this.api
                    .getTickHistory(contract.underlying, {
                        start,
                        end,
                        count: 4999,
                        adjust_start_time: 1,
                        subscribe: toStream && !errCode ? 1 : undefined,
                    });
            };

            getDataWithErrorHandling(getDataCall).then(r => {
                if (!r) return;

                const ticks = r.history.times.map((t, idx) => {
                    const quote = r.history.prices[idx];
                    return { epoch: +t, quote: +quote };
                });
                this.updateData(ticks, 'ticks');
            });
        } else {
            this.hasTick = false;
        }

        const getDataCall = (errCode) => {
            if (errCode === 'StreamingNotAllowed') {
                this.setState({ noData: true });
                return Promise.resolve();
            }

            return this.api.autoAdjustGetData(contract.underlying, start, end, 'candles', toStream && !errCode);
        };

        getDataWithErrorHandling(getDataCall).then(r => {
            if (!r) return;

            this.updateData(r.candles, 'candles');

            if (!this.hasTick) {
                const ticksDerivedFromOHLC = r.candles.map(c => ({ epoch: +c.epoch, quote: +c.close }));
                this.updateData(ticksDerivedFromOHLC, 'ticks');
            }
        });
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
        const { chartType, dataType, noData } = this.state;
        const data = this.state[dataType];
        const endTime = exit_tick_time || sell_spot_time;

        // handle edge case where contract ends before it starts, show No data available message on chart
        const hasNoData = (+date_start > +endTime) || noData;

        return (
            <BinaryChart
                className="contract-chart"
                compactToolbar
                hiddenTimeFrame
                hiddenZoomControls
                showTooltips={!isMobile()}
                showAllTimeFrame={false}
                contract={contract}
                symbol={contract.underlying}
                assetName={contract.symbolName}
                ticks={hasNoData ? undefined : data}
                type={chartType}
                theme={theme}
                shiftMode="dynamic"
                noData={hasNoData}
                pipSize={pipSize}
                onTypeChange={!hasNoData ? this.changeChartType : undefined}
            />
        );
    }
}
