import React, { PureComponent, PropTypes } from 'react';
import { BinaryChart } from 'binary-charts';
import { durationToSecs } from 'binary-utils';
import { actions } from '../../_store';
import {
    internalTradeModelToChartTradeModel,
    serverContractModelToChartContractModel,
} from '../adapters/TradeObjectAdapter';

const zoomToLatest = (ev, chart) => {
    const { dataMax } = chart.xAxis[0].getExtremes();
    const { isFuture, duration, unit } = ev.detail;
    if (isFuture) return;
    const rangeInSecs = unit === 't' ? duration * 2 : durationToSecs(duration, unit);
    const rangeInMillis = rangeInSecs * 1000;
    chart.xAxis[0].setExtremes(dataMax - (rangeInMillis * 1.1), dataMax);
};

const chartToDataType = {
    area: 'ticks',
    candlestick: 'candles',
};

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

    rangeChange = () => {
        const { tradeForChart } = this.props;
        const { dataType } = this.state;
        return (count, type) => actions.getDataForSymbol(tradeForChart.symbol, count, type, dataType);
    };

    changeChartType = type => {
        const { tradeForChart, contractForChart, feedLicense } = this.props;
        const { chartType } = this.state;

        // do nothing if there' no license for chart data or it's showing a contract
        if (feedLicense === 'chartonly' || contractForChart) {
            return {};
        }

        if (chartType === type) {
            return {};
        }

        const newDataType = chartToDataType[type];
        this.setState({ chartType: type, dataType: newDataType });
        const dataResult = actions
            .getDataForSymbol(tradeForChart.symbol, 1, 'hour', newDataType, true)
            .catch(err => {
                const serverError = err.error.error;
                if (serverError.code === 'NoRealtimeQuotes' || serverError.code === 'MarketIsClosed') {
                    return actions.getDataForSymbol(tradeForChart.symbol, 1, 'hour', newDataType, false);
                }
                throw new Error(`Fetch data failed: ${serverError.message}`);
            });
        return dataResult;
    }

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
                defaultRange={1}
                events={events}
                noData={feedLicense === 'chartonly'}
                pipSize={pipSize}
                rangeChange={contractForChart ? undefined : this.rangeChange()}
                symbol={tradeForChart && tradeForChart.symbolName}
                ticks={(dataType === 'ticks' || contractForChart) ? ticks : ohlc}
                theme={theme}
                type={contractForChart ? 'area' : chartType}
                trade={tradeForChart && internalTradeModelToChartTradeModel(tradeForChart)}
                typeChange={this.changeChartType}
                tradingTime={tradingTime}
            />
        );
    }
}
