import React, { PureComponent } from 'react';
import $ from 'jquery';
import 'binary-style/binary.isolated.css';
import wtcharts from 'webtrader-charts';
import { isMobile, getLast } from 'binary-utils';
import { actions } from '../../_store';

wtcharts.init({
  appId: window.BinaryBoot.appId,
  lang: window.BinaryBoot.language,
  server: window.BinaryBoot.apiUrl
});

type Props = {
  contractForChart: object,
  index: number,
  events: any[],
  feedLicense: string,
  pipSize: number,
  highContrast: boolean,
  tradeForChart: object,
  tradingTime: object,
};
export default class TradeViewChart extends PureComponent {
  props: Props;
  barspinner = null;
  root = null;
  chart = null;
  config = null;

  static contextTypes = {
    theme: () => undefined,
  };

  initChart(trade) {
    const params = trade.chartParams || { type: 'line', timePeriod: '1t', indicators: [], overlays: [] };
    
    this.chart = wtcharts.chartWindow.addNewChart($(this.root), {
      type: params.type,
      timePeriod: params.timePeriod,
      instrumentCode: trade.symbol,
      instrumentName: trade.symbolName || '',
      showInstrumentName: true,
      showOverlays: false,
      showShare: false,
      indicators: params.indicators,
      overlays: params.overlays,
      timezoneOffset: 0,
    });

    this.chart.events.anyChange = () => {
      const data = this.chart.data();
      const { index } = this.props;
      actions.updateTradeViewChartParams(index, data);
    }; 


    this.chart.done().then(() => {
      $(this.barspinner).hide();
    });
  }
  destroyChart() {
    this.chart && this.chart.actions.destroy();
    this.chart = null;
  }

  componentDidMount() {
    const trade = this.props.tradeForChart.toJS();
    this.initChart(trade);
  }
  componentWillReceiveProps(nextProps) {
    const trade = nextProps.tradeForChart.toJS();
    if (this.chart && trade.symbol !== this.chart.data().instrumentCode) {
      this.destroyChart();
      this.initChart(trade);
      return;
    }
    const contract = nextProps.contractForChart && nextProps.contractForChart.toJS();
    if (contract) {
      const startTime = contract.date_start || contract.purchase_time;
      const entrySpot = +contract.entry_tick_time;
      const exitSpot = +contract.exit_tick_time;
      const endTime = contract.sell_time || +contract.sell_spot_time;

      // console.warn(startTime, entrySpot, exitSpot, endTime);
      // console.warn(contract.date_expiry, contract.date_settlement, contract.sell_time, +contract.sell_spot_time);

      startTime && this.chart.draw.startTime(startTime * 1000);
      entrySpot && this.chart.draw.entrySpot(entrySpot * 1000);
      exitSpot && this.chart.draw.exitSpot(exitSpot * 1000);
      endTime && this.chart.draw.endTime(endTime * 1000);

      const barrier = +contract.barrier;
      barrier && this.chart.draw.barrier({ value: barrier });
      console.warn(barrier);

      return;
    }
    this.chart.draw.clear();
    console.warn(nextProps);
  }

  componentWillUnmount() {
    this.destroyChart();
  }
  shouldComponentUpdate() { return false; }
  render() {
    const { theme } = this.context;
    return (
      <div
        className={`binary-style trade-chart ${theme}`}
        ref={el => { this.root = el; }}
      >
        <div
          className={`barspinner ${theme === 'dark' ? 'white' : 'dark'}`}
          ref={el => { this.barspinner = el; }}
        >
          <div className="rect1" />
          <div className="rect2" />
          <div className="rect3" />
          <div className="rect4" />
          <div className="rect5" />
        </div>
      </div>
    );
  }
}

/*
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
    const lastData = getLast(chart.series[0].options.data);
    if (!lastData) return;
    const seriesMax = lastData[0];
    if (!seriesMax) return;
    const range = (seriesMax - dataMin) * ratio;
    chart.xAxis[0].setExtremes(seriesMax - range, dataMax);
};

const zoomInMax = (ev, chart) => {
    const { dataMax } = chart.xAxis[0].getExtremes();
    const { minRange } = chart.xAxis[0].options;
    chart.xAxis[0].setExtremes(dataMax - minRange, dataMax);
};

// ad-hoc way to stop chart from keep shifting
const move2StepsBack = (ev, chart) => {
    const data = chart.series[0].options.data;
    const lastTwoData = data[data.length - 3];

    const { min } = chart.xAxis[0].getExtremes();
    chart.xAxis[0].setExtremes(min, lastTwoData[0]);
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
        highContrast: boolean,
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
            {
                type: 'move-back',
                handler: move2StepsBack,
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
            const { index, tradeForChart, contractForChart } = this.props;

            // ignored delayed tick from previous subscription
            if (tradeForChart && data.tick.symbol !== tradeForChart.get('symbol')) return;

            const old = this.state.ticks;
            if (old.length === 0) {
                return;
            }

            const newTick = {
                epoch: +data.tick.epoch,
                quote: +data.tick.quote,
            };
            const dataCap = isMobile() ? 700 : 2500;

            this.setState({ ticks: old.concat([newTick]).slice(-dataCap) });
            this.ticksId = data.tick.id;

            // stop the chart from moving 5 ticks after contract ends
            const endTime = contractForChart && (contractForChart.get('date_expiry') || contractForChart.get('sell_spot_time'));
            if (endTime) {
                const last6Data = old[old.length - 7];
                const last5Data = old[old.length - 6];
                if (last5Data.epoch > +endTime && last6Data.epoch <= +endTime) {
                    const chartDiv = document.getElementById(`trade-chart${index}`);
                    if (chartDiv) {
                        chartDiv.dispatchEvent(new Event('move-back'));
                    }
                }
            }
        });

        this.api.events.on('ohlc', data => {
            const { tradeForChart } = this.props;

            // ignore delayed tick from previous subscription
            if (tradeForChart && data.ohlc.symbol !== tradeForChart.get('symbol')) return;

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
                const dataCap = isMobile() ? 500 : 1500;
                this.setState({ candles: old.concat([newOHLC]).slice(-dataCap) });
            }
            this.ohlcId = data.ohlc.id;
        });
    }

    componentDidMount() {
        const { tradeForChart, index, feedLicense } = this.props;

        if (!tradeForChart) throw new Error(`Trade no ${index} does not have trade param`);

        const symbol = tradeForChart.get('symbol');

        if (feedLicense === 'chartonly') {
            return;
        }

        this.subscribeToTicks(symbol).then(() => {
            const chartDiv = document.getElementById(`trade-chart${index}`);
            if (chartDiv) {
                chartDiv.dispatchEvent(new Event('zoom-in-to'));
            }
        });
        this.subscribeToOHLC(symbol);
    }

    componentWillReceiveProps(nextProps) {
        const thisSymbol = this.props.tradeForChart.get('symbol');
        const nextSymbol = nextProps.tradeForChart.get('symbol');
        if (
            (this.props.tradeForChart && nextProps.tradeForChart) &&
            (thisSymbol !== nextSymbol)
        ) {
            this.setState(defaultState);
            this.unsubscribe();

            const { feedLicense } = nextProps;
            if (feedLicense === 'chartonly') {
                return;
            }

            this.subscribeToTicks(nextSymbol).then(() => {
                const chartDiv = document.getElementById(`trade-chart${nextProps.index}`);
                if (chartDiv) {
                    chartDiv.dispatchEvent(new Event('zoom-in-to'));
                }
            });
            this.subscribeToOHLC(nextSymbol);
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

        const symbol = tradeForChart.get('symbol');
        const count = type === 'ticks' ? 1000 : 500;

        // no need to handle error as not calling with subscribe
        return this.api
            .getTickHistory(symbol, { count, end, style: type, granularity: interval, adjust_start_time: 1 })
            .then(r => this.updateData(r, type));
    }

    subscribeToTicks = (symbol, count = 2000): Promise => {
        const callDependOnErr = (err) =>
            this.api.getTickHistory(symbol, {
                count: isMobile() ? 500 : count,
                end: 'latest',
                adjust_start_time: 1,
                subscribe: err ? undefined : 1,
            });

        return getDataWithErrorHandling(callDependOnErr).then(r => this.updateData(r, 'ticks'));
    }

    subscribeToOHLC = (symbol, count = 500, interval = 60): Promise => {
        const callDependOnErr = (err) =>
            this.api.getTickHistory(symbol, {
                    count: isMobile() ? 200 : count,
                    end: 'latest',
                    subscribe: err ? undefined : 1,
                    style: 'candles',
                    adjust_start_time: 1,
                    granularity: interval,
                });

        return getDataWithErrorHandling(callDependOnErr).then(r => this.updateData(r, 'candles'));
    }

    changeChartType = (type: ChartType) => {
        const { feedLicense } = this.props;
        const { chartType } = this.state;

        if (feedLicense === 'chartonly' || chartType === type) {
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
            feedLicense, pipSize, tradeForChart, highContrast } = this.props;
        const { theme } = this.context;
        const { chartType, dataType } = this.state;

        const noData = feedLicense === 'chartonly';

        const mobile = isMobile();

        return (
            <BinaryChart
                id={`trade-chart${index}`}
                className="trade-chart"
                contract={contractForChart && serverContractModelToChartContractModel(contractForChart.toJS())}
                events={events}
                noData={noData}
                pipSize={pipSize}
                highContrast={highContrast}
                shiftMode={contractForChart ? 'dynamic' : 'fixed'}
                symbol={tradeForChart && tradeForChart.get('symbol')}
                assetName={tradeForChart && tradeForChart.get('symbolName')}
                ticks={this.state[dataType]}
                theme={theme}
                showTooltips={!mobile}
                hideZoomControls={mobile}
                type={chartType}
                trade={tradeForChart && internalTradeModelToChartTradeModel(tradeForChart.toJS())}
                // tradingTimes={tradingTime.times}
                getData={noData ? undefined : this.fetchData}
                onTypeChange={noData ? undefined : this.changeChartType}   // do not allow change type when there's contract
            />
        );
    }
}
*/
