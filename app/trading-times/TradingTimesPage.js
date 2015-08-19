import React from 'react';
import { connect } from 'react-redux';
import SegmentedControl from '../common/SegmentedControl';
import TradingTimesTable from './TradingTimesTable';

@connect(state => ({ tradingTimes: state.serverData.tradingTimes }))
export default class TradingTimesPage extends React.Component {

	static propTypes = {
		tradingTimes: React.PropTypes.array.isRequired,
	};

	static defaultProps = {
		tradingTimes: [],
	};

	constructor(props) {
		super(props);
	}

	onMarketSelect(e) {
		window.console.log(e);
	}

	render() {
		const { tradingTimes } = this.props;

		const marketLinks = tradingTimes.map(x => ({
			href: x.name.toLowerCase(),
			text: x.name,
		}));

		const marketSelected = tradingTimes[0] || { submarkets: [] };

		return (
			<div>
				<SegmentedControl
					segments={marketLinks}
					onSelect={::this.onMarketSelect} />
				{marketSelected.submarkets.map((s, i) => <TradingTimesTable key={i} submarket={s} />) }
			</div>
		);
	}
}
