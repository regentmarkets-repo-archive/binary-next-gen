import React, { Component } from 'react';
import { isMobile } from 'binary-utils';
import $ from 'jquery';
import 'binary-style/binary.isolated.css';
import { actions } from '../../_store';

(async () => {
    this.wtcharts = await import(/* webpackChunkName: "webtrader-charts" */ 'webtrader-charts');
    this.wtcharts.init({
      appId: window.BinaryBoot.appId,
      lang: window.BinaryBoot.language,
      server: window.BinaryBoot.apiUrl
    });
})();
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
export default class TradeViewChart extends Component {
  props: Props;
  barspinner = null;
  root = null;
  chart = null;
  config = null;
  wtcharts = null;

  static contextTypes = {
    theme: () => undefined,
  };

  initChart(trade) {
    this.hasDrawnTradeResults = false;
    this.hasChartDone = false;
    const params = trade.chartParams || { type: 'line', timePeriod: '1t', indicators: [], overlays: [] };

    this.chart = this.wtcharts.chartWindow.addNewChart($(this.root), {
      type: params.type,
      timePeriod: params.timePeriod,
      instrumentCode: trade.symbol,
      instrumentName: trade.symbolName || '',
      showInstrumentName: true,
      showOverlays: false,
      showShare: false,
      count: isMobile() ? 100 : 1000,
      enableMobileView: isMobile(),
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
      this.hasChartDone = true;
      this.chart.actions.reflow();
      $(this.barspinner).hide();
    });
  }

  destroyChart() {
    this.chart && this.chart.actions.destroy();
    this.chart = null;
  }

  async componentDidMount() {
    this.wtcharts = await import(/* webpackChunkName: "webtrader-charts" */ 'webtrader-charts');
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

    if (!this.hasChartDone) return;

    const contract = nextProps.contractForChart && nextProps.contractForChart.toJS();
    if (contract) {
      // draw trade results on the chart once contract is made:
      const startTime = contract.date_start || contract.purchase_time;
      const entrySpot = +contract.entry_tick_time;
      const exitSpot = +contract.exit_tick_time;
      const endTime = contract.sell_time || +contract.sell_spot_time;

      startTime && this.chart.draw.startTime(startTime * 1000);
      entrySpot && this.chart.draw.entrySpot(entrySpot * 1000);
      exitSpot && this.chart.draw.exitSpot(exitSpot * 1000);
      endTime && this.chart.draw.endTime(endTime * 1000);

      const barrier = +contract.barrier;
      barrier && this.chart.draw.barrier({ value: barrier, label: 'barrier' });
      contract.high_barrier && this.chart.draw.barrier({ value: +contract.high_barrier, label: 'high barrier' });
      contract.low_barrier && this.chart.draw.barrier({ value: +contract.low_barrier, label: 'low barrier' });
      this.hasDrawnTradeResults = true;
    } else if (this.hasDrawnTradeResults) {
      // clear the trade results when customer trades again
      this.hasDrawnTradeResults = false;
      this.chart.draw.clear();
    }

    // reflow the charts when layout changes
    if (this.props.count !== nextProps.count
        || this.props.layoutN !== nextProps.layoutN) {
      this.chart.actions.reflow();
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
