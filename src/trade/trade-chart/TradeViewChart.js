import React, { PureComponent } from 'react';
import $ from 'jquery';
import 'binary-style/binary.isolated.css';
import { actions } from '../../_store';

type Props = {
  contractForChart: object,
  index: number,
  count: number,
  layoutN: number,
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
  wtcharts = null;

  static contextTypes = {
    theme: () => undefined,
  };

  async getChart() {
    const w = await import(/* webpackChunkName: "webtrader-charts" */ 'webtrader-charts');
    w.init({
      appId: window.BinaryBoot.appId,
      lang: window.BinaryBoot.language,
      server: window.BinaryBoot.apiUrl
    });
    this.wtcharts = w;
  }

  initChart(trade) {
    const params = trade.chartParams || { type: 'line', timePeriod: '1t', indicators: [], overlays: [] };

    this.chart = this.wtcharts.chartWindow.addNewChart($(this.root), {
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
      this.chart.actions.reflow();
      $(this.barspinner).hide();
    });
  }

  destroyChart() {
    this.chart && this.chart.actions.destroy();
    this.chart = null;
  }

  componentDidMount() {
    this.getChart().then(() => {
      const trade = this.props.tradeForChart.toJS();
      this.initChart(trade);
    });
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

      startTime && this.chart.draw.startTime(startTime * 1000);
      entrySpot && this.chart.draw.entrySpot(entrySpot * 1000);
      exitSpot && this.chart.draw.exitSpot(exitSpot * 1000);
      endTime && this.chart.draw.endTime(endTime * 1000);

      const barrier = +contract.barrier;
      barrier && this.chart.draw.barrier({ value: barrier });
      return;
    }
    if (this.chart) {
      this.chart.draw.clear();
      if (this.props.count !== nextProps.count || this.props.layoutN !== nextProps.layoutN) {
        this.chart.actions.reflow();
      }
    }
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
