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
        });
    }

    componentWillMount() {
        this.getOHLCData();
        this.getTicksData();
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
                defaultRange={6}
                showAllTimeFrame={false}
                contract={contract}
                symbol={contract.underlying}
                symbolName={contract.symbolName}
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
