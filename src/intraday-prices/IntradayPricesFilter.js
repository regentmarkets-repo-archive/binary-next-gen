import React, { PropTypes } from 'react';
import M from '../_common/M';

export default class IntradayPricesFilter extends React.Component {

	static propTypes = {
        minAvailableDuration: PropTypes.number,
		onCalculate: PropTypes.func,
    };

	constructor(props) {
		super(props);

		this.state = {
			underlying: 'LOreal',
			date: Date.now(),
		};
	}

	render() {
		return (
			<div>
				<select name="underlying" defaultValue="FPOR">
					<option value="WLDAUD">AUD Index</option>
					<option value="frxAUDCAD">AUD/CAD</option>
					<option value="frxAUDCHF">AUD/CHF</option>
					<option value="frxAUDJPY">AUD/JPY</option>
					<option value="frxAUDNZD">AUD/NZD</option>
					<option value="frxAUDPLN">AUD/PLN</option>
					<option value="frxAUDUSD">AUD/USD</option>
					<option value="WLDEUR">EUR Index</option>
					<option value="frxEURAUD">EUR/AUD</option>
					<option value="frxEURCAD">EUR/CAD</option>
					<option value="frxEURGBP">EUR/GBP</option>
					<option value="frxEURJPY">EUR/JPY</option>
					<option value="frxEURNZD">EUR/NZD</option>
					<option value="frxEURUSD">EUR/USD</option>
					<option value="WLDGBP">GBP Index</option>
					<option value="frxGBPAUD">GBP/AUD</option>
					<option value="frxGBPCAD">GBP/CAD</option>
					<option value="frxGBPJPY">GBP/JPY</option>
					<option value="frxGBPNOK">GBP/NOK</option>
					<option value="frxGBPNZD">GBP/NZD</option>
					<option value="frxGBPPLN">GBP/PLN</option>
					<option value="frxGBPUSD">GBP/USD</option>
					<option value="frxNZDJPY">NZD/JPY</option>
					<option value="frxNZDUSD">NZD/USD</option>
					<option value="WLDUSD">USD Index</option>
					<option value="frxUSDCAD">USD/CAD</option>
					<option value="frxUSDJPY">USD/JPY</option>
					<option value="frxUSDMXN">USD/MXN</option>
					<option value="frxUSDNOK">USD/NOK</option>
					<option value="frxUSDPLN">USD/PLN</option>
					<option value="frxUSDSEK">USD/SEK</option>
					<option value="AS51">Australian Index</option>
					<option value="BFX">Belgian Index</option>
					<option value="BSESENSEX30">Bombay Index</option>
				</select>
				<select name="date" value="2015-07-27">
					<option value="2015-07-27">2015-07-27</option>
					<option value="2015-07-24">2015-07-24</option>
					<option value="2015-07-23">2015-07-23</option>
					<option value="2015-07-22">2015-07-22</option>
					<option value="2015-07-21">2015-07-21</option>
					<option value="2015-07-20">2015-07-20</option>
					<option value="2015-07-17">2015-07-17</option>
				</select>
				<button>
					<M m="View" />
				</button>
			</div>
		);
	}
}
