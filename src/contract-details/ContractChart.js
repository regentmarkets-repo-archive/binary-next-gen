import $ from 'jquery';
import moment from 'moment';
import React, { Component } from 'react';
// import { isMobile } from 'binary-utils';

type Props = {
    contract: Contract,
    highContrast: boolean,
    pipSize: number,
};
export default class ContractChart extends Component {
  props: Props;
  root = null;
  chart = null;
  barspinner = null;
  loaded = false;

  static contextTypes = {
    theme: () => undefined,
  };

  componentWillReceiveProps(nextProps) {
    if (this.loaded) {
      const { contract } = nextProps;
      contract && this.updateContract(contract);
    }
  }

  updateContract(contract) {
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
  }

  async componentDidMount() {
    const { contract } = this.props;
    const { underlying, symbolName, purchase_time, date_start, date_expiry, sell_time, exit_tick_time } = contract;
    const duration = Math.min(+date_expiry, moment.utc().unix()) - (purchase_time || date_start);
    let timePeriod = '';
    if (duration <= 60 * 60) {
      timePeriod = '1t';
    } else if (duration <= 2 * 60 * 60) {
      timePeriod = '1m';
    } else if (duration <= 6 * 60 * 60) {
      timePeriod = '2m';
    } else if (duration <= 24 * 60 * 60) {
      timePeriod = '5m';
    } else {
      timePeriod = '1h';
    }
    const margin = ({
      '1t': Math.max(5, Math.floor(50 * duration / (60 * 60))),
      '1m': 5 * 60,
      '2m': 5 * 120,
      '5m': 5 * 300,
      '1h': 5 * 60 * 60
    })[timePeriod];
    const type = timePeriod === '1t' ? 'line' : 'candlestick';

    const wtcharts = await import(/* webpackChunkName: "webtrader-charts" */ 'webtrader-charts');

    this.chart = wtcharts.chartWindow.addNewChart($(this.root), {
      type, // default is 'line'
      timePeriod, // default is '1t'
      instrumentCode: underlying,
      instrumentName: symbolName,
      showInstrumentName: true, // default is false
      showOverlays: false, // default is true
      showShare: false, // default is true
      start: (purchase_time || date_start) - margin,
      count: isMobile() ? 100 : 1000,
      enableMobileView: isMobile(),
      end: sell_time && +sell_time + margin || (exit_tick_time ? exit_tick_time + margin : 'latest'),
      hideCurrentPrice: true,
      // timezoneOffset: 0,
    });

    this.chart.drawn().then(() => {
      $(this.barspinner).hide();
      $(this.root).find('.chartSubContainerHeader').css('height', 0).hide();
      this.chart.actions.reflow();
    });

    this.chart.done().then(() => {
      contract && this.updateContract(contract);
      this.chart.draw.zoomOut();
      this.loaded = true;
    });
  }

  componentWillUnmount() {
    this.chart && this.chart.actions.destroy();
    this.chart = null;
    this.loaded = false;
  }

  shouldComponentUpdate() { return false; }

  render() {
    const { theme } = this.context;
    return (
      <div
        className={`binary-style contract-chart ${theme}`}
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
