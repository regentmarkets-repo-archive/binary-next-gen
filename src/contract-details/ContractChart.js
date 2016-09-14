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

        this.api.events.on('tick', data => {
            const old = this.state.ticks;
            const newTick = {
                epoch: +data.tick.epoch,
                quote: +data.tick.quote,
            };
            this.setState({ ticks: old.concat([newTick]) });
            this.ticksId = data.tick.id;
        });

        this.api.events.on('ohlc', data => {
            const ohlc = data.ohlc;
            const newOHLC = {
                epoch: +(ohlc.open_time || ohlc.epoch),
                open: +ohlc.open,
                high: +ohlc.high,
                low: +ohlc.low,
                close: +ohlc.close,
            };
            const old = this.state.candles;
            this.setState({ candles: old.concat([newOHLC]) });
            this.ohlcId = data.ohlc.id;
        });
    }

    componentWillMount() {
        this.getOHLCData();
        this.getTicksData();
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    unsubscribe = () => {
        if (this.ticksId) this.api.unsubscribeByID(this.ticksId);
        if (this.ohlcId) this.api.unsubscribeByID(this.ohlcId);
    }

    updateData = (data, type) => {
        const newData = data[type];
        if (type === 'ticks') {
            this.setState({ ticks: newData });
        } else {
            this.setState({ candles: newData });
        }

        return newData;
    }

    getTicksData = () => {
        const { contract } = this.props;
        const toStream = !contract.sell_time;

        const { start, end } = helpers.computeStartEndForContract(contract);
        return this.api.autoAdjustGetData(contract.underlying, start, end, 'ticks', toStream)
            .then(r => this.updateData(r, 'ticks'));
    }

    getOHLCData = () => {
        const { contract } = this.props;
        const toStream = !contract.sell_time;

        const { start, end } = helpers.computeStartEndForContract(contract);
        return this.api.autoAdjustGetData(contract.underlying, start, end, 'candles', toStream)
            .then(r => this.updateData(r, 'candles'));
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
                getData={this.fetchData}
                noData={hasNoData}
                pipSize={pipSize}
                onTypeChange={!hasNoData ? this.changeChartType : undefined}
            />
        );
    }
}
