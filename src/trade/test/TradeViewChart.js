import React, { Component, PropTypes } from 'react';
import { BinaryChart } from 'binary-charts';
import {
    internalTradeModelToServerTradeModel,
    serverContractModelToChartContractModel,
} from '../adapters/TradeObjectAdapter';

const zoomToLatest = chart => {
    const { min, max, dataMax } = chart.xAxis[0].getExtremes();
    if (min && max) {
        const frameSize = max - min;
        chart.xAxis[0].setExtremes(dataMax - frameSize + 500, dataMax);
    }
};
const chartToDataType = {
    area: 'ticks',
    candlestick: 'candles',
};
export default class TradeViewChart extends Component {
    static defaultProps = {
        type: 'full',
        feedLicense: '',
        events: [{
            type: 'zoom-to-latest',
            handler: zoomToLatest,
        }],
    };

    static contextTypes = {
        theme: PropTypes.string,
    };

    static propTypes = {
        actions: PropTypes.object.isRequired,
        contractForChart: PropTypes.object,
        ticks: PropTypes.array.isRequired,
        ohlc: PropTypes.array.isRequired,
        index: PropTypes.number.isRequired,
        events: PropTypes.array.isRequired,
        feedLicense: PropTypes.string.isRequired,
        pipSize: PropTypes.number.isRequired,
        tradeForChart: PropTypes.object.isRequired,
        tradingTime: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            dataType: 'ticks',
            chartType: 'area',
        };
    }

    rangeChange = () => {
        const { actions, tradeForChart } = this.props;
        const { dataType } = this.state;
        return (count, type) => actions.getDataForSymbol(tradeForChart.symbol, count, type, dataType);
    };

    changeChartType = type => {
        const { actions, tradeForChart } = this.props;
        const { chartType } = this.state;

        if (chartType === type) {
            return {};
        }

        const newDataType = chartToDataType[type];
        this.setState({ chartType: type, dataType: newDataType });
        const dataResult = actions.getDataForSymbol(tradeForChart.symbol, 1, 'hour', newDataType, true);
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
                contract={serverContractModelToChartContractModel(contractForChart)}
                defaultRange={1}
                events={events}
                noData={feedLicense === 'chartonly'}
                pipSize={pipSize}
                rangeChange={contractForChart ? undefined : this.rangeChange()}
                symbol={tradeForChart.symbolName}
                ticks={dataType === 'ticks' ? ticks : ohlc}
                theme={theme}
                type={contractForChart ? 'area' : chartType}
                trade={internalTradeModelToServerTradeModel(tradeForChart)}
                typeChange={feedLicense !== 'chartonly' && this.changeChartType}
                tradingTime={tradingTime}
            />
        );
    }
}
